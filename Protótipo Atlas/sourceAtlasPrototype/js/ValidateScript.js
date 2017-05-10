function validateModel(model){// i have to find out what the tool needs as return from this method.
var message=[];

var listFeatures = model.getFeatures();
var listAssociation = model.getAssociations();
var tree=createTree(listFeatures, listAssociation);
var deadNodes = searchDeadNode(listFeatures,tree);
var oneRoot = checkRoot(tree);
var numberAssociation = checkAssociations(tree,listAssociation);
var numberAlternatives = checkAlternatives(tree);

if(deadNodes.length!=0){ //message to when dead nodes are founded
	message.push("Features "+deadNodes.join(", ")+" não estão de acordo com a notação");
}

if(numberAlternatives.length!=0){ //message to when the number of alternatives are wrong
	message.push("Features Alternativas "+numberAlternatives.join(", ")+" não podem estar em um grupo de alternativas de apenas 1 feature");

}

if(!oneRoot){ //message to when the number of root are wrong
	message.push("Em cada modelo pode haver apenas 1 feature root");

}

if(!numberAssociation){ //message when the number of associations are wrong
	message.push("Não pode haver relacionamentos sem features pais ou filhas");

}

if (message.length==0){
	return "Feature Model Validated!";
}else{
	return message.join(", ")+".";
}
}

/*
* Method create a tree structure from the model
* Is takes the name from the feature list, the parent and child from the association list
* each node struture are:
* {name: "nameFeature",
   type: "typeFeature",
   parent: "parentName",
   children: [collectionChildren],
   visited: false}
* 
*/
function createTree(listFeatures,listAssociation){
var tree = [];
var node;

for (i=0;i<listFeatures.length;i++){
	
        node = {name: listFeatures[i].getName(),type:listFeatures[i].getType(), parents: "", children: [], visited:false}


 for (j=0;j<listAssociation.length;j++){

 if(listFeatures[i].getName()==listAssociation[j].getParentName()){
	
node.children.push(listAssociation[j].getChildName());
 }

 if(listFeatures[i].getName()==listAssociation[j].getChildName()){
	
node.parents=listAssociation[j].getParentName();
 }

}

if ((node.parents=="") && (node.children.length==0)){
}else{
		tree.push(node);


}
	}


return tree;
}

function findNodeByName(name,tree){ // find the node by the name in a tree, the name's node is the same from the feature.
var result= false;
for (i=0;i<tree.length;i++){
if (tree[i].name==name){
	result = true;
}
}
return result;
}


function searchDeadNode(listFeatures,tree){ // search a node without associations, it means that the node dosnt has parent and child
var deadNodes=[];
for (j=0;j<listFeatures.length;j++){


	if (!findNodeByName(listFeatures[j].getName(),tree)){
		deadNodes.push(listFeatures[j].getName());
	}
}
return deadNodes;
}

function checkRoot(tree){ // check if there is only one root in the tree
var result = true,
cont =0;

for(var i = 0; i < tree.length; i++){
if(tree[i].parents==""){
	cont++;
}
}

if (cont!=1){
	result= false;
}
	return result;
}

function checkAssociations(tree,listAssociation){ //check if the number of associations is correct, the number of associations are always nFeature-1

var result=true;

if(listAssociation.length!=(tree.length-1)){
	result=false;
}

return result;

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




function checkAlternatives(tree){ // Check if there is a group of alternatives formed just by 1 alternative feature.
var listAlternatives =[];
var cont=0;
var result=[];

for (var i = 0; i<tree.length;i++){
	if (tree[i].type=="alternative"){
		listAlternatives.push(tree[i]);
	}
}

var alternatives = groupBy(listAlternatives,"parents");


for(var j =0; j< alternatives.length; j++){
	if (alternatives[j].length<2){
		result.push(alternatives[j][0].name);
	}
}
return result;

}










