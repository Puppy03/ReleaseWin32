require("script/config/barrier_config.js");

var Barrier = cc.Sprite.extend({
mn_type:EMNodeType.EBarrier,
id:0,
config:null,
col_size:null,
initBarrier:function(config)
{
    this.config = config;
    this.col_size = config.col_size;
    this.init(config.image);

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
            fighter.die();
            return;
        }
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