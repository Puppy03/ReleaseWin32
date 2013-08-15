
var coinConfig = {
imgfile:"item/coin.png",
x_seg:7,
y_seg:1,
start:0,
end:6,
interval:0.1,
}

var Coin = cc.Sprite.extend({
speed_y:100,
life_tick:0,
born_pos:null,
initCoin:function (born_pos,speed_y) 
{
    var animation = cc.Animation.create();
    animation.setDelayPerUnit(coinConfig.interval);
    var texture = cc.TextureCache.getInstance().addImage(coinConfig.imgfile);
    var img_size = texture.getContentSize();
    var frame_width = img_size.width/coinConfig.x_seg;
    var frame_height = img_size.height/coinConfig.y_seg;
    for(var i=coinConfig.start;i<=coinConfig.end;i++)
    {
        var seg_x = i%coinConfig.x_seg;
        var seg_y = parseInt(i/coinConfig.x_seg);
        var _rect = new cc.rect(seg_x*frame_width,seg_y*frame_height,frame_width,frame_height);
        animation.addSpriteFrameWithTexture(texture,_rect);
    }
    var animate = cc.Animate.create(animation);
    var repeat = cc.RepeatForever.create(animate);
    this.initWithTexture(texture,cc.rect(0,0,frame_width,frame_height));
    this.runAction(repeat);

    this.speed_y = speed_y;
    this.born_pos = born_pos;
    this.setPosition(born_pos);
    
    this.schedule(this.tickStat);
},
tickStat:function (dt)
{
    var pos_y = this.getPositionY();
    pos_y -= this.speed_y*dt;
    this.setPositionY(pos_y);
    var parent = this.getParent();
    var layer_size = parent.getContentSize();
    if(pos_y<-layer_size.height*0.5)
    {
        parent.removeChild(this,true);
        return;
    }
     var fighter = parent.fighter;
     if(fighter!=null)
     {
          var rect = rectForNode(fighter);
          if(cc.rectContainsPoint(rect,this.getPosition()))
          {
             parent.removeChild(this,true);
             return;
          }
     }
},
});
