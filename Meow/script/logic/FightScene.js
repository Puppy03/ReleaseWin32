require("script/common/foundation.js");
require("script/config/stage_config.js");
require("script/config/fighter_config.js");
require("script/config/segment_config.js");
require("script/logic/Fighter.js");
require("script/logic/Enemy.js");
require("script/logic/FightLayer.js");

var FightScene = UIController.extend({
    pre_touch_pos:null,
    fight_layer:null,
    init:function () 
    {
        if (!this._super()) 
        {
            return false;
        }
        var page = this.openUIPage("layout/fight_page.xml");

        this.fight_layer = new FightLayer;
        this.fight_layer.initStage(stageConfigs.stage01);
        this.addChild(this.fight_layer);
        var layer_size = this.fight_layer.getContentSize();
        var scale = win_size.width/layer_size.width;
        this.fight_layer.setScale(scale);
        var pos = cc.p(win_size.width*0.5,win_size.height-layer_size.height*0.5*scale);
        this.fight_layer.setPosition(pos);
        
        var space_height = win_size.height-layer_size.height*scale;
        if(space_height>1)
        {
            var space_img = cc.Sprite.create("ui/space.png");
            this.addChild(space_img);
            space_img.setScale(scale);
            space_img.setPosition(win_size.width*0.5,space_height*0.5);
        }

        this.setTouchMode(1);
        this.setTouchPriority(100);
        this.setTouchEnabled(true);
        
        return true;
    },

    gameOver:function () 
    {
        cc.log("game over!");
        this.fight_layer.clearStage();
        this.fight_layer.fighter = null;
        var page = this.openUIPage("layout/game_over.xml");
    },

     stageEnd:function () 
    {
        cc.log("stage end!!!");
        this.fight_layer.clearStage();
        if(this.fight_layer.fighter!=null)
        {
            this.fight_layer.fighter.pauseShoot();
        }
        var page = this.openUIPage("layout/stage_end.xml");
    },

     restartGame:function()
    {
        this.fight_layer.restartStage();
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
        this.fight_layer.moveFighter(move_x);
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
