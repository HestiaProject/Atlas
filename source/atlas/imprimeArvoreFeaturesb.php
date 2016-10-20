<?php 
	require_once 'conexao.php';
	session_start();
	if(!empty($_SESSION["usuario"])){
		$idUsuario = $_SESSION["usuario"];
		if(!empty($_POST["idFeaturesb"])){
			$idFeaturesb = $_POST["idFeaturesb"];
			$sql = "SELECT feature,dynamic,static FROM featuresb WHERE idArquivo = $idFeaturesb";
			$nomeArquivo ="SELECT NomeArquivo FROM arquivo WHERE idArquivo = $idFeaturesb";
			$queryNome = mysql_query($nomeArquivo);
			$nome = mysql_fetch_array($queryNome);
			$nome = explode('.',$nome[0]);
			$query = mysql_query($sql);
			$linha = mysql_fetch_array($query);
			$total = (int) $linha[0] + (int) $linha[1] + (int) $linha[2];
			echo "Diagram Name: ".$nome[0]."<br/>Features: ".$linha[0].
				 "<br/>Dynamic features: ".$linha[1]."<br/>Static features: ".$linha[2].
				 "<br/>Total of features: ".$total;
		}
	}
	//a href='Models/fodanlog.php?idArquivo=$linha[2]'
	//a href='Models/czarneckinlog.php?idArquivo=$linha[2]'
	//a href='Models/featuresbnlog.php?idArquivo=$linha[2]'
?>