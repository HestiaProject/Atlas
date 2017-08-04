 // initial ajdust of positions;
 adjustSizes();
 adjustTooltips();

 // verify if the browser support mxGraph library
 if (!mxClient.isBrowserSupported()) {
     mxUtils.error('Browser is not supported!', 200, false);
 } else {
     // if supported create a base graph               
 }

// document.addEventListener('keydown', function (e) {
//     console.log(e);
//     //  if(e.code == "Delete"){
         
//     //  }
// }, false);