<?php
require 'database.php';
header("Access-Control-Allow-Origin: *");
// Leer datos del cuerpo de la solicitud
$input = json_decode(file_get_contents('php://input'), true);

// Verificar el método de la solicitud
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Obtener los datos de DNI y contraseña de la solicitud GET
        $dni = $_GET['dni'] ?? '';
        $contrasena = $_GET['contrasena'] ?? '';

        // Realizar la consulta en la base de datos para obtener las credenciales
        $query = "SELECT dni, contrasena FROM usuarios WHERE dni=?";
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
