

var UIPage = cc.Layer.extend(
{
    id:"",
    _nodesMap:null,
    _staticpage:false,
    _delegator:null,
    _active:true,

    registerNode:function (node,id) 
    {
        if(this._nodesMap == null)
        {
            this._nodesMap = {};
        }
        if(this._nodesMap[id]!=null)
        {
            cc.log("Duplicate ID:"+id);
        }
        this._nodesMap[id]=node;
    },

    addUINode:function (node,id,z_order) 
    {
        test = [0,0,1];
        this.addChild(node,z_order);
        this.registerNode(node,id);
    },

    isStaticPage:function ()
    {
        return this._staticpage;
    },

    setActive:function (b_active) 
    {
        if(this._active == b_active)
            return;
        this._active = b_active;
        for(var i in this._nodesMap)
        {
            if(this._nodesMap[i].hasOwnProperty("_enabled"))
            {
                cc.log("node:"+i+" active:" + b_active);
                this._nodesMap[i]._enabled = b_active;
            }
        }
    },

})

ui_parser.parseUIPage = function (attrs) 
{
    this.currentPage = new UIPage;
    //this.currentPage.setContentSize(ui_size);
    //this.currentPage.setAnchorPoint(cc.p(0.5,0.5));

    this.currentPage.id = attrs["ID"];
    this.currentPage._staticpage = (attrs["StaticPage"]=="true");

    var delegator = attrs["Delegator"];
    this.currentPage._delegator = ui_delegator[delegator];
    this.currentPage.setScale(ui_scale);
    this.currentPage.setPosition(win_size.width*0.5,win_size.height*0.5);
    
    this.currentScene.addUIPage(this.currentPage);
}