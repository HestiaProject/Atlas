var FeatureType = {
    MANDATORY: "mandatory",
    OPTIONAL: "optional",
    ALTERNATIVE: "alternative",
};

function Feature(name, type) {
    this.name = name;
    this.type = type;
    this.listAssociation;
};

Feature.prototype.setName = function(name){
    this.name = name;
};

Feature.prototype.setType = function(type){
    this.type = type;
};

Feature.prototype.getName = function () {
    return this.name;
};

Feature.prototype.getType = function () {
    return this.type;
};

Feature.prototype.addAssociation = function(association){
    this.listAssociation.push(association);
}
