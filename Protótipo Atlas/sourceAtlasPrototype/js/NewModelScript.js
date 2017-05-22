function newModel(){

	if(confirm("Do you really want to create a new model?\n All unsaved progress will be lost!") == true){


			m1 = new Model();
			var f1 = new Feature("Root", "mandatory");
			m1.addFeature(f1);
			document.getElementById('mySavedModel').value = parseModelToString(m1);
			load();
		}
		


}