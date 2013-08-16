require("script/config/coin_config.js");


var Coin = cc.Sprite.extend({
mn_type:EMNodeType.ECoin,
hp:1,
life_tick:0,
coin_val:1,
col_size:null,
sound:null,
initCoin:function (config) 
{
    this.coin_val = config.coin_val;
    this.col_size = config.col_size;
    this.sound = config.sound;
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
             PlayerData.StageCoin += this.coin_val;
             cc.AudioEngine.getInstance().playEffect(this.sound);
             ui_parser.currentScene.refreshStageCoin();
             this.hp = 0;
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
