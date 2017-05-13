// Create Feature Modal
function createFeatureModalButtonClick() {
	save2();
    var createFeatureModal = document.getElementById("featureModal");
    var comboBox = document.getElementById("featureTypeComboBox");

    var option;


    if (comboBox.options.length == 3) {

    } else {
        for (let item in FeatureType) {
            option = document.createElement("option");
            option.text = item;
            comboBox.add(option);
        }
    }

    createFeatureModal.style.display = "block";
    createFeatureModal.focus();
    // document.getElementById("nameFeatureTextField").focus();

}

// Create Association Modal

function createAssociationModalButtonClick() {
	save2();
    var createAssociationModal = document.getElementById("associationModal");
    var feature1ComboBox = document.getElementById("feature1ComboBox");
    var feature2ComboBox = document.getElementById("feature2ComboBox");

    var feature1Name;
    var feature2Name;
    var option;
    var listCanAssociate;

    for (var i = feature1ComboBox.options.length - 1; i >= 0; i--) {
        feature1ComboBox.remove(i);
    }

    for (var i = feature2ComboBox.options.length - 1; i >= 0; i--) {
        feature2ComboBox.remove(i);
    }

    m1.getFeatures().forEach(function (feature) {
        feature1Name = feature.getName();
        option = document.createElement("option");
        option.text = feature1Name;
        feature1ComboBox.add(option);
    });

    //Resquest all feature names that can be associate with the first feature
    listCanAssociate = canAssociate(feature1ComboBox.value);

    //iterate over list and create a second ComboBox
    if (listCanAssociate.length > 0) {
        listCanAssociate.forEach(function (feature2Name) {
            option = document.createElement("option");
            option.text = feature2Name;
            feature2ComboBox.add(option);
        });
    }

    if(feature2ComboBox.options.length > 0){
        document.getElementById("createAssociationSubmitButton").disabled = false;
        feature2ComboBox.disabled = false;
    }else{
        document.getElementById("createAssociationSubmitButton").disabled = true;
        feature2ComboBox.disabled = true;
    }

    createAssociationModal.style.display = "block";
    createAssociationModal.focus();
    
}


// Create Load Modal
function createLoadModalButtonClick() {
    var createLoadModal = document.getElementById("loadFileModal");
    createLoadModal.style.display = "block";
    createLoadModal.focus();
}

