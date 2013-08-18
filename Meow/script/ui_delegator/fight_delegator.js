

ui_delegator.FightDelegator = 
{
    onPauseGame:function(node)
    {
        ui_parser.currentScene.pauseGame();
        ui_parser.currentScene.openUIPage("layout/game_pause.xml");
    },
     onResume:function(node)
    {
        ui_parser.currentScene.closePage("GamePause");
        ui_parser.currentScene.resumeGame();
    },
    onReturn:function(node)
    {
        var scene = RoleMgrScene.scene();
        cc.Director.getInstance().replaceScene(scene);
    },
    onRestart:function(node)
    {
        ui_parser.currentScene.closePage("GameOver");
        ui_parser.currentScene.restartGame();
    },
    onNext:function(node)
    {
        ui_parser.currentScene.closePage("StageEnd");
        ui_parser.currentScene.restartGame();
    },

};