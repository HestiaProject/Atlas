document.getElementById("createFeatureSubmitButton").onclick = function(){

    var name = document.getElementById("nameFeatureTextField").value;
    var type = document.getElementById("featureTypeComboBox").value.toLowerCase();



    if(name == ""){
        name = "F";
    }

    var feature = new Feature(name, type);

    // need a controler //just for test
   
   m1.addFeature(feature);
   var str = JSON.stringify(m1);
   document.getElementById('myModel').value = str;
   var modelString =  parseModelToString(m1);
   document.getElementById('mySavedModel').value = modelString;

   var createFeatureModal = document.getElementById("featureModal");
   createFeatureModal.style.display = "none";

   load();

}