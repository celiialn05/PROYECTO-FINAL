<?php
/**
 * Este archivo PHP maneja la creación de nuevos usuarios en la base de datos.
 * Permite registrar nuevos usuarios con información básica y opcionalmente una imagen.
 *
 */

require 'database.php';
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    /**
     * Maneja las solicitudes POST para registrar nuevos usuarios.
     */
    function handlePOSTRequest() {
        global $conn;

        $dni = isset($_POST['dni']) ? trim($_POST['dni']) : null;
        $contrasena = isset($_POST['contrasena']) ? trim($_POST['contrasena']) : null;
        $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : null;
        $apellido = isset($_POST['apellido']) ? trim($_POST['apellido']) : null;
        $edad = isset($_POST['edad']) ? intval($_POST['edad']) : null;
        $email = isset($_POST['email']) ? trim($_POST['email']) : null;
        $imagen = isset($_FILES['imagen']) ? $_FILES['imagen'] : null;

        if (!$dni || !$contrasena || !$nombre || !$apellido || !$edad || !$email) {
            echo json_encode(array("error" => "Datos incompletos."));
            exit();
        }

        $imagenData = null;
        if ($imagen && $imagen['error'] === UPLOAD_ERR_OK) {
            $imagenPath = $imagen['tmp_name'];
            $imagenData = addslashes(file_get_contents($imagenPath));
        }

        $hashedPassword = password_hash($contrasena, PASSWORD_DEFAULT);

        mysqli_begin_transaction($conn);
        try {
            $queryUsuario = "INSERT INTO USUARIOS (DNI, CONTRASENA) VALUES (?, ?)";
            $stmtUsuario = mysqli_prepare($conn, $queryUsuario);
            mysqli_stmt_bind_param($stmtUsuario, 'ss', $dni, $hashedPassword);
            if (!mysqli_stmt_execute($stmtUsuario)) {
                throw new Exception("Error en la inserción del usuario: " . mysqli_error($conn));
            }

            $idUsuario = mysqli_insert_id($conn);

            if ($imagenData) {
                $queryDatosUsuario = "INSERT INTO DATOS_USUARIOS (NOMBRE, APELLIDO, EDAD, EMAIL, IMAGEN, ID_USUARIO) VALUES (?, ?, ?, ?, ?, ?)";
                $stmtDatosUsuario = mysqli_prepare($conn, $queryDatosUsuario);
                mysqli_stmt_bind_param($stmtDatosUsuario, 'ssissi', $nombre, $apellido, $edad, $email, $imagenData, $idUsuario);
            } else {
                $queryDatosUsuario = "INSERT INTO DATOS_USUARIOS (NOMBRE, APELLIDO, EDAD, EMAIL, ID_USUARIO) VALUES (?, ?, ?, ?, ?)";
                $stmtDatosUsuario = mysqli_prepare($conn, $queryDatosUsuario);
                mysqli_stmt_bind_param($stmtDatosUsuario, 'sssii', $nombre, $apellido, $edad, $email, $idUsuario);
            }

            if (!mysqli_stmt_execute($stmtDatosUsuario)) {
                throw new Exception("Error en la inserción de datos del usuario: " . mysqli_error($conn));
            }

            mysqli_commit($conn);
            echo json_encode(array("mensaje" => "Inserción exitosa."));
        } catch (Exception $e) {
            mysqli_rollback($conn);
            echo json_encode(array("error" => $e->getMessage()));
        } finally {
            mysqli_stmt_close($stmtUsuario);
            if (isset($stmtDatosUsuario)) {
                mysqli_stmt_close($stmtDatosUsuario);
            }
        }
    }

    handlePOSTRequest();
} else {
    echo json_encode(array("error" => "Método no permitido."));
}
?>
