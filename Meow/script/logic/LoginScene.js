
var LoginScene = UIController.extend({
    init:function () 
    {
        if (!this._super()) 
        {
            return false
        }
        this.parseStyle("layout/styles.xml");
        var page = this.openUIPage("layout/login_page.xml");
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