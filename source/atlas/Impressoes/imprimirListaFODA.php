<?php
	require_once 'conexao.php';

	$query = "SELECT idArquivo,NomeArquivo FROM arquivo WHERE idTipo = 46 && community = 1 ";;
	$result = mysql_query($query);
	
	if(!empty($result)){
		while($row = mysql_fetch_array($result))
		{
                        $nome = explode(".",$row[1]);
			echo "<button id='btn_open' href='#' class='btn btn-block btn-xs' onClick='openDiagram($row[0])'>$nome[0]</button><br/>";
		}
	}
?>   
