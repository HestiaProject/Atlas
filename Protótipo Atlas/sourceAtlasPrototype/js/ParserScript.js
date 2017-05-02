/*
* Method parses the model to a string,
* calling another 3 methods.
*/
function parseModelToString(model){
	

var features = declareFeature(model.getFeatures());
var associations = declareAssociation(model.getAssociations());
var links = declareLink(model.getAssociations(),model.getFeatures());

var begin = "{ \"class\": \"go.GraphLinksModel\",\n\"linkLabelKeysProperty\": \"labelKeys\",\n\"nodeDataArray\": [ ";

return begin+features+associations+links;

}

/*
* Method organizes a list of features to a string
*/
function declareFeature(listFeature){

var textFeatures = "";

for (i = 0; i < listFeature.length; i++) { 
    textFeatures += "\n{\"key\":\""+ listFeature[i].getName() + "\", \"category\":\""+listFeature[i].getType()+"\" }";
    textFeatures += ",";
    
}

return textFeatures;
}

/*
* Method organizes a list of associations to a string
*/
function declareAssociation(listAssociation){

	var textAssociation = "";

	for (i = 0; i < listAssociation.length; i++) { 
    textAssociation += "\n{\"key\":\""+ listAssociation[i].getParentName()+"-"+listAssociation[i].getChildName() + "\", \"category\":\"LinkLabel\" }";
    if (i==(listAssociation.length-1)) {
    	textAssociation += "\n],\n";
    }else{
    	textAssociation += ",";
    }
}

return textAssociation;
}


/*
* Method set the relations od the features to a string.
*/
function declareLink(listAssociation,listFeatures){

	var textAssociation = "\"linkDataArray\": [ ";
	var category = "";

	for (i = 0; i < listAssociation.length; i++) {  

	for (j = 0; j < listFeatures.length; j++) { // "for" to find the relation of the child feature

		if (listAssociation[i].getChildName()==listFeatures[j].getName()){
			category = listFeatures[j].getType(); //if there a feature with the same name as the child from a association, the "category" will be set to this relation
		}

	}

    textAssociation += "\n{\"from\":\""+ listAssociation[i].getParentName()+"\", \"to\":\""+listAssociation[i].getChildName() + 
    "\", \"labelKeys\":[ \""+ listAssociation[i].getParentName()+"-"+listAssociation[i].getChildName()+"\" ]";


	if(category=="" || category == "mandatory"){ 
	textAssociation += "}";//if there is no relation or is a mandatory, the category is empty
	}	else{
	textAssociation += ",\"category\":\""+category+"\"}";//set the relation between two features

	}


    if (i==(listAssociation.length-1)) {
    	textAssociation += "\n]}\n";
    }else{
    	textAssociation += ",";
    }
}

return textAssociation;
}






