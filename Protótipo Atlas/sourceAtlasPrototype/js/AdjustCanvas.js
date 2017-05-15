var canvas = document.getElementById("myDiagramDiv");

function adjustCanvas(){
    var height = window.innerHeight;
    var width = window.innerWidth;

    width -= 90;
    height -= 90;   

    canvas.style.width = width.toString()+"px";
    canvas.style.height = height.toString()+"px";
}

window.onresize = function(){
    adjustCanvas();
}