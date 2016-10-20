<?php 
	require_once 'conexao.php';
	session_start();
	if(!empty($_SESSION["usuario"])){
		$idUsuario = $_SESSION["usuario"];
		$sql = "SELECT NomeArquivo,idTipo,idArquivo FROM arquivo WHERE idUsuario = $idUsuario and idTipo = 66";
		$query = mysql_query($sql);
		while($linha = mysql_fetch_array($query)){
	        $nome = explode(".",$linha[0]);
			echo "<input type='checkbox' name='produtos[]' value='$linha[2]'>".$nome[0]."<br/>";
		}
	}

	//a href='Models/fodanlog.php?idArquivo=$linha[2]'
	//a href='Models/czarneckinlog.php?idArquivo=$linha[2]'
	//a href='Models/featuresbnlog.php?idArquivo=$linha[2]'
?>