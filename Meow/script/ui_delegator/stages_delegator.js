

ui_delegator.StagesDelegator = 
{
    onGoBack : function (node) 
    {
        var scene = RoleMgrScene.scene();
        cc.Director.getInstance().replaceScene(scene);
    },
    onAddCoins:function (node) 
    {
    },
};