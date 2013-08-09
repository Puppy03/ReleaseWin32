//bullet
var Bullet = cc.Sprite.extend({
    att:0,
    speed:0,
    caster:null,
    col_size:null,
    explosion:null,
    initBullet:function (config,caster) 
    {
        this.init(config.image,config.rect_img);
        //this.setAnchorPoint(config.anchor);
        this.col_size = config.col_size;
        this.speed = config.speed;
        this.caster = caster;
        this.att = config.att;
        if(config.hasOwnProperty("explosion"))
        {
            this.explosion = config.explosion;
        }
        this.schedule(this.tickStat);
    },

    tickStat:function (dt) 
    {
        var pos = this.getPosition();
        if(pos.y > (win_size.height+100))
        {
            this.getParent().removeChild(this,true);
            return;
        }
        var ori_x = pos.x-this.col_size.width*0.5;
        var ori_y = pos.y-this.col_size.height*0.5;
        var col_rect = cc.rect(ori_x,ori_y,this.col_size.width,this.col_size.height);
        var enemies = this.getParent().enemies;
        for(var i in enemies)
        {
            var pos_y = enemies[i].getPositionY();
            if(pos_y>win_size.height)
            {
                continue;
            }
            var e_rect = rectForNode(enemies[i]);
            if(cc.rectIntersectsRect(e_rect,col_rect))
            {
                this.hitEnemy(enemies[i]);
                return;
            }
        }
        
        this.setPositionY(pos.y+this.speed*dt);
    },

    hitEnemy:function (enemy) 
    {
        enemy.hited(this.att);
        //if(this.explosion != null)
        //{
            this.doExplosion();
       // }
    },

    doExplosion:function () 
    {
        this.getParent().removeChild(this,true);
    }

});

