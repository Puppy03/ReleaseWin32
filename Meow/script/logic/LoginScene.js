
var LoginScene = UIController.extend({
    init:function () 
    {
        if (!this._super()) 
        {
            return false
        }
        this.parseStyle("layout/styles.xml");
        var page = this.openUIPage("layout/login_page.xml");

        var bg_img = cc.Sprite.create("scene/login_bg.png");
        var size = bg_img.getContentSize();
        bg_img.setScaleX(win_size.width/size.width);
        bg_img.setScaleY(win_size.height/size.height);
        bg_img.setPosition(win_size.width*0.5,win_size.height*0.5);
        this.addChild(bg_img);
        return true;
    },
});

LoginScene.create = function () {
    var sg = new LoginScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

LoginScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = LoginScene.create();
    scene.addChild(layer);
    return scene;
};