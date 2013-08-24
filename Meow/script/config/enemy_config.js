require("script/config/common_config.js");

var deadEffect={
prefix:"monster/mon_dead/",
start:1,
end:7,
interval:0.08,
};

var deadSound="mon_dead.mp3";

var enemyConfig={
Enemy00:{
    hp:100,
    speed:500,
    col_size:{width:95,height:116},
    img_normal:"monster/level0/normal.png",
    img_hurt:"monster/level0/hurt.png",
    hurt_idle:false,
    actor:{
    prefix:"monster/level0/",
    start:1,
    end:3,
    interval:0.12,
    },
},
Enemy01:{
    hp:200,
    speed:500,
    col_size:{width:95,height:116},
    img_normal:"monster/level1/normal.png",
    img_hurt:"monster/level1/hurt.png",
    hurt_idle:false,
    actor:{
    prefix:"monster/level0/",
    start:1,
    end:3,
    interval:0.12,
    },
},
Enemy02:{
    hp:300,
    speed:500,
    col_size:{width:95,height:116},
    img_normal:"monster/level2/normal.png",
    img_hurt:"monster/level2/hurt.png",
    hurt_idle:false,
    actor:{
    prefix:"monster/level0/",
    start:1,
    end:3,
    interval:0.12,
    },
},
Enemy03:{
    hp:400,
    speed:500,
    col_size:{width:95,height:116},
    img_normal:"monster/level3/normal.png",
    img_hurt:"monster/level3/hurt.png",
    hurt_idle:false,
    actor:{
    prefix:"monster/level0/",
    start:1,
    end:3,
    interval:0.12,
    },
},
Enemy04:{
    hp:500,
    speed:500,
    col_size:{width:95,height:116},
    img_normal:"monster/level4/normal.png",
    img_hurt:"monster/level4/hurt.png",
    hurt_idle:false,
    actor:{
    prefix:"monster/level0/",
    start:1,
    end:3,
    interval:0.12,
    },
},
Enemy05:{
    hp:600,
    speed:500,
    col_size:{width:95,height:116},
    img_normal:"monster/level5/normal.png",
    img_hurt:"monster/level5/hurt.png",
    hurt_idle:false,
    actor:{
    prefix:"monster/level0/",
    start:1,
    end:3,
    interval:0.12,
    },
},
Enemy06:{
    hp:700,
    speed:500,
    col_size:{width:95,height:116},
    img_normal:"monster/level6/normal.png",
    img_hurt:"monster/level6/hurt.png",
    hurt_idle:false,
    actor:{
    prefix:"monster/level0/",
    start:1,
    end:3,
    interval:0.12,
    },
},
Enemy07:{
    hp:800,
    speed:500,
    col_size:{width:95,height:116},
    img_normal:"monster/level7/normal.png",
    img_hurt:"monster/level7/hurt.png",
    hurt_idle:false,
    actor:{
    prefix:"monster/level0/",
    start:1,
    end:3,
    interval:0.12,
    },
},
Enemy08:{
    hp:900,
    speed:500,
    col_size:{width:95,height:116},
    img_normal:"monster/level8/normal.png",
    img_hurt:"monster/level8/hurt.png",
    hurt_idle:false,
    actor:{
    prefix:"monster/level0/",
    start:1,
    end:3,
    interval:0.12,
    },
},
Enemy09:{
    hp:1000,
    speed:500,
    col_size:{width:95,height:116},
    img_normal:"monster/level9/normal.png",
    img_hurt:"monster/level9/hurt.png",
    hurt_idle:false,
    actor:{
    prefix:"monster/level0/",
    start:1,
    end:3,
    interval:0.12,
    },
},
Enemy10:{
    hp:100,
    speed:800,
    col_size:{width:95,height:116},
    img_normal:"monster/level0/normal.png",
    img_hurt:"monster/level0/hurt.png",
    hurt_idle:false,
    actor:{
    prefix:"monster/level0/",
    start:1,
    end:3,
    interval:0.12,
    },
},
Dog1:{
    hp:120,
    speed:500,
    col_size:{width:80,height:100},
    img_normal:"",
    img_hurt:"",
    hurt_idle:false,
    actor:{
    prefix:"monster/dog1/",
    start:1,
    end:3,
    interval:0.12,
    },
},
Dog2:{
    hp:200,
    speed:500,
    col_size:{width:80,height:100},
    img_normal:"",
    img_hurt:"monster/dog2/hurt.png",
    hurt_idle:true,
    actor:{
    prefix:"monster/dog2/",
    start:1,
    end:4,
    interval:0.12,
    },
},
Dog3:{
    hp:250,
    speed:250,
    col_size:{width:80,height:100},
    img_normal:"",
    img_hurt:"monster/dog3/hurt.png",
    hurt_idle:true,
    actor:{
    prefix:"monster/dog3/",
    start:1,
    end:4,
    interval:0.12,
    },
},
SummonDog:{
    hp:100,
    speed:250,
    col_size:{width:80,height:100},
    img_normal:"",
    img_hurt:"",
    hurt_idle:false,
    actor:{
    prefix:"monster/dog3/",
    start:1,
    end:4,
    interval:0.12,
    },
    born:{
    prefix:"monster/mon_dead/",
    start:1,
    end:7,
    interval:0.08,
    },
},
};