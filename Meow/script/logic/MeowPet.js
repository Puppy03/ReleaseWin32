require("script/config/pet_config.js");

var MeowPet = cc.Sprite.extend({
pet_type:EMNodeType.EBarrier,
fl_type:EFlType.EFLLeft,
hp:1,
att:10,
fl_speed:250,
fl_offset:50,
retain_range:160,
config:null,
shoot_interval:1,
shoot_tick:0,
bullet_config:null,
initPet:function(config,fl_type)
{
    this.config = config;
    this.bullet_config = bulletConfig.BulletPet0;
    this.fl_type = fl_type;
    var motion = config.actor;
    var img_array = genImgArray(motion);

    var firTexture = cc.TextureCache.getInstance().addImage(img_array[0]);
    this.initWithTexture(firTexture);

    var animate = genAnimateArr(img_array,motion.interval);
    var repeat = cc.RepeatForever.create(animate);
    this.runAction(repeat);
    this.schedule(this.updateStat);
},

updateStat:function(dt)
{ 
    var parent = this.getParent();
    var fighter = parent.fighter;
    if(fighter == null)
    {
        return;
    }
    if(this.shoot_tick >= this.shoot_interval)
    {
        this.shoot_tick -= this.shoot_interval;
        this.shoot();
    }
    this.shoot_tick += dt;

    var f_pos_x = fighter.getPositionX();
    var s_pos_x = this.getPositionX();
    var retain_x = this.fl_type==EFlType.EFLLeft?f_pos_x-this.retain_range:f_pos_x+this.retain_range;
    var offset = s_pos_x-retain_x;
    if(Math.abs(offset)<10)
    {
        this.setPositionX(retain_x);
        return;
    }
    if(Math.abs(offset)>this.fl_offset)
    {
        var pos_x = retain_x;
        if(offset>0)
        {pos_x += this.fl_offset;}
        else
        {pos_x -= this.fl_offset;}
        this.setPositionX(pos_x);
    }
    else
    {
        if(offset>0)
        {s_pos_x -= this.fl_speed*dt;}
        else
        {s_pos_x += this.fl_speed*dt;}
        this.setPositionX(s_pos_x);
    }

},
pause:function ()
{
    this.unschedule(this.updateStat);
},
resume:function ()
{
    this.schedule(this.updateStat);
},

shoot:function () 
{
    var _bullet = new Bullet;
    _bullet.initBullet(this.bullet_config);
    this.getParent().addChild(_bullet);
    var pos = this.getPosition();
    pos.y += this.getContentSize().height*0.5;
    _bullet.setPosition(pos);
},

die:function ()
{
},

});