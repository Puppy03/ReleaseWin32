require("script/config/common_config.js");

var heroConfig={
ZhangFei:{
    name:"ZhangFei",
	hp:500,
	att:100,
    magic:100,
    damage_delay:0.3,
    att_range:150,
    col_range:85,
    move_speed:300,
    shadow:"animation/zhangfei/shadow.png",
    anchor:{x:141,y:50},
    actor:
    {
        Idle:{
        prefix:"animation/zhangfei/idle/",
        start:0,
        end:15,
        interval:0.12,
       },
        Run:{
        prefix:"animation/zhangfei/run/",
        start:0,
        end:15,
        interval:0.03,
        },
        Att_b:{
        prefix:"animation/zhangfei/att_b/",
        start:0,
        end:15,
        interval:0.05,
        },
        Att_f:{
        prefix:"animation/zhangfei/att_f/",
        start:0,
        end:15,
        interval:0.05,
        },
        Att_fd:{
        prefix:"animation/zhangfei/att_fd/",
        start:0,
        end:15,
        interval:0.05,
        },
        Cast:{
        prefix:"animation/zhangfei/cast/",
        start:0,
        end:21,
        interval:0.07,
        },
        Command:{
        prefix:"animation/zhangfei/command/",
        start:0,
        end:19,
        interval:0.08,
        },
        Injured:{
        prefix:"animation/zhangfei/injured/",
        start:0,
        end:9,
        interval:0.12,
        },
        Dead:{
        prefix:"animation/zhangfei/dead/",
        start:1,
        end:11,
        interval:0.12,
        },
    },
},
LvBu:
{
    name:"LvBu",
	hp:5000,
	att:100,
    magic:100,
    damage_delay:0.3,
    att_range:150,
    col_range:85,
    move_speed:300,
    shadow:"animation/lvbu/shadow.png",
    anchor:{x:141,y:50},
    actor:
    {
        Idle:{
        prefix:"animation/lvbu/idle/",
        start:0,
        end:15,
        interval:0.12,
       },
        Run:{
        prefix:"animation/lvbu/run/",
        start:0,
        end:15,
        interval:0.03,
        },
        Att_b:{
        prefix:"animation/lvbu/att_b/",
        start:0,
        end:15,
        interval:0.05,
        },
        Att_f:{
        prefix:"animation/lvbu/att_f/",
        start:0,
        end:15,
        interval:0.05,
        },
        Att_fd:{
        prefix:"animation/lvbu/att_fd/",
        start:0,
        end:15,
        interval:0.05,
        },
        Cast:{
        prefix:"animation/lvbu/cast/",
        start:0,
        end:21,
        interval:0.05,
        },
        Command:{
        prefix:"animation/lvbu/command/",
        start:0,
        end:19,
        interval:0.12,
        },
        Injured:{
        prefix:"animation/lvbu/injured/",
        start:1,
        end:9,
        interval:0.12,
        },
        Dead:{
        prefix:"animation/lvbu/dead/",
        start:1,
        end:11,
        interval:0.12,
        },
    },
},
};