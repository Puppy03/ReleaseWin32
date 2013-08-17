require("script/config/item_config.js");


var PropItem = cc.Sprite.extend({
mn_type:EMNodeType.EItem,
item_type:EItemType.ENone,
hp:1,
col_size:null,
config:null,
initItem:function (config)
{
    this.config = config;
    this.item_type = config.item_type;
    this.col_size = config.col_size;
    this.init(config.image);
},
die:function()
{
},
updateStat:function (dt)
{
    var parent = this.getParent();
    var pos_y = this.getPositionY();
    this.setPositionY(pos_y - this.getParent().roll_speed*dt);
    var fighter = parent.fighter;
    if(fighter!=null)
    {
          var f_rect = fighter.getColRect();
          var s_rect = this.getColRect();
          if(cc.rectIntersectsRect(f_rect,s_rect))
          {
             this.hp = 0;
             this.itemPicked();
             return;
          }
    }
},

itemPicked:function()
{
    var parent = this.getParent();
    var fighter = parent.fighter;
    if(this.item_type == EItemType.EAccelerate)
    {
        parent.chargeAhead(this.config.duration);
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
