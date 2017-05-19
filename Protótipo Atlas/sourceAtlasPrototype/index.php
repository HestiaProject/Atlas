<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./css/login.css">
    <title>Login Atlas</title>
</head>

<body>

    <div class="logo">
        <img src="./img/LogoES.jpg" alt="Logo Engenharia de Software" />       
    </div>

    <div class="loginContainer">
        <form method="post" action="ope.php" id="formlogin" name="formlogin">
            <!--<fieldset id="fie">-->
            <!--<legend>LOGIN</legend><br />                -->
            <p class="title">Login</p>
            <input type="text" name="login" id="login" placeholder="User Name" /><br />
            <input type="password" name="senha" id="senha" placeholder="Password" /><br />
            <input type="submit" value="Login" />
            <!--</fieldset>-->
        </form>
    </div>
</body>

</html>