<?php 
	require_once 'conexao.php';
	
	$sql = "SELECT NomeArquivo,idTipo,idArquivo FROM arquivo;";
	$query = mysql_query($sql);
	while($linha = mysql_fetch_array($query)){
                $nome = explode(".",$linha[0]);
		if($linha["idTipo"] == 46){
			echo "<li><a href='Models/fodanlog.php?idArquivo=$linha[2]'>$nome[0]</a></li>";
		}else{
			if($linha["idTipo"] == 66){
				echo "<li><a href='Models/czarneckinlog.php?idArquivo=$linha[2]'>$nome[0]</a></li>";
			}else{
				echo "<li><a href='Models/featuresbnlog.php?idArquivo=$linha[2]'>$nome[0]</a></li>";
			}
		}
	}

?>