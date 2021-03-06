var seed = 0;
var selectedElement = undefined;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;
var svg;
var atual;
var html_id;
var antPenUltimo = 1;
var penUltimo = 2;
var ultimo = 3;
var count = 0;
var auxC = 0;
var teste99;
var array = new Array(100);
var auxAuxUlt;
var setAux;
var auxAnt;
var auxP;

var quantF = 0;
var quantDyn = 0;
var quantSta = 0;

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
    });
	
	$("#btn_add_featureOp").click(function() {
        var feature1 = new Feature();
		feature1.initialize(1);
    });
	
	
	$("#btn_add_featureMand").click(function() {
        var feature1 = new Feature();
		feature1.initialize(2);
    });
	/*
    $("#btn_make_child").button({
        icons: {
            primary: "ui-icon-pencil"
        }
    }).click(function() {
        count++;
        var auxLinha;

        // Makes a line
		if(penUltimo != ultimo){
        var coords = calculateLine(($("#" + penUltimo)), ($("#" + ultimo)));
        makeLine(coords, penUltimo, ultimo);
        var auxPen = penUltimo;
        auxPen = auxPen.split("feature");
        auxPen = auxPen[1].split("mask");
        auxPen = parseInt(auxPen[0]);
        array[auxPen].push(ultimo);
		}
    });
	
    $("#btn_unlink_from_parent").button({
        icons: {
            primary: "ui-icon-circle-close"
        }
    });
    $("#btn_unlink_all_children").button({
        icons: {
            primary: "ui-icon-circle-close"
        }
    });*/
    /*$("#btn_remove_feature").button({
        icons: {
            primary: "ui-icon-circle-close"
        }
    }).click(function() {
        this.svg = document.getElementById('diagsvg');
        var tmpsvg = document.getElementById(ultimo);
        var par = tmpsvg.parentNode;
        par.removeChild(tmpsvg);
    });*/ 
	$("#btn_set_name").click(function(){

		var nNome = prompt("Please enter your feature's name(Limit 14 characters)", 'Feature Name');
		while ( nNome.length>14){
		
		var nNome = prompt("Character limit exceeded(Limit 14 characters)", 'Feature Name');
		
		}
		setName(nNome);
	
		
		
	});
	
	$("#btn_make_left").click(function() {
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
		console.log(setAux.attr('nivel'));
		if(penUltimo != ultimo){
        var coords = calculateLeftLine(($("#" + penUltimo)), ($("#" + ultimo)));
		//makeLineRect(coords,penUltimo);
        makeLeftLine(coords, penUltimo, ultimo);
        var auxPen = penUltimo;
        auxPen = auxPen.split("feature");
        auxPen = auxPen[1].split("mask");
        auxPen = parseInt(auxPen[0]);
        array[auxPen].push(ultimo);
		
		}
		}
    });
	
	$("#btn_make_right").click(function() {
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
        var coords = calculateRightLine(($("#" + penUltimo)), ($("#" + ultimo)));
		//makeLineRect(coords,penUltimo);
        makeRightLine(coords, penUltimo, ultimo);
        var auxPen = penUltimo;
        auxPen = auxPen.split("feature");
        auxPen = auxPen[1].split("mask");
        auxPen = parseInt(auxPen[0]);
        array[auxPen].push(ultimo);
		setTipo(3);
		
		}
		}
    });
	
	$("#btn_make_static").click(function() {
        count++;
        var auxLinha;
        // Makes a white rectangle
		if(penUltimo != ultimo){
        var coords = calculateLine(($("#" + penUltimo)), ($("#" + ultimo)));
        makeLine(coords, penUltimo, ultimo,0);
        var auxPen = penUltimo;
        auxPen = auxPen.split("feature");
        auxPen = auxPen[1].split("mask");
        auxPen = parseInt(auxPen[0]);
        array[auxPen].push(ultimo);
		
		}
    });
	
	$("#btn_remove_feature").click(function(){
        this.svg = document.getElementById('diagsvg');
        var tmpsvg = document.getElementById(ultimo);
        var par = tmpsvg.parentNode;
        par.removeChild(tmpsvg);
    });
	
	
	$("#btn_set_dynamic").click(function(){
       setTipo(2);
    });
	$("#btn_set_static").click(function(){
       setTipo(1);
    });
	$("#btn_set_normal").click(function(){
       setTipo(0);
    });
	
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
        quantSta--;
    }else{
        quantDyn--;
    }
}

function setTipo(flag){
	
	if(flag==0){
        console.log(quantF);
        DiminuirTipo(setAux.attr('type'));
        quantF++;
        console.log(quantF);
		setAux[0].setAttribute("type","0");
		setAux[0].childNodes[1].setAttribute("stroke","transparent");
		setAux[0].childNodes[1].setAttribute("fill","transparent");	
	}else if(flag==1){
        console.log(quantSta);
        DiminuirTipo(setAux.attr('type'));
        quantSta++;
        console.log(quantSta);
		setAux[0].setAttribute("type","1");
		setAux[0].childNodes[1].setAttribute("stroke","black");
		setAux[0].childNodes[1].setAttribute("fill","white");	
	}else if(flag ==2){
        console.log(quantDyn);
        DiminuirTipo(setAux.attr('type'));
        quantDyn++;
        console.log(quantDyn);
		setAux[0].setAttribute("type","2");
		setAux[0].childNodes[1].setAttribute("stroke","black");
		setAux[0].childNodes[1].setAttribute("fill","black");	
	}else if(flag ==3){
		setAux[1].childNodes[2].setAttribute("fill","black");

		
    }
	
}

function remove(ultimo) {
    this.svg = document.getElementById('diagsvg');
    //svg.childNodes
    var tmpsvg = document.getElementById(ultimo);
    var par = tmpsvg.parentNode;
    par.removeChild(tmpsvg);
}

function makeLeftLine(coords, rectParent, rectChild1) {
    var line;
    var auxSeed = "feature" + count;
    this.svg = document.getElementById('diagsvg');
    this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this.line.setAttribute('id', auxSeed + "line");
    this.line.setAttribute('fill', 'black');
	this.line.setAttribute('lado', 'l');
    this.line.setAttribute('x1', coords[0]);
    this.line.setAttribute('y1', coords[1]);
    this.line.setAttribute('x2', coords[2]);
    this.line.setAttribute('y2', coords[3]);
	//this.line.setAttribute('x3', coords[4]);
    //this.line.setAttribute('y3', coords[5]);
    this.line.setAttribute('stroke', 'black');
    this.line.setAttribute('stroke-width', '1');
    this.line.setAttribute("parent", rectParent);
    this.line.setAttribute("child", rectChild1);
	//this.line.setAttribute("child", rectChild2);
    this.line.setAttribute('class', 'draggable xxx');
    this.line.setAttribute('transform', 'matrix(1 0 0 1 0 0)');
    this.line.setAttribute('onmousedown', 'selectElement(evt)');
    this.svg.appendChild(this.line);

}

function makeRightLine(coords, rectParent, rectChild1) {
    var line;
    var auxSeed = "feature" + count;
    this.svg = document.getElementById('diagsvg');
    this.line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    this.line.setAttribute('id', auxSeed + "line");
    this.line.setAttribute('fill', 'black');
	this.line.setAttribute('lado', 'r');
    this.line.setAttribute('x1', coords[0]);
    this.line.setAttribute('y1', coords[1]);
    this.line.setAttribute('x2', coords[2]);
    this.line.setAttribute('y2', coords[3]);
    this.line.setAttribute('stroke', 'black');
    this.line.setAttribute('stroke-width', '1');
    this.line.setAttribute("parent", rectParent);
    this.line.setAttribute("child", rectChild1);
	//this.line.setAttribute("child", rectChild2);
    this.line.setAttribute('class', 'draggable xxx');
    this.line.setAttribute('transform', 'matrix(1 0 0 1 0 0)');
    this.line.setAttribute('onmousedown', 'selectElement(evt)');
    this.svg.appendChild(this.line);

}

function calculateLeftLine(featureParent, featureChild1, auxAnt) {
    var lineCoords = new Array(6);
    var x1;
    var y1;
    var x2;
    var y2;
    featureParent[0].childNodes[2].setAttribute('fill','black');
	featureParent = (featureParent.attr("transform"));
    featureParent = featureParent.split("matrix(1 0 0 1 ");
    featureParent = featureParent[1].split(" ");
    var x1 = featureParent[0];
    var y1 = featureParent[1].split(")")[0];
	
    x1 = parseInt(x1);
    y1 = parseInt(y1);
    x1 = x1 + 225;
    y1 = y1 + 293;
	

    featureChild1 = (featureChild1.attr("transform"));
    featureChild1 = featureChild1.split("matrix(1 0 0 1 ");
    featureChild1 = featureChild1[1].split(" ");
    var x2 = featureChild1[0];
    var y2 = featureChild1[1].split(")")[0];
    x2 = parseInt(x2);
    y2 = parseInt(y2);
    x2 = x2 + 275;
    y2 = y2 + 185;

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

function calculateRightLine(featureParent, featureChild1) {
    var lineCoords = new Array(4);
    var x1;
    var y1;
    var x2;
    var y2;
    featureParent[0].childNodes[2].setAttribute('fill','black');
    featureParent = (featureParent.attr("transform"));
    featureParent = featureParent.split("matrix(1 0 0 1 ");
    featureParent = featureParent[1].split(" ");
    var x1 = featureParent[0];
    var y1 = featureParent[1].split(")")[0];
    x1 = parseInt(x1);
    y1 = parseInt(y1);
    x1 = x1 + 325;
    y1 = y1 + 293;

    featureChild1 = (featureChild1.attr("transform"));
    featureChild1 = featureChild1.split("matrix(1 0 0 1 ");
    featureChild1 = featureChild1[1].split(" ");
    var x2 = featureChild1[0];
    var y2 = featureChild1[1].split(")")[0];
    x2 = parseInt(x2);
    y2 = parseInt(y2);
    x2 = x2 + 275;
    y2 = y2 + 185;

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
	auxAnt =elementWithFocus;
	setAux = elementWithFocus;
	
	return auxAnt;
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
    //console.log('selectedElement',selectedElement);
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
		if(currentChecking.attr("lado")=='r'){
			var coords = calculateRightLine(($("#" + auxParent)), ($("#" + auxChild)));
			makeRightLine(coords, auxParent, auxChild);
		}
		else if(currentChecking.attr("lado")=='l'){
			var coords = calculateLeftLine(($("#" + auxParent)), ($("#" + auxChild)));
			makeLeftLine(coords, auxParent, auxChild);
		}
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
		lastMoveX = moveX;
		lastMoveY = moveY;
		//elementWithFocus = undefined;

    }
   /*
    var  listLines = [];

    this.svg = document.getElementById('diagsvg');
	var aux = this.svg.childNodes;
	for(var i=0;i<aux.length;i++){
		if(aux[i].nodeName == "line"){
			if(($(aux[i]).attr("parent") == ultimo) || ($(aux[i]).attr("child")==ultimo)){
				listLines.push(aux[i]);
			}
		}	
	}
	
	for(var i=0;i<listLines.length;i++){
		var currentChecking = $(listLines[i]);
		var auxParent = (currentChecking.attr("parent"));
		var auxChild = (currentChecking.attr("child"));
		remove((currentChecking.attr("id")));
		var coords = calculateLine(($("#"+auxParent)),($("#"+auxChild)));
		makeLine(coords, auxParent, auxChild);	
	}

}*/


var Feature = function() {
    var label;
    var fx;
    var fy;
    var optRect; //retangulo
    var optLabel; //Label
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
	
		 this.makeMask(flag);
		
        $(function() {
  
		//Select the element of the page you want to make draggable and add the function 
		//.draggable() after that
			$("#" + html_id + "test").draggable();
		});

        //$("#" + html_id + "test").draggable();

        if (this.mascara) {} else {
            // console.log(this.html_id);
        }
    }
    
    this.makeLabel = function() {
        //$("#diagsvg").append('<text x="310" y="330" fill="black">Vlad the best</text>');
        //cria texto com nome da feature
		var name = this.text;
        this.optLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.optLabel.setAttribute('id', this.text + "optLabel");
        this.optLabel.setAttribute('x', 245);
        this.optLabel.setAttribute('y', 215);
		this.optLabel.setAttribute("text-anchor","middle");
        this.optLabel.setAttribute("x","276");
		this.optLabel.setAttribute("y","215");
        this.optLabel.setAttribute('fill', "black");
        var textNode = document.createTextNode(name + "text");
        this.optLabel.appendChild(textNode);
        this.optLabel.setAttribute('transform', 'matrix(1 0 0 1 0 0)');
        if (this.mascara) {
            this.mascara.appendChild(this.optLabel);
        } else {
            this.optLabel.setAttribute('onmousedown', 'mouseDown(evt)');
            this.svg.appendChild(this.optLabel);
        }
    }

	 this.makeOptRect = function(flag) {
            //$("#diagsvg").append('<circle cx="350" cy="300" r="5" stroke="#000" stroke-width="2" fill="#000" />');

            this.optRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            this.optRect.setAttribute('id', this.text + "optRect");
            this.optRect.setAttribute('x', 227);
            this.optRect.setAttribute('y', 185);
			this.optRect.setAttribute("width",100);
			this.optRect.setAttribute("height",50);

			if(flag==0){
				 this.optRect.setAttribute('fill', 'white');
				 this.optRect.setAttribute('stroke', 'black');
			}
           
            this.optRect.setAttribute('transform', 'matrix(1 0 0 1 0 0)');
            if (this.mascara) {
                this.mascara.appendChild(this.optRect);
            } else {
                this.optRect.setAttribute('onmousedown', 'selectElement(evt)');
                this.svg.appendChild(this.optRect);
            }
        }
	
	this.makeLineRect = function(flag){
		var optLineRect;
		var auxSeed = "feature" + count;
		this.svg = document.getElementById('diagsvg');
		this.optLineRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.optLineRect.setAttribute('id', auxSeed + "optLineRect");
		this.optLineRect.setAttribute('x', 225);
		this.optLineRect.setAttribute('y', 292);
		this.optLineRect.setAttribute("width",100);
		this.optLineRect.setAttribute("height",1);
		this.optLineRect.setAttribute('fill', 'transparent');
		this.optLineRect.setAttribute('stroke', 'transparent');
		if (this.mascara) {
                this.mascara.appendChild(this.optLineRect);
        } else {
                this.optLineRect.setAttribute('onmousedown', 'selectElement(evt)');
                this.svg.appendChild(this.optLineRect);
          }
		
	}
	
	
	this.makeLosangle = function(flag){
		this.optLos = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.optLos.setAttribute('id', this.text + "optLos");
        this.optLos.setAttribute('x', 190);
        this.optLos.setAttribute('y', 255);
		this.optLos.setAttribute("width",40);
		this.optLos.setAttribute("height",40);
		if (flag == 0){
            quantF++;
			this.optLos.setAttribute('fill', 'transparent');
			this.optLos.setAttribute('stroke', 'transparent');
			
		}
		else if(flag == 1){
            quantSta++;
			this.optLos.setAttribute('fill', 'white');
			this.optLos.setAttribute('stroke', 'black');
		}
		else if(flag == 2){
            quantDyn++;
			this.optLos.setAttribute('fill', 'black');
			this.optLos.setAttribute('stroke', 'black');
		}
		this.optLos.setAttribute('transform',"rotate(-45 230 190)");
		//this.optLos.setAttribute('transform', 'matrix(1 0 0 1 0 0)');
            if (this.mascara) {
                this.mascara.appendChild(this.optLos);
            } else {
                this.optRect.setAttribute('onmousedown', 'selectElement(evt)');
                this.svg.appendChild(this.optLos);
            }
		
}
	
        //Parte da mascara para mover todos a "figura" se trocar  o rect  por 'g' se cria um grupo, mas não sei o modo de mover o grupo
    this.makeMask = function(flag) {
        this.mascara = document.createElementNS("http://www.w3.org/2000/svg", "g");
        this.mascara.setAttribute('id', this.text + "mask");
        aux = this.html_id + "mask";
        this.mascara.setAttribute('class', 'draggable xxx');
		this.mascara.setAttribute('type', flag);
        this.mascara.setAttribute('x', 300);
        this.mascara.setAttribute('y', 190);
        this.mascara.setAttribute('width', 100);
        this.mascara.setAttribute('height', 85);
        this.mascara.setAttribute('parent', 'makeMask()');
        this.mascara.setAttribute('transform', 'matrix(1 0 0 1 0 0)');
        this.mascara.setAttribute('onmousedown', 'selectElement(evt)'); 
		this.mascara.setAttribute('nivel',0);
	    this.mascara.setAttribute('tp',0);		
		if(flag==0){
			this.makeOptRect(0);
			this.makeLosangle(0);
			this.makeLineRect(0);
			this.makeLabel();
		}
		else if(flag == 1){
			this.makeOptRect(0);
			this.makeLosangle(1);			
			this.makeLineRect(0);
			this.makeLabel();
		}
		else if(flag = 2){
			this.makeOptRect(0);
			this.makeLosangle(2);
			this.makeLineRect(0);
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

















