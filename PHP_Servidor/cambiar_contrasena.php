<?php
/**
 * Este archivo PHP maneja la actualización de contraseña de usuarios en la base de datos.
 * Se espera que los datos se envíen mediante una solicitud POST.
 */

require 'database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");
header("Content-Type: application/x-www-form-urlencoded");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dni = isset($_POST['dni']) ? trim($_POST['dni']) : null;
    $contrasena = isset($_POST['contrasena']) ? trim($_POST['contrasena']) : null;

    if (!$dni || !$contrasena) {
        echo json_encode(array("error" => "Datos incompletos."));
        exit();
    }

    $hashedPassword = password_hash($contrasena, PASSWORD_DEFAULT);

    mysqli_begin_transaction($conn);
    try {
        $queryUsuario = "UPDATE USUARIOS SET CONTRASENA = ? WHERE DNI = ?";
        $stmtUsuario = mysqli_prepare($conn, $queryUsuario);
        mysqli_stmt_bind_param($stmtUsuario, 'ss', $hashedPassword, $dni);
        if (!mysqli_stmt_execute($stmtUsuario)) {
            throw new Exception("Error al actualizar la contraseña: " . mysqli_error($conn));
        }

        mysqli_commit($conn);
        echo json_encode(array("mensaje" => "Contraseña actualizada exitosamente."));
    } catch (Exception $e) {
        mysqli_rollback($conn);
        echo json_encode(array("error" => $e->getMessage()));
    } finally {
        mysqli_stmt_close($stmtUsuario);
    }
} else {
    echo json_encode(array("error" => "Método no permitido."));
}
?>
