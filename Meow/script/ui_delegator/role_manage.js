

ui_delegator.RoleManage = 
{
    onStartGame : function(node) 
    {
        var scene = StagesScene.scene();
        cc.Director.getInstance().replaceScene(scene);
    },
    onGoBack : function(node) 
    {
        var scene = LoginScene.scene();
        cc.Director.getInstance().replaceScene(scene);
    },
    onAddCoins : function(node) 
    {
        cc.log("touch add coins!");
    },
    onAddItem : function(node) 
    {
        cc.log("touch add item!");
    },
     onAddPet : function(node) 
    {
        ui_parser.currentScene.closePage("RoleMgr");
        ui_parser.currentScene.openPetsMgr();
    },
    onUpgradeRole : function(node) 
    {
        cc.log("touch onUpgradeRole!");
    },
    onChangeRole:function(node)
    {
        ui_parser.currentScene.closePage("RoleMgr");
        ui_parser.currentScene.openUIPage("layout/role_choose.xml");
    },
    onChooseRole:function(node)
    {
        ui_parser.currentScene.closePage("RoleChoose");
        ui_parser.currentScene.openRoleMgr();
    },
    onRoleChooseBack:function(node) 
    {
        ui_parser.currentScene.closePage("RoleChoose");
        ui_parser.currentScene.openRoleMgr();
    },
};