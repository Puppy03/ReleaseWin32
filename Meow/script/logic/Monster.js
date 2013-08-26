require("script/config/monster_config.js");
require("script/logic/Enemy.js");

var MonsterStat={
Born:0,
Normal:1,
}

var Monster = Enemy.extend({
mn_type:EMNodeType.EMonster,
cur_stat:MonsterStat.Normal,
config:null,
score_val:10,

initMonster:function (enemy_config) 
{
    this.config = enemy_config;
    this.initEnemy(this.config);
},


updateStat:function (dt) 
{
    if(this.cur_stat == MonsterStat.Born)
    {
        this.tickBorn(dt);
        return;
    }
    this.tickHurt(dt);
    this.tickMove(dt);
},

die:function () 
{
    PlayerData.StageScore += this.score_val;
    ui_parser.currentScene.refreshStageScore();

    this.runDeadEffect();

    var parent = this.getParent();
    var pos = this.getPosition();
    if(!parent.dropItem(pos))
    {
        parent.dropCoin(coinConfig.Coin00,pos);
    }  
},
});
