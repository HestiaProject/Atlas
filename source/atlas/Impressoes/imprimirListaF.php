<?php
	require_once 'conexao.php';
	session_start();
	if(!empty($_SESSION["usuario"])){
		$query = "SELECT idArquivo,NomeArquivo FROM arquivo WHERE idTipo = 86 && idUsuario = ".$_SESSION["usuario"];
		$result = mysql_query($query);
	}
	else
	{
		header("location: ..\login.php");
	}
	
	/*if (!file_exists($row["Conteudo"]))
	{
		$ponteiro = fopen('$row["Conteudo"]','w+');
		fclose($ponteiro);	
	}*/
	
	if(!empty($result)){
		while($row = mysql_fetch_array($result))
		{
                        $nome = explode(".",$row[1]);
			echo "<button id='btn_open' href='#' class='btn btn-block btn-xs' onClick='openDiagram($row[0])'>$nome[0]</button><br/>";
		}
	}
?>   