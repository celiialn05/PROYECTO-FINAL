<?php
// Incluir el archivo de configuración de la base de datos
require 'database.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Crear una conexión a la base de datos
try {
    if ($conn->connect_error) {
        throw new Exception("Error al conectar a la base de datos: " . $conn->connect_error);
    }

    // Obtener el método de la petición
    $method = $_SERVER['REQUEST_METHOD'];

    // Obtener el parámetro 'query' de la URL para determinar el tipo de solicitud
    $query = isset($_GET['query']) ? $_GET['query'] : '';

    switch ($method) {
        case 'GET':
            switch ($query) {
                case 'categorias':
                    // Consulta para obtener todas las categorías
                    $sql = "SELECT * FROM CATEGORIAS";
                    break;

                case 'montos':
                    // Obtener el mes y el año actual
                    $currentMonth = date('m');
                    $currentYear = date('Y');

                    // Obtener el DNI del usuario de la solicitud
                    $userDNI = isset($_GET['dni']) ? $_GET['dni'] : null;

                    // Verificar si se proporcionó el DNI del usuario
                    if ($userDNI === null) {
                        http_response_code(400);
                        echo json_encode(['error' => 'DNI de usuario no proporcionado']);
                        exit;
                    }

                    // Consulta para obtener la suma mensual de gastos por categoría del usuario en el mes actual
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

            // Ejecutar la consulta
            $result = $conn->query($sql);

            if ($result) {
                $response = [];
                while ($row = $result->fetch_assoc()) {
                    $response[] = $row;
                }
                // Devolver los resultados en formato JSON
                echo json_encode($response);
            } else {
                // Si no hay resultados, devolver un array vacío
                echo json_encode([]);
            }
            break;

             case 'POST':
            // Leer los datos del cuerpo de la petición
            $data = json_decode(file_get_contents('php://input'), true);

            // Obtener los parámetros de la solicitud
            $categoria = isset($data['categoria']) ? $data['categoria'] : null;
            $dni = isset($data['dni']) ? $data['dni'] : null;
            $cantidad = isset($data['cantidad']) ? floatval($data['cantidad']) : null;

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
