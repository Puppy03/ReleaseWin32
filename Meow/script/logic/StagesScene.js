
var stagePoints=[
{x:212,y:97},
{x:560,y:326},
{x:244,y:450},
{x:260,y:702},
{x:502,y:926},
{x:320,y:1106},
{x:114,y:1212},
{x:342,y:1380},
{x:448,y:594},
{x:192,y:920},
]

var StagesScene = UIController.extend({
    back_image:null,
    pre_touch_pos:null,
    init:function () 
    {
        if (!this._super()) 
        {
            return false
        }
        var page = this.openUIPage("layout/stages_page.xml");

        this.back_image = cc.Sprite.create("scene/stages.png");
        var img_size = this.back_image.getContentSize();
        var scale = win_size.width/img_size.width;
        this.back_image.setScale(scale);
        this.back_image.setPosition(win_size.width*0.5,img_size.height*0.5*scale);
        this.addChild(this.back_image);

        var _style = ui_parser.styles["StageEntry"];
        var idx = 0;
        for(var i in stagePoints)
        {
            var entry = new UIButton;
            entry.initButton(_style,this.onTouchEntry);
            entry.setTag(i);
            entry.setPosition(stagePoints[i]);
            idx++;
            if(idx<=8)
            {
                var lbl = cc.LabelBMFont.create(idx,"font/zl_2.fnt",24);
                lbl.setPosition(4,-18);
                entry.addChild(lbl);
            }
            this.back_image.addChild(entry);
        }

        this.setTouchMode(1);
        this.setTouchPriority(100);
        this.setTouchEnabled(true);
        return true;
    },

    onTouchEntry:function()
    {
        var scene = FightScene.scene();
        cc.Director.getInstance().replaceScene(scene);
    },

     onTouchBegan:function(touch, event)
    {
        this.pre_touch_pos = getTouchLocation(touch);
        return true;
    },

     onTouchMoved:function (touch,event) 
    {
        var touch_pos = getTouchLocation(touch);
        var move_y = touch_pos.y-this.pre_touch_pos.y;
        this.pre_touch_pos = touch_pos;

        var pos_y = this.back_image.getPositionY()+move_y;
        var scale = this.back_image.getScale();
        var img_size = this.back_image.getContentSize();
        if(pos_y>img_size.height*0.5*scale)
        {
            pos_y = img_size.height*0.5*scale;
        }
        if(pos_y<(win_size.height-img_size.height*0.5*scale))
        {
            pos_y = win_size.height-img_size.height*0.5*scale;
        }
        this.back_image.setPositionY(pos_y);
    },
});

StagesScene.create = function () {
    var sg = new StagesScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

StagesScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = StagesScene.create();
    scene.addChild(layer);
    return scene;
};