function parseToModel(string){
var m1 = new Model("m1");
var lines = string.split('\n');
for(var i = 0;i < lines.length;i++){
	
	if(lines[i].indexOf("\"key\"")!=-1){
		if(lines[i].indexOf("category\":\"LinkLabel")==-1){
			var indexA = lines[i].lastIndexOf("\"key\":\"")+7;
			var indexB = lines[i].indexOf("\" },");
			var name = lines[i].slice(indexA,indexB);
			m1.addFeature(new Feature(name, "mandatory"));
		}
	}
}

return m1;

}