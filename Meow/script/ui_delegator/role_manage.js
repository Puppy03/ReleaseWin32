

ui_delegator.RoleManage = 
{
    onStartGame : function () 
    {
        var scene = FightScene.scene();
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
};