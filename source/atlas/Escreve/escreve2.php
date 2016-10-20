<?php	
	require_once 'conexao.php';
	session_start();
	$nome = "";
	if(!empty($_SESSION["usuario"])){
		$idUsuario = $_SESSION["usuario"];
		
		$query = "SELECT Email FROM Usuario WHERE idUsuario = $idUsuario;";
		$sql = mysql_query($query);
		$row = mysql_fetch_array($sql);
	
		if(!empty($_POST["nome"]))
		{
			$nome = $_POST["nome"];
		}
		
		if(!empty($_POST["arquivo"]))
		{
			$conteudo = $_POST["arquivo"];
		}

		if(!empty($_POST["feature"]))
		{
			$feature = $_POST["feature"];
		}else{
			$feature = 0;
		}

		if(!empty($_POST["dynamic"]))
		{
			$dynamic = $_POST["dynamic"];
		}else{
			$dynamic = 0;
		}
		
		if(!empty($_POST["static"]))
		{
			$static = $_POST["static"];
		}else{
			$static = 0;
		}
		
		
		if(!empty($nome)){
			$caminho = 'C:\\\\xampp\\\htdocs\\\atlas\\\atlas\\\arquivos\\\\FeatuRESB\\\\'.$row["Email"].'\\\\'.$_POST["nome"];
			$query = "INSERT INTO arquivo VALUES(null,86,'$nome','$caminho',$idUsuario,null)";
			mysql_query($query);
			$max = "SELECT MAX(idArquivo) FROM arquivo";
			$result = mysql_query($max);
			$idArquivo = mysql_fetch_array($result);
			$incluiFeaturesb = "INSERT INTO featuresb VALUES(null,$idArquivo[0],$feature,$dynamic,$static);";
			mysql_query($incluiFeaturesb);

		}else{
			echo "<script>alert('Erro');";
		}
		
		/*if(mysql_query($query)){
			echo "<script>alert('Diagram save with success!!!')</script>";
		}else{
			echo "<script>alert('Diagram not save!!!')</script>";
		}*/
		
		if(!empty($_POST["seed"]))
		{
			$seed = $_POST["seed"];
		}
		
		/*if (!file_exists($row["Conteudo"]))
		{
			$ponteiro = fopen('$row["Conteudo"]','w+');
			fclose($ponteiro);	
		}*/
		
		$ponteiro = fopen("../arquivos/FeatuRESB/".$row["Email"]."/$nome","w+");
		
		/*if(!empty($_POST['nome']))
		{
			$nome = $_POST['nome'];
			fwrite($ponteiro,$nome."\r\n");
		}
		
		
		

		echo $row["Conteudo"];
		echo $row["Seed"];*/
		if(!empty($conteudo) && !empty($seed)){
			fwrite($ponteiro,$conteudo.",".$seed);	
		}
		
		//echo $conteudo;
		
		fclose($ponteiro);
	}
?>