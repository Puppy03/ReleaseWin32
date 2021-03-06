require("script/config/common_config.js");

var stageConfigs = {
stage1:{
    max_distance:16400,
    back_img:"scene/01.jpg",
    roll_speed:400,
    loop:false,
    drop_items:[
    {item_id:"Item00",percent:1},
    {item_id:"Item01",percent:1},
    {item_id:"Item02",percent:1},
    ],
    segments:[
    {id:"S0100",diff:1,acc:1},
    {id:"M01",diff:1,acc:1},
    {id:"S0101",diff:1,acc:1},
    {id:"M02",diff:1,acc:1},
    {id:"S0102",diff:1,acc:1},
    {id:"M03",diff:1,acc:1},
    {id:"S0103",diff:1,acc:1},
    {id:"M04",diff:1,acc:1},
    {id:"S0104",diff:1,acc:1},
    {id:"M05",diff:1,acc:1},
    {id:"S0105",diff:1,acc:1},
    {id:"S0106",diff:1,acc:1},
    ],
},
stage2:{
    max_distance:16400,
    back_img:"scene/02.jpg",
    roll_speed:400,
    loop:false,
    drop_items:[
    {item_id:"Item00",percent:1},
    {item_id:"Item01",percent:1},
    {item_id:"Item02",percent:1},
    ],
    segments:[
    {id:"S0115",diff:1,acc:1.3},
    {id:"M01",diff:1,acc:1},
    {id:"S0105",diff:1,acc:1},
    {id:"M02",diff:1,acc:1},
    {id:"S0104",diff:1,acc:1},
    {id:"M03",diff:1,acc:1},
    {id:"S0103",diff:1,acc:1},
    {id:"M04",diff:1,acc:1},
    {id:"S0102",diff:1,acc:1},
    {id:"M05",diff:1,acc:1},
    {id:"S0101",diff:1,acc:1},
    {id:"S0100",diff:1,acc:1},
    ],
},
stage3:{
    max_distance:16400,
    back_img:"scene/01.png",
    roll_speed:400,
    loop:false,
    drop_items:[
    {item_id:"Item00",percent:1},
    {item_id:"Item01",percent:1},
    {item_id:"Item02",percent:1},
    ],
    segments:[
    {id:"S0100",diff:1,acc:1},
    {id:"M01",diff:1,acc:1},
    {id:"S0101",diff:1,acc:1},
    {id:"M02",diff:1,acc:1},
    {id:"S0102",diff:1,acc:1},
    {id:"M03",diff:1,acc:1},
    {id:"S0103",diff:1,acc:1},
    {id:"M04",diff:1,acc:1},
    {id:"S0104",diff:1,acc:1},
    {id:"M05",diff:1,acc:1},
    {id:"S0105",diff:1,acc:1},
    {id:"S0106",diff:1,acc:1},
    ],
},
stage4:{
    max_distance:16400,
    back_img:"scene/01.png",
    roll_speed:400,
    loop:false,
    drop_items:[
    {item_id:"Item00",percent:1},
    {item_id:"Item01",percent:1},
    {item_id:"Item02",percent:1},
    ],
    segments:[
    {id:"S0100",diff:1,acc:1},
    {id:"M01",diff:1,acc:1},
    {id:"S0101",diff:1,acc:1},
    {id:"M02",diff:1,acc:1},
    {id:"S0102",diff:1,acc:1},
    {id:"M03",diff:1,acc:1},
    {id:"S0103",diff:1,acc:1},
    {id:"M04",diff:1,acc:1},
    {id:"S0104",diff:1,acc:1},
    {id:"M05",diff:1,acc:1},
    {id:"S0105",diff:1,acc:1},
    {id:"S0106",diff:1,acc:1},
    ],
},
stage5:{
    max_distance:16400,
    back_img:"scene/01.png",
    roll_speed:400,
    loop:false,
    drop_items:[
    {item_id:"Item00",percent:1},
    {item_id:"Item01",percent:1},
    {item_id:"Item02",percent:1},
    ],
    segments:[
    {id:"S0100",diff:1,acc:1},
    {id:"M01",diff:1,acc:1},
    {id:"S0101",diff:1,acc:1},
    {id:"M02",diff:1,acc:1},
    {id:"S0102",diff:1,acc:1},
    {id:"M03",diff:1,acc:1},
    {id:"S0103",diff:1,acc:1},
    {id:"M04",diff:1,acc:1},
    {id:"S0104",diff:1,acc:1},
    {id:"M05",diff:1,acc:1},
    {id:"S0105",diff:1,acc:1},
    {id:"S0106",diff:1,acc:1},
    ],
},
stage6:{
    max_distance:16400,
    back_img:"scene/01.png",
    roll_speed:400,
    loop:false,
    drop_items:[
    {item_id:"Item00",percent:1},
    {item_id:"Item01",percent:1},
    {item_id:"Item02",percent:1},
    ],
    segments:[
    {id:"S0100",diff:1,acc:1},
    {id:"M01",diff:1,acc:1},
    {id:"S0101",diff:1,acc:1},
    {id:"M02",diff:1,acc:1},
    {id:"S0102",diff:1,acc:1},
    {id:"M03",diff:1,acc:1},
    {id:"S0103",diff:1,acc:1},
    {id:"M04",diff:1,acc:1},
    {id:"S0104",diff:1,acc:1},
    {id:"M05",diff:1,acc:1},
    {id:"S0105",diff:1,acc:1},
    {id:"S0106",diff:1,acc:1},
    ],
},
stage2_1:{
    max_distance:19200,
    back_img:"scene/01.png",
    roll_speed:400,
    loop:false,
    drop_items:[
    {item_id:"Item00",percent:1},
    {item_id:"Item01",percent:13.5},
    {item_id:"Item02",percent:11.8},
    ],
    segments:[
    {id:"S0200",diff:1,acc:1},
    {id:"S0201",diff:1,acc:1},
    {id:"S0202",diff:1,acc:1},
    {id:"S0203",diff:1,acc:1},
    {id:"S0204",diff:1,acc:1},
    {id:"S0205",diff:1,acc:1},
    {id:"S0206",diff:1,acc:1},
    {id:"S0207",diff:1,acc:1},
    {id:"S0208",diff:1,acc:1},
    {id:"S0209",diff:1,acc:1},
    ],
},
stage3_1:{
    max_distance:14000,
    back_img:"scene/03.jpg",
    roll_speed:400,
    loop:false,
    drop_items:[
    {item_id:"Item00",percent:1},
    {item_id:"Item01",percent:13.5},
    {item_id:"Item02",percent:11.8},
    ],
    segments:[
    {id:"S0300",diff:1,acc:1},
    {id:"S0301",diff:1,acc:1},
    {id:"M02",diff:1,acc:1},
    {id:"S0302",diff:1,acc:1.1},
    {id:"S0303",diff:1,acc:1.1},
    {id:"M01",diff:1,acc:1},
    {id:"S0304",diff:1,acc:1.2},
    {id:"S0305",diff:1,acc:1.2},
    {id:"M04",diff:1,acc:1},
    {id:"S0306",diff:1,acc:1.3},
    {id:"S0310",diff:1,acc:1.3},
    {id:"M02",diff:1,acc:1},
    {id:"S0101",diff:1,acc:1.4},
    {id:"S0208",diff:1,acc:1.4},
    {id:"S0104",diff:1,acc:1.4},
    {id:"S0205",diff:1,acc:1.4},
    ],
   },
stage4_1:{
    max_distance:25000,
    back_img:"scene/04.jpg",
    roll_speed:600,
    loop:false,
    drop_items:[
    {item_id:"Item00",percent:0.6},
    {item_id:"Item01",percent:13.5},
    {item_id:"Item02",percent:11.8},
    ],
    segments:[
    {id:"S0405",diff:1,acc:1},
    {id:"M01",diff:1,acc:1.3},
    {id:"S0401",diff:1,acc:1.3},
    {id:"M02",diff:1,acc:1.3},
    {id:"S0402",diff:1,acc:1},
    {id:"M04",diff:1,acc:1},
    {id:"S0403",diff:1,acc:1},
    {id:"M05",diff:1,acc:1},
    {id:"S0404",diff:1,acc:1},
    {id:"M03",diff:1,acc:1},
    ],
    },
stage5_1:{
    max_distance:25000,
    back_img:"scene/01.jpg",
    roll_speed:600,
    loop:false,
    drop_items:[
    {item_id:"Item00",percent:0.6},
    {item_id:"Item01",percent:13.5},
    {item_id:"Item02",percent:11.8},
    ],
    segments:[
    {id:"S0500",diff:1,acc:1},
    {id:"M05",diff:1,acc:1.3},
    {id:"S0401",diff:1,acc:1.3},
    {id:"M02",diff:1,acc:1.3},
    {id:"S0402",diff:1,acc:1},
    {id:"M04",diff:1,acc:1},
    {id:"S0403",diff:1,acc:1},
    {id:"M05",diff:1,acc:1},
    {id:"S0404",diff:1,acc:1},
    {id:"M03",diff:1,acc:1},
    ],
    },
stage6:{
    max_distance:25000,
    back_img:"scene/01.jpg",
    roll_speed:600,
    loop:false,
    drop_items:[
    {item_id:"Item00",percent:0.6},
    {item_id:"Item01",percent:13.5},
    {item_id:"Item02",percent:11.8},
    ],
    segments:[
    {id:"S0405",diff:1,acc:1},
    {id:"M01",diff:1,acc:1.3},
    {id:"S0401",diff:1,acc:1.3},
    {id:"M02",diff:1,acc:1.3},
    {id:"S0402",diff:1,acc:1},
    {id:"M04",diff:1,acc:1},
    {id:"S0403",diff:1,acc:1},
    {id:"M05",diff:1,acc:1},
    {id:"S0404",diff:1,acc:1},
    {id:"M03",diff:1,acc:1},
    ],
    },
stage7:{
    max_distance:25000,
    back_img:"scene/01.jpg",
    roll_speed:600,
    loop:false,
    drop_items:[
    {item_id:"Item00",percent:0.6},
    {item_id:"Item01",percent:13.5},
    {item_id:"Item02",percent:11.8},
    ],
    segments:[
    {id:"S0114",diff:1,acc:1},
    ],
    },
stage8:{
    max_distance:25000,
    back_img:"scene/01.jpg",
    roll_speed:600,
    loop:false,
    drop_items:[
    {item_id:"Item00",percent:0.6},
    {item_id:"Item01",percent:13.5},
    {item_id:"Item02",percent:11.8},
    ],
    segments:[
    {id:"S0801",diff:1,acc:1},
    ],
    },
stage9:{
    max_distance:20000,
    back_img:"scene/01.jpg",
    roll_speed:400,
    loop:false,
    drop_items:[
    {item_id:"Item02",percent:99},
    ],
    segments:[
    {id:"S0900",diff:1,acc:2},
    {id:"S0901",diff:1,acc:2},
    {id:"S0902",diff:1,acc:2},
    {id:"S0903",diff:1,acc:2},
    {id:"S0904",diff:1,acc:2},
    {id:"S0905",diff:1,acc:2},
    {id:"S0906",diff:1,acc:2},
    {id:"S0907",diff:1,acc:2},
    {id:"S0908",diff:1,acc:2},
    {id:"S0903",diff:1,acc:2},
    {id:"S0904",diff:1,acc:2},
    {id:"S0905",diff:1,acc:2},
    {id:"S0906",diff:1,acc:2},
    {id:"S0907",diff:1,acc:2},
    {id:"S0908",diff:1,acc:2},
       ],
},
stage10:{
    max_distance:10000,
    back_img:"scene/01.jpg",
    roll_speed:400,
    loop:false,
    drop_items:[
    {item_id:"Item00",percent:15.6},
    {item_id:"Item01",percent:13.5},
    {item_id:"Item02",percent:11.8},
    ],
    segments:[
    {id:"S1000",diff:1,acc:1},
    {id:"S1001",diff:1,acc:1},
    {id:"S1002",diff:1,acc:1},
    {id:"S1003",diff:1,acc:1},
    {id:"S1004",diff:1,acc:1},
    {id:"S1005",diff:1,acc:1},
    {id:"S1006",diff:1,acc:1},
    ],
    },
}
