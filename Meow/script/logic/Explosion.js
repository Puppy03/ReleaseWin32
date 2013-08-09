var Explosion = cc.Sprite.extend({
life:0,
initExplotion:function (motion) 
{
    var img_array = genImgArray(motion);
    this.init(img_array[0]);
    var animate = genAnimateArr(img_array,motion.interval);
    this.life = animate.getAnimation().getDuration();
    this.runAction(animate);
    this.schedule(this.tickLife);
},
tickLife:function (dt)
{
    this.life -= dt;
    if(this.life<=0)
    {
        this.getParent().removeChild(this,true);
    }
}

});

