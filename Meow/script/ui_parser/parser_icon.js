

var UIIcon = cc.Layer.extend({

    _style:null,
    _touch:null,
    _icon_idx:-1,
    _icon_img:null,
    _x_seg:1,
    _y_seg:1,
    _seg_width:1,
    _seg_height:1,
    _enabled:false,

    getIconRect:function (icon_idx)
    {
        var XSeg = icon_idx%this._x_seg;
        var YSeg = parseInt(icon_idx/this._x_seg);
        return  new cc.rect(XSeg*this._seg_width,YSeg*this._seg_height,this._seg_width,this._seg_height);
    },

    initIcon:function (style,icon_idx,touch_func) 
    {
       this._style = style;
       this._touch = touch_func;
       this._icon_idx = icon_idx;
       this._x_seg = style.x_seg;
       this._y_seg = style.y_seg;

       var _texture = cc.TextureCache.getInstance().addImage(style.img_file);
       var img_size = _texture.getContentSize();
       this._seg_width = img_size.width/this._x_seg;
       this._seg_height = img_size.height/this._y_seg;

       if(icon_idx>=0)
       {
          this._icon_img = cc.Sprite.createWithTexture(_texture,this.getIconRect(icon_idx));
       }
       else
       {
          this._icon_img = cc.Sprite.createWithTexture(_texture,this.getIconRect(0));
          this._icon_img.setVisible(false);
       }

       this.setContentSize(this._icon_img.getContentSize());
       this.addChild(this._icon_img);
      

       if(this._touch != null)
       {
           this._enabled = true;
           this.setTouchMode(1);
           this.setTouchEnabled(true);
       }
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
            this.setScale(_style.scalePressed*1.0);
        }
        return true;
    },
    onTouchEnded:function (touch, event) 
    {
        this.setScale(1.0);
        var touch_pos = getTouchLocation(touch);
        var _rect = rectForNode(this,true);
        if(!cc.rectContainsPoint(_rect,touch_pos))
        {
            return;
        }
        if(this._touch != null)
        {
            this._touch(this);
        }
    },

});

ui_parser.parseIcon = function (attrs)
{
    var _id = attrs["ID"];
    var _icon_idx = attrs["IconIdx"]
    currentNode = new UIIcon;
    currentNode.initIcon(getStyle(attrs),_icon_idx,getCallback(attrs,"Touch"));
    affinePostion(attrs,currentNode);
    affineFlip(attrs,currentNode._icon_img);
    this.currentPage.addUINode(currentNode,_id,getZorder(attrs));
};