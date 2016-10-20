<?php 
	require_once 'conexao.php';
	session_start();
	if(!empty($_SESSION["usuario"])){
		$idUsuario = $_SESSION["usuario"];
		if(!empty($_POST["idCzarnecki"])){
			$idCzarnecki = $_POST["idCzarnecki"];
			$sql = "SELECT feature,featureOR,featureXOR,optional,optionalOR,optionalXOR,mandatory,mandatoryOR,mandatoryXOR FROM czarnecki WHERE idArquivo = $idCzarnecki";
			$nomeArquivo ="SELECT NomeArquivo FROM arquivo WHERE idArquivo = $idCzarnecki";
			$queryNome = mysql_query($nomeArquivo);
			$nome = mysql_fetch_array($queryNome);
			$nome = explode('.',$nome[0]);
			$query = mysql_query($sql);
			$linha = mysql_fetch_array($query);
			$total = (int) $linha[0] + (int) $linha[1] + (int) $linha[2] + (int) $linha[3] + (int) $linha[4] + (int) $linha[5] + (int) $linha[6] + (int) $linha[7] + (int) $linha[8];
			echo "Diagram Name: ".$nome[0]."<br/>Features: ".$linha[0].
				 "<br/>FeaturesXOR: ".$linha[1]."<br/>FeaturesOR: ".$linha[2].
				 "<br/>Optional: ".$linha[3]."<br/>OptionalOR: ".$linha[4]."<br/>OptionalXOR: ".$linha[5].
				 "<br/>Mandatory: ".$linha[6]."<br/>MandatoryOR: ".$linha[7]."<br/>MandatoryXOR: ".$linha[8].
				 "<br/>Total of features: ".$total;
		}
	}
	//a href='Models/fodanlog.php?idArquivo=$linha[2]'
	//a href='Models/czarneckinlog.php?idArquivo=$linha[2]'
	//a href='Models/featuresbnlog.php?idArquivo=$linha[2]'
?>