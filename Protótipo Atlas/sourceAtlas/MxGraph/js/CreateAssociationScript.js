document.getElementById("createAssociationSubmitButton").onclick = function() {

    var feature1Name = document.getElementById("feature1ComboBox").value;
    var feature2Name = document.getElementById("feature2ComboBox").value;

    var feature1;
    var feature2;

    listFeatures = model.getFeatures();

    for (var i = 0; i < listFeatures.length; i++) {
        if (listFeatures[i].getId() == feature1Name) {
            feature1 = listFeatures[i];
            break;
        }
    }

    for (var i = 0; i < listFeatures.length; i++) {
        if (listFeatures[i].getId() == feature2Name) {
            feature2 = listFeatures[i];
            break;
        }
    }

    var association = modelGraph.insertEdge(parent, null, '', feature1, feature2);

    model.addAssociation(association);

}

