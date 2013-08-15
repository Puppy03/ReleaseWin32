

ui_delegator.LoginDelegator = 
{
    onEnterGame : function () 
    {
        var scene = RoleMgrScene.scene();
        cc.Director.getInstance().replaceScene(scene);
    },
};