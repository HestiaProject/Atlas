(function () {

    var menu = document.querySelector("#rightClickMenuCanvas");
    var menuState = 0;
    var active = "rightClickMenuCanvasActive";

    function rightClickEvent() {
        document.addEventListener("contextmenu", function (e) {
            console.log(e);
            e.preventDefault();
            positionMenu(e);
            toggleMenuOn();
        });
    }

    function escEvent() {
        window.onkeyup = function (e) {
            if (e.keyCode === 27) {
                toggleMenuOff();
            }
        }
    }


    function toggleMenuOn() {
        if (menuState !== 1) {
            menuState = 1;
            menu.classList.add(active);
        }
    }

    function toggleMenuOff() {
        if (menuState !== 0) {
            menuState = 0;
            menu.classList.remove(active);
        }
    }


    function positionMenu(e) {
        var x = e.clientX,
            y = e.clientY;
        menu.style.top = (y + 20) + 'px';
        menu.style.left = (x + 20) + 'px';
    }

    function clickListener() {
        document.addEventListener("click", function (e) {
            console.log(e);
            toggleMenuOff();
        });
    }


    rightClickEvent();
    clickListener();
    escEvent();

})();


