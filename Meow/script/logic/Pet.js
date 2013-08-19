require("script/config/barrier_config.js");

var Pet = cc.Sprite.extend({
pet_type:EMNodeType.EBarrier,
hp:1,
config:null,
initPet:function(config)
{
    this.config = config;

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
    var pos_y = this.getPositionY();
    this.setPositionY(pos_y - this.getParent().roll_speed*dt);
    if(fighter!=null)
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

die:function ()
{
},

getColRect:function () 
{
    var origin = this.getPosition();
    origin.x -= this.col_size.width*0.5;
    origin.y -= this.col_size.height*0.5;
    return new cc.rect(origin.x,origin.y,this.col_size.width,this.col_size.height);
},

});