require("script/config/common_config.js");

var EBehavior={
ActMove:0,
DropMete:1,
Shoot:2,
Summon:3
};

var bossConfig={
Boss000:{
    hp:5000,
    speed:300,
    col_size:{width:95,height:116},
    img_normal:"monster/level9/normal.png",
    img_hurt:"monster/level9/hurt.png",
    loop_time:10,
    behavior:[
    {time:1,type:0,x:-200,y:200,dur:1},
    {time:1,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:2,type:0,x:200,y:200,dur:1},
    {time:2,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:3,type:0,x:-200,y:200,dur:1},
    {time:3,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:4,type:0,x:200,y:200,dur:1},
    {time:4,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:5,type:0,x:-200,y:200,dur:1},
    {time:5,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:6,type:0,x:200,y:200,dur:1},
    {time:6,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:7,type:0,x:-200,y:200,dur:1},
    {time:7,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:8,type:0,x:200,y:200,dur:1},
    {time:8,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:9,type:0,x:0,y:200,dur:0.5},
    {time:9,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:11,type:0,x:0,y:-300,dur:0.3},
    {time:11.5,type:0,x:0,y:200,dur:0.5},
    ],
    anim_normal:{
    prefix:"monster/level9/",
    start:1,
    end:2,
    interval:0.12,
    },
},
Boss01:{
    hp:5000,
    speed:300,
    col_size:{width:95,height:116},
    img_normal:"monster/level9/normal.png",
    img_hurt:"monster/level9/hurt.png",
    loop_time:10,
    behavior:[
    {time:0.5,type:0,x:-100,y:100,dur:0.5},
    {time:1,type:0,x:-200,y:200,dur:0.5},
    {time:1,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:1,type:2,born_x:30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:1.5,type:0,x:-100,y:300,dur:0.5},
    {time:2,type:0,x:0,y:200,dur:0.5},
    {time:2,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:2,type:2,born_x:30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:2.5,type:0,x:100,y:100,dur:0.5},
    {time:3,type:0,x:200,y:200,dur:0.5},
    {time:3,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:3,type:2,born_x:30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:3.5,type:0,x:100,y:300,dur:0.5},
    {time:4,type:0,x:0,y:200,dur:0.5},
    {time:4,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:4,type:2,born_x:30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
//
    {time:4.5,type:0,x:-100,y:100,dur:0.5},
    {time:5,type:0,x:-200,y:200,dur:0.5},
    {time:5,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:5,type:2,born_x:30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:5.5,type:0,x:-100,y:300,dur:0.5},
    {time:5.5,type:1,born_x:0,config:"Meteorite00",follow_speed:400},
    {time:6,type:0,x:0,y:200,dur:0.5},
    {time:6,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:6,type:2,born_x:30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:6.5,type:0,x:100,y:100,dur:0.5},
    {time:7,type:0,x:200,y:200,dur:0.5},
    {time:7,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:7,type:2,born_x:30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:7.5,type:0,x:100,y:300,dur:0.5},
    {time:7.5,type:1,born_x:0,config:"Meteorite00",follow_speed:400},
    {time:8,type:0,x:0,y:200,dur:0.5},
//
    {time:9,type:0,x:-100,y:100,dur:0.5},
    {time:9.5,type:0,x:-200,y:200,dur:0.5},
    {time:10,type:0,x:-100,y:300,dur:0.5},
    {time:10,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:10,type:2,born_x:30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:10.5,type:1,born_x:0,config:"Meteorite00",follow_speed:400},
    {time:11,type:0,x:0,y:200,dur:0.5},
    {time:11.5,type:0,x:100,y:100,dur:0.5},
    {time:12,type:0,x:200,y:200,dur:0.5},
    {time:12.5,type:0,x:100,y:300,dur:0.5},
    {time:12.5,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:12.5,type:2,born_x:30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:12.5,type:1,born_x:0,config:"Meteorite00",follow_speed:400},
    {time:13,type:0,x:0,y:200,dur:0.5},
    ],
    anim_normal:{
    prefix:"monster/level9/",
    start:1,
    end:2,
    interval:0.12,
    },
},
Boss02:{
    hp:5000,
    speed:300,
    col_size:{width:95,height:116},
    img_normal:"monster/level9/normal.png",
    img_hurt:"monster/level9/hurt.png",
    loop_time:5,
    behavior:[
    {time:0.5,type:0,x:-50,y:300,dur:0.5},
    {time:0.5,type:2,born_x:0,born_y:-100,speed_x:400,speed_y:-800,config:"BulletPet0"},
    {time:0.5,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:0.5,type:2,born_x:0,born_y:-100,speed_x:-400,speed_y:-800,config:"BulletPet0"},
    {time:1,type:0,x:-100,y:200,dur:0.5},
    {time:1,type:3,born_x:0,born_y:-100,speed:500,config:"SummonDog"},
    {time:1.5,type:0,x:-150,y:300,dur:0.5},
    {time:1.5,type:2,born_x:0,born_y:-100,speed_x:-400,speed_y:-800,config:"BulletPet0"},
    {time:1.5,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:1.5,type:2,born_x:0,born_y:-100,speed_x:400,speed_y:-800,config:"BulletPet0"},
    {time:2,type:0,x:-200,y:200,dur:0.5},
    {time:2,type:3,born_x:0,born_y:-100,speed:500,config:"SummonDog"},
    {time:2.5,type:0,x:-150,y:100,dur:0.5},
    {time:2.5,type:2,born_x:0,born_y:-100,speed_x:-400,speed_y:-800,config:"BulletPet0"},
    {time:2.5,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:2.5,type:2,born_x:0,born_y:-100,speed_x:400,speed_y:-800,config:"BulletPet0"},
    {time:3,type:0,x:-100,y:200,dur:0.5},
    {time:3,type:3,born_x:0,born_y:-100,speed:500,config:"SummonDog"},
    {time:3.5,type:0,x:-50,y:100,dur:0.5},
    {time:3.5,type:2,born_x:0,born_y:-100,speed_x:400,speed_y:-800,config:"BulletPet0"},
    {time:3.5,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:3.5,type:2,born_x:0,born_y:-100,speed_x:-400,speed_y:-800,config:"BulletPet0"},
    {time:4,type:0,x:0,y:200,dur:0.5},
    {time:4,type:3,born_x:0,born_y:-100,speed:500,config:"SummonDog"},
    {time:4.5,type:0,x:50,y:100,dur:0.5},
    {time:4.5,type:2,born_x:0,born_y:-100,speed_x:400,speed_y:-800,config:"BulletPet0"},
    {time:4.5,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:4.5,type:2,born_x:0,born_y:-100,speed_x:-400,speed_y:-800,config:"BulletPet0"},
    {time:5,type:0,x:100,y:200,dur:0.5},
    {time:5,type:3,born_x:0,born_y:-100,speed:500,config:"SummonDog"},
    {time:5.5,type:0,x:150,y:100,dur:0.5},
    {time:5.5,type:2,born_x:0,born_y:-100,speed_x:400,speed_y:-800,config:"BulletPet0"},
    {time:5.5,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:5.5,type:2,born_x:0,born_y:-100,speed_x:-400,speed_y:-800,config:"BulletPet0"},
    {time:6,type:0,x:200,y:200,dur:0.5},
    {time:6,type:3,born_x:0,born_y:-100,speed:500,config:"SummonDog"},
    {time:6.5,type:0,x:150,y:300,dur:0.5},
    {time:6.5,type:2,born_x:0,born_y:-100,speed_x:400,speed_y:-800,config:"BulletPet0"},
    {time:6.5,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:6.5,type:2,born_x:0,born_y:-100,speed_x:-400,speed_y:-800,config:"BulletPet0"},
    {time:7,type:0,x:100,y:200,dur:0.5},
    {time:7,type:3,born_x:0,born_y:-100,speed:500,config:"SummonDog"},
    {time:7.5,type:0,x:50,y:300,dur:0.5},
    {time:7.5,type:2,born_x:0,born_y:-100,speed_x:-400,speed_y:-800,config:"BulletPet0"},
    {time:7.5,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:7.5,type:2,born_x:0,born_y:-100,speed_x:400,speed_y:-800,config:"BulletPet0"},
    {time:8,type:0,x:0,y:200,dur:0.5},
    {time:8,type:3,born_x:0,born_y:-100,speed:500,config:"SummonDog"},
    ],
    anim_normal:{
    prefix:"monster/level9/",
    start:1,
    end:2,
    interval:0.12,
    },
},
Boss03:{
    hp:5000,
    speed:300,
    col_size:{width:95,height:116},
    img_normal:"monster/level9/normal.png",
    img_hurt:"monster/level9/hurt.png",
    loop_time:10,
    behavior:[
    {time:1,type:0,x:-200,y:200,dur:1},
    {time:1,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:2,type:0,x:200,y:200,dur:1},
    {time:2,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:3,type:0,x:-200,y:200,dur:1},
    {time:3,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:4,type:0,x:200,y:200,dur:1},
    {time:4,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:5,type:0,x:-200,y:200,dur:1},
    {time:5,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:6,type:0,x:200,y:200,dur:1},
    {time:6,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:7,type:0,x:-200,y:200,dur:1},
    {time:7,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:8,type:0,x:200,y:200,dur:1},
    {time:8,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:9,type:0,x:0,y:200,dur:0.5},
    {time:9,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:11,type:0,x:-200,y:200,dur:0.2},
    {time:11.2,type:0,x:200,y:200,dur:0.2},
    {time:11.4,type:0,x:-200,y:200,dur:0.2},
    {time:11.4,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:11.4,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:11.4,type:2,born_x:30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:11.6,type:0,x:200,y:200,dur:0.2},
    {time:11.8,type:0,x:-200,y:200,dur:0.2},
    {time:11.8,type:2,born_x:-60,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:11.8,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:11.8,type:2,born_x:-90,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:12,type:0,x:200,y:200,dur:0.2},
    {time:12.2,type:0,x:-200,y:200,dur:0.2},
    {time:12.2,type:2,born_x:-120,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:12.2,type:2,born_x:-150,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:12.2,type:2,born_x:-180,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:12.4,type:0,x:200,y:200,dur:0.2},
    {time:12.6,type:0,x:-200,y:200,dur:0.2},
    {time:12.6,type:2,born_x:-240,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:12.6,type:2,born_x:-270,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:12.6,type:2,born_x:-300,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:12.8,type:0,x:200,y:200,dur:0.2},
    {time:13,type:0,x:-200,y:200,dur:0.2},
    {time:13,type:2,born_x:-120,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:13,type:2,born_x:-150,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:13,type:2,born_x:-180,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:14,type:0,x:-200,y:200,dur:1},
    {time:14,type:1,born_x:200,config:"Meteorite00",follow_speed:300},
    {time:15,type:0,x:200,y:200,dur:1},
    {time:15,type:1,born_x:-200,config:"Meteorite00",follow_speed:300},
    {time:16,type:0,x:-200,y:200,dur:1},
    {time:16,type:1,born_x:200,config:"Meteorite00",follow_speed:300},
    {time:17,type:0,x:200,y:200,dur:1},
    {time:17,type:1,born_x:-200,config:"Meteorite00",follow_speed:300},
    ],
    anim_normal:{
    prefix:"monster/level9/",
    start:1,
    end:2,
    interval:0.12,
    },
},
Boss04:{
    hp:5000,
    speed:300,
    col_size:{width:95,height:116},
    img_normal:"monster/level9/normal.png",
    img_hurt:"monster/level9/hurt.png",
    loop_time:10,
    behavior:[
    {time:1,type:0,x:-200,y:200,dur:1},
    {time:1,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:2,type:0,x:-0,y:200,dur:1},
    {time:2,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:3,type:0,x:200,y:200,dur:1},
    {time:3,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:4,type:0,x:-0,y:200,dur:1},
    {time:4,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    //summon
    {time:5,type:3,born_x:150,born_y:0,speed:500,config:"SummonDog"},
    {time:5,type:3,born_x:0,born_y:0,speed:500,config:"SummonDog"},
    {time:5,type:3,born_x:-150,born_y:0,speed:500,config:"SummonDog"},
    
    {time:6,type:3,born_x:150,born_y:0,speed:500,config:"SummonDog"},
    {time:6,type:3,born_x:0,born_y:0,speed:500,config:"SummonDog"},
    {time:6,type:3,born_x:-150,born_y:0,speed:500,config:"SummonDog"},
    
    {time:7,type:3,born_x:150,born_y:0,speed:500,config:"SummonDog"},
    {time:7,type:3,born_x:0,born_y:0,speed:500,config:"SummonDog"},
    {time:7,type:3,born_x:-150,born_y:0,speed:500,config:"SummonDog"},
    
    {time:8,type:3,born_x:150,born_y:0,speed:500,config:"SummonDog"},
    {time:8,type:3,born_x:0,born_y:0,speed:500,config:"SummonDog"},
    {time:8,type:3,born_x:-150,born_y:0,speed:500,config:"SummonDog"},
    //
    {time:9,type:0,x:-200,y:200,dur:1},
    {time:9,type:1,born_x:0,config:"Meteorite00",follow_speed:400},
    {time:9,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:10,type:0,x:-0,y:200,dur:1},
    {time:10,type:1,born_x:0,config:"Meteorite00",follow_speed:400},
    {time:10,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:11,type:0,x:200,y:200,dur:1},
    {time:11,type:1,born_x:0,config:"Meteorite00",follow_speed:400},
    {time:11,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:12,type:0,x:-0,y:200,dur:1},
    {time:12,type:1,born_x:0,config:"Meteorite00",follow_speed:400},
    {time:12,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    ],
    anim_normal:{
    prefix:"monster/level9/",
    start:1,
    end:2,
    interval:0.12,
    },
},
BossSample:{
    hp:5000,
    speed:300,
    col_size:{width:95,height:116},
    img_normal:"monster/level9/normal.png",
    img_hurt:"monster/level9/hurt.png",
    loop_time:10,
    behavior:[
    {time:1,type:0,x:-200,y:200,dur:1},
    {time:1,type:2,born_x:0,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:8,type:3,born_x:0,born_y:-100,speed:500,config:"SummonDog"},
    {time:1.5,type:1,born_x:0,config:"Meteorite00",follow_speed:400},
    ],
    anim_normal:{
    prefix:"monster/level9/",
    start:1,
    end:2,
    interval:0.12,
    },
},
Boss00:{
    hp:5000,
    speed:300,
    col_size:{width:95,height:116},
    img_normal:"monster/level9/normal.png",
    img_hurt:"monster/level9/hurt.png",
    loop_time:5,
    behavior:[
    {time:1,type:0,x:-200,y:200,dur:1},
    {time:1,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:2,type:0,x:-0,y:200,dur:1},
    {time:2,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:3,type:0,x:200,y:200,dur:1},
    {time:3,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:4,type:0,x:-0,y:200,dur:1},
    {time:4,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    //summon
    {time:5,type:3,born_x:150,born_y:0,speed:500,config:"SummonDog"},
    {time:5,type:3,born_x:0,born_y:0,speed:500,config:"SummonDog"},
    {time:5,type:3,born_x:-150,born_y:0,speed:500,config:"SummonDog"},
    
    {time:6,type:3,born_x:150,born_y:0,speed:500,config:"SummonDog"},
    {time:6,type:3,born_x:0,born_y:0,speed:500,config:"SummonDog"},
    {time:6,type:3,born_x:-150,born_y:0,speed:500,config:"SummonDog"},
    
    {time:7,type:3,born_x:150,born_y:0,speed:500,config:"SummonDog"},
    {time:7,type:3,born_x:0,born_y:0,speed:500,config:"SummonDog"},
    {time:7,type:3,born_x:-150,born_y:0,speed:500,config:"SummonDog"},
    
    {time:8,type:3,born_x:150,born_y:0,speed:500,config:"SummonDog"},
    {time:8,type:3,born_x:0,born_y:0,speed:500,config:"SummonDog"},
    {time:8,type:3,born_x:-150,born_y:0,speed:500,config:"SummonDog"},
    //
    {time:9,type:0,x:-200,y:200,dur:1},
    {time:9,type:1,born_x:0,config:"Meteorite00",follow_speed:400},
    {time:9,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:10,type:0,x:-0,y:200,dur:1},
    {time:10,type:1,born_x:0,config:"Meteorite00",follow_speed:400},
    {time:10,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:11,type:0,x:200,y:200,dur:1},
    {time:11,type:1,born_x:0,config:"Meteorite00",follow_speed:400},
    {time:11,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    {time:12,type:0,x:-0,y:200,dur:1},
    {time:12,type:1,born_x:0,config:"Meteorite00",follow_speed:400},
    {time:12,type:2,born_x:-30,born_y:-100,speed_x:0,speed_y:-800,config:"BulletPet0"},
    ],
    anim_normal:{
    prefix:"monster/level9/",
    start:1,
    end:2,
    interval:0.12,
    },
},
};