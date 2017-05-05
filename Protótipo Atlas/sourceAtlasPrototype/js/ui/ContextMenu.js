(function () {

    var clickedItem;
    var canvasClassName = "canvas";

    // initial contextMenu hide;
    var menuState = 0;
    var contextMenuActive = "contextMenuActive";
    var menu = document.querySelector("#contextMenu");

    // Initialise listeners
    function init() {
        contextListener();
        clickListener();
        keyupListener();
        // resizeListener();       
    }

    // e is the event
    function contextListener() {
        document.addEventListener("contextmenu", function (e) {
            clickedItem = clickInsideElement(e, canvasClassName);
             e.preventDefault();
            //if on canvas cancel browser contextmenu and open custom
            if (clickedItem) {
                // e.preventDefault();
                toggleMenuOn();
                positionMenu(e);
            } else {
                clickedItem = null;
                toggleMenuOff();
            }
        });
    }


    function clickListener() {
        document.addEventListener("click", function (e) {
            console.log(e);
        });
    }

    // Esc hide custom contextmenu
    function keyupListener() {
        window.onkeyup = function (e) {
            if (e.keyCode === 27) {
                toggleMenuOff();
            }
        }
    }

    // Show contextMenu
    function toggleMenuOn() {
        if (menuState !== 1) {
            menuState = 1;
            menu.classList.add(contextMenuActive);
        }
    }

    // Hide contextMenu
    function toggleMenuOff() {
        if (menuState !== 0) {
            menuState = 0;
            menu.classList.remove(contextMenuActive);
        }
    }

    // run
    init();

})