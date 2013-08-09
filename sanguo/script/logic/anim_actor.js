require("script/common/foundation.js");
require("script/common/frame_anim.js");

var EActorStat = {
EIdle:0,
EReact:1,
EMoving:2,
EAttach:3,
SpeAct:4, //injure,cast,command
EDying:5
};

var EMoveStat = {
ToTarget:0,
ToDest:1,
};

var EActorType = {
ESoldier:0,
EHero:1,
};

var MinReachDis = 20;
var MinReachDisY = 2;

var AnimActor = cc.Sprite.extend({
    type:EActorType.ESoldier,
    camp:ECamp.Left,
    enemy_list:null,
    army_list:null,
    battle_ground:null,
    actor_id:0,       // index in army_list
    hp:100,
    max_hp:100,
    att:10,
    move_dst:null,
    move_target:null,
    move_duration:0,
    move_flag:0,
    reaction_time:0, // random
    att_range:50,
    col_range:40,
    actor_config:null,
    pre_stat:EActorStat.EIdle,
    cur_stat:EActorStat.EIdle,
    move_stat:EMoveStat.ToTarget,
    direction:EDir.ToRight,
    speed_x:140.0,
    speed_y:50.0,
    pspt_val:1,
    damage_delay:0,
    damage_round:0,
    damage_tick:0,
    demage_mark:false,
    die_delay:0,
    act_duration:0, // EActorStat.SpeAct
    shadow:null,
    target_id:null,
    opp_left:null,
    opp_right:null,
    anchor:null,


    initWithActorConfig:function (actor_cfg,camp) 
    {
        this.actor_config = actor_cfg;
        this.camp = camp;
        this.direction = camp==ECamp.Left?EDir.ToRight:EDir.ToLeft;

        var motion = actor_cfg["Idle"];
        var img_array = [];
        var start_idx = parseInt(randomF(motion.start,motion.end));
        for(var i=motion.start; i<=motion.end; ++i)
        {
            var _idx = (i+start_idx)%(motion.end+1)+10000;
            img_array.push(motion.prefix+_idx+".png");
        }
        var firTexture = cc.TextureCache.getInstance().addImage(img_array[0]);
        var img_size = firTexture.getContentSize();
        this.initWithTexture(firTexture,new cc.rect(0,0,img_size.width,img_size.height));
               
        if(this.direction == EDir.ToLeft)
        {
            this.setFlipX(true);
        }
        var animate = genAnimateArr(img_array,motion.interval);
        var repeat = cc.RepeatForever.create(animate);
        this.runAction(repeat);
        this.schedule(this.updateStatus);
        this.resetAnchor();
    },

    initShadow:function (shadow_file) 
    {
        this.shadow = cc.Sprite.create(shadow_file);
        this.addChild(this.shadow,-1);
        var size = this.getContentSize();
        var anchor = this.getAnchorPoint();
        var pos = cc.p(size.width*anchor.x,size.height*anchor.y);
        this.shadow.setPosition(pos);
    },

    resetAnchor:function ()
    {
        var size = this.getContentSize();
        var ancor_p = null;
        if(this.direction == EDir.ToRight)
        {
            ancor_p = cc.p(this.anchor.x/size.width,this.anchor.y/size.height);
        }
        else
        {
            ancor_p = cc.p((size.width-this.anchor.x)/size.width,this.anchor.y/size.height);
        }
        this.setAnchorPoint(ancor_p);
        if(this.shadow!=null)
        {
            this.shadow.setPosition(size.width*ancor_p.x,size.height*ancor_p.y);
        }
    },

    setDirection:function (dir) 
    {
        if(this.direction != dir)
        {
            this.direction = dir;
            if(dir != EDir.ToRight)
            {
                this.setFlipX(true);
            }
            else
            {
                this.setFlipX(false);
            }
            this.resetAnchor();
        }    
    },

    setPsptVal:function (pspt_val) 
    {
        this.pspt_val = pspt_val;
        this.setScale(pspt_val);
    },

    runSpeAction:function (motion_name) 
    {
        //cc.log("spe action:"+motion_name);
        this.stopAllActions();
        this.pre_stat = this.cur_stat;
        this.cur_stat = EActorStat.SpeAct;
        var motion = this.actor_config[motion_name];
        var img_array = genImgArray(motion);
        var animate = genAnimateArr(img_array,motion.interval);
        this.act_duration = animate.getAnimation().getDuration();
        this.runAction(animate);
        return this.act_duration;
    },

    runActionLoop:function (motion_name) 
    {
        //cc.log("motion loop:"+motion_name);
        this.stopAllActions();
        var motion = this.actor_config[motion_name];
        var img_array = genImgArray(motion);
        var animate = genAnimateArr(img_array,motion.interval);
        var repeat = cc.RepeatForever.create(animate);
        this.runAction(repeat);
    },

    idle:function () 
    {
        if(this.cur_stat != EActorStat.EIdle)
        {
            this.stopAllActions();
            this.runActionLoop("Idle");
        }
        this.cur_stat = EActorStat.EIdle;  
    },

    injure:function (demage) 
    {
        this.hp -= demage;
        if(this.cur_stat==EActorStat.EIdle || this.cur_stat==EActorStat.EMoving)
        {
            this.runSpeAction("Injured");
        }        
    },

    die:function () 
    {
        if(this.cur_stat == EActorStat.EDying)
        {
            cc.log("die agin!!!!!!");
            return;
        }
        this.cur_stat = EActorStat.EDying;
        this.stopAllActions();
        var motion = this.actor_config["Dead"];
        var img_array = genImgArray(motion);
        var animate = genAnimateArr(img_array,motion.interval);
        this.die_delay = animate.getAnimation().getDuration();
        this.runAction(animate);


        if(this.opp_left != null)
        {
            var oppLeft = this.getOppLeft();
            if(oppLeft!=null){oppLeft.enemyDie();}
            this.opp_left = null;
        }
        if(this.opp_right != null)
        {
            var oppRight = this.getOppRight();
            if(oppRight!=null){oppRight.enemyDie();}
            this.opp_right = null;
        }
    },

    findFightTarget:function () 
    {
        var max_width = this.battle_ground.ground_width;
        var min_dis = max_width*max_width;
        var nearst_actor = null;

        var actors_inline = [];
        var s_pos = this.getPosition();

        for(var i in this.enemy_list)
        {
            var enemy = this.enemy_list[i];
            if( enemy == null)
            {continue;}
            if( enemy.cur_stat == EActorStat.EDying)
            {continue;}
            if(enemy.opp_left!=null && enemy.opp_right!=null)
            {continue;}
            if(enemy.move_target!=null && enemy.move_target==this.actor_id)
            {return enemy;}
            var e_pos = this.enemy_list[i].getPosition();
            if(Math.abs(e_pos.y-s_pos.y)<40)
            {
                actors_inline.push(enemy);
            }
            var dis = getLenP2(e_pos,s_pos);
            if(dis<min_dis)
            {
                min_dis = dis;
                nearst_actor = enemy;
            }
        }
        if(actors_inline.length == 0)
        {return nearst_actor}
        else
        {
            var min_x_dis = max_width;
            var t_actor = null;
            for(var i in actors_inline)
            {
                var t_pos = actors_inline[i].getPosition();
                var dis_x = Math.abs(s_pos.x-t_pos.x);
                if(dis_x < min_x_dis)
                {
                    t_actor = actors_inline[i];
                    min_x_dis = dis_x;
                }
            }
            return t_actor;
        }
    },

    moveToDst:function (destnation,reaction) 
    {
        var now_pos = this.getPosition();
        var x_len = Math.abs(destnation.x-now_pos.x);
        var y_len = Math.abs(destnation.y-now_pos.y);
        this.cur_stat = EActorStat.EReact;
        this.move_stat = EMoveStat.ToDest;
        this.move_dst = destnation;
        this.move_duration = Math.max(x_len/this.speed_x,y_len/this.speed_y);
        this.reaction_time = reaction;
        return this.move_duration+this.reaction_time;
    },

    moveToTarget:function (target,reaction) 
    {
        this.cur_stat = EActorStat.EReact;
        this.move_stat = EMoveStat.ToTarget;
        this.move_target = target.actor_id;
        this.reaction_time = reaction;
    },

    getMoveTarget:function () 
    {
        return this.move_target==null?null:this.enemy_list[this.move_target];
    },

    updateStatus:function (dt) 
    {
        var leftOpp = this.getOppLeft();
        if(leftOpp==null){this.opp_left=null;}
        else if(leftOpp.target_id!=this.actor_id){this.opp_left=null;}
        var rightOpp = this.getOppLeft();
        if(rightOpp==null){this.opp_right=null;}
        else if(rightOpp.target_id!=this.actor_id){this.opp_right=null;}
        if(this.type==EActorType.ESoldier && this.soldier_type==ESoldierType.EArcher)
        {
            if(leftOpp!=null)
            {
                this.att_range = leftOpp.att_range;
            }
            else if(rightOpp!=null)
            {
                this.att_range = rightOpp.att_range;
            }
            else
            {
                if(this.cur_stat==EActorStat.EIdle && this.getTarget()==null)
                {
                    //this.setAutoTarget();
                }
            }
        }

        if(this.cur_stat==EActorStat.SpeAct)
        {
            if(this.act_duration <= 0.0)
            { 
                if(this.pre_stat == EActorStat.EIdle)
                {
                    this.idle();
                }
                else if(this.pre_stat == EActorStat.EMoving)
                {
                    this.cur_stat = EActorStat.EMoving;
                    this.runActionLoop("Run");
                }
                else if(this.pre_stat == EActorStat.EAttach)
                {
                    this.cur_stat = EActorStat.EAttach;
                    var target = this.getTarget();
                    if(target!=null){this.attach(target);}
                    
                }
            }
            this.act_duration -= dt;
            return;
        }
        else if(this.cur_stat==EActorStat.EAttach)
        {
            var target = this.getTarget();
            if(target==null) // lost target
            {
                this.target_id = null;
                target = this.findFightTarget();
                if(target==null)
                {this.wander(this);}
                else
                {this.moveToTarget(target,0);}
                return;
            }
            else
            {
                var distance = getLength(this.getPosition(),target.getPosition())
                if((distance-this.att_range-target.col_range)>MinReachDis)
                {
                     //this.target_id = 0;
                    this.moveToTarget(target,0);

                    return;
                }
            }

            this.damage_tick += dt;
            if(this.damage_tick > this.damage_round)
            {
                this.demage_mark = false;
                this.damage_tick -= this.damage_round;
            }
            if(this.demage_mark==false && this.damage_tick>=this.damage_delay)
            {  
                this.demage_mark = true;
                this.attachHits();
            }
            return;
        }
        else if(this.cur_stat==EActorStat.EDying)
        {
            this.die_delay -= dt;
            if(this.die_delay<=0.0)
            {
                this.getParent().removeChild(this,true);
            }
            return;
        }
        else if(this.cur_stat == EActorStat.EReact)
        {
            this.reaction_time -= dt;
            if(this.reaction_time<=0)
            {
                this.cur_stat = EActorStat.EMoving;
                this.runActionLoop("Run");
            }
            return;
        }
        else if(this.cur_stat==EActorStat.EMoving)
        {
            this.updateMove(dt);
        }
    },

    updateMove:function (dt) 
    {
        if(this.cur_stat != EActorStat.EMoving)
        {
            return;
        }
        if(this.move_stat == EMoveStat.ToDest)
        {
            this.updateMoveDst(dt);
        }
        else
        {
            this.updateMoveTarget(dt);
        }
    },

    updateMoveDst:function (dt) 
    {
        if(this.move_duration<dt)
        {
            this.move_duration = 0;
            this.setPosition(this.move_dst);
            this.reachDest();
            return;
        }
        else
        {
            this.move_duration -= dt;
        }
        var pos = this.getPosition();
        var d_x = this.move_dst.x - pos.x;
        var d_y = this.move_dst.y - pos.y;
        var t_speed_x = d_x>0.0?this.speed_x:-this.speed_x;
        //t_speed_x *= this.pspt_val;
        if(Math.abs(d_x)<MinReachDis)
        {
            pos.x = this.move_dst.x;
            t_speed_x = 0;
        }
        else
        {
            this.setDirection(t_speed_x>0?EDir.ToRight:EDir.ToLeft);
        }
        var t_speed_y = d_y>0.0?this.speed_y:-this.speed_y;
        if(Math.abs(d_y)<MinReachDis)
        {
            t_speed_y = 0;
            pos.y = this.move_dst.y;
        }
        var move_x = t_speed_x*dt;
        var move_y = t_speed_y*dt;
       
        pos.x += move_x;
        pos.y += move_y;
        this.setPosition(pos);

        var z_order = getZOrderByY(this);
        if(z_order != this.getZOrder())
        {
            this.setPsptVal(this.battle_ground.getPsptVal(pos.y));
            this.getParent().reorderChild(this,z_order);
        }
    },
    updateMoveTarget:function (dt) 
    {
        var pos = this.getPosition();
        var target = this.getMoveTarget();
        if(target == null)
        {
            target = this.findFightTarget();
            if(target!=null){this.moveToTarget(target,randomF(0,0.3));}
            else{this.wander(this);}
            return;
        }
        var target_pos = target.getPosition();
        var d_x = target_pos.x - pos.x;
        var d_y = target_pos.y - pos.y;
        var t_speed_y = d_y>0.0?this.speed_y:-this.speed_y;
        if(Math.abs(d_y)<MinReachDisY)
        {
            pos.y = target_pos.y;
            t_speed_y = 0;
        }
        var t_speed_x = d_x>0.0?this.speed_x:-this.speed_x;
        //t_speed_x *= this.pspt_val;
        if(Math.abs(d_x)<=(this.att_range+target.col_range))
        {
            t_speed_x = 0;
        }
        else
        {
            this.setDirection(t_speed_x>0?EDir.ToRight:EDir.ToLeft);
        }

        if(t_speed_x==0 && t_speed_y==0)
        {
            this.reachTarget();
        }
        else
        {
            pos.x += t_speed_x*dt;
            pos.y += t_speed_y*dt;
            this.setPosition(pos);
            var z_order = getZOrderByY(this);
            if(z_order != this.getZOrder())
            {
                 var parent = this.getParent();
                this.setPsptVal(this.battle_ground.getPsptVal(pos.y));
                parent.reorderChild(this,z_order);
            }
        }
    },

    getFightPos:function (target)
    {
        var pos = this.getPosition();
        if(this.opp_left!=null && this.opp_right!=null)
        {
            cc.log("error! opp is full!");
        }
        if(target.getPosition().x-pos.x>0)
        {
            if(this.opp_left == null)
            {
                pos.x -= this.col_range+target.att_range;
            }
            else if(this.opp_right == null)
            {
                pos.x += this.col_range+target.att_range;
            }
        }
        else
        {
            if(this.opp_right == null)
            {
                pos.x += this.col_range+target.att_range;
            }
            else if(this.opp_left == null)
            {
                pos.x -= this.col_range+target.att_range;
            }
        }
        return pos;
    },
    getLeftFightPos:function (target) 
    {
       var pos = target.getPosition();
       pos.x -= this.att_range+target.col_range;
       return pos;
    },
    getRightFightPos:function (target) 
    {
       var pos = target.getPosition();
       pos.x += this.att_range+target.col_range;
       return pos;
    },
    reachTarget:function () 
    {
        this.idle();
    },
    reachDest:function () 
    {
        this.idle();
    },

    getTarget:function () 
    {
        if(this.target_id == null)
        {
            return null;
        }
        else
        {
            var target = this.enemy_list[this.target_id];
            if(target==null){return null;}
            if(target.cur_stat==EActorStat.EDying){return null;}
            return target;
        }
    },

    getOppLeft:function () 
    {
        if(this.opp_left == null)
        {return null;}
        return this.enemy_list[this.opp_left];
    },
    getOppRight:function () 
    {
        if(this.opp_right == null)
        {return null;}
        return this.enemy_list[this.opp_right];
    },
    setAutoTarget:function ()
    {
        var s_pos = this.getPosition();
        var min_dis_y = 60;
        var auto_target = null;
        for(var i in this.enemy_list)
        {
            var enemy = this.enemy_list[i];
            if(enemy==null){continue;}
            var e_pos = enemy.getPosition();
            var dis_y = Math.abs(s_pos.y-e_pos.y);
            var dis_x = Math.abs(s_pos.x-e_pos.x);
            if(dis_x<(this.att_range+enemy.col_range) && dis_y<min_dis_y)
            {
                min_dis_y = dis_y;
                auto_target = enemy;
            }
        }
        if(auto_target!=null)
        {
            this.target_id = auto_target.actor_id;
            this.cur_stat = EActorStat.EAttach;
            if((s_pos.x-e_pos.x)){auto_target.opp_right = this.actor_id;}
            else{auto_target.opp_left = this.actor_id;}
        }
    }
});