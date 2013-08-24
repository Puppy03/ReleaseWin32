require("script/config/enemy_config.js");
require("script/logic/Explosion.js");
require("script/logic/Coin.js");

var EnemyStat={
Born:0,
Normal:1,
Hurt:2,
}

var Enemy = cc.Node.extend({
mn_type:EMNodeType.EEnemy,
cur_stat:EnemyStat.Normal,
config:null,
speed:0,
hp:0,
img_normal:null,
img_hurt:null,
anim_img:null,
hurt_time:0,
die_delay:0,
die_effect:null,
score_val:10,
col_size:null,
born_effect:null,
born_tick:0,

initEnemy:function (enemy_config) 
{
    this.config = enemy_config;
    this.hp = enemy_config.hp;
    this.speed = enemy_config.speed;
    this.col_size = enemy_config.col_size;
    if(enemy_config.img_normal != "")
    {
        this.img_normal = cc.Sprite.create(enemy_config.img_normal);
        this.addChild(this.img_normal);
    }
    if(enemy_config.img_hurt != "")
    {
        this.img_hurt = cc.Sprite.create(enemy_config.img_hurt);
        this.addChild(this.img_hurt);
        this.img_hurt.setVisible(false);
    }

    var motion = enemy_config.actor;
    var img_array = genImgArray(motion);

    var firTexture = cc.TextureCache.getInstance().addImage(img_array[0]);
    this.anim_img = cc.Sprite.createWithTexture(firTexture);
    var animate = genAnimateArr(img_array,motion.interval);
    var repeat = cc.RepeatForever.create(animate);
    this.anim_img.runAction(repeat);
    this.addChild(this.anim_img,-1);

    if(enemy_config.hasOwnProperty("born"))
    {
        this.anim_img.setVisible(false);
        if(this.img_normal != null)
        {this.img_normal.setVisible(false);}
        this.cur_stat = EnemyStat.Born;

        var _motion = enemy_config.born;
        var _array = genImgArray(_motion);
        var _animate = genAnimateArr(_array,_motion.interval);
        this.born_tick = _animate.getAnimation().getDuration();
        this.born_effect = cc.Sprite.create(_array[0]);
        this.born_effect.runAction(_animate);
        this.addChild(born_effect);
    }
},

hited:function (damage) 
{
    this.hp -= damage;

    if(this.img_hurt!=null)
    {
        this.img_hurt.setVisible(true);
        this.img_normal.setVisible(false);
    }
    this.hurt_time = 0.2;
    this.cur_stat = EnemyStat.Hurt;
    
},

updateStat:function (dt) 
{
    if(this.cur_stat == EnemyStat.Born)
    {
        if(this.born_tick<=0)
        {
            this.cur_stat = EnemyStat.Normal;
            if(this.img_normal != null)
            {this.img_normal.setVisible(false);}
            this.anim_img.setVisible(true);
        }
        this.born_tick -= dt;
        return;
    }
    if(this.cur_stat == EnemyStat.Hurt)
    {
        if(this.hurt_time>0)
        {this.hurt_time -= dt;}
        else
        {
            this.cur_stat = EnemyStat.Normal;
            if(this.img_hurt!=null)
            {
                this.img_hurt.setVisible(false);
                this.img_normal.setVisible(true);
            }
        }
    }

    var pos_y = this.getPositionY();

    pos_y -= dt*this.speed;
    this.setPositionY(pos_y);

    var fighter = this.getParent().fighter;
    if(fighter != null)
    {
        var e_rect = rectForNode(this);
        var f_rect = fighter.getColRect();
        if(cc.rectIntersectsRect(e_rect,f_rect))
        {
            this.hp = 0;
            fighter.die(); 
            return;
        }
    }
},

die:function () 
{
    PlayerData.StageScore += this.score_val;
    ui_parser.currentScene.refreshStageScore();

    var explosion = new Explosion;
    explosion.initExplotion(deadEffect);
    var pos = this.getPosition()
    explosion.setPosition(pos);
    var parent = this.getParent();
    parent.addChild(explosion);

    audio_palyer.playEffect(deadSound);

    if(!parent.dropItem(pos))
    {
        parent.dropCoin(coinConfig.Coin00,pos);
    }  
},

updateDieDelay:function (dt) 
{
    this.die_delay -= dt;
    if(this.die_delay<0)
    {
        this.getParent().removeChild(this.die_effect,true);
        this.getParent().removeChild(this,true);
    }
},

getColRect:function () 
{
    var origin = this.getPosition();
    origin.x -= this.col_size.width*0.5;
    origin.y -= this.col_size.height*0.5;
    return new cc.rect(origin.x,origin.y,this.col_size.width,this.col_size.height);
},

});
