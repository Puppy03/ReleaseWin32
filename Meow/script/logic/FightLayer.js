require("script/common/foundation.js");
require("script/config/stage_config.js");
require("script/config/fighter_config.js");
require("script/config/segment_config.js");
require("script/logic/Fighter.js");
require("script/logic/Enemy.js");
require("script/logic/Meteorite.js");
require("script/logic/Barrier.js");
require("script/logic/PropItem.js");

var FightLayer = cc.Node.extend({
    fighter:null,
    back_imgs:null,
    roll_speed:900,
    pre_touch_pos:null,
    map_nodes:null,
    stage_config:null,
    cur_seg_idx:0,
    cur_node_idx:0,
    cur_segment:null,
    cur_segment_diff:1,
    segment_tick:0,
    total_move:0,
    move_check:0,
    distance_psp:4,
    charge_dur:0,
    charge_acc:3,


    initStage:function (stage_config) 
    {
        var layer_size = cc.size(640,960);
        this.setContentSize(layer_size);
        this.stage_config = stage_config;
        this.roll_speed = stage_config.roll_speed;
        PlayerData.StageMaxDis = stage_config.max_distance;

        this.map_nodes = [];
        this.back_imgs = [];

        this.fighter = new Fighter;
        this.fighter.initFighter(fighterConfig.Fighter00);
        this.addChild(this.fighter);

        var img0 = cc.Sprite.create(stage_config.back_img);
        var img1 = cc.Sprite.create(stage_config.back_img);
        var img2 = cc.Sprite.create(stage_config.back_img);
        var size = img0.getContentSize();
        img0.setPosition(cc.p(0,-size.height));
        img1.setPosition(cc.p(0,0));
        img2.setPosition(cc.p(0,size.height));
        this.back_imgs.push(img0);
        this.back_imgs.push(img1);
        this.back_imgs.push(img2);
        this.addChild(img0,-999);
        this.addChild(img1,-999);
        this.addChild(img2,-999);

        this.loadSegment();

        this.schedule(this.updateStats);
    },

    updateStats:function(dt)
    {
        if(this.charge_dur>0)
        {
            this.charge_dur -= dt;
            if(this.charge_dur<=0)
            {
                this.charge_dur=0;
            }
            else            
            {dt *= this.charge_acc;}
        }
        this.ticksSegments(dt);
        this.tickMapNodes(dt);
        this.tickMoveGround(dt);
    },

    moveFighter:function(move_x)
    {
        var cur_x = this.fighter.getPositionX()+move_x/this.getScale();
        var size = this.getContentSize();
        if(cur_x>(-size.width*0.5+10) && cur_x<(size.width*0.5-10))
        {
            this.fighter.setPositionX(cur_x);
        }
    },

    clearStage:function () 
    {
        cc.log("clear stage!!!!!!!");
        this.unschedule(this.updateStats); 

         for(var i in this.map_nodes)
        {
           this.removeChild(this.map_nodes[i],true);   
        }
        this.map_nodes = [];
        this.segment_tick = 0;
        this.cur_seg_idx = 0;
        this.cur_node_idx = 0;
        this.move_check = 0;
        this.total_move = 0;
        
    },

    pause:function()
    {
        this.unschedule(this.updateStats);
        this.fighter.pauseShoot();
    },
    resume:function()
    {
        this.schedule(this.updateStats);
        this.fighter.resumeShoot();
    },

    tickMoveGround:function (dt)
    {
        var layer_size = this.getContentSize();
        var front = this.back_imgs[0];
        var back = this.back_imgs[this.back_imgs.length-1];
        var pos_y = front.getPositionY();
        var size = front.getContentSize();
        if((pos_y+size.height*0.5)<-layer_size.height*0.5)
        {
            this.removeChild(front);
            this.back_imgs.splice(0,1);
        }
        pos_y = back.getPositionY();
        var move_y = this.roll_speed*dt;
        
        if((pos_y+size.height*0.5)<layer_size.height*0.5)
        {
            var img = cc.Sprite.create(this.stage_config.back_img);
            img.setPosition(cc.p(0,pos_y+size.height));
            this.addChild(img,-999);
            this.back_imgs.push(img);
        }
        for(var i in this.back_imgs)
        {
            pos_y = this.back_imgs[i].getPositionY();
            this.back_imgs[i].setPositionY(pos_y-move_y);
        }

        this.total_move += move_y;
        this.move_check += move_y;
        if(this.move_check>this.distance_psp)
        {
            this.move_check = 0;
            PlayerData.StageDistance = parseInt(this.total_move/this.distance_psp+0.5);
            ui_parser.currentScene.refreshStageDistance();
        }
        if(PlayerData.StageDistance>=PlayerData.StageMaxDis)
        {
             this.getParent().stageEnd();
        }

    },

    tickMapNodes:function (dt) 
    {
        var layer_size = this.getContentSize();
        for(var i=0; i<this.map_nodes.length; )
        {
            if(this.map_nodes.length==0 || i>=this.map_nodes.length)
            {
                return;
            }
            var node = this.map_nodes[i];
            if(node.hp <=0 )
            {
                node.die();
                this.removeChild(node,true);
                this.map_nodes.splice(i,1);
                continue;
            }
            var pos_y = node.getPositionY();
            var size = node.getContentSize();
            if(this.charge_dur>0 && node.mn_type!=EMNodeType.ECoin && node.mn_type!=EMNodeType.EItem)
            {
                if(pos_y<size.height*0.5)
                {
                    node.die();
                    this.removeChild(node,true);
                    this.map_nodes.splice(i,1);
                    continue;
                }
            }
            if((pos_y+size.height*0.5)<-layer_size.height*0.5)
            {
                this.removeChild(node,true);
                this.map_nodes.splice(i,1);
                continue;
            }
            i++;
            node.updateStat(dt);
        }
    },

    dropCoin:function(config,pos)
    {
        var coin = new Coin;
        coin.initCoin(config);
        coin.setPosition(pos);
        this.addChild(coin);
        this.map_nodes.push(coin);
    },

    dropItem:function (config,pos)
    {
        var prop_item = new PropItem;
        prop_item.initItem(config);
        prop_item.setPosition(pos);
        this.addChild(prop_item);
        this.map_nodes.push(prop_item);
    },

    ticksSegments:function (dt) 
    {
        this.segment_tick += dt;
        if(this.cur_node_idx == this.cur_segment.length)
        {
            this.cur_seg_idx++;
            this.cur_node_idx = 0;
            this.segment_tick = 0;

            if(this.cur_seg_idx>=this.stage_config.segments.length)
            {
                if(this.stage_config.loop=="true")
                {
                    cc.log("segment loop!!");
                    this.cur_seg_idx = 0;
                }
                else
                {
                    this.getParent().stageEnd();
                    return;
                }
            }
            this.loadSegment();
        }

        for(var i=this.cur_node_idx; i<this.cur_segment.length; i++)
        {
            if(this.segment_tick>this.cur_segment[i].time)
            {
                cc.log("cur node idx:"+i);
                this.createNode(this.cur_segment[i],this.cur_segment_diff);
                this.cur_node_idx = i+1;
            }
            else
            {
                return;
            }
        } 
    },

    loadSegment:function()
    {
        this.cur_node_idx = 0;
        var seg_pair = this.stage_config.segments[this.cur_seg_idx];
        if(!segmentConfig.hasOwnProperty(seg_pair.id))
        {
            cc.log("Wrong segment id:"+seg_pair.id);
        }
        this.cur_segment = segmentConfig[seg_pair.id];
        this.cur_segment_diff = seg_pair.diff;
        cc.log("cur segment:"+this.cur_seg_idx);
        cc.log("cur diffculty:"+this.cur_segment_diff);
    },

    createNode:function (seg_node,diff)
    {
        var group = enemyGroup[seg_node.group];
        for(var i in group)
        {
            var node = group[i];
            var pos_x = node.born_x+seg_node.offset;
            var pos_y = this.getContentSize().height*0.5+100+node.born_y;
             if(node.type == EMNodeType.EEnemy)
            {
                var _enemy = new Enemy;
                _enemy.initEnemy(enemyConfig[node.config]);
                this.addChild(_enemy);      
                _enemy.setPosition(pos_x,pos_y);
                _enemy.hp *= diff;
                if(seg_node.hasOwnProperty("speed"))
                {
                    _enemy.speed = seg_node.speed;
                    cc.log("cur mon speed:"+ _enemy.speed);
                }

                this.map_nodes.push(_enemy); 
            }
            else if(node.type == EMNodeType.EMeteorite)
            {
                var _meteo = new Meteorite;
                var follow_speed = 0;
                if(seg_node.hasOwnProperty("follow_speed"))
                {follow_speed = seg_node.follow_speed;}
                _meteo.initMeteorite(meteoriteConfig[node.config],follow_speed,this.getContentSize());
                _meteo.setPosition(pos_x,pos_y);
                this.addChild(_meteo);

                this.map_nodes.push(_meteo); 
            }
            else if(node.type == EMNodeType.EBarrier)
            {
                var _barrier = new Barrier;
                _barrier.initBarrier(barrierConfig[node.config]);
                _barrier.setPosition(pos_x,pos_y);
                this.addChild(_barrier);

                this.map_nodes.push(_barrier);
            }
            else if(node.type == EMNodeType.ECoin)
            {
                var _coin = new Coin;
                _coin.initCoin(coinConfig[node.config]);
                _coin.setPosition(pos_x,pos_y);
                this.addChild(_coin);

                this.map_nodes.push(_coin);
            }
      }

    },

    restartStage:function () 
    {
         if(this.fighter!=null)
        {
            this.removeChild(this.fighter,true);
        }
        this.fighter = new Fighter;
        this.fighter.initFighter(fighterConfig.Fighter00);
        this.addChild(this.fighter);

        this.loadSegment();

        this.schedule(this.updateStats);
        this.getParent().setTouchEnabled(true);
    },

    chargeAhead:function(duration)
    {
        this.charge_dur = duration;
    },
});
