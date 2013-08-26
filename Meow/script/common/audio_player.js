

var AudioPlayer = cc.Node.extend({
min_intvr:0.1,
sequence:null,
playing_num:0,
initPlayer:function (parent)
{
    this.sequence = {};
    parent.addChild(this)
    this.schedule(this.tickSequence);
},

playEffect:function(file_name)
{
    if(this.sequence.hasOwnProperty(file_name))
    {
        return;
    }
    var path = "sound/"+file_name;
    var eff_n={};

    eff_n.id = cc.AudioEngine.getInstance().playEffect(path);
    eff_n.dur = this.min_intvr;
    this.sequence[file_name] = eff_n;
    this.playing_num++;
    
},
playBgMusic:function(file_name)
{
    var path = "sound/"+file_name;
    cc.AudioEngine.getInstance().playMusic(path,true);
},
tickSequence:function (dt)
{
    for(var i in this.sequence)
    {
        this.sequence[i].dur -= dt;
        if(this.sequence[i].dur<=0)
        {
         delete this.sequence[i];
         this.playing_num--;
         return;
        }
    }
},
});
