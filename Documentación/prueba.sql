-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-04-2024 a las 21:13:27
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `financify`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prueba`
--

CREATE TABLE `prueba` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `edad` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `dni` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prueba`
--

INSERT INTO `prueba` (`id`, `nombre`, `edad`, `email`, `contrasena`, `dni`) VALUES
(1, 'Juan', 30, 'juan@example.com', 'juanito', '52022396F'),
(2, 'María', 25, 'maria@example.com', NULL, NULL),
(3, 'Pedro', 35, 'pedro@example.com', NULL, NULL),
(4, 'Ana', 28, 'ana@example.com', NULL, NULL),
(5, 'Luis', 40, 'luis@example.com', NULL, NULL),
(6, 'Laura', 32, 'laura@example.com', NULL, NULL),
(7, 'Carlos', 29, 'carlos@example.com', NULL, NULL),
(8, 'Sofía', 27, 'sofia@example.com', NULL, NULL),
(9, 'Diego', 33, 'diego@example.com', NULL, NULL),
(10, 'Elena', 31, 'elena@example.com', NULL, NULL),
(11, 'Pablo', 36, 'pablo@example.com', NULL, NULL),
(12, 'Carmen', 26, 'carmen@example.com', NULL, NULL),
(13, 'Mario', 34, 'mario@example.com', NULL, NULL),
(14, 'Julia', 29, 'julia@example.com', NULL, NULL),
(15, 'Francisco', 38, 'francisco@example.com', NULL, NULL),
(16, 'Isabel', 30, 'isabel@example.com', NULL, NULL),
(17, 'Antonio', 37, 'antonio@example.com', NULL, NULL),
(18, 'Marta', 28, 'marta@example.com', NULL, NULL),
(19, 'Roberto', 39, 'roberto@example.com', NULL, NULL),
(20, 'Lucía', 24, 'lucia@example.com', NULL, NULL),
(21, 'Nombre de Prueba', NULL, 'prueba@example.com', NULL, NULL),
(22, 'eee', NULL, 'eee', NULL, NULL),
(23, 'LEEANN', NULL, 'LIIIAN', NULL, NULL),
(24, 'pureba', NULL, 'pureba', NULL, NULL),
(25, 'pureba', NULL, 'pureba', NULL, NULL),
(26, 'ee', NULL, 'ee', NULL, NULL),
(27, 'ruthr gierug', NULL, 'fgfr gdfb', NULL, NULL),
(28, 'Nombre de Prueba', NULL, 'prueba@example.com', NULL, NULL),
(29, 'eerferer', NULL, 'ererer', NULL, NULL),
(30, 'daniela', NULL, 'daniela@example.com', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `prueba`
--
ALTER TABLE `prueba`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `prueba`
--
ALTER TABLE `prueba`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
