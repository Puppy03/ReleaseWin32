

ui_parser.parseImage = function (attrs)
{
    var _id = attrs["ID"];
    var _image = attrs["ImageFile"];
    if(attrs.hasOwnProperty("Inset"))
    {
        var _inset = getRectFromStr(attrs["Inset"]);
        var _size = getSizeFromStr(attrs["Size"]);
        var texture = cc.TextureCache.getInstance().addImage(_image);
        var size = texture.getContentSize();
        currentNode = cc.Scale9Sprite.create(_image,cc.rect(0,0,size.width,size.height),_inset);
        currentNode.setContentSize(_size);
    }
    else
    {
        currentNode = cc.Sprite.create(_image);
    }
    
    affinePostion(attrs,currentNode);
    affineFlip(attrs,currentNode);
    this.currentPage.addUINode(currentNode,_id,getZorder(attrs));
}