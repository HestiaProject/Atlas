function createFeature() {

    var name = document.getElementById("nameFeatureTextField").value;
    var type = document.getElementById("featureTypeComboBox").value;

    var feature = new Feature(name, type);

    // need a controler //just for test
   
   m1.addFeature(feature);
   var str = JSON.stringify(m1);
   document.getElementById('myModel').value = str;
   var modelString =  parseModelToString(m1);
   document.getElementById('mySavedModel').value = modelString;
   load();

}