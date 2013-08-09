require("script/config/common_config.js");

var EObjType={
EEnemy:0,
EMeteorite:1,
EBarrier:2
};

var segmentConfig = {
Segment00:[
{time:1,  type:0, born_x:-200,config:"Enemy00"},
{time:1.5,  type:0, born_x:300, config:"Enemy00"},
{time:1.8,  type:2, born_x:400, config:"Barrier00"},
{time:2.0,type:1, born_x:500, config:"Meteorite00"},
{time:2.2,  type:0, born_x:-200,config:"Enemy00"},
{time:3.0,  type:0, born_x:400, config:"Enemy00"},
{time:3.5,  type:0, born_x:-10,config:"Enemy00"},
{time:4.2,  type:0, born_x:30, config:"Enemy00"},
{time:4.6,  type:0, born_x:400,config:"Enemy00"},
{time:5.0,  type:0, born_x:300, config:"Enemy00"},
{time:5.5,  type:0, born_x:160,config:"Enemy00"},
{time:6.1,  type:0, born_x:30, config:"Enemy00"},
{time:6.1,  type:0, born_x:-70,config:"Enemy00"},
{time:7,  type:0, born_x:100, config:"Enemy00"},
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