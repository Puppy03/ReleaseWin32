
// boot code needed for cocos2d + JS bindings.
// Not needed by cocos2d-html5

require("script/common/jsb_cocos2d_constants.js");
require("script/common/jsb_cocos2d.js");
require("script/common/jsb_opengl_constants.js");
require("script/common/jsb_opengl.js");
require("script/common/jsb_sys.js");
require("script/ui_parser/ui_parser.js");


require("script/logic/BattleScene.js");

//cc.dumpConfig();


var director = cc.Director.getInstance();
director.setDisplayStats(false);

// set FPS. the default value is 1.0/60 if you don't call this
//director.setAnimationInterval(1.0 / 60);

// create a scene. it's an autorelease object
var mainScene = BattleScene.scene();


// run
director.runWithScene(mainScene);

