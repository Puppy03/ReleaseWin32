
function getLenP2(pos1,pos2) 
{
    return (pos1.x-pos2.x)*(pos1.x-pos2.x)+(pos1.y-pos2.y)*(pos1.y-pos2.y);
}
function getLength(pos1,pos2) 
{
    return Math.sqrt(getLenP2(pos1,pos2));
}

function getZOrderByY(node)
{
    return parseInt(9999-node.getPositionY()-0.5);
}

function randomF(min,max) 
{
    return Math.random()*(max-min)+min;
}

function degreeToRadian(degree) 
{
    return degree*2*Math.PI/360;
}

function cloneObj(_obj)
{
    var newOjb={};
     for(var i in _obj)
     { 
         if(typeof _obj[i] == "object")
         {
            newOjb[i]={};
            cloneObj(_obj[i],newOjb[i]);
            continue; 
         }         
         newOjb[i] = _obj[i];      
    }
    return newOjb;  
}

function rectForNode(node,to_world)
{
    var origin;
    if(to_world)
    {
        origin = node.getParent().convertToWorldSpace(node.getPosition());
    }
    else
    {
        origin = node.getPosition();
    }
    var size = node.getContentSize();
    size.width *= node.getScale();
    size.height *= node.getScale();
    origin.x -= size.width*0.5;
    origin.y -= size.height*0.5;
    return new cc.rect(origin.x,origin.y,size.width,size.height);
}

function shakeNode(node,val) 
{
    var pos = node.getPosition();
    var move1 = cc.MoveTo(0.05,cc.p(pos.x+val,0));
    var move2 = cc.MoveTo(0.05,cc.p(pos.x-val,0));
    var sq = new cc.Sequence;
    sq.initWithTwoActions(move1,move2);
    var repeat = cc.RepeatForever.create(sq);
    node.runAction(sq);
}