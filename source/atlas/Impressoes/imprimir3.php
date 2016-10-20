<?php
	require_once 'conexao.php';
	if(!empty($_POST["arquivo"])){
		$idArquivo = $_POST["arquivo"];
		$query = "SELECT feature,optional,mandatory FROM arquivo WHERE idArquivo = $idArquivo;";
		$result = mysql_query($query);
		$row = mysql_fetch_array($result);
		
		/*if (!file_exists($row["Conteudo"]))
		{
			$ponteiro = fopen('$row["Conteudo"]','w+');
			fclose($ponteiro);	
		}*/
		
		$conteudo = array('feature' => $row[0],'optional' => $row[1],'mandatory' => $row[2]);
		
		/*if(!empty($_POST['nome']))
		{
			$nome = $_POST['nome'];
			fwrite($ponteiro,$nome."\r\n");
		}
		
		echo $row["Conteudo"];
		echo $row["Seed"];*/
		//$ultima = explode(",",$conteudo);
		echo json_encode($conteudo,JSON_PRETTY_PRINT);
	
	}
?>   
