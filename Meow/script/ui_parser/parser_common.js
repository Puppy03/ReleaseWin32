

var win_size = cc.Director.getInstance().getWinSizeInPixels();

function getUIPosVal(_val) 
{
    var flag = _val.substr(0,1);

    switch(flag)
    {
     case "L":
     {
        return -win_size.width*0.5 + _val.substring(1)*1.0;
        break;
     }
     case "R":
     {
        return win_size.width*0.5 - _val.substring(1)*1.0;
        break;
     }
     case "T":
     {
        return win_size.height*0.5 - _val.substring(1)*1.0;
        break;
     }
     case "B":
     {
        return -win_size.height*0.5 + _val.substring(1)*1.0;
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
         if(attrs["FlipX"])
         {
            node.setFlipX(true);
         }
    }
    if(attrs.hasOwnProperty("FlipY"))
    {
         if(attrs["FlipY"])
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
        node.setScale(_scale);
    }
} 

function getZorder(attrs) 
{
    if(attrs.hasOwnProperty("ZOrder"))
    {
        return attrs["ZOrder"];
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
    return cc.p(_pos_str[0],_pos_str[1]);
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