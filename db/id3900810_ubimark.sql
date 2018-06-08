-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-06-2018 a las 10:48:47
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `id3900810_ubimark`
--
CREATE DATABASE IF NOT EXISTS `id3900810_ubimark` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `id3900810_ubimark`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `busquedas`
--

CREATE TABLE `busquedas` (
  `Id_busqueda` int(11) NOT NULL,
  `busqueda` varchar(40) COLLATE utf16_spanish2_ci NOT NULL,
  `coords` varchar(50) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `estado` varchar(50) COLLATE utf16_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish2_ci;

--
-- Volcado de datos para la tabla `busquedas`
--

INSERT INTO `busquedas` (`Id_busqueda`, `busqueda`, `coords`, `estado`) VALUES
(5, 'tenis', '20.6504542,-103.43829649999999', 'Jalisco'),
(6, 'xbox', '20.6504542,-103.43829649999999', 'Jalisco'),
(7, 'tenis', '20.650444999999998,-103.43829009999999', 'Jalisco'),
(8, 'tenis', '20.6504199,-103.4382861', 'Jalisco'),
(9, 'camisa', '20.3807687,-102.92041259999999', 'Jalisco'),
(10, 'teclado', '20.3806394,-102.92038', 'Jalisco'),
(11, 'playera', '', ''),
(12, 'zapato', '', ''),
(13, 'camisa', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `folio_carrito` int(10) NOT NULL,
  `Id_usuario` int(11) NOT NULL,
  `Id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish2_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`folio_carrito`, `Id_usuario`, `Id_producto`, `cantidad`) VALUES
(7, 1, 3, 1),
(8, 1, 1, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `Id_empresa` int(11) NOT NULL,
  `Id_usuario` int(11) NOT NULL,
  `nombre_empresa` varchar(50) COLLATE utf16_spanish2_ci NOT NULL,
  `RFC` varchar(50) COLLATE utf16_spanish2_ci NOT NULL,
  `email` varchar(40) COLLATE utf16_spanish2_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf16_spanish2_ci NOT NULL,
  `coordenadas` varchar(50) COLLATE utf16_spanish2_ci NOT NULL,
  `calificacion` varchar(3) COLLATE utf16_spanish2_ci NOT NULL,
  `pais` varchar(10) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `estado` varchar(20) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `ciudad` varchar(30) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `delegacion` varchar(30) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `colonia` varchar(30) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `cp` int(6) DEFAULT NULL,
  `calle` varchar(30) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `numinterior` varchar(3) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `numero` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish2_ci;

--
-- Volcado de datos para la tabla `empresa`
--

INSERT INTO `empresa` (`Id_empresa`, `Id_usuario`, `nombre_empresa`, `RFC`, `email`, `telefono`, `coordenadas`, `calificacion`, `pais`, `estado`, `ciudad`, `delegacion`, `colonia`, `cp`, `calle`, `numinterior`, `numero`) VALUES
(1, 1, 'Codeshil', 'COD180309RJ5', 'codeshil@codeshil.com', '3314572269', '20.3767366,-102.9287737', '3', 'Mexico', 'Jalisco', 'Poncitlan', 'Poncitlan', 'Bellavista', 45950, 'Hidalgo', '', 600),
(2, 2, 'ISUM', 'ISU180512LI8', 'isum@isum.com', '3358698458', '20.7206835,-103.355188', '4.5', 'Mexico', 'Jalisco', 'Zapopan', 'Zapopan', 'Florida', 48525, 'Hidalgo', 'A', 75),
(18, 4, 'Tecnotron', 'TEC180512PJ7', 'ventas@tecnotron.com', '3331473578', '20.3371743,-102.7715404', '3', 'Mexico', 'Jalisco', 'Ocotlan', 'Ocotlan', 'Centro', 45789, 'Hidalgo', NULL, 48);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagen_prod`
--

CREATE TABLE `imagen_prod` (
  `Id_imagen` int(11) NOT NULL,
  `path` text COLLATE utf8_unicode_ci NOT NULL,
  `Id_producto` int(11) NOT NULL,
  `Id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `imagen_prod`
--

INSERT INTO `imagen_prod` (`Id_imagen`, `path`, `Id_producto`, `Id_usuario`) VALUES
(1, '793213131870822110.jpg', 1, 1),
(4, '826243131853143130.jpg', 3, 2),
(5, '826243131853143131.jpg', 3, 2),
(6, '8853031318155509140.jpg', 4, 1),
(7, '8853031318155638150.jpg', 5, 1),
(8, '8853031318155638151.jpg', 5, 1),
(9, '8963131318133639160.jpg', 6, 1),
(10, '1202131518135235470.jpg', 7, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `info_bancaria`
--

CREATE TABLE `info_bancaria` (
  `Id_registro` int(11) NOT NULL,
  `nu_tarjeta` varchar(20) COLLATE utf16_spanish2_ci NOT NULL,
  `banco` varchar(20) COLLATE utf16_spanish2_ci NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `paypal` varchar(20) COLLATE utf16_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `map_tag`
--

CREATE TABLE `map_tag` (
  `Id_producto` int(11) NOT NULL,
  `Id_tag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `map_tag`
--

INSERT INTO `map_tag` (`Id_producto`, `Id_tag`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(1, 5),
(3, 6),
(3, 7),
(3, 8),
(3, 9),
(4, 10),
(4, 11),
(4, 5),
(4, 12),
(4, 13),
(4, 14),
(5, 15),
(5, 16),
(5, 17),
(5, 18),
(5, 19),
(5, 20),
(6, 21),
(6, 11),
(6, 12),
(6, 5),
(7, 22),
(7, 12),
(7, 5),
(7, 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificaciones`
--

CREATE TABLE `notificaciones` (
  `Id_notificacion` int(11) NOT NULL,
  `tipo` set('VENTA','PREGUNTA','RESPUESTA','PEDIDO_ENVIADO','PEDIDO_ENTREGADO') COLLATE utf8_unicode_ci NOT NULL,
  `remitente` int(11) NOT NULL,
  `origen` int(11) NOT NULL,
  `destino` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `estado` set('NO_LEIDO','LEIDO','COMPLETADO') COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `notificaciones`
--

INSERT INTO `notificaciones` (`Id_notificacion`, `tipo`, `remitente`, `origen`, `destino`, `fecha`, `estado`) VALUES
(1, 'PREGUNTA', 1, 18, 1, '2018-04-18 19:22:20', 'LEIDO'),
(2, 'PREGUNTA', 1, 19, 1, '2018-04-18 19:35:40', 'LEIDO'),
(3, 'PREGUNTA', 1, 23, 1, '2018-04-18 19:41:30', 'LEIDO'),
(4, 'PREGUNTA', 1, 24, 1, '2018-04-18 19:43:29', 'LEIDO'),
(5, 'PREGUNTA', 1, 25, 1, '2018-04-18 19:46:15', 'LEIDO'),
(6, 'PREGUNTA', 1, 26, 1, '2018-04-18 19:48:23', 'LEIDO'),
(7, 'PREGUNTA', 1, 27, 1, '2018-04-18 19:48:55', 'LEIDO'),
(8, 'PREGUNTA', 1, 28, 1, '2018-04-18 19:49:41', 'LEIDO'),
(9, 'PREGUNTA', 1, 29, 1, '2018-04-18 19:59:17', 'LEIDO'),
(10, 'PREGUNTA', 4, 30, 1, '2018-04-18 20:02:36', 'LEIDO'),
(11, 'PREGUNTA', 2, 31, 1, '2018-04-18 22:41:47', 'LEIDO'),
(12, 'PREGUNTA', 2, 32, 1, '2018-04-18 22:42:08', 'LEIDO'),
(13, 'PREGUNTA', 2, 33, 1, '2018-04-19 22:29:02', 'LEIDO'),
(14, 'PREGUNTA', 2, 34, 1, '2018-04-19 22:29:19', 'LEIDO'),
(15, 'PREGUNTA', 2, 35, 1, '2018-04-19 22:33:46', 'LEIDO'),
(16, 'PREGUNTA', 2, 36, 1, '2018-04-19 22:46:29', 'LEIDO'),
(17, 'PREGUNTA', 2, 37, 1, '2018-04-19 22:52:50', 'LEIDO'),
(18, 'PREGUNTA', 2, 38, 1, '2018-04-19 22:54:38', 'LEIDO'),
(19, 'PREGUNTA', 2, 39, 1, '2018-04-19 22:56:29', 'LEIDO'),
(20, 'PREGUNTA', 2, 40, 1, '2018-04-19 22:58:14', 'LEIDO'),
(21, 'PREGUNTA', 2, 41, 1, '2018-04-19 22:59:30', 'LEIDO'),
(22, 'PREGUNTA', 2, 42, 1, '2018-04-19 23:02:56', 'LEIDO'),
(23, 'PREGUNTA', 2, 43, 1, '2018-04-19 23:05:31', 'LEIDO'),
(24, 'PREGUNTA', 2, 44, 1, '2018-04-19 23:11:51', 'LEIDO'),
(25, 'PREGUNTA', 2, 45, 1, '2018-04-19 23:13:16', 'LEIDO'),
(26, 'PREGUNTA', 2, 46, 1, '2018-04-19 23:14:37', 'LEIDO'),
(27, 'PREGUNTA', 2, 47, 1, '2018-04-19 23:16:08', 'LEIDO'),
(28, 'PREGUNTA', 2, 48, 1, '2018-04-19 23:16:58', 'LEIDO'),
(29, 'PREGUNTA', 2, 49, 1, '2018-04-19 23:17:06', 'LEIDO'),
(30, 'PREGUNTA', 4, 50, 1, '2018-04-19 23:19:51', 'LEIDO'),
(31, 'PREGUNTA', 2, 51, 1, '2018-04-20 21:56:24', 'LEIDO'),
(32, 'PREGUNTA', 2, 52, 1, '2018-04-20 21:57:00', 'LEIDO'),
(33, 'PREGUNTA', 2, 53, 1, '2018-04-22 13:02:37', 'LEIDO'),
(34, 'PREGUNTA', 1, 54, 1, '2018-04-22 14:14:57', 'LEIDO'),
(35, 'RESPUESTA', 1, 16, 2, '2018-04-22 14:44:59', 'NO_LEIDO'),
(36, 'RESPUESTA', 1, 17, 2, '2018-04-22 14:47:46', 'NO_LEIDO'),
(37, 'RESPUESTA', 1, 18, 2, '2018-04-22 14:50:43', 'NO_LEIDO'),
(38, 'RESPUESTA', 1, 19, 2, '2018-04-22 20:33:00', 'NO_LEIDO'),
(39, 'RESPUESTA', 1, 20, 2, '2018-04-22 20:33:11', 'NO_LEIDO'),
(40, 'RESPUESTA', 1, 21, 2, '2018-04-22 20:36:34', 'NO_LEIDO'),
(41, 'RESPUESTA', 1, 22, 2, '2018-04-22 20:36:50', 'NO_LEIDO'),
(42, 'RESPUESTA', 1, 23, 2, '2018-04-22 20:38:57', 'NO_LEIDO'),
(43, 'RESPUESTA', 1, 24, 2, '2018-04-22 20:39:22', 'NO_LEIDO'),
(44, 'RESPUESTA', 1, 25, 2, '2018-04-22 20:40:30', 'NO_LEIDO'),
(45, 'PREGUNTA', 1, 55, 1, '2018-04-22 21:03:42', 'LEIDO'),
(46, 'PREGUNTA', 1, 0, 18, '2018-05-01 20:44:11', 'NO_LEIDO'),
(47, 'PREGUNTA', 1, 0, 18, '2018-05-01 20:44:20', 'NO_LEIDO'),
(48, 'PREGUNTA', 4, 58, 1, '2018-05-01 20:44:51', 'LEIDO'),
(49, 'PREGUNTA', 1, 0, 18, '2018-05-01 20:45:53', 'NO_LEIDO'),
(50, 'PREGUNTA', 1, 73, 18, '2018-05-01 21:07:26', 'NO_LEIDO'),
(51, 'PREGUNTA', 1, 74, 18, '2018-05-01 21:13:42', 'NO_LEIDO'),
(52, 'PREGUNTA', 1, 75, 18, '2018-05-01 21:14:17', 'NO_LEIDO'),
(53, 'PREGUNTA', 1, 80, 18, '2018-05-01 21:33:33', 'NO_LEIDO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `Id_pedido` int(11) NOT NULL,
  `Id_usuario` int(11) NOT NULL,
  `Id_producto` int(11) NOT NULL,
  `cantidad` tinyint(4) NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `fecha` date NOT NULL,
  `estado` varchar(20) COLLATE utf16_spanish2_ci NOT NULL,
  `fecha_entrega` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish2_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`Id_pedido`, `Id_usuario`, `Id_producto`, `cantidad`, `total`, `fecha`, `estado`, `fecha_entrega`) VALUES
(1, 1, 1, 1, '700', '2018-03-24', 'Envio', '0000-00-00'),
(2, 1, 3, 1, '10000', '2018-03-24', 'Envio', '0000-00-00'),
(3, 1, 1, 1, '700', '2018-03-27', 'Envio', '0000-00-00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `Id_pregunta` int(11) NOT NULL,
  `Id_producto` int(11) NOT NULL,
  `pregunta` text COLLATE utf8_unicode_ci NOT NULL,
  `Id_cliente` int(11) NOT NULL,
  `tipo_vendedor` set('PERSONAL','EMPRESA') COLLATE utf8_unicode_ci NOT NULL,
  `Id_vendedor` int(11) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`Id_pregunta`, `Id_producto`, `pregunta`, `Id_cliente`, `tipo_vendedor`, `Id_vendedor`, `fecha`) VALUES
(1, 3, 'Incluye kinect?', 1, 'EMPRESA', 2, '2018-02-01 14:18:05'),
(2, 4, '¿Que tallas tienes?', 2, 'PERSONAL', 1, '0000-00-00 00:00:00'),
(9, 3, 'Es usado?\r\n', 1, 'EMPRESA', 2, '2018-03-29 07:17:09'),
(10, 3, 'Incluye algun juego?', 4, 'EMPRESA', 2, '2018-04-05 19:08:29'),
(11, 3, 'Cuantos controles incluye?', 4, 'EMPRESA', 2, '2018-04-05 22:10:05'),
(12, 3, '¿Puedo comprarlo a plazos?', 1, 'EMPRESA', 2, '2018-04-05 23:00:00'),
(13, 3, '¿Lo tienes en otro color?', 1, 'EMPRESA', 2, '2018-04-05 23:01:27'),
(14, 1, 'hola', 1, 'EMPRESA', 1, '2018-04-18 18:59:57'),
(15, 1, 'hola', 1, 'EMPRESA', 1, '2018-04-18 19:04:19'),
(16, 1, 'hola', 1, 'EMPRESA', 1, '2018-04-18 19:09:29'),
(17, 1, 'hola', 1, 'EMPRESA', 1, '2018-04-18 19:09:56'),
(18, 1, 'pn1', 1, 'EMPRESA', 1, '2018-04-18 19:22:20'),
(19, 1, 'pn2', 1, 'EMPRESA', 1, '2018-04-18 19:35:40'),
(20, 1, 'pn3', 1, 'EMPRESA', 1, '2018-04-18 19:39:22'),
(21, 1, 'pn4', 1, 'EMPRESA', 1, '2018-04-18 19:39:42'),
(22, 1, 'pn5', 1, 'EMPRESA', 1, '2018-04-18 19:40:30'),
(23, 1, 'pn6', 1, 'EMPRESA', 1, '2018-04-18 19:41:30'),
(24, 1, 'pn7', 1, 'EMPRESA', 1, '2018-04-18 19:43:29'),
(25, 1, 'pn8', 1, 'EMPRESA', 1, '2018-04-18 19:46:15'),
(26, 1, 'pn9', 1, 'EMPRESA', 1, '2018-04-18 19:48:23'),
(27, 1, 'pn10', 1, 'EMPRESA', 1, '2018-04-18 19:48:55'),
(28, 1, 'pn11', 1, 'EMPRESA', 1, '2018-04-18 19:49:41'),
(29, 1, 'pn12', 1, 'EMPRESA', 1, '2018-04-18 19:59:17'),
(30, 4, 'hello\n', 4, 'PERSONAL', 1, '2018-04-18 20:02:36'),
(31, 1, 'hola', 2, 'EMPRESA', 1, '2018-04-18 22:41:47'),
(32, 1, 'hey', 2, 'EMPRESA', 1, '2018-04-18 22:42:08'),
(33, 1, 'prueba', 2, 'EMPRESA', 1, '2018-04-19 22:29:02'),
(34, 1, 'test', 2, 'EMPRESA', 1, '2018-04-19 22:29:19'),
(35, 1, 'prueba 2', 2, 'EMPRESA', 1, '2018-04-19 22:33:46'),
(36, 1, 'prueba 3', 2, 'EMPRESA', 1, '2018-04-19 22:46:29'),
(37, 1, 'p4', 2, 'EMPRESA', 1, '2018-04-19 22:52:50'),
(38, 1, 'p5', 2, 'EMPRESA', 1, '2018-04-19 22:54:38'),
(39, 1, 'p6', 2, 'EMPRESA', 1, '2018-04-19 22:56:29'),
(40, 1, 'p7\n', 2, 'EMPRESA', 1, '2018-04-19 22:58:14'),
(41, 1, 'p8', 2, 'EMPRESA', 1, '2018-04-19 22:59:30'),
(42, 1, 'p9', 2, 'EMPRESA', 1, '2018-04-19 23:02:56'),
(43, 1, 'p10', 2, 'EMPRESA', 1, '2018-04-19 23:05:31'),
(44, 1, 'p11', 2, 'EMPRESA', 1, '2018-04-19 23:11:51'),
(45, 1, 'p12', 2, 'EMPRESA', 1, '2018-04-19 23:13:16'),
(46, 1, 'prueba notificacion', 2, 'EMPRESA', 1, '2018-04-19 23:14:37'),
(47, 1, 'p13', 2, 'EMPRESA', 1, '2018-04-19 23:16:08'),
(48, 1, 'prueba', 2, 'EMPRESA', 1, '2018-04-19 23:16:58'),
(49, 1, 'prueba', 2, 'EMPRESA', 1, '2018-04-19 23:17:06'),
(50, 4, 'prueba', 4, 'PERSONAL', 1, '2018-04-19 23:19:51'),
(51, 4, 'prueba', 2, 'PERSONAL', 1, '2018-04-20 21:56:24'),
(52, 4, 'prueba', 2, 'PERSONAL', 1, '2018-04-20 21:57:00'),
(53, 5, 'hey', 2, 'EMPRESA', 1, '2018-04-22 13:02:37'),
(54, 5, 'hola', 1, 'EMPRESA', 1, '2018-04-22 14:14:57'),
(55, 1, 'hola\n', 1, 'EMPRESA', 1, '2018-04-22 21:03:42'),
(58, 1, 'hey', 4, 'EMPRESA', 1, '2018-05-01 20:44:51'),
(70, 7, 'prueba', 1, 'EMPRESA', 18, '2018-05-01 21:05:36'),
(71, 7, 'hey', 1, 'EMPRESA', 18, '2018-05-01 21:06:10'),
(72, 7, 'hey', 1, 'EMPRESA', 18, '2018-05-01 21:07:01'),
(73, 7, 'hey', 1, 'EMPRESA', 18, '2018-05-01 21:07:26'),
(74, 7, 'hola\n', 1, 'EMPRESA', 18, '2018-05-01 21:13:42'),
(75, 7, 'hola', 1, 'EMPRESA', 18, '2018-05-01 21:14:17'),
(76, 7, 'hey', 1, 'EMPRESA', 18, '2018-05-01 21:24:52'),
(77, 7, 'hola', 1, 'EMPRESA', 18, '2018-05-01 21:28:33'),
(78, 7, 'prueba', 1, 'EMPRESA', 18, '2018-05-01 21:30:13'),
(79, 7, 'prueba', 1, 'EMPRESA', 18, '2018-05-01 21:30:34'),
(80, 7, 'hola', 1, 'EMPRESA', 18, '2018-05-01 21:33:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `Id_producto` int(11) NOT NULL,
  `nombre_producto` varchar(30) COLLATE utf16_spanish2_ci NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `descripcion` varchar(150) COLLATE utf16_spanish2_ci NOT NULL,
  `existencias` int(11) NOT NULL,
  `Id_usuario` int(11) NOT NULL,
  `tipo_cuenta` set('EMPRESA','PERSONAL') COLLATE utf16_spanish2_ci NOT NULL,
  `Id_empresa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish2_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`Id_producto`, `nombre_producto`, `precio`, `descripcion`, `existencias`, `Id_usuario`, `tipo_cuenta`, `Id_empresa`) VALUES
(1, 'Tenis nike', '700', 'Tenis', 0, 1, 'EMPRESA', 1),
(3, 'Xbox One', '10000', 'Xbox', 0, 2, 'EMPRESA', 2),
(4, 'Camisa', '150', 'Camisa', 10, 1, 'PERSONAL', NULL),
(5, 'Kit teclado + raton', '2000', 'Teclado + raton marca logitech', 10, 1, 'EMPRESA', 1),
(6, 'Playera', '150', 'Playera', 3, 1, 'PERSONAL', NULL),
(7, 'Zapatos', '500', 'zapatos', 10, 4, 'EMPRESA', 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resena`
--

CREATE TABLE `resena` (
  `Id_resena` int(11) NOT NULL,
  `Id_producto` int(11) NOT NULL,
  `Id_usuario` int(11) NOT NULL,
  `comentario` varchar(150) COLLATE utf16_spanish2_ci NOT NULL,
  `calificacion` varchar(3) COLLATE utf16_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `Id_respuesta` int(11) NOT NULL,
  `Id_pregunta` int(11) NOT NULL,
  `Id_vendedor` int(11) NOT NULL,
  `respuesta` text COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`Id_respuesta`, `Id_pregunta`, `Id_vendedor`, `respuesta`, `fecha`) VALUES
(1, 1, 2, 'Hola Luis buenas tardes claro que lo incluye. Saludos.', '2018-04-06 16:44:15'),
(2, 9, 2, 'Hola Luis buenos dias, no todos nuestros productos son nuevos, espero haberte ayudado saludos.', '2018-04-06 16:48:32'),
(3, 10, 2, 'Hola Juan buenos dias, no solo incluye la consola, el kinect y un control, espero haberte ayudado saludos.', '2018-04-06 16:50:35'),
(4, 11, 2, 'Hola Juan buenas noches solo incluye un control', '2018-04-06 16:51:19'),
(5, 12, 2, 'Hola Luis la compra de este producto debe realizarse al contado, saludos', '2018-04-06 21:11:10'),
(6, 14, 1, 'hola', '2018-04-22 13:47:09'),
(7, 14, 1, 'te puedo ayudar en algo?', '2018-04-22 13:59:08'),
(8, 15, 1, '', '2018-04-22 14:08:33'),
(9, 16, 1, 'que tal?', '2018-04-22 14:12:49'),
(10, 53, 1, 'hey\ngracias por contactar', '2018-04-22 14:14:00'),
(11, 17, 1, '0', '2018-04-22 14:38:27'),
(12, 31, 1, '0', '2018-04-22 14:39:52'),
(13, 38, 1, '0', '2018-04-22 14:40:41'),
(14, 41, 1, '0', '2018-04-22 14:41:18'),
(15, 49, 1, '0', '2018-04-22 14:44:18'),
(16, 48, 1, '0', '2018-04-22 14:44:59'),
(17, 47, 1, '0', '2018-04-22 14:47:46'),
(18, 46, 1, '0', '2018-04-22 14:50:43'),
(19, 45, 1, '0', '2018-04-22 20:33:00'),
(20, 44, 1, '0', '2018-04-22 20:33:11'),
(21, 43, 1, '0', '2018-04-22 20:36:34'),
(22, 42, 1, '0', '2018-04-22 20:36:50'),
(23, 40, 1, '0', '2018-04-22 20:38:57'),
(24, 39, 1, '0', '2018-04-22 20:39:22'),
(25, 37, 1, 'p4', '2018-04-22 20:40:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesiones_activas`
--

CREATE TABLE `sesiones_activas` (
  `token` text COLLATE utf8_unicode_ci NOT NULL,
  `Id_usuario` int(11) NOT NULL,
  `expira` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sesiones_activas`
--

INSERT INTO `sesiones_activas` (`token`, `Id_usuario`, `expira`) VALUES
('1fd25fd5fdfb936a44fb46212c7430877e98b307502a9ca1bc6d7a556238069048b505e89db5791d2a4f94d6021304f36e9d3579a6663bab97e0ac7427bc8423279445829797ee7823cf399a0a5bcaa5ef8602018940fa7bea8c6fe881e7ef8a081e442031e9df01c6376d772ad95503cbf0eb90aacfceac394ac1cdf9ee3c75', 1, '2018-03-27 20:18:46'),
('3b66205051557775bf5de7ab65849057548842e94f39f18f3440b731f7f1dd523aa883d3967489035f0fa40ec6830e9f58081b3fba8fd311d18587146bfa8ba0afce1e322d8ce68fa9ea0f2e63df541e8e45a109699aea57eef3845287d098644e6f472569878a87e1072217a0cbefbcf61842ccb606789845f3283c496a3b5b', 1, '2018-03-27 22:45:21'),
('5f7bdf069e44d8ca92078a81dcdc1af545703447093811f8ea2c41b62a9502c9239fe914cc349378b6a3690d6bbeda28fa1221a9d58f51cb7119f4309f543af0227f75836baf50706c6924815180cd73fea1f3b37c5e7033dec3fb965bde98788ae12df5231b6d3bc4656803f9c0b0d65f0518b55327ac22112f077941412faf', 1, '2018-03-28 00:05:59'),
('287dca2534e3b3a1650e2e9f5303bfb807c3c2afd3779a0516c64cf81a3157369e7120923407991a34f451b2dbb8ff7561f4570ffe037cac620a52bdaf3961fc8d782ee340815e7ed0d21622e22d9a6d0aade75d4c4d1b7682f60709a3da626d401b8eaa1a4664b349235c489fc9d3b4bc3f0d2f30a8da5199480076b1aadf05', 1, '2018-03-28 00:06:28'),
('b56f99a2ce5b542881fbc153e9bf99a1d79a65b6a6bd607113c94b92f45891ba050f7b15df8f18f9d3749bb62a2887385d79c285d3dc035bc2c3669c5b81ab887f3b9e7da6c75f38d761dec830d446ed65237ffdcdf3d18ff197cdb1eddc2e98f2c61af9357cb8775b3befed063a72a7e9528c90c31766fc5fa01352e2c95325', 1, '2018-03-28 00:13:14'),
('fd7f13c5bcf20a9c92a8aa1806dc088597f44d284ce725e6d8f692a304d59f31f7f627965f575ce4179ade9bd79072ed77a1b83ffd8a4503185534abb9d9ad6a967ae0a5795da051ded28c2795e7d987096259ef9729a2f61221458f29131f9041e847918cac2f718f282d9e6bffca0f521ddd20803b4441d47dd62ca3b05624', 2, '2018-03-28 00:41:22'),
('d5eae4b4214cc5c8df80a146e072fee18b7903a3658f76ee601be9f2c1aa211ea7329c2a615afd9574cda314ed3c8af018944f231e4e2f33814fe0ba79ad2c32d04932c7cd8949acbdbcf71e1424df616114d8831d4bbfe1fcf4effa18ad0b1413df16478ef60a2540a4c92ff074eb6c63064c1a8cf966362621e0951552f2f8', 1, '2018-03-29 01:03:25'),
('77b314c43d5f2a073ea664cc3909c1972fbf57142379e47d66b32929d44c160f7238d38b1a3af909d7fc3a4d5df1a1ee834d7d785d941b69e411bb144e7503c5e60ccdb6e5ed4cd59e7f96141eaca6c59b254f99d8ec50951494f99570f0fa94bf2b5ff2c839993a81b2f6243615d64c4decb20200b3ad304e792bf0d1c9234e', 1, '2018-03-30 00:28:29'),
('dda4f86065c55de82a176fb3379f05237e12dd4819c2598cb75e063d64c8986310d6f67321a592d319b8b1f49ba2f1863b23736ef23f588a4b8e46669bb14496fb7d877e35f52bf9a6c82ecfa2c0a56925bc7d803694a02e0ef54e08d1eb55b07f1eea924760094d550ac1d4787b25ec789bb2f6e85b0a73f5e331176359dafd', 1, '2018-03-30 03:01:28'),
('f5c446801fdbb1fa41b79c16aa4ae4d7e10c5b0067673638d0463d16c591abe01e2cf971833d60fa5fbda75e2a38599722a459892891c9a95baa87c5717f8772874f55a0b7651802614a4e6891fcb43b18d8b42f4345a22f1e23b671d9a66c2138dc10abc85e9c2eb2c673719888a4ff6f7cdc59b9c18945c0bda257f04be8ec', 1, '2018-03-30 03:02:47'),
('a366458207786dbd78af26abbd63af242142784365d01a51cfc2cf47681f6d0574e818415de2c02d26b1370764bd1d83b53f73250f7d0a877a398491b870c1b609db1f6158915c6e6aa6bb10ca6d76619ebf5ced0a720637c90206465afd5cdaa8fea9b46b953f4fad860a356918700ef6438aa5d09e6037f28ee416fc54d934', 1, '2018-03-30 03:03:40'),
('ce4dff6c103b62259cf8235617248808ad47abeb2c03043c598cad8344012202390af5c9386ba1e1f56276680f4bdee7c469f99dc887ed70808bb58ff090fa75c0563b4bc01f1cb8eb9d06dce2d5857e3c90c1df978e4c307b8d23a4d343853ac3e0e94308c94c2789f937dba930e7d89b4233225618048ad6b4309b53771dfa', 1, '2018-03-30 03:04:17'),
('0c405a41db071f1a94bd291960a0803621a853bc4066ccf237de84bbe9c7b537c61afe2cbfa05fc40bf058af22eef90ddcd1bcf583843c8283baf725d44e54282e64f190d71328af5c73beea28e05b271585d355924051018c9629d6917b864dcdbf285346e5e919e2e63c22b1d905595e9001475d772c02578b6453d9c0e5c1', 1, '2018-03-30 03:04:58'),
('522dac23187061ae43b300be9cf7b0474089102355d883971505f4cb6368feaeeda42a40d3bfc9376c0a73b5317c675de16b5a76219f060d025754e37876de84d584d65571117390df1c91b48e463c0a4657d35ff30f85cadbbee45a8ff0bce144ea04c4bfa26939043de033b21d8476a49a175429b1c6cdd36bb915b88644d2', 1, '2018-03-30 03:07:31'),
('356c438114baa08f4a3f4e444729cf633e3f82d1ff78508b17f18a606ccc16d52c08bbe0a6814ebf265b3e29baba9ff29db9af654e3535b7257628ebbd3a545e7e9377f02bbb6b120c60a59259264ef4f75915980a364e8996ff57f28383cbaa318fa1dfdfccf98aef9bb405fb6c7391cc22b96b8f91616f614862bb56653668', 1, '2018-03-30 03:09:20'),
('f4fe8fdd1f7e8a2bdff74448e543fa3dbfc79db75ae32fe564138bc92b036b90dc0f39533b58dfdb3595c2cecf0789d7820397cdb3aa180461cbe5a6a2f7456e3ea82c2f0d59de9683d4d8188f7699141e1259b4ac8641a20c7197477f8fe9de06daefb6fea0c697c64541900b66586299931c7ec622ef408f5eed665a70fc37', 1, '2018-03-30 03:10:33'),
('8e38cd22305f03e4d38645a474ad41c6d36028001beae3a75ae254b786ae81e0d0976c157cee70dc58cf355fecc26c86adddab927955da68270edf2677e1a5ef7217a3f4e7d081b7a2747ec0356c67b3a7d6a5f973d1cd8b4adb7c9d6530caefeac504ad7e0d0ab1e8f7f4aabf66a8f7ff4f621c723a239be244f3fde50e44ca', 1, '2018-03-30 03:12:22'),
('37bf205699e1add284bcdbc1938732d1e6396dde96d490d8b6953eae6db7c3839bc54653878d177dafe1534fbaf7d3fc90e23a35966fd2ca5093bd89f34b24aa8847961dcede6d897dde2605361468fa80bd69e44da1acbea1649a4be6c25d7f12c8ba5ea5a129052ae4817d8291c0afcb7918e5fb6852832f2d6778787486da', 1, '2018-03-30 16:54:16'),
('8ff0a22a2263064f4f61ae27757858d17dd11b1d20b8bd8f0c30f2fd58f611e4e4cf137ed0936ceb54962dc1d28ad378a1c0e56572628585c6e807edc4ffe5f1fcd29de76a8fe57e8c7a15c499d8f904d28cb4777abcbe1c3a53147aca38ebf5680f01ae14960df56c118190531f8bf8a9520525c0ab9f5823b29ea11444af76', 1, '2018-03-31 14:35:58'),
('fa0d45a694bbfb508d5f048e21b9e7ff060fedd329a13c1e70837e9acffa35a0f8e0fbc2f3e9d655655a2c7144c6e2af7895d465b63e481539ba779d453060640e7ff58af6ee4cd87f1ff68f4f14f0e112d5880793433ccd3136d6780642832694ae5e02a52c8be5ea5431979902cbd308d0702fcbb4ffa59855bf6b889d2063', 1, '2018-03-31 15:52:03'),
('9ac4dc743d9ef1e0f010096921419af8405ad296eeeb526c3697b74c57fe13a23af7d134bfa81c609e9df8216c31c1a679e0e5065d5e25ece46e4452d7ddf531a823640d3fdd5fb498cabe08b64c12b07a8b22e8ba4c5c9abb33d08f3c2c989e7efbdefdded8cedbf903811160b5512773451ad602845e7b23314ea90b06f692', 1, '2018-04-03 22:34:02'),
('3537acae346a12175fed6d190a433cdd7193903b376d035b942a303dcd99d4914cd3fe76889f1a419f8872337c4d6447252c7023309cbadd3c95a629f106ba0e60486fa1161cff573155af71e3294ca638b8ffd1933d4aeef62b861ffe1e0a7ac96f2f3e47e26b5a3fa20b72fffd87c36424e868bfe18ad055b6479958cd3df2', 1, '2018-04-03 22:34:54'),
('5a2281cecb9e39a79d7d27abbdafc83ac3b300952453b3dce33fb99652f590c1248ac2cd1b809831800c7f1d47011d86811145a7ba7fee7d88a02fa4223842835858aaa7d7750764a5147f7ed74b7c5d451c67148183cb1aed35f69ce3531798242ff9d1e5bc0945e38accd77f6174d953c0c4672ba88faa41f5a494ca6e0051', 2, '2018-04-03 23:15:39'),
('5d32de02ec4bb240a1c106c30680fab9a6cdaeafe8b0d50f8d87b244d50a7e3a6ba5ccebb3231acc4c28beb668bf54c9979936636eee51f07e73111897a2c85c0b07d9cc14d4c72630c4d7cc43b32cac00199e7679d2677ea2cf0f6e88a854c4630b39db31756a9db6a247d2801ad6086653b4b5deec4650ab82fc3cc3004f6d', 1, '2018-04-04 01:29:57'),
('2c8553134f4474a785012aafdc1e58c2c4259b0fa27c31c52637a77404cdc8bdedd0479405c0ea207480d9548994d2f1da38efb958ace09b90c26d94cc60624ca27aa574746e9c2c9ea74b419dd2cee8fb03afbeeea06d83d2f8d50dbd0e242203cd8dd0f5cee74caa0d7133f4b73313aa11125cdc4ae282b03ad72180413891', 1, '2018-04-04 19:01:51'),
('a6a16d7d64783d0e15bbc77571b80b957d638eb7240753e3a3445097283fd13b3b5e0303a413a8c3956811b5488c233a266c5f60eb8e76620d51234b44c6f7eeed422fe9b32ed2dc28af35e8dc782381ae2d587e8bef082456755961af9a82edc17d815cd18c8f939b3b3180b69257d6fc628a56c1f4849ea2b0bc7d1e1c2947', 4, '2018-04-05 00:06:54'),
('865363c5e2d36fa3ac3e9f232a15e82761e86209c5ac39da92b0c97e62193f763d7f136f3d25d51f69e82f4f1eb5f44cf10afddaed8d45523fda5a3c8818b8a308a5611a74458ee7342fe3b6fa12a615e01419d271f049be4fc3186f93e1e4ecbb8a4c1ebf99310959629da8bd84db3285457cec89b41091c2a6af22ab556b37', 4, '2018-04-05 22:51:14'),
('894a69c7dadd40179ac04df252a0de9aa0557e58b1da6b2dc371e149792733a03e27c5952231d80548cbabb910099874d84cd2e40db2f83aeafe7f56a3daab7326b63e6c7f4f8c4bdb50e0ab686cb589893f262cc657d1649fec90a45ee3be6edeb3432e8f84b0ed4a65e22dd46fdc1f31fdee801c74e5d5ac5f16bf95ede69e', 1, '2018-04-05 23:58:51'),
('12ce4e9ad623367fce09092ce607c761223e399d1df959f7723409f1238a8e20e05d1d80f1a14589d336f4a1a0885de1dee17a0ffb4186ec843bed7961f191eeba0d946432bc1fe512e93e5aac054a3a267e1e138fadfae26f38055ca4ecc8ea5bd4c6f87f522288560ac682fde7e4cb8ff67315641ab2978878e9cd975819a1', 1, '2018-04-06 17:53:01'),
('d82a07153f208e9e356522ae291440d46bc56473f994363d1d8d0162027f94b685839fab225a9282f24aa27a63981a0443898841471aca663ba8c14566bf202441d488ce77e624e1155df994012f06806a6cf2037c771077b3132f7e11e6e4e6e04ab51397e0e4ef8d92dc56b48ddb3adc753ed5a50b3c0dcedeadba97c21a33', 1, '2018-04-08 23:37:26'),
('65a37c4a82f5fd3b5e640bb606c5db2a2c7c7f8f0372bf228f23de8d20f18453933106f0fe8b3d96eec4679e919a00c12a01d7ff1b4c412457916948d2da6620c79cf853f26a642f171252a59175252e0b6620697954b0fbd61703218c76e17cf4772e233f845eadc563ea06b35fd20161b9cb76faac46278821608e47cacdd2', 1, '2018-04-09 21:49:38'),
('a36441f6e6f90214b122f8e291bed7821b99308069868923939bc4ff66b1b28423938a8d043d17abce503626c1cc0c68f0f4213d29bececcbfcdcf986c7dde8e5544e069dbfa944a1f255389abc3d624f8bb4090587d6ead8d7299faec98e1b78df45d7edd992dddfb5bd8208749b016a96fa984ceeaaff2d9ce52959bd3f9be', 1, '2018-04-09 23:33:07'),
('06a260372ce23be788bed00759b8d81057f9028a132abf0ce7cf29abd736314b150a295159664c284303603bf679c47ad7aab29370c9b3c059b8abf5f06e96879ce05b3d83abf4e9b20f955393264cef98f43a1361b79e21c69b66a2cc4eb219db2695021fc21bc32859bce900070df05dc954c0109bb6f6ee3af0c911651b98', 1, '2018-04-11 02:45:19'),
('bf3706eaf80c91f9a120c7893c622352bccc4d79c27804af681d03691301e7134ccd48f4600630190ac85a2f5b6b1b6475bed3190af4e92634ee052229c90c0dc3785b6f60bf5efacfaf5a5f11a73db7795fbe5c4d4ad33c00c8a48a8f78f97497f86979a21621dc521c4d4c3cb2e3d12433ddc64524f4c8f2148e88b472a3f8', 1, '2018-04-11 23:50:28'),
('0f887dbfcdf611907b9033d70e1bd096af16431e6c6cdd69540d54e6649eb0cf77f93207ab9a651e0842c51ea30a092942c2f8a1b1caa6b845296e0fde115efdc04da4e43be909bb95b681294464784e46212fecf0a56b04c026a2ef6b48c2004e717aa9387ac0a55dc38926b603214702604ab20263bbd87c11df7d490cafeb', 5, '2018-04-11 23:51:37'),
('91671b9ee7c0d7d5f7650c97e881543f1e4a2b8389bccfe75ea85ce43cf009c424db5080b95f57348ff285cbfbebb3a8ea7a747bcdc871c239f413c94541684f2cd4721b72f2d6e60d3265dde01fe70fc1cd7c919f5ccc368fb86928921f73e60aae49ec97ce8bb9a10c808705f73e440af3add04a3ce1425254ae0d09195a05', 1, '2018-04-13 23:53:36'),
('632f2c2284ec1ed0b1401f8fe435bebf4ff706704d5ba3d6ade2a79d76435c6a04618a6bf247c1574545ceefeaace744d3af4a22009f8894217cac1f25ba514d478dcf8734c332c2a9036a4e33d28355a77c6ac1471229a1b9f158b09893bc47d6234c86b42cea73e78ba4f53449bf96701f003d4786b8fa9454649d52655b43', 2, '2018-04-14 00:26:04'),
('35b92b0ce98db5568a10d84c99adff535b942c4822523e9465fa9da24cb5eb1945be316024e497fc19e5c895c3f2d166c85bd14edd545eefd41fff14a7df781eb23cf73f849d9d8fd8935a9099815f4e3171bf01a03ae7baaecc66522130a84b2f5c6580772a5fa1acf25993bfbb775a0c5120881dd61f1feb3d61b8c5518d50', 2, '2018-04-14 00:40:26'),
('fee51a7574694824e0592281b5b6122b14de81a1b8fb3b857fd251c43fefcb95be458c8a6b5f04f8a8afe8cf6deea44782ae100f3ed5433e0edd3e61fcc06d6dfdb1b445c313021c4af5ade192c631ebb93e7293f24f9735f044d7c322bf8fa581190f748d7ca0cb1b57a1b9040b8d12181c7818ffb1c6fa24f8dbf8199324b2', 1, '2018-04-14 01:31:51'),
('0cd9dcf09ae65c51a1309332e812818ae96cafb12081ff1136b926df561ad548ae115e27870e3e2a4e033c013aa47f5ef9f92eb42f01692201d5a3e009c29dfda962082a503a16b2aa09ffce3192ef93bd87b430387c1077c19f870b8e91b7c3b2f6c6ad03f502d3632a34dd2e2e1e69659be15d71d5b765829a7b239540a2c9', 1, '2018-04-15 22:56:28'),
('d39efcc042969916a3947301844bb63013b1650305b3b23aaa5fa4ec7c33bbed1c1e8f659ee774be7e29602709ac3e807c134e148fb966358c04f8e45e3b4cd8f44ab0c709c8e071506ef534ba7a32e2bdaec87c3c5231aa4715d2c8ed1cf3dbfc52f2cbed3d2a6e598829705ba92c6fd1b99d1ae73af2a8dac5051e6225d425', 1, '2018-04-18 19:57:42'),
('a66972f46906271d7ef600f67ab7435f35dbb83c498b28dd998a523eab88cfb29a463342628a6b17c9f49c66b6aaada06af4f5584b160c246516de6cd66e30a7626fb067416c841c2c7705faffdb192dccbf8d1714ddab1b911d71e837d6c2635e366763e990c7a6d335242bc3201c4b427060b28bf15f147959611629c7bd5c', 1, '2018-04-18 20:58:42'),
('f0b3f5a309f58aac3f4ba08e7e5c02c116997e999d758d1f3bea42f2ac24519bacb043e935abb3abba973680e8eefef05fcfeeb4fe8770b95b61d2c2ef5a13ae5320b3b9dba2582d957195ddc24c59c488f0664ff7d90b7a8e865c2ec52fc9a4b386bb2ede10c52955c2e5d47a428ed7122fa3acf35fc64057cce93fce86b9f0', 4, '2018-04-18 21:02:11'),
('a6015b9613d942ace580f3712ac8ecf96796d740c0d649ce80e18df23131db3375fca881772649dd3c77967ca5b6ac0bd773cbae516a5a6e8cd325d6a731b91128d48a9d045895032f9c2ad53990958c38d3233801545312528a0ef4f65eea39097d28abe8971f30788ef3481dbdd82082740394357dfaf91b6584f501f86bbd', 2, '2018-04-18 23:41:22'),
('19d7dd322d6f1b0c50faf0182a3c7c4e642c0ccd58418292f25a65669d09b116f658bce7bf6cf0cacd0ddeffba540409d5f84d5069a48deabbd2b735a7c50f4ddc4ec77c245c215bd0590b23277dc1873281cff08b6d5e4e50b3e002ab3e72c18ee9434f3ffbd49aa668516441b39f963637228ea651017641906ddad79813c1', 1, '2018-04-18 23:41:34'),
('a25c58e3ee49f593bde99f03fba5c0d23ba797aed6ad90db5d6773039dd69424633b9abca61a1c7aaef15516e66d969865217e4b5d05f5840d0f865eee57231c75f08194bdf4401ab5f27a553878a0e538ebcad0850befda7b490af6b6ba7dbb76ed98422d522037446dd011132c9b734f78d308e56518a775c447c8730d0196', 1, '2018-04-19 01:14:41'),
('14a3c9a19f97ca30f26f25b618538b454a504ddd746326a04a9a744d2a507c6ab36fe62b3790a67df3f6ba1dffa918ff5dce081ce29bd724a9dbb26741e359f58066f94dfcf35956317bc0ae9ffbb2c643280f36bc73e227cb9cfda6fe57213700b0138ea9c8b1de5d6142a7858ef9e741bb48f48bab5e79169627cf59c84b6e', 1, '2018-04-19 02:22:54'),
('ebffeecd6041654754d6d7acf9316c7801c0382916b4f8c7fa521ecf15c8a7a7f98fa29d8d36e9067019460d8869c82ed934d5e2584c7ceb5ffff0f5f1a2aedf7161504f572c1b3aff457b0d7e0004011e8b581bab7ce4b675fe52c519db227e08404ce7dcc676d493c1bf2e52e83dba4e1bfa40cbf2049c410c0aa90d2e820f', 1, '2018-04-19 22:39:31'),
('7521f060e09c09367127c624beecee9a5533d2cc33e32e9b6eb85abb7d2c57a8986ffe61aaf66e69f72caac8a52ba5c6c92c33bce45cb5d910eb63930dcdec77646ba7e0dd443e26c3db5d75af229913772553f550adcfdd3ce1586defaa35282256055b2b39f5fdd358439c26b34a0c5651b0254ea6368ac4abcb4335dec2c2', 2, '2018-04-19 23:28:21'),
('6e5c3470fa52d2f99a47ec750e33196ca2671a38a6bfa38ebd7d22d650ff0867b036daf2b0fcba53272c24e5c90346b68ef11b68140a0955999fce26e2ebfb693d943a0efe74b53695552de157cf1f343d636665f6a0392a78b41f95e753b7e2c8cf4a7a5dd55cdbebdba77b54213a4a4390c14076cab6c17e5fe55d267376be', 1, '2018-04-20 00:12:50'),
('debfcfb930b196992430edc3a6d7eaed374ba6b10ca053c03b2a0eab1867cb3d58522c59251853e47237478d58aab7ab80aa4ca8fd0eb929b42d3693d456fdb6c018f2ce5030d9de257f4a34b0fb7de8c3996781a4ac3856758cff1c8ed6f7813d6043198acb7e5b0d39b94d7548dde6b0323b7f1cfb01ae57de77a96af8f3d2', 4, '2018-04-20 00:18:07'),
('e713c46c7789f2d025e0de024b43bf7460228b6a2251bb8ef20fa8de02834d17bf64b9a82ee01d5444cd9cb6690ecf370c8570ddb0802e50ddbec937e40700325982dc1dbc761641dbce7ae4df724e6bf7cd96baaa78564808e0b778caa67f4c322196d3e72331b2ae313efc17deccbb609998268c3746517cf9e81fbf90e70d', 1, '2018-04-20 22:37:38'),
('a258a589d89b46b29e828af0521a9d3d23f598883f98fd73757addd3bccb5d03a91b3a3d7e877bf3ba7f2de594db45a285f69e0f43f56c38b659ac30b9f4977bc428475a0bd3261120283b1f10456106f550c4ebca7e3a522051d16031a8194cd97660dc58739beffc52ca14e5ab014fc9ad135de22855c7e7db013c25c27485', 2, '2018-04-20 22:56:01'),
('5e7f9bae5fcebc047eaa89a7ddab5ed51c0bfeacccd33bd0273a82e181b5da3385de63f79f85665c9c9c5969a7bc6ccecce6efc9f482ce56ebbe2a775cf8d2624404209760795ba62d7296ade7d020512aeb86387b5faedbd11b32c6524129573297c597b3e457d07f4babfc7821c3e48b60e7dfac6513f587dc5b4995ba6e74', 1, '2018-04-22 01:44:27'),
('f9f46e01a7c824365327c476143cbf4f0cf31929f1561cfb66e4db39d4021db9cd1e7ac9d5b2f3254c308753e42b6fb9ba00d6bd5e4c24d79848f54b2f8b8d08496a92dbb3fe53014e59304b6a146aa1eb2852b8ef284259d96a5883eae979fe8ec90f1c35da4b574df5b8674c6b112b0b8cfcacc26121a6cd5f2bf77fc2c92e', 2, '2018-04-22 13:43:22'),
('1791f4cf68498ece561b8c0c6ff99fa4b1c197b4bad64ddb5f60e9844bfec31cded74f5286d53f729bb1d7a89b3e6beb656c34d589275caf32e6c34b385cb014dd6d05055e4d8ed008b5e833f1679545f399eec9370f813d22885ef7bac508ae31282c9f04b9d74fea23d23807fe45e9963602493188068d7fae2ceb3694f8f9', 1, '2018-04-22 13:58:13'),
('72a52cb5916e799e7cb3a62904b212e3c41763a26895d74d6be8254dd3f0a8c50f385ca123a4145c1ec3d1a029533dfd713000f83f477d1a76bcce643daa4ab206837deb7a9d24027ee0835e41546cf8aa602a2d6a4694f4a3d715f96dfa64f6f16ac43841d8d6999acdaa16719e4c8f9fb796bb6a813f1e62c076099de8b28d', 2, '2018-04-22 14:02:01'),
('eaab46dbbf2ca8db75770606859ce7db913ad1d356184a81c2d35fedf9ff8fd134d65ea8083ebee464a019c1d23f3d4efad77bb5eca3c95b13383aefc8fd88a124b158ce691f7536ecbdf9368b219a3952707177038d727943fd2e43d4ade817eedb35799a4dab428e7bfc3b2dc67049112d397fc965d60d2a77492f3dd6cc62', 1, '2018-04-22 14:02:47'),
('7d4277c78550819f0a19c4ac839d9960bf53637c37d6cc19d89cc1e3b5bb136949d70552d4f81cf52caaf88800e148ccbed3e24ac55267b6c4a090b60dc26815671312be2fed440aaca916fa5dff7d75ce8a9278f37fd2d17f76ab91f92a2a4ff0c740019ad48588f711e35f7ec4c6d1b0e9313b2d3a1eb6623aee449214579e', 2, '2018-04-22 14:34:04'),
('26edcb495d0de6e66805b9df6dad16c74b57c0c47028fc71305531331246cd66435328b2c2b1932c977639580d7296543939dc3079a6b3e2eef7c1d699c96e355a6cc5c8a55478c318349e24f4293ce99932c53b2f5b70c2a9521e167e38be7b8851ef185614441c726373b93278bcbd2e96660a6cba707c7a9feee29450acb2', 1, '2018-04-22 14:46:29'),
('ed1639cb732de8b37c4f9f87dc425f5cdf26d577a655c09c033ae562e50db5408e58de440ae142bb4493b36d8353964d2fe0442bd28d6a23dde6038fa7a44d2b0288738a2be9da2544b144ce2e859faae058c2f6f828d3b7593f75bd095913a9bd735a0e730cdc6af5222760ce7fd0b223483d56a5611420fd36228b4f9258d2', 2, '2018-04-22 15:33:33'),
('7d4d21dd538a796eb8bb4f7fc8a2d5fdac9a6eeff6bb5d1f7389eb46f96a4b3cb2de950d97260ddcf1ba4bb3f146c8344896bf56e2de101dbeb37ae470cbd0a52b1cb62db67eb72bb8cd47aeb47b1e96052e4337ece43233d2ecd73042b0c35fb5fb2742cd40a16cd607776b7276c536a89697bc0add689fbc75cfbf409631d7', 1, '2018-04-22 15:47:25'),
('aaf0401a93a8f7372d1cc8f26948cdf24536c87ddcb96d94b5122e6fbedf5fc638039402fac441da5f8fde18ef1132fda512ac755470da128d2cf8d5d2d2c547c7a6507276c0ea79a553742dc1a9b3f796a18318f4b6331624019958724733a1dbf5222b3789d16c771d1d255c39dbc6743c56b7c49ee5510fc2159c90076d6f', 2, '2018-04-22 21:32:24'),
('4594c120b5fda339966da800a074d81416c7644919f1a177a21b336bd3120b80ced765240ab9b1fdf702648d8be7a726169bd31a49a12ad33cdd31337bb049393789ac70fe0c30f13c43a695d4fc5ef18fd121ad647619ec428e52ae400a4df424163c8bcd558ceaf6e5161647922f1759239f80dabe61f01e81cde944222290', 1, '2018-04-22 21:32:38'),
('154225c8760a1940c682aeeb278bce092b50b8247670c913661f0dafed354f612d7ea5b1ba9d1293a5ed755ba4449c4891007d840e27eca012fa3d3ef96710154cc96fd3f375f295248dd4b7858e0c5677640e7e544863246088d254cfe5c92a16cea56ce9f02fc8ac088f91b7b413d7f09cde90f9d8b03b36a326b0ee4edd78', 4, '2018-05-01 14:50:34'),
('cee1127811d21268abc4f26bf147dbc7f8af2013fb276aa1a4d370004fb58e64924263b49ab558bfaae5d2f285e0009e17bbfb069cfcbc5fcd8ab1eaa0cb9b789c4fdbf1397d6d4041d97d952964e6f121b76dd9b0f6461888a055a44ab9b6109444495bd38218cb3334eb235a0edf3d23adce4a66d1cfa2fa1e7a50ba3f1de8', 4, '2018-05-01 21:43:27'),
('180e976ec96ed1c84f64655d9d70e152c2b02ca124353f0772683e1011651da59c240359a52455fa5d947418889143a777b97600689c49809e8a2e47ff9fbb4040665fcbb993a3cec9e570fc606aee084e6b3930b3c4b02a6c32a826cca6bed4369fa3288b6fb5da68e168345f75aa5cc2f85acf0d29f0e6cbf36a74cdff918d', 1, '2018-05-01 21:43:47'),
('d67a490177a5e1e0017de903cb75839fd134d4220350416de366334025a25e961f83a13088967181949950b5cca74213ca9c0f19c3f03d70d49cf5665e6c119712d862fa2b1517794dc92db07fb9e15ade228bcd5c3a7ad55903f8b44695c074b298a3562838e572a4b514faf600889fd2262716235f542786b951e469a9d654', 4, '2018-05-01 22:24:34'),
('22fac40c33f70080aca276d68ceb29eb70805ae7caecbca4996a840595a446e18127d79219a09867ae18c60eb4f149df9f24e678988bdf632b2540331d2b1f3c4ca549da118f997241ce0be3eda8863b336ad539cd6de02c15b6c2d11f156f2d1710e3df7b1322313ebfe218dd9d4fd126b605dd2ba3ad2da34847ea1150d898', 1, '2018-05-01 22:30:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tags`
--

CREATE TABLE `tags` (
  `Id_tag` int(11) NOT NULL,
  `tag` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `tags`
--

INSERT INTO `tags` (`Id_tag`, `tag`) VALUES
(1, 'TENIS'),
(2, 'NIKE'),
(3, 'NEGROS'),
(4, 'CALZADO'),
(5, 'CABALLERO'),
(6, 'XBOX'),
(7, 'XBOX ONE'),
(8, 'CONSOLA'),
(9, 'VIDEOJUEGOS'),
(10, 'CAMISA'),
(11, 'ROPA'),
(12, 'HOMBRE'),
(13, 'AZUL'),
(14, 'ROPA DE VESTIR'),
(15, 'TECLADO'),
(16, 'RATON'),
(17, 'KIT DE ACCESORIOS'),
(18, 'ACCESORIOS PC'),
(19, 'NEGRO'),
(20, 'LOGITECH'),
(21, 'PLAYERA'),
(22, 'ZAPATOS');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `Id_usuario` int(11) NOT NULL,
  `nombre` varchar(30) COLLATE utf16_spanish2_ci NOT NULL,
  `apellidos` varchar(30) COLLATE utf16_spanish2_ci NOT NULL,
  `nacimiento` date DEFAULT NULL,
  `sexo` varchar(10) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `correo` varchar(40) COLLATE utf16_spanish2_ci NOT NULL,
  `correo_back` varchar(40) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `venta_activada` char(1) COLLATE utf16_spanish2_ci NOT NULL DEFAULT 'N',
  `trabaja_en` int(11) DEFAULT NULL,
  `contrasena` text COLLATE utf16_spanish2_ci NOT NULL,
  `estado` varchar(20) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `delegacion` varchar(30) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `colonia` varchar(30) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `cp` int(6) DEFAULT NULL,
  `calle` varchar(30) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `numinterior` varchar(3) COLLATE utf16_spanish2_ci DEFAULT NULL,
  `calificacion` varchar(3) COLLATE utf16_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_spanish2_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Id_usuario`, `nombre`, `apellidos`, `nacimiento`, `sexo`, `correo`, `correo_back`, `telefono`, `venta_activada`, `trabaja_en`, `contrasena`, `estado`, `delegacion`, `colonia`, `cp`, `calle`, `numero`, `numinterior`, `calificacion`) VALUES
(1, 'Luis', 'Sanchez', '1995-12-21', 'masculino', 'luissan9@live.com', '', '3314572269', 'N', 1, '$2y$10$OEi669RzBf4I0908Pr24teJZbQKnhKhiRLl/cTEPtu4FpDIlaqoLy', 'Jalisco', 'Poncitlan', 'Bellavista', 45950, 'Reforma', 600, '', '3'),
(2, 'Lilian Alejandra', 'Lara Sanchez', '1996-05-24', 'femenino', 'lililaralop@hotmail.com', NULL, NULL, 'N', 2, '$2y$10$OEi669RzBf4I0908Pr24teJZbQKnhKhiRLl/cTEPtu4FpDIlaqoLy', NULL, NULL, NULL, NULL, NULL, NULL, NULL, ''),
(4, 'Juan', 'Torres', NULL, NULL, 'juant@mail.com', NULL, NULL, 'N', 18, '$2y$10$hQtYYg47O/cgMmQwirwwC.26AsGm.TVOXxfRuRo1aHIQV5r7YttSS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, ''),
(5, 'Pedro', 'M', NULL, NULL, 'pm@mail.com', NULL, NULL, 'N', NULL, '$2y$10$8wN7rXR/ZBwzaK5hoUnrmuMj47o6Z7HKKi8xHMC.Y.5mhA6oDO2Iy', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `busquedas`
--
ALTER TABLE `busquedas`
  ADD PRIMARY KEY (`Id_busqueda`);

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`folio_carrito`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`Id_empresa`),
  ADD KEY `Id_usuario` (`Id_usuario`);

--
-- Indices de la tabla `imagen_prod`
--
ALTER TABLE `imagen_prod`
  ADD PRIMARY KEY (`Id_imagen`),
  ADD KEY `Id_producto` (`Id_producto`),
  ADD KEY `Id_usuario` (`Id_usuario`);

--
-- Indices de la tabla `info_bancaria`
--
ALTER TABLE `info_bancaria`
  ADD PRIMARY KEY (`Id_registro`);

--
-- Indices de la tabla `map_tag`
--
ALTER TABLE `map_tag`
  ADD KEY `ID_producto` (`Id_producto`),
  ADD KEY `ID_tag` (`Id_tag`);

--
-- Indices de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  ADD PRIMARY KEY (`Id_notificacion`),
  ADD KEY `origen` (`origen`),
  ADD KEY `destino` (`destino`),
  ADD KEY `remitente` (`remitente`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`Id_pedido`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`Id_pregunta`),
  ADD KEY `Id_vendedor` (`Id_vendedor`),
  ADD KEY `Id_cliente` (`Id_cliente`),
  ADD KEY `Id_producto` (`Id_producto`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`Id_producto`),
  ADD KEY `Id_empresa` (`Id_empresa`),
  ADD KEY `productos_ibfk_2` (`Id_usuario`);

--
-- Indices de la tabla `resena`
--
ALTER TABLE `resena`
  ADD PRIMARY KEY (`Id_resena`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`Id_respuesta`),
  ADD KEY `Id_pregunta` (`Id_pregunta`),
  ADD KEY `Id_vendedor` (`Id_vendedor`),
  ADD KEY `Id_pregunta_2` (`Id_pregunta`);

--
-- Indices de la tabla `sesiones_activas`
--
ALTER TABLE `sesiones_activas`
  ADD KEY `Id_usuario` (`Id_usuario`);

--
-- Indices de la tabla `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`Id_tag`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`Id_usuario`),
  ADD KEY `trabaja_en` (`trabaja_en`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `busquedas`
--
ALTER TABLE `busquedas`
  MODIFY `Id_busqueda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `folio_carrito` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `Id_empresa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `imagen_prod`
--
ALTER TABLE `imagen_prod`
  MODIFY `Id_imagen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `info_bancaria`
--
ALTER TABLE `info_bancaria`
  MODIFY `Id_registro` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `notificaciones`
--
ALTER TABLE `notificaciones`
  MODIFY `Id_notificacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `Id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `Id_pregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `Id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `resena`
--
ALTER TABLE `resena`
  MODIFY `Id_resena` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `Id_respuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `tags`
--
ALTER TABLE `tags`
  MODIFY `Id_tag` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `Id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD CONSTRAINT `empresa_ibfk_1` FOREIGN KEY (`Id_usuario`) REFERENCES `usuario` (`Id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `imagen_prod`
--
ALTER TABLE `imagen_prod`
  ADD CONSTRAINT `imagen_prod_ibfk_1` FOREIGN KEY (`Id_producto`) REFERENCES `productos` (`Id_producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `imagen_prod_ibfk_2` FOREIGN KEY (`Id_usuario`) REFERENCES `usuario` (`Id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `map_tag`
--
ALTER TABLE `map_tag`
  ADD CONSTRAINT `map_tag_ibfk_1` FOREIGN KEY (`Id_producto`) REFERENCES `productos` (`Id_producto`),
  ADD CONSTRAINT `map_tag_ibfk_2` FOREIGN KEY (`Id_tag`) REFERENCES `tags` (`Id_tag`);

--
-- Filtros para la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`Id_cliente`) REFERENCES `usuario` (`Id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `preguntas_ibfk_3` FOREIGN KEY (`Id_vendedor`) REFERENCES `empresa` (`Id_empresa`),
  ADD CONSTRAINT `preguntas_ibfk_4` FOREIGN KEY (`Id_producto`) REFERENCES `productos` (`Id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`Id_empresa`) REFERENCES `empresa` (`Id_empresa`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`Id_usuario`) REFERENCES `usuario` (`Id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `respuestas_ibfk_1` FOREIGN KEY (`Id_pregunta`) REFERENCES `preguntas` (`Id_pregunta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `respuestas_ibfk_2` FOREIGN KEY (`Id_vendedor`) REFERENCES `usuario` (`Id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sesiones_activas`
--
ALTER TABLE `sesiones_activas`
  ADD CONSTRAINT `sesiones_activas_ibfk_1` FOREIGN KEY (`Id_usuario`) REFERENCES `usuario` (`Id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`trabaja_en`) REFERENCES `empresa` (`Id_empresa`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
