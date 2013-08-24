require("script/common/foundation.js");
require("script/config/stage_config.js");
require("script/config/fighter_config.js");
require("script/config/segment_config.js");
require("script/logic/Fighter.js");
require("script/logic/Enemy.js");
require("script/logic/FightLayer.js");

var audio_player=null;
var FightScene = UIController.extend({
    pre_touch_pos:null,
    fight_layer:null,
    main_page:null,
    
    initWithStage:function (stage) 
    {
        this.main_page = this.openUIPage("layout/fight_page.xml");

        this.refreshStageCoin();
        this.refreshStageScore();
        this.refreshStageDistance();

        this.fight_layer = new FightLayer;
        this.fight_layer.initStage(stage);
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
            var img_size = space_img.getContentSize();
            this.addChild(space_img);
            space_img.setScale(scale);
            pos.y -= layer_size.height*scale*0.5+img_size.height*scale*0.5;
            space_img.setPosition(pos);
        }

        audio_palyer = new AudioPlayer;
        audio_palyer.initPlayer(this);

        audio_palyer.playBgMusic("backgroundmusic01.mp3");

        this.setTouchMode(1);
        this.setTouchPriority(100);
        this.setTouchEnabled(true);
        
        return true;
    },

    gameOver:function () 
    {
        cc.log("game over!");
        this.fight_layer.clearStage();
        this.setTouchEnabled(false);
        this.fight_layer.fighter = null;
        this.openEndScore();
    },

     stageEnd:function () 
    {
        cc.log("stage end!!!");
        this.fight_layer.clearStage();
        this.setTouchEnabled(false);
        if(this.fight_layer.fighter!=null)
        {
            this.fight_layer.fighter.pauseShoot();
        }
        this.openEndScore();
    },

    openEndScore:function()
    {
        var page = this.openUIPage("layout/score_end.xml");
        var lbl_score = page.getUINode("lblScore");
        var lbl_dist = page.getUINode("lblDistance");
        var lbl_coin = page.getUINode("lblCoin");
        lbl_score.setText(PlayerData.StageScore);
        lbl_dist.setText(PlayerData.StageDistance+"m");
        lbl_coin.setText(PlayerData.StageCoin);
    },

    refreshStageCoin:function()
    {
        var lbl_coin = this.main_page.getUINode("LblCoins");
        lbl_coin.setText(PlayerData.StageCoin);
        var lbl_size = lbl_coin.getContentSize();
        var coin_img = this.main_page.getUINode("CoinImg");
        var pos_x = coin_img.getPositionX();
        lbl_coin.setPositionX(pos_x-lbl_size.width*0.5-15);
    },

    refreshStageScore:function()
    {
        var lbl_score = this.main_page.getUINode("LblScore");
        lbl_score.setText(PlayerData.StageScore);
    },

    refreshStageDistance:function ()
    {
        var lbl_dis = this.main_page.getUINode("LblDistance");
        lbl_dis.setText(PlayerData.StageDistance+"m");

        var img_bar = this.main_page.getUINode("StagePg");
        var img_gemo = this.main_page.getUINode("StagePgGemo");
        var size_pg = img_bar.getContentSize();
        var pos_x = -size_pg.width*0.5+23+(PlayerData.StageDistance/PlayerData.StageMaxDis)*(size_pg.width-46);
        var pg_pos_x = img_bar.getPositionX();
        img_gemo.setPositionX(pos_x+pg_pos_x);
    },

     restartGame:function()
    {
        PlayerData.StageScore = 0;
        PlayerData.StageDistance = 0;
        PlayerData.StageCoin = 0;
        this.refreshStageCoin();
        this.refreshStageScore();
        this.refreshStageDistance();

        this.fight_layer.restartStage();
    },

    pauseGame:function()
    {
        this.fight_layer.pause();
        this.setTouchEnabled(false);
        this.shadowMask(true);
    },

    resumeGame:function()
    {
        this.fight_layer.resume();
        this.setTouchEnabled(true);
        this.shadowMask(false);
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

FightScene.create = function (stage) {
    var sg = new FightScene();
    if (sg && sg.initWithStage(stage)) {
        return sg;
    }
    return null;
};

FightScene.scene = function (stage) {
    var scene = cc.Scene.create();
    var layer = FightScene.create(stage);
    scene.addChild(layer);
    return scene;
};
