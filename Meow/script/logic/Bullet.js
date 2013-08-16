//bullet
var Bullet = cc.Sprite.extend({
    att:0,
    speed:0,
    col_size:null,
    explosion:null,
    initBullet:function (config) 
    {
        this.init(config.image);
        this.col_size = config.col_size;
        this.speed = config.speed;
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

        var col_rect = this.getColRect();
        var map_nodes = this.getParent().map_nodes;
        for(var i in map_nodes)
        {
            var node = map_nodes[i];
            if(node.mn_type != EMNodeType.EEnemy)
            {
                continue;
            }
            var pos_y = node.getPositionY();
            if(pos_y>win_size.height)
            {
                continue;
            }
            var e_rect = node.getColRect();;
            if(cc.rectIntersectsRect(e_rect,col_rect))
            {
                  node.hited(this.att);
                //if(this.explosion != null)
                //{
                    this.doExplosion();
                // }
                return;
            }
        }
        
        this.setPositionY(pos.y+this.speed*dt);
    },

    doExplosion:function () 
    {
        this.getParent().removeChild(this,true);
    },
    getColRect:function () 
    {
        var origin = this.getPosition();
        origin.x -= this.col_size.width*0.5;
        origin.y -= this.col_size.height*0.5;
        return new cc.rect(origin.x,origin.y,this.col_size.width,this.col_size.height);
    },

});

