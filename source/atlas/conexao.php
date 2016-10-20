<?php
	$local = 'localhost';
	$usuario_bd = 'root';
	$nome = 'atlas';
    $senha_bd = '12345';
				
	mysql_connect($local,$usuario_bd,$senha_bd) or die(mysql_error());
	mysql_select_db($nome) or die(mysql_error());		
?>