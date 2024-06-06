<?php
/**
 * Este archivo PHP maneja consultas relacionadas con categorías y estadísticas de gastos en la base de datos.
 * Permite obtener información sobre categorías y montos de gastos, así como insertar nuevos registros de gastos.
 *
 */

require 'database.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    if ($conn->connect_error) {
        throw new Exception("Error al conectar a la base de datos: " . $conn->connect_error);
    }

    /**
     * Maneja las solicitudes GET para obtener información sobre categorías y montos de gastos.
     */
    function handleGETRequest() {
        global $conn;

        $query = isset($_GET['query']) ? $_GET['query'] : '';

        switch ($query) {
            case 'categorias':
                $sql = "SELECT * FROM CATEGORIAS";
                break;

            case 'montos':
                $currentMonth = date('m');
                $currentYear = date('Y');
                $userDNI = isset($_GET['dni']) ? $_GET['dni'] : null;

                if ($userDNI === null) {
                    http_response_code(400);
                    echo json_encode(['error' => 'DNI de usuario no proporcionado']);
                    exit;
                }

                $sql = "SELECT c.CATEGORIA, COALESCE(SUM(e.MONTO), 0) AS SUMA_MENSUAL
                        FROM CATEGORIAS c
                        LEFT JOIN ESTADISTICAS e ON c.ID = e.ID_CATEGORIA
                        LEFT JOIN USUARIOS u ON e.ID_USUARIO = u.ID
                        WHERE u.DNI = '$userDNI'
                        AND YEAR(e.FECHA_REGISTRO) = $currentYear
                        AND MONTH(e.FECHA_REGISTRO) = $currentMonth
                        GROUP BY c.CATEGORIA";
                break;

            default:
                http_response_code(400);
                echo json_encode(['error' => 'Tipo de consulta no válido']);
                exit;
        }

        $result = $conn->query($sql);

        if ($result) {
            $response = [];
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }
            echo json_encode($response);
        } else {
            echo json_encode([]);
        }
    }

    /**
     * Maneja las solicitudes POST para insertar nuevos registros de gastos.
     */
    function handlePOSTRequest() {
        global $conn;

        $data = json_decode(file_get_contents('php://input'), true);

        $categoria = isset($data['categoria']) ? $data['categoria'] : null;
        $dni = isset($data['dni']) ? $data['dni'] : null;
        $cantidad = isset($data['cantidad']) ? floatval($data['cantidad']) : null;

        if ($categoria === null || $dni === null || $cantidad === null) {
            http_response_code(400);
            echo json_encode(['error' => 'Faltan parámetros requeridos']);
            exit;
        }

        $sqlUsuario = "SELECT ID FROM USUARIOS WHERE DNI = '$dni'";
        $resultUsuario = $conn->query($sqlUsuario);

        if ($resultUsuario && $resultUsuario->num_rows > 0) {
            $rowUsuario = $resultUsuario->fetch_assoc();
            $idUsuario = $rowUsuario['ID'];

            $sqlCategoria = "SELECT ID FROM CATEGORIAS WHERE CATEGORIA = '$categoria'";
            $resultCategoria = $conn->query($sqlCategoria);

            if ($resultCategoria && $resultCategoria->num_rows > 0) {
                $rowCategoria = $resultCategoria->fetch_assoc();
                $idCategoria = $rowCategoria['ID'];
                $fechaRegistro = date('Y-m-d');
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
    }

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            handleGETRequest();
            break;

        case 'POST':
            handlePOSTRequest();
            break;

        default:
            http_response_code(405);
            echo json_encode(['error' => 'Método no permitido']);
            break;
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>
