
var UIController = cc.Layer.extend ({
  staticPages:null,
  popedPages:null,
  
  openUIPage : function (layout_file) 
  {
     if(this.staticPages == null)
     {
         this.staticPages = [];
     }
     if(this.popedPages == null)
     {
         this.popedPages = [];
     }
     ui_parser.currentScene = this;
     ui_parser.parser.parseUI(layout_file);
     return ui_parser.currentPage;
  },
  parseStyle : function (style_file) 
  {
    ui_parser.parser.parseStyle(style_file);
  },
  getUIPage : function(page_id) 
  {
    for(var i in this.popedPages)
    {
        if(this.popedPages[i].id == page_id)
        {
            return this.popedPages[i];
        }
    }
    for(var i in this.staticPages)
    {
        if(this.staticPages[i].id == page_id)
        {
            return  this.staticPages[i];
        }
    }
    return null;
  },

  addUIPage : function (page) 
  {
    if(this.getUIPage(page.id) != null)
    {
        cc.log("re-open page ignored:"+page.id);
        return;
    }
    if(!page._staticpage )
    {
        for(var i in this.staticPages)
        {
            this.staticPages[i].setActive(false);
        }
            for(var i in this.popedPages)
        {
            this.popedPages[i].setActive(false);
        }
    }
    this.addChild(page,1000);
    if(page._staticpage)
    {
        cc.log("Add Static Page:" + page.id);
        this.staticPages.push(page);
    }
    else
    {
        cc.log("Add Poped Page:" + page.id);
        this.popedPages.push(page);
    }
  },
  resetActivePage : function () 
  {
    if(this.popedPages.length == 0)
    {
         for(var i in this.staticPages)
         {
            this.staticPages[i].setActive(true);
         }
    }
    else
    {
        var length = this.popedPages.length;
        this.popedPages[length-1].setActive(true);
    }
  },
  closePage : function (page_id) 
  {
    for(var i in this.popedPages)
    {
        if(this.popedPages[i].id == page_id)
        {
            this.removeChild(this.popedPages[i],true);
            this.popedPages.splice(i,1);
            this.resetActivePage();
            return;
        }
    }

    for(var i in this.staticPages)
    {
        if(this.staticPages[i].id == page_id)
        {
            this.removeChild(this.staticPages[i],true);
            this.staticPages.splice(i,1);
            this.resetActivePage();
            return;
        }
    }
  },
});
