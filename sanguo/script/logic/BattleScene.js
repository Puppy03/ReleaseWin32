
require("script/logic/BattleGround.js");
require("script/config/hero_config.js");
require("script/logic/MiniMap.js");


var BattleScene = UIController.extend({
    btGround:null,
    pre_touch_pos:null,
    time_tick:180,
    camera_tick:0,
    camera_flag:0,
    init:function () 
    {
        if (!this._super()) 
        {
            return false;
        }
        this.parseStyle("layout/styles.xml");
        var page = this.openUIPage("layout/battle_page.xml");

        this.btGround = new BattleGround;
        this.btGround.initGround();
        this.addChild(this.btGround);
        var _size = this.btGround.getContentSize();
        this.btGround.setPosition(win_size.width*0.5,win_size.height-_size.height*0.5);
        this.btGround.moveScene(1350,-100);

        var mini_map = new MiniMap;
        mini_map.btGround = this.btGround;
        mini_map.initMiniMap(this.btGround.army_left,this.btGround.army_right,cc.size(214,84),_size);
        
        var minimap_bg = page._nodesMap["MiniMapBg"];
        page.addChild(mini_map,9000);
        var pos = minimap_bg.getPosition();
        pos.y -= 29;
        mini_map.setPosition(pos);

        this.setTouchMode(1);
        this.setTouchPriority(100);
        this.setTouchEnabled(true);

        this.schedule(this.updateMapActors);
        this.schedule(this.tickCameraMove);
        
        return true;
    },

     playSkill:function (skill_config,caster,target) 
    {
        if(caster.camp == ECamp.Left)
        {
            if(this.effect_tick_left>0)
            {
                cc.log("left skill not end!!!");
                return;
            }
            this.effect_tick_left = 0;
        }
        else
        {
             if(this.effect_tick_right>0)
            {
                cc.log("right skill not end!!!");
                return;
            }
            this.effect_tick_right = 0;
        }
        if(caster.rage<skill_config.cost_rage)
        {
            cc.log("Not Enough Rage!!!");
            return;
        }
        if(caster.magic<skill_config.cost_magic)
        {
            cc.log("Not Enough Magic!!!");
            return;
        }
        caster.rage -= skill_config.cost_rage;
        caster.magic -= skill_config.cost_magic;
        for(var i in skill_config.nodes)
        {
            var effect_node = new EffectNode;
            effect_node.initWithConfig(skill_config.nodes[i],caster,target);
            effect_node.battle_ground = this.btGround;
            this.btGround.addEffectNode(effect_node);
        }  
    },

    onBattleEnd:function (win_camp) 
    {
        for(var i in this.btGround.army_left)
        {
            var actor = this.btGround.army_left[i];
            if( actor == null){continue;}
            if(actor.cur_stat == EActorStat.EDying){continue;}
            if( actor.cur_stat != EActorStat.EIdle)
            {actor.idle();}
        }

        for(var i in this.btGround.army_right)
        {
            var actor = this.btGround.army_right[i];
            if( actor == null){continue;}
            if(actor.cur_stat == EActorStat.EDying){continue;}
            if( actor.cur_stat != EActorStat.EIdle)
            {actor.idle();}
        }  

        this.unschedule(this.updateMapActors);
        var win_img = null;
        if(win_camp == ECamp.Left)
        {
            win_img = cc.Sprite.create("ui/win.png");
            win_img.setScale(0.9);
            win_img.setPosition(win_size.width*0.5,win_size.height*0.5+60);
            var scale1 = cc.ScaleTo.create(0.1,1.2,1.2);
            var scale2 = cc.ScaleTo.create(0.1,0.9,0.9);
            var scale3 = cc.ScaleTo.create(0.1,1.0,1.0);
            var sq = new cc.Sequence;
            sq.initWithTwoActions(scale1,scale2);
            var sq2 = new cc.Sequence;
            sq2.initWithTwoActions(sq,scale3);
            win_img.runAction(sq2);
        }
        else
        {
            win_img = cc.Sprite.create("ui/lose.png");
            win_img.setPosition(win_size.width*0.5,win_size.height*0.5+120);
            var move = cc.MoveBy.create(0.7,cc.p(0,-60))
            var fade_in = cc.FadeIn.create(2.2);
            win_img.runAction(fade_in);
            win_img.runAction(move);
        }
        
        this.addChild(win_img,2000);
    },

    updateMapActors:function(dt)
    {
        this.time_tick -= dt;
       if(this.btGround.army_left.length==0 || this.btGround.army_right.length==0)
       {return;}

       var dead_num_left = 0;
       var dead_num_right = 0;
       for(var i in this.btGround.army_left)
       {
            var actor = this.btGround.army_left[i];
            if(actor==null){dead_num_left++;continue;}
            if(actor.hp<=0)
            {
                dead_num_left++;
                actor.die();
                this.btGround.army_left[i] = null;
            }
       }
        for(var i in this.btGround.army_right)
       {
            var actor = this.btGround.army_right[i];
            if(actor==null){dead_num_right++;continue;}
            if(actor.hp<=0)
            {
                dead_num_right++;
                actor.die();
                this.btGround.army_right[i] = null;
            }
       }

       this.refreshUI(dead_num_left,dead_num_right);

       if(this.btGround.army_left[0]==null){this.onBattleEnd(ECamp.Right);return;}
       if(this.btGround.army_right[0]==null){this.onBattleEnd(ECamp.Left);return;}
    },

    refreshUI:function (dead_left,dead_right) 
    {
        var page = ui_parser.currentScene.getUIPage("BattlePage");
        var hero_left = this.btGround.army_left[0];
        var hero_right = this.btGround.army_right[0];

        var num_left = page._nodesMap["ValArmyLeft"];
        var power_left = page._nodesMap["ValPowerLeft"];
        var num_right = page._nodesMap["ValArmyRight"];
        var power_right = page._nodesMap["ValPowerRight"];
        var time_label = page._nodesMap["LblTime"];
        var _time = parseInt(this.time_tick+0.5);
        var _m = parseInt(_time/60);
        var _s = _time%60;
        var _time_str = _m+":"+_s;
        time_label.setString(_time_str);


        num_left.setString(this.btGround.army_left.length-dead_left);
        num_right.setString(this.btGround.army_right.length-dead_right);

        if(hero_left != null)
        {   
            power_left.setString(hero_left.att);
            var pg_hp = page._nodesMap["HpBarLeft"];
            var pg_magic = page._nodesMap["SkillBarLeft"];
            var pg_rage = page._nodesMap["RageBarLeft"];
            pg_hp.setPercentage(hero_left.hp*100/hero_left.max_hp);
            pg_magic.setPercentage(hero_left.magic*100/hero_left.max_magic);
            pg_rage.setPercentage(hero_left.rage*100/hero_left.rage_max);
        }
        if(hero_right != null)
        {
            power_right.setString(hero_right.att);
            var pg_hp = page._nodesMap["HpBarRight"];
            var pg_magic = page._nodesMap["SkillBarRight"];
            var pg_rage = page._nodesMap["RageBarRight"];
            pg_hp.setPercentage(hero_right.hp*100/hero_right.max_hp);
            pg_magic.setPercentage(hero_right.magic*100/hero_right.max_magic);
            pg_rage.setPercentage(hero_right.rage*100/hero_right.rage_max);
        }
    },

    
    testSkill:function (skill_id,camp) 
    {
        caster = camp==ECamp.Left?this.btGround.army_left[0]:this.btGround.army_right[0];
        target = camp==ECamp.Left?this.btGround.army_right[0]:this.btGround.army_left[0];
        this.playSkill(skillConfigs[skill_id],caster,target);
    },


    onTouchBegan:function(touch, event)
    {
        this.pre_touch_pos = getTouchLocation(touch);
        return true;
    },

     onTouchMoved:function (touch,event) 
    {
        var touch_pos = getTouchLocation(touch);
        var move_x = touch_pos.x-this.pre_touch_pos.x;
        var move_y = touch_pos.y-this.pre_touch_pos.y;
        this.btGround.moveScene(move_x,move_y);
        this.pre_touch_pos = touch_pos;
    },

    tickCameraMove:function (dt) 
    {
        this.camera_tick+=dt;
        if(this.camera_tick>4.0 && this.camera_flag==1)
        {
            this.camera_flag=2;
            this.btGround.moveScene(0,120);
            this.btGround.autoCamera(-1350,2000);
            this.unschedule(this.tickCameraMove);
            return;
        }
        if(this.camera_tick>1.5 && this.camera_flag==0)
        {
            this.camera_flag=1;
            
            this.btGround.autoCamera(1350,2000);
            return;
        }
    }
});

BattleScene.create = function () {
    var sg = new BattleScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

BattleScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = BattleScene.create();
    scene.addChild(layer);
    return scene;
};
