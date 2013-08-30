

var  PetItem = cc.Node.extend({
pet_data:null,
img_bg:null,
img_avatar:null,
btn_buy:null,
btn_updrade:null,
initPetItem:function(pet_data)
{
    this.pet_data = pet_data;
    this.img_bg = cc.Sprite.create("ui/pet_info_box.png");
    this.addChild(this.img_bg);
    this.setContentSize(this.img_bg.getContentSize());
    this.img_avatar = cc.Sprite.create(pet_data.config.avatar);
    this.addChild(this.img_avatar);
    this.img_avatar.setPosition(-185,-5);

    var style_buy = ui_parser.styles["BtnBuyPet"];
    var style_upgrade = ui_parser.styles["BtnUpradePet"];
    this.btn_buy = new UIButton;
    this.btn_buy.initButton(style_buy,this.touchBtnBuy);
    this.addChild(this.btn_buy);
    this.btn_buy.setPosition(180,0);
    this.btn_updrade = new UIButton;
    this.btn_updrade.initButton(style_buy,this.touchBtnUpgrade);
    this.addChild(this.btn_updrade);
    this.btn_updrade.setPosition(178,0);
},

touchBtnBuy:function (node)
{
},

touchBtnUpgrade:function (node)
{
},
});