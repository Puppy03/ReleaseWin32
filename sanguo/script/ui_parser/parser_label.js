

ui_parser.parseLabel = function (attrs)
{
    var _id = attrs["ID"];
    var _text = attrs["Content"];
    var _font_size = attrs["FontSize"];
    if(attrs.hasOwnProperty("BmpFont"))
    {
        var _font = attrs["BmpFont"];
        currentNode = cc.LabelBMFont.create(_text,_font,_font_size);
        affineScale(attrs,currentNode);
    }
    else
    {
        var _font = attrs["Font"];
        currentNode = cc.LabelTTF.create(_text,_font,_font_size);
    }
    
    affineColor(attrs,currentNode);
    affinePostion(attrs,currentNode);
    this.currentPage.addUINode(currentNode,_id,getZorder(attrs));
}