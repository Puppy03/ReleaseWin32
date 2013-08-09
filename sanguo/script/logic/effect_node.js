
require("script/common/frame_anim.js");
require("script/config/skill_config.js");

var EffectNode = cc.Sprite.extend({
    delay:0,
    life:0,
    life_tick:0,
    img_array:null,
    anim_iterval:0,
    type:EffT.EfCaster,
    caster:null,
    target:null,
    battle_ground:null,
    motion_delay:0,
    stat_tick:0,
    offset:null,
    min_radius:0,
    max_radius:100,
    angle:0,
    angle_speed:0,
    move_speed:0,
    stack_bottom:false,
    auto_camera_speed:0,
    camera_delay:0,
    play_delay:0,
    initWithConfig:function (node_config,_caster,_target) 
    {
        this.delay = node_config.delay;
        this.type = node_config.type;
        this.caster = _caster;
        this.target = _target;
        this.anim_iterval = node_config.anim.interval;
        this.offset = node_config.offset;
        if(node_config.hasOwnProperty("motion_delay"))
        {
            this.motion_delay = node_config.motion_delay;
        }
        if(node_config.hasOwnProperty("stack_bottom"))
        {
            this.stack_bottom = node_config.stack_bottom;
        }
        if(node_config.hasOwnProperty("auto_camera"))
        {
            this.auto_camera_speed = node_config.auto_camera;
        }

        if(this.type == EffT.EfSurround)
        {
            this.angle_speed = node_config.angle_speed;
            this.min_radius = node_config.min_radius;
            this.max_radius = node_config.max_radius;
            this.angle = node_config.angle;
        }
        else if(this.type == EffT.EfBolted || this.type==EffT.EfBullet)
        {
            this.move_speed = node_config.move_speed;
            cc.log(this.move_speed);
        }

        this.img_array = genImgArray(node_config.anim);
        var firTexture = cc.TextureCache.getInstance().addImage(this.img_array[0]);
        var img_size = firTexture.getContentSize();
        this.initWithTexture(firTexture,new cc.rect(0,0,img_size.with,img_size.height));
        var anchor = node_config.anim.anchor;
        this.setAnchorPoint(cc.p(anchor.x/img_size.width,anchor.y/img_size.height));
        this.setVisible(false);
    },

    runAnimate:function()
    {
        var pos = this.getActPos();
        if(this.caster.camp==ECamp.Left)
        {
            pos.x += this.offset.x
        }
        else
        {
            pos.x -= this.offset.x;
            if(this.type == EffT.EfBolted)
            {cc.log("posx:"+pos.x);}
        }

        pos.y += this.offset.y;
        this.setPosition(pos);

        if(this.auto_camera_speed>0)
        {
            this.camera_delay = this.getParent().autoCamera(this.getPositionX(),this.auto_camera_speed);
            this.play_delay += this.camera_delay;
        }
       
        if(this.motion_delay>0)
        {
            this.play_delay += this.motion_delay;
        }

        if(this.play_delay==0)
        {
            this.playEffect();
        }
        else
        {
            this.schedule(this.tickCameraDelay);
        }

        return this.play_delay;
    },

    playEffect:function () 
    {
        this.setVisible(true);
        

        var animate = genAnimateArr(this.img_array,this.anim_iterval);
        if(this.type == EffT.EfBolted)
        {
            var g_width = this.battle_ground.ground_width+1000;
            this.life = g_width/this.move_speed;
            var repeat = cc.RepeatForever.create(animate);
            this.runAction(repeat);
        }
        else
        {
            this.life = animate.getAnimation().getDuration();
            this.runAction(animate);
        }

        if(this.type == EffT.EfBullet || this.type == EffT.EfBolted)
        {
            var g_width = this.battle_ground.ground_width+1000;
            var move_x = this.caster.direction==EDir.ToRight?g_width:-g_width;
            if(this.caster.direction==EDir.ToLeft)
            {
                this.setFlipX(true);
            }
            move_time = Math.abs(move_x)/this.move_speed;
            var move_by = cc.MoveBy.create(move_time,cc.p(move_x,0));
            this.runAction(move_by);
        }
        else if(this.type == EffT.EfSurround)
        {
            this.schedule(this.tickSurround,0);
        }
        this.schedule(this.tickLife,0);
    },

    tickCameraDelay:function (dt) 
    {
        this.camera_delay -= dt;
        if(this.camera_delay<=0)
        {
            if(this.motion_delay>0)
            {
                this.caster.runSpeAction("Cast");
                this.schedule(this.tickMotionDelay); 
            }
            else
            {
                this.playEffect();
            }
            this.unschedule(this.tickCameraDelay);
        }
    },

     tickMotionDelay:function (dt) 
    {
        this.motion_delay -= dt;
        if(this.motion_delay<=0)
        {
            this.playEffect();
            this.unschedule(this.tickMotionDelay);
        }
    },

    tickLife:function (dt) 
    {
        this.life_tick += dt;
        if(this.life_tick >= this.life)
        {
            this.getParent().removeChild(this,true);
        }
    },
    
    tickSurround:function (dt) 
    {
        var radius = this.life_tick*(this.max_radius-this.min_radius)/this.life+this.min_radius;
        this.angle += dt*this.angle_speed;

        var pos = this.getActPos();
        var offset_x = Math.sin(this.angle*2*Math.PI/360)*radius;
        var offset_y = Math.cos(this.angle*2*Math.PI/360)*radius;;
        this.setPosition(pos.x+offset_x,pos.y+offset_y);

        if(offset_y<0 && this.getZOrder()>=this.target.getZOrder())
        {
            this.getParent().reorderChild(this,this.target.getZOrder()-10);
        }
        else if(offset_y>0 && this.getZOrder()<=this.target.getZOrder())
        {
            this.getParent().reorderChild(this,this.target.getZOrder()+10);
        }
    },

    getActPos:function () 
    {
        var actor = (this.type==EffT.EfTarget||this.type==EffT.EfBolted)?this.target:this.caster;
        var pos = actor.getPosition();
        return pos;
    }


});



