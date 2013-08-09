

ui_delegator.FightDelegator = 
{
    onPauseGame:function()
    {
        cc.log("Touched!!!!!!");
    },
    onRestart:function()
    {
        ui_parser.currentScene.closePage("GameOver");
        ui_parser.currentScene.restartGame();
    },
    onContinue:function()
    {
        ui_parser.currentScene.closePage("StageEnd");
        ui_parser.currentScene.restartGame();
    },
};