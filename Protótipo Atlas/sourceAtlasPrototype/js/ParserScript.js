String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function replaceString(string,model){
	var string = string.replaceAll("name", "key");
	var string = string.replaceAll("type", "category");

var text ="";

for (i = 0; i < model.getAssociations().length; i++) { 
    text += model.getAssociations()[i].getChildName() + "<br>";
}

var begin = text+" { \"class\": \"go.GraphLinksModel\",\"linkLabelKeysProperty\": \"labelKeys\",\"nodeDataArray\": [ \"";

return begin+string;

}