<?php
// Leer datos del cuerpo de la solicitud
require 'database.php';

// Verificar el método de la solicitud
$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'POST':
        // Decodificar los datos JSON
        $postData = file_get_contents("php://input");
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
        break;
   case 'GET':
    // Obtener los datos de DNI y contraseña de la solicitud GET
    $dni = $_GET['dni'];
    $contrasena = $_GET['contrasena'];

    // Realizar la consulta en la base de datos para obtener las credenciales
    $query = "SELECT dni, contrasena FROM prueba WHERE dni='$dni'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $dniDB = $row['dni'];
        $contrasenaDB = $row['contrasena'];

        // Verificar las credenciales teniendo en cuenta las mayúsculas y minúsculas
        $valido = $dniDB === $dni && $contrasenaDB === $contrasena;
        echo json_encode(array("valido" => $valido));
    } else {
        echo json_encode(array("error" => "Credenciales incorrectas."));
    }
    break;
    default:
        // Método no soportado
        echo json_encode(array("error" => "Método no permitido."));
        break;
}
?>
