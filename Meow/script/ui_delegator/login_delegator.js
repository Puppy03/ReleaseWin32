

ui_delegator.LoginDelegator = 
{
    onStartGame : function () 
    {
        var scene = FightScene.scene();
        cc.Director.getInstance().replaceScene(scene);
    },
};