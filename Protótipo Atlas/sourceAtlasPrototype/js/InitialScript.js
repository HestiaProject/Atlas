function init(m1){

var f1 = new Feature("a", "mandatory");
			var f3 = new Feature("c", "optional");
			var f2 = new Feature("b", "mandatory");
			var f4 = new Feature("d", "alternative");
			var f5 = new Feature("e", "alternative");
			var f6 = new Feature("f", "alternative");
			var f7 = new Feature("g", "optional");
			var f8 = new Feature("g5", "mandatory");
			var f9 = new Feature("g12", "alternative");
			var a1 = new Association(f1, f2);
			var a2 = new Association(f1, f3);
			var a3 = new Association(f2, f4);
			var a4 = new Association(f2, f5);
			var a5 = new Association(f2, f6);
			var a6 = new Association(f2, f7);
			var a7 = new Association(f2, f8);
			var a8 = new Association(f2, f9);
			m1.addFeature(f1);
			m1.addFeature(f2);
			m1.addFeature(f3);
			m1.addFeature(f4);
			m1.addFeature(f5);
			m1.addFeature(f6);
			m1.addFeature(f7);
			m1.addFeature(f8);
			m1.addFeature(f9);
			m1.addAssociation(a1);
			m1.addAssociation(a2);
			m1.addAssociation(a3);
			m1.addAssociation(a4);
			m1.addAssociation(a5);
			m1.addAssociation(a6);
			m1.addAssociation(a7);
			m1.addAssociation(a8);

			document.getElementById('mySavedModel').value = parseModelToString(m1);
			
}