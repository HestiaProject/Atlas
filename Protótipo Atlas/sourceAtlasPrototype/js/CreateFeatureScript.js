function createFeature() {

    var name = document.getElementById("nameFeatureTextField").value;
    var type = document.getElementById("featureTypeComboBox").value;

    var feature = new Feature(name, type);

    // need a controler //just for test
    var model = new Model(document.getElementById("fileNameTextField").value);
    model.addFeature(feature);

}