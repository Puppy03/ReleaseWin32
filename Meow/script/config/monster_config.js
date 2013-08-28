require("script/config/enemy_config.js");

var monsterConfig={
Dog1:{
    hp:120,
    speed:200,
    col_size:{width:80,height:100},   
    anim_normal:{
    prefix:"monster/dog1/",
    start:1,
    end:3,
    interval:0.12,
    },
},
Dog2:{
    hp:500,
    speed:200,
    col_size:{width:80,height:100},
    img_hurt:"monster/dog2/hurt.png",
    
    anim_normal:{
    prefix:"monster/dog2/",
    start:1,
    end:4,
    interval:0.12,
    },
},
Dog3:{
    hp:250,
    speed:0,
    col_size:{width:80,height:100}, 
    img_hurt:"monster/dog3/hurt.png",
    hurt_idle:true,
    anim_normal:{
    prefix:"monster/dog3/",
    start:1,
    end:4,
    interval:0.12,
    },
},

Dog4:{
    hp:250,
    speed:0,
    col_size:{width:80,height:100},
    img_hurt:"monster/dog4/hurt.png",
    anim_normal:{
    prefix:"monster/dog4/",
    start:1,
    end:4,
    interval:0.12,
    },
},
Dog5:{
    hp:500,
    speed:100,
    col_size:{width:80,height:100},
    anim_normal:{
    prefix:"monster/dog5/normal/",
    start:1,
    end:4,
    interval:0.12,
    },
    anim_hurt:{
    prefix:"monster/dog5/hurt/",
    start:1,
    end:4,
    interval:0.12,
    },
},
Dog6:{
    hp:500,
    speed:100,
    col_size:{width:80,height:100},
    anim_normal:{
    prefix:"monster/dog6/normal/",
    start:1,
    end:4,
    interval:0.12,
    },
    anim_hurt:{
    prefix:"monster/dog6/hurt/",
    start:1,
    end:4,
    interval:0.12,
    },
},

SummonDog:{
    hp:100,
    speed:250,
    col_size:{width:80,height:100},
    hurt_idle:true,
    anim_normal:{
    prefix:"monster/dog3/",
    start:1,
    end:4,
    interval:0.12,
    },
    anim_born:{
    prefix:"monster/mon_dead/",
    start:1,
    end:7,
    interval:0.08,
    },
},
};