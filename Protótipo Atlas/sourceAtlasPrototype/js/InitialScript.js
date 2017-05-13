function init(m1){

			var f1 = new Feature("Root", "mandatory");
			var f2 = new Feature("Child", "mandatory");
			//var f3 = new Feature("Chfild", "mandatory");
			
			var a1 = new Association(f1, f2);
			//var a2 = new Association(f1, f3);
			m1.addFeature(f1);
			//m1.addFeature(f2);
			//m1.addFeature(f3);
			
			m1.addAssociation(a1);
			//m1.addAssociation(a2);
			
			document.getElementById('mySavedModel').value = parseModelToString(m1);
			
}