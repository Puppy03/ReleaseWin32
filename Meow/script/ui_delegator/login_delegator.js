

ui_delegator.LoginDelegator = 
{
    onEnterGame : function (node) 
    {
        var scene = RoleMgrScene.scene();
        cc.Director.getInstance().replaceScene(scene);
    },
};