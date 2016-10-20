<!DOCTYPE html>
<html lang="pt-br">
<head>
<title>Czarnecki</title>
<link href="./jquery-ui-1.11.4.custom/jquery-ui.min.css" rel="stylesheet" />
<link rel="stylesheet" href="./custom/modeling.css" />
<script src="./jquery-ui-1.11.4.custom/external/jquery/jquery.js"></script>
<script src="./jquery-ui-1.11.4.custom/jquery-ui.min.js"></script>
<script type="text/javascript" src="./custom/czarnercki.js"></script>
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
		var nome = prompt("Please enter your diagram's name");
		nome = nome+".czar";
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
		ajax.open("POST","../Escreve/escreve3.php",true);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajax.send("nome="+nome+"&arquivo="+conteudo+"&seed="+seed+"&feature="+quantF+"&featureOR="+quantFOR+"&featuresXOR="+quantFXOR+"&optional="+quantOp+"&optionalOR="+quantOpOR+"&optionalXOR="+quantOpXOR+"&mandatory="+quantMan+"&mandatoryOR="+quantManOR+"&mandatoryXOR="+quantManXOR);
		
	}
	function saveDiagramCommunity(){
		var nome = prompt("Please enter your diagram's name");
		nome = nome+".czar";
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
		ajax.open("POST","../Escreve/escreveCzarCommunity.php",true);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		ajax.send("nome="+nome+"&arquivo="+conteudo+"&seed="+seed);
		
	}
	
	
	
	function openDiagram(idArquivo){
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
	}
	
	function openList(){
		var ajax;
        ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if ((ajax.readyState == 4) && (ajax.status == 200)) {
				document.getElementById("listaDiagramas").innerHTML = ajax.responseText;
            }
        };
			
        ajax.open("POST","../Impressoes/imprimirListaC.php",true);
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
	}
</script>
</head>
<body>
<div id="header">
	AtlasSPL<br />
	A Web-Based Tool for Feature Modeling Czarnecki

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
		<a id="btn_open" href="#" onClick="openList()" >Open</a>
		<a id="btn_validate" href="#">Validate</a>
	</div >
	<!--<div class="ui-corner-all" id="context_menu_diagram">
		<a id="btn_add_feature" href="#">Add Feature</a>
		<a id="btn_add_featureOp" href="#">Add Feature Op</a>
		<a id="btn_add_featureMand" href="#">Add Feature Mand</a>
		<a id="btn_add_featureMandSemiWhite" href="#">Add Feature MandSemiWhite</a>
		<a id="btn_add_featureMandSemiBlack" href="#">Add Feature MandSemiBlack</a>
		<a id="btn_add_featureOpSemiBlack" href="#">Add Feature OpSemiBlack</a>
		<a id="btn_add_featureSemiBlack" href="#">Add Feature SemiBlack</a>
		<a id="btn_add_featureSemiWhite" href="#">Add Feature SemiWhite</a>
		<a id="btn_add_featureOpSemiWhite" href="#">Add Feature OpSemiWhite</a>
		
	</div >-->
	<div  class="menu1" id="context_menu_diagram">
		<a class="a1"id="btn_add_feature" href="#" data-toggle="tooltip" title="Add Feature"><input type="image" src="./icons/czar/1.png" ></a>
		<input type="image" src="./icons/barra.png">
		<a class="a1" id="btn_add_featureOp" href="#" data-toggle="tooltip" title="Add Feature optional"><input type="image" src="./icons/czar/2.png"></a>
		<input type="image" src="./icons/barra.png">
		<a class="a1" id="btn_add_featureMand" href="#" data-toggle="tooltip" title="Add Feature mandatory"><input type="image" src="./icons/czar/3.png"></a>
		<input type="image" src="./icons/barra.png">
		<a class="a1" id="btn_add_featureMandSemiWhite" href="#" data-toggle="tooltip" title="Add Feature mandatory XOR"><input type="image" src="./icons/czar/4.png"></a>
		<input type="image" src="./icons/barra.png">
		<a class="a1" id="btn_add_featureMandSemiBlack" href="#" data-toggle="tooltip" title="Add Feature mandatory OR"><input type="image" src="./icons/czar/5.png"></a>
		<input type="image" src="./icons/barra.png">
		<a class="a1" id="btn_add_featureOpSemiBlack" href="#" data-toggle="tooltip" title="Add Feature optional OR"><input type="image" src="./icons/czar/6.png"></a>
		<input type="image" src="./icons/barra.png">
		<a class="a1" id="btn_add_featureSemiBlack" href="#" data-toggle="tooltip" title="Add Feature OR"><input type="image" src="./icons/czar/7.png"></a>
		<input type="image" src="./icons/barra.png">
		<a class="a1" id="btn_add_featureSemiWhite" href="#" data-toggle="tooltip" title="Add Feature XOR"><input type="image" src="./icons/czar/8.png"></a>
		<input type="image" src="./icons/barra.png">
		<a class="a1" id="btn_add_featureOpSemiWhite" href="#" data-toggle="tooltip" title="Add Feature optional XOR"><input type="image" src="./icons/czar/9.png"></a>
		<input type="image" src="./icons/barra.png">
		
	</div >
	<div class="ui-corner-all" id="context_menu_feature">
		<a id="btn_make_child" href="#">Make Child</a>
		<a id="btn_set_optional" href="#">Set Optional</a>
		<a id="btn_set_mandatory" href="#">Set Mandatory</a>
		<a id="btn_set_normal" href="#">Set Normal</a>
		<a id="btn_set_mandsemiwhite" href="#">Set MandSemiWhite</a>
		<a id="btn_set_mandsemiblack" href="#">Set MandSemiBlack</a>
		<a id="btn_set_opsemiblack" href="#">Set OpSemiBlack</a>
		<a id="btn_set_semiblack" href="#">Set SemiBlack</a>
		<a id="btn_set_semiwhite" href="#">Set SemiWhite</a>
		<a id="btn_set_opsemiwhite" href="#">Set OpSemiWhite</a>
		<a id="btn_remove_feature" href="#">Remove Feature</a>
		<a id="btn_set_name" href='#'>Set name</a>
	</div >
	<<br/><div class="ui-corner-all" id="listaDiagramas" style="width:180px;"></div>	
</div>
<div id="diagram">
	<svg id="diagsvg"></svg>
</div>
</body>
</html>