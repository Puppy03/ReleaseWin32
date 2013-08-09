require("script/config/hero_config.js");
require("script/logic/anim_actor.js");

var Hero = AnimActor.extend({
rage:0,
rage_max:100,
rage_growth:10,
magic:100,
max_magic:100,
initHero:function (hero_config,camp) 
{
    this.type = EActorType.EHero;
    this.damage_delay = hero_config.damage_delay;
    this.att = hero_config.att;
    this.hp = hero_config.hp;
    this.max_hp = this.hp;
    this.magic = hero_config.magic;
    this.max_magic = this.magic;
    this.att_range = hero_config.att_range;
    this.col_range = hero_config.col_range;
    this.speed_x = hero_config.move_speed;
    this.anchor = hero_config.anchor;
    this.initWithActorConfig(hero_config.actor,camp);
    this.initShadow(hero_config.shadow);

    this.schedule(this.tickRage);
},


findFightTarget:function () 
{
    if(this.enemy_list[0]==null)
    {
        return this._super();
    }
    else
    {
        return this.enemy_list[0];
    }
},

attach:function (target) 
{
    if(this.cur_stat == EActorStat.EAttach)
    {
        cc.log("attach Abnormal!!!");
    }
    this.stopAllActions();
    var motion = null;
    var d_x = this.getPositionX()-target.getPositionX();
    if(target.type==EActorType.EHero)
    {
        if(d_x>0)
        {
            this.setDirection(EDir.ToLeft);
            target.opp_right = this.actor_id;
        }
        else
        {
            this.setDirection(EDir.ToRight);
            target.opp_left = this.actor_id;
        }
        motion = this.actor_config["Att_f"];
    }
    else
    {
        if((d_x>0&&this.direction==EDir.ToLeft) || (d_x<0&&this.direction==EDir.ToRight))
        {
            motion = this.actor_config["Att_fd"];
        }
        else
        {
            motion = this.actor_config["Att_b"];
        }
    }

    var img_array = genImgArray(motion);
    var animate = genAnimateArr(img_array,motion.interval);
    this.damage_round = animate.getAnimation().getDuration();
    var repeat = cc.RepeatForever.create(animate);
    this.runAction(repeat);

    this.target_id = target.actor_id;
    this.cur_stat = EActorStat.EAttach;
    if(target.target_id == null)
    {
        target.startFight(this);
    }
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
        this.idle();
    }
},

attachHits:function () // on hit point
{
    var target = this.getTarget();
    if(target!=null){target.injure(this.att);}
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
            return;
        }
        else
        {
            this.idle();
            return;
        }
    }
    else
    {
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

startFight:function (target) 
{   
    var pos = this.getPosition();
    var target_pos = target.getPosition();
    var d_x = target_pos.x - pos.x;
    var d_y = target_pos.y - pos.y;
    if(d_x>0)
    {
        if(target.opp_left != null)
        {
            var opp_left = target.getOppLeft();
            if(opp_left!=null)
            {
                cc.log("opp_left aside!");
                opp_left.wander(target);
                opp_left.target_id = null;
            }
        }
        this.moveToDst(this.getLeftFightPos(target),0);
        target.opp_left = this.actor_id;
        this.move_flag = MoveFlag.AttTarget;
    }
    else if(d_x<0)
    {
        if(target.opp_right != null)
        {
            var opp_right = target.getOppLeft();
            if(opp_right!=null)
            {
                cc.log("opp_right aside!");
                opp_right.wander(target);
                opp_right.target_id = null;
            }
        }
        this.moveToDst(this.getRightFightPos(target),0);
        target.opp_right = this.actor_id;
        this.move_flag = MoveFlag.AttTarget;
    }
},

wander:function (_target) 
{
    this.move_flag = MoveFlag.Wander;
    var target = this.findFightTarget();
    if(target == null)
    {
        this.idle();
    }
    else
    {
        this.moveToTarget(target,randomF(0,0.3));
    }
},
 tickRage:function (dt)
 {
    if(this.rage<this.rage_max)
    {
        this.rage += dt*this.rage_growth;
        if(this.rage>this.rage_max)
        {
         this.rage = this.rage_max;
        }
    }
 },

});