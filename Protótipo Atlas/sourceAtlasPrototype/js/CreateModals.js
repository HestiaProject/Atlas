// Create Feature Modal
function createFeatureModalButtonClick() {
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
    document.getElementById("nameFeatureTextField").focus();
    
}

// Create Association Modal

function createAssociationModalButtonClick() {
    var createAssociationModal = document.getElementById("associationModal");
    var feature1ComboBox = document.getElementById("feature1ComboBox");
    var feature2ComboBox = document.getElementById("feature2ComboBox");

    var feature1Name;
    var feature2Name;

    m1.getFeatures().forEach(function (feature) {
        feature1Name = feature.getName();
        option = document.createElement("option");
        option.text = feature1Name;
        feature1ComboBox.add(option);
    });

    createAssociationModal.style.display = "block";

}


// Create Load Modal
function createLoadModalButtonClick() {
    var createLoadModal = document.getElementById("loadFileModal");
    createLoadModal.style.display = "block";
}