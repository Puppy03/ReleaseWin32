require("script/config/boss_config.js");
require("script/logic/Enemy.js");

var BossStat={
Born:0,
Normal:1
}

var Boss = Enemy.extend({
mn_type:EMNodeType.EBoss,
cur_stat:BossStat.Born,
config:null,
score_val:10,
cur_behavior_idx:0,
behavior_tick:0,

initBoss:function (boss_config) 
{
    this.config = boss_config;

    this.initEnemy(this.config);
},

updateStat:function (dt) 
{
    if(this.cur_stat == BossStat.Born)
    {
        this.tickBorn(dt);
        return;
    }
    this.tickMove(dt);
    this.tickHurt(dt);
    if(this.cur_stat == BossStat.Normal)
    {
        this.tickBehavior(dt);
    }
},

tickBehavior:function(dt)
{
    this.behavior_tick += dt;
    if(this.cur_behavior_idx == this.config.behavior.length)
    {
        if(this.behavior_tick>this.config.loop_time)
        {
            cc.log("behavior loop!!");
            this.behavior_tick = 0;
            this.cur_behavior_idx = 0;
        }
        else
        {
            return;
        }
    }

    for(var i=this.cur_behavior_idx; i<this.config.behavior.length; i++)
    {
        var behavior = this.config.behavior[i];
        if(this.behavior_tick>behavior.time)
        {
            cc.log("cur behavior idx:"+this.cur_behavior_idx);
            this.runBehavior(behavior);
            this.cur_behavior_idx = i+1;
        }
        else
        {
            return;
        }
    } 
},

runBehavior:function(behavior)
{
    if(behavior.type == EBehavior.ActMove)
    {
        var move = cc.MoveTo.create(behavior.dur,cc.p(behavior.x,behavior.y));
        this.runAction(move);
    }
    else if(behavior.type == EBehavior.DropMete)
    {
        var _config = meteoriteConfig[behavior.config];
        this.getParent().dropMeteorite(_config,behavior.follow_speed);
    }
    else if(behavior.type == EBehavior.Shoot)
    {
        var _config = bulletConfig[behavior.config];
        var pos = this.getPosition();
        pos.x += behavior.born_x;
        pos.y += behavior.born_y;
        var bullet = new Bullet;
        bullet.initBullet(_config);
        bullet.setPosition(pos);
        bullet.speed_x = behavior.speed_x;
        bullet.speed_y = behavior.speed_y;
        var parent = this.getParent();
        parent.addChild(bullet);
    }
    else if(behavior.type == EBehavior.Summon)
    {
        var _config = monsterConfig[behavior.config];
        var pos = this.getPosition();
        pos.x += behavior.born_x;
        pos.y += behavior.born_y;
        this.getParent().createEnemy(_config,pos);
    }
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
