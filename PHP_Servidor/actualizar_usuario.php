<?php
/**
 * Este archivo PHP maneja solicitudes relacionadas con usuarios en una base de datos.
 * Permite recibir y modificar datos de usuario.
 *
 */

require 'database.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Obtener el tipo de solicitud
$tipo_solicitud = $_REQUEST['query'] ?? '';

switch ($tipo_solicitud) {
    case 'recibir':
        recibirDatosUsuario($conn);
        break;
    case 'modificar':
        modificarUsuario($conn);
        break;
    default:
        // Tipo de solicitud no válido
        echo json_encode(array("error" => "Tipo de solicitud no válido."));
        break;
}

/**
 * Función para recibir datos de un usuario según su DNI.
 *
 * @param object $conn La conexión a la base de datos.
 *
 * @return void
 */
function recibirDatosUsuario($conn) {
    $dni = $_GET['dni'] ?? '';

    if (!$dni) {
        echo json_encode(array("error" => "Falta el DNI."));
        return;
    }

    // Consulta para obtener los datos del usuario
    $sql = "SELECT u.ID, u.DNI, d.NOMBRE, d.APELLIDO, d.EDAD, d.EMAIL
            FROM USUARIOS u
            INNER JOIN DATOS_USUARIOS d ON u.ID = d.ID_USUARIO
            WHERE u.DNI = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $dni);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();
        echo json_encode($usuario);
    } else {
        echo json_encode(array("error" => "Usuario no encontrado."));
    }

    $stmt->close();
}

/**
 * Función para modificar datos de un usuario.
 *
 * @param object $conn La conexión a la base de datos.
 *
 * @return void
 */
function modificarUsuario($conn) {
    $data = json_decode(file_get_contents("php://input"), true);

    $dni = $data['dni'] ?? '';
    $nombre = $data['nombre'] ?? '';
    $apellido = $data['apellido'] ?? '';
    $edad = $data['edad'] ?? '';
    $email = $data['email'] ?? '';

    if (!$dni) {
        echo json_encode(array("error" => "Falta el DNI."));
        return;
    }

    $conn->begin_transaction();

    try {
    
        $sql_id = "SELECT ID FROM USUARIOS WHERE DNI = ?";
        $stmt_id = $conn->prepare($sql_id);
        $stmt_id->bind_param("s", $dni);
        $stmt_id->execute();
        $result_id = $stmt_id->get_result();

        if ($result_id->num_rows > 0) {
            $row = $result_id->fetch_assoc();
            $id_usuario = $row['ID'];

            // Preparar la consulta de actualización para DATOS_USUARIOS
            $sql_update_datos = "UPDATE DATOS_USUARIOS SET ";
            $params_datos = [];
            $types_datos = '';

            if ($nombre) {
                $sql_update_datos .= "NOMBRE = ?, ";
                $params_datos[] = $nombre;
                $types_datos .= 's';
            }
            if ($apellido) {
                $sql_update_datos .= "APELLIDO = ?, ";
                $params_datos[] = $apellido;
                $types_datos .= 's';
            }
            if ($edad) {
                $sql_update_datos .= "EDAD = ?, ";
                $params_datos[] = $edad;
                $types_datos .= 'i';
            }
            if ($email) {
                $sql_update_datos .= "EMAIL = ?, ";
                $params_datos[] = $email;
                $types_datos .= 's';
            }

            if ($params_datos) {
                $sql_update_datos = rtrim($sql_update_datos, ", ") . " WHERE ID_USUARIO = ?";
                $params_datos[] = $id_usuario;
                $types_datos .= 'i';

                // Ejecutar la consulta de actualización para DATOS_USUARIOS
                $stmt_update_datos = $conn->prepare($sql_update_datos);
                $stmt_update_datos->bind_param($types_datos, ...$params_datos);

                if ($stmt_update_datos->execute()) {
                    echo json_encode(array("mensaje" => "Datos del usuario actualizados correctamente."));
                } else {
                    throw new Exception("Error al actualizar los datos del usuario: " . $conn->error);
                }

                $stmt_update_datos->close();
            }

        } else {
            echo json_encode(array("error" => "Usuario no encontrado."));
        }

        $stmt_id->close();
        $conn->commit();
    } catch (Exception $e) {
        $conn->rollback();
        echo json_encode(array("error" => $e->getMessage()));
    }
}

$conn->close();
?>
