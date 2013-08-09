

ui_parser.parseProgress = function (attrs)
{
    var _id = attrs["ID"];
    var _img_file = attrs["ImageFile"];
    var _bar_img = cc.Sprite.create(_img_file);
    currentNode = cc.ProgressTimer.create(_bar_img);
    
    if(attrs.hasOwnProperty("Radial"))
    {
        if(attrs["Radial"])
        {
            currentNode.setType(0);
        }
        else
        {
            currentNode.setType(1);
        }
    }
    else
    {
        currentNode.setType(1);
    }

    if(attrs.hasOwnProperty("FlipX"))
    {
        currentNode.setMidpoint(cc.p(1,0.5));
    }
    else
    {
        currentNode.setMidpoint(cc.p(0,0.5));
    }
    currentNode.setBarChangeRate(cc.p(1,0));

    if(attrs.hasOwnProperty("Percent"))
    {
        currentNode.setPercentage(attrs["Percent"]);
    }
    affinePostion(attrs,currentNode);
    this.currentPage.addUINode(currentNode,_id,getZorder(attrs));
};