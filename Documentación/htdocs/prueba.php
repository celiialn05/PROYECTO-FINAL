<?php
require 'database.php';
header("Access-Control-Allow-Origin: *");
// Leer datos del cuerpo de la solicitud
$input = json_decode(file_get_contents('php://input'), true);

// Verificar el método de la solicitud
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'POST':
        // Verificar si se han enviado los datos de nombre y correo
        if(isset($input['nombre']) && isset($input['email'])) {
            $nombre = $input['nombre'];
            $email = $input['email'];

            // Realizar la inserción en la base de datos
            $query = "INSERT INTO prueba (nombre, email) VALUES (?, ?)";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, 'ss', $nombre, $email);

            if (mysqli_stmt_execute($stmt)) {
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
        $dni = $_GET['dni'] ?? '';
        $contrasena = $_GET['contrasena'] ?? '';

        // Realizar la consulta en la base de datos para obtener las credenciales
        $query = "SELECT dni, contrasena FROM prueba WHERE dni=?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, 's', $dni);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);

        if (mysqli_stmt_num_rows($stmt) > 0) {
            mysqli_stmt_bind_result($stmt, $dniDB, $contrasenaDB);
            mysqli_stmt_fetch($stmt);

            // Verificar la contraseña utilizando password_verify() si está hasheada
            if (!empty($contrasenaDB) && password_verify($contrasena, $contrasenaDB)) {
                echo json_encode(array("valido" => true));
            } elseif ($dniDB === $dni && $contrasenaDB === $contrasena) {
                echo json_encode(array("valido" => true));
            } else {
                echo json_encode(array("error" => "Credenciales incorrectas."));
            }
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
