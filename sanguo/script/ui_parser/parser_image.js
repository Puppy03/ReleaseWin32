

ui_parser.parseImage = function (attrs)
{
    var _id = attrs["ID"];
    var _image = attrs["ImageFile"];
    currentNode = cc.Sprite.create(_image);
    affinePostion(attrs,currentNode);
    affineFlip(attrs,currentNode);
    this.currentPage.addUINode(currentNode,_id,getZorder(attrs));
}