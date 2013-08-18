require("script/config/enemy_config.js");
require("script/logic/Explosion.js");
require("script/logic/Coin.js");

var Enemy = cc.Sprite.extend({
mn_type:EMNodeType.EEnemy,
config:null,
id:0,
speed:0,
hp:0,
texture_normal:null,
texture_hurt:null,
wing:null,
hurt_flag:false,
hurt_time:0,
die_delay:0,
die_effect:null,
score_val:10,
col_size:null,

initEnemy:function (enemy_config) 
{
    this.config = enemy_config;
    this.hp = enemy_config.hp;
    this.speed = enemy_config.speed;
    this.col_size = enemy_config.col_size;
    this.texture_normal = cc.TextureCache.getInstance().addImage(enemy_config.img_normal);
    this.texture_hurt = cc.TextureCache.getInstance().addImage(enemy_config.img_hurt);
    var size = this.texture_normal.getContentSize();
    this.initWithTexture(this.texture_normal,cc.rect(0,0,size.width,size.height));

    var motion = enemy_config.Fly;
    var img_array = genImgArray(motion);

    var firTexture = cc.TextureCache.getInstance().addImage(img_array[0]);
    this.wing = cc.Sprite.createWithTexture(firTexture);
    var animate = genAnimateArr(img_array,motion.interval);
    var repeat = cc.RepeatForever.create(animate);
    this.wing.runAction(repeat);
    this.wing.setPosition(cc.p(size.width*0.5,size.height*0.5));
    this.addChild(this.wing,-1);
},

hited:function (damage) 
{
    this.hp -= damage;

    this.setTexture(this.texture_hurt);
    this.hurt_time = 0.2;
    this.hurt_flag = true;
    
},

updateStat:function (dt) 
{
    if(this.hurt_flag == true)
    {
        if(this.hurt_time>0)
        {this.hurt_time -= dt;}
        else
        {
            this.hurt_flag = false;
            this.setTexture(this.texture_normal);
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

    cc.AudioEngine.getInstance().playEffect(deadSound);

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
