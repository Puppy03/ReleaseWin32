

ui_delegator.RoleManage = 
{
    onStartGame : function () 
    {
        var scene = StagesScene.scene();
        cc.Director.getInstance().replaceScene(scene);
    },
    onGoBack : function () 
    {
        var scene = LoginScene.scene();
        cc.Director.getInstance().replaceScene(scene);
    },
    onAddCoins : function () 
    {
        cc.log("touch add coins!");
    },
    onAddItem : function () 
    {
        cc.log("touch add item!");
    },
     onAddPet : function () 
    {
        cc.log("touch add pet!");
    },
    onUpgradeRole : function () 
    {
        cc.log("touch onUpgradeRole!");
    },
    onChangeRole:function ()
    {
        ui_parser.currentScene.closePage("RoleMgr");
        ui_parser.currentScene.openUIPage("layout/role_choose.xml");
    },
    onChooseRole:function ()
    {
        ui_parser.currentScene.closePage("RoleChoose");
        ui_parser.currentScene.openRoleMgr();
    },
    onRoleChooseBack:function () 
    {
        ui_parser.currentScene.closePage("RoleChoose");
        ui_parser.currentScene.openRoleMgr();
    },
};