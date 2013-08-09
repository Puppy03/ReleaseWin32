

var Coin = cc.Sprite.extend({
gravity:980,
speed_y:100,
scale_peroid:0.3,
scale_tick:0,
life_tick:0,
born_pos:null,
initCoin:function (born_pos,speed_y) 
{
    this.init("item/item_coin.png");

    this.speed_y = speed_y;
    this.born_pos = born_pos;
    this.setPosition(born_pos);
    
    this.schedule(this.tickStat);
},
tickStat:function (dt)
{
    this.scale_tick += dt;
    if(this.scale_tick >= this.scale_peroid)
    {
        this.scale_tick = 0;
        this.setScaleX(1);
        this.setFlipX(!this.isFlippedX());
    }
    else
    {
        this.setScaleX((this.scale_peroid-this.scale_tick)/this.scale_peroid);
    }

    var pos_y = this.getPositionY();
    pos_y -= this.speed_y*dt;
    this.setPositionY(pos_y);
    if(pos_y<-100)
    {
        this.getParent().removeChild(this,true);
        return;
    }
     var fighter = this.getParent().fighter;
     if(fighter!=null)
     {
          var rect = rectForNode(fighter);
          if(cc.rectContainsPoint(rect,this.getPosition()))
          {
             this.getParent().removeChild(this,true);
             return;
          }
     }
},
});
