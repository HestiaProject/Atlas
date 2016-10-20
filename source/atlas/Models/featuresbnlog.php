<!DOCTYPE html>
<html lang="pt-br">
<head>
<title>FeatuRESB</title>
<link href="./jquery-ui-1.11.4.custom/jquery-ui.min.css" rel="stylesheet" />
<link rel="stylesheet" href="./custom/modeling.css" />
<script src="./jquery-ui-1.11.4.custom/external/jquery/jquery.js"></script>
<script src="./jquery-ui-1.11.4.custom/jquery-ui.min.js"></script>
<script type="text/javascript" src="./custom/featuresb.js"></script>
<!--<script type="text/javascript" src="./custom/contextmenu.js"></script>-->
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

<script>
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
			
        ajax.open("POST","../Impressoes/imprimirListaFeatuRESB.php",true);
		ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        ajax.send();
	}



	function changePage() {
		var x = document.getElementById("model").value;
		if(x==1)
		{
			window.location.href = "fodanlog.php";
		}
		if(x==2)
		{
			window.location.href = "czarnerckinlog.php";
		}
		if(x==3)
		{
			window.location.href = "featuresbnlog.php";	
		}
	}
</script>

<?php
	if(!empty($_GET["idArquivo"])){
		$id = $_GET["idArquivo"];
		echo "<script>openDiagram(".$id.")</script>";
	}

?>

</head>
<body>
<div id="header">
	AtlasSPL<br />
	A Web-Based Tool for Feature Modeling FeatuRESB<br/>
<div>
    <a href="..\..\login.php" style="text-decoration: none"><button id="login">Login</button></a>
    <a href="..\..\index.php" style="text-decoration: none"><button id="index">Home</button></a>
</div>
</div>

<div class="menu">
	<div class="ui-corner-all">
		<!--<a id="btn_new" href="#">New</a>-->
		<!--<a id="btn_save" href="#" onClick="saveDiagram()"> Save</a>-->
		<a id="btn_open" href="#" onClick="openList()">Open</a>
		<!--<a id="btn_validate" href="#">Validate</a>-->
	</div >
	<div class="ui-corner-all" id="context_menu_diagram">
		<!--<a id="btn_add_feature" href="#">Add Feature Optional</a>
		<a id="btn_add_featureMand" href="#">Add Feature Mandatory Dynamic</a>
		<a id="btn_add_featureOp" href="#">Add Feature Mandatory Static</a>
		<!--<a id="btn_add_featureOp" href="#">Add Feature Op</a>
		<a id="btn_add_featureMand" href="#">Add Feature Mand</a>-->
		
	</div >
	<!--<div class="ui-corner-all" id="context_menu_feature">
		<a id="btn_make_left" href="#">Make Left Binding</a>
		<a id="btn_make_right" href="#">Make Right Binding</a>
		<a id="btn_unlink_from_parent" href="#">Unlink from Parent</a>
		<a id="btn_unlink_all_children" href="#">Unlink all children</a>
		<a id="btn_make_childBar" href="#">Make Child Bar</a>
		<a id="btn_set_static" href="#">Set Static</a>
		<a id="btn_set_dynamic" href="#">Set Dynamic</a>
		<a id="btn_set_normal" href="#">Set Normal</a>
		<a id="btn_remove_feature" href="#">Remove Feature</a>-->
	</div >
	<div class="ui-corner-all" id="listaDiagramas" style="width:180px;"></div>
</div>
<div id="diagram">
	<svg id="diagsvg"></svg>
</div>
</body>
</html>
