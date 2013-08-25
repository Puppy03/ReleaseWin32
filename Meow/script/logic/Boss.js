require("script/config/boss_config.js");
require("script/logic/Explosion.js");

var BossStat={
Born:0,
Normal:1,
Hurt:2
}

var Boss = cc.Node.extend({
mn_type:EMNodeType.EBoss,
cur_stat:BossStat.Born,
config:null,
hp:0,
speed:0,
fight_pos:200,
img_normal:null,
img_hurt:null,
anim_img:null,
hurt_flag:false,
hurt_time:0,
hurt_idle:false,
die_delay:0,
die_effect:null,
score_val:10,
col_size:null,
cur_behavior_idx:0,
behavior_tick:0,

initBoss:function (boss_config) 
{
    this.config = boss_config;
    this.hp = boss_config.hp;
    this.speed = boss_config.speed;
    this.col_size = boss_config.col_size;

    if(boss_config.img_normal != "")
    {
        this.img_normal = cc.Sprite.create(boss_config.img_normal);
        this.addChild(this.img_normal);
    }
    if(boss_config.img_hurt != "")
    {
        this.img_hurt = cc.Sprite.create(boss_config.img_hurt);
        this.addChild(this.img_hurt);
        this.img_hurt.setVisible(false);
    }

    var motion = boss_config.actor;
    var img_array = genImgArray(motion);

    this.anim_img = cc.Sprite.create(img_array[0]);
    var animate = genAnimateArr(img_array,motion.interval);
    var repeat = cc.RepeatForever.create(animate);
    this.anim_img.runAction(repeat);
    this.addChild(this.anim_img,-1);

},

updateStat:function (dt) 
{
    if(this.cur_stat == BossStat.Born)
    {
        var pos_y = this.getPositionY();
        if(pos_y<=this.fight_pos)
        {
            this.setPositionY(this.fight_pos);
            this.cur_stat = BossStat.Normal;
        }
        else
        {
            pos_y -= this.speed*dt;
            this.setPositionY(pos_y);
        }
    }
    else if(this.cur_stat == BossStat.Normal)
    {
        this.tickBehavior(dt);
    }
    this.tickHurt(dt);
},

tickHurt:function(dt)
{
    if(this.hurt_flag == true)
    {
        if(this.hurt_time>0)
        {this.hurt_time -= dt;}
        else
        {
            this.hurt_flag = false;
            if(this.img_hurt!=null)
            {
                this.img_hurt.setVisible(false);
            }
            if(this.img_normal!=null)
            {
                this.img_normal.setVisible(true);
            }
            if(this.hurt_idle)
            {
                this.anim_img.setVisible(true);
            }
        }
    }
    var fighter = this.getParent().fighter;
    if(fighter != null)
    {
        var e_rect = rectForNode(this);
        var f_rect = fighter.getColRect();
        if(cc.rectIntersectsRect(e_rect,f_rect))
        {
            fighter.die(); 
            return;
        }
    }
},

tickBehavior:function(dt)
{
    this.behavior_tick += dt;
    if(this.cur_behavior_idx == this.config.behavior.length)
    {
        if(this.behavior_tick>this.config.loop_time)
        {
            cc.log("behavior loop!!");
            this.behavior_tick = 0;
            this.cur_behavior_idx = 0;
        }
        else
        {
            return;
        }
    }

    for(var i=this.cur_behavior_idx; i<this.config.behavior.length; i++)
    {
        var behavior = this.config.behavior[i];
        if(this.behavior_tick>behavior.time)
        {
            cc.log("cur behavior idx:"+this.cur_behavior_idx);
            this.runBehavior(behavior);
            this.cur_behavior_idx = i+1;
        }
        else
        {
            return;
        }
    } 
},

runBehavior:function(behavior)
{
    if(behavior.type == EBehavior.ActMove)
    {
        var move = cc.MoveTo.create(behavior.dur,cc.p(behavior.x,behavior.y));
        this.runAction(move);
    }
    else if(behavior.type == EBehavior.DropMete)
    {
        var _config = meteoriteConfig[behavior.config];
        this.getParent().dropMeteorite(_config,behavior.follow_speed);
    }
    else if(behavior.type == EBehavior.Shoot)
    {
        var _config = bulletConfig[behavior.config];
        var pos = this.getPosition();
        pos.x += behavior.born_x;
        pos.y += behavior.born_y;
        var bullet = new Bullet;
        bullet.initBullet(_config);
        bullet.setPosition(pos);
        bullet.speed_x = behavior.speed_x;
        bullet.speed_y = behavior.speed_y;
        var parent = this.getParent();
        parent.addChild(bullet);
    }
    else if(behavior.type == EBehavior.Summon)
    {
        var _config = enemyConfig[behavior.config];
        var pos = this.getPosition();
        pos.x += behavior.born_x;
        pos.y += behavior.born_y;
        this.getParent().createEnemy(_config,pos);
    }
},

hited:function (damage) 
{
    this.hp -= damage;

    if(this.img_hurt!=null)
    {
        this.img_hurt.setVisible(true);
    }
    if(this.img_normal!=null)
    {
        this.img_normal.setVisible(false);
    }
    if(this.hurt_idle)
    {
        this.anim_img.setVisible(false);
    }

    this.hurt_time = 0.2;
    this.hurt_flag = true;
},

die:function () 
{
    PlayerData.StageScore += this.score_val;
    ui_parser.currentScene.refreshStageScore();

    var explosion = new Explosion;
    explosion.initExplotion(deadEffect);
    var pos = this.getPosition()
    explosion.setPosition(pos);
    var parent = this.getParent();
    parent.addChild(explosion);

    audio_palyer.playEffect(deadSound);

    if(!parent.dropItem(pos))
    {
        parent.dropCoin(coinConfig.Coin00,pos);
    }  
},


getColRect:function () 
{
    var origin = this.getPosition();
    origin.x -= this.col_size.width*0.5;
    origin.y -= this.col_size.height*0.5;
    return new cc.rect(origin.x,origin.y,this.col_size.width,this.col_size.height);
},

});
