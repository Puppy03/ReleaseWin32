

ui_parser.parseLabel = function (attrs)
{
    var _id = attrs["ID"];
    var _text = attrs["Content"];
    
    if(attrs.hasOwnProperty("BmpFont"))
    {
        var _font = attrs["BmpFont"];
        currentNode = cc.LabelBMFont.create(_text,_font,2);
        affineScale(attrs,currentNode);
    }
    else
    {
        var _font = attrs["Font"];
        var _font_size = attrs["FontSize"];
        currentNode = cc.LabelTTF.create(_text,_font,_font_size);  
    }
    affineAligment(attrs,currentNode);
    affineColor(attrs,currentNode);
    affinePostion(attrs,currentNode);
    this.currentPage.addUINode(currentNode,_id,getZorder(attrs));
}