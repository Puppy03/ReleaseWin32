require("script/config/boss_config.js");
require("script/logic/Explosion.js");

var BossStat={
Born:0,
Normal:1,
Hurt:2
}

var Boss = cc.Sprite.extend({
mn_type:EMNodeType.EBoss,
cur_stat:BossStat.Born,
config:null,
hp:0,
speed:0,
fight_pos:200,
texture_normal:null,
texture_hurt:null,
anim_img:null,
hurt_time:0,
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
    this.texture_normal = cc.TextureCache.getInstance().addImage(boss_config.img_normal);
    this.texture_hurt = cc.TextureCache.getInstance().addImage(boss_config.img_hurt);
    var size = this.texture_normal.getContentSize();
    this.initWithTexture(this.texture_normal);

    var motion = boss_config.actor;
    var img_array = genImgArray(motion);

    var firTexture = cc.TextureCache.getInstance().addImage(img_array[0]);
    this.anim_img = cc.Sprite.createWithTexture(firTexture);
    var animate = genAnimateArr(img_array,motion.interval);
    var repeat = cc.RepeatForever.create(animate);
    this.anim_img.runAction(repeat);
    this.anim_img.setPosition(cc.p(size.width*0.5,size.height*0.5));
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
    if(this.cur_stat == BossStat.Hurt)
    {
        if(this.hurt_time>0)
        {this.hurt_time -= dt;}
        else
        {
            this.cur_stat = BossStat.Normal;
            this.setTexture(this.texture_normal);
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
    if(this.cur_behavior_idx == this.config.behavior.length-1)
    {
        if(this.behavior_tick>this.config.loop_time)
        {
                this.behavior_tick = 0;
                this.cur_behavior_idx = 0;
        }
        else
        {
            return;
        }
    }

    var cur_behavior = this.config.behavior[this.cur_behavior_idx];
    if(this.behavior_tick>=cur_behavior.time)
    {
        this.cur_behavior_idx++;
        cc.log("cur behavior idx:"+this.cur_behavior_idx);
        this.runBehavior(cur_behavior);
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

    this.setTexture(this.texture_hurt);
    this.hurt_time = 0.2;
    this.cur_stat = BossStat.Hurt;
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
