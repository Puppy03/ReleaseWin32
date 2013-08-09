
require("script/logic/Hero.js");
require("script/logic/Soldier.js");
require("script/logic/effect_node.js");
var MinGrndZ = -9999;
var MinEffZ = 1;


var BattleGround = cc.Node.extend({
    draw_grid:false,
    ground_width:4000,
    ground_height:360,
    pspt_min:0.8,
    army_left:null,
    army_right:null,
    ground_img:null,
    mount_f:null,
    mount_b:null,
    effectNodes:null,
    effect_tick_left:0,
    effect_tick_right:0,
    auto_camera_tick:0,
    auto_camera_speed:0,
    initGround:function () 
    {
        this.ground_img = cc.Sprite.create("scene/ground.png");
        var _size = this.ground_img.getContentSize();
        this.ground_width = _size.width-40;
        this.setContentSize(_size);
        this.mount_f = cc.Sprite.create("scene/mount_f.png");
        this.mount_b = cc.Sprite.create("scene/mount_b.png");
        this.addChild(this.ground_img,MinGrndZ+2);
        this.addChild(this.mount_f,MinGrndZ+1);
        this.addChild(this.mount_b,MinGrndZ);
        this.mount_f.setPositionY(_size.height*0.5-this.mount_f.getContentSize().height*0.5);
        this.mount_b.setPositionY(_size.height*0.5-this.mount_b.getContentSize().height*0.5);

        if(this.draw_grid)
        {
            this.drawGrid();
        }


        this.army_left = [];
        this.army_right = [];

        this.addHero(heroConfig.ZhangFei,ECamp.Right,heroRight);
        this.addHero(heroConfig.LvBu,ECamp.Left,heroLeft);

        for(var i in soldiersLeft)
        {
            this.addSolider(soldierConfig.Infantry,ECamp.Left,soldiersLeft[i]);
        }

        for(var i in soldiersRight)
        {
            this.addSolider(soldierConfig.Archer,ECamp.Right,soldiersRight[i]);
        }
    },

    drawGrid:function () 
    {
        var line_interval=40;
        var line_num=10;
        var _drawNode = cc.DrawNode.create();
        this.addChild(_drawNode,MinGrndZ+100);

        var color_g = new cc.c4f(0.0,1.0,0.0,1.0);
        for(var i=0; i<line_num; i++)
        {
            var y_pos = -this.ground_height*0.5+i*line_interval;
            var pspt_val = this.getPsptVal(y_pos);
            var start_x = -this.ground_width*0.5*pspt_val;
            var end_x = this.ground_width*0.5*pspt_val;
            var start_pos = cc.p(start_x,y_pos);
            var end_pos = cc.p(end_x,y_pos);
            _drawNode.drawSegment(start_pos,end_pos,0.5,color_g);
        }
        
        var mstart = cc.p(0,-this.ground_height*0.5);
        var mend = cc.p(0,this.ground_height*0.5);
        var color_y = new cc.c4f(1.0,1.0,0.0,1.0);
        _drawNode.drawSegment(mstart,mend,0.5,color_y);
    },
    moveScene:function (move_x,move_y)
    {
        var pos = this.getPosition();
        var size = this.getContentSize();

        if((pos.x+move_x-size.width*0.5)>0.0)
        {
            move_x = size.width*0.5-pos.x;
        }
        if((pos.x+move_x+size.width*0.5)<win_size.width)
        {
            move_x = win_size.width-size.width*0.5-pos.x;
        }
        if((pos.y+move_y-size.height*0.5)>0.0)
        {
            move_y = size.height*0.5-pos.y;
        }
        if((pos.y+move_y+size.height*0.5)<win_size.height)
        {
            move_y = win_size.height-size.height*0.5-pos.y;
        }
        pos.x += move_x;
        pos.y += move_y;
        this.setPosition(pos);
        var pos_x = this.mount_f.getPositionX();
        this.mount_f.setPositionX(pos_x-move_x*0.2);
        pos_x = this.mount_b.getPositionX();
        this.mount_b.setPositionX(pos_x-move_x*0.3);  
    },

    autoCamera:function (camera_x,speed) 
    {
        if(this.auto_camera_tick>0)
        {
            return;
        }
        var cur_move = win_size.width*0.5-this.getPositionX();
        var move_x = cur_move-camera_x;
        this.auto_camera_tick = Math.abs(move_x)/speed;
        this.auto_camera_speed = move_x>0?speed:-speed;
        this.schedule(this.tickAutoCamera);
        return this.auto_camera_tick;
    },
    tickAutoCamera:function (dt)
    {
        if(this.auto_camera_tick<=0)
        {
            this.unschedule(this.tickAutoCamera);
        }
        if(this.auto_camera_tick<dt)
        {
          dt = this.auto_camera_tick;
        }
        var move_x = this.auto_camera_speed*dt;
        this.moveScene(move_x,0);
        this.auto_camera_tick -= dt;
    } ,

    addHero:function (hero_config,camp,position) 
    {
        var hero = new Hero();
        hero.initHero(hero_config,camp);
        hero.setPosition(position);
        hero.enemy_list = camp==ECamp.Right?this.army_left:this.army_right;
        hero.army_list = camp==ECamp.Right?this.army_right:this.army_left;
        hero.actor_id = hero.army_list.length;
        hero.battle_ground = this;
        hero.army_list.push(hero);

        this.addChild(hero,getZOrderByY(hero));
        return hero;
    },
    addSolider:function (soldier_config,camp,position) 
    {
        var solider = new Soldier();
        solider.initSoldier(soldier_config,camp);
        var pspt_val = this.getPsptVal(position.y);
        //position.x *= pspt_val;
        solider.setPosition(position);
        solider.setPsptVal(pspt_val);

        solider.enemy_list = camp==ECamp.Right?this.army_left:this.army_right;
        solider.army_list = camp==ECamp.Right?this.army_right:this.army_left;
        solider.actor_id = solider.army_list.length;
        solider.battle_ground = this;
        solider.army_list.push(solider);

        this.addChild(solider,getZOrderByY(solider));
        return solider;
    },


     armyStanby:function (camp) 
    {
        var my_army = camp==ECamp.Right?this.army_right:this.army_left;

        for(var i in my_army)
        {
            if(my_army[i]==null)
            {continue;}
            if(my_army[i].cur_stat == EActorStat.EMoving)
            {
              my_army[i].idle();
            }
        }
    },
    heroForward:function (camp) 
    {
        var my_army = camp==ECamp.Right?this.army_right:this.army_left;
        var hero = my_army[0];
        var _target = hero.findFightTarget();
        if(_target != null)
        {
            hero.moveToTarget(_target,0);
        }
    },

    forward_tick : 0,
    forward_camp : 0,
    armyForward:function (camp) 
    {
        var my_army = camp==ECamp.Right?this.army_right:this.army_left;
        this.forward_camp = camp;
        var hero = my_army[0];
        this.forward_tick=hero.runSpeAction("Command")/2;
        this.schedule(this.armyForwardTick);
    },

    armyForwardTick:function (dt) 
    {
        this.forward_tick -= dt;
        if(this.forward_tick>0)
            return;

        var my_army = this.forward_camp==ECamp.Right?this.army_right:this.army_left;
        for(var i in my_army)
        {
            if(my_army[i]==null)
            {continue;}
            if(my_army[i].type == EActorType.EHero)
            {continue;}
            var target = my_army[i].findFightTarget();
            if(target != null)
            {
                my_army[i].moveToTarget(target,randomF(0,0.5));
            }
        }
        this.unschedule(this.armyForwardTick);
    },


    addEffectNode:function(effect_node)
    {
        if(this.effectNodes == null)
        {
            this.effectNodes = [];
            this.schedule(this.updateEffect,0);
        }

        this.effectNodes.push(effect_node);
        if(effect_node.stack_bottom)
        {
            this.addChild(effect_node,MinEffZ);
        }
        else
        {
            this.addChild(effect_node,effect_node.caster.getZOrder()+1);
        }
    },
    updateEffect:function (dt) 
    {
        if(this.effectNodes==null)
         { return;}

        var play_delay = 0;
        for(var i in this.effectNodes)
        {
            this.effectNodes[i].delay -= dt;
            if(this.effectNodes[i].delay <= 0.0)
            {
                var _delay = this.effectNodes[i].runAnimate();
                if(_delay>play_delay)
                {play_delay = _delay;}
                this.effectNodes.splice(i,1);
            }
        }

        if(play_delay>0)
        {   
            cc.log("Play Delay:"+play_delay);
            for(var i in this.effectNodes)
            {
                this.effectNodes[i].delay += play_delay;
            }
        }
    },

    getPsptVal:function (pos_y)
    {
        return 1-(pos_y+this.ground_height*0.5)*(1-this.pspt_min)/this.ground_height;
    },
    


});
