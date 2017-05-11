function canAssociate(featureName) {

    var parent;
    var child;
    var feature;
    var listAllFeatures = [];
    var listAllAssociations;
    var listCanAssociate = [];
    var isParent = [];
    var isChild = [];
    var association;

    listAllAssociations = m1.getAssociations();
    listAllFeatures = m1.getFeatures();

    listAllAssociations.forEach(function (association) {
        parent = association.getParent();
        child = association.getChild();

        isParent.push(parent);
        isChild.push(child);
    });





    for (var i = 0; i < listAllFeatures.length; i++) {

        feature = listAllFeatures[i];

        // if the feature is one whitout any association clear array and put all features in can associate exclude it self
        if (feature.getName() == featureName && !isParent.includes(feature) && !isChild.includes(feature)) {
            listCanAssociate = [];


            for (var i = 0; i < listAllFeatures.length; i++) {
                if (listAllFeatures[i].getName() != featureName) {
                    listCanAssociate.push(listAllFeatures[i].getName());
                }
            }

            break;

        }

        if (!isParent.includes(feature) && !isChild.includes(feature) && feature.getName() != featureName) {
            listCanAssociate.push(feature.getName());
        }

    };

    return listCanAssociate;

}

document.getElementById("createAssociationSubmitButton").onclick = function(){

    var feature1Name = document.getElementById("feature1ComboBox").value;
    var feature2Name = document.getElementById("feature2ComboBox").value;

    var feature1 = m1.findFeature(feature1Name);
    var feature2 = m1.findFeature(feature2Name);

    if(feature1 != undefined && feature2 !=undefined){
        association = new Association(feature1,feature2)
        m1.addAssociation(association);
    }   

    document.getElementById("associationModal").style.display = "none";
    load();

}