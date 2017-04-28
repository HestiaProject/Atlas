function Model(name){
    this.name = name;
    this.listFeatures = [];
    this.listAssociations = [];
}

Model.prototype.addFeature= function(feature){
    if (feature != undefined){
        this.listFeatures.push(feature);
        return true;
    }else{
        return false;
    }
}

Model.prototype.removeFeature = function(feature){
    
    var featureIndex = this.listFeatures.getIndexOf(feature);
    
    this.listFeatures.splice(featureIndex,1);

}

Model.prototype.addAssociation = function(association){
     if (association != undefined){
        this.listFeatures.push(feature);
        return true;
    }else{
        return false;
    }
}

Model.prototype.getAssociations = function(){

    return this.listAssociations;

}