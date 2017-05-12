function validateModel(model){// i have to find out what the tool needs as return from this method.
var message=[];

var listFeatures = model.getFeatures();
var listAssociation = model.getAssociations();
var tree=createFlatArray(listFeatures, listAssociation);
var deadNodes = searchDeadNode(listFeatures,tree);
var oneRoot = checkRoot(tree);
//var numberAssociation = checkAssociations(tree,listAssociation);
var numberAlternatives = checkAlternatives(tree);

if(oneRoot.length!=1){ //message to when the number of root are wrong
	message.push("The model do not allow more than 1 root: \""+oneRoot.join("\", \"")+"\"");

}

if(deadNodes.length!=0){ //message to when dead nodes are founded
	message.push("Features \""+deadNodes.join("\", \"")+"\" must have a parent");
}

if(numberAlternatives.length!=0){ //message to when the number of alternatives are wrong
	message.push("Features \""+numberAlternatives.join("\", \"")+"\" could not be an alternative group formed by just 1 feature");

}

// if(!numberAssociation){ //message when the number of associations are wrong
// 	message.push("Relations without parent or child are not allowed");

// }

//creatreTree(tree);
if (message.length==0){
	return "Feature Model Validated!";
}else{
	return message.join(",\n")+".";
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
function createFlatArray(listFeatures,listAssociation){
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
var result = [];

for(var i = 0; i < tree.length; i++){
if(tree[i].parents==""){
	result.push(tree[i].name);
}
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

function findRoot(tree){
	var result;

for(var i = 0; i < tree.length; i++){
if(tree[i].parents==""){
	result=tree[i];
}
}

	return result;
}
/*
function creatreTree(flatTree){

var rootNode=findRoot(flatTree);
var tree = new Tree(rootNode.name);

for(var i = 0; i < flatTree.length; i++){
	if (rootNode.name!=flatTree[i].name){
		if (rootNode.name==flatTree[i].parents) {
			tree._root.children.push(new Node(flatTree[i].name,flatTree[i].parents));
		}
		for(var j = 0; j < tree._root.children.length; j++){
if (tree._root.children[j].name==flatTree[i].parents) {
			tree._root.children[j].children.push(new Node(flatTree[i].name,flatTree[i].parents));
			console.log(flatTree[i].name);
		}


		}

	}
}

console.log(JSON.stringify(tree._root));

tree.traverseDF(function(node) {
    console.log(node.data);
});

tree._root.children.push(new Node('two'));
tree._root.children[0].parent = tree;
 
tree._root.children.push(new Node('three'));
tree._root.children[1].parent = tree;
 
tree._root.children.push(new Node('four'));
tree._root.children[2].parent = tree;
 
tree._root.children[0].children.push(new Node('five'));
tree._root.children[0].children[0].parent = tree._root.children[0];
 
tree._root.children[0].children.push(new Node('six'));
tree._root.children[0].children[1].parent = tree._root.children[0];
 
tree._root.children[2].children.push(new Node('seven'));
tree._root.children[2].children[0].parent = tree._root.children[2];



}

 






