
var ELblType={
ELblTTF:0,
EBmFont:1,
};

var UILabel = cc.Node.extend({
label:null,
type:ELblType.ELblTTF,
align:ETextAlign.Center,
draw_bound:false,
initLabelTTF:function(str,font,dimension,alignment,font_size)
{
    this.type = ELblType.ELblTTF;
    this.align = alignment;
    this.setContentSize(dimension);
    this.label = cc.LabelTTF.create(str,font,font_size,dimension,alignment);
    this.addChild(this.label);
    if(this.draw_bound)
    {
        drawBound(this);
    }
},
initLabelBmpFont:function(str,font,dimension,alignment,scale)
{
    this.type = ELblType.EBmFont;
    this.align = alignment;
    this.setContentSize(dimension);
    this.label = cc.LabelBMFont.create(str,font,dimension.width);
    this.label.setScale(scale);
    this.addChild(this.label);
    this.resetLblPos();
    if(this.draw_bound)
    {
        drawBound(this);
    }
},
setText:function (str)
{
    if(this.type == ELblType.ELblTTF)
    {
        this.label.setString(str);
    }
    else
    {
        this.label.setCString(str);
        this.resetLblPos();
    }
},

resetLblPos:function()
{
    if(this.align == ETextAlign.Center)
    {return;}
    var s_size = this.getContentSize();
    var l_size = this.label.getContentSize();
    var l_scale = this.label.getScale();
    if(this.align == ETextAlign.Left)
    {
        this.label.setPositionX(-s_size.width*0.5*l_scale+l_size.width*0.5);
    }
    else if(this.align == ETextAlign.Right)
    {
        this.label.setPositionX(s_size.width*0.5*l_scale-l_size.width*0.5);
    }
},
});

ui_parser.parseLabel = function (attrs)
{
    var _id = attrs["ID"];
    cc.log("lbl id:"+_id);
    var _text = attrs["Content"];
    var _dimension = getSizeFromStr(attrs["Dimension"]);
    var _align = getAligment(attrs);
    currentNode = new UILabel;
    if(attrs.hasOwnProperty("BmpFont"))
    {
        var _font = attrs["BmpFont"];
        var _scale = 1;
        if(attrs.hasOwnProperty("Scale"))
        {
            _scale = attrs["Scale"]*1;
        }
        currentNode.initLabelBmpFont(_text,_font,_dimension,_align,_scale);
    }
    else
    {
        var _font = attrs["Font"];
        var _font_size = attrs["FontSize"];
        currentNode.initLabelTTF(_text,_font,_dimension,_align,_font_size);  
    }
    affineColor(attrs,currentNode);
    affinePostion(attrs,currentNode);
    this.currentPage.addUINode(currentNode,_id,getZorder(attrs));
}