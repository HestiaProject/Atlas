<?php	
	require_once 'conexao.php';
	session_start();
	$nome = "";
	if(!empty($_SESSION["usuario"])){
		$idUsuario = $_SESSION["usuario"];
	
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

		if(!empty($_POST["optional"]))
		{
			$optional = $_POST["optional"];
		}else{
			$optional = 0;
		}
		
		if(!empty($_POST["mandatory"]))
		{
			$mandatory = $_POST["mandatory"];
		}else{
			$mandatory = 0;
		}

		if(!empty($_POST["featureOR"]))
		{
			$featureOR = $_POST["featureOR"];
		}else{
			$featureOR = 0;
		}

		if(!empty($_POST["optionalOR"]))
		{
			$optionalOR = $_POST["optionalOR"];
		}else{
			$optionalOR = 0;
		}
		
		if(!empty($_POST["mandatoryOR"]))
		{
			$mandatoryOR = $_POST["mandatoryOR"];
		}else{
			$mandatoryOR = 0;
		}

		if(!empty($_POST["featureXOR"]))
		{
			$featureXOR = $_POST["featureXOR"];
		}else{
			$featureXOR = 0;
		}

		if(!empty($_POST["optionalXOR"]))
		{
			$optionalXOR = $_POST["optionalXOR"];
		}else{
			$optionalXOR = 0;
		}
		
		if(!empty($_POST["mandatoryXOR"]))
		{
			$mandatoryXOR = $_POST["mandatoryXOR"];
		}else{
			$mandatoryXOR = 0;
		}
		
		$query = "SELECT Email FROM Usuario WHERE idUsuario = $idUsuario;";
		$sql = mysql_query($query);
		$row = mysql_fetch_array($sql);		
		
		if(!empty($nome)){
			$caminho = 'C:\\\\xampp\\\htdocs\\\atlas\\\atlas\\\arquivos\\\\Czarnecki\\\\'.$row["Email"].'\\\\'.$_POST["nome"];
			$query = "INSERT INTO arquivo VALUES(null,66,'$nome','$caminho',$idUsuario,null)";
			mysql_query($query);
			$max = "SELECT MAX(idArquivo) FROM arquivo";
			$result = mysql_query($max);
			$idArquivo = mysql_fetch_array($result);
			$incluiCzar = "INSERT INTO czarnecki VALUES(null,$idArquivo[0],$feature,$featureOR,$featureXOR,$optional,$optionalOR,$optionalXOR,$mandatory,$mandatoryXOR,$mandatoryOR);";
			mysql_query($incluiCzar);

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
		
		$ponteiro = fopen("../arquivos/Czarnecki/".$row["Email"]."/$nome","w+");
		
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