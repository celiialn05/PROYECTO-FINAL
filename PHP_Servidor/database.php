<?php
/**
 * Este archivo PHP establece la conexión con la base de datos de Financify.
 * Utiliza los datos de conexión proporcionados para crear una instancia de conexión mysqli.
 *
 */

$servername = "finanzify.sytes.net:3306";
$username = "ceciñoñetnoguiris";
$password = "";
$database = "financify";

// Establecer la conexión con la base de datos
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>