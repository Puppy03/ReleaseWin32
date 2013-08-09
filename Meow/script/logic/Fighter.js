require("script/common/frame_anim.js");
require("script/logic/Bullet.js");
require("script/config/bullet_config.js");

var EFighterStat={
EBorn:0,
EFight:1,
EDie:2,
}

var Fighter = cc.Sprite.extend({
stat:EFighterStat.EBorn,
col_size:null,
shoot_interval:0.12,
shoot_tick:0,
born_y:-300,
fight_y:150,
born_tick:0,
bullet_config:null,
dying_tick:0,
dying_effect1:null,
dying_effect2:null,
initFighter:function (fighter_config) 
{
    this.bullet_config = bulletConfig.Bullet00;
    this.col_size = fighter_config.col_size;
    var motion = fighter_config.actor.Fly;
    var img_array = genImgArray(motion);

    var firTexture = cc.TextureCache.getInstance().addImage(img_array[0]);
    var img_size = firTexture.getContentSize();
    this.initWithTexture(firTexture,new cc.rect(0,0,img_size.width,img_size.height));

    var animate = genAnimateArr(img_array,motion.interval);
    var repeat = cc.RepeatForever.create(animate);
    this.runAction(repeat);

    this.setPosition(win_size.width*0.5,this.born_y);
    var move = cc.MoveTo(0.3,cc.p(win_size.width*0.5,this.fight_y));
    this.born_tick = 0.3;
    this.runAction(move);

    this.schedule(this.tickBorn);
},

tickBorn:function (dt) 
{
    this.born_tick -= dt;
    if(this.getPositionY()>=this.fight_y || this.born_tick<0.3)
    {
        this.setPositionY(this.fight_y);
        this.schedule(this.tickShoot);
        this.unschedule(this.tickBorn);
        return;
    }
},

setCurBullet:function(config) 
{
    this.bullet_config = config;
},

tickShoot:function (dt) 
{
    if(this.shoot_tick >= this.shoot_interval)
    {
        this.shoot_tick -= this.shoot_interval;
        this.shoot();
    }
    this.shoot_tick += dt;
},

shoot:function () 
{
    var _bullet = new Bullet;
    _bullet.initBullet(this.bullet_config,this);
    this.getParent().addChild(_bullet);
    var pos = this.getPosition();
    pos.y += this.getContentSize().height*0.5;
    _bullet.setPosition(pos);
},

pauseShoot:function () 
{
    this.unschedule(this.tickShoot);
},

die:function () 
{
    this.unschedule(this.tickShoot);
    this.getParent().gameOver();
    this.dying_effect1 = cc.Sprite.create("fighter/bloodCircle.png");
    this.dying_effect2 = cc.Sprite.create("fighter/bloodCircle.png");
    this.dying_effect2.setFlipX(true);
    this.addChild(this.dying_effect1);
    this.addChild(this.dying_effect2);
    var size = this.getContentSize();
    var pos = cc.p(size.width*0.5,size.height*0.5+8);
    this.dying_effect1.setPosition(pos);
    this.dying_effect2.setPosition(pos);
    this.schedule(this.tickDyingEffect);
},

tickDyingEffect:function (dt)
{
    this.dying_tick += dt;
    if(this.dying_tick>0.3)
    {
        this.dying_effect1.setScale(1.5);
        this.dying_effect2.setScale(1.5);
        this.dying_effect1.setRotation(25.5);
        this.dying_effect2.setRotation(25.5);
        this.unschedule(this.tickDyingEffect);
        this.schedule(this.tickDyingMove);
        this.dying_tick = 0;
        return;
    }
},

tickDyingMove:function(dt)
{
    this.dying_tick += dt;
    if(this.dying_tick>0.3)
    {
        var move = cc.MoveTo.create(0.2,cc.p(this.getPositionX(),this.born_y));
        this.runAction(move);
        this.unschedule(this.tickDyingMove);
        this.schedule(this.tickDyingEnd);
        this.dying_tick = 0;
        return;
    }
},

tickDyingEnd:function(dt)
{
    this.dying_tick += dt;
    if(this.getPositionY()<=this.born_y || this.dying_tick>0.2)
    {
        this.getParent().removeChild(this,true);
        return;
    }
}

});