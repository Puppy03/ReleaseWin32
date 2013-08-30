

var win_size = cc.Director.getInstance().getWinSizeInPixels();

function affinePostion(attrs,node) 
{
    var relative = false;
    var pos = pos = attrs["Pos"].split(",");
    if(attrs.hasOwnProperty("AutoSpace"))
    {
        relative = true;
    }
   
    var flag_width = pos[0].substr(0,1);
    var flag_height = pos[1].substr(0,1);
    var x = 0;
    var y = 0;
     if(flag_width == "L")
     {
        x = -win_size.width*0.5 + pos[0].substring(1)*1;
     }
     else if(flag_width == "R")
     {
        x = win_size.width*0.5 - pos[0].substring(1)*1;
     }
     else
     {
        x = pos[0]*1;
     }

     if(flag_height == "B")
     {
        y = -win_size.height*0.5 + pos[1].substring(1)*(relative?win_size.height/design_size.height:1);
     }
     else if(flag_height == "T")
     {
        y = win_size.height*0.5 - pos[1].substring(1)*(relative?win_size.height/design_size.height:1);
     }
     else
     {
        y = pos[1]*(relative?win_size.height/design_size.height:1);
     }

    node.setPosition(x,y);
};

function affineFlip(attrs,node) 
{
    if(attrs.hasOwnProperty("FlipX"))
    {
         if(attrs["FlipX"]=="true")
         {
            node.setFlipX(true);
         }
    }
    if(attrs.hasOwnProperty("FlipY"))
    {
         if(attrs["FlipY"]=="true")
         {
            node.setFlipY(true);
         }
    }
};

function affineColor(attrs,node) 
{
    if(attrs.hasOwnProperty("Color"))
    {
        var _color = attrs["Color"].split(",");
        var _c3b = new cc.c3b(_color[0],_color[1],_color[2]);
        node.setColor(_c3b);
    }
};

function affineScale(attrs,node) 
{
    if(attrs.hasOwnProperty("Scale"))
    {
        var _scale = attrs["Scale"];
        node.setScale(_scale*1);
    }
};

function getZorder(attrs) 
{
    if(attrs.hasOwnProperty("ZOrder"))
    {
        return attrs["ZOrder"]*1;
    }
    return 0;
};
function getStyle(attrs)
{
    if(attrs.hasOwnProperty("Style"))
    {
        var style_id =  attrs["Style"];
        if(!ui_parser.styles.hasOwnProperty(style_id))
        {
            cc.log("Can not find style:"+style_id);
            return null;
        }
        return ui_parser.styles[style_id];
    }
    return null;
};

function getCallback(attrs,name) 
{
    var func_name = attrs[name];
    var func = ui_parser.currentPage._delegator[func_name];
    return func;
};

function strToPosition(_str) 
{
    var _pos_str = _str.split(",");
    return cc.p(_pos_str[0]*1,_pos_str[1]*1);
};

function getTouchLocation(touch)
{
    var pos = touch.getLocationInView();
    return cc.Director.getInstance().convertToGL(pos);
};

function getAttributeNum(_val)
{
    var _num = 0;
    for(var i in _val)
    {
        num++;
    }
    return _num;
};

function getSizeFromStr(str)
{
    var size_v = str.split(',');
    if(size_v.length!=2)
    {
        cc.log("wrong argument getSizeFromStr");
        return cc.size(0,0);
    }
    return cc.size(size_v[0]*1,size_v[1]*1);
};

function getRectFromStr(str)
{
    var r_v = str.split(',');
    if(r_v.length!=4)
    {
        cc.log("wrong argument getRectFromStr");
        return cc.rect(0,0,0,0);
    }
    return cc.rect(r_v[0]*1,r_v[1]*1,r_v[2]*1,r_v[3]*1);
};

var ETextAlign={
Left:0,
Center:1,
Right:2,
};

function getAligment(attrs)
{
    if(attrs.hasOwnProperty("Alignment"))
    {
        var str = attrs["Alignment"];
        if(str == "Left")
        {
            return ETextAlign.Left;
        }
        else if(str == "Center")
        {
            return ETextAlign.Center;
        }
        else if(str == "Right")
        {
            return ETextAlign.Right;
        }
    }
    return ETextAlign.Center;
};

function drawBound(node)
{
    var size = node.getContentSize();
    var d_bound = cc.DrawNode.create();
    var green = cc.c4f(0,1,0,1); 
    d_bound.drawSegment(cc.p(-size.width*0.5,size.height*0.5),cc.p(size.width*0.5,size.height*0.5),1,green);
    d_bound.drawSegment(cc.p(size.width*0.5,size.height*0.5),cc.p(size.width*0.5,-size.height*0.5),1,green);
    d_bound.drawSegment(cc.p(-size.width*0.5,-size.height*0.5),cc.p(size.width*0.5,-size.height*0.5),1,green);
    d_bound.drawSegment(cc.p(-size.width*0.5,size.height*0.5),cc.p(-size.width*0.5,-size.height*0.5),1,green);
    node.addChild(d_bound);
};