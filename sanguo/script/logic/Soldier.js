
require("script/config/soldier_config.js");
require("script/logic/anim_actor.js");
require("script/logic/Bullet.js");

var WanderRadius = 150;
var MoveFlag={
Wander:0, // continue wander
AttTarget:1,  // attach target
};

var Soldier = AnimActor.extend({
    soldier_type:0,
    bullet:null,
    launch_pos:null,

    initSoldier:function (soldier_config,camp) 
    {
        this.type = EActorType.ESoldier;
        this.hp = soldier_config.hp;
        this.max_hp = this.hp;
        this.att = soldier_config.att;
        this.soldier_type = soldier_config.type;
        this.speed_x = soldier_config.move_speed;
        if(this.soldier_type == ESoldierType.EArcher)
        {
            this.bullet = soldier_config.bullet;
            this.launch_pos = soldier_config.launch_pos;
        }
        this.damage_delay = soldier_config.damage_delay;
        this.att_range = soldier_config.att_range;
        this.col_range = soldier_config.col_range;
        this.anchor = soldier_config.anchor;
        this.initWithActorConfig(soldier_config.actor,camp);
        this.initShadow(soldier_config.shadow);
    },

    enemyDie:function () 
    {
        this.target_id = null;
        var target = this.findFightTarget();
        if(target!=null)
        {
            this.moveToTarget(target,randomF(0,0.1));
        }
        else
        {
            this.wander(this);
        }
    },

    attach:function (target) 
    {
        if(target == null)
        {
            cc.log("attach target error!!");
        }

        if(this.cur_stat != EActorStat.EAttach)
        {
            this.stopAllActions();
 
            var motion = this.actor_config["Attach"];
            var img_array = genImgArray(motion);
            var animate = genAnimateArr(img_array,motion.interval);
            this.damage_round = animate.getAnimation().getDuration();
            var repeat = cc.RepeatForever.create(animate);
            this.runAction(repeat);
        }
        var d_x = target.getPositionX() - this.getPositionX();
        if(d_x>0)
        {
            this.setDirection(EDir.ToRight);
            target.opp_left = this.actor_id;
        }
        else
        {
            this.setDirection(EDir.ToLeft);
            target.opp_right = this.actor_id;
        }

        this.target_id = target.actor_id;
        if(target.target_id == null)
        {
            target.startFight(this);
        }
        
        this.cur_stat = EActorStat.EAttach;
    },

    reachTarget:function () 
    {
        var target = this.getMoveTarget();
        if(target == null)
        {
            target = this.findFightTarget();
            if(target != null)
            {
                this.moveToTarget(target,randomF(0,0.3));
                cc.log("ID:"+target.actor_id);
                return;
            }
            else
            {
                this.wander(this);
                cc.log(this.enemy_list[0].opp_left);
                cc.log(this.enemy_list[0].opp_right);
                return;
            }
        }
        else
        {
            cc.log("ID:"+target.actor_id);
            this.startFight(target);
        }
    },

    reachDest:function () 
    {
       if(this.move_flag == MoveFlag.AttTarget)
       {
           var target = this.getMoveTarget();
           if(target != null)
           {
                this.attach(target);
           }
           else
           {
                target = this.findFightTarget();
                if(target !=null)
                {
                    this.moveToTarget(target,randomF(0,0.3));
                }
                else
                {
                    this.wander(this);
                }
           }
       }
       else if(this.move_flag == MoveFlag.Wander)
       {
            var target = this.findFightTarget();
            if(target == null)
            {
               this.wander(this);
            }
            else
            {
               this.startFight(target);
            }
       }
    },

    wander:function (target) 
    {
        this.move_flag = MoveFlag.Wander;
        var pos = target.getPosition();
        var move_x = randomF(-WanderRadius,WanderRadius);
        var move_y = randomF(-WanderRadius,WanderRadius);
        if(Math.abs(move_x)<0.3*WanderRadius)
        {   move_x += 0.3*WanderRadius;}
        if(Math.abs(move_y)<0.3*WanderRadius)
        {   move_y += 0.3*WanderRadius;}
        pos.x += move_x;
        pos.y += move_y;
        var width = this.battle_ground.ground_width;
        var height = this.battle_ground.ground_height;
        var size = this.battle_ground.ground_img.getContentSize();
        if(pos.x>width*0.5){pos.x = width*0.5-randomF(0,100);}
        if(pos.y>height*0.5){pos.y = height*0.5-randomF(0,50);}
        if(pos.x<-width*0.5){pos.x = -width*0.5+randomF(0,100);}
        if(pos.y<-height*0.5){pos.y = -height*0.5+randomF(0,50);}
        this.moveToDst(pos,randomF(0,0.3));
    },

    startFight:function (target) 
    {
        var pos = this.getPosition();
        var target_pos = target.getPosition();
        var d_x = target_pos.x - pos.x;
        var d_y = target_pos.y - pos.y;
        if(d_x>0)
        {
            if(target.opp_left == null)
            {
                this.move_flag = MoveFlag.AttTarget;
                this.moveToDst(this.getLeftFightPos(target),0);
                target.opp_left = this.actor_id;
            }
            else if(target.opp_right == null)
            {
                this.move_flag = MoveFlag.AttTarget;
                this.moveToDst(this.getRightFightPos(target),0);
                target.opp_right = this.actor_id;
            }
            else
            {
                this.wander(target);
            }
        }
        else if(d_x<0)
        {
            if(target.opp_right == null)
            {
                this.moveToDst(this.getRightFightPos(target),0);
                target.opp_right = this.actor_id;
                this.move_flag = MoveFlag.AttTarget;
            }
            else if(target.opp_left == null)
            {
                this.moveToDst(this.getLeftFightPos(target),0);
                target.opp_left = this.actor_id;
                this.move_flag = MoveFlag.AttTarget;
            }
            else
            {
                this.wander(target);
            }
        }
    },

    attachHits:function () // on hit point
    {
        var target = this.getTarget();
        if(target == null)
        {return;}
        if(this.soldier_type == ESoldierType.EArcher)
        {
            var bullet = new Bullet;
            bullet.initBullet(this,target);
            this.getParent().addChild(bullet,1000);
        }
        else
        {
            target.injure(this.att);
        }
    },


})