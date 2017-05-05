document.getElementById("loadFileSubmitButton").onclick = function () {
    var file = document.getElementById("fileInput").files;
    if (file.length <= 0) {
        return false;
    }

    var fileReader = new FileReader();

    fileReader.onload = function (e) {
        var result = JSON.parse(e.target.result);
        var formatted = JSON.stringify(result, null, 2);
        document.getElementById('mySavedModel').value = formatted;
    }

    fileReader.readAsText(file.item(0));

    var createLoadModal = document.getElementById("loadFileModal");
    createLoadModal.style.display = "none";
}