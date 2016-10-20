<?php
	require_once 'conexao.php';
	$nome = "";
	if(!empty($_POST["enviar"])){
		if(!empty($_POST["nome"]))
		{
			$nome = $_POST["nome"];
		}
		
		if(!empty($_POST["email"]))
		{
			$email = $_POST["email"];
		}
		
		if(!empty($_POST["senha"]))
		{
			$senha = md5($_POST["senha"]);
		}
		
		if(!empty($_POST["paises"]))
		{
			$pais = $_POST["paises"];
		}else{
			$pais = "Não identificado";
		}
		
		if(!empty($_POST["instituicao"]))
		{
			$instituicao = $_POST["instituicao"];
		}else{
			$instituicao = "Não identificado";
		}
		
		if(!empty($nome) && !empty($email) && !empty($senha) && !empty($pais) && !empty($instituicao)){
			$query = "INSERT INTO usuario VALUES(null,'$nome','$email','$senha','$pais','$instituicao');";
			if(mysql_query($query)){
				$oldmask = umask(0);
				mkdir("C:\\\\xampp\\\\htdocs\\\\atlas\\\\atlas\\\\arquivos\\\\FODA\\\\$email",0777);
				mkdir("C:\\\\xampp\\\\htdocs\\\\atlas\\\\atlas\\\\arquivos\\\\FeatuRESB\\\\$email",0777);
				mkdir("C:\\\\xampp\\\\htdocs\\\\atlas\\\\atlas\\\\arquivos\\\\Czarnecki\\\\$email",0777);
				umask($oldmask);
				$nome = "";
				$email = "";
				$instituicao = "";
				echo "<script>alert('Usuário incluído com sucesso!')</script>";
			}
			else{
				echo "<script>alert('Erro ao tentar incluir o usuário!')</script>";
			}
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

<script type="text/javascript">
	function listaArquivo(){
	var ajax;
	ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
			if ((ajax.readyState == 4) && (ajax.status == 200)) {
				var svgStringData = ajax.responseText;
				console.log(svgStringData);
				document.getElementById("listaArquivos").innerHTML = svgStringData;
			}
		};
	ajax.open("POST","listaArquivos.php",true);
	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	ajax.send();
}
</script>

<style>
.btn-info {
  color: #fff;
  background-color: #00AABB;
  border-color: #46b8da;

  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: normal;
  line-height: 1.428571429;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
       -o-user-select: none;
          user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}
</style>

</head>
<body onLoad="listaArquivo()">
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
				<li class="current_page_item"><a href="cadastro.php">Register</a></li>
				<li class="spanMenu"><a href="login.php">Login</a></li>
				<li class="spanMenu"><a href="index.php">Contact</a></li>
			</ul>
		</div>
		<!-- end #menu --> 
	</div>
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

            function validarSenha(){
				senha1 = document.f1.senha.value;
				senha2 = document.f1.confirmacao.value;
			 
				if (senha1 == senha2)
					alert("SENHAS IGUAIS")
				else
					alert("SENHAS DIFERENTES")
			}
             
    </script>
    <form class="form-horizontal" action="cadastro.php" method="POST" enctype="multipart/form-data" name="form1" onsubmit="return validarSenha(this);">
        <fieldset>
 
        <!-- Form Name -->
       <h1 style="margin-left: 150px; margin-top: 20px;">Register:</h1>
      <div style="margin-left: 150px; margin-top: 20px;">
        <!-- Text input-->
        
        <div class="control-group" >
            <label class="control-label">Name*</label>
            <div class="controls">
                <input id="nome" name="nome" size="35" type="text" class="input-xlarge" required value="<?php if(!empty($nome)) echo $nome; ?>" onkeypress=" return verificaNome(event)"><br/>
            </div>
        </div><br/>
 
        <label class="control-label">Email*</label>
        <div class="controls">
            <input id="email"  name="email" size="35" type="email" class="input-xlarge" value="<?php if(!empty($email)) echo $email; ?>" required><br/>
        </div><br/>
        
        <label class="control-label">Password*</label>
        <div class="controls">
            <input id="senha"  name="senha" size="35" type="password" class="input-xlarge" required>
            
        </div><br/>
		
		<label class="control-label">Confirm your password*</label><br/>
        <div class="controls">
            <input  name="confirmacao" size="35" type="password" class="input-xlarge" required onkeyup="return validarSenha()">
        </div><br/>
		
		<div id="teste"></div>		
		
		<label class="control-label">Country</label>
        <div class="controls">
            <select id="paises" name="paises" style="width:277px;">
			<option value="Afghanistan" title="Afghanistan">Afghanistan</option>
			<option value="&Aringland Islands" title="&Aringland Islands">&Aringland Islands</option>
			<option value="Albania" title="Albania">Albania</option>
			<option value="Algeria" title="Algeria">Algeria</option>
			<option value="American Samoa" title="American Samoa">American Samoa</option>
			<option value="Andorra" title="Andorra">Andorra</option>
			<option value="Angola" title="Angola">Angola</option>
			<option value="Anguilla" title="Anguilla">Anguilla</option>
			<option value="Antarctica" title="Antarctica">Antarctica</option>
			<option value="Antigua and Barbuda" title="Antigua and Barbuda">Antigua and Barbuda</option>
			<option value="Argentina" title="Argentina">Argentina</option>
			<option value="Armenia" title="Armenia">Armenia</option>
			<option value="Aruba" title="Aruba">Aruba</option>
			<option value="Australia" title="Australia">Australia</option>
			<option value="Austria" title="Austria">Austria</option>
			<option value="Azerbaijan" title="Azerbaijan">Azerbaijan</option>
			<option value="Bahamas" title="Bahamas">Bahamas</option>
			<option value="Bahrain" title="Bahrain">Bahrain</option>
			<option value="Bangladesh" title="Bangladesh">Bangladesh</option>
			<option value="Barbados" title="Barbados">Barbados</option>
			<option value="Belarus" title="Belarus">Belarus</option>
			<option value="Belgium" title="Belgium">Belgium</option>
			<option value="Belize" title="Belize">Belize</option>
			<option value="Benin" title="Benin">Benin</option>
			<option value="Bermuda" title="Bermuda">Bermuda</option>
			<option value="Bhutan" title="Bhutan">Bhutan</option>
			<option value="Bolivia, Plurinational State of" title="Bolivia, Plurinational State of">Bolivia, Plurinational State of</option>
			<option value="Bonaire, Sint Eustatius and Saba" title="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
			<option value="Bosnia and Herzegovina" title="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
			<option value="Botswana" title="Botswana">Botswana</option>
			<option value="Bouvet Island" title="Bouvet Island">Bouvet Island</option>
			<option value="Brazil" title="Brazil">Brazil</option>
			<option value="British Indian Ocean Territory" title="British Indian Ocean Territory">British Indian Ocean Territory</option>
			<option value="Brunei Darussalam" title="Brunei Darussalam">Brunei Darussalam</option>
			<option value="Bulgaria" title="Bulgaria">Bulgaria</option>
			<option value="Burkina Faso" title="Burkina Faso">Burkina Faso</option>
			<option value="Burundi" title="Burundi">Burundi</option>
			<option value="Cambodia" title="Cambodia">Cambodia</option>
			<option value="Cameroon" title="Cameroon">Cameroon</option>
			<option value="Canada" title="Canada">Canada</option>
			<option value="Cape Verde" title="Cape Verde">Cape Verde</option>
			<option value="Cayman Islands" title="Cayman Islands">Cayman Islands</option>
			<option value="Central African Republic" title="Central African Republic">Central African Republic</option>
			<option value="Chad" title="Chad">Chad</option>
			<option value="Chile" title="Chile">Chile</option>
			<option value="China" title="China">China</option>
			<option value="Christmas Island" title="Christmas Island">Christmas Island</option>
			<option value="Cocos (Keeling) Islands" title="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
			<option value="Colombia" title="Colombia">Colombia</option>
			<option value="Comoros" title="Comoros">Comoros</option>
			<option value="Congo" title="Congo">Congo</option>
			<option value="Congo, the Democratic Republic of the" title="Congo, the Democratic Republic of the">Congo, the Democratic Republic of the</option>
			<option value="Cook Islands" title="Cook Islands">Cook Islands</option>
			<option value="Costa Rica" title="Costa Rica">Costa Rica</option>
			<option value="C&ocircte d'Ivoire" title="C&ocircte d'Ivoire">C&ocircte d'Ivoire</option>
			<option value="Croatia" title="Croatia">Croatia</option>
			<option value="Cuba" title="Cuba">Cuba</option>
			<option value="Curaçao" title="Curaçao">Curaçao</option>
			<option value="Cyprus" title="Cyprus">Cyprus</option>
			<option value="Czech Republic" title="Czech Republic">Czech Republic</option>
			<option value="Denmark" title="Denmark">Denmark</option>
			<option value="Djibouti" title="Djibouti">Djibouti</option>
			<option value="Dominica" title="Dominica">Dominica</option>
			<option value="Dominican Republic" title="Dominican Republic">Dominican Republic</option>
			<option value="Ecuador" title="Ecuador">Ecuador</option>
			<option value="Egypt" title="Egypt">Egypt</option>
			<option value="El Salvador" title="El Salvador">El Salvador</option>
			<option value="Equatorial Guinea" title="Equatorial Guinea">Equatorial Guinea</option>
			<option value="Eritrea" title="Eritrea">Eritrea</option>
			<option value="Estonia" title="Estonia">Estonia</option>
			<option value="Ethiopia" title="Ethiopia">Ethiopia</option>
			<option value="Falkland Islands (Malvinas)" title="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
			<option value="Faroe Islands" title="Faroe Islands">Faroe Islands</option>
			<option value="Fiji" title="Fiji">Fiji</option>
			<option value="Finland" title="Finland">Finland</option>
			<option value="France" title="France">France</option>
			<option value="French Guiana" title="French Guiana">French Guiana</option>
			<option value="French Polynesia" title="French Polynesia">French Polynesia</option>
			<option value="French Southern Territories" title="French Southern Territories">French Southern Territories</option>
			<option value="Gabon" title="Gabon">Gabon</option>
			<option value="Gambia" title="Gambia">Gambia</option>
			<option value="Georgia" title="Georgia">Georgia</option>
			<option value="Germany" title="Germany">Germany</option>
			<option value="Ghana" title="Ghana">Ghana</option>
			<option value="Gibraltar" title="Gibraltar">Gibraltar</option>
			<option value="Greece" title="Greece">Greece</option>
			<option value="Greenland" title="Greenland">Greenland</option>
			<option value="Grenada" title="Grenada">Grenada</option>
			<option value="Guadeloupe" title="Guadeloupe">Guadeloupe</option>
			<option value="Guam" title="Guam">Guam</option>
			<option value="Guatemala" title="Guatemala">Guatemala</option>
			<option value="Guernsey" title="Guernsey">Guernsey</option>
			<option value="Guinea" title="Guinea">Guinea</option>
			<option value="Guinea-Bissau" title="Guinea-Bissau">Guinea-Bissau</option>
			<option value="Guyana" title="Guyana">Guyana</option>
			<option value="Haiti" title="Haiti">Haiti</option>
			<option value="Heard Island and McDonald Islands" title="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>
			<option value="Holy See (Vatican City State)" title="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
			<option value="Honduras" title="Honduras">Honduras</option>
			<option value="Hong Kong" title="Hong Kong">Hong Kong</option>
			<option value="Hungary" title="Hungary">Hungary</option>
			<option value="Iceland" title="Iceland">Iceland</option>
			<option value="India" title="India">India</option>
			<option value="Indonesia" title="Indonesia">Indonesia</option>
			<option value="Iran, Islamic Republic of" title="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
			<option value="Iraq" title="Iraq">Iraq</option>
			<option value="Ireland" title="Ireland">Ireland</option>
			<option value="Isle of Man" title="Isle of Man">Isle of Man</option>
			<option value="Israel" title="Israel">Israel</option>
			<option value="Italy" title="Italy">Italy</option>
			<option value="Jamaica" title="Jamaica">Jamaica</option>
			<option value="Japan" title="Japan">Japan</option>
			<option value="Jersey" title="Jersey">Jersey</option>
			<option value="Jordan" title="Jordan">Jordan</option>
			<option value="Kazakhstan" title="Kazakhstan">Kazakhstan</option>
			<option value="Kenya" title="Kenya">Kenya</option>
			<option value="Kiribati" title="Kiribati">Kiribati</option>
			<option value="Korea, Democratic People's Republic of" title="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
			<option value="Korea, Republic of" title="Korea, Republic of">Korea, Republic of</option>
			<option value="Kuwait" title="Kuwait">Kuwait</option>
			<option value="Kyrgyzstan" title="Kyrgyzstan">Kyrgyzstan</option>
			<option value="Lao People's Democratic Republic" title="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
			<option value="Latvia" title="Latvia">Latvia</option>
			<option value="Lebanon" title="Lebanon">Lebanon</option>
			<option value="Lesotho" title="Lesotho">Lesotho</option>
			<option value="Liberia" title="Liberia">Liberia</option>
			<option value="Libya" title="Libya">Libya</option>
			<option value="Liechtenstein" title="Liechtenstein">Liechtenstein</option>
			<option value="Lithuania" title="Lithuania">Lithuania</option>
			<option value="Luxembourg" title="Luxembourg">Luxembourg</option>
			<option value="Macao" title="Macao">Macao</option>
			<option value="Macedonia, the former Yugoslav Republic of" title="Macedonia, the former Yugoslav Republic of">Macedonia, the former Yugoslav Republic of</option>
			<option value="Madagascar" title="Madagascar">Madagascar</option>
			<option value="Malawi" title="Malawi">Malawi</option>
			<option value="Malaysia" title="Malaysia">Malaysia</option>
			<option value="Maldives" title="Maldives">Maldives</option>
			<option value="Mali" title="Mali">Mali</option>
			<option value="Malta" title="Malta">Malta</option>
			<option value="Marshall Islands" title="Marshall Islands">Marshall Islands</option>
			<option value="Martinique" title="Martinique">Martinique</option>
			<option value="Mauritania" title="Mauritania">Mauritania</option>
			<option value="Mauritius" title="Mauritius">Mauritius</option>
			<option value="Mayotte" title="Mayotte">Mayotte</option>
			<option value="Mexico" title="Mexico">Mexico</option>
			<option value="Micronesia, Federated States of" title="Micronesia, Federated States of">Micronesia, Federated States of</option>
			<option value="Moldova, Republic of" title="Moldova, Republic of">Moldova, Republic of</option>
			<option value="Monaco" title="Monaco">Monaco</option>
			<option value="Mongolia" title="Mongolia">Mongolia</option>
			<option value="Montenegro" title="Montenegro">Montenegro</option>
			<option value="Montserrat" title="Montserrat">Montserrat</option>
			<option value="Morocco" title="Morocco">Morocco</option>
			<option value="Mozambique" title="Mozambique">Mozambique</option>
			<option value="Myanmar" title="Myanmar">Myanmar</option>
			<option value="Namibia" title="Namibia">Namibia</option>
			<option value="Nauru" title="Nauru">Nauru</option>
			<option value="Nepal" title="Nepal">Nepal</option>
			<option value="Netherlands" title="Netherlands">Netherlands</option>
			<option value="New Caledonia" title="New Caledonia">New Caledonia</option>
			<option value="New Zealand" title="New Zealand">New Zealand</option>
			<option value="Nicaragua" title="Nicaragua">Nicaragua</option>
			<option value="Niger" title="Niger">Niger</option>
			<option value="Nigeria" title="Nigeria">Nigeria</option>
			<option value="Niue" title="Niue">Niue</option>
			<option value="Norfolk Island" title="Norfolk Island">Norfolk Island</option>
			<option value="Northern Mariana Islands" title="Northern Mariana Islands">Northern Mariana Islands</option>
			<option value="Norway" title="Norway">Norway</option>
			<option value="Oman" title="Oman">Oman</option>
			<option value="Pakistan" title="Pakistan">Pakistan</option>
			<option value="Palau" title="Palau">Palau</option>
			<option value="Palestinian Territory, Occupied" title="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
			<option value="Panama" title="Panama">Panama</option>
			<option value="Papua New Guinea" title="Papua New Guinea">Papua New Guinea</option>
			<option value="Paraguay" title="Paraguay">Paraguay</option>
			<option value="Peru" title="Peru">Peru</option>
			<option value="Philippines" title="Philippines">Philippines</option>
			<option value="Pitcairn" title="Pitcairn">Pitcairn</option>
			<option value="Poland" title="Poland">Poland</option>
			<option value="Portugal" title="Portugal">Portugal</option>
			<option value="Puerto Rico" title="Puerto Rico">Puerto Rico</option>
			<option value="Qatar" title="Qatar">Qatar</option>
			<option value="Réunion" title="Réunion">Réunion</option>
			<option value="Romania" title="Romania">Romania</option>
			<option value="Russian Federation" title="Russian Federation">Russian Federation</option>
			<option value="Rwanda" title="Rwanda">Rwanda</option>
			<option value="Saint Barthémy" title="Saint Barthémy">Saint Barthélemy</option>
			<option value="Saint Helena, Ascension and Tristan da Cunha" title="Saint Helena, Ascension and Tristan da Cunha">Saint Helena, Ascension and Tristan da Cunha</option>
			<option value="Saint Kitts and Nevis" title="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
			<option value="Saint Lucia" title="Saint Lucia">Saint Lucia</option>
			<option value="Saint Martin (French part)" title="Saint Martin (French part)">Saint Martin (French part)</option>
			<option value="Saint Pierre and Miquelon" title="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
			<option value="Saint Vincent and the Grenadines" title="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
			<option value="Samoa" title="Samoa">Samoa</option>
			<option value="San Marino" title="San Marino">San Marino</option>
			<option value="Sao Tome and Principe" title="Sao Tome and Principe">Sao Tome and Principe</option>
			<option value="Saudi Arabia" title="Saudi Arabia">Saudi Arabia</option>
			<option value="Senegal" title="Senegal">Senegal</option>
			<option value="Serbia" title="Serbia">Serbia</option>
			<option value="Seychelles" title="Seychelles">Seychelles</option>
			<option value="Sierra Leone" title="Sierra Leone">Sierra Leone</option>
			<option value="Singapore" title="Singapore">Singapore</option>
			<option value="Sint Maarten (Dutch part)" title="Sint Maarten (Dutch part)">Sint Maarten (Dutch part)</option>
			<option value="Slovakia" title="Slovakia">Slovakia</option>
			<option value="Slovenia" title="Slovenia">Slovenia</option>
			<option value="Solomon Islands" title="Solomon Islands">Solomon Islands</option>
			<option value="Somalia" title="Somalia">Somalia</option>
			<option value="South Africa" title="South Africa">South Africa</option>
			<option value="South Georgia and the South Sandwich Islands" title="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
			<option value="South Sudan" title="South Sudan">South Sudan</option>
			<option value="Spain" title="Spain">Spain</option>
			<option value="Sri Lanka" title="Sri Lanka">Sri Lanka</option>
			<option value="Sudan" title="Sudan">Sudan</option>
			<option value="Suriname" title="Suriname">Suriname</option>
			<option value="Svalbard and Jan Mayen" title="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
			<option value="Swaziland" title="Swaziland">Swaziland</option>
			<option value="Sweden" title="Sweden">Sweden</option>
			<option value="Switzerland" title="Switzerland">Switzerland</option>
			<option value="Syrian Arab Republic" title="Syrian Arab Republic">Syrian Arab Republic</option>
			<option value="Taiwan, Province of China" title="Taiwan, Province of China">Taiwan, Province of China</option>
			<option value="Tajikistan" title="Tajikistan">Tajikistan</option>
			<option value="Tanzania, United Republic of" title="Tanzania, United Republic of">Tanzania, United Republic of</option>
			<option value="Thailand" title="Thailand">Thailand</option>
			<option value="Timor-Leste" title="Timor-Leste">Timor-Leste</option>
			<option value="Togo" title="Togo">Togo</option>
			<option value="Tokelau" title="Tokelau">Tokelau</option>
			<option value="Tonga" title="Tonga">Tonga</option>
			<option value="Trinidad and Tobago" title="Trinidad and Tobago">Trinidad and Tobago</option>
			<option value="Tunisia" title="Tunisia">Tunisia</option>
			<option value="Turkey" title="Turkey">Turkey</option>
			<option value="Turkmenistan" title="Turkmenistan">Turkmenistan</option>
			<option value="Turks and Caicos Islands" title="Turks and Caicos Islands">Turks and Caicos Islands</option>
			<option value="Tuvalu" title="Tuvalu">Tuvalu</option>
			<option value="Uganda" title="Uganda">Uganda</option>
			<option value="Ukraine" title="Ukraine">Ukraine</option>
			<option value="United Arab Emirates" title="United Arab Emirates">United Arab Emirates</option>
			<option value="United Kingdom" title="United Kingdom">United Kingdom</option>
			<option value="United States" title="United States">United States</option>
			<option value="United States Minor Outlying Islands" title="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
			<option value="Uruguay" title="Uruguay">Uruguay</option>
			<option value="Uzbekistan" title="Uzbekistan">Uzbekistan</option>
			<option value="Vanuatu" title="Vanuatu">Vanuatu</option>
			<option value="Venezuela, Bolivarian Republic of" title="Venezuela, Bolivarian Republic of">Venezuela, Bolivarian Republic of</option>
			<option value="Viet Nam" title="Viet Nam">Viet Nam</option>
			<option value="Virgin Islands, British" title="Virgin Islands, British">Virgin Islands, British</option>
			<option value="Virgin Islands, U.S." title="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
			<option value="Wallis and Futuna" title="Wallis and Futuna">Wallis and Futuna</option>
			<option value="Western Sahara" title="Western Sahara">Western Sahara</option>
			<option value="Yemen" title="Yemen">Yemen</option>
			<option value="Zambia" title="Zambia">Zambia</option>
			<option value="Zimbabwe" title="Zimbabwe">Zimbabwe</option>
        </select>
        </div><br/>     

		<label class="control-label">University</label>
        <div class="controls">
            <input id="instituicao"  size="35" name="instituicao" type="text" class="input-xlarge" value="<?php if(!empty($instituicao)) echo $instituicao; ?>"><br/>
        </div><br/>
        
		<label class="control-label">*Obrigatory fields</label>
        		
        <div class="control-group">
            <label class="control-label"></label>
            <div class="controls" id="botao">
                <input type="submit" value="Enviar" name="enviar" id="enviar" class="btn-info" />
				
            </div>
        </div>
      </div>
      </div>
        </fieldset>
        </form>
 
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
			<ul class="style1" id="listaArquivos">
							
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

