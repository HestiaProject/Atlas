function Model(name) {
    this.name = name;
    this.listFeatures = [];
    this.listAssociations = [];
}

Model.prototype.getName = function () {
    return this.name;
}
Model.prototype.addFeature = function (feature) {
    if (feature != undefined) {
        this.listFeatures.push(feature);
        return true;
    } else {
        return false;
    }
}

Model.prototype.removeFeature = function (feature) {

    this.removeAssociation(feature);
    var featureIndex = this.listFeatures.indexOf(feature);

    this.listFeatures.splice(featureIndex, 1);

}

Model.prototype.removeAssociation = function (feature) {

    for (var i = 0; i < this.listAssociations.length; i++) {
        var a = this.listAssociations[i];
        if (a.getParentName() == feature.getName() || a.getChildName() == feature.getName()) {
            this.listAssociations.splice(i, 1);
            i = 0;
        }
    }
}

Model.prototype.removeAssociationByAssociation = function (association) {

    var associationIndex = this.listAssociations.indexOf(association);

    this.listAssociations.splice(associationIndex, 1);
}



Model.prototype.addAssociation = function (association) {
    if (association != undefined) {
        this.listAssociations.push(association);
        return true;
    } else {
        return false;
    }
}

Model.prototype.getAssociations = function () {

    return this.listAssociations;

}

Model.prototype.getFeatures = function () {

    return this.listFeatures;

}

Model.prototype.findFeature = function (string) {

    for (var i = 0; i < this.listFeatures.length; i++) {
        var f1 = this.listFeatures[i];
        if (f1.getName().toUpperCase() == string.toUpperCase()) {
            return f1;
        }

    }
    return false;

}

Model.prototype.findAssociation = function (f1, f2) {

    var f1 = this.findFeature(f1);
    var f2 = this.findFeature(f2);
    for (var i = 0; i < this.listAssociations.length; i++) {
        var a1 = this.listAssociations[i];
        var parent = a1.getParentName();
        var child = a1.getChildName();
        if (f1.getName().toUpperCase() == parent.toUpperCase() && f2.getName().toUpperCase() == child.toUpperCase()) {
            return a1;
        }

    }
    return false;

}

Model.prototype.contain = function (string) {

    for (var i = 0; i < this.listFeatures.length; i++) {
        var f1 = this.listFeatures[i];
        if (f1.getName().toUpperCase() == string.toUpperCase()) {
            return i;
        }

    }

    return -1;

}

Model.prototype.replace = function (f1, f2) {

    for (var i = 0; i < this.listFeatures.length; i++) {
        var feature = this.listFeatures[i];
        if (f1.getName() == feature.getName) {
            this.listFeatures[i] = f2;
            break;
        }

    }

}


Model.prototype.updateFeature = function (f1) {

    for (var i = 0; i < this.listFeatures.length; i++) {
        var feature = this.listFeatures[i];
        if (f1.getName() == feature.getName) {
            this.listFeatures[i] = f1;
            break;
        }

    }

}

//NEW

// Model.prototype.selectCells = function(edge, target){
//     if (e.code == "KeyF") {
//         console.log(edge);
//     }
// }

// // document.addEventListener('keydown', function (e) {
// //     console.log(e);
// //     //  if(e.code == "Delete"){
         
// //     //  }
// // }, false);

// Model.prototype.isConnectable = function (connectable) {
//     document.addEventListener('keydown', function (e) {
//         if (e.code == "KeyI") {
//             console.log(connectable);
//         }
//     }, false);
// }