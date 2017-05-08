function validateModel(model){

var listAssociation =  groupBy(model.getAssociations(),'parent');

var tree = [];

for (i = 0; i < listAssociation.length; i++){

	for (j = 0; j < listAssociation[i].length; j++){

			console.log(listAssociation[i][j]);

	}

}

var stack = [], node, ii;
stack.push(root);

while (stack.length > 0) {
    node = stack.pop();
    if (node.title == 'randomNode_1') {
        // Found it!
        break;
    } else if (node.children && node.children.length) {
        for (ii = 0; ii < node.children.length; ii += 1) {
            stack.push(node.children[ii]);
        }
    }
}

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