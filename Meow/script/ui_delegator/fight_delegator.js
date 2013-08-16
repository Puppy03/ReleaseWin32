

ui_delegator.FightDelegator = 
{
    onPauseGame:function(node)
    {
        ui_parser.currentScene.pauseGame();
        ui_parser.currentScene.openUIPage("layout/game_pause.xml");
    },
    onRestart:function(node)
    {
        ui_parser.currentScene.closePage("GameOver");
        ui_parser.currentScene.restartGame();
    },
    onContinue:function(node)
    {
        ui_parser.currentScene.closePage("StageEnd");
        ui_parser.currentScene.restartGame();
    },
    onResume:function(node)
    {
         ui_parser.currentScene.closePage("GamePause");
        ui_parser.currentScene.resumeGame();
    },
};