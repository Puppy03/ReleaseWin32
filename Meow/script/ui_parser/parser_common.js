

var win_size = cc.Director.getInstance().getWinSizeInPixels();
var ui_size = cc.size(win_size.width,win_size.height);
var ui_scale = 1;
if(win_size.width!=design_size.width )
{
    var asp = win_size.height/win_size.width;
    var scale_x = win_size.width/design_size.width;
    var scale_y = win_size.height/design_size.height;
    if(scale_x>scale_y)
    {
        ui_scale = scale_y;
        ui_size.height = design_size.height;
        ui_size.width = design_size.height/asp;
    }
    else
    {
        ui_scale = scale_x;
        ui_size.width = design_size.width;
        ui_size.height = design_size.width*asp;
    };
    cc.log("ui_size:"+ui_size.width+","+ui_size.height);
    cc.log("ui_scale:"+ui_scale);
}

function getUIPosVal(_val) 
{
    var flag = _val.substr(0,1);

    switch(flag)
    {
     case "L":
     {
        return -ui_size.width*0.5 + _val.substring(1)*1;
        break;
     }
     case "R":
     {
        return ui_size.width*0.5 - _val.substring(1)*1;
        break;
     }
     case "T":
     {
        return ui_size.height*0.5 - _val.substring(1)*1;
        break;
     }
     case "B":
     {
        return -ui_size.height*0.5 + _val.substring(1)*1;
        break;
     }
     default:
     {
        return _val;
        break;
     }
    }
}

function affinePostion(attrs,node) 
{
    var pos = attrs["Pos"].split(",");
    var x = getUIPosVal(pos[0]);
    var y = getUIPosVal(pos[1]);
    node.setPosition(x,y);
}

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
}

function affineColor(attrs,node) 
{
    if(attrs.hasOwnProperty("Color"))
    {
        var _color = attrs["Color"].split(",");
        var _c3b = new cc.c3b(_color[0],_color[1],_color[2]);
        node.setColor(_c3b);
    }
}  

function affineScale(attrs,node) 
{
    if(attrs.hasOwnProperty("Scale"))
    {
        var _scale = attrs["Scale"];
        node.setScale(_scale*1);
    }
} 

function getZorder(attrs) 
{
    if(attrs.hasOwnProperty("ZOrder"))
    {
        return attrs["ZOrder"]*1;
    }
    return 0;
}
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
}

function getCallback(attrs,name) 
{
    var func_name = attrs[name];
    var func = ui_parser.currentPage._delegator[func_name];
    return func;
}

function strToPosition(_str) 
{
    var _pos_str = _str.split(",");
    return cc.p(_pos_str[0]*1,_pos_str[1]*1);
}

function getTouchLocation(touch)
{
    var pos = touch.getLocationInView();
    return cc.Director.getInstance().convertToGL(pos);
}

function getAttributeNum(_val)
{
    var _num = 0;
    for(var i in _val)
    {
        num++;
    }
    return _num;
}

function getSizeFromStr(str)
{
    var size_v = str.split(',');
    if(size_v.length!=2)
    {
        cc.log("wrong argument getSizeFromStr");
        return cc.size(0,0);
    }
    return cc.size(size_v[0]*1,size_v[1]*1);
}

function getRectFromStr(str)
{
    var r_v = str.split(',');
    if(r_v.length!=4)
    {
        cc.log("wrong argument getRectFromStr");
        return cc.rect(0,0,0,0);
    }
    return cc.rect(r_v[0]*1,r_v[1]*1,r_v[2]*1,r_v[3]*1);
}

function affineAligment(attrs,node)
{
    if(attrs.hasOwnProperty("Alignment"))
    {
        var str = attrs["Alignment"];
        if(str == "Left")
        {
            node.setAnchorPoint(cc.p(0,0.5));
        }
        else if(str == "Right")
        {
            node.setAnchorPoint(cc.p(1,0.5));
        }
    }
}