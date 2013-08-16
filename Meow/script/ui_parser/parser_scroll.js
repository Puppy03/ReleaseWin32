

var UIScroll = cc.Layer.extend({
    _enabled:true,
    draw_bound:true,
    scroll_nodes:null,
    vertical:false,
    interval:0,
    cliping_node:null,
    stencil:null,
    pre_touchpos:null,
    initScroll:function (size,vertical,interval) 
    {
       this.setContentSize(size);
       this.vertical = vertical;
       this.interval = interval*1.0;

       this.stencil = cc.DrawNode.create();
       var rectangle = [];  
       rectangle[0] = cc.p(-size.width*0.5,size.height*0.5)  
       rectangle[1] = cc.p(size.width*0.5,size.height*0.5)  
       rectangle[2] = cc.p(size.width*0.5,-size.height*0.5)  
       rectangle[3] = cc.p(-size.width*0.5,-size.height*0.5)
       var white = cc.c4f(1,1,1,1);  
       this.stencil.drawPoly(rectangle, white,1, white);  
       this.cliping_node = ClipingNode.create(this.stencil);
       this.addChild(this.cliping_node);

       if(this.draw_bound)
       {
            var d_bound = cc.DrawNode.create();
            var green = cc.c4f(0,1,0,1); 
            d_bound.drawSegment(cc.p(-size.width*0.5,size.height*0.5),cc.p(size.width*0.5,size.height*0.5),1,green);
            d_bound.drawSegment(cc.p(size.width*0.5,size.height*0.5),cc.p(size.width*0.5,-size.height*0.5),1,green);
            d_bound.drawSegment(cc.p(-size.width*0.5,-size.height*0.5),cc.p(size.width*0.5,-size.height*0.5),1,green);
            d_bound.drawSegment(cc.p(-size.width*0.5,size.height*0.5),cc.p(-size.width*0.5,-size.height*0.5),1,green);
            this.addChild(d_bound);
       }

       this.setTouchMode(1);
       this.setTouchEnabled(true);
    },
    addItemNode:function(node)
    {
        if(this.scroll_nodes == null)
        {
            this.scroll_nodes = [];
        }
        var size = node.getContentSize();
        var pos = this.nextItemPos(size);
        node.setPosition(pos);
        this.cliping_node.addChild(node);
        this.scroll_nodes.push(node);
    },
    nextItemPos:function(node_size)
    {      
        if(this.scroll_nodes.length == 0)
        {
            var pos = cc.p(0,0);
            if(this.vertical)
            {
                pos.y = this.getContentSize().height*0.5 - this.interval - node_size.height*0.5;
            }
            else
            {
                pos.x = -this.getContentSize().width*0.5 + this.interval + node_size.width*0.5;
            }
            return pos;
        }
        else
        {
            var last_node = this.scroll_nodes[this.scroll_nodes.length-1];
            var size = last_node.getContentSize();
            var pos = last_node.getPosition();
            if(this.vertical)
            {
                cc.log(this.interval);
                pos.y -= node_size.height*0.5 + size.height*0.5 + this.interval;
            }
            else
            {
                pos.x += size.width*0.5+node_size.width*0.5+this.interval;
            }
            return pos;
        }
    },

    onTouchBegan:function(touch, event)
    {
        if(!this._enabled)
            return false;
        this.pre_touchpos = getTouchLocation(touch);
        return true;
    },
    onTouchMoved:function (touch, event) 
    {
        var pos = getTouchLocation(touch);
        var move = cc.p(pos.x-this.pre_touchpos.x,pos.y-this.pre_touchpos.y);
        this.pre_touchpos = pos;
        if(this.scroll_nodes == null)
        {return;}
        for(var i in this.scroll_nodes)
        {
            var node = this.scroll_nodes[i];
            var pos = node.getPosition();
            if(this.vertical)
            {pos.y += move.y;}
            else
            {pos.x += move.x;}
            node.setPosition(pos);
        }
    },

});

ui_parser.parseScroll = function (attrs)
{
    var _id = attrs["ID"];
    var size = getSizeFromStr(attrs["Size"]);
    var vertical = attrs["Vertical"];
    var interval = attrs["Interval"];
    currentNode = new UIScroll;
    currentNode.initScroll(size,vertical=="true",interval);
    affinePostion(attrs,currentNode);
    this.currentPage.addUINode(currentNode,_id,getZorder(attrs));
};

