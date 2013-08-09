//bullet
var Bullet = cc.Sprite.extend({
    life:0,
    att:0,
    bullet_speed:300,
    caster:null,
    initBullet:function (caster,target) 
    {
        if(caster.soldier_type != ESoldierType.EArcher)
        {
            cc.log("caster is not a Archer!");
            return;
        }
        
        this.init(caster.bullet);
        this.att = caster.att;
        this.caster = caster;
        var born_x = caster.launch_pos.x;
        var born_y = caster.launch_pos.y;
        var pos = caster.getPosition();
        if(this.direction == EDir.ToLeft)
        {pos.x -= born_x;}
        else
        {pos.x += born_x;}
        pos.y += born_y;
        this.setPosition(pos);
        var t_pos = target.getPosition();
        t_pos.y += born_y;
        this.life = getLength(t_pos,pos)/this.bullet_speed;
        var move_to = cc.MoveTo.create(this.life,t_pos);
        this.runAction(move_to);
        this.schedule(this.tickLife);
    },

    tickLife:function (dt) 
    {
        this.life -= dt;
        if(this.life<=0)
        {   
            var target = this.caster.getTarget();
            if(target != null)
            {
                target.injure(this.att);
            }
            this.getParent().removeChild(this,true);
        }
    },
});

