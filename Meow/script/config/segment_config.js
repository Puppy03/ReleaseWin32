require("script/config/common_config.js");

var EObjType={
EEnemy:0,
EMeteorite:1,
EBarrier:2
};

var segmentConfig = {
Segment00:[
{time:2.0,   type:0, born_x:-128,  config:"Enemy00"},
{time:2.0,   type:0, born_x:-256,  config:"Enemy00"},
{time:4.0,   type:0, born_x:128,   config:"Enemy00"},
{time:4.0,   type:0, born_x:256,   config:"Enemy00"},
{time:6.0,   type:0, born_x:-128,  config:"Enemy00"},
{time:6.0,   type:0, born_x:-256,  config:"Enemy00"},
{time:8.0,   type:0, born_x:128,   config:"Enemy00"},
{time:8.0,   type:0, born_x:256,   config:"Enemy00"},
{time:10.0,  type:0, born_x:-128,  config:"Enemy00"},
{time:10.0,  type:0, born_x:-256,  config:"Enemy00"},
{time:12.0,  type:0, born_x:128,   config:"Enemy00"},
{time:12.0,  type:0, born_x:256,   config:"Enemy00"},
{time:14.0,  type:0, born_x:-128,  config:"Enemy00"},
{time:14.0,  type:0, born_x:-256,  config:"Enemy00"},
],
Segment01:[
{time:1,  type:0, born_x:-200,config:"Enemy00"},
{time:1.5,  type:0, born_x:300, config:"Enemy00"},
{time:1.8,  type:2, born_x:200, config:"Barrier00"},
{time:2.3,type:1, born_x:300, config:"Meteorite00"},
],
Segment02:[
{time:1,  type:0, born_x:-200,config:"Enemy00"},
{time:1.5,  type:0, born_x:300, config:"Enemy00"},
{time:2.8,  type:2, born_x:400, config:"Barrier00"},
{time:3.0,type:1, born_x:500, config:"Meteorite00"},
],
};