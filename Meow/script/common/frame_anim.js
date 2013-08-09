
function genAnimate(config) 
{
    var animation = cc.Animation.create();
    animation.setDelayPerUnit(config.interval);
    var texture = cc.TextureCache.getInstance().addImage(config.imgfile);
    var img_size = texture.getContentSize();
    var frame_width = img_size.width/config.x_seg;
    var frame_height = img_size.height/config.y_seg;
    for(var i=config.start;i<=config.end;i++)
    {
        var seg_x = i%config.x_seg;
        var seg_y = parseInt(i/config.x_seg);
        var _rect = new cc.rect(seg_x*frame_width,seg_y*frame_height,frame_width,frame_height);
        animation.addSpriteFrameWithTexture(texture,_rect);
    }
    var animate = cc.Animate.create(animation);
    return animate;
};

function genImgArray(motion) 
{
    var img_array = [];
    for(var i=motion.start; i<=motion.end; ++i)
    {
        var idx = i+10000;
        img_array.push(motion.prefix+idx+".png");
    }
    //cc.dump(motion);
    return img_array;
};

function genAnimateArr(img_array,interval) 
{
    var animation = cc.Animation.create();
    animation.setDelayPerUnit(interval);
    for(var i in img_array)
    {
        var texture = cc.TextureCache.getInstance().addImage(img_array[i]);
        var img_size = texture.getContentSize();
        animation.addSpriteFrameWithTexture(texture,cc.rect(0,0,img_size.width,img_size.height));
    }
    var animate = cc.Animate.create(animation);
    return animate;
};