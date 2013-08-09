
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