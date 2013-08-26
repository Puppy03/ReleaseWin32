
require("script/logic/Explosion.js");
require("script/logic/Coin.js");

var Enemy = cc.Node.extend({
speed:0,
hp:0,
fight_pos:200,
col_size:null,
img_normal:null,
img_hurt:null,
hurt_flag:false,
hurt_idle:false,
anim_img:null,
hurt_time:0,
die_effect:null,
born_effect:null,
born_tick:0,

initEnemy:function (config) 
{
    this.hp = config.hp;
    this.speed = config.speed;
    this.col_size = config.col_size;
    this.hurt_idle = config.hurt_idle;
    if(config.img_normal != "")
    {
        this.img_normal = cc.Sprite.create(config.img_normal);
        this.addChild(this.img_normal);
    }
    if(config.img_hurt != "")
    {
        this.img_hurt = cc.Sprite.create(config.img_hurt);
        this.addChild(this.img_hurt);
        this.img_hurt.setVisible(false);
    }

    var motion = config.actor;
    var img_array = genImgArray(motion);
    this.anim_img = cc.Sprite.create(img_array[0]);
    var animate = genAnimateArr(img_array,motion.interval);
    var repeat = cc.RepeatForever.create(animate);
    this.anim_img.runAction(repeat);
    this.addChild(this.anim_img,-1);

    if(config.hasOwnProperty("born"))
    {
        this.anim_img.setVisible(false);
        if(this.img_normal != null)
        {this.img_normal.setVisible(false);}
        this.cur_stat = MonsterStat.Born;

        var _motion = config.born;
        var _array = genImgArray(_motion);
        var _animate = genAnimateArr(_array,_motion.interval);
        this.born_tick = _animate.getAnimation().getDuration();
        this.born_effect = cc.Sprite.create(_array[0]);
        this.born_effect.runAction(_animate);
        this.addChild(this.born_effect);
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

tickHurt:function(dt)
{
    if(!this.hurt_flag)
        return;

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
},

tickMove:function(dt)
{
    var parent = this.getParent();
    var pos_y = this.getPositionY();

    pos_y -= dt*(this.speed+parent.roll_speed);
    this.setPositionY(pos_y);

    var fighter = parent.fighter;
    if(fighter != null)
    {
        var e_rect = rectForNode(this);
        var f_rect = fighter.getColRect();
        if(cc.rectIntersectsRect(e_rect,f_rect))
        {
            this.hp = 0;
            fighter.die(); 
            return;
        }
    }
},

tickBorn:function (dt)
{
    if(this.born_tick<=0)
    {
        this.cur_stat = MonsterStat.Normal;
        if(this.img_normal != null)
        {
            this.img_normal.setVisible(true);
        }
        this.removeChild(this.born_effect,true);
        this.anim_img.setVisible(true);
    }
    this.born_tick -= dt;
},

updateStat:function (dt) 
{
    this.tickMove(dt);
    this.tickHurt(dt); 
},

runDeadEffect:function()
{
    var explosion = new Explosion;
    explosion.initExplotion(deadEffect);
    var pos = this.getPosition()
    explosion.setPosition(pos);
    var parent = this.getParent();
    parent.addChild(explosion);

    audio_palyer.playEffect(deadSound);
},

die:function () 
{
    this.runDeadEffect();
},

getColRect:function () 
{
    var origin = this.getPosition();
    origin.x -= this.col_size.width*0.5;
    origin.y -= this.col_size.height*0.5;
    return new cc.rect(origin.x,origin.y,this.col_size.width,this.col_size.height);
},

});
