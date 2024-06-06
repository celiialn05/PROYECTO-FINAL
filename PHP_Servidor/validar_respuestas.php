<?php
/**
 * Este archivo PHP maneja las solicitudes relacionadas con la verificación de respuestas de seguridad.
 *
 */

require 'database2.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

/**
 * Función para verificar las respuestas de seguridad proporcionadas por el usuario.
 *
 * @param string $dni        DNI del usuario
 * @param string $email      Correo electrónico del usuario
 * @param array  $respuestas Respuestas proporcionadas por el usuario
 *
 * @return array Resultado de la verificación
 */
function verificarRespuestas($dni, $email, $respuestas)
{
    $conn = connectDB(); // Llamar a la función connectDB

    // Consulta para obtener el ID del usuario
    $stmt_verificar_usuario = $conn->prepare("SELECT id FROM USUARIOS WHERE DNI = ?");
    $stmt_verificar_usuario->bind_param("s", $dni);
    $stmt_verificar_usuario->execute();
    $stmt_verificar_usuario->store_result();

    if ($stmt_verificar_usuario->num_rows > 0) {
        $stmt_verificar_usuario->bind_result($id_usuario);
        $stmt_verificar_usuario->fetch();

        // Consulta para verificar si el correo está asociado al ID de usuario en la tabla DATOS_USUARIOS
        $stmt_verificar_email = $conn->prepare("SELECT id_usuario FROM DATOS_USUARIOS WHERE ID_USUARIO = ? AND EMAIL = ?");
        $stmt_verificar_email->bind_param("is", $id_usuario, $email);
        $stmt_verificar_email->execute();
        $stmt_verificar_email->store_result();

        if ($stmt_verificar_email->num_rows > 0) {
            $correcto = true;
            $preguntas = 3;

            if (is_array($respuestas)) { // Verificar si $respuestas es un array
                for ($i = 0; $i < $preguntas; $i++) {
                    $id_pregunta = $i + 1;
                    $respuesta_proporcionada = strtolower($respuestas[$i]);

                    // Consulta para obtener la respuesta correcta
                    $stmt_obtener_respuesta = $conn->prepare("SELECT LOWER(RESPUESTA) FROM RESPUESTAS_SEGURIDAD WHERE ID_PREGUNTA = ? AND ID_USUARIO = ?");
                    $stmt_obtener_respuesta->bind_param("ii", $id_pregunta, $id_usuario);
                    $stmt_obtener_respuesta->execute();
                    $stmt_obtener_respuesta->store_result();
                    $stmt_obtener_respuesta->bind_result($respuesta_correcta);
                    $stmt_obtener_respuesta->fetch();

                    if ($stmt_obtener_respuesta->num_rows > 0) {
                        if ($respuesta_proporcionada !== $respuesta_correcta) {
                            $correcto = false;
                            break;
                        }
                    } else {
                        $correcto = false;
                        break;
                    }
                }
            } else {
                $correcto = false;
            }

            if ($correcto) {
                return array("resultado" => true, "mensaje" => "Todas las respuestas son correctas.");
            } else {
                return array("resultado" => false, "mensaje" => "Una o más respuestas son incorrectas.");
            }
        } else {
            return array("error" => "El correo electrónico proporcionado no está asociado al usuario.");
        }
    } else {
        return array("error" => "El DNI proporcionado no corresponde a un usuario existente.");
    }

    $stmt_verificar_usuario->close();
    $stmt_verificar_email->close();
    $conn->close();
}

// Manejo de la solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dni = $_POST['dni'];
    $email = $_POST['email'];
    $respuestas = $_POST['respuestas']; // Esto debería ser un array

    $resultado = verificarRespuestas($dni, $email, $respuestas);
    echo json_encode($resultado);
}
?>
