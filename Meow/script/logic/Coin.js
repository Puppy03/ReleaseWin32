require("script/config/coin_config.js");


var Coin = cc.Sprite.extend({
mn_type:EMNodeType.ECoin,
hp:1,
life_tick:0,
coin_val:1,
col_size:null,
sound:null,
magnet_speed:600,
magnet_mark:false,
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
    cc.log("coin die!");
},
updateStat:function (dt)
{
    if(this.magnet_mark)
    {
        return;
    }
    var parent = this.getParent().getParent();
    var pos_y = this.getPositionY();
    this.setPositionY(pos_y - parent.roll_speed*dt);
    var fighter = parent.fighter;
    if(fighter==null)
    {
        return;
    }
    var s_rect = this.getColRect();

    if(!this.magnet_mark)
    {
        var magnet_rect = fighter.getMagnetRect();
        if(cc.rectIntersectsRect(magnet_rect,s_rect))
        {
            this.magnet_mark = true;
            this.schedule(this.tickMagenetMove);
        }
    }
},

tickMagenetMove:function(dt)
{
    var fighter = this.getParent().getParent().fighter;
    var s_pos = this.getPosition();
    var f_pos = fighter.getPosition();
    var f_rect = fighter.getColRect();
//    if(cc.rectContainsPoint(f_rect,s_pos))
//    {
//        this.coinPicked();
//        this.unschedule(this.tickMagenetMove);
//        return;
//    }
    var vector = cc.p(f_pos.x-s_pos.x,f_pos.y-s_pos.y);
    var v_len = getLength(f_pos,s_pos);
    if(v_len<60)
    {
       this.coinPicked();
       this.unschedule(this.tickMagenetMove);
       return;
    }
    s_pos.x += (vector.x/v_len)*this.magnet_speed*dt;
    s_pos.y += (vector.y/v_len)*this.magnet_speed*dt;
    this.setPosition(s_pos);
},

coinPicked:function()
{
    PlayerData.StageCoin += this.coin_val;
    audio_palyer.playEffect(this.sound);
    ui_parser.currentScene.refreshStageCoin();
    this.hp = 0;
    return;
},

getColRect:function () 
{
    var origin = this.getPosition();
    origin.x -= this.col_size.width*0.5;
    origin.y -= this.col_size.height*0.5;
    return new cc.rect(origin.x,origin.y,this.col_size.width,this.col_size.height);
},
});
