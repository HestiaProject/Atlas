function closeFileModalButtonClick() {
    document.getElementById("loadFileModal").style.display = "none";
    document.getElementById("myDiagramDiv").style.marginTop = "0px";
};

function closeFeatureModalButtonClick() {
    document.getElementById("featureModal").style.display = "none";
    document.getElementById("myDiagramDiv").style.marginLeft = "0px";
};

function closeAssociationModalButtonClick() {
    document.getElementById("associationModal").style.display = "none";
    document.getElementById("myDiagramDiv").style.marginLeft = "0px";
};

window.onclick = function(event) {

    switch (event.target) {
        case document.getElementById("featureModal"):
            closeFeatureModalButtonClick();
            break;
        case document.getElementById("associationModal"):
            closeAssociationModalButtonClick();
            break;
        case document.getElementById("loadFileModal"):
            closeFileModalButtonClick()
            break;
        default:
            break;
    }

};