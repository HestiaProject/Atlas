function parseToModel(string){
var m1 = new Model("m1");
var lines = string.split('\n');
for(var i = 0;i < lines.length;i++){
	
	if(lines[i].indexOf("\"key\"")!=-1){
		if(lines[i].indexOf("category\":\"LinkLabel")==-1){
			var indexA = lines[i].lastIndexOf("\"key\":\"")+7;
			var indexB = lines[i].indexOf("\", \"");
			var indexC = lines[i].lastIndexOf("\"category\":\"")+12;
			var indexD = lines[i].indexOf("\"},");
			var name = lines[i].slice(indexA,indexB);
			var type = lines[i].slice(indexC,indexD);
			m1.addFeature(new Feature(name, type));
		}
		
	}
	if(lines[i].indexOf("\"from\":")!=-1){
		if(lines[i].indexOf("category\":\"linkToLink")==-1){
			var indexA = lines[i].lastIndexOf("\"from\":\"")+8;
			var indexB = lines[i].indexOf("\", \"to\"");
			var f1Name = lines[i].slice(indexA,indexB);
						
			var indexC = lines[i].lastIndexOf("\"to\":\"")+6;
			var indexD = lines[i].indexOf("\", \"labelKeys\"");
			var f2Name = lines[i].slice(indexC,indexD);
			
			var f1 = m1.findFeature(f1Name);	
			var f2 = m1.findFeature(f2Name);
			var a1 = new Association(f1,f2);
			m1.addAssociation(a1);
		}
	}
}

return m1;

}