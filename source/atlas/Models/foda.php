<!DOCTYPE html>
<html lang="pt-br">
<head>
<title>FODA</title>
<link href="./jquery-ui-1.11.4.custom/jquery-ui.min.css" rel="stylesheet" />
<link rel="stylesheet" href="./custom/modeling.css" />
<script src="./jquery-ui-1.11.4.custom/external/jquery/jquery.js"></script>
<script src="./jquery-ui-1.11.4.custom/jquery-ui.min.js"></script>
<script type="text/javascript" src="./custom/foda.js"></script>
<script type="text/javascript" src="./custom/contextmenu.js"></script>
<link href="css/bootstrap.min.css" rel="stylesheet">
<link rel="apple-touch-icon" sizes="57x57" href="icons/icons/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="icons/icons/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="icons/icons/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="icons/icons/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="icons/icons/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="icons/icons/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="icons/icons/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="icons/icons/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="icons/icons/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="icons/icons/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="icons/icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="icons/icons/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="icons/icons/favicon-16x16.png">
<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">

<?php require_once '..\verificaSessao.php'; ?>
<script>
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip(); 
	});
	
	function incrementaSeed(somar){
		seed+=somar;
	}

	function saveDiagram(){
		var nome ="";
		while(nome==""){			
			nome = prompt("Please enter your diagram's name");
			//console.log(person);
			if(nome == ""){
				nome = prompt("Please enter a valid name");
			}else{
				var conteudo = document.getElementById("diagsvg").innerHTML;
				var ajax;
				nome += ".foda";
				ajax = new XMLHttpRequest();
				ajax.onreadystatechange = function() {
					if ((ajax.readyState == 4) && (ajax.status == 200)) {
						var svgStringData = ajax.responseText;
						console.log(svgStringData);
						
						document.getElementById("conteudoSvg").innerHTML = svgStringData;
					}
				};
				ajax.open("POST","../Escreve/escreve.php",true);
				ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
				ajax.send("nome="+nome+"&arquivo="+conteudo+"&seed="+seed+"&feature="+quantF+"&optional="+quantOp+"&mandatory="+quantMand);
			}
			if(nome == null){
				alert('You canceled the save,click "Save" to try again');
				break;
			}
		}
		
	}
	
	function saveDiagramCommunity(){
		var nome = prompt("Please enter your diagram's name");
		nome = nome+".foda";
		//console.log(person);
		var conteudo = document.getElementById("diagsvg").innerHTML;
		var ajax;
        ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if ((ajax.readyState == 4) && (ajax.status == 200)) {
				var svgStringData = ajax.responseText;
				console.log(svgStringData);
				
				document.getElementById("conteudoSvg").innerHTML = svgStringData;
            }
        };
		ajax.open("POST","../Escreve/escreveFodaCommunity.php",true);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajax.send("nome="+nome+"&arquivo="+conteudo+"&seed="+seed);
		
	}
	
	function openDiagram(idArquivo){
		console.log(quantF);
		console.log(quantOp);
		console.log(quantMand);
		var ajax;
        ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if ((ajax.readyState == 4) && (ajax.status == 200)) {
				document.getElementById("diagsvg").innerHTML = ajax.responseText;
            }
        };
			
        ajax.open("POST","../Impressoes/imprimir.php",true);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        ajax.send("arquivo="+idArquivo);
		
		
		var ajax2;
        ajax2 = new XMLHttpRequest();
        ajax2.onreadystatechange = function() {
            if ((ajax2.readyState == 4) && (ajax2.status == 200)) {
				var somar = ajax2.responseText;
				console.log(somar);
				seed+=parseInt(somar);
            }
        };
			
        ajax2.open("POST","../Impressoes/imprimir2.php",true);
		ajax2.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        ajax2.send("arquivo="+idArquivo);


		var features;
        features = new XMLHttpRequest();
        features.onreadystatechange = function() {
            if ((features.readyState == 4) && (features.status == 200)) {
				var fea = JSON.parse(features.responseText);
				quantF+=parseInt(fea.feature);
				quantOp+=parseInt(fea.optional);
				quantMand+=parseInt(fea.mandatory);
				console.log(quantF);
				console.log(quantOp);
				console.log(quantMand);
            }
        };
			
        features.open("POST","../Impressoes/imprimir3.php",true);
		features.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        features.send("arquivo="+idArquivo);

	}
	
	function openList(){
		var ajax;
        ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if ((ajax.readyState == 4) && (ajax.status == 200)) {
				document.getElementById("listaDiagramas").innerHTML = ajax.responseText;
				console.log(ajax.responseText);
            }
        };
			
        ajax.open("POST","../Impressoes/imprimirLista.php",true);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        ajax.send();
	}
	
	function changePage() {
		var x = document.getElementById("model").value;
		if(x==1)
		{
			window.location.href = "foda.php";
		}
		if(x==2)
		{
			window.location.href = "czarnercki.php";
		}
		if(x==3)
		{
			window.location.href = "featuresb.php";	
		}
		document.getElementById("0").innerHTML = "FODA";
	}
	
	function escreveTipo(){
		document.getElementById("0").innerHTML = "FODA";
	}
	
</script>
</head>
<body onload="escreveTipo()">

<div id="header">
	AtlasSPL<br />
	A Web-Based Tool for Feature Modeling FODA

    <div>
        <a href="logout.php" style="text-decoration: none"><button id="logout">Logout</button></a>
        <a href="..\index.php" style="text-decoration: none"><button id="index">Home</button></a>
    </div>
</div>

<div class="menu">
	<div class="ui-corner-all">
		<a id="btn_new" href="#">New</a>
		<a id="btn_save" href="#" onClick="saveDiagram()">Save</a>
		<a id= "btn_community" href="#" onClick="saveDiagramCommunity()">Save as community  </a>
		<a id="btn_open" href="#" onClick="openList()">Open</a>
		<a id="btn_validate" href="#">Validate</a>
	</div >
	
	<!--<div class="ui-corner-all" id="context_menu_diagram">
		<a id="btn_add_feature" href="#">Add Feature</a>
		<a id="btn_add_featureOp" href="#">Add Feature Op</a>
		<a id="btn_add_featureMand" href="#">Add Feature Mand</a>
		
		
	</div >-->
	<div class="menu1" id="context_menu_diagram">
		<a class="a1"id="btn_add_feature" href="#" data-toggle="tooltip" title="Add Feature"><input type="image" src="./icons/foda/1.png" ></a>
		<input type="image" src="./icons/barra.png">
		<a id="btn_add_featureOp" href="#"data-toggle="tooltip" title="Add Feature Optional"><input type="image" src="./icons/foda/2.png" ></a>
		<input type="image" src="./icons/barra.png">
		<a id="btn_add_featureMand" href="#"data-toggle="tooltip" title="Add Feature Mandatory"><input type="image" src="./icons/foda/3.png" ></a>
		<input type="image" src="./icons/barra.png">
		
		
	</div >
	<br/>
	
	<div class="ui-corner-all" id="context_menu_feature">
		<a id="btn_make_child" href="#">Make Child</a>
		<a id="btn_unlink_from_parent" href="#">Unlink from Parent</a>
		<a id="btn_unlink_all_children" href="#">Unlink all children</a>
		<a id="btn_set_optional" href="#">Set Optional</a>
		<a id="btn_set_mandatory" href="#">Set Mandatory</a>
		<a id="btn_set_normal" href="#">Set Normal</a>
		<a id="btn_remove_feature" href="#">Remove Feature</a>
		<a id="btn_set_name" href='#'>Set name</a>
	</div >
	<br/><div class="ui-corner-all" id="listaDiagramas" style="width:180px;"></div>	
</div>



<div id="diagram">
	<svg id="diagsvg"></svg>
	<input type="hidden" id="conteudoSvg"/>
</div>
</body>
</html>

