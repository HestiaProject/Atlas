<?php
    session_start();
	require_once 'conexao.php';
	
	if(!empty($_POST["email"])){
		$email = addslashes($_POST["email"]);		
	}
	
	if(!empty($_POST["senha"])){
		$senha = md5(addslashes($_POST["senha"]));
	}
	
	if(!empty($email) && !empty($senha)){	
		$codigo = "SELECT idUsuario,Nome 
	                   FROM Usuario
        	           WHERE Email LIKE '$email' AND
                	         Senha LIKE '$senha'";
		$resultado = mysql_query($codigo);
		if($linha = mysql_fetch_array($resultado)){
			$_SESSION["usuario"] = $linha["idUsuario"];
			$_SESSION["nomeUsuario"] = $linha["Nome"];
			$_SESSION["login"] = $linha["idUsuario"];
			header("location: atlas/index.php");
		}else{
			echo ("<script>alert('Usuário ou senha incorretos!')</script>");
		}
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<!--
Design by TEMPLATED
http://templated.co
Released for free under the Creative Commons Attribution License

Name       : Retention 
Description: A two-column, fixed-width design with dark color scheme.
Version    : 1.0
Released   : 20140221

-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>AtlasSPL</title>
<meta name="keywords" content="" />
<meta name="description" content="" />
<!--<link href="http://fonts.googleapis.com/css?family=Karla:400,700" rel="stylesheet" />-->
<link href="css/default.css" rel="stylesheet" type="text/css" media="all" />
<link href="css/fonts.css" rel="stylesheet" type="text/css" media="all" />
<link href="css/scroll.css" rel="stylesheet" type="text/css" media="all" />
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script src="jquery.nicescroll/jquery.nicescroll.js"></script>
<link rel="apple-touch-icon" sizes="57x57" href="icons/apple-icon-57x57.png">
<link rel="apple-touch-icon" sizes="60x60" href="icons/apple-icon-60x60.png">
<link rel="apple-touch-icon" sizes="72x72" href="icons/apple-icon-72x72.png">
<link rel="apple-touch-icon" sizes="76x76" href="icons/apple-icon-76x76.png">
<link rel="apple-touch-icon" sizes="114x114" href="icons/apple-icon-114x114.png">
<link rel="apple-touch-icon" sizes="120x120" href="icons/apple-icon-120x120.png">
<link rel="apple-touch-icon" sizes="144x144" href="icons/apple-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="icons/apple-icon-152x152.png">
<link rel="apple-touch-icon" sizes="180x180" href="icons/apple-icon-180x180.png">
<link rel="icon" type="image/png" sizes="192x192"  href="icons/android-icon-192x192.png">
<link rel="icon" type="image/png" sizes="32x32" href="icons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="96x96" href="icons/favicon-96x96.png">
<link rel="icon" type="image/png" sizes="16x16" href="icons/favicon-16x16.png">
<link rel="manifest" href="/manifest.json">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
<meta name="theme-color" content="#ffffff">
<!--[if IE 6]>
<link href="default_ie6.css" rel="stylesheet" type="text/css" />
<![endif]-->
</head>
<body>
<div id="wrapper">
	<div id="header-wrapper">
		<div id="header" class="container">
		    <a href="index.php"><img src="images/atlaslogo.png" height="200" width="350"/></a>

		</div>
	</div>
	<div id="menu-wrapper">
		<div id="menu" class="container">
			<ul>
				<li class="spanMenu"><a href="index.php">Home</a></li>
				<li class="spanMenu"><a href="cadastro.php">Register</a></li>
				<li class="current_page_item"><a href="login.php">Login</a></li>
				<li class="spanMenu"><a href="index.php">Contact</a></li>
			</ul>
		</div>
		<!-- end #menu --> 
	</div>
	<div id="page" class="container">
		    <script language="Javascript">       
            function verificaNome(e){
                var tecla=new Number();
                if(window.event) {
                    tecla = e.keyCode;
                }
                else if(e.which) {
                    tecla = e.which;
                }
                else {
                    return true;
                }
                if((tecla >= "48") && (tecla <= "57")){
                    return false;
                }
            }

  
    </script>
    <form class="form-horizontal" action="login.php" method="POST" enctype="multipart/form-data" name="form1">
        <fieldset>
 
        <!-- Form Name -->
       <h1 style="margin-left: 150px; margin-top: 20px;">Login:</h1>
      <div style="margin-left: 150px; margin-top: 20px;">
        
 
        <label class="control-label">Email</label>
        <div class="controls">
            <input id="email"  name="email" size="35" type="text" class="input-xlarge" value="<?php if(!empty($email)) echo $email; ?>" required><br/>
        </div><br/>
        
        <label class="control-label">Password</label>
        <div class="controls">
            <input id="senha"  name="senha" size="35" type="password" class="input-xlarge" required>
            
        </div><br/>
		
		
        <div class="control-group">
            <label class="control-label"></label>
            <div class="controls" id="botao">
                <button id="enviar" name="enviar" class="btn btn-sucess" >Send</button>
				
            </div>
        </div>
      </div>
        </fieldset>
        </form>
	</div>
</div>
	<div id="portfolio-wrapper">
		<div id="portfolio" class="container">
			<div id="column1">
				<div class="title">
					<h2>FODA Diagram</h2>
				</div>
				<a href="#" class="image image-full"><img src="images/atlaslogo.png" alt="" /></a>
				<p>Now saving and loading.</p>
				<a href="#" class="icon icon-plus-sign button">Read More</a> </div>
			<div id="column2">
				<div class="title">
					<h2>Czarnecki Diagram</h2>
				</div>
				<a href="#" class="image image-full"><img src="images/atlaslogo.png" alt="" /></a>
				<p>Now saving and loading.</p>
				<a href="#" class="icon icon-plus-sign button">Read More</a> </div>
			<div id="column3">
				<div class="title">
					<h2>FeatuRESB Diagram</h2>
				</div>
				<a href="#" class="image image-full"><img src="images/atlaslogo.png" alt="" /></a>
				<p>Now saving and loading.</p>
				<a href="#" class="icon icon-plus-sign button">Read More</a> </div>
			<!--<div id="column4">
				<div class="title">
					<h2>Mauris vulputate</h2>
				</div>
				<a href="#" class="image image-full"><img src="images/pic05.jpg" alt="" /></a>
				<p>Etiam non felis. Donec ut ante. In id eros. Suspendisse lacus turpis, cursus egestas at sem. Mauris quam enim, molestie.</p>
				<a href="#" class="icon icon-plus-sign button">Read More</a> </div>-->
		</div>
	</div>

<div id="footer-wrapper">
	<div id="footer" class="container">
		<div id="box1">
			<div class="title">
				<h2>Latest Post</h2>
			</div>
			<ul class="style1">
				<li><a href="#">Other thing</a></li>
				<li><a href="#">Anoteher thing</a></li>
				<li><a href="#">Something</a></li>				
			</ul>
		</div>
		<div id="box2">
			<div class="title">
				<h2>Community Diagrams</h2>
			</div>
			<div class="scroll">
			<ul class="style1">
				<li><a href="#">Other thing</a></li>
				<li><a href="#">Anoteher thing</a></li>
				<li><a href="#">Something</a></li>
				<li><a href="#">Other thing</a></li>
				<li><a href="#">Anoteher thing</a></li>
				<li><a href="#">Something</a></li>
				<li><a href="#">Other thing</a></li>
				<li><a href="#">Anoteher thing</a></li>
				<li><a href="#">Something</a></li>
			</ul>
			</div>
		</div>
		<!--<div id="box3">
			<div class="title">
				<h2>Follow Us</h2>
			</div>
			<p>Proin eu wisi suscipit nulla suscipit interdum. Aenean lectus lorem, imperdiet magna.</p>
			<ul class="contact">
				<li><a href="#" class="icon icon-twitter"><span>Twitter</span></a></li>
				<li><a href="#" class="icon icon-facebook"><span>Facebook</span></a></li>
				<li><a href="#" class="icon icon-dribbble"><span>Dribbble</span></a></li>
				<li><a href="#" class="icon icon-tumblr"><span>Tumblr</span></a></li>
				<li><a href="#" class="icon icon-rss"><span>Pinterest</span></a></li>
			</ul>
				<a href="#" class="icon icon-plus-sign button">Read More</a> </div>
		</div>-->
	</div>
</div>
<div id="copyright" class="container">
	<p>&copy; GSO. All rights reserved. | Design by <a href="http://templated.co" rel="nofollow">TEMPLATED</a>.</p>
</div>
</body>
</html>

