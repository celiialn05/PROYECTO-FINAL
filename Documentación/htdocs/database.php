<?php
$servername = "finanzify.sytes.net:3306";
$username = "ceciñoñetnoguiris";
$password = "";
$database = "financify";

$conn  =   new mysqli($servername,$username,$password,$database);

if($conn-> connect_error){
	die("Connection failed: ".$conn->connect_error);
	}

?>