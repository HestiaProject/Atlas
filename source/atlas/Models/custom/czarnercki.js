var seed = 0;
var selectedElement = undefined;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;
var svg;
var atual;
var html_id;
var penUltimo =1;
var ultimo = 2;
var count = 0;
var auxC = 0;
var teste99;
var array = new Array(100);
var auxAuxUlt;
var setAux;
var auxP;

var quantF = 0;
var quantFOR = 0;
var quantFXOR = 0;
var quantOp = 0;
var quantOpOR = 0;
var quantOpXOR = 0;
var quantMan = 0;
var quantManOR = 0;
var quantManXOR = 0;

var click=false; // flag to indicate when shape has been clicked
var clickX, clickY; // stores cursor location upon first click
var moveX=0, moveY=0; // keeps track of overall transformation
var lastMoveX=0, lastMoveY=0; // stores previous transformation (move)

var elementWithFocus = null;

for (var i = 0; i < 100; i++) {
    array[i] = new Array(100);
}

$(document).ready(function() {

    $("#btn_new").button({
        icons: {
            primary: "ui-icon-document"
        }
    });
    $("#btn_save").button({
        icons: {
            primary: "ui-icon-disk"
        }
    });
	$("#btn_community").button({
        icons: {
            primary: "ui-icon-disk"
        }
    });
    $("#btn_open").button({
        icons: {
            primary: "ui-icon-folder-open"
        }
    });
    $("#btn_validate").button({
        icons: {
            primary: "ui-icon-circle-check"
        }
    });
    $("#btn_add_feature").click(function() {
        var feature1 = new Feature();
		feature1.initialize(0);
		setToolTipe
    });
	
	$("#btn_add_featureOp").click(function() {
        var feature1 = new Feature();
		feature1.initialize(2);
    });
	
	
	$("#btn_add_featureMand").click(function() {
        var feature1 = new Feature();
		feature1.initialize(1);
    });
	
	
	$("#btn_add_featureMandSemiWhite").click(function() {
        var feature1 = new Feature();
		feature1.initialize(4);
    });
	
	
	
	$("#btn_add_featureMandSemiBlack").click(function() {
        var feature1 = new Feature();
		feature1.initialize(8);
    });
	
	
		
	$("#btn_add_featureOpSemiBlack").click(function() {
        var feature1 = new Feature();
		feature1.initialize(3);
    });
	
	$("#btn_add_featureSemiBlack").click(function() {
        var feature1 = new Feature();
		feature1.initialize(5);
    });
	
	
	$("#btn_add_featureSemiWhite").click(function() {
        var feature1 = new Feature();
		feature1.initialize(7);
    });
	
    $("#btn_add_featureOpSemiWhite").click(function() {
        var feature1 = new Feature();
		feature1.initialize(6);
    });
	
	
	$("#btn_set_name").click(function(){
		var nNome = prompt("Please enter your feature's name(Limit 14 characters)", 'Feature Name');
		while ( nNome.length>14){
		
		var nNome = prompt("Character limit exceeded(Limit 14 characters)", 'Feature Name');
		
		}
		setName(nNome);
	});
	
    $("#btn_make_child").click(function() {
        count++;
        var auxLinha;

        // Makes a line
	   var compU = setAux.attr('nivel');
	   var compP = auxP.attr('nivel');
       var p = setAux.attr('tp')
	    if( p == 0 && compU && compP == 0 || p == 0 && compP < compU || compU == 0 ){
		var no = auxP.attr('nivel');
		no++;
		setAux.attr('nivel', no);
		setAux.attr('tp',1);
		//console.log(setAux.attr('nivel'));
		if(penUltimo != ultimo){
        var coords = calculateLine(($("#" + penUltimo)), ($("#" + ultimo)));
        makeLine(coords, penUltimo, ultimo);
        var auxPen = penUltimo;
        auxPen = auxPen.split("feature");
        auxPen = auxPen[1].split("mask");
        auxPen = parseInt(auxPen[0]);
        array[auxPen].push(ultimo);
		}
		}
    });
 
	
    $("#btn_remove_feature").click(function() {
        this.svg = document.getElementById('diagsvg');
        var tmpsvg = document.getElementById(ultimo);
        var par = tmpsvg.parentNode;
        par.removeChild(tmpsvg);
    });
	
	$("#btn_set_normal").click(function(){
       setTipo(0);
    });
	$("#btn_set_optional").click(function(){
       setTipo(1);
    });
	$("#btn_set_mandatory").click(function(){
       setTipo(2);
    });
	$("#btn_set_mandsemiwhite").click(function(){
       setTipo(4);
    });
	$("#btn_set_mandsemiblack").click(function(){
       setTipo(8);
    });
	$("#btn_set_opsemiblack").click(function(){
       setTipo(3);
    });
	$("#btn_set_semiblack").click(function(){
       setTipo(5);
    });
	$("#btn_set_semiwhite").click(function(){
       setTipo(7);
    });
	$("#btn_set_opsemiwhite").click(function(){
       setTipo(6);
    });
	
	
	
$("select")
    .change(function() {
        var str = "";
        $("select option:selected").each(function() {
            str += $(this).text() + " ";
        });
		
        // $( "div" ).text( str );
       //  console.log(str);
		if(str=='FODA'){
			console.log("sahshasu");	
		}
    })
    .change();
    $("#diagram").css("height", $(window).height() - 90);
    $("#diagram").css("width", $(window).width() - 200);
	
	$(document).contextmenu({
		delegate: ".xxx", //classe ou id
		hide: { effect: "explode", duration: "slow" },
		menu: "#context_menu_feature",
		position: function(event, ui){
			return {my: "left top", at: "left bottom", of: ui.target};
		},
		preventSelect: true,
		show: { effect: "fold", duration: "slow"},
		taphold: true,
		uiMenuOptions: { // Additional options, used when UI Menu is created
			position: { my: "left top", at: "right+10 top+10" }
		},
		focus: function(event, ui) {
			var menuId = ui.item.find(">a").attr("href");
			$("#info").text("focus " + menuId);
			//console.log("focus", ui.item);
		},
		blur: function(event, ui) {
			$("#info").text("");
			//console.log("blur", ui.item);
		}
	});
});

function setName(nNome){
	setAux[0].childNodes[3].innerHTML = nNome;
	
	console.log(setAux[0].childNodes[3].innerHTML);
}

function DiminuirTipo(tipo){
    if(tipo == 0){
        quantF--;
    }else if(tipo == 1){
        quantMan--;
    }else if(tipo == 2){
        quantOp--;
    }else if(tipo == 3){
        quantOpOR--;
    }else if(tipo == 4){
        quantManXOR--;
    }else if(tipo == 5){
        quantFOR--;
    }else if(tipo == 6){
        quantOpXOR--;
    }else if(tipo == 7){
        quantFXOR--;
    }else {
        quantManOR--;
    }

}


function setTipo(flag){
	

	if(flag==0){
        console.log(quantF);
        DiminuirTipo(setAux.attr('type'));
        quantF++;
        console.log(quantF);
		setAux[0].setAttribute("type","0");
		setAux[0].childNodes[2].setAttribute("stroke","transparent");
		setAux[0].childNodes[2].setAttribute("fill","transparent");
		setAux[0].childNodes[0].setAttribute("stroke","transparent");
		setAux[0].childNodes[0].setAttribute("fill","transparent");
	}else if(flag==1){
        console.log(quantMan);
        DiminuirTipo(setAux.attr('type'));
        quantMan++;
        console.log(quantMan);
		setAux[0].setAttribute("type","1");
		setAux[0].childNodes[2].setAttribute("stroke","black");
		setAux[0].childNodes[2].setAttribute("fill","transparent");
		setAux[0].childNodes[0].setAttribute("stroke","transparent");
		setAux[0].childNodes[0].setAttribute("fill","transparent");		
	}else if(flag==2){
        console.log(quantOp);
        DiminuirTipo(setAux.attr('type'));
        quantOp++;
        console.log(quantOp); 
		setAux[0].setAttribute("type","2");
		setAux[0].childNodes[2].setAttribute("stroke","black");
		setAux[0].childNodes[2].setAttribute("fill","black");
		setAux[0].childNodes[0].setAttribute("stroke","transparent");
		setAux[0].childNodes[0].setAttribute("fill","transparent");		
	}	else if(flag==3){
        console.log(quantOpOR);
        DiminuirTipo(setAux.attr('type'));
        quantOpOR++;
        console.log(quantOpOR); 
		setAux[0].setAttribute("type","3");
		setAux[0].childNodes[2].setAttribute("stroke","black");
		setAux[0].childNodes[2].setAttribute("fill","transparent");
		setAux[0].childNodes[0].setAttribute("stroke","black");
		setAux[0].childNodes[0].setAttribute("fill","black");
	}else if(flag==4){
        console.log(quantManXOR);
        DiminuirTipo(setAux.attr('type'));
        quantManXOR++;
        console.log(quantManXOR); 
		setAux[0].setAttribute("type","4");
		setAux[0].childNodes[2].setAttribute("stroke","black");
		setAux[0].childNodes[2].setAttribute("fill","black");
		setAux[0].childNodes[0].setAttribute("stroke","black");
		setAux[0].childNodes[0].setAttribute("fill","transparent");
	}else if(flag==5){
        console.log(quantFOR);
        DiminuirTipo(setAux.attr('type'));
        quantFOR++;
        console.log(quantFOR); 
		setAux[0].setAttribute("type","5");
		setAux[0].childNodes[2].setAttribute("stroke","transparent");
		setAux[0].childNodes[2].setAttribute("fill","transparent");
		setAux[0].childNodes[0].setAttribute("stroke","black");
	    setAux[0].childNodes[0].setAttribute("fill","black");
	}else if(flag==6){
        console.log(quantOpXOR);
        DiminuirTipo(setAux.attr('type'));
        quantOpXOR++;
        console.log(quantOpXOR); 
		setAux[0].setAttribute("type","6");
		setAux[0].childNodes[2].setAttribute("stroke","black");
		setAux[0].childNodes[2].setAttribute("fill","transparent");
		setAux[0].childNodes[0].setAttribute("stroke","black");
	    setAux[0].childNodes[0].setAttribute("fill","transparent");
	}else if(flag==7){
        console.log(quantFXOR);
        DiminuirTipo(setAux.attr('type'));
        quantFXOR++;
        console.log(quantFXOR); 
		setAux[0].setAttribute("type","7");
		setAux[0].childNodes[2].setAttribute("stroke","transparent");
		setAux[0].childNodes[2].setAttribute("fill","transparent");
		setAux[0].childNodes[0].setAttribute("stroke","black");
	    setAux[0].childNodes[0].setAttribute("fill","transparent");
	}else if(flag==8){
        console.log(quantManOR);
        DiminuirTipo(setAux.attr('type'));
        quantManOR++;
        console.log(quantManOR); 
		setAux[0].setAttribute("type","8");
		setAux[0].childNodes[2].setAttribute("stroke","black");
		setAux[0].childNodes[2].setAttribute("fill","black");
		setAux[0].childNodes[0].setAttribute("stroke","black");
	    setAux[0].childNodes[0].setAttribute("fill","black");
	}
}

function remove(ultimo) {
    this.svg = document.getElementById('diagsvg');
    //svg.childNodes
    var tmpsvg = document.getElementById(ultimo);
    var par = tmpsvg.parentNode;
    par.removeChild(tmpsvg);
}

function makeLine(coords, lineParent, lineChild) {
    var line;
    var auxSeed = "feature" + count;
    this.svg = document.getElementById('diagsvg');
    this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this.line.setAttribute('id', auxSeed + "line");
    this.line.setAttribute('fill', 'black');
    this.line.setAttribute('x1', coords[0]);
    this.line.setAttribute('y1', coords[1]);
    this.line.setAttribute('x2', coords[2]);
    this.line.setAttribute('y2', coords[3]);
    this.line.setAttribute('stroke', 'black');
    this.line.setAttribute('stroke-width', '1');
    this.line.setAttribute("parent", lineParent);
    this.line.setAttribute("child", lineChild);
    this.line.setAttribute('class', 'draggable xxx ');
    this.line.setAttribute('transform', 'matrix(1 0 0 1 0 0)');
    this.line.setAttribute('onmousedown', 'selectElement(evt)');
    this.svg.appendChild(this.line);



}

function calculateLine(featureParent, featureChild) {
    var lineCoords = new Array(4);
    var x1;
    var y1;
    var x2;
    var y2;

    featureParent = (featureParent.attr("transform"));
    featureParent = featureParent.split("matrix(1 0 0 1 ");
    featureParent = featureParent[1].split(" ");
    var x1 = featureParent[0];
    var y1 = featureParent[1].split(")")[0];
    x1 = parseInt(x1);
    y1 = parseInt(y1);
    x1 = x1 + 250;
    y1 = y1 + 250;



    featureChild = (featureChild.attr("transform"));
    featureChild = featureChild.split("matrix(1 0 0 1 ");
    featureChild = featureChild[1].split(" ");
    var x2 = featureChild[0];
    var y2 = featureChild[1].split(")")[0];
    x2 = parseInt(x2);
    y2 = parseInt(y2);
    x2 = x2 + 250;
    y2 = y2 + 200;


    //x1
    lineCoords[0] = x1;
    //y1
    lineCoords[1] = y1;
    //x2
    lineCoords[2] = x2;
    //y2
    lineCoords[3] = y2;


    return lineCoords;


}

//Mouse Click SVG
function selectElement(evt) {
	evt.preventDefault();
    elementWithFocus = evt.target;
    currentX = evt.clientX;
    currentY = evt.clientY;
	clickX = evt.clientX;
	clickY = evt.clientY;
    if ($(elementWithFocus.parentNode).prop("tagName") == "g") {
        //console.log('tem classe');

        elementWithFocus = $(elementWithFocus.parentNode)
    }
    if (elementWithFocus.prop && elementWithFocus.prop("tagName") == "g") {
        currentMatrix = elementWithFocus.attr("transform").slice(7, -1).split(' ');
    } else {
        currentMatrix = elementWithFocus.getAttributeNS(null, "transform").slice(7, -1).split(' ');
    }
    for (var i = 0; i < currentMatrix.length; i++) {
        currentMatrix[i] = parseFloat(currentMatrix[i]);
    }

    if (elementWithFocus.prop && elementWithFocus.prop("tagName") == "g") {
		//elementWithFocus.attr("onmousemove", "moveElement(evt)");
		document.onmousemove = moveElement;
        elementWithFocus.attr("onmouseout", "deselectElement(evt)");
        elementWithFocus.attr("onmouseup", "deselectElement(evt)");
    } else {
		document.onmousemove = null;
        //elementWithFocus.setAttributeNS(null, "onmousemove", "moveElement(evt)");
        elementWithFocus.setAttributeNS(null, "onmouseout", "deselectElement(evt)");
        elementWithFocus.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
    }
	 auxAuxUlt= ($(elementWithFocus).attr("id"));
	if(auxAuxUlt!=ultimo){
	  auxP = setAux;
	  penUltimo = ultimo;
	}
	  ultimo = ($(elementWithFocus).attr("id"));
	
	setAux = elementWithFocus;
	
	
    /*
		var auxPen = penUltimo;
		auxPen = auxPen.split("feature");
		auxPen = auxPen[1].split("mask");
		auxPen = parseInt(auxPen[0]);
		
		for(var i =0;i<array[auxPen].length;i++)
		{
			console.log(array[auxPen][i]);
		}
	*/
}

function moveElement(evt) {
	evt.preventDefault();
    var dx = evt.clientX - currentX;
    var dy = evt.clientY - currentY;
    currentMatrix[4] += dx;
    currentMatrix[5] += dy;
	moveX = lastMoveX + ( evt.clientX - currentX );
	moveY = lastMoveY + ( evt.clientY - currentY );
	click = true;
	
    if (elementWithFocus.prop("tagName") == "g") {
        elementWithFocus.attr("transform", "matrix(" + currentMatrix.join(' ') + ")");
		//elementWithFocus.attr("transform", "translate(" + dx + "," + dy + ")");
    } else {
        elementWithFocus.attr( "transform", "matrix(" + currentMatrix.join(' ') + ")");
    }
    
    currentX = evt.clientX;
    currentY = evt.clientY;

    var listLines = [];

    this.svg = document.getElementById('diagsvg');
    var aux = this.svg.childNodes;
    for (var i = 0; i < aux.length; i++) {
        if (aux[i].nodeName == "line") {
            if (($(aux[i]).attr("parent") == ultimo) || ($(aux[i]).attr("child") == ultimo)) {
                listLines.push(aux[i]);
            } else {
                listLines.push(aux[i]);
            }
        }
    }
	
	
	
	

    for (var i = 0; i < listLines.length; i++) {
        var currentChecking = $(listLines[i]);
        var auxParent = (currentChecking.attr("parent"));
        var auxChild = (currentChecking.attr("child"));
        remove((currentChecking.attr("id")));
        var coords = calculateLine(($("#" + auxParent)), ($("#" + auxChild)));
        makeLine(coords, auxParent, auxChild);
    }


}
	
function endMove(evt){
        if(evt.type == 'mouseout' && click) {
            return;
        }
		click=false;
        elementWithFocus = null;
		lastMoveX = moveX;
		lastMoveY = moveY;
    }

function deselectElement(evt) {
if(evt.type == 'mouseout' && click) {
            return;
        }
		click=false;
        elementWithFocus = null;
		

    }
	
var Feature = function(flag) {
    var label;
    var fx;
    var fy;
    var optcircle; //circulo de mandatorio/opcional
    var optLabel; //Label
    var optSemi;
    var mascara;
    var rect;
    var test;
	var text;

    //------------------ SETS
    this.setX = function(coordx) {
        this.fx = coordx;
        update(this);
    }
    this.setY = function(coordy) {
        this.fy = coordy;
        update(this);
    }

    //------------------ GETS
    this.getX = function() {
        return this.fx;
    }
    this.getY = function() {
        return this.fy;
    }

    //------------------ ctor. must be call'd
    this.initialize = function(flag) {
        this.svg = document.getElementById('diagsvg'); //diagrama
        this.text = "feature" + seed; //gera id
        seed++; //incrementa para proximo a ser criado

        //seta coordenadas iniciais
        this.fx = 200;
        this.fy = 200;
        //inicializa objetos graficos

        //this.makeGroupModifier();
        //this.makeMainBox();
        //this.makeOptCircle();
        //this.makeLabel();
        this.makeMask(flag);
        //this.makeTest();


        $("#" + html_id + "test").draggable();

        if (this.mascara) {} else {
            // console.log(this.html_id);
        }
    }



    this.makeMainBox = function() {
        //$("#diagsvg").append('<svg:rect x="300" y="300" width="100" height="50" fill="#ccc" stroke-width="2" stroke="#000"></svg:rect>');
        //retangulo que representa a feature
        this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.rect.setAttribute('id', this.text + "rect");
        this.rect.setAttribute('fill', 'white');
        this.rect.setAttribute('stroke', 'black');
        this.rect.setAttribute('x', 200);
        this.rect.setAttribute('y', 200);
        this.rect.setAttribute('width', 100);
        this.rect.setAttribute('height', 50);
        this.rect.setAttribute('transform', 'matrix(1 0 0 1 0 0)');
        this.rect.setAttribute("style", "position:relative");
        if (this.mascara) {
            this.mascara.appendChild(this.rect);
        } else {
            this.rect.setAttribute('onmousedown', 'selectElement(evt)');
            this.svg.appendChild(this.rect);
        }
    }

  

    this.makeLabel = function() {
        //$("#diagsvg").append('<text x="310" y="330" fill="black">Vlad the best</text>');
        //cria texto com nome da feature
		var name = this.text;
        this.optLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.optLabel.setAttribute('id', this.text + "optLabel");
        this.optLabel.setAttribute('x', 220);
        this.optLabel.setAttribute('y', 225);
		this.optLabel.setAttribute("text-anchor","middle");
        this.optLabel.setAttribute("x","250");
		this.optLabel.setAttribute("y","230");
        this.optLabel.setAttribute('fill', "black");
        var textNode = document.createTextNode(name + "text");
        this.optLabel.appendChild(textNode);
        this.optLabel.setAttribute('transform', 'matrix(1 0 0 1 0 0)');
        if (this.mascara) {
            this.mascara.appendChild(this.optLabel);
        } else {
            this.optLabel.setAttribute('onmousedown', 'selectElement(evt)');
            this.svg.appendChild(this.optLabel);
        }
    }

	 this.makeGroupModifier = function(flag) {
        //$("#diagsvg").append('<svg:circle id="' + this.html_id + 'group" cx="350" cy="340" r="20" fill="black" stroke="#000"/>');
        //cria modificador de or, xor e and
        this.optSemi = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this.optSemi.setAttribute('id', this.text + "optSemi");
        this.optSemi.setAttribute('cx', 250);
        this.optSemi.setAttribute('cy', 250);
        this.optSemi.setAttribute('r', 25);
        
		
        if(flag==0){
            this.optSemi.setAttribute('fill', 'transparent');
            this.optSemi.setAttribute('stroke', 'transparent');
			}
			else if(flag==1){
            this.optSemi.setAttribute('fill', 'transparent');
            this.optSemi.setAttribute('stroke', 'transparent');
			}
			else if(flag==2){
            this.optSemi.setAttribute('fill', 'transparent');
            this.optSemi.setAttribute('stroke', 'transparent');
			}
			else if(flag==3){
            this.optSemi.setAttribute('fill', 'black');
            this.optSemi.setAttribute('stroke', 'black');
			}
			else if(flag==4){
            this.optSemi.setAttribute('fill', 'transparent');
            this.optSemi.setAttribute('stroke', 'black');
			}
            else if(flag==5){
            this.optSemi.setAttribute('fill', 'black');
            this.optSemi.setAttribute('stroke', 'black');
			}
			else if(flag==6){
            this.optSemi.setAttribute('fill', 'transparent');
            this.optSemi.setAttribute('stroke', 'black');
			}
			else if(flag==7){
            this.optSemi.setAttribute('fill', 'transparent');
            this.optSemi.setAttribute('stroke', 'black');
			}
			else if(flag==8){
            this.optSemi.setAttribute('fill', 'black');
            this.optSemi.setAttribute('stroke', 'black');
			}
			
        if (this.mascara) {
            this.mascara.appendChild(this.optSemi);
        } else {
            this.optSemi.setAttribute('onmousedown', 'selectElement(evt)');
            this.svg.appendChild(this.optSemi);
        }
    }
	
    this.makeOptCircle = function(flag) {
            //$("#diagsvg").append('<circle cx="350" cy="300" r="5" stroke="#000" stroke-width="2" fill="#000" />');
            //cria circulo de mandatorio

            this.optcircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            this.optcircle.setAttribute('id', this.text + "optcircle");
            this.optcircle.setAttribute('cx', 250);
            this.optcircle.setAttribute('cy', 193);
            this.optcircle.setAttribute('r', 7);
			if(flag==0){
            this.optcircle.setAttribute('fill', 'transparent');
            this.optcircle.setAttribute('stroke', 'transparent');
			}
			else if(flag==1){
            this.optcircle.setAttribute('fill', 'black');
            this.optcircle.setAttribute('stroke', 'black');
			}
			else if(flag==2){
            this.optcircle.setAttribute('fill', 'transparent');
            this.optcircle.setAttribute('stroke', 'black');
			}
			else if(flag==3){
            this.optcircle.setAttribute('fill', 'transparent');
            this.optcircle.setAttribute('stroke', 'black');
			}
			else if(flag==4){
            this.optcircle.setAttribute('fill', 'black');
            this.optcircle.setAttribute('stroke', 'black');
			}
            else if(flag==5){
            this.optcircle.setAttribute('fill', 'transparent');
            this.optcircle.setAttribute('stroke', 'transparent');
			}
			else if(flag==6){
            this.optcircle.setAttribute('fill', 'transparent');
            this.optcircle.setAttribute('stroke', 'black');
			}
			else if(flag==7){
            this.optcircle.setAttribute('fill', 'transparent');
            this.optcircle.setAttribute('stroke', 'transparent');
			}
			else if(flag==8){
            this.optcircle.setAttribute('fill', 'black');
            this.optcircle.setAttribute('stroke', 'black');
			}
						
			
            if (this.mascara) {
                this.mascara.appendChild(this.optcircle);
            } else {
                this.optcircle.setAttribute('onmousedown', 'selectElement(evt)');
                this.svg.appendChild(this.optcircle);
            }
        }
        //Parte da mascara para mover todos a "figura" se trocar  o rect  por 'g' se cria um grupo, mas não sei o modo de mover o grupo
    this.makeMask = function(flag) {
        this.mascara = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.mascara.setAttribute('id', this.text + "mask");
        aux = this.text + "mask";
        this.mascara.setAttribute('class', 'draggable xxx ');
		this.mascara.setAttribute('type', flag);
        this.mascara.setAttribute('x', 200);
        this.mascara.setAttribute('y', 190);
        this.mascara.setAttribute('width', 100);
        this.mascara.setAttribute('height', 85);
        this.mascara.setAttribute('parent', 'makeMask()');
        this.mascara.setAttribute('transform', 'matrix(1 0 0 1 0 0)');
        this.mascara.setAttribute('onmousedown', 'selectElement(evt)');
		this.mascara.setAttribute('nivel', 0);
	    this.mascara.setAttribute('tp',0);
		if(flag==0){
            quantF++;
			this.makeGroupModifier(flag);
            this.makeMainBox();
			this.makeOptCircle(flag);
            this.makeLabel();
        }
		else if(flag==1){
            quantMan++;
            this.makeGroupModifier(flag);
            this.makeMainBox();
			this.makeOptCircle(flag);
            this.makeLabel();            
		}
		else if(flag==2){
            quantOp++;
            this.makeGroupModifier(flag);
            this.makeMainBox();
			this.makeOptCircle(flag);
            this.makeLabel();
		}
		else if(flag==3){
            quantOpOR++;
            this.makeGroupModifier(flag);
            this.makeMainBox();
			this.makeOptCircle(flag);
            this.makeLabel();
		}
		else if(flag==4){
            quantManXOR++;
            this.makeGroupModifier(flag);
            this.makeMainBox();
			this.makeOptCircle(flag);
            this.makeLabel();
		}
        else if(flag==5){
            quantFOR++;
            this.makeGroupModifier(flag);
            this.makeMainBox();
			this.makeOptCircle(flag);
            this.makeLabel();
		}
		else if(flag==6){
            quantOpXOR++;
            this.makeGroupModifier(flag);
            this.makeMainBox();
			this.makeOptCircle(flag);
            this.makeLabel();
		}
		else if(flag==7){
            quantFXOR++;
            this.makeGroupModifier(flag);
            this.makeMainBox();
			this.makeOptCircle(flag);
            this.makeLabel();
		}
		else if(flag==8){
            quantManOR++;
            this.makeGroupModifier(flag);
            this.makeMainBox();
			this.makeOptCircle(flag);
            this.makeLabel();            
		}
			
	    this.mascara.setAttribute("parent", "");
        this.mascara.setAttribute("child", "");
		
        this.svg.appendChild(this.mascara);
        }
    }




function update(x) {
    var vid = x.getId();
}