

ui_delegator.FightDelegator = 
{
    onPauseGame:function(node)
    {
        cc.log("Touched!!!!!!");
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
};