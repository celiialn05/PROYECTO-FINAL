<?php
/**
 * Este archivo PHP maneja las solicitudes relacionadas con estadísticas financieras.
 * Proporciona endpoints para obtener datos estadísticos sobre gastos e ingresos de los usuarios.
 *
 */

// Incluir el archivo de configuración de la base de datos
require 'database.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

try {
    if ($conn->connect_error) {
        throw new Exception("Error al conectar a la base de datos: " . $conn->connect_error);
    }

    $method = $_SERVER['REQUEST_METHOD'];
    $query = isset($_GET['query']) ? $_GET['query'] : '';

    switch ($method) {
        case 'GET':
            switch ($query) {
                /**
                 * Maneja la solicitud GET para obtener estadísticas mensuales de gastos de un usuario.
                 * 
                 * @param int $year  Año de las estadísticas (opcional, por defecto el año actual).
                 * @param int $month Mes de las estadísticas (opcional, por defecto el mes actual).
                 * @param string $userDNI DNI del usuario del cual se desean obtener las estadísticas.
                 * 
                 * @return array Un array JSON con las estadísticas mensuales de gastos del usuario.
                 */
                case 'estadistica1':
                    $year = isset($_GET['year']) ? $_GET['year'] : date('Y');
                    $month = isset($_GET['month']) ? $_GET['month'] : date('m');
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
                            AND YEAR(e.FECHA_REGISTRO) = $year
                            AND MONTH(e.FECHA_REGISTRO) = $month
                            GROUP BY c.CATEGORIA";

                    $result = $conn->query($sql);
                    $response = [];

                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            $response[] = [
                                "name" => $row['CATEGORIA'],
                                "value" => $row['SUMA_MENSUAL']
                            ];
                        }
                    }
                    echo json_encode($response);
                    break;

                /**
                 * Maneja la solicitud GET para obtener estadísticas anuales de gastos e ingresos de un usuario.
                 * 
                 * @param int $year  Año de las estadísticas (opcional, por defecto el año actual).
                 * @param string $userDNI DNI del usuario del cual se desean obtener las estadísticas.
                 * 
                 * @return array Un array JSON con las estadísticas anuales de gastos e ingresos del usuario.
                 */
                case 'estadisticasanuales':
                    $year = isset($_GET['year']) ? $_GET['year'] : date('Y');
                    $userDNI = isset($_GET['dni']) ? $_GET['dni'] : null;

                    if ($userDNI === null) {
                        http_response_code(400);
                        echo json_encode(['error' => 'DNI de usuario no proporcionado']);
                        exit;
                    }

                    $sql_gastos = "SELECT MONTH(e.FECHA_REGISTRO) AS MES,
                                          COALESCE(SUM(e.MONTO), 0) AS GASTOS
                                   FROM ESTADISTICAS e
                                   LEFT JOIN CATEGORIAS c ON e.ID_CATEGORIA = c.ID
                                   WHERE c.CATEGORIA NOT IN ('Ahorros e Inversiones', 'Salario Mensual')
                                   AND YEAR(e.FECHA_REGISTRO) = $year
                                   AND e.ID_USUARIO IN (SELECT ID FROM USUARIOS WHERE DNI = '$userDNI')
                                   GROUP BY MONTH(e.FECHA_REGISTRO)";

                    $sql_ingresos = "SELECT MONTH(e.FECHA_REGISTRO) AS MES,
                                              COALESCE(SUM(e.MONTO), 0) AS INGRESOS_AHORROS
                                       FROM ESTADISTICAS e
                                       LEFT JOIN CATEGORIAS c ON e.ID_CATEGORIA = c.ID
                                       WHERE c.CATEGORIA IN ('Ahorros e Inversiones', 'Salario Mensual')
                                       AND YEAR(e.FECHA_REGISTRO) = $year
                                       AND e.ID_USUARIO IN (SELECT ID FROM USUARIOS WHERE DNI = '$userDNI')
                                       GROUP BY MONTH(e.FECHA_REGISTRO)";

                    $result_gastos = $conn->query($sql_gastos);
                    $result_ingresos = $conn->query($sql_ingresos);

                    $response = [];

                    // Inicializar los datos para todos los meses
                    for ($i = 1; $i <= 12; $i++) {
                        $response[$i] = [
                            "MES" => $i,
                            "GASTOS" => 0,
                            "INGRESOS_AHORROS" => 0
                        ];
                    }

                    // Actualizar los datos con los valores obtenidos de la base de datos
                    while ($row = $result_gastos->fetch_assoc()) {
                        $mes = $row['MES'];
                        $response[$mes]['GASTOS'] = $row['GASTOS'];
                    }

                    while ($row = $result_ingresos->fetch_assoc()) {
                        $mes = $row['MES'];
                        $response[$mes]['INGRESOS_AHORROS'] = $row['INGRESOS_AHORROS'];
                    }

                    // Convertir el array asociativo a un array indexado
                    $response = array_values($response);

                    echo json_encode($response);
                    break;

                default:
                    http_response_code(405);
                    echo json_encode(['error' => 'Método no permitido']);
                    break;
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
