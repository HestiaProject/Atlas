/*
* Method parses the model to a string,
* calling another 3 methods.
*/
function parseModelToString(model){
	

var features = declareFeature(model.getFeatures());
var associations = declareAssociation(model.getAssociations());
var links = declareLink(model.getAssociations(),model.getFeatures());
var alternative = declareAssociationAlternative(model.getFeatures(),model.getAssociations());
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


function declareAssociationAlternative(listFeatures,listAssociation){ //declare all links to links, named as alt

	var textAlternative = "";
	var listLA =  listAlternative(listFeatures,listAssociation);

var aux = groupBy(listLA, 'parent');



for (i = 0; i < aux.length; i++) { 
		
			    	textAlternative += ",\n{\"key\":\"Alt"+(i+1)+"\", \"category\":\"LinkLabel\"}";
			    	
}

    	textAlternative += "\n],\n\"linkDataArray\": [ ";
    
return textAlternative;

}

function declareLinkToLink(listFeatures,listAssociation){ //declares the link to link, shhowing them in the canvas.
	var textLinkToLink ="";
	var listLA =  listAlternative(listFeatures,listAssociation);

var aux = groupBy(listLA, 'parent');

for (x = 0; x < aux.length; x++) { 

	

textLinkToLink += "\n{\"from\":\""+ aux[x][aux[x].length-1].getParentName()+"-"+aux[x][aux[x].length-1].getChildName()+"\", \"to\":\""+aux[x][0].getParentName()+"-"+aux[x][0].getChildName()+
		"\", \"labelKeys\":[ \"Alt"+(x+1)+ "\" ],\"category\":\"linkToLink\"},";

	
}

	return textLinkToLink;
}


function groupBy(collection, property) {
    var i = 0, val, index,
        values = [], result = [];
    for (; i < collection.length; i++) {
        val = collection[i][property];
        index = values.indexOf(val);
        if (index > -1)
            result[index].push(collection[i]);
        else {
            values.push(val);
            result.push([collection[i]]);
        }
    }
    return result;
}

function listAlternative(listFeatures,listAssociation){
var listFA = [];
var listLA = [];

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
return listLA;

}
