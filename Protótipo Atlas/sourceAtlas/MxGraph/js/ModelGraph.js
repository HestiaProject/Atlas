function ModelGraph() {
    this.listFeatures = [];
    this.listAssociations = [];
}

ModelGraph.prototype.addFeature = function(feature) {
    this.listFeatures.push(feature);
}

ModelGraph.prototype.getFeatures = function() {
    return this.listFeatures;
}


ModelGraph.prototype.addAssociation = function(association) {
    this.listAssociations.push(association);
}

ModelGraph.prototype.getAssociations = function() {
    return this.listAssociations;
}

var container = document.getElementById('canvas');
var modelGraph = new mxGraph(container);
var model = new ModelGraph();
var parent = modelGraph.getDefaultParent();

modelGraph.setConnectable(true);

var keyHandler = new mxKeyHandler(modelGraph);

var style = new Object();

mxStylesheet.prototype.putDefaultVertexStyle = function(style){};