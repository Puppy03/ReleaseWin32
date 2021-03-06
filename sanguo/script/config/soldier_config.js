require("script/config/common_config.js");


var soldierConfig={
Infantry:{
    type:ESoldierType.EInfantry,
	hp:100,
	att:50,
    damage_delay:0.2,
    att_range:50,
    col_range:30,
    move_speed:350,
    anchor:{x:106,y:25},
    shadow:"animation/infantry/shadow.png",
    actor:
    {
        Idle:{
        prefix:"animation/infantry/idle/",
        start:0,
        end:15,
        interval:0.12,
       },
        Run:{
        prefix:"animation/infantry/run/",
        start:0,
        end:15,
        interval:0.04,
        },
        Attach:{
        prefix:"animation/infantry/att/",
        start:0,
        end:15,
        interval:0.08,
        },
        Injured:{
        prefix:"animation/infantry/injured/",
        start:0,
        end:9,
        interval:0.08,
        },
        Dead:{
        prefix:"animation/infantry/dead/",
        start:0,
        end:11,
        interval:0.12,
        },
    },
},
Archer:{
    type:ESoldierType.EArcher,
	hp:100,
	att:50,
    damage_delay:0.8,
    att_range:500,
    col_range:30,
    move_speed:250,
    bullet:"animation/archer/arrow.png",
    launch_pos:{x:33,y:73},
    shadow:"animation/archer/shadow.png",
    anchor:{x:106,y:25},
    actor:
    {
        Idle:{
        prefix:"animation/archer/idle/",
        start:0,
        end:15,
        interval:0.12,
       },
        Run:{
        prefix:"animation/archer/run/",
        start:0,
        end:15,
        interval:0.04,
        },
        Attach:{
        prefix:"animation/archer/att/",
        start:0,
        end:17,
        interval:0.08,
        },
        Injured:{
        prefix:"animation/archer/injured/",
        start:0,
        end:9,
        interval:0.07,
        },
        Dead:{
        prefix:"animation/archer/dead/",
        start:2,
        end:11,
        interval:0.16,
        },
    },
},
};

var heroLeft = {x:-1350,y:-40};
var heroRight = {x:1350,y:-40};

var soldiersLeft=[
{x:-1800,y:100},{x:-1700,y:100},{x:-1600,y:100},{x:-1450,y:100},{x:-1350,y:100},{x:-1250,y:100},{x:-1100,y:100},{x:-1000,y:100},
{x:-1800,y:40},{x:-1700,y:40},{x:-1600,y:40},{x:-1450,y:40},{x:-1350,y:40},{x:-1250,y:40},{x:-1100,y:40},{x:-1000,y:40},
{x:-1800,y:-20},{x:-1700,y:-20},{x:-1600,y:-20},{x:-1100,y:-20},{x:-1000,y:-20},
{x:-1800,y:-80},{x:-1700,y:-80},{x:-1600,y:-80},{x:-1100,y:-80},{x:-1000,y:-80},
{x:-1800,y:-140},{x:-1700,y:-140},{x:-1600,y:-140},{x:-1450,y:-140},{x:-1350,y:-140},{x:-1250,y:-140},{x:-1100,y:-140},{x:-1000,y:-140},
{x:-1800,y:-200},{x:-1700,y:-200},{x:-1600,y:-200},{x:-1450,y:-200},{x:-1350,y:-200},{x:-1250,y:-200},{x:-1100,y:-200},{x:-1000,y:-200},
]

var soldiersRight=[
{x:1800,y:100},{x:1700,y:100},{x:1600,y:100},{x:1450,y:100},{x:1350,y:100},{x:1250,y:100},{x:1100,y:100},{x:1000,y:100},
{x:1800,y:40},{x:1700,y:40},{x:1600,y:40},{x:1450,y:40},{x:1350,y:40},{x:1250,y:40},{x:1100,y:40},{x:1000,y:40},
{x:1800,y:-20},{x:1700,y:-20},{x:1600,y:-20},{x:1100,y:-20},{x:1000,y:-20},
{x:1800,y:-80},{x:1700,y:-80},{x:1600,y:-80},{x:1100,y:-80},{x:1000,y:-80},
{x:1800,y:-140},{x:1700,y:-140},{x:1600,y:-140},{x:1450,y:-140},{x:1350,y:-140},{x:1250,y:-140},{x:1100,y:-140},{x:1000,y:-140},
{x:1800,y:-200},{x:1700,y:-200},{x:1600,y:-200},{x:1450,y:-200},{x:1350,y:-200},{x:1250,y:-200},{x:1100,y:-200},{x:1000,y:-200},
]