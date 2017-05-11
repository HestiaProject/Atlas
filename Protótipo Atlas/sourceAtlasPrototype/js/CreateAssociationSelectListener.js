var feature1ComboBox = document.getElementById("feature1ComboBox");
feature1ComboBox.onchange = function () {    
    var feature2ComboBox = document.getElementById("feature2ComboBox");
    var listCanAssociate = [];
    var option;
    var feature2Name;

     for (var i = feature2ComboBox.options.length - 1; i >= 0; i--) {
        feature2ComboBox.remove(i);
    }

    listCanAssociate = canAssociate(feature1ComboBox.value);

    if (listCanAssociate.length > 0) {
        listCanAssociate.forEach(function (feature2Name) {
            option = document.createElement("option");
            option.text = feature2Name;
            feature2ComboBox.add(option);
        });
    }


    if (feature2ComboBox.options.length > 0) {
        feature2ComboBox.disabled = false;
        document.getElementById("createAssociationSubmitButton").disabled = false;
    } else {
        feature2ComboBox.disabled = true;
        document.getElementById("createAssociationSubmitButton").disabled = true;
    }
}
