
var RoleMgrScene = UIController.extend({
    init:function () 
    {
        if (!this._super()) 
        {
            return false
        }
        var page_role_staic = this.openUIPage("layout/role_static.xml");
        var lbl_coin_num = page_role_staic.getUINode("CoinNum");
        lbl_coin_num.setText(PlayerData.CoinNum);

        this.openRoleMgr();
        
        return true;
    },
    openRoleMgr:function ()
    {
        var page_role_mgr = this.openUIPage("layout/role_mgr.xml");
        var role_bg = page_role_mgr._nodesMap["RolePvwBg"];
        var motion = fighterConfig.Fighter00.actor;
        var img_array = genImgArray(motion);
        var role_preview = cc.Sprite.create(img_array[0]);
        var animate = genAnimateArr(img_array,motion.interval);
        var repeat = cc.RepeatForever.create(animate);
        role_bg.addChild(role_preview);
        role_preview.runAction(repeat);
        role_preview.setPosition(170,160);
    },
    openPetsMgr:function()
    {
        var page = this.openUIPage("layout/role_pets.xml");
        var pets_scroll = page.getUINode("petScroll");
        for(var i=0; i<5; i++)
        {
            var sp = cc.Sprite.create("ui/btn_s.png");
            pets_scroll.addItemNode(sp);
        }
    },
});

RoleMgrScene.create = function () {
    var sg = new RoleMgrScene();
    if (sg && sg.init()) {
        return sg;
    }
    return null;
};

RoleMgrScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = RoleMgrScene.create();
    scene.addChild(layer);
    return scene;
};