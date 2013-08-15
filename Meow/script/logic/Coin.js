require("script/config/coin_config.js");

var Coin = cc.Sprite.extend({
speed_y:100,
life_tick:0,
born_pos:null,
coin_val:1,
initCoin:function (config,born_pos,speed_y) 
{
    this.coin_val = config.coin_val;
    var motion = config.actor;
    var animation = cc.Animation.create();
    animation.setDelayPerUnit(motion.interval);
    var texture = cc.TextureCache.getInstance().addImage(motion.imgfile);
    var img_size = texture.getContentSize();
    var frame_width = img_size.width/motion.x_seg;
    var frame_height = img_size.height/motion.y_seg;
    for(var i=config.actor.start;i<=config.actor.end;i++)
    {
        var seg_x = i%motion.x_seg;
        var seg_y = parseInt(i/motion.x_seg);
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
             PlayerData.StageCoin += this.coin_val;
             ui_parser.currentScene.refreshStageCoin();
             parent.removeChild(this,true);
             return;
          }
     }
},
});
