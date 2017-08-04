space = 0;

document.getElementById("createFeatureSubmitButton").onclick = function() {

    var featureName;
    var feature;

    featureName = document.getElementById('nameFeatureTextField').value;

    feature = modelGraph.insertVertex(parent, null, featureName, 100 + space, 20, 80, 30);

    model.addFeature(feature);

    space = space + 120;

    closeFeatureModalButtonClick();
}

container.ondblclick = function(evt) {

    feature = modelGraph.insertVertex(parent, null, "teste", evt.clientX-70, evt.clientY-70, 80, 30);

    console.log("X: " + evt.clientX + "\n\rY: " + evt.clientY);

    model.addFeature(feature);
}

// container.onclick = function(evt) {
//     model.getFeatures();
// }