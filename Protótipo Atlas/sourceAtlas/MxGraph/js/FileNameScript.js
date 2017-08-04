document.getElementById("modelName").addEventListener("keydown", function (event) {    
    if (event.keyCode == 13) {
        event.preventDefault();
        document.getElementById("modelName").blur();
    }
});

