 var topBarIcons = document.getElementById("topBarIconGroup");
 var topBarIconsSmall = document.getElementById("topBarIconGroupSmall");
 var tooltips = document.getElementsByClassName("tooltip");


 function adjustSizes() {
     var canvas = document.getElementById("myDiagramDiv");
     var modelName = document.getElementById("modelName");
     var textArea = document.getElementsByTagName("textArea")
     var height = window.innerHeight;
     var width = window.innerWidth;

     canvasWidth = width - 90;
     canvasHeight = height - 95;

     canvas.style.width = canvasWidth + "px";
     canvas.style.height = canvasHeight + "px";

     textArea[0].style.width = canvasWidth-5 + "px"; 
     textArea[1].style.width = canvasWidth-5 + "px";
     

     //  center model name input text
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
     adjustTooltips();
 }

 adjustTooltips = function() {

     // center tooltip
     var height = window.innerHeight;
     var width = window.innerWidth;
     var top;
     var left;

     top = 66 + 68 + 34 - tooltips[7].clientHeight / 2;

     tooltips[7].style.top = top + "px";

     left = width - ((5 * 57) + (57 / 2) + (tooltips[0].clientHeight / 2));
     tooltips[0].style.left = left + "px";

     left = width - ((4 * 57) + (57 / 2) + (tooltips[0].clientHeight / 2));
     tooltips[1].style.left = left + "px";

     left = width - ((3 * 57) + (57 / 2) + (tooltips[0].clientHeight / 2));
     tooltips[2].style.left = left + "px";

 }