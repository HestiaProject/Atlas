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
        this.listAssociations.push(association);
        return true;
    }else{
        return false;
    }
}

Model.prototype.getAssociations = function(){

    return this.listAssociations;

}

Model.prototype.getFeatures = function(){

    return this.listFeatures;

}

Model.prototype.findFeature = function(string){

	for(var i = 0;i < this.listFeatures.length;i++){
		var f1 = this.listFeatures[i];
		if(f1.getName() == string){
			return f1;
		}
		
	}
	return null;

}

Model.prototype.replace = function(f1,f2){

	for(var i = 0;i < this.listFeatures.length;i++){
		var feature = this.listFeatures[i];
		if(f1.getName() == feature.getName){
			this.listFeatures[i]=f2;
			break;
		}
		
	}

}


Model.prototype.updateFeature = function(f1){

	for(var i = 0;i < this.listFeatures.length;i++){
		var feature = this.listFeatures[i];
		if(f1.getName() == feature.getName){
			this.listFeatures[i]=f1;
			break;
		}
		
	}

}