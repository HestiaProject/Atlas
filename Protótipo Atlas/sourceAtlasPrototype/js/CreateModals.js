
function createFeatureModalButtonClick() {
    var createFeatureModal = document.getElementById("featureModal");
    var comboBox = document.getElementById("featureTypeComboBox");

    var option;


    for (let item in FeatureType) {
        option = document.createElement("option");
        option.text = item;
        comboBox.add(option);
    }

    createFeatureModal.style.display = "block";
    document.getElementById("nameFeatureTextField").focus();
}

function createLoadModalButtonClick() {
    var createLoadModal = document.getElementById("loadFileModal");
    createLoadModal.style.display = "block";    
}