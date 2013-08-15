

ui_delegator.StagesDelegator = 
{
    onGoBack : function () 
    {
        var scene = RoleMgrScene.scene();
        cc.Director.getInstance().replaceScene(scene);
    },
    onAddCoins:function () 
    {
    },
};