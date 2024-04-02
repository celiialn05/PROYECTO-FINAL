<?php
// Leer datos del cuerpo de la solicitud

require 'database.php';
$postData = file_get_contents("php://input");

// Decodificar los datos JSON
$postDataArray = json_decode($postData, true);

// Verificar si se han enviado los datos de nombre y correo
if(isset($postDataArray['nombre']) && isset($postDataArray['email'])) {
    // Obtener los datos de nombre y correo
    $nombre = $postDataArray['nombre'];
    $email = $postDataArray['email'];

    // Realizar la inserción en la base de datos
    $query = "INSERT INTO prueba (nombre, email) VALUES ('$nombre', '$email')";
    if(mysqli_query($conn, $query)) {
        echo json_encode(array("mensaje" => "Inserción exitosa."));
    } else {
        echo json_encode(array("error" => "Error en la inserción: " . mysqli_error($conn)));
    }
} else {
    echo json_encode(array("error" => "Datos de nombre y/o correo no especificados."));
}
?>
