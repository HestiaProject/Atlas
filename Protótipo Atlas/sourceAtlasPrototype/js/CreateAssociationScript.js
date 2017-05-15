function canAssociate(featureName) {

    // Variables Declaration
    var parent;
    var child;
    var featureIsChild = false;
    var feature;
    var listAllFeatures = [];
    var listAllAssociations;
    var listCanAssociate = [];
    var isParent = [];
    var isChild = [];
    var association;

    // Get all associations and Features from model
    listAllAssociations = m1.getAssociations();
    listAllFeatures = m1.getFeatures();

    // Create a list of child and parent list
    listAllAssociations.forEach(function(association) {
        parent = association.getParent();
        child = association.getChild();

        if (child.getName() == featureName) {
            featureIsChild = true;
        }

        isParent.push(parent);
        isChild.push(child);
    });

    //iterate over all features and validate if can or not associate with the actual feature on ComboBox
    for (var i = 0; i < listAllFeatures.length; i++) {
        feature = listAllFeatures[i];

        if (featureIsChild) {
            if (!isParent.includes(feature) && !isChild.includes(feature) && feature.getName() != featureName) {
                listCanAssociate.push(feature.getName());
            }
        } else {
            if (!isChild.includes(feature) && feature.getName() != featureName) {
                listCanAssociate.push(feature.getName());
            }
        }
    };

    return listCanAssociate;

}

document.getElementById("createAssociationSubmitButton").onclick = function() {

    var feature1Name = document.getElementById("feature1ComboBox").value;
    var feature2Name = document.getElementById("feature2ComboBox").value;

    var feature1 = m1.findFeature(feature1Name);
    var feature2 = m1.findFeature(feature2Name);

    if (feature1 != undefined && feature2 != undefined) {
        association = new Association(feature1, feature2)
        m1.addAssociation(association);
        save();
    }

    closeAssociationModalButtonClick();
    load();

}