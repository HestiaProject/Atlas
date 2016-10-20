<?php
	require_once 'conexao.php';
	if(!empty($_POST["arquivo"])){
		$idArquivo = $_POST["arquivo"];
		$query = "SELECT Caminho FROM arquivo WHERE idArquivo = $idArquivo;";
		$result = mysql_query($query);
		$row = mysql_fetch_array($result);
		
		/*if (!file_exists($row["Conteudo"]))
		{
			$ponteiro = fopen('$row["Conteudo"]','w+');
			fclose($ponteiro);	
		}*/
		
		$conteudo = file_get_contents($row["Caminho"]);
		
		/*if(!empty($_POST['nome']))
		{
			$nome = $_POST['nome'];
			fwrite($ponteiro,$nome."\r\n");
		}
		
		echo $row["Conteudo"];
		echo $row["Seed"];*/
		$ultima = $conteudo[strlen($conteudo)-1];
		//$ultima = explode(",",$conteudo);
		echo $ultima;
	
	}
?>   
