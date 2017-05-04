/*
* Method parses the model to a string,
* calling another 3 methods.
*/
function parseModelToString(model){
	

var features = declareFeature(model.getFeatures());
var associations = declareAssociation(model.getAssociations());
var links = declareLink(model.getAssociations(),model.getFeatures());
var alternative = declareAssociationAlternative(model.getFeatures());
var linkToLink = declareLinkToLink(model.getFeatures(),model.getAssociations());

var begin = "{ \"class\": \"go.GraphLinksModel\",\n\"linkLabelKeysProperty\": \"labelKeys\",\n\"nodeDataArray\": [ ";

return begin+features+associations+alternative+linkToLink+links;

}

/*
* Method organizes a list of features to a string
*/
function declareFeature(listFeature){

var textFeatures = "";

for (i = 0; i < listFeature.length; i++) { 
    textFeatures += "\n{\"key\":\""+ listFeature[i].getName() + "\", \"category\":\""+listFeature[i].getType()+"\"}";
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
    textAssociation += "\n{\"key\":\""+ listAssociation[i].getParentName()+"-"+listAssociation[i].getChildName() + "\", \"category\":\"LinkLabel\"}";
    if (i!=(listAssociation.length-1)) {
    	textAssociation += ",";
    }
}

return textAssociation;
}


/*
* Method set the relations od the features to a string.
*/
function declareLink(listAssociation,listFeatures){

	var textAssociation = "";
	var mandOpc = "";
	var alter = "";
	var category = "";

	for (i = 0; i < listAssociation.length; i++) {  

	for (j = 0; j < listFeatures.length; j++) { // "for" to find the relation of the child feature

		if (listAssociation[i].getChildName()==listFeatures[j].getName()){
			category = listFeatures[j].getType(); //if there a feature with the same name as the child from a association, the "category" will be set to this relation
		}

	}

	if(category == "alternative"){
		alter += "\n{\"from\":\""+ listAssociation[i].getParentName()+"\", \"to\":\""+listAssociation[i].getChildName() + 
    "\", \"labelKeys\":[ \""+ listAssociation[i].getParentName()+"-"+listAssociation[i].getChildName()+"\" ]";
    alter += "}";
    if (i!=(listAssociation.length-1)) {

    	alter += ",";
    }

	}
	if(category == "mandatory"){
		mandOpc += "\n{\"from\":\""+ listAssociation[i].getParentName()+"\", \"to\":\""+listAssociation[i].getChildName() + 
    "\", \"labelKeys\":[ \""+ listAssociation[i].getParentName()+"-"+listAssociation[i].getChildName()+"\" ]";
    mandOpc += "}";
    if (i!=(listAssociation.length-1)) {

    	mandOpc += ",";
    }

	}
	if(category == "optional"){
	mandOpc += "\n{\"from\":\""+ listAssociation[i].getParentName()+"\", \"to\":\""+listAssociation[i].getChildName() + 
    "\", \"labelKeys\":[ \""+ listAssociation[i].getParentName()+"-"+listAssociation[i].getChildName()+"\" ]";
    mandOpc += ",\"category\":\""+category+"\"}";
    if (i!=(listAssociation.length-1)) {

    	mandOpc += ",";
    }
	}


    
}

    	textAssociation += "\n]}\n";

return mandOpc+alter+textAssociation;
}


function declareAssociationAlternative(listFeatures){ //declare all links to links, named as alt

	var textAlternative = "";
	var cont = 0;


for (j = 0; j < listFeatures.length; j++) { // "for" to find the relation of the child feature

		if (listFeatures[j].getType()=="alternative"){
			cont++;
			    	
}

	}

for (i = 1; i <= Math.round(cont/2); i++) { 
		
			    	textAlternative += ",\n{\"key\":\"Alt"+(i)+"\", \"category\":\"LinkLabel\"}";
			    	
}

    	textAlternative += "\n],\n\"linkDataArray\": [ ";
    
return textAlternative;

}

function declareLinkToLink(listFeatures,listAssociation){ //declares the link to link, shhowing them in the canvas.
	var textLinkToLink ="";
	var listFA = [];
	var listLA = [];
	var cont = 0;
	var listAux = [];


for (i = 0; i < listFeatures.length; i++) { 
    
	if (listFeatures[i].getType()=="alternative"){
		listFA.push(listFeatures[i]);

	}
	
  }

  for (j = 0; j < listAssociation.length; j++) { 

for (k = 0; k < listFA.length; k++) { 
    
    if (listAssociation[j].getChildName()==listFA[k].getName()){
	listLA.push(listAssociation[j]);
	}

  }

}


for (l = 0; l < listLA.length; l++) { 
    
	for (m = 0; m < listLA.length; m++) { 
    
if (listAux.indexOf(listLA[m].getParentName()+"-"+listLA[m].getChildName()+" to" +listLA[l].getParentName()+"-"+listLA[l].getChildName())==(-1)){

    	listAux.push(listLA[l].getParentName()+"-"+listLA[l].getChildName()+" to" +listLA[m].getParentName()+"-"+listLA[m].getChildName());

    	if (listLA[m].getParentName()==listLA[l].getParentName() && listLA[m].getChildName()!=listLA[l].getChildName()){
		cont++;
		textLinkToLink += "\n{\"from\":\""+ listLA[m].getParentName()+"-"+listLA[m].getChildName()+"\", \"to\":\""+listLA[l].getParentName()+"-"+listLA[l].getChildName()+
		"\", \"labelKeys\":[ \"Alt"+cont+ "\" ],\"category\":\"linkToLink\"},";
	}
	}
    

	
	
  }
	
  }
	return textLinkToLink;
}



