<?php
require 'database.php';
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener y validar los datos del formulario
    $dni = isset($_POST['dni']) ? trim($_POST['dni']) : null;
    $contrasena = isset($_POST['contrasena']) ? trim($_POST['contrasena']) : null;
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : null;
    $apellido = isset($_POST['apellido']) ? trim($_POST['apellido']) : null;
    $edad = isset($_POST['edad']) ? intval($_POST['edad']) : null;
    $imagen = isset($_FILES['imagen']) ? $_FILES['imagen'] : null;

    // Validar que todos los campos requeridos estén presentes
    if (!$dni || !$contrasena || !$nombre || !$apellido || !$edad) {
        echo json_encode(array("error" => "Datos incompletos."));
        exit();
    }

    // Manejar la imagen si está presente
    $imagenData = null;
    if ($imagen && $imagen['error'] === UPLOAD_ERR_OK) {
        $imagenPath = $imagen['tmp_name'];
        $imagenData = addslashes(file_get_contents($imagenPath)); // Escapar la imagen para evitar problemas de seguridad
    }

    // Hashear la contraseña
    $hashedPassword = password_hash($contrasena, PASSWORD_DEFAULT);

    // Iniciar una transacción
    mysqli_begin_transaction($conn);
    try {
        // Insertar en la tabla USUARIOS
        $queryUsuario = "INSERT INTO USUARIOS (DNI, CONTRASENA) VALUES (?, ?)";
        $stmtUsuario = mysqli_prepare($conn, $queryUsuario);
        mysqli_stmt_bind_param($stmtUsuario, 'ss', $dni, $hashedPassword);
        if (!mysqli_stmt_execute($stmtUsuario)) {
            throw new Exception("Error en la inserción del usuario: " . mysqli_error($conn));
        }

        $idUsuario = mysqli_insert_id($conn);

        // Insertar en la tabla DATOS_USUARIOS
        if ($imagenData) {
            $queryDatosUsuario = "INSERT INTO DATOS_USUARIOS (NOMBRE, APELLIDO, EDAD, IMAGEN, ID_USUARIO) VALUES (?, ?, ?, ?, ?)";
            $stmtDatosUsuario = mysqli_prepare($conn, $queryDatosUsuario);
            mysqli_stmt_bind_param($stmtDatosUsuario, 'ssisi', $nombre, $apellido, $edad, $imagenData, $idUsuario);
        } else {
            $queryDatosUsuario = "INSERT INTO DATOS_USUARIOS (NOMBRE, APELLIDO, EDAD, ID_USUARIO) VALUES (?, ?, ?, ?)";
            $stmtDatosUsuario = mysqli_prepare($conn, $queryDatosUsuario);
            mysqli_stmt_bind_param($stmtDatosUsuario, 'ssii', $nombre, $apellido, $edad, $idUsuario);
        }

        if (!mysqli_stmt_execute($stmtDatosUsuario)) {
            throw new Exception("Error en la inserción de datos del usuario: " . mysqli_error($conn));
        }

        // Confirmar la transacción
        mysqli_commit($conn);
        echo json_encode(array("mensaje" => "Inserción exitosa."));
    } catch (Exception $e) {
        // Revertir la transacción en caso de error
        mysqli_rollback($conn);
        echo json_encode(array("error" => $e->getMessage()));
    } finally {
        mysqli_stmt_close($stmtUsuario);
        if (isset($stmtDatosUsuario)) {
            mysqli_stmt_close($stmtDatosUsuario);
        }
    }
} else {
    echo json_encode(array("error" => "Método no permitido."));
}
?>
