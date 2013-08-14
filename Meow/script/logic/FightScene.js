require("script/common/foundation.js");
require("script/config/stage_config.js");
require("script/config/fighter_config.js");
require("script/config/segment_config.js");
require("script/logic/Fighter.js");
require("script/logic/Enemy.js");
require("script/logic/Meteorite.js");
require("script/logic/Barrier.js");

var FightScene = UIController.extend({
    fighter:null,
    back_imgs:null,
    roll_speed:900,
    pre_touch_pos:null,
    enemies:null,
    barriers:null,
    stage_config:null,
    cur_seg_idx:0,
    cur_node_idx:0,
    cur_segment:null,
    segment_tick:0,
    init:function () 
    {
        if (!this._super()) 
        {
            return false;
        }
        var page = this.openUIPage("layout/fight_page.xml");
        this.enemies = [];
        this.barriers = [];
        this.back_imgs = [];
        this.initStage(stageConfigs.stage01);

        this.fighter = new Fighter;
        this.fighter.initFighter(fighterConfig.Fighter00);
        this.addChild(this.fighter);
        

        this.setTouchMode(1);
        this.setTouchPriority(100);
        this.setTouchEnabled(true);

        this.schedule(this.tickMapNodes);
        
        return true;
    },

    initStage:function (stage_config) 
    {
        this.stage_config = stage_config;
        this.roll_speed = stage_config.roll_speed;
        var img0 = cc.Sprite.create(stage_config.back_img);
        var img1 = cc.Sprite.create(stage_config.back_img);
        var img2 = cc.Sprite.create(stage_config.back_img);
        var size = img0.getContentSize();
        img0.setPosition(cc.p(win_size.width*0.5,-size.height));
        img1.setPosition(cc.p(win_size.width*0.5,0));
        img2.setPosition(cc.p(win_size.width*0.5,size.height));
        this.back_imgs.push(img0);
        this.back_imgs.push(img1);
        this.back_imgs.push(img2);
        this.addChild(img0,-999);
        this.addChild(img1,-999);
        this.addChild(img2,-999);
        this.schedule(this.tickBackGround);

        var seg_name = this.stage_config.segments[this.cur_seg_idx];
        this.cur_segment = segmentConfig[seg_name];
        this.schedule(this.ticksSegments);
    },

    gameOver:function () 
    {
        cc.log("game over!");
        this.clearStage();
        this.fighter = null;
        var page = this.openUIPage("layout/game_over.xml");
    },

    stageEnd:function () 
    {
        cc.log("stage end!!!");
        this.clearStage();
        if(this.fighter!=null)
        {this.fighter.pauseShoot();}
        var page = this.openUIPage("layout/stage_end.xml");
    },

    clearStage:function () 
    {
         for(var i in this.enemies)
        {
           this.removeChild(this.enemies[i],true);
        }
        this.enemies = [];
        for(var i in this.barriers)
        {
           this.removeChild(this.barriers[i],true);
        }
        this.barriers = [];
        this.segment_tick = 0;
        
        this.unschedule(this.tickMapNodes);
        this.unschedule(this.ticksSegments);
        this.setTouchEnabled(false);
    },

    restartGame:function()
    {
        if(this.fighter!=null)
        {
            this.removeChild(this.fighter,true);
        }
        this.fighter = new Fighter;
        this.fighter.initFighter(fighterConfig.Fighter00);
        this.addChild(this.fighter);

        this.cur_seg_idx = 0;
        this.cur_node_idx = 0;
        var seg_name = this.stage_config.segments[this.cur_seg_idx];
        this.cur_segment = segmentConfig[seg_name];
        this.schedule(this.ticksSegments);

        this.setTouchEnabled(true);

        this.schedule(this.tickMapNodes);
    },

    tickBackGround:function (dt)
    {
        var move_y = this.roll_speed*dt;
        var front = this.back_imgs[0];
        var back = this.back_imgs[this.back_imgs.length-1];
        var pos_y = front.getPositionY();
        var size = front.getContentSize();
        if((pos_y+size.height*0.5)<0)
        {
            this.removeChild(front);
            this.back_imgs.splice(0,1);
        }
        pos_y = back.getPositionY();
        if((pos_y+size.height*0.5)<win_size.height)
        {
            var img = cc.Sprite.create(this.stage_config.back_img);
            img.setPosition(cc.p(win_size.width*0.5,pos_y+size.height));
            this.addChild(img,-999);
            this.back_imgs.push(img);
        }
        for(var i in this.back_imgs)
        {
            pos_y = this.back_imgs[i].getPositionY();
            this.back_imgs[i].setPositionY(pos_y-move_y);
        }
    },

    tickMapNodes:function (dt) 
    {
        for(var i in this.enemies)
        {
            if(this.enemies[i].hp <=0 )
            {
                this.enemies[i].die();
                this.enemies.splice(i,1);
                continue;
            }

            var pos_y = this.enemies[i].getPositionY();
            var size = this.enemies[i].getContentSize();
            if((pos_y+size.height*0.5)<0)
            {
                this.removeChild(this.enemies[i],true);
                this.enemies.splice(i,1);
            }
        }
        for(var i in this.barriers)
        {
            var pos_y = this.barriers[i].getPositionY();
            var size = this.barriers[i].getContentSize();
            if((pos_y+size.height*0.5)<0)
            {
                this.removeChild(this.barriers[i],true);
                this.barriers.splice(i,1);
            }
        }
    },

    ticksSegments:function (dt) 
    {
        this.segment_tick += dt;
        if(this.cur_node_idx == this.cur_segment.length)
        {
            this.cur_seg_idx++;
            this.cur_node_idx = 0;
            this.segment_tick = 0;

            cc.log("next segment:"+this.cur_seg_idx);
            
            if(this.cur_seg_idx>=this.stage_config.segments.length)
            {
                if(this.stage_config.loop)
                {
                    cc.log("segment loop!!");
                    this.cur_seg_idx = 0;
                }
                else
                {
                    this.stageEnd();
                    this.unschedule(this.ticksSegments);
                    return;
                }
            }
            
            var seg_name = this.stage_config.segments[this.cur_seg_idx];
            this.cur_segment = segmentConfig[seg_name];
        }

        for(var i=this.cur_node_idx; i<this.cur_segment.length; i++)
        {
            if(this.segment_tick>this.cur_segment[i].time)
            {
                cc.log("cur node idx:"+i);
                this.createNode(this.cur_segment[i]);
                this.cur_node_idx = i+1;
            }
            else
            {
                return;
            }
        } 
    },

    createNode:function (seg_node)
    {
        var group = enemyGroup[seg_node.group];
        for(var i in group)
        {
            var node = group[i];
            var pos_x = win_size.width*0.5+node.born_x+seg_node.offset;
            var pos_y = win_size.height+100+node.born_y;
             if(node.type == EObjType.EEnemy)
            {
                var _enemy = new Enemy;
                _enemy.initEnemy(enemyConfig[node.config]);
                this.addChild(_enemy);
                this.enemies.push(_enemy);         
                _enemy.setPosition(pos_x,pos_y);
            }
            else if(node.type == EObjType.EMeteorite)
            {
                var _meteo = new Meteorite;
                var follow_speed = 0;
                if(seg_node.hasOwnProperty("follow_speed"))
                {follow_speed = seg_node.follow_speed;}
                _meteo.initMeteorite(meteoriteConfig[node.config],follow_speed,pos_x);
                this.addChild(_meteo);
            }
            else if(node.type == EObjType.EBarrier)
            {
                var _barrier = new Barrier;
                _barrier.initBarrier(barrierConfig[node.config],this.roll_speed);
                _barrier.setPosition(pos_x,pos_y);
                this.barriers.push(_barrier);
                this.addChild(_barrier);
            }
            else if(node.type == EObjType.ECoin)
            {
                var _coin = new Coin;
                _coin.initCoin(cc.p(pos_x,pos_y),this.roll_speed);
                this.addChild(_coin);
            }
      }

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
        var cur_x = this.fighter.getPositionX()+move_x;
        if(cur_x>10 && cur_x<(win_size.width-10))
        {
            this.fighter.setPositionX(cur_x);
        }
        this.pre_touch_pos = touch_pos;
    },
});

FightScene.create = function () {
    var sg = new FightScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

FightScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = FightScene.create();
    scene.addChild(layer);
    return scene;
};
