-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Feb 27. 13:21
-- Kiszolgáló verziója: 10.4.28-MariaDB
-- PHP verzió: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `finomsagok`
--
CREATE DATABASE IF NOT EXISTS `finomsagok` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `finomsagok`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `erzekenysegek`
--

DROP TABLE IF EXISTS `erzekenysegek`;
CREATE TABLE `erzekenysegek` (
  `erzekenyseg` varchar(30) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `erzekenyseg_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `erzekenysegek`
--

INSERT INTO `erzekenysegek` (`erzekenyseg`, `erzekenyseg_id`) VALUES
('nincs', 0),
('laktózérzékeny', 1),
('gluténérzékeny', 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hozzavalok`
--

DROP TABLE IF EXISTS `hozzavalok`;
CREATE TABLE `hozzavalok` (
  `Hozzavalok_neve` varchar(30) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Hozzavalok_id` int(11) NOT NULL,
  `hozzavalo_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `hozzavalok`
--

INSERT INTO `hozzavalok` (`Hozzavalok_neve`, `Hozzavalok_id`, `hozzavalo_ID`) VALUES
('csésze', 5, 3),
('masa harina kukoricaliszt', 6, 3),
('csili con queso', 7, 3),
('csirkeállomány', 8, 3),
('uncia krémsajt', 9, 3),
('szalonna', 10, 3),
('cheddar sajt (reszelt)', 11, 3),
('paprika jack (reszelt)', 12, 3),
('fekete bab, kukorica ', 13, 3),
('dash só', 14, 3),
('dash bors', 15, 3),
('szárított kukoricahéj', 16, 3),
('olaj', 19, 1),
('vaj', 20, 1),
('tojás', 21, 1),
('só', 22, 1),
('sertéshús', 23, 2),
('vöröshagyma', 24, 2),
('paradicsom', 25, 2),
('paprika', 26, 2),
('pirospaprika', 27, 2),
('víz', 28, 2),
('só', 29, 2),
('bors', 30, 2),
('fokhagyma', 31, 2),
('finomliszt', 32, 2),
('tojás', 33, 2),
('víz', 34, 2),
('só', 35, 2),
('hátszín (szeletelve)', 36, 5),
('só', 37, 5),
('fehér hagyma', 38, 5),
('kaliforniai paprika', 39, 5),
('olívaolaj', 40, 5),
('narancslé', 41, 5),
('worcestershire-szósz', 46, 5),
('vörösborecet', 47, 5),
('lime', 48, 5),
('méz', 49, 5),
('díjoni mustár', 50, 5),
('őrölt római kömény', 51, 5),
('oregánó', 52, 5),
('fokhagyma', 53, 5),
('tortillalap', 54, 5),
('tejföl', 55, 5),
('avokádókrém', 56, 5),
('koriander', 57, 5),
('őrölt csilipaprika', 58, 5),
('bors', 59, 5),
('tortillalap', 61, 4),
('sovany hus', 62, 4),
('voroshagyma', 63, 4),
('fokhagyma', 64, 4),
('hegyes eros paprika', 65, 4),
('cheddar sajt', 66, 4),
('csipos paprikakrem', 67, 4),
('liszt', 68, 4),
('suritett paradicsom', 69, 4),
('komeny', 70, 4),
('so', 71, 4),
('olaj', 72, 4),
('fehérliszt', 73, 6),
('zabliszt', 74, 6),
('cukor', 75, 6),
('sütőpor', 76, 6),
('bögre kókusz zsír', 77, 6),
('mandarin kifacsart leve ', 78, 6),
('közepes alma felkockázva ', 79, 6),
('közepes alma szeletelve ', 80, 6),
('mandarin lereszelt héja', 81, 6),
('olaj', 82, 7),
('vöröshagyma', 83, 7),
('fokhagyma', 84, 7),
('darált hús', 85, 7),
('só', 86, 7),
('bors', 87, 7),
('paradicsomszósz', 88, 7),
('bazsalikom', 89, 7),
('vaj', 90, 7),
('liszt', 91, 7),
('tej', 92, 7),
('lasagne tészta', 93, 7),
('sajt', 94, 7),
('tojás', 95, 8),
('közepes cukkini', 96, 8),
('piros paprika', 97, 8),
('fej hagyma', 98, 8),
('friss spenót', 99, 8),
('laktózmentes mozzarella sajt', 100, 8),
('olívaolaj', 101, 8),
('friss petrezselyem', 102, 8),
('tej', 103, 8),
('só', 107, 8),
('bors', 108, 8),
('szárított oregánó', 109, 8),
('rava (búzadara)', 110, 9),
('olívaolaj', 111, 9),
('mustármag', 112, 9),
('környezeti kömény', 113, 9),
('kurkuma por', 114, 9),
('őrölt gyömbér', 115, 9),
('zöld chili', 116, 9),
('borsó', 117, 9),
('vágott zöldség', 118, 9),
('főtt tojás', 119, 9),
('koriander', 120, 9),
('só', 121, 9),
('víz', 122, 9),
('citromlé', 123, 9),
('burgonya', 124, 10),
('karfiol', 125, 10),
('olívaolaj', 126, 10),
('hagyma', 127, 10),
('fokhgyma', 128, 10),
('őrölt gyömbér', 129, 10),
('körömvirág curry', 130, 10),
('kurkuma', 131, 10),
('piper paprika', 132, 10),
('római kömény', 133, 10),
('só', 134, 10),
('bors', 135, 10),
('koriander', 136, 10),
('víz', 137, 10),
('cukor', 138, 10),
('joghurt', 139, 10),
('fekete lencse', 142, 11),
('vesebab', 143, 11),
('növényi olaj', 144, 11),
('közepes hagyma', 145, 11),
('reszelt gyömbér', 146, 11),
('fokhagyma', 147, 11),
('zöld chili', 148, 11),
('őrölt kömény', 149, 11),
('őrölt koriander', 150, 11),
('kurkuma por', 151, 11),
('garam masala', 152, 11),
('piros paprika', 153, 11),
('őrölt kömény', 154, 11),
('darált paradicsom', 155, 11),
('kókuszkrém', 156, 11),
('növényi tej', 157, 11),
('só', 158, 11),
('bors', 159, 11),
('koriander', 160, 11);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `konyha`
--

DROP TABLE IF EXISTS `konyha`;
CREATE TABLE `konyha` (
  `nemzetiseg` varchar(30) NOT NULL,
  `konyha_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `konyha`
--

INSERT INTO `konyha` (`nemzetiseg`, `konyha_id`) VALUES
('magyar', 1),
('indiai', 2),
('amerikai', 3),
('mexikói', 4),
('olasz', 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `mertekegyseg`
--

DROP TABLE IF EXISTS `mertekegyseg`;
CREATE TABLE `mertekegyseg` (
  `mennyiseg` int(20) NOT NULL,
  `mértékegység` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id` int(11) NOT NULL,
  `mertekegyseg_ID` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `mertekegyseg`
--

INSERT INTO `mertekegyseg` (`mennyiseg`, `mértékegység`, `id`, `mertekegyseg_ID`) VALUES
(1, 'tk', 1, 1),
(1, 'tk', 2, 1),
(3, 'db', 3, 1),
(1, 'csipet', 4, 1),
(4, 'csésze', 5, 3),
(1, 'db', 6, 3),
(2, 'csésze', 7, 3),
(3, 'db', 8, 3),
(6, 'ek', 9, 3),
(1, 'csésze', 10, 3),
(1, 'csésze', 11, 3),
(1, 'csésze', 12, 3),
(1, 'csomag', 13, 3),
(50, 'dkg', 14, 2),
(3, 'db', 15, 2),
(3, 'db', 16, 2),
(1, 'db', 17, 2),
(1, 'kk', 18, 2),
(5, 'dl', 19, 2),
(1, 'gerezd', 20, 2),
(50, 'dkg', 21, 2),
(1, 'db', 22, 2),
(4, 'dl', 23, 2),
(1, 'tk', 24, 2),
(10, 'db', 25, 4),
(40, 'dkg', 26, 4),
(1, 'db', 27, 4),
(2, 'gerezd', 28, 4),
(1, 'db', 29, 4),
(20, 'dkg', 30, 4),
(2, 'tk', 31, 4),
(2, 'csapott ek', 32, 4),
(2, 'dl', 33, 4),
(1, 'csipet', 34, 4),
(2, 'csipet', 35, 4),
(2, 'tk', 36, 4),
(60, 'dkg', 37, 5),
(1, 'csipet', 38, 5),
(1, 'db', 39, 5),
(3, 'db', 40, 5),
(5, 'ek', 41, 5),
(1, 'dl', 42, 5),
(2, 'ek', 43, 5),
(1, 'ek', 44, 5),
(1, 'db', 45, 5),
(2, 'tk', 46, 5),
(1, 'ek', 47, 5),
(1, 'tk', 48, 5),
(1, 'tk', 49, 5),
(2, 'tk', 50, 5),
(3, 'gerezd', 51, 5),
(1, 'csipet', 52, 5),
(6, 'db', 53, 5),
(2, 'dl', 54, 5),
(20, 'dkg', 55, 5),
(1, 'csokor', 56, 5),
(20, 'dkg', 57, 6),
(10, 'dkg', 58, 6),
(8, 'dkg', 59, 6),
(1, 'tk', 60, 6),
(2, 'ek', 61, 6),
(3, 'db', 62, 6),
(3, 'db', 63, 6),
(1, 'db', 64, 6),
(1, 'db', 65, 6),
(1, 'tk', 66, 7),
(1, 'fej', 67, 7),
(1, 'gerezd', 68, 7),
(1, 'kg', 69, 7),
(1, 'csipet', 70, 7),
(1, 'csipet', 71, 7),
(1, 'l', 72, 7),
(1, 'db', 73, 7),
(10, 'dkg', 74, 7),
(10, 'dkg', 75, 7),
(1, 'l', 76, 7),
(50, 'dkg', 77, 7),
(10, 'dkg', 78, 7),
(6, 'db', 79, 8),
(1, 'db', 80, 8),
(1, 'db', 81, 8),
(1, 'fej', 82, 8),
(100, 'g', 83, 8),
(100, 'g', 84, 8),
(2, 'ek', 85, 8),
(2, 'tk', 86, 8),
(1, 'csipet', 87, 8),
(2, 'ek', 88, 8),
(1, 'csésze', 89, 8),
(1, 'csipet', 91, 8),
(2, 'tk', 92, 8),
(1, 'csésze', 93, 9),
(1, 'ek', 94, 9),
(2, 'tk', 95, 9),
(1, 'tk', 96, 9),
(3, 'tk', 97, 9),
(2, 'tk', 98, 9),
(1, 'db', 99, 9),
(1, 'csésze', 100, 9),
(2, 'csésze', 101, 9),
(2, 'csésze', 102, 9),
(2, 'csésze', 103, 9),
(1, 'csipet', 104, 9),
(2, 'csésze', 105, 9),
(1, 'ek', 106, 9),
(2, 'db', 107, 10),
(1, 'db', 108, 10),
(2, 'ek', 109, 10),
(1, 'db', 110, 10),
(2, 'gerezd', 111, 10),
(1, 'tk', 112, 10),
(1, 'tk', 113, 10),
(1, 'tk', 114, 10),
(2, 'tk', 115, 10),
(2, 'tk', 116, 10),
(1, 'csipet', 117, 10),
(1, 'csipet', 118, 10),
(2, 'csésze', 119, 10),
(1, 'csésze', 120, 10),
(1, 'csipet', 121, 10),
(1, 'csésze', 122, 10),
(1, 'csésze', 123, 11),
(1, 'csésze', 124, 11),
(2, 'ek', 125, 11),
(1, 'ek', 126, 11),
(1, 'db', 127, 11),
(1, 'csésze', 128, 11),
(2, 'gerezd', 129, 11),
(1, 'db', 130, 11),
(1, 'tk', 131, 11),
(1, 'tk', 132, 11),
(2, 'tk', 133, 11),
(1, 'tk', 134, 11),
(1, 'tk', 135, 11),
(1, 'tk', 136, 11),
(2, 'csésze', 137, 11),
(1, 'csésze', 138, 11),
(2, 'csésze', 139, 11),
(1, 'csipet', 140, 11),
(1, 'csipet', 141, 11);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `napszak`
--

DROP TABLE IF EXISTS `napszak`;
CREATE TABLE `napszak` (
  `idoszak` varchar(20) NOT NULL,
  `napszak_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `napszak`
--

INSERT INTO `napszak` (`idoszak`, `napszak_id`) VALUES
('reggeli', 1),
('ebéd', 2),
('vacsora', 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `osszekoto`
--

DROP TABLE IF EXISTS `osszekoto`;
CREATE TABLE `osszekoto` (
  `hozzavalok_id` int(11) NOT NULL,
  `receptek_id` int(11) NOT NULL,
  `ervenyes` int(1) NOT NULL,
  `etrend_id` int(10) NOT NULL,
  `mertekegyseg_id` int(10) NOT NULL,
  `preferencia_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `osszekoto`
--

INSERT INTO `osszekoto` (`hozzavalok_id`, `receptek_id`, `ervenyes`, `etrend_id`, `mertekegyseg_id`, `preferencia_id`) VALUES
(19, 1, 0, 2, 1, 0),
(20, 1, 0, 2, 2, 0),
(21, 1, 0, 2, 3, 0),
(22, 1, 0, 2, 4, 0),
(23, 2, 0, 2, 14, 0),
(24, 2, 0, 2, 15, 0),
(25, 2, 0, 2, 16, 0),
(26, 2, 0, 2, 17, 0),
(27, 2, 0, 2, 18, 0),
(28, 2, 0, 2, 19, 0),
(31, 2, 0, 2, 20, 0),
(32, 2, 0, 2, 21, 0),
(33, 2, 0, 2, 22, 0),
(34, 2, 0, 2, 23, 0),
(35, 2, 0, 2, 24, 0),
(61, 4, 0, 1, 25, 0),
(62, 4, 0, 1, 26, 0),
(63, 4, 0, 1, 27, 0),
(64, 4, 0, 1, 28, 0),
(65, 4, 0, 1, 29, 0),
(66, 4, 0, 1, 30, 0),
(67, 4, 0, 1, 31, 0),
(68, 4, 0, 1, 32, 0),
(69, 4, 0, 1, 33, 0),
(70, 4, 0, 1, 34, 0),
(71, 4, 0, 1, 35, 0),
(72, 4, 0, 1, 36, 0),
(36, 5, 0, 1, 37, 0),
(37, 5, 0, 1, 38, 0),
(38, 5, 0, 1, 39, 0),
(39, 5, 0, 1, 40, 0),
(40, 5, 0, 1, 41, 0),
(41, 5, 0, 1, 42, 0),
(46, 5, 0, 1, 43, 0),
(47, 5, 0, 1, 44, 0),
(48, 5, 0, 1, 45, 0),
(49, 5, 0, 1, 46, 0),
(50, 5, 0, 1, 47, 0),
(58, 5, 0, 1, 48, 0),
(51, 5, 0, 1, 49, 0),
(52, 5, 0, 1, 50, 0),
(53, 5, 0, 1, 51, 0),
(59, 5, 0, 1, 52, 0),
(54, 5, 0, 1, 53, 0),
(55, 5, 0, 1, 54, 0),
(56, 5, 0, 1, 55, 0),
(57, 5, 0, 1, 56, 0),
(73, 6, 0, 1, 57, 0),
(74, 6, 0, 1, 58, 0),
(75, 6, 0, 1, 59, 0),
(76, 6, 0, 1, 60, 0),
(77, 6, 0, 1, 61, 0),
(78, 6, 0, 1, 62, 0),
(81, 6, 0, 1, 63, 0),
(79, 6, 0, 1, 64, 0),
(80, 6, 0, 1, 65, 0),
(82, 7, 0, 2, 66, 0),
(83, 7, 0, 2, 67, 0),
(84, 7, 0, 2, 68, 0),
(85, 7, 0, 2, 69, 0),
(86, 7, 0, 2, 70, 0),
(87, 7, 0, 2, 71, 0),
(88, 7, 0, 2, 72, 0),
(89, 7, 0, 2, 73, 0),
(90, 7, 0, 2, 74, 0),
(91, 7, 0, 2, 75, 0),
(92, 7, 0, 2, 76, 0),
(93, 7, 0, 2, 77, 0),
(94, 7, 0, 2, 78, 0),
(95, 8, 0, 0, 79, 1),
(96, 8, 0, 0, 80, 1),
(97, 8, 0, 0, 81, 1),
(98, 8, 0, 0, 82, 1),
(99, 8, 0, 0, 83, 1),
(100, 8, 0, 0, 84, 1),
(101, 8, 0, 0, 85, 1),
(102, 8, 0, 0, 88, 1),
(103, 8, 0, 0, 89, 1),
(107, 8, 0, 0, 87, 1),
(108, 8, 0, 0, 91, 1),
(109, 8, 0, 0, 92, 1),
(110, 9, 0, 0, 93, 3),
(111, 9, 0, 0, 94, 3),
(112, 9, 0, 0, 95, 3),
(113, 9, 0, 0, 96, 3),
(114, 9, 0, 0, 97, 3),
(115, 9, 0, 0, 98, 3),
(116, 9, 0, 0, 99, 3),
(117, 9, 0, 0, 100, 3),
(118, 9, 0, 0, 101, 3),
(119, 9, 0, 0, 102, 3),
(120, 9, 0, 0, 103, 3),
(121, 9, 0, 0, 104, 3),
(122, 9, 0, 0, 105, 3),
(123, 9, 0, 0, 106, 3),
(124, 10, 0, 2, 107, 4),
(125, 10, 0, 2, 108, 4),
(126, 10, 0, 2, 109, 4),
(127, 10, 0, 2, 110, 4),
(128, 10, 0, 2, 111, 4),
(129, 10, 0, 2, 112, 4),
(130, 10, 0, 2, 113, 4),
(131, 10, 0, 2, 114, 4),
(132, 10, 0, 2, 115, 4),
(133, 10, 0, 2, 116, 4),
(134, 10, 0, 2, 117, 4),
(135, 10, 0, 2, 118, 4),
(136, 10, 0, 2, 119, 4),
(137, 10, 0, 2, 120, 4),
(138, 10, 0, 2, 121, 4),
(139, 10, 0, 2, 122, 4),
(142, 11, 0, 1, 123, 2),
(143, 11, 0, 1, 124, 2),
(144, 11, 0, 1, 125, 2),
(145, 11, 0, 1, 127, 2),
(146, 11, 0, 1, 126, 2),
(147, 11, 0, 1, 129, 2),
(148, 11, 0, 1, 130, 2),
(149, 11, 0, 1, 131, 2),
(150, 11, 0, 1, 132, 2),
(151, 11, 0, 1, 133, 2),
(152, 11, 0, 1, 134, 2),
(153, 11, 0, 1, 135, 2),
(154, 11, 0, 1, 136, 2),
(155, 11, 0, 1, 137, 2),
(156, 11, 0, 1, 138, 2),
(157, 11, 0, 1, 139, 2),
(158, 11, 0, 1, 140, 2),
(159, 11, 0, 1, 141, 2),
(160, 11, 0, 1, 128, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `preferencia`
--

DROP TABLE IF EXISTS `preferencia`;
CREATE TABLE `preferencia` (
  `etkezes` varchar(30) NOT NULL,
  `etkezes_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `preferencia`
--

INSERT INTO `preferencia` (`etkezes`, `etkezes_id`) VALUES
('nincs', 0),
('laktó-vegetáriánus', 1),
('vegán', 2),
('ovo-vegetáriánus', 3),
('lakto-ovo-vegetáriánus', 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `receptek`
--

DROP TABLE IF EXISTS `receptek`;
CREATE TABLE `receptek` (
  `Keszites` text CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Receptek_id` int(11) NOT NULL,
  `Receptek_neve` varchar(100) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `kep` varchar(50) DEFAULT NULL,
  `konyha_oszekoto` int(10) NOT NULL,
  `napszak_oszekoto` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `receptek`
--

INSERT INTO `receptek` (`Keszites`, `Receptek_id`, `Receptek_neve`, `kep`, `konyha_oszekoto`, `napszak_oszekoto`) VALUES
('Egy serpenyőt közepes lángon melegíteni kezdünk. Beleöntjük az olajat, majd hozzáadjuk a vajat. Amíg a vaj felhabzik, a tojásokat egy keverőtálba öntjük, sózzuk, villával kissé felverjük (nem kell, hogy teljesen elkeveredjen a sárgája a fehérjével).\r\nA keveréket a habzó vajra öntjük, és körkörös mozdulatokkal keverve megsütjük. Ügyeljünk arra, hogy ne süssük szárazra (3 db tojás esetén nagyjából 1-2 perc a sütési idő).\r\nVégül ízlés szerint megszórhatjuk egy kevés őrölt pirospaprikával vagy akár sajttal. Pirítóssal, vagy friss kenyérrel tálaljuk.', 1, 'Rántotta', 'rantotta.png', 1, 1),
('A húst apró kockákra vágjuk. A paradicsomnak lehúzzuk a héját, és felkockázzuk. A hagymákat és a paprikát szintén apróra vágjuk.\r\nA hagymát üvegesre pároljuk kevés olajon, majd hozzáadjuk a fűszerpaprikát.\r\nA kockákra vágott sertéshúst a hagymához adjuk, és addig pirítjuk, amíg kissé megpirul.\r\nA felkockázott paprikát és paradicsomot hozzáadjuk, összekeverjük.\r\nFelöntjük annyi vízzel, hogy ellepje a húst, majd ízlés szerint fűszerezzük.\r\nLassú tűzön főzöm, időnként megkeverjük. Amikor besűrűsödik a szaft (kb 1 óra) elkészült a pörkölt.\r\nA nokedli tésztájához összekeverjük a lisztet, tojást, vizet és sót egy tálban, hogy sűrű, ragacsos tésztát kapjak.\r\nForrásban lévő vízbe szaggatjuk a tésztát egy nokedli szaggatóval, majd amint feljönnek a víz tetejére leszűrjük.', 2, 'Nokedli pörköltel', 'nokedliporkolttel.jpg', 1, 2),
('A banán leveleit letakarják. Ha kukoricahéjat használ, nagyon meleg vízben áztassa őket egy órán keresztül, hogy lágyítsa őket.\r\nTegyük a masát: egy nagy tálban vagy egy álló mixer táljával verjük meg a sertészetet vagy a növényi rövidítést, a krémsajtot és a chili con queso-t, amíg fény és bolyhos.\r\nEgy külön tálban keverje össze a mas harina 2 csésze csirkeállományt.\r\nAdjuk hozzá a masina harina fele a keverőhöz, és jól megverjük.\r\nAdja hozzá a fennmaradó masszát további csirkeállományhoz, szükség szerint, jól verte, amíg a keverék hasonlít egy vastag torta tésztához.\r\n', 3, 'Tamales', 'tamales.jpg', 4, 1),
('A húst mosd át alaposan, vágd csíkokra, sózd be és pirítsd meg egy kis olajon, serpenyőben. Ha elkészült, tedd félre. A serpenyőbe tegyél még egy kis olajat, pirítsd barnára a lisztet rajta, majd két deci víz társaságában add hozzá a paradicsomszószt. Darabold bele a hagymát, a fokhagymát, a paprikakrémet, a köményt és persze ízlésednek megfelelő mennyiségű sót. Ha már felforrósodott és összeállt, keverd bele a húst is, karikázd bele a hegyes erőspaprikát, majd kis lángon hagyd még rotyogni körülbelül tíz percig. Az elkészült szószt tekerd a tortilla lapokba, tedd őket egymás mellé, szórd meg jó alaposan sajttal és 200 fokra előmelegített sütőben pirítsd készre.', 4, 'Enchilada', 'enchilada.jpg', 4, 2),
('Elkészítjük a pácot, egy keverőtálba kanalazzuk az olívaolajat, hozzáöntjük a narancslevet, a Worcestershire-szószt, a vörösborecetet, a lime levét, a mézet és a dijoni mustárt. Fűszerezzük a csilipaprikával, a római köménnyel, az oregánóval, hozzányomjuk a fokhagymát, megborsozzuk, majd az egészet jó alaposan homogénre keverjük.\r\nA hátszínszeleteket a hús rostjaira merőlegesen 3-4 milliméteres csíkokra vágjuk. Ezután alaposan összeforgatjuk a páccal, majd letakarva a hűtőben pihentetjük legalább két órán keresztül, sütés előtt fél óráig pedig szobahőmérsékleten hagyjuk állni.\r\nEgy serpenyőt közepesnél magasabb fokozaton hevíteni kezdünk, addig, amíg szinte füstölni nem kezd. Ekkor beletesszük a pácolt húst, sózzuk, majd egyszer jól átkeverjük. Azután nagyjából 2 percig hagyjuk lepirulni, nem kavargatjuk. Amikor a húscsíkok kétharmada kifehéredett, megkeverjük, kanalazhatunk hozzá a pácból, és nagyjából még 1-2 percig pirítjuk. Levesszük a tűzről, és egy másik edénybe helyezve pihentetjük.\r\nA serpenyőt visszatesszük a tűzre, és beletesszük a megtisztított, felszeletelt fehér hagymát, majd hozzáadjuk a megmosott, csíkokra vágott paprikát, és időnként kevergetve pár percig pirítjuk. Ízesítjük sóval, hozzáadjuk a hús visszamaradt páclevét, és 5-7 percig néha megkeverve pirítjuk, pároljuk. Akkor jó, ha a zöldségeknek még tartása marad. Ekkor elzárjuk a hőt a serpenyő alatt, beletesszük a húst, és alaposan összeforgatjuk az egészet.\r\nNem marad más, mint a fajitas összeállítása: a tortillalapokat egy tiszta serpenyőben átmelegítjük, majd megkenjük vékonyan tejföllel, erre kanalazzuk a guacamolét, szépen elkenjük ezt is, majd ráhalmozzuk a fűszeres húsos-zöldséges keveréket. Megszórjuk petrezselyemmel vagy korianderrel, kezünkkel félbehajtjuk a tortillát, és már falatozhatjuk is. Kiegészítésként paradicsomsalsát is készíthetünk hozzá.\r\nEzt is a hűtőbe teszem. Majd a csirkemellet kevés olívaolajon kis vajjal megsütöm.\r\nMikróban egy tortillát kissé megmelegítek, majd megkenem az avokádós krémmel, kis tejföllel, rárakom a frissen kisült húscsíkokat, majd a dinsztelt hagymát, paprikát és a tabasco szószos paradicsomot, ezt feltekerem és kész is.\r\nAki szereti, reszelt sajtot is rakhat bele.', 5, 'Fajita', 'fajita.jpg', 4, 3),
('A lisztet és a zabpehelylisztet átszitáltam, belekevertem a cukrot és a sütőport. \r\nA mandarinokat kifacsartam és elkevertem a levüket növényi tejjel. Sütéshez általában mandula- vagy zabtejet használok.\r\nA kókuszzsírt felolvasztottam.\r\nÖsszekevertem a lisztes keveréket, a mandarinos tejet és a zsiradékot, majd kikent, zsemlemorzsával megszórt tepsibe öntöttem a masszát. Előbb rászórtam az almakockákat, majd kidíszítettem a tetejét a szeletekkel.\r\n170 fokra előmelegített sütőben nagyjából 40 perc alatt tűpróbáig sütöttem és teljesen hagytam kihűlni a formában. Sokat változik az állaga, ameddig hűl. Ha még melegen felvágjuk, akkor ragacsos maradhat a közepe.\r\n', 6, 'Torta di Mele', 'tortadimele.jpg', 5, 1),
('A lasagne elkészítéséhez kevés olajon megdinszteljük az apróra vágott vöröshagymát a fokhagymával együtt, majd rátesszük a darált húst, és nagyobb lángon egészen addig pároljuk, amíg a hús kifehéredik.\r\nSóval, borssal ízesítjük. Ezután pici vizet öntünk alá, és fedő alatt puhára pároljuk. Amikor már majdnem elkészült, felengedjük a paradicsomszósszal, bazsalikommal ízesítjük, és jól összefőzzük.\r\nKözben a vajat serpenyőben felmelegítjük, beleszórjuk a lisztet, és addig hevítjük, míg el nem kezd kifehéredni. Felengedjük a tejjel, sózzuk és nem túl sűrű besamel szószt főzünk belőle. Ha nagyon sűrű lenne, kevés tejjel higíthatjuk.\r\nEgy közepes méretű tepsit vékonyan kiolajazunk. Az aljába teszünk kevés ragut, több besamelt, majd jön rá a lasagne tésztalap. Ismét a ragu, a besamel, a tészta váltakozva. A lényeg, hogy a lasagne tetejére kerüljön az utolsó adag ragu.\r\nMegszórjuk reszelt sajttal, alufóliával letakarva, 170 fokra előmelegített sütőben, kb. 35-40 perc alatt készre sütjük (amíg a tészta megpuhul, a sajt szépen megbarnul).', 7, 'Lasagne', 'lasagne.jpg', 5, 2),
('Melegítsd elő a sütőt 180 °C-ra.\r\nA zöldségeket (cukkini, paprika, hagyma) szeleteld fel.\r\nA sajtot reszeld le, ha még nem tetted meg.\r\nEgy nagy, sütőben is használható serpenyőt (vagy piteformát) melegíts fel közepes lángon, majd öntsd bele az olívaolajat.\r\nTedd bele a hagymát, és pirítsd 2-3 percig, amíg üvegesedni kezd.\r\nAdd hozzá a cukkinit és paprikát, majd süsd őket 5-7 percig, amíg enyhén megpuhulnak.\r\nKeverd hozzá a friss spenótot, és főzd még 2-3 percig, amíg összeesik.\r\nEgy tálban verd fel a tojásokat a tejjel (ha használod), sóval, borssal, és oregánóval. Ha növényi alapú tejet használsz, akkor annak semmi gondja, hogy a frittata tejmentes maradjon.\r\nKeverd hozzá a reszelt laktózmentes sajtot és a friss petrezselymet.\r\nA tojásos keveréket öntsd a zöldségek tetejére a serpenyőben.\r\nA serpenyőt tedd a sütőbe, és süsd 12-15 percig, amíg a tojás teljesen megszilárdul, és a frittata teteje szép aranybarna lesz.\r\nHa biztosra akarsz menni, akkor egy kicsit kipróbálhatod villával, hogy megsült-e a belseje. A tojásnak már nem kell folyósnak lennie.', 8, 'Zöldséges fritatta', 'zoldsegesfritatta.jpg', 5, 3),
('Pirítsd meg a rava-t: Melegíts egy serpenyőt közepes hőmérsékleten. Tedd bele a búzadara (rava) és folyamatos kevergetés mellett pirítsd 3-5 percig, amíg enyhén aranyszínűvé válik. Ezután tedd félre.\r\nFűszerek pirítása: Ugyanabban a serpenyőben, ahol a rava-t pirítottad, önts egy evőkanál olajat vagy ghee-t. Melegítsd fel, majd add hozzá a mustármagot, és hagyd, hogy kipattogjanak. Ezután tedd bele a köménymagot, kurkumát, gyömbért, és a zöld chiliket. Pirítsd őket egy-két percig, hogy az illatok kibontakozzanak.\r\nZöldségek hozzáadása: Add hozzá a zöldségeket (borsó, sárgarépa, stb.), és pirítsd őket 2-3 percig, amíg megpuhulnak. Ha szükséges, egy kis vizet is adhatsz hozzá, hogy ne égjenek le.\r\nTojás hozzáadása: Üsd fel a tojásokat egy tálba, verd fel őket, majd add hozzá a zöldségekhez. Keverd össze, és hagyd, hogy a tojás egyenletesen megfőjön.\r\nRava hozzáadása: Öntsd vissza a pirított búzadarát a serpenyőbe, és keverd el a zöldségekkel és tojással. Öntsd hozzá a forró vizet, és folyamatosan kevergetve főzd, amíg az összes víz el nem párolog, és a rava meg nem puhul (kb. 3-4 perc).\r\nMiután az upma kész, adj hozzá sót, friss koriandert, és facsarj rá egy kis citromlevet a friss íz érdekében.\r\n\r\n', 9, 'Upma', 'upma.jpg', 2, 1),
('A karfiolt rózsákra vágd fel, a burgonyát hámozd meg, és kockázd fel kis darabokra.\r\nKészítsd elő a fűszereket, hogy gyorsan hozzá tudj adni mindent a főzés során.\r\nEgy nagy serpenyőben (vagy wokban) melegítsd fel az olajat vagy a ghee-t közepes hőmérsékleten.\r\nAdd hozzá a hagymát, és pirítsd aranybarnára (5-7 perc).\r\nEzután add hozzá a fokhagymát és a gyömbért, és pirítsd őket 1-2 percig, amíg az illatok felszabadulnak.\r\nSzórd bele a római köményt, kurkumát, paprikát, garam masalát (vagy curry port), és egy csipet sót. Keverd jól össze, hogy a fűszerek eloszoljanak.\r\nTedd bele a felkockázott burgonyát és a karfiolt, majd jól keverd össze, hogy minden darabot bevonjon a fűszeres keverék.\r\nÖntsd rá a vizet, és fedd le a serpenyőt. Főzd 10-15 percig, amíg a burgonya és karfiol megpuhul (ha szükséges, adj hozzá még egy kis vizet).\r\nHa a zöldségek megpuhultak, adj hozzá egy kis cukrot, ha szeretnéd kiemelni az ízeket. Kóstold meg, és igazítsd a sót és borsot, ha szükséges.\r\nTálalás előtt szórd meg friss korianderrel.', 10, 'Aloo gobi', 'aloogobi.jpg', 2, 2),
('Áztasd a fekete lencsét (urad dal) és a vesebabot (rajma) legalább 6-8 órán át, vagy akár egy egész éjszakán keresztül, hogy megpuhuljanak.\r\nMiután áztattad, öblítsd le a lencsét és a vesebabot, majd tedd őket egy nagy lábasba. Add hozzá annyi vizet, hogy ellepje a babokat, és főzd őket kb. 30-40 percig, amíg megpuhulnak. Ha szükséges, használhatsz kuktát is a gyorsabb főzéshez.\r\nEgy nagy serpenyőben vagy lábasban, forrósítsd fel az olajat. Add hozzá a finomra vágott hagymát, és pirítsd aranybarnára.\r\nAdd hozzá a reszelt gyömbért, fokhagymát, és zöld chiliket, ha használsz, majd pirítsd őket 1-2 percig.\r\nTedd bele a köményt, koriandert, kurkumát, garam masalát, piros paprikát és őrölt köményt. Fűszerezd meg jól az alapot, és pirítsd 2-3 percig, hogy a fűszerek felszabadítsák az ízeiket.\r\nAdd hozzá a darált paradicsomot, és főzd, amíg a paradicsom is össze nem sűrűsödik és az ízek összeérnek (kb. 5-7 perc).\r\nMost, hogy az alap elkészült, öntsd bele a főtt lencsét és vesebabot a fűszeres paradicsomos alapba. Ha szükséges, adj hozzá egy kis vizet, hogy a kívánt állagot elérd (könnyen krémesebb, sűrűbb, vagy folyósabb lehet az étel, attól függően, hogy mennyi folyadékot adsz hozzá).\r\nFőzd az ételt alacsony lángon további 15-20 percig, hogy az ízek összeérjenek.\r\nAz ételhez add hozzá a kókuszkrémet vagy mandulakrém-et, és öntsd hozzá a növényi tejet (pl. kókusztejet vagy mandulatejet), hogy még krémesebb legyen. Keverd jól össze, és hagyd főni további 5-10 percig.\r\nÍzesítsd sóval, borssal, és ha szükséges, még egy kis extra fűszerrel.', 11, 'Dal Makhani ', 'dalmakhani.jpg', 2, 3),
('A töltött káposzta töltelékéhez a rizst megmossuk, hozzáadjuk darált sertéshúst, az apróra vágott vöröshagymát és fokhagymát, a sót, borsot és a pirospaprikát, majd óvatos mozdulatokkal összegyúrjuk.\r\nA káposztát ízlés szerint kimossuk, majd a lefejtett levelekbe göngyöljük a tölteléket.\r\nA megmaradt káposztaleveleket feldaraboljuk, és a lábas aljára halmozzuk, a megmosott füstölt bordaszéllel együtt. Erre rakjuk a megtöltött káposztákat, majd felöntjük annyi vízzel, hogy ellepje. 2-3 nagyobb káposztalevéllel betakarjuk, és felfőzzük. Kb. 70-80 perc alatt fő meg (az idő a hústól is függ).\r\nHa megfőtt a töltött káposzta, rántást készítünk hozzá. Ehhez kevés olajat hevítünk, a lisztet megpirítjuk benne, majd a tűzről levéve pirospaprikát teszünk bele, hogy szép színe legyen, és két evőkanál tejfölt is belekeverünk. A káposzta levéből annyit adunk hozzá, hogy kb. egyforma meleg legyen (hőkiegyenlítés), rászűrjük a káposztára, és összeforraljuk.\r\nTejföllel és friss kenyérrel tálaljuk.', 12, 'Töltött káposzta', '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0', 1, 3),
('A két tojást a vízzel és a tejszínnel jó alaposan kikeverjük, majd hozzáadjuk a cukrot, vaníliás cukrot, sót, apránként a lisztet, sütőport, no és az olvasztott vajat.\r\nKikeverjük – sűrű masszát fogunk kapni.\r\nEzután jön egy kis pihenő. A gofri alapot letakarjuk, és fél-egy órán keresztül állni hagyjuk.\r\nElővesszük a gofri sütőt, vagy a palacsintasütőt, felmelegítjük és olajjal lekenjük.\r\nHa már elég meleg, akkor egy kis merőkanálnyi masszát öntünk rá, ha gofrisütővel dolgozunk, akkor ráfordítjuk a tetejét, palacsintasütőben pedig megvárjuk, hogy barnuljon a széle, akkor esélyesen már szépen sül. Ha serpenyővel dolgozunk, akkor természetesen megfordítjuk.\r\nLehetőleg melegen ne rakjuk egymásra, hanem rácsra, ne kapjanak párát egymástól.\r\nTetszés szerinti finomságokkal ehetjük, jó hozzá a tejszínhab, lekvár, csokiöntet. De van, aki magában szereti.', 13, 'Gofri', '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0', 3, 1),
('A klasszik amerikai hamburger elkészítéséhez először a karamellizált hagymához a cukrot elkezdjük karamellizálni egy serpenyőben, meglocsoljuk a vízzel, majd beleforgatjuk a vékony csíkokra vágott hagymát és addig pirítjuk, amíg kicsit puhul, de még marad egy kis harapása. Ezután félretesszük hűlni.\r\nA szószhoz az uborkákat apró kockákra vágjuk, majd összekeverjük a ketchup, mustár, majonéz kombóval, és a végén whiskyvel ízesítjük.\r\nA darált marhahúst összekeverjük a felolvasztott csontvelővel. Két pogácsát formázunk belőle, majd egy serpenyőben közepesen erős lángon elkezdjük sütni az egyik felét. Közben sózzuk, borsozzuk, megfordítjuk, rászórjuk a cheddart és így sütjük meg a másik oldalát. Egy másik serpenyőben a baconszeleteket ropogósra sütjük.\r\nA megfelezett bucikat vékonyan megkenjük vajjal és picit lepirítjuk mindkét felét. Az alját megkenjük a szósszal, mehet rá a saláta, a cheddaros húspogácsa, majd a karamellizált hagyma. Rátesszük a ropogós baconszeleteket, a tetejére rakunk pár szelet paradicsomot, majd a zsemle tetejét is megkenjük a szósszal, és lezárjuk vele ezt az ízig-vérig amerikai hambit.', 14, 'Klasszikus amerikai hamburger', '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0', 3, 2),
('A húsról szedd le a hártyát, mosd meg, és itasd le róla a nedvességet. Arra ügyelj, hogy ne maradjanak rajta szilánkok. Az ízlésedtől függően vágd tetszőleges darabokra. Érdemes nagyobb szeleteket hagyni, úgy ízletesebb lesz. A száraz BBQ-páchoz keverd össze a cukrot, a sót, a borsot, a préselt fokhagymát és a pirospaprikát, majd dörzsöld be vele a húst. Előmelegített sütőben, 110 fokon, fóliával lefedve süsd az oldalast körülbelül négy órán át. Ha a hús szinte magától lefordul a csontról, vedd ki a sütőből.\r\n \r\n\r\nKözben készítsd el a szószt. A hagymát aprítsd kis darabokra, öntsd hozzá a vizet, és egy botmixerrel pürésítsd. Az olívaolajat hevítsd fel egy serpenyőben, és pirítsd enyhén barnára a hagymás pürét. Keverd hozzá a ketchupot, a cukrot, a fokhagymát, az almaecetet, és főzd 20 percig. Ha nem elég sűrű, forrald még egy kicsit. Kend be vele jól a húst, rakhatsz még rá rozmaringot, más zöldfűszert. Pakold a forró grillre, és süsd meg körülbelül 10-15 perc alatt. Közben forgasd meg az oldalast. Ha megkaramellizálódik, leveheted a grillről.', 15, 'BBQ oldalas', '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0', 3, 3);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `regisztracio`
--

DROP TABLE IF EXISTS `regisztracio`;
CREATE TABLE `regisztracio` (
  `Admin` int(1) NOT NULL,
  `Felhasznalo_id` int(11) NOT NULL,
  `E-mail` varchar(100) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Jelszo` varchar(30) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Felhasznalonev` varchar(30) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `sajatrecept` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `regisztracio`
--

INSERT INTO `regisztracio` (`Admin`, `Felhasznalo_id`, `E-mail`, `Jelszo`, `Felhasznalonev`, `sajatrecept`) VALUES
(0, 1, 'horvath0akos@gmail.com', 'jelszo', 'Akos0603', 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `erzekenysegek`
--
ALTER TABLE `erzekenysegek`
  ADD PRIMARY KEY (`erzekenyseg_id`);

--
-- A tábla indexei `hozzavalok`
--
ALTER TABLE `hozzavalok`
  ADD PRIMARY KEY (`Hozzavalok_id`),
  ADD KEY `hozzavalo_ID` (`hozzavalo_ID`);

--
-- A tábla indexei `konyha`
--
ALTER TABLE `konyha`
  ADD PRIMARY KEY (`konyha_id`);

--
-- A tábla indexei `mertekegyseg`
--
ALTER TABLE `mertekegyseg`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `napszak`
--
ALTER TABLE `napszak`
  ADD PRIMARY KEY (`napszak_id`);

--
-- A tábla indexei `osszekoto`
--
ALTER TABLE `osszekoto`
  ADD KEY `hozzavalok_id` (`hozzavalok_id`,`receptek_id`),
  ADD KEY `receptek_id` (`receptek_id`),
  ADD KEY `ervenyes` (`ervenyes`),
  ADD KEY `mertekegyseg_id` (`mertekegyseg_id`),
  ADD KEY `preferencia_id` (`preferencia_id`),
  ADD KEY `etrend_id` (`etrend_id`);

--
-- A tábla indexei `preferencia`
--
ALTER TABLE `preferencia`
  ADD PRIMARY KEY (`etkezes_id`);

--
-- A tábla indexei `receptek`
--
ALTER TABLE `receptek`
  ADD PRIMARY KEY (`Receptek_id`),
  ADD KEY `konyha_oszekoto` (`konyha_oszekoto`,`napszak_oszekoto`),
  ADD KEY `napszak_oszekoto` (`napszak_oszekoto`);

--
-- A tábla indexei `regisztracio`
--
ALTER TABLE `regisztracio`
  ADD PRIMARY KEY (`Felhasznalo_id`),
  ADD KEY `sajatrecept` (`sajatrecept`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `erzekenysegek`
--
ALTER TABLE `erzekenysegek`
  MODIFY `erzekenyseg_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `hozzavalok`
--
ALTER TABLE `hozzavalok`
  MODIFY `Hozzavalok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT a táblához `konyha`
--
ALTER TABLE `konyha`
  MODIFY `konyha_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `mertekegyseg`
--
ALTER TABLE `mertekegyseg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT a táblához `napszak`
--
ALTER TABLE `napszak`
  MODIFY `napszak_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `preferencia`
--
ALTER TABLE `preferencia`
  MODIFY `etkezes_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT a táblához `receptek`
--
ALTER TABLE `receptek`
  MODIFY `Receptek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `receptek`
--
ALTER TABLE `receptek`
  ADD CONSTRAINT `receptek_ibfk_1` FOREIGN KEY (`napszak_oszekoto`) REFERENCES `napszak` (`napszak_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `receptek_ibfk_2` FOREIGN KEY (`konyha_oszekoto`) REFERENCES `konyha` (`konyha_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
