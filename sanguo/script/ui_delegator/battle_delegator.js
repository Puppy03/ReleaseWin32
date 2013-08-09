

ui_delegator.BattleDelegator = 
{
    onTouchBtnDefault : function () 
    {
        cc.log("Touched!!!!!!");
    },
    onTouchAvatarLeft : function () 
    {
      var page = ui_parser.currentScene.openUIPage("layout/command_left.xml");
    },
    onTouchAvatarRight : function () 
    {
      var page = ui_parser.currentScene.openUIPage("layout/command_right.xml");
    },
    onTouchStanbyLeft : function () 
    {
        ui_parser.currentScene.closePage("CommandLeft");
        ui_parser.currentScene.btGround.armyStanby(ECamp.Left);
    },
    onTouchForwardLeft : function ()
    {
        ui_parser.currentScene.closePage("CommandLeft");
        ui_parser.currentScene.btGround.armyForward(ECamp.Left);
    },
     onHeroForwardLeft : function ()
    {
        ui_parser.currentScene.closePage("CommandLeft");
        ui_parser.currentScene.btGround.heroForward(ECamp.Left);
    },
    onTouchSkill1Left : function ()
    {
        ui_parser.currentScene.closePage("CommandLeft");
        ui_parser.currentScene.testSkill("Skill00",ECamp.Left);
    },
    onTouchSkill2Left : function ()
    {
        ui_parser.currentScene.closePage("CommandLeft");
        ui_parser.currentScene.testSkill("Skill01",ECamp.Left);
    },

     onTouchStanbyRight : function () 
    {
        ui_parser.currentScene.closePage("CommandLeft");
        ui_parser.currentScene.btGround.armyStanby(ECamp.Right);
    },
    onTouchForwardRight : function ()
    {
        ui_parser.currentScene.closePage("CommandRight");
        ui_parser.currentScene.btGround.armyForward(ECamp.Right);
    },
     onHeroForwardRight : function ()
    {
        ui_parser.currentScene.closePage("CommandRight");
        ui_parser.currentScene.btGround.heroForward(ECamp.Right);
    },
    onTouchSkill1Right : function ()
    {
        ui_parser.currentScene.closePage("CommandRight");
        ui_parser.currentScene.testSkill("Skill00",ECamp.Right);
    },
    onTouchSkill2Right : function ()
    {
        ui_parser.currentScene.closePage("CommandRight");
        ui_parser.currentScene.testSkill("Skill01",ECamp.Right);
    },
};