require("script/config/barrier_config.js");

var Pet = cc.Sprite.extend({
pet_type:EMNodeType.EBarrier,
fl_type:EFlType.EFLLeft,
hp:1,
att:10,
fl_speed:300,
config:null,
initPet:function(config,fl_type)
{
    this.config = config;
    this.fl_type = fl_type;
    var motion = config.actor;
    var img_array = genImgArray(motion);

    var firTexture = cc.TextureCache.getInstance().addImage(img_array[0]);
    var img_size = firTexture.getContentSize();
    this.initWithTexture(firTexture,new cc.rect(0,0,img_size.width,img_size.height));

    var animate = genAnimateArr(img_array,motion.interval);
    var repeat = cc.RepeatForever.create(animate);
    this.runAction(repeat);
},

updateStat:function(dt)
{ 
    var parent = this.getParent();
    var fighter = parent.fighter;
    var f_pos = fighter.getPosition();
},

die:function ()
{
},

});