<?php
/**
 * Este archivo PHP maneja las solicitudes relacionadas con las preguntas de seguridad.
 * Proporciona endpoints para obtener preguntas y enviar respuestas.
 *
 */

require 'database.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

mysqli_set_charset($conn, "utf8");

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $query = $_GET['query'] ?? '';

    if ($query === 'preguntas') {
        obtenerPreguntas($conn);
    } elseif ($query === 'verificar_respuestas') {
        // Funcionalidad para verificar respuestas no implementada
    } else {
        echo json_encode(array("error" => "Query no válido."));
    }
} elseif ($method === 'POST') {
    $query = $_GET['query'] ?? '';

    if ($query === 'respuestas') {
        $data = json_decode(file_get_contents('php://input'), true);
        enviarRespuestas($conn, $data);
    } else {
        echo json_encode(array("error" => "Query no válido."));
    }
} else {
    echo json_encode(array("error" => "Método no permitido."));
}

mysqli_close($conn);

/**
 * Función para obtener las preguntas de seguridad desde la base de datos.
 *
 * @param mysqli $conn Conexión a la base de datos
 *
 * @return void
 */
function obtenerPreguntas($conn) {
    $query = "SELECT id, pregunta FROM preguntas_seguridad";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $preguntas = array();
        while ($row = mysqli_fetch_assoc($result)) {
            $preguntas[] = $row;
        }
        echo json_encode($preguntas, JSON_UNESCAPED_UNICODE);
    } else {
        echo json_encode(array("error" => "Error al obtener las preguntas: " . mysqli_error($conn)));
    }
}

/**
 * Función para enviar las respuestas de seguridad a la base de datos.
 *
 * @param mysqli $conn Conexión a la base de datos
 * @param array  $data Datos recibidos de la solicitud
 *
 * @return void
 */
function enviarRespuestas($conn, $data) {
    if (!isset($data['dni']) || !isset($data['respuestas'])) {
        echo json_encode(array("error" => "Datos incompletos."));
        return;
    }

    $dni = $data['dni'];
    $respuestas = $data['respuestas'];

    $stmt_verificar_dni = $conn->prepare("SELECT id FROM usuarios WHERE dni = ?");
    $stmt_verificar_dni->bind_param("s", $dni);
    $stmt_verificar_dni->execute();
    $stmt_verificar_dni->store_result();

    if ($stmt_verificar_dni->num_rows > 0) {
        $stmt_verificar_dni->bind_result($id_usuario);
        $stmt_verificar_dni->fetch();

        $stmt_insertar_respuestas = $conn->prepare("INSERT INTO respuestas_seguridad (respuesta, id_pregunta, id_usuario) VALUES (?, ?, ?)");

        $preguntas = 3;
        for ($i = 1; $i <= $preguntas; $i++) {
            $respuesta = $respuestas[$i];
            $stmt_insertar_respuestas->bind_param("sii", $respuesta, $i, $id_usuario);
            $stmt_insertar_respuestas->execute();
        }

        $stmt_insertar_respuestas->close();
        echo json_encode(array("mensaje" => "Respuestas enviadas correctamente."));
    } else {
        echo json_encode(array("error" => "El DNI proporcionado no corresponde a un usuario existente."));
    }

    $stmt_verificar_dni->close();
}

?>
