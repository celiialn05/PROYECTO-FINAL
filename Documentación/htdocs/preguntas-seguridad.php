<?php
require 'database.php';

// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST"); // Permitir los métodos GET y POST
header("Access-Control-Allow-Headers: Content-Type"); // Permitir el encabezado Content-Type
header("Content-Type: application/json; charset=UTF-8");

// Establecer la conexión a la base de datos en UTF-8
mysqli_set_charset($conn, "utf8");

// Verificar el método de la solicitud
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $query = $_GET['query'] ?? '';

    if ($query === 'preguntas') {
        obtenerPreguntas($conn);
    } elseif ($query === 'verificar_respuestas') {
        verificarRespuestas($conn);
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

function obtenerPreguntas($conn) {
    // Obtener todas las preguntas de seguridad
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

function enviarRespuestas($conn, $data) {
    // Verificar si la solicitud contiene los datos necesarios
    if (!isset($data['dni']) || !isset($data['respuestas'])) {
        echo json_encode(array("error" => "Datos incompletos."));
        return;
    }

    // Extraer datos de la solicitud
    $dni = $data['dni'];
    $respuestas = $data['respuestas'];

    // Verificar si el usuario con el DNI proporcionado existe en la base de datos
    $stmt_verificar_dni = $conn->prepare("SELECT id FROM usuarios WHERE dni = ?");
    $stmt_verificar_dni->bind_param("s", $dni);
    $stmt_verificar_dni->execute();
    $stmt_verificar_dni->store_result();

    if ($stmt_verificar_dni->num_rows > 0) {
        // Obtener el ID del usuario
        $stmt_verificar_dni->bind_result($id_usuario);
        $stmt_verificar_dni->fetch();

        // Insertar las respuestas en la base de datos
        $stmt_insertar_respuestas = $conn->prepare("INSERT INTO respuestas_seguridad (respuesta, id_pregunta, id_usuario) VALUES (?, ?, ?)");

        // Respuestas en orden (asumimos 3 preguntas)
        $preguntas = 3; // Número total de preguntas
        for ($i = 1; $i <= $preguntas; $i++) {
            $respuesta = $respuestas[$i]; // Obtener respuesta para la pregunta actual
            $stmt_insertar_respuestas->bind_param("sii", $respuesta, $i, $id_usuario); // Insertar en la pregunta correspondiente
            $stmt_insertar_respuestas->execute();
        }

        $stmt_insertar_respuestas->close();
        echo json_encode(array("mensaje" => "Respuestas enviadas correctamente."));
    } else {
        echo json_encode(array("error" => "El DNI proporcionado no corresponde a un usuario existente."));
    }

    $stmt_verificar_dni->close();
}

function verificarRespuestas($conn) {
    // Verificar si la solicitud contiene los datos necesarios
    if (!isset($_GET['dni']) || !isset($_GET['correo']) || !isset($_GET['respuestas'])) {
        echo json_encode(array("error" => "Datos incompletos."));
        return;
    }

    // Extraer datos de la solicitud
    $dni = $_GET['dni'];
    $correo = $_GET['correo'];
    $respuestas = json_decode($_GET['respuestas'], true);

    // Verificar si el usuario con el DNI y correo proporcionados existe en la base de datos
    $stmt_verificar_usuario = $conn->prepare("SELECT id FROM usuarios WHERE dni = ? AND correo = ?");
    $stmt_verificar_usuario->bind_param("ss", $dni, $correo);
    $stmt_verificar_usuario->execute();
    $stmt_verificar_usuario->store_result();

    if ($stmt_verificar_usuario->num_rows > 0) {
        // Obtener el ID del usuario
        $stmt_verificar_usuario->bind_result($id_usuario);
        $stmt_verificar_usuario->fetch();

        // Verificar las respuestas con las respuestas almacenadas en la base de datos
        $correcto = true;
        $preguntas = 3; // Número total de preguntas
        for ($i = 1; $i <= $preguntas; $i++) {
            $respuesta_proporcionada = strtolower($respuestas[$i - 1]); // Obtener y normalizar la respuesta proporcionada

            $stmt_obtener_respuesta = $conn->prepare("SELECT LOWER(respuesta) FROM respuestas_seguridad WHERE id_pregunta = ? AND id_usuario = ?");
            $stmt_obtener_respuesta->bind_param("ii", $i, $id_usuario);
            $stmt_obtener_respuesta->execute();
            $stmt_obtener_respuesta->store_result();

            if ($stmt_obtener_respuesta->num_rows > 0) {
                $stmt_obtener_respuesta->bind_result($respuesta_correcta);
                $stmt_obtener_respuesta->fetch();

                if ($respuesta_proporcionada !== $respuesta_correcta) {
                    $correcto = false;
                    break;
                }
            } else {
                $correcto = false;
                break;
            }

            $stmt_obtener_respuesta->close();
        }

        if ($correcto) {
            echo json_encode(array("resultado" => true, "mensaje" => "Todas las respuestas son correctas."));
        } else {
            echo json_encode(array("resultado" => false, "mensaje" => "Una o más respuestas son incorrectas."));
        }
    } else {
        echo json_encode(array("error" => "El DNI o el correo electrónico proporcionados no corresponden a un usuario existente."));
    }

    $stmt_verificar_usuario->close();
}

?>
