

var UIStyle = cc.Class.extend({
   style_id:"",
   style_type:"",
});

ui_parser.parseStyles = function (attrs) 
{
};

ui_parser.parseStyle = function (attrs)
{
    var aStyle = new UIStyle;
    aStyle.style_type = attrs["Type"];
    aStyle.style_id = attrs["ID"];
    if(aStyle.style_type == "Static")
    {
       aStyle.img_file = attrs["ImgFile"];
    }
    else if(aStyle.style_type == "Icons")
    {
       aStyle.img_file = attrs["ImgFile"];
       aStyle.x_seg = attrs["XSeg"];
       aStyle.y_seg = attrs["YSeg"];
    }
    else if(aStyle.style_type == "Button")
    {
        aStyle.img_file = attrs["ImgFile"];
        if(attrs.hasOwnProperty("Normal"))
        {
            var _normal = attrs["Normal"].split(',');
            aStyle.rectNormal = new cc.rect(_normal[0],_normal[1],_normal[2],_normal[3]);
        }
        if(attrs.hasOwnProperty("Normal"))
        {
           var _pressed = attrs["Pressed"].split(',');
           aStyle.rectPressed = new cc.rect(_pressed[0],_pressed[1],_pressed[2],_pressed[3]);
        }
        if(attrs.hasOwnProperty("TScale"))
        {
           aStyle.scalePressed = attrs["TScale"].split(',');
        }
        if(attrs.hasOwnProperty("ImgPressed"))
        {;
           aStyle.imgPressed = attrs["ImgPressed"];
        }
    }
     
    this.styles[aStyle.style_id] = aStyle;
};