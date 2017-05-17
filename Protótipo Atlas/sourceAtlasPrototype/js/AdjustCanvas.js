function adjustSizes() {
    var canvas = document.getElementById("myDiagramDiv");
    var topBarIcons = document.getElementById("topBarIconGroup");
    var topBarIconsSmall = document.getElementById("topBarIconGroupSmall");
    var modelName = document.getElementById("modelName");
    var height = window.innerHeight;
    var width = window.innerWidth;

    canvasWidth = width - 90;
    canvasHeight = height - 95;

    canvas.style.width = canvasWidth.toString() + "px";
    canvas.style.height = canvasHeight.toString() + "px";


    modelName.style.marginLeft = (width / 2) - (modelName.clientWidth / 2) + "px";

    if (width <= 600) {
        // topBarIcons.style.display = "block";
        topBarIcons.style.display = "none";
        topBarIconsSmall.style.display = "block";
    } else {
        topBarIcons.style.display = "block";
        topBarIconsSmall.style.display = "none";
    }

}

window.onresize = function() {
    adjustSizes();
}