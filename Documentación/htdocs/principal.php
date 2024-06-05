<?php
// Incluir el archivo de configuración de la base de datos
require 'database.php';
header("Access-Control-Allow-Origin: *");
// Obtener el DNI del parámetro GET
$dni = $_GET['dni'];

// Buscar el usuario con el DNI especificado
$sql = "SELECT ID FROM USUARIOS WHERE DNI = '$dni'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Usuario encontrado, obtener su ID
    $row = $result->fetch_assoc();
    $id_usuario = $row["ID"];

    // Buscar la imagen en la tabla DATOS_USUARIOS usando el ID del usuario
    $sql_imagen = "SELECT IMAGEN FROM DATOS_USUARIOS WHERE ID_USUARIO = '$id_usuario'";
    $result_imagen = $conn->query($sql_imagen);

    if ($result_imagen->num_rows > 0) {
        // Imagen encontrada, devolverla como respuesta
        $row_imagen = $result_imagen->fetch_assoc();
        header("Content-Type: image/jpeg");
        echo $row_imagen["IMAGEN"];
    } else {
        // No se encontró ninguna imagen para el usuario
        echo "No se encontró ninguna imagen para el usuario con DNI: " . $dni;
    }
} else {
    // No se encontró ningún usuario con el DNI especificado
    echo "No se encontró ningún usuario con DNI: " . $dni;
}

// Cerrar la conexión (si se está utilizando)
$conn->close();
?>
