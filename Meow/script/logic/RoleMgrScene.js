
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
        
        var main_bg = cc.Sprite.create("ui/ui_shading.jpg");
        var bg_size = main_bg.getContentSize();
        var scale = win_size.width/bg_size.width;
        main_bg.setScale(scale);
        var pos = cc.p(win_size.width*0.5,win_size.height-bg_size.height*0.5*scale);
        main_bg.setPosition(pos);
        this.addChild(main_bg); 
        
        var space_height = win_size.height-bg_size.height*scale;
        var bottom_img = cc.Sprite.create("ui/ui_bottom.png");
        var img_size = bottom_img.getContentSize();
        this.addChild(bottom_img);
        bottom_img.setScaleX(scale);
        var bottom_height = 52;

        if(space_height<=0)
        {
            var b_pos = cc.p(win_size.width*0.5,-img_size.height*0.5+bottom_height);
            bottom_img.setPosition(b_pos);
            var top_img = page_role_staic.getUINode("TopPanel");
            top_img.setScaleX(scale);
        }
        else
        {
            bottom_img.setScale(scale);
            pos.y -= bg_size.height*scale*0.5+img_size.height*scale*0.5-bottom_height;
            bottom_img.setPosition(pos);
        }

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