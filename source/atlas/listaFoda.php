<?php 
	require_once 'conexao.php';
	session_start();
	if(!empty($_SESSION["usuario"])){
		$idUsuario = $_SESSION["usuario"];
		$sql = "SELECT NomeArquivo,idTipo,idArquivo FROM arquivo WHERE idUsuario = $idUsuario and idTipo = 46";
		$query = mysql_query($sql);
		while($linha = mysql_fetch_array($query)){
	        $nome = explode(".",$linha[0]);
			echo "<button type='button' name='$nome[0]' onClick='imprimeArvoreFoda($linha[2])' style='width:120px;'>".$nome[0]."</button><br/>";
		}
	}else{
		echo "ERRO";
	}

	//a href='Models/fodanlog.php?idArquivo=$linha[2]'
	//a href='Models/czarneckinlog.php?idArquivo=$linha[2]'
	//a href='Models/featuresbnlog.php?idArquivo=$linha[2]'
?>