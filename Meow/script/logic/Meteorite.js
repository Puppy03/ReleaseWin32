require("script/config/meteorite_config.js");

var EMeteStat={
EPreBorn:0,
EWarning:1,
ECircle:2,
EDrop:3,
};

var Meteorite = cc.Node.extend({
mn_type:EMNodeType.EMeteorite,
cur_stat:EMeteStat.EPreBorn,
config:null,
hp:1,
follow_speed:0,
update_tick:0,
twink_tick:0,
warn_line:null,
warn_mark:null,
meteo_img:null,
meteo_tail:null,
metoe_effect:null,
born_circle:null,
col_size:null,

initMeteorite:function(config,f_speed)
{
    this.config = config;
    this.col_size = config.col_size;
    this.follow_speed = f_speed;
},
updateStat:function (dt)
{
    this.update_tick += dt;
    if(this.cur_stat==EMeteStat.EPreBorn)
    {
        this.cur_stat=EMeteStat.EWarning;
        this.createWaring();
        return;
    }
    else if(this.cur_stat==EMeteStat.EWarning)
    {
        if(this.update_tick>=this.config.warn_time)
        {
            this.update_tick = 0;
            this.cur_stat=EMeteStat.ECircle
            this.createCircle();
            return;
        }
        this.twink_tick += dt;
        if(this.twink_tick>this.config.warn_twink)
        {
            this.twink_tick = 0;
            this.warn_mark.setVisible( !this.warn_mark.isVisible());
        }
    }
    else if(this.cur_stat==EMeteStat.ECircle)
    {
        if(this.update_tick>this.config.born_time)
        {  
            this.born();
            this.update_tick = 0;
            this.cur_stat = EMeteStat.EDrop;
            return;
        }
        var ofw_val = this.config.circle_maxscale-this.config.circle_minscale;
        var scale = (this.config.born_time-this.update_tick+ofw_val*this.config.born_time)/this.config.born_time;
        this.born_circle.setScale(scale);
    }
    else if(this.cur_stat==EMeteStat.EDrop)
    {
        var cur_pos_y = this.getPositionY();
        var move_y = this.config.speed*dt;
        this.setPositionY(cur_pos_y-move_y);

        var fighter = this.getParent().fighter;
        if(fighter != null)
        {
            var e_rect = this.getColRect();;
            var f_rect = fighter.getColRect();
            if(cc.rectIntersectsRect(e_rect,f_rect))
            {
                this.hp=0;
                fighter.die(); 
                return;
            }
        }
    }

    if(this.follow_speed>0 && this.cur_stat!=EMeteStat.EDrop)
    {
        this.tickFollow(dt);
    }
},

createWaring:function () 
{
    var parent = this.getParent();
    var layer_size = parent.getContentSize();
    var born_x = this.getPositionX();
    if(this.follow_speed>0)
    {
        born_x = parent.fighter.getPositionX();
        this.setPositionX(born_x);
    }

    this.warn_line = cc.Sprite.create(this.config.warn_line);
    var line_size = this.warn_line.getContentSize();
    var line_pos = parent.convertToWorldSpace(cc.p(born_x,0));
    line_pos = this.convertToNodeSpace(line_pos);
    this.warn_line.setPosition(line_pos);
    this.warn_line.setScaleY(layer_size.height/line_size.height);
    this.addChild(this.warn_line);

    this.warn_mark = cc.Sprite.create(this.config.warn_mark);
    var mark_size = this.warn_mark.getContentSize();
    var mark_pos = parent.convertToWorldSpace(cc.p(born_x,layer_size.height*0.5-mark_size.height*0.5));
    mark_pos = this.convertToNodeSpace(mark_pos);
    this.warn_mark.setPosition(mark_pos);
    this.addChild(this.warn_mark);
},
createCircle:function () 
{
    var circle_y = this.warn_mark.getPositionY();
    this.removeChild(this.warn_mark,true);
    this.warn_mark = null;

   this.born_circle = cc.Sprite.create(this.config.born_circle);
   this.addChild(this.born_circle);   
   this.born_circle.setPositionY(circle_y);
   this.born_circle.setScale(this.config.circle_maxscale);
},

tickFollow:function(dt)
{
    var fighter = this.getParent().fighter;
    if(fighter==null)
        return;
    var f_pos_x = fighter.getPositionX();
    var s_pos_x = this.getPositionX();
    var d_x = f_pos_x - s_pos_x;
    if(Math.abs(d_x)<fighter.col_size.width*0.5)
    {
        return;
    }
    var f_speed = this.follow_speed
    if(d_x<0)
    {
       f_speed = -this.follow_speed;
    }
    s_pos_x += dt*f_speed;
    this.setPositionX(s_pos_x);
    cc.log("mete Pos x:"+s_pos_x);
},

born:function(dt) 
{
    var parent = this.getParent();
    this.removeChild( this.warn_line,true);
    this.removeChild( this.born_circle,true);
    this.warn_line = null;
    this.born_circle = null;

    this.meteo_img = cc.Sprite.create(this.config.image);
    var img_size = this.meteo_img.getContentSize();
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
},

die:function ()
{
},

getColRect:function () 
{
    var origin = this.convertToWorldSpace(this.meteo_img.getPosition());
    origin = this.getParent().convertToNodeSpace(origin);
    origin.x -= this.col_size.width*0.5;
    origin.y -= this.col_size.height*0.5;
    return new cc.rect(origin.x,origin.y,this.col_size.width,this.col_size.height);
},

});