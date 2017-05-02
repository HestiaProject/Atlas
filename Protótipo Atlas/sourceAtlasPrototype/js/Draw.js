
function onClick() {
    var location = document.getElementById("canvas");
    var figure = location.getContext("2d");
    CanvasRenderingContext2D.lineWidth = 3;
    
    figure.rect(40, 30, 40, 20);
    figure.stroke();
}

