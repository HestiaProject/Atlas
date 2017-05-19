<?php 
session_start();
$login = $_POST['login'];
$senha = $_POST['senha'];

define('DB_HOST', 'mysql.hostinger.com.br');
define('DB_NAME', 'u194285946_atlas');
define('DB_USER', 'u194285946_atlas');
define('DB_PASSWORD', 'aaaaaa');

$con = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME) or die ("Can't connect with the database!");



$result = mysqli_query($con,"SELECT * FROM `users` WHERE `login` = '$login' AND `senha`= '$senha'");
$number=mysqli_num_rows($result);
if(mysqli_num_rows ($result) > 0 )
{
$_SESSION['login'] = $login;
$_SESSION['senha'] = $senha;
header('location:site.php');
}
else{
    echo"<script language='javascript' type='text/javascript'>alert('Login e/ou senha incorretos');window.location.href='index.php';</script>";
          die();
	unset ($_SESSION['login']);
	unset ($_SESSION['senha']);
        header('location:index.php');
	}

?>