require("script/common/frame_anim.js");
require("script/logic/Bullet.js");
require("script/config/bullet_config.js");

var EFighterStat={
EBorn:0,
EFight:1,
EDie:2,
};
var FighterCry={
prefix:"fighter/tear/",
start:1,
end:4,
interval:0.12,
};

var Fighter = cc.Node.extend({
cur_stat:EFighterStat.EBorn,
config:null,
anim_img:null,
dying_img:null,
dying_effect1:null,
dying_effect2:null,
charge_effect:null,
col_size:null,
shoot_interval:0.12,
shoot_tick:0,
born_y:-200,
fight_y:120,
born_tick:0,
bullet_config:null,
dying_tick:0,
double_duration:0,
magnet_duration:0,
magnet_size:null,
pet_left:null,
pet_right:null,
draw_col_rect:true,
initFighter:function (fighter_config) 
{
    this.config = fighter_config;
    this.bullet_config = bulletConfig.Bullet00;
    this.col_size = fighter_config.col_size;
    if(this.draw_col_rect)
    {
        this.drawColRect();
    }
    this.magnet_size = fighter_config.magnet_size_n;
    var motion = fighter_config.actor;
    var img_array = genImgArray(motion);

    this.anim_img = cc.Sprite.create(img_array[0]);
    this.addChild(this.anim_img);

    var animate = genAnimateArr(img_array,motion.interval);
    var repeat = cc.RepeatForever.create(animate);
    this.anim_img.runAction(repeat);

    this.dying_img = cc.Sprite.create(fighter_config.img_hurt);
    this.addChild(this.dying_img);
    this.dying_img.setVisible(false);

    this.setPosition(0,-design_size.height*0.5+this.born_y);
    var move = cc.MoveTo(0.3,cc.p(0,-design_size.height*0.5+this.fight_y));
    this.born_tick = 0.3;
    this.runAction(move);

    this.schedule(this.tickBorn);
},

tickBorn:function (dt) 
{
    this.born_tick -= dt;
    if(this.born_tick<=0)
    {
        this.setPositionY(-design_size.height*0.5+this.fight_y);
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
    if(this.double_duration>0)
    {
        this.double_duration -= dt;
    }
    else
    {
        this.double_bullet = false;
    }
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
    _bullet.initBullet(this.bullet_config);
    this.getParent().addChild(_bullet);
    var pos = this.getPosition();
    pos.y += this.col_size.height*0.5;
    
    if(this.double_duration>0)
    {
        pos.x -= 40;
        var pos2 = cc.p(pos.x+80,pos.y);
        var _bullet2 = new Bullet;
        _bullet2.initBullet(this.bullet_config);
        this.getParent().addChild(_bullet2);
        _bullet2.setPosition(pos2);
    }

    _bullet.setPosition(pos);
},

pauseShoot:function () 
{
    this.unschedule(this.tickShoot);
    if(this.pet_left != null)
    {
        this.pet_left.pause();
    }
    if(this.pet_right != null)
    {
        this.pet_right.pause();
    }    
},

resumeShoot:function ()
{
    this.schedule(this.tickShoot);
    if(this.pet_left != null)
    {
        this.pet_left.resume();
    }
    if(this.pet_right != null)
    {
        this.pet_right.resume();
    }
},

addPet:function(config)
{
    var parent = this.getParent();
    if(this.pet_left == null)
    {
        var pet = new MeowPet;
        pet.initPet(config,EFlType.EFLLeft);
        parent.addChild(pet,100);
        pet.setPosition(this.getPositionX()-pet.retain_range,-design_size.height*0.5+this.fight_y);
        this.pet_left = pet;
    }
    else if(this.pet_right == null)
    {
        var pet = new MeowPet;
        pet.initPet(config,EFlType.EFLRight);
        parent.addChild(pet,100);
        pet.setPosition(this.getPositionX()+pet.retain_range,-design_size.height*0.5+this.fight_y);
        this.pet_right = pet;
    }
},

die:function () 
{
    return;
    this.unschedule(this.tickShoot);
    ui_parser.currentScene.gameOver();
    this.anim_img.setVisible(false);
    this.dying_img.setVisible(true);

    var img_array = genImgArray(FighterCry);
    this.dying_effect1 = cc.Sprite.create(img_array[0]);
    this.dying_effect2 = cc.Sprite.create(img_array[0]);
    this.dying_effect2.setFlipX(true);
    this.addChild(this.dying_effect1,-1);
    this.addChild(this.dying_effect2,-1);
    this.dying_effect1.setPosition(-75,0);
    this.dying_effect2.setPosition(75,0);
    
    var animate1 = genAnimateArr(img_array,FighterCry.interval);
    var animate2 = genAnimateArr(img_array,FighterCry.interval);
    var repeat1 = cc.RepeatForever.create(animate1);
    var repeat2 = cc.RepeatForever.create(animate2);
    this.dying_effect1.runAction(repeat1);
    this.dying_effect2.runAction(repeat2);
},

charge:function(show)
{
    if(show && this.charge_effect==null)
    {
        this.charge_effect = cc.Sprite.create("fighter/boosterHead.png");
        this.addChild(this.charge_effect);
        this.charge_effect.setPosition(this.col_size.width*0.5,this.col_size.height+20);
        this.charge_effect.setScaleY(2);
        this.charge_effect.setScaleX(4);
    }
    if(!show && this.charge_effect!=null)
    {
        this.removeChild(this.charge_effect,false);
        this.charge_effect = null;
    }
},
doubleBullet:function(duration)
{
    this.double_duration = duration;
},
magnetStat:function(duration)
{
    this.magnet_duration = duration;
    this.magnet_size = this.config.magnet_size_s;
    this.schedule(this.tickMagnetStat);
},

tickMagnetStat:function(dt)
{
    this.magnet_duration -= dt;
    if(this.magnet_duration<0)
    {
        this.magnet_duration = 0;
        this.magnet_size = this.config.magnet_size_n;
        this.unschedule(this.tickMagnetStat);
    }
},

getColRect:function () 
{
    var origin = this.getPosition();
    origin.x -= this.col_size.width*0.5;
    origin.y -= this.col_size.height*0.5;
    return new cc.rect(origin.x,origin.y,this.col_size.width,this.col_size.height);
},

drawColRect:function ()
{
    var size = this.col_size;
    var d_bound = cc.DrawNode.create();
    var green = cc.c4f(0,1,0,1); 
    d_bound.drawSegment(cc.p(-size.width*0.5,size.height*0.5),cc.p(size.width*0.5,size.height*0.5),1,green);
    d_bound.drawSegment(cc.p(size.width*0.5,size.height*0.5),cc.p(size.width*0.5,-size.height*0.5),1,green);
    d_bound.drawSegment(cc.p(-size.width*0.5,-size.height*0.5),cc.p(size.width*0.5,-size.height*0.5),1,green);
    d_bound.drawSegment(cc.p(-size.width*0.5,size.height*0.5),cc.p(-size.width*0.5,-size.height*0.5),1,green);
    this.addChild(d_bound);
},

getMagnetRect:function()
{
    var origin = this.getPosition();
    origin.x -= this.magnet_size.width*0.5;
    origin.y -= this.magnet_size.height*0.5;
    return new cc.rect(origin.x,origin.y,this.magnet_size.width,this.magnet_size.height);
},

});