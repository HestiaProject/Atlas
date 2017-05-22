document.getElementById("loadFileSubmitButton").onclick = function () {

	if(confirm("Do you really want to import a JSON file?\n All unsaved progress will be lost!") == true){

    var file = document.getElementById("fileInput").files;
    if (file.length <= 0) {
        return false;
    }

    var fileReader = new FileReader();

    fileReader.onload = function (e) {
		try {
			var result = JSON.parse(e.target.result);
			var formatted = JSON.stringify(result,null,2);
			document.getElementById('mySavedModel').value = formatted;
			load();
			m1 = parseToModel2(document.getElementById("mySavedModel").value);
			document.getElementById('myModel').value = JSON.stringify(m1);
		}
		catch(err) {
			alert("Invalid Model! Try to upload other .json!");
		}
	}

    fileReader.readAsText(file.item(0));

    var createLoadModal = document.getElementById("loadFileModal");
    createLoadModal.style.display = "none";
}

}