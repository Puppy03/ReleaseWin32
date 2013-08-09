require("script/config/meteorite_config.js");

var EMeteStat={
EWarning:0,
EBorn:1,
EDrop:2
};

var Meteorite = cc.Node.extend({
config:null,
cur_stat:EMeteStat.EWarning,
follow_speed:0,
born_x:0,

warning_tick:0,
twink_tick:0,
born_tick:0,
drop_tick:0,

warn_node:null,
warn_line:null,
warn_mark:null,
meteo_img:null,
meteo_tail:null,
metoe_effect:null,
born_circle:null,

initMeteorite:function(config,f_speed,born_x)
{
    this.config = config;
    this.follow_speed = f_speed;
    this.born_x = born_x;
    this.drop_tick = (win_size.height+300)/this.config.speed;
    this.waring();
},
waring:function () 
{
    this.warn_node = cc.Node.create();
    this.warn_node.setPosition(this.born_x,0);
    this.addChild(this.warn_node);

    this.warn_line = cc.Sprite.create(this.config.warn_line);
    var line_size = this.warn_line.getContentSize();
    this.warn_line.setPositionY(win_size.height*0.5);
    this.warn_line.setScaleY(win_size.height/line_size.height);
    this.warn_node.addChild(this.warn_line);

    this.warn_mark = cc.Sprite.create(this.config.warn_mark);
    var mark_size = this.warn_mark.getContentSize();
    this.warn_mark.setPositionY(win_size.height-mark_size.height*0.5);
    this.warn_node.addChild(this.warn_mark);

    this.schedule(this.tickWarning);
    if(this.follow_speed>0)
    {
        this.schedule(this.tickFollow);
    }
},
born:function () 
{
    var circle_y = this.warn_mark.getPositionY();
    this.warn_node.removeChild(this.warn_mark,true);
    this.warn_mark = null;

   this.born_circle = cc.Sprite.create(this.config.born_circle);
   //var circle_size = this.born_circle.getContentSize();
   this.warn_node.addChild(this.born_circle);   
   this.born_circle.setPositionY(circle_y);
   this.born_circle.setScale(this.config.circle_maxscale);
  // shakeNode(this.born_circle,4);
   this.schedule(this.tickBorn);
},
tickWarning:function(dt)
{   
    this.warning_tick += dt;
    this.twink_tick += dt;
    if(this.warning_tick>=this.config.warn_time)
    {
        this.unschedule(this.tickWarning);
        this.born();
        return;
    }
    if(this.twink_tick>this.config.warn_twink)
    {
        this.twink_tick = 0;
        this.warn_mark.setVisible( !this.warn_mark.isVisible());
    }
},

tickFollow:function(dt)
{
    var fighter = this.getParent().fighter;
    if(fighter==null)
        return;
    var f_pos_x = fighter.getPositionX();
    var l_pos_x = this.warn_line.getPositionX();
    var d_x = f_pos_x - l_pos_x;
    var f_speed = this.follow_speed
    if(d_x>0)
    {
       f_speed = -this.follow_speed;
    }
    l_pos_x += dt*f_speed;
    this.warn_node.setPositionX(l_pos_x);
},

tickBorn:function(dt) 
{
    this.born_tick += dt;
    if(this.born_tick>this.config.born_time)
    {
        this.unschedule(this.tickBorn);
        this.warn_node.removeChild(this.warn_line,true);
        this.warn_node.removeChild(this.born_circle,true);
        this.warn_line = null;
        this.born_circle = null;

        this.meteo_img = cc.Sprite.create(this.config.image);
        var img_size = this.meteo_img.getContentSize();
        //this.setContentSize(img_size);
        this.meteo_img.setPosition(this.warn_node.getPositionX(),win_size.height+img_size.height*0.5);
        this.addChild(this.meteo_img);
    
        this.meteo_tail = cc.Sprite.create(this.config.tail_img);
        var tail_size = this.meteo_tail.getContentSize();
        this.meteo_tail.setPosition(img_size.width*0.5,img_size.height);
        this.meteo_tail.setScale(2.2);
        this.meteo_img.addChild(this.meteo_tail,-1);

        var particle = cc.ParticleSystem.create(this.config.particel);
        var pos_x = img_size.width*0.5+this.config.particel_offset.x;
        var pos_y = img_size.height*0.5+this.config.particel_offset.y
        particle.setPosition(pos_x,pos_y);
        this.meteo_img.addChild(particle,-2);
        
        this.schedule(this.tickDrop);
        if(this.follow_speed>0)
        {
            this.unschedule(this.tickFollow);
        }
        return;
    }
    var ofw_val = this.config.circle_maxscale-this.config.circle_minscale;
    var scale = (this.config.born_time-this.born_tick+ofw_val*this.config.born_time)/this.config.born_time;
    this.born_circle.setScale(scale);
},
tickDrop:function(dt)
{
    this.drop_tick -= dt;
    if(this.drop_tick<=0)
    {
        this.getParent().removeChild(this,true);
        return;
    }
    var cur_pos_y = this.meteo_img.getPositionY();
    var move_y = this.config.speed*dt;
    this.meteo_img.setPositionY(cur_pos_y-move_y);

    var fighter = this.getParent().fighter;
    if(fighter != null)
    {
        var e_rect = rectForNode(this.meteo_img,true);
        var f_rect = rectForNode(fighter,true);
        if(cc.rectIntersectsRect(e_rect,f_rect))
        {
            this.getParent().removeChild(this,true);
            fighter.die(); 
            return;
        }
    }
}

});