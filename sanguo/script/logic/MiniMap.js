

var MiniMap = cc.Layer.extend({
    map_nodes:null,
    battle_ground:null,
    draw_bound:null,
    draw_marquee:null,
    army_left:null,
    army_right:null,
    dots_left:null,
    dots_right:null,
    map_size:null,
    touched:false,
    initMiniMap:function (_army_left,_army_right,size,map_size)
    {
        this.army_left = _army_left;
        this.army_right = _army_right;
        this.map_size = map_size;
        this.setContentSize(size);
        this.draw_bound = cc.DrawNode.create();
        var color_bound = cc.c4f(0.17254,0.15686,0.15294,1);
        this.draw_bound.drawSegment(cc.p(-size.width*0.5,size.height*0.5),cc.p(size.width*0.5,size.height*0.5),1,color_bound);
        this.draw_bound.drawSegment(cc.p(size.width*0.5,size.height*0.5),cc.p(size.width*0.5,-size.height*0.5),1,color_bound);
        this.draw_bound.drawSegment(cc.p(size.width*0.5,-size.height*0.5),cc.p(-size.width*0.5,-size.height*0.5),1,color_bound);
        this.draw_bound.drawSegment(cc.p(-size.width*0.5,-size.height*0.5),cc.p(-size.width*0.5,size.height*0.5),1,color_bound);
        this.addChild(this.draw_bound);

        var texture = cc.TextureCache.getInstance().addImage("ui/mini_map_dots.png");
        this.map_nodes = cc.SpriteBatchNode.createWithTexture(texture,100);
        this.addChild(this.map_nodes);
        this.dots_left = [];
        this.dots_right = [];
        for(var i in this.army_left)
        {
            var actor = this.army_left[i];
            if(actor == null){continue;}
            var dot = cc.Sprite.createWithTexture(texture,this.getNodeRect(actor));
            this.map_nodes.addChild(dot);
            dot.setPosition(this.getNodePosition(actor));
            this.dots_left.push(dot);
        }
        for(var i in this.army_right)
        {
            var actor = this.army_right[i];
            if(actor == null){continue;}
            var dot = cc.Sprite.createWithTexture(texture,this.getNodeRect(actor));
            this.map_nodes.addChild(dot);
            dot.setPosition(this.getNodePosition(actor));
            this.dots_right.push(dot);
        }

        this.draw_marquee = cc.DrawNode.create();
        this.addChild(this.draw_marquee);
        var color_marquee = cc.c4f(0.4,0.4,0.211,1);
        this.draw_marquee.drawSegment(cc.p(-25,size.height*0.5-2),cc.p(25,size.height*0.5-2),1,color_marquee);
        this.draw_marquee.drawSegment(cc.p(25,size.height*0.5-2),cc.p(25,-size.height*0.5+2),1,color_marquee);
        this.draw_marquee.drawSegment(cc.p(25,-size.height*0.5+2),cc.p(-25,-size.height*0.5+2),1,color_marquee);
        this.draw_marquee.drawSegment(cc.p(-25,-size.height*0.5+2),cc.p(-25,size.height*0.5-2),1,color_marquee);
        this.draw_marquee.setContentSize(cc.size(50,size.height*0.5-2));

        this.setTouchMode(1);
        this.setTouchEnabled(true);

        this.schedule(this.refreshStats);
    },
    getNodePosition:function (actor) 
    {
        var size = this.getContentSize();
        var pos = actor.getPosition();
        //pos.x /= actor.pspt_val;
        pos.x = pos.x/(this.map_size.width*0.5);
        pos.y = pos.y/(this.map_size.height*0.5);
        pos.x *= size.width*0.5;
        pos.y *= size.height*0.5;
        return pos;
    },
    getNodeRect:function (actor) 
    {
        if(actor.type == EActorType.ESoldier)
        {
            if(actor.camp == ECamp.Left)
            {
                return cc.rect(14,0,8,8);
            }
            else
            {
                return cc.rect(0,0,8,8);
            }
        }
        else
        {
            if(actor.camp == ECamp.Left)
            {
                return cc.rect(11,11,11,11);
            }
            else
            {
                return cc.rect(0,11,11,11);
            }
        }
    },

    refreshStats:function (dt)
    {
        var size = this.getContentSize();
        for(var i in this.army_left)
        {
            if(this.army_left[i]==null)
            {
                if(this.dots_left[i] != null)
                {
                    this.map_nodes.removeChild(this.dots_left[i],true);
                    this.dots_left[i] = null;
                }
                continue;
            }
            else
            {
                var pos = this.getNodePosition(this.army_left[i]);
                this.dots_left[i].setPosition(pos);
            }
        }
        for(var i in this.army_right)
        {
            if(this.army_right[i]==null)
            {
                if(this.dots_right[i] != null)
                {
                    this.map_nodes.removeChild(this.dots_right[i],true);
                    this.dots_right[i] = null;
                }
                continue;
            }
            else
            {
                var pos = this.getNodePosition(this.army_right[i]);
                this.dots_right[i].setPosition(pos);
            }
        }

        if(!this.touched)
        {
            var pos = this.getParent().getParent().btGround.getPosition();
            var map_x = (win_size.width*0.5-pos.x)*(size.width*0.5)/(this.map_size.width*0.5);
            this.draw_marquee.setPositionX(map_x);
        }
    },

     onTouchBegan:function(touch, event)
    {
        var touch_pos = getTouchLocation(touch);
        var _rect = rectForNode(this,true);
        if(!cc.rectContainsPoint(_rect,touch_pos))
        {
            return false;
        }
        var pos = this.convertToNodeSpace(touch_pos);
        var now_x = this.draw_marquee.getPositionX();
        this.draw_marquee.setPositionX(pos.x);
        var size = this.getContentSize();
        var move_x = (pos.x-now_x)*this.map_size.width/size.width;
        this.getParent().getParent().btGround.moveScene(-move_x,0);
        this.touched = true;
        return true;
    },

     onTouchMoved:function (touch,event) 
    {
        var touch_pos = getTouchLocation(touch);
        var _rect = rectForNode(this.draw_marquee,true);
        if(cc.rectContainsPoint(_rect,touch_pos))
        {
            var pos = this.convertToNodeSpace(touch_pos);
            var now_x = this.draw_marquee.getPositionX();
            this.draw_marquee.setPositionX(pos.x);
            var size = this.getContentSize();
            var move_x = (pos.x-now_x)*this.map_size.width/size.width;
            this.getParent().getParent().btGround.moveScene(-move_x,0);
        }
    },
     onTouchEnded:function (touch, event) 
    {
        this.touched = false;
    }

});