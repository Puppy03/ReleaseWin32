require("script/config/barrier_config.js");

var Barrier = cc.Sprite.extend({
id:0,
speed:0,
config:null,
initBarrier:function(config,speed)
{
    this.config = config;
    this.init(config.image);
    this.speed = speed;
    this.schedule(this.tickStat);
},

tickStat:function(dt)
{
    var pos = this.getPosition();
    var size = this.getContentSize();
    if(pos.y<-size.height)
    {
        this.getParent().removeChild(this,true);
        return;
    }
    pos.y -= dt*this.speed;
    this.setPositionY(pos.y);
    var fighter = this.getParent().fighter;
    if(fighter!=null)
    {
        var e_rect = rectForNode(this);
        var f_rect = fighter.getColRect();
        if(cc.rectIntersectsRect(e_rect,f_rect))
        {
            this.unschedule(this.tickStat);
            fighter.die();
            return;
        }
    }
},

});