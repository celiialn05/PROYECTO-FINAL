<?php

// Define la contraseña que deseas hashear
$contrasena = 'mi_contrasena';

// Hashea la contraseña
$hash = password_hash($contrasena, PASSWORD_DEFAULT);

// Imprime el hash resultante
echo "Contraseña hasheada: " . $hash;

?>