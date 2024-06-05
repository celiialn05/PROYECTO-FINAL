<?php
// Incluir el archivo de configuración de la base de datos
require 'database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Obtener los parámetros de la solicitud GET
$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : null;
$dni = isset($_GET['dni']) ? $_GET['dni'] : null;
$cantidad = isset($_GET['cantidad']) ? floatval($_GET['cantidad']) : null;

// Verificar si se proporcionaron todos los parámetros necesarios
if ($categoria === null || $dni === null || $cantidad === null) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan parámetros requeridos']);
    exit;
}

// Obtener el ID del usuario basado en el DNI
$sqlUsuario = "SELECT ID FROM USUARIOS WHERE DNI = '$dni'";
$resultUsuario = $conn->query($sqlUsuario);

if ($resultUsuario && $resultUsuario->num_rows > 0) {
    $rowUsuario = $resultUsuario->fetch_assoc();
    $idUsuario = $rowUsuario['ID'];

    // Obtener el ID de la categoría basado en el nombre de la categoría
    $sqlCategoria = "SELECT ID FROM CATEGORIAS WHERE CATEGORIA = '$categoria'";
    $resultCategoria = $conn->query($sqlCategoria);

    if ($resultCategoria && $resultCategoria->num_rows > 0) {
        $rowCategoria = $resultCategoria->fetch_assoc();
        $idCategoria = $rowCategoria['ID'];

        // Obtener la fecha actual
        $fechaRegistro = date('Y-m-d');

        // Insertar el nuevo registro en la tabla ESTADISTICAS
        $sqlInsert = "INSERT INTO ESTADISTICAS (FECHA_REGISTRO, MONTO, ID_USUARIO, ID_CATEGORIA) VALUES ('$fechaRegistro', $cantidad, $idUsuario, $idCategoria)";

        if ($conn->query($sqlInsert) === TRUE) {
            http_response_code(201);
            echo json_encode(['message' => 'Registro insertado correctamente']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error al insertar el registro: ' . $conn->error]);
        }
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Categoría no encontrada']);
    }
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Usuario no encontrado']);
}
?>
