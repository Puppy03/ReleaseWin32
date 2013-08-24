require("script/config/common_config.js");

var EBehavior={
ActMove:0,
DropMete:1,
Shoot:2,
Summon:3
};

var bossConfig={
Boss00:{
    hp:50000,
    speed:300,
    col_size:{width:95,height:116},
    img_normal:"monster/level9/normal.png",
    img_hurt:"monster/level9/hurt.png",
    loop_time:10,
    behavior:[
    {time:3,type:0,x:-150,y:0,dur:1},
    {time:4,type:1,born_x:0,config:"Meteorite00",follow_speed:300},
    {time:6,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-500,config:"BulletPet0"},
    {time:8,type:3,born_x:0,born_y:-100,speed:500,config:"SummonDog"},
    ],
    actor:{
    prefix:"monster/level9/",
    start:1,
    end:2,
    interval:0.12,
    },
},
};