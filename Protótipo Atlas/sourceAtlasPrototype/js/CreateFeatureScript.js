document.getElementById("createFeatureSubmitButton").onclick = function() {

    var name = document.getElementById("nameFeatureTextField").value;
    var type = document.getElementById("featureTypeComboBox").value.toLowerCase();


    if (name == null || name.trim() == "") {
        alert("You must enter a name!");
    } else
    if (m1.contain(name.trim()) != -1) {
        alert("Name already taken!");
    } else
    if (name.length >= 30) {
        alert("Name must be 30 characters or less!");
    } else {


        var feature = new Feature(name, type);

        // need a controler //just for test

        m1.addFeature(feature);
        var str = JSON.stringify(m1);
        document.getElementById('myModel').value = str;
        var modelString = parseModelToString(m1);
        document.getElementById('mySavedModel').value = modelString;

        closeFeatureModalButtonClick();

        load();
    }
}