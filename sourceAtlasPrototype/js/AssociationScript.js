function Association(parent,child){

    if(parent instanceof Feature){
        this.parent = parent;
    }else{
        return false;
    }

    if(child instanceof Feature){
        this.child = child;
    }else{
        return false;
    }
    
};

Association.prototype.getParent = function(){
    return this.parent;
}

Association.prototype.getChild = function(){
    return this.child;
}




//For test
Association.prototype.getParentName = function(){
    return this.parent.name;
};

Association.prototype.getChildName = function(){
    return this.child.name;
};

Association.prototype.getParentType = function(){
    return this.parent.type;
};

Association.prototype.getChildType = function(){
    return this.child.type;
};
