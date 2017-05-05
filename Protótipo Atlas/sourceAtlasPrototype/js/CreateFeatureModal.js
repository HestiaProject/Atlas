function createFeatureModalButtonClick() {
    var createFeatureModal = document.getElementById("createFeatureModal");
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