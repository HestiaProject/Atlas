String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function replaceString(model){
	

var features = declareFeature(model.getFeatures());
var associations = declareAssociation(model.getAssociations());
var links = declareLink(model.getAssociations(),model.getFeatures());

var begin = "{ \"class\": \"go.GraphLinksModel\",\"linkLabelKeysProperty\": \"labelKeys\",\"nodeDataArray\": [ ";

return begin+features+associations+links;

}

function declareFeature(listFeature){

var textFeatures = "";

for (i = 0; i < listFeature.length; i++) { 
    textFeatures += "\n{\"key\":\""+ listFeature[i].getName() + "\"}";
    textFeatures += ",";
    
}

return textFeatures;
}

function declareAssociation(listAssociation){

	var textAssociation = "";

	for (i = 0; i < listAssociation.length; i++) { 
    textAssociation += "\n{\"key\":\""+ listAssociation[i].getParentName()+"-"+listAssociation[i].getChildName() + "\", \"category\":\"LinkLabel\"}";
    if (i==(listAssociation.length-1)) {
    	textAssociation += "\n],\n";
    }else{
    	textAssociation += ",";
    }
}

return textAssociation;
}

function declareLink(listAssociation,listFeatures){

	var textAssociation = "\"linkDataArray\": [ ";
	var category = "";

	for (i = 0; i < listAssociation.length; i++) { 

	for (j = 0; j < listFeatures.length; j++) { 

		if (listAssociation[i].getChildName()==listFeatures[j].getName()){
			category = listFeatures[j].getType();
		}

	}

    textAssociation += "\n{\"from\":\""+ listAssociation[i].getParentName()+"\", \"to\":\""+listAssociation[i].getChildName() + 
    "\", \"labelKeys\":[ \""+ listAssociation[i].getParentName()+"-"+listAssociation[i].getChildName()+"\" ]";


	if(category=="" || category == "mandatory"){
	textAssociation += " }";
	}	else{
	textAssociation += ",\"category\":\""+category+"\" }";

	}


    if (i==(listAssociation.length-1)) {
    	textAssociation += "\n]}\n";
    }else{
    	textAssociation += ",";
    }
}

return textAssociation;
}






