

var UIButton = cc.Layer.extend({

    _style:null,
    _touch:null,
    _bkgImg:null,
    _enabled:true,
    initButton:function (style,touch_func) 
    {
       this._style = style;
       this._touch = touch_func;
       if(style.hasOwnProperty("rectNormal"))
       {
           this._bkgImg = cc.Sprite.create(style.img_file,style.rectNormal);
       }
       else
       {
           this._bkgImg = cc.Sprite.create(style.img_file);
       }
       this.setContentSize(this._bkgImg.getContentSize());
       this.setAnchorPoint(cc.p(0.5,0.5));
       this.addChild(this._bkgImg);

       this.setTouchMode(1);
       this.setTouchEnabled(true);
    },
    onTouchBegan:function(touch, event)
    {
        if(!this._enabled)
            return false;
        var touch_pos = getTouchLocation(touch);
        var _rect = rectForNode(this,true);
        if(!cc.rectContainsPoint(_rect,touch_pos))
        {
            return false;
        }
        if(this._style.hasOwnProperty("scalePressed"))
        {
            this.setScale(this._style.scalePressed*1.0);
        }
        if(this._style.hasOwnProperty("rectPressed"))
        {
            this._bkgImg.setTextureRect(this._style.rectPressed);
        }
        else if(this._style.hasOwnProperty("imgPressed"))
        {
            var _texture = cc.TextureCache.getInstance().addImage(this._style.imgPressed);
            this._bkgImg.setTexture(_texture);
        }
        return true;
    },
    onTouchEnded:function (touch, event) 
    {
        this.setScale(1.0);
        if(this._style.hasOwnProperty("rectNormal"))
        {
            this._bkgImg.setTextureRect(this._style.rectNormal);
        }

        var touch_pos = getTouchLocation(touch);
        var _rect = rectForNode(this,true);
        if(!cc.rectContainsPoint(_rect,touch_pos))
        {
            return;
        }
        this._touch(this);
    },

});

ui_parser.parseButton = function (attrs)
{
    var _id = attrs["ID"];
    currentNode = new UIButton;
    currentNode.initButton(getStyle(attrs),getCallback(attrs,"Touch"));
    affinePostion(attrs,currentNode);
    this.currentPage.addUINode(currentNode,_id,getZorder(attrs));
};

ui_parser.parseText = function(attrs)
{
    var _content = attrs["Content"];
    var _Font_Size = attrs["FontSize"];
    var _Offset = strToPosition(attrs["Offset"]);
    var _label = null;

    if(attrs.hasOwnProperty("BmpFont"))
    {
        var _font = attrs["BmpFont"];
        _label = cc.LabelBMFont.create(_content,_font,_Font_Size);
        affineScale(attrs,_label);
    }
    else
    {
        var _font = attrs["Font"];
        _label = cc.LabelTTF.create(_content,_font,_Font_Size);
    }
    affineColor(attrs,_label);
    _label.setPosition(_Offset);
    currentNode.addChild(_label);
}