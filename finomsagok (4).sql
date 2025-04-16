-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Apr 16, 2025 at 08:55 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `finomsagok`
--
CREATE DATABASE IF NOT EXISTS `finomsagok` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `finomsagok`;

-- --------------------------------------------------------

--
-- Table structure for table `erzekenysegek`
--

CREATE TABLE `erzekenysegek` (
  `erzekenyseg` varchar(30) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `erzekenyseg_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `erzekenysegek`
--

INSERT INTO `erzekenysegek` (`erzekenyseg`, `erzekenyseg_id`) VALUES
('nincs', 0),
('laktózérzékeny', 1),
('gluténérzékeny', 2);

-- --------------------------------------------------------

--
-- Table structure for table `feltoltott_recept`
--

CREATE TABLE `feltoltott_recept` (
  `profil_id` int(11) NOT NULL,
  `feltoltott_recept_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hozzavalok`
--

CREATE TABLE `hozzavalok` (
  `hozzavalok_neve` varchar(30) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Hozzavalok_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `hozzavalok`
--

INSERT INTO `hozzavalok` (`hozzavalok_neve`, `Hozzavalok_id`) VALUES
('só', 161),
('cukor', 162),
('tojás', 163),
('liszt', 164),
('tej', 165),
('vaj', 166),
('burgonya', 167),
('hagyma', 168),
('fokhagyma', 169),
('paradicsom', 170),
('paprika', 171),
('tészta', 172),
('szalonna', 173),
('csirkehús', 174),
('marhahús', 175),
('sertéshús', 176),
('túrós tészta', 177),
('kefir', 178),
('tejföl', 179),
('kolbász', 180),
('gulyás', 181),
('hal', 182),
('fehérbor', 183),
('pörkölt', 184),
('zöldség', 185),
('fűszeres olaj', 186),
('dió', 187),
('mák', 188),
('szilva', 189),
('alma', 190),
('barack', 191),
('cseresznye', 192),
('ribizli', 193),
('áfonya', 194),
('körte', 195),
('gyömbér', 196),
('mustár', 197),
('sütőpor', 198),
('fűszerkeverék', 199),
('szegfűszeg', 200),
('bors', 201),
('pipereszó', 202),
('oregánó', 203),
('bazsalikom', 204),
('rozmaring', 205),
('tárkony', 206),
('majoránna', 207),
('levendula', 208),
('borsikafű', 209),
('paprikakrém', 210),
('töltött káposzta', 211),
('levesbetét', 212),
('tök', 213),
('káposzta', 214),
('spenót', 215),
('zöldborsó', 216),
('kukorica', 217),
('készleves', 218),
('sárgarépa', 219),
('zeller', 220),
('petrezselyem', 221),
('koriander', 222),
('lencse', 223),
('bab', 224),
('mákos tészta', 225),
('fűszerpaprika', 226),
('méz', 227),
('sör', 228),
('pálinka', 229),
('vörösbor', 230),
('fehérbor', 231),
('szódavíz', 232),
('túró', 233),
('gyümölcsleves', 234),
('gyümölcs kompót', 235),
('krumpli', 236),
('pulykahús', 237),
('bacon', 238),
('túró rudi', 239),
('szilvalekvár', 240),
('almalekvár', 241),
('tökfőzelék', 242),
('rakott krumpli', 243),
('tojásos nokedli', 244),
('kakasleves', 245),
('sertéspörkölt', 246),
('túrós lepény', 247),
('tojásfehérje', 248),
('tárkonyos csirke', 249),
('sajt', 250),
('fűszeres túró', 251),
('rakott káposzta', 252),
('mézes sütemény', 253),
('almás pite', 254),
('túróscsusza', 255),
('meggyleves', 256),
('csirkecomb', 257),
('gulyásleves', 258),
('rántott hús', 259),
('képviselőfánk', 260),
('szilvás gombóc', 261),
('túrós tészta', 262),
('krémleves', 263),
('főzelék', 264),
('raguleves', 265),
('halászlé', 266),
('tejszín', 267),
('túrófélék', 268),
('grillázs', 269),
('marcipán', 270),
('borókabogyó', 271),
('pászka', 272),
('ropogós keksz', 273),
('cikória', 274),
('zabpehely', 275),
('zabkása', 276),
('joghurt', 277),
('csokoládé', 278),
('főtt tojás', 279),
('parmezán', 280),
('gránátalma', 281),
('áfonyalekvár', 282),
('rózsabors', 283),
('fahéj', 284),
('szegfűbors', 285),
('dióolaj', 286),
('olívaolaj', 287),
('földimogyoró', 288),
('mandula', 289),
('kesudió', 290),
('pisztácia', 291),
('friss fűszernövények', 292),
('fűszerolaj', 293),
('gomba', 294),
('körtelekvár', 295),
('baracklekvár', 296),
('meggylekvár', 297),
('piros borsó', 298),
('babérlevél', 299),
('sózott hal', 300),
('tárkonyos ecet', 301),
('fűszeres sajt', 302),
('retek', 303),
('tökfélék', 304),
('paradicsomszósz', 305),
('ketchup', 306),
('mustárkrém', 307),
('chili', 308),
('sárgarépás pástétom', 309),
('vöröslencse', 310),
('zöld lencse', 311),
('fekete bab', 312),
('fehér bab', 313),
('görögdinnye', 314),
('sárgadinnye', 315),
('mangoszósz', 316),
('fehér répa', 317),
('zöldségleves', 318),
('paradicsomsűrítmény', 319),
('krémes mártás', 320),
('csicseriborsó', 321),
('tejeskávé', 322),
('jégkrém', 323),
('fagyasztott zöldség', 324),
('szárított gomba', 325),
('gyümölcs szósz', 326),
('töltött káposzta leve', 327),
('töltött paprika', 328),
('túrós pogácsa', 329),
('kakaó', 330),
('joghurtos ital', 331),
('sajttorta', 332),
('tejberizs', 333),
('darált hús', 334),
('kókuszreszelék', 335),
('kókuszolaj', 336),
('friss bazsalikom', 337),
('szeletelt pulyka', 338),
('gombás szósz', 339),
('kókusztej', 340),
('fűszerpaprikás pörkölt', 341),
('zabkeksz', 342),
('kávé', 343),
('tejcsokoládé', 344),
('fekete csokoládé', 345),
('fehér csokoládé', 346),
('édesburgonya', 347),
('pohárkrém', 348),
('meggyszemek', 349),
('kefírsajt', 350),
('túrós batyu', 351),
('házi lekvár', 352),
('rántott gomba', 353),
('sült zöldség', 354),
('püré', 355),
('hagymás mártás', 356),
('szilvás sütemény', 357),
('banános sütemény', 358),
('zsemlemorzsa', 359),
('halkrém', 360),
('brokkoli', 361),
('sült csirke', 362),
('rakott hús', 363),
('friss paradicsom', 364),
('vörösáfonya', 365),
('borjúhús', 366),
('kekszes sütemény', 367),
('burgonyapüré', 368),
('fokhagymás krumpli', 369),
('csiperkegomba', 370),
('medvehagyma', 371),
('friss sajt', 372),
('bélszín', 373),
('bárányhús', 374),
('csirke pörkölt', 375),
('fűszeres fűszernövény', 376),
('paradicsom püré', 377),
('csokis sütemény', 378),
('gránátalmás saláta', 379),
('gulyáskrém', 380),
('hűtött levesek', 381),
('vöröshagyma', 382),
('citrusfélék', 383),
('narancslekvár', 384),
('burgonyasaláta', 385),
('spárga', 386),
('rántott csirke', 387),
('szarvasgomba', 388),
('csicseriborsó leves', 389),
('sült hal', 390),
('tökpüré', 391),
('töltött paradicsom', 392),
('gyümölcs jégkrém', 393),
('hófehér zabpehely', 394),
('narancsos sütemény', 395),
('házi kenyer', 396),
('pesto', 397),
('savanyúság', 398),
('savanyított káposzta', 399),
('töltött palacsinta', 400),
('kókuszgolyó', 401),
('almás sütemény', 402),
('egres', 403),
('burgonyafánk', 404),
('tejszínkrém', 405),
('barackos pite', 406),
('tartármártás', 407),
('zöldbableves', 408),
('kalács', 409),
('szilvás pite', 410),
('tejfölös túrós lepény', 411),
('tejes kávé', 412),
('mákos guba', 413),
('habcsók', 414),
('bárány pörkölt', 415),
('grillezett zöldségek', 416),
('pirospaprika', 417),
('víz', 418),
('finomliszt', 419),
('kenyér', 420),
('zabtej', 421),
('mandulatej', 422),
('fokhagymapor', 423),
('friss tészta', 424),
('pirított hagyma', 425),
('kisebb fej karfiol', 426),
('nagyobb fej karfiol', 427),
('karfiol', 428),
('friss gyömbér', 429),
('kurkuma', 430),
('őrölt koriander', 431),
('friss koriander', 432),
('római kömény', 433),
('őrölt kömény', 434),
('paradicsompüré', 435),
('chili por', 436),
('makaróni tészta', 437),
('cheddar sajt', 438),
('reszelt cheddar sajt', 439),
('fokhagyma por', 440),
('bébispenót', 441),
('friss bébispenót', 442),
('ghee', 443),
('zöld chili', 444),
('garam masala', 445),
('rizs', 446),
('barna rizs', 447),
('paneer sajt', 448),
('szárított élesztő', 449),
('langyos tej', 450),
('tojássárgája', 451),
('vaníliakivonat', 452),
('étkezési keményítő', 453),
('fehér káposzta', 454),
('főtt rizs', 455),
('kömény', 456),
('sűrített paradicsom', 457),
('füstölt paprika', 458),
('juharszirup', 459),
('almaecet', 460),
('hamburgerzsemle', 461),
('avokádókrém', 462),
('avokádó', 463),
('uborka', 464),
('lilahagyma', 465),
('kukoricatortilla', 466),
('jalapeño paprika', 467),
('mozzarella sajt', 468),
('guacamole', 469),
('durum', 470),
('padlizsán', 471),
('cukkini', 472),
('besan', 473),
('reszelt répa', 474),
('répa', 475),
('őrölt kurkuma', 476),
('olaj', 477),
('reszelt trappista sajt', 478),
('tortilla lap', 479),
('kaliforniai paprika', 480),
('friss mozzarella sajt', 481),
('bazsalikom levelek', 482),
('extra szűz olívaolaj', 483),
('balzsamecet', 484),
('őrölt fekete bors', 485),
(' teljes kiőrlésű kenyér', 486),
('chili pelyhes', 487),
('paneer', 488),
('őrölt chili', 489),
('ghí', 490),
('chapati', 491),
('sonka', 492),
('karika paprika', 493),
('aprított hagyma', 494);

-- --------------------------------------------------------

--
-- Table structure for table `konyha`
--

CREATE TABLE `konyha` (
  `nemzetiseg` varchar(30) NOT NULL,
  `konyha_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `konyha`
--

INSERT INTO `konyha` (`nemzetiseg`, `konyha_id`) VALUES
('magyar', 1),
('indiai', 2),
('amerikai', 3),
('mexikói', 4),
('olasz', 5);

-- --------------------------------------------------------

--
-- Table structure for table `mertekegyseg`
--

CREATE TABLE `mertekegyseg` (
  `mennyiseg` int(20) NOT NULL,
  `mertekegyseg` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Mertekegyseg_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `mertekegyseg`
--

INSERT INTO `mertekegyseg` (`mennyiseg`, `mertekegyseg`, `Mertekegyseg_id`) VALUES
(50, 'dkg', 149),
(3, 'db', 150),
(3, 'db', 151),
(1, 'db', 152),
(1, 'kávéskanál', 153),
(5, 'dl', 154),
(1, 'csipet', 155),
(1, 'csipet', 156),
(1, 'gerezd', 157),
(50, 'dkg', 158),
(1, 'db', 159),
(4, 'dl', 160),
(1, 'teáskanál', 161),
(100, 'g', 162),
(150, 'g', 163),
(1, 'evőkanál', 164),
(1, 'evőkanál', 165),
(1, 'csipet', 166),
(1, 'csipet', 167),
(1, 'evőkanál', 168),
(2, 'db', 169),
(1, 'db', 170),
(1, 'evőkanál', 171),
(1, 'fej', 172),
(2, 'gerezd', 173),
(1, 'cm', 174),
(1, 'teáskanál', 175),
(1, 'teáskanál', 176),
(1, 'teáskanál', 177),
(2, 'teáskanál', 178),
(1, 'csésze', 179),
(100, 'g', 180),
(2, 'csésze', 181),
(1, 'csésze', 182),
(1, 'evőkanál', 183),
(2, 'teáskanál', 184),
(2, 'csipet', 185),
(1, 'csipet', 186),
(1, 'evőkanál', 187),
(2, 'csésze', 188),
(100, 'g', 211),
(70, 'g', 212),
(1, 'evőkanál', 213),
(2, 'fej', 214),
(1, 'gerezd', 215),
(1, 'teáskanál', 216),
(2, 'db', 217),
(3, 'teáskanál', 218),
(2, 'teáskanál', 219),
(2, 'csipet', 220),
(2, 'evőkanál', 221),
(60, 'g', 222),
(150, 'ml', 223),
(60, 'g', 224),
(10, 'g', 225),
(1, 'g', 226),
(1, 'csipet', 227),
(20, 'g', 228),
(30, 'ml', 229),
(1, 'db', 230),
(50, 'ml', 231),
(1, 'teáskanál', 232),
(3, 'teáskanál', 233),
(1, 'fej', 234),
(1, 'evőkanál', 235),
(1, 'csésze', 236),
(1, 'db', 237),
(2, 'evőkanál', 238),
(2, 'evőkanál', 239),
(1, 'teáskanál', 240),
(2, 'csipet', 241),
(1, 'csipet', 242),
(1, 'teáskanál', 243),
(100, 'g', 244),
(1, 'evőkanál', 245),
(1, 'evőkanál', 246),
(1, 'kiskanál', 247),
(2, 'kiskanál', 248),
(1, 'kiskanál', 249),
(2, 'evőkanál', 250),
(2, 'teáskanál', 251),
(1, 'teáskanál', 252),
(3, 'teáskanál', 253),
(1, 'db', 254),
(25, 'dkg', 255),
(2, 'db', 256),
(1, 'db', 257),
(1, 'db', 258),
(2, 'fej', 259),
(2, 'gerezd', 260),
(2, 'db', 261),
(1, 'evőkanál', 262),
(1, 'evőkanál', 263),
(1, 'csipet', 264),
(1, 'csipet', 265),
(2, 'db', 266),
(100, 'g', 267),
(1, 'db', 268),
(2, 'db', 269),
(1, 'db', 270),
(3, 'evőkanál', 271),
(1, 'gerezd', 272),
(1, 'evőkanál', 273),
(2, 'teáskanál', 274),
(2, 'csipet', 275),
(1, 'g', 276),
(40, 'g', 277),
(2, 'csésze', 278),
(2, 'fej', 279),
(1, 'evőkanál', 280),
(1, 'evőkanál', 281),
(2, 'teáskanál', 282),
(1, 'csipet', 283),
(2, 'csipet', 284),
(1, 'teáskanál', 285),
(2, 'db', 286),
(2, 'fej', 287),
(1, 'db', 288),
(2, 'evőkanál', 289),
(1, 'evőkanál', 290),
(1, 'csipet', 291),
(1, 'csipet', 292),
(1, 'evőkanál', 293),
(1, 'db', 294),
(2, 'db', 295),
(3, 'db', 296),
(2, 'db', 297),
(1, 'teáskanál', 298),
(2, 'csipet', 299),
(1, 'csipet', 300),
(1, 'db', 301),
(1, 'golyó', 302),
(1, 'g', 303),
(2, 'evőkanál', 304),
(1, 'teáskanál', 305),
(1, 'csipet', 306),
(2, 'csipet', 307),
(1, 'szelet', 308),
(1, 'db', 309),
(1, 'db', 310),
(2, 'csipet', 311),
(2, 'csipet', 312),
(2, 'teáskanál', 313),
(1, 'db', 314),
(1, 'evőkanál', 315),
(2, 'db', 316),
(1, 'db', 317),
(2, 'db', 318),
(1, 'db', 319),
(1, 'teáskanál', 320),
(2, 'csipet', 321),
(1, 'csipet', 322),
(1, 'db', 323),
(1, 'db', 324),
(100, 'g', 325),
(2, 'db', 326),
(3, 'db', 327),
(1, 'gerezd', 328),
(1, 'cm', 329),
(2, 'teáskanál', 330),
(2, 'teáskanál', 331),
(1, 'teáskanál', 332),
(1, 'db', 333),
(2, 'db', 334),
(3, 'szelet', 335),
(1, 'teáskanál', 336),
(1, 'szelet', 337),
(2, 'db', 338),
(1, 'evőkanál', 339),
(1, 'csipet', 340),
(2, 'csipet', 341);

-- --------------------------------------------------------

--
-- Table structure for table `napszak`
--

CREATE TABLE `napszak` (
  `idoszak` varchar(20) NOT NULL,
  `napszak_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `napszak`
--

INSERT INTO `napszak` (`idoszak`, `napszak_id`) VALUES
('reggeli', 1),
('ebéd', 2),
('vacsora', 3);

-- --------------------------------------------------------

--
-- Table structure for table `osszekoto`
--

CREATE TABLE `osszekoto` (
  `hozzavalok_id` int(11) DEFAULT NULL,
  `receptek_id` int(11) DEFAULT NULL,
  `etrend_id` int(10) DEFAULT NULL,
  `mertekegyseg_id` int(10) DEFAULT NULL,
  `preferencia_id` int(11) DEFAULT NULL,
  `ervenyes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `osszekoto`
--

INSERT INTO `osszekoto` (`hozzavalok_id`, `receptek_id`, `etrend_id`, `mertekegyseg_id`, `preferencia_id`, `ervenyes`) VALUES
(176, 45, 2, 149, 0, 0),
(382, 45, 2, 150, 0, 0),
(170, 45, 2, 151, 0, 0),
(171, 45, 2, 152, 0, 0),
(417, 45, 2, 153, 0, 0),
(418, 45, 2, 154, 0, 0),
(161, 45, 2, 155, 0, 0),
(201, 45, 2, 156, 0, 0),
(169, 45, 2, 157, 0, 0),
(419, 45, 2, 158, 0, 0),
(163, 45, 2, 159, 0, 0),
(418, 45, 2, 160, 0, 0),
(161, 45, 2, 161, 0, 0),
(233, 46, 1, 162, 1, 0),
(424, 46, 1, 163, 1, 0),
(166, 46, 1, 164, 1, 0),
(179, 46, 1, 165, 1, 0),
(161, 46, 1, 166, 1, 0),
(201, 46, 1, 167, 1, 0),
(425, 46, 1, 168, 1, 0),
(236, 47, 0, 169, 2, 0),
(426, 47, 0, 170, 2, 0),
(336, 47, 0, 171, 2, 0),
(168, 47, 0, 172, 2, 0),
(169, 47, 0, 173, 2, 0),
(429, 47, 0, 174, 2, 0),
(430, 47, 0, 175, 2, 0),
(431, 47, 0, 176, 2, 0),
(434, 47, 0, 177, 2, 0),
(436, 47, 0, 178, 2, 0),
(435, 47, 0, 179, 2, 0),
(437, 48, 1, 180, 4, 0),
(165, 48, 1, 181, 4, 0),
(439, 48, 1, 182, 4, 0),
(166, 48, 1, 183, 4, 0),
(440, 48, 1, 184, 4, 0),
(161, 48, 1, 185, 4, 0),
(201, 48, 1, 186, 4, 0),
(164, 48, 1, 187, 4, 0),
(418, 48, 1, 188, 4, 0),
(442, 68, 1, 211, 1, 0),
(448, 68, 1, 212, 1, 0),
(443, 68, 1, 213, 1, 0),
(382, 68, 1, 214, 1, 0),
(169, 68, 1, 215, 1, 0),
(196, 68, 1, 216, 1, 0),
(444, 68, 1, 217, 1, 0),
(445, 68, 1, 218, 1, 0),
(431, 68, 1, 219, 1, 0),
(161, 68, 1, 220, 1, 0),
(179, 68, 1, 221, 1, 0),
(447, 68, 1, 222, 1, 0),
(418, 68, 1, 223, 1, 0),
(419, 69, 1, 224, 0, 0),
(162, 69, 1, 225, 0, 0),
(449, 69, 1, 226, 0, 0),
(161, 69, 1, 227, 0, 0),
(166, 69, 1, 228, 0, 0),
(450, 69, 1, 229, 0, 0),
(451, 69, 1, 230, 0, 0),
(165, 69, 1, 231, 0, 0),
(453, 69, 1, 232, 0, 0),
(452, 69, 1, 233, 0, 0),
(454, 70, 2, 234, 3, 0),
(287, 70, 2, 235, 3, 0),
(455, 70, 2, 236, 3, 0),
(163, 70, 2, 237, 3, 0),
(233, 70, 2, 238, 3, 0),
(179, 70, 2, 239, 3, 0),
(417, 70, 2, 240, 3, 0),
(161, 70, 2, 241, 3, 0),
(201, 70, 2, 242, 3, 0),
(456, 70, 2, 243, 3, 0),
(311, 71, 2, 244, 2, 0),
(275, 71, 2, 245, 2, 0),
(457, 71, 2, 246, 2, 0),
(458, 71, 2, 247, 2, 0),
(423, 71, 2, 248, 2, 0),
(161, 71, 2, 249, 2, 0),
(287, 71, 2, 250, 2, 0),
(460, 71, 2, 251, 2, 0),
(459, 71, 2, 252, 2, 0),
(458, 71, 2, 253, 2, 0),
(461, 71, 2, 254, 2, 0),
(347, 71, 2, 255, 2, 0),
(163, 72, 1, 256, 4, 0),
(466, 72, 1, 257, 4, 0),
(170, 72, 1, 258, 4, 0),
(382, 72, 1, 259, 4, 0),
(169, 72, 1, 260, 4, 0),
(467, 72, 1, 261, 4, 0),
(439, 72, 1, 262, 4, 0),
(287, 72, 1, 263, 4, 0),
(161, 72, 1, 264, 4, 0),
(201, 72, 1, 265, 4, 0),
(463, 72, 1, 266, 4, 0),
(470, 73, 2, 267, 2, 0),
(471, 73, 2, 268, 2, 0),
(472, 73, 2, 269, 2, 0),
(170, 73, 2, 270, 2, 0),
(457, 73, 2, 271, 2, 0),
(169, 73, 2, 272, 2, 0),
(287, 73, 2, 273, 2, 0),
(203, 73, 2, 274, 2, 0),
(161, 73, 2, 275, 2, 0),
(204, 73, 2, 276, 2, 0),
(473, 74, 0, 277, 0, 0),
(418, 74, 0, 278, 0, 0),
(382, 74, 0, 279, 0, 0),
(474, 74, 0, 280, 0, 0),
(221, 74, 0, 281, 0, 0),
(476, 74, 0, 282, 0, 0),
(161, 74, 0, 283, 0, 0),
(201, 74, 0, 284, 0, 0),
(477, 74, 0, 285, 0, 0),
(167, 75, 1, 286, 4, 0),
(361, 75, 1, 287, 4, 0),
(163, 75, 1, 288, 4, 0),
(179, 75, 1, 289, 4, 0),
(478, 75, 1, 290, 4, 0),
(161, 75, 1, 291, 4, 0),
(201, 75, 1, 292, 4, 0),
(477, 75, 1, 293, 4, 0),
(479, 76, 2, 294, 4, 0),
(439, 76, 2, 295, 4, 0),
(465, 76, 2, 296, 4, 0),
(472, 76, 2, 297, 4, 0),
(287, 76, 2, 298, 4, 0),
(161, 76, 2, 299, 4, 0),
(201, 76, 2, 300, 4, 0),
(170, 77, 1, 301, 0, 0),
(481, 77, 1, 302, 0, 0),
(482, 77, 1, 303, 0, 0),
(483, 77, 1, 304, 0, 0),
(484, 77, 1, 305, 0, 0),
(161, 77, 1, 306, 0, 0),
(485, 77, 1, 307, 0, 0),
(486, 78, 2, 308, 3, 0),
(463, 78, 2, 309, 3, 0),
(163, 78, 2, 310, 3, 0),
(161, 78, 2, 311, 3, 0),
(201, 78, 2, 312, 3, 0),
(487, 78, 2, 313, 3, 0),
(204, 78, 2, 314, 3, 0),
(287, 78, 2, 315, 3, 0),
(163, 79, 2, 316, 0, 0),
(170, 79, 2, 317, 0, 0),
(382, 79, 2, 318, 0, 0),
(467, 79, 2, 319, 0, 0),
(287, 79, 2, 320, 0, 0),
(161, 79, 2, 321, 0, 0),
(201, 79, 2, 322, 0, 0),
(466, 79, 2, 323, 0, 0),
(463, 79, 2, 324, 0, 0),
(488, 80, 1, 325, 1, 0),
(170, 80, 1, 326, 1, 0),
(382, 80, 1, 327, 1, 0),
(169, 80, 1, 328, 1, 0),
(196, 80, 1, 329, 1, 0),
(445, 80, 1, 330, 1, 0),
(489, 80, 1, 331, 1, 0),
(490, 80, 1, 332, 1, 0),
(491, 80, 1, 333, 1, 0),
(163, 81, 2, 334, 0, 0),
(492, 81, 2, 335, 0, 0),
(477, 81, 2, 336, 0, 0),
(420, 81, 2, 337, 0, 0),
(493, 81, 2, 338, 0, 0),
(494, 81, 2, 339, 0, 0),
(161, 81, 2, 340, 0, 0),
(201, 81, 2, 341, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `preferencia`
--

CREATE TABLE `preferencia` (
  `etkezes` varchar(30) NOT NULL,
  `etkezes_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `preferencia`
--

INSERT INTO `preferencia` (`etkezes`, `etkezes_id`) VALUES
('nincs', 0),
('laktó-vegetáriánus', 1),
('vegán', 2),
('ovo-vegetáriánus', 3),
('lakto-ovo-vegetáriánus', 4);

-- --------------------------------------------------------

--
-- Table structure for table `receptek`
--

CREATE TABLE `receptek` (
  `keszites` text CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Receptek_id` int(11) NOT NULL,
  `receptek_neve` varchar(100) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `kep` varchar(50) DEFAULT NULL,
  `konyha_osszekoto` int(10) NOT NULL,
  `napszak_osszekoto` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `receptek`
--

INSERT INTO `receptek` (`keszites`, `Receptek_id`, `receptek_neve`, `kep`, `konyha_osszekoto`, `napszak_osszekoto`) VALUES
('Pörkölt készítése\r\nElőkészítés: A húst apró kockákra vágjuk. A paradicsomnak lehúzzuk a héját, és felkockázzuk. A hagymákat és a paprikát szintén apróra vágjuk.\r\nA hagymát üvegesre pároljuk kevés olajon, majd hozzáadjuk a fűszerpaprikát.\r\nA kockákra vágott sertéshúst a hagymához adjuk, és addig pirítjuk, amíg kissé megpirul.\r\nA felkockázott paprikát és paradicsomot hozzáadjuk, összekeverjük.\r\nFelöntjük annyi vízzel, hogy ellepje a húst, majd ízlés szerint fűszerezzük.\r\nLassú tűzön főzöm, időnként megkeverjük. Amikor besűrűsödik a szaft (kb 1 óra) elkészült a pörkölt.\r\nNokedli készítése\r\nA nokedli tésztájához összekeverjük a lisztet, tojást, vizet és sót egy tálban, hogy sűrű, ragacsos tésztát kapjak.\r\nForrásban lévő vízbe szaggatjuk a tésztát egy nokedli szaggatóval, majd amint feljönnek a víz tetejére leszűrjük.', 45, 'Sertéspörkölt nokedlivel', '1742293089622-223025598.jpg', 1, 2),
('Főzd meg a tésztát sós vízben, majd szűrd le.\r\nEgy serpenyőben olvaszd fel a vajat, és pirítsd meg a hagymát (ha használod).\r\nA leszűrt tésztát keverd össze a túróval, a pirított hagymával és a tejföllel.\r\nSóval, borssal ízesítsd.', 46, ' Túrós Csusza', '1742893134573-52071968.jpg', 1, 1),
('Zöldségek előkészítése: A krumplit és karfiolt apróra vágd fel.\r\nFűszeres alap elkészítése: Egy serpenyőben hevítsd az olajat. Add hozzá a hagymát és pirítsd 5 percig.\r\nFokhagyma és gyömbér: Add hozzá a fokhagymát és gyömbért, pirítsd tovább 2-3 percig.\r\nFűszerek: Keverd hozzá a kurkumát, koriandert, köményt, és chili port. Pirítsd 1 percig.\r\nZöldségek hozzáadása: Add hozzá a felkockázott krumplit és karfiolt, és keverd össze. Öntsd hozzá a paradicsompürét és főzd 15-20 percig, amíg a zöldségek megpuhulnak.', 47, 'Aloo Gobi', '1742894191050-423696743.jpg', 2, 3),
('Tészta főzése: Főzd meg a makarónit sós vízben a csomagolás utasítása szerint.\r\nSzósz készítése: Egy serpenyőben melegítsd fel a vajat, majd add hozzá a lisztet, és kevergetve pirítsd 1-2 percig. Lassan öntsd hozzá a tejet, folyamatos keverés mellett, hogy sima szószt kapj. Főzd 5 percig, amíg besűrűsödik.\r\nSajt hozzáadása: Add hozzá a reszelt sajtot, fokhagyma port, sót és borsot, és keverd, amíg a sajt teljesen felolvad.\r\nTészta összeállítása: A megfőtt makarónit keverd össze a sajtszósszal, és ha szükséges, egy kis vízzel hígíthatod a szószt.', 48, ' Mac and Cheese', '1742894613915-253614925.jpg', 3, 2),
('Rizs: A barna rizst először alaposan mosd meg, majd főzd puhára kb. 30–40 perc alatt enyhén sós vízben.\r\nA spenótot blansírozd (forró vízbe pár percre, majd jeges vízbe). Turmixold pürévé.\r\nGhee-ben/vajban pirítsd meg a hagymát, gyömbért, fokhagymát és chilit.\r\nAdd hozzá a fűszereket, majd a spenótpürét. Forrald pár percig.\r\nPaneer: Kockázd fel a paneert, enyhén pirítsd meg serpenyőben, majd add a curryhez.\r\nKeverj bele egy kis tejfölt vagy tejszínt a krémesebb állagért.', 68, 'Palak paneer barna rizzsel', '1744711819574-615427075.jpg', 2, 3),
('Keverd össze a tészta alapanyagait, dagaszd ki, és keleszd 1 órát.\r\nNyújtsd ki háromszög alakokra, töltsd meg a vaníliakrémmel (amit előzőleg felfőzöl, majd kihűtöd).\r\nTekerd fel croissant formába, majd süsd 180°C-on kb. 15–20 percig', 69, 'Cornetto', '1744712515681-85171274.jpg', 5, 1),
('A káposztát leveleire szedjük, a vastag eret eltávolítjuk. A leveleket röviden forrázzuk le forró vízben, hogy könnyebben hajtogathatók legyenek. Egy-két perc elég is hozzá. Ha a levelek nagyok, félbevágjuk őket.\r\nA rizst előzőleg megfőzzük (kb. 1/2 csésze száraz rizsből) és félretesszük.\r\nA túrót, a tojást, a tejfölt, a főtt rizst, a pirospaprikát, sót, borsot és a köményt egy tálban összekeverjük. A keveréknek krémes állagúnak kell lennie.\r\nEgy kisebb sütőedényt vékonyan kikenünk olajjal. A káposztaleveleket felváltva rakjuk az aljára, majd egy réteg tölteléket kenünk rá. Ezt ismételjük addig, amíg minden káposztalevél és töltelék el nem fogy.\r\nA rakott káposztát előmelegített 180 °C-os sütőben 25-30 percig sütjük, amíg a teteje szép aranybarna nem lesz.', 70, 'Rakott káposzta', '1744716162809-345712028.jpg', 1, 2),
('A lencsét törd össze villával vagy turmixold durvára, majd keverd össze a zabpehellyel, paradicsommal és fűszerekkel. Formázz belőle pogácsát, és süsd meg közepes lángon olajon kb. 3-4 percig oldalanként.\r\nKeverd össze a hozzávalókat egy kis tálban.\r\nAz édesburgonyát forgasd össze olajjal, fűszerekkel, és süsd sütőben 200°C-on kb. 20-25 percig, amíg ropogós.\r\nPirítsd meg a zsemlét, kend meg BBQ szósszal, tedd rá a pogácsát, zöldségeket, krémet. Tálald a hasábokkal.', 71, 'BBQ lencsés hamburger édesburgonya hasábokkal', '1744742087405-912873316.png', 3, 2),
('Egy kis serpenyőben melegítsd az olajat, dinszteld meg a hagymát és fokhagymát, majd add hozzá a paradicsomot és a jalapeñót. Sózd, borsozd, főzd 5-6 percig, míg kissé sűrűsödik.\r\nEgy másik serpenyőben süsd meg a tojásokat tükörtojásként (vagy buggyantva is lehet).\r\nA tortillát száraz serpenyőben pirítsd meg, míg kissé ropogós lesz.\r\nTedd a tortillát a tányérra, kanalazd rá a szószt, tedd rá a tojásokat, szórd meg sajttal, korianderrel, és kínáld avokádóval vagy guacamoléval.', 72, 'Huevos rancheros', '1744742553993-793981659.jpg', 4, 1),
('Tésztát főzz sós vízben „al dente”-re, majd szűrd le.\r\nEgy serpenyőben melegítsd az olajat, dobd rá a fokhagymát, majd a padlizsánt és a cukkinit. Süsd kb. 8-10 percig, amíg szépen megpirulnak.\r\nAdd hozzá a paradicsomot és a sűrített paradicsomot, oregánót, sót, borsot. Főzd még 5 percig, hogy összeérjenek az ízek.\r\nA leszűrt tésztát forgasd bele a szószos zöldségekbe.\r\nSzórd meg friss bazsalikommal, esetleg táplálkozási élesztőpehellyel.', 73, 'Spagetti paradicsomos sült zöldséggel', '1744742965649-27941960.jpg', 5, 2),
('Keverd össze a lisztet, vizet, fűszereket és zöldségeket egy tálban, míg sima palacsintatésztát nem kapsz.\r\nForrósíts fel egy tapadásmentes serpenyőt, kend ki olajjal.\r\nÖntsd bele a tésztát, és lapítsd el palacsinta formára. Süsd 2-3 percig, majd fordítsd meg, és süsd a másik oldalát is aranybarnára.', 74, 'Masala chilla', '1744743485155-846386723.jpg', 2, 1),
('A burgonyát héjában megfőzöd, majd meghámozod és felkarikázod.\r\nA tojást keményre főzöd, lehűtöd, felkarikázod.\r\nA brokkolit enyhén sós vízben 2-3 percig blansírozod (vagy párolod).\r\nEgy kis tűzálló edényt kiolajozol/vajazol, majd rétegezed:\r\nburgonya – brokkoli – tojás – tejföl – és így tovább, a tetejére sajt kerüljön.\r\n180°C-on sütöd kb. 15-20 percig, amíg a sajt megpirul.', 75, 'Rakott brokkolis krumpli tejföllel és tojással', '1744743804275-230758102.jpg', 1, 3),
('Egy serpenyőben kevés olajon megpirítod a zöldségeket 5-7 perc alatt, amíg megpuhulnak és enyhén karamellizálódnak.\r\nA tortilla egyik felére szórsz sajtot, ráteszed a zöldségeket, majd újra sajtot – és félbehajtod.\r\nUgyanabban a serpenyőben mindkét oldalát megsütöd közepes lángon, míg a sajt megolvad, és a tortilla aranybarna lesz.\r\nFelszeleteled, és tálalhatod tejföllel vagy salsával.', 76, ' Quesadilla grillezett zöldségekkel és sajttal', '1744744183334-508500025.jpg', 3, 3),
('A paradicsomot és a mozzarella sajtot szeleteld fel.\r\nEgy tányérra rendezd el a paradicsom és mozzarella szeleteket váltakozva, közben egy-egy bazsalikom levelet is tegyél közéjük.\r\nLocsold meg az olívaolajjal és (ha szeretnéd) egy kevés balzsamecettel.\r\nÍzesítsd sóval és frissen őrölt fekete borssal.\r\nTálald friss, ropogós kenyérrel, ha szeretnéd.', 77, 'Caprese saláta', '1744744647306-268563985.jpg', 5, 3),
('Pirítsd meg a kenyérszeletet egy serpenyőben vagy kenyérpirítóban.\r\nMiközben a kenyér pirul, vágd fel az avokádót, távolítsd el a magját, és kanalazd ki a húsát. Egy villával törd össze, és ízesítsd sóval, borssal, valamint chili pelyhekkel, ha szeretnéd.\r\nEgy serpenyőben, kevés olívaolajon vagy vajon süss egy tojást (tükörtojás vagy buggyantott tojás is lehet, ahogy szereted).\r\nHa kész a pirítós, kend meg az avokádó péppel.\r\nTedd rá a sült tojást, és díszítsd friss petrezselyemmel vagy bazsalikommal.\r\nTálald frissen, egy pohár friss narancslével, ha szeretnéd.', 78, 'Avokádós tojásos pirítós', '1744745028949-567078154.jpg', 3, 1),
('Egy serpenyőben hevítsd fel az olívaolajat.\r\nDobd rá a hagymát, dinszteld, majd add hozzá a paradicsomot és a jalapeñót.\r\nMikor kicsit megpuhultak, üsd rá a tojásokat, sózd-borsozd, és keverd össze rántottaszerűen.\r\nPirítsd meg a tortillát egy másik serpenyőben, vagy melegítsd mikrohullámú sütőben.\r\nTálald a tojásos keveréket a tortillán, díszítsd friss korianderrel, reszelt sajttal vagy szeletelt avokádóval.', 79, 'Mexikói tojásos tortilla', '1744779874093-46305055.jpg', 4, 1),
('Egy serpenyőben melegítsd fel a ghít vagy olajat.\r\nPirítsd meg a hagymát, majd add hozzá a fokhagymát és gyömbért.\r\nDobd bele a paradicsomot, majd fűszerezd (kurkuma, garam masala, chili, só).\r\nFőzd, míg a paradicsom szétfő, és sűrű szósz állagú lesz.\r\nAdd hozzá a lereszelt paneert, keverd össze, és főzd 2-3 percig.\r\nTálald friss korianderrel, chapatival vagy egy adag főtt rizzsel.', 80, 'Paneer Bhurji', '1744780281095-359822032.jpg', 2, 2),
('Serpenyőben melegítsd fel az olajat vagy vajat.\r\nDobd rá a felcsíkozott sonkát, pirítsd meg egy kicsit.\r\nHa teszel bele hagymát/paprikát, dobd rá azt is, dinszteld meg.\r\nÜsd rá a tojásokat, sózd, borsozd, majd keverd, míg jól átsül.\r\nFriss kenyérrel, zöldségekkel tálald.', 81, 'Ham and eggs', '1744780612778-2845686.jpg', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `regisztracio`
--

CREATE TABLE `regisztracio` (
  `admin` int(1) NOT NULL,
  `felhasznalo_id` int(11) NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `jelszo` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `felhasznalonev` varchar(30) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `szabalyzat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `regisztracio`
--

INSERT INTO `regisztracio` (`admin`, `felhasznalo_id`, `email`, `jelszo`, `felhasznalonev`, `szabalyzat`) VALUES
(1, 1, 'horvath0akos@gmail.com', '$2b$10$UADHvTcUBgNN57Z5yDUEm.2fDLULGJsxALCMK4KMAVDvVG.oRdMBW', 'Akos', 1),
(0, 2, 'ricsi0varju@gmail.com', '$2b$10$O1DJeZ2r4AxHE7jgUfj6yucmJmzevKG1bpaUEb.YNLG7LYkUwhKjC', 'Ricskó kapitány', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sajat_receptek`
--

CREATE TABLE `sajat_receptek` (
  `recept` int(10) NOT NULL,
  `profil` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sajat_receptek`
--

INSERT INTO `sajat_receptek` (`recept`, `profil`) VALUES
(45, 2),
(48, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `erzekenysegek`
--
ALTER TABLE `erzekenysegek`
  ADD PRIMARY KEY (`erzekenyseg_id`);

--
-- Indexes for table `feltoltott_recept`
--
ALTER TABLE `feltoltott_recept`
  ADD KEY `feltoltot_recept_id` (`feltoltott_recept_id`),
  ADD KEY `profil_id` (`profil_id`);

--
-- Indexes for table `hozzavalok`
--
ALTER TABLE `hozzavalok`
  ADD PRIMARY KEY (`Hozzavalok_id`);

--
-- Indexes for table `konyha`
--
ALTER TABLE `konyha`
  ADD PRIMARY KEY (`konyha_id`);

--
-- Indexes for table `mertekegyseg`
--
ALTER TABLE `mertekegyseg`
  ADD PRIMARY KEY (`Mertekegyseg_id`);

--
-- Indexes for table `napszak`
--
ALTER TABLE `napszak`
  ADD PRIMARY KEY (`napszak_id`);

--
-- Indexes for table `osszekoto`
--
ALTER TABLE `osszekoto`
  ADD KEY `hozzavalok_id` (`hozzavalok_id`,`receptek_id`),
  ADD KEY `receptek_id` (`receptek_id`),
  ADD KEY `mertekegyseg_id` (`mertekegyseg_id`),
  ADD KEY `preferencia_id` (`preferencia_id`),
  ADD KEY `etrend_id` (`etrend_id`);

--
-- Indexes for table `preferencia`
--
ALTER TABLE `preferencia`
  ADD PRIMARY KEY (`etkezes_id`);

--
-- Indexes for table `receptek`
--
ALTER TABLE `receptek`
  ADD PRIMARY KEY (`Receptek_id`),
  ADD KEY `konyha_oszekoto` (`konyha_osszekoto`,`napszak_osszekoto`),
  ADD KEY `napszak_oszekoto` (`napszak_osszekoto`);

--
-- Indexes for table `regisztracio`
--
ALTER TABLE `regisztracio`
  ADD PRIMARY KEY (`felhasznalo_id`),
  ADD UNIQUE KEY `Email` (`email`,`felhasznalonev`);

--
-- Indexes for table `sajat_receptek`
--
ALTER TABLE `sajat_receptek`
  ADD KEY `Recept` (`recept`,`profil`),
  ADD KEY `Profil` (`profil`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `erzekenysegek`
--
ALTER TABLE `erzekenysegek`
  MODIFY `erzekenyseg_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `hozzavalok`
--
ALTER TABLE `hozzavalok`
  MODIFY `Hozzavalok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=495;

--
-- AUTO_INCREMENT for table `konyha`
--
ALTER TABLE `konyha`
  MODIFY `konyha_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `mertekegyseg`
--
ALTER TABLE `mertekegyseg`
  MODIFY `Mertekegyseg_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=342;

--
-- AUTO_INCREMENT for table `napszak`
--
ALTER TABLE `napszak`
  MODIFY `napszak_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `receptek`
--
ALTER TABLE `receptek`
  MODIFY `Receptek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `regisztracio`
--
ALTER TABLE `regisztracio`
  MODIFY `felhasznalo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feltoltott_recept`
--
ALTER TABLE `feltoltott_recept`
  ADD CONSTRAINT `feltoltott_recept_ibfk_1` FOREIGN KEY (`feltoltott_recept_id`) REFERENCES `receptek` (`Receptek_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `feltoltott_recept_ibfk_2` FOREIGN KEY (`profil_id`) REFERENCES `regisztracio` (`felhasznalo_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `osszekoto`
--
ALTER TABLE `osszekoto`
  ADD CONSTRAINT `osszekoto_ibfk_1` FOREIGN KEY (`preferencia_id`) REFERENCES `preferencia` (`etkezes_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `osszekoto_ibfk_3` FOREIGN KEY (`hozzavalok_id`) REFERENCES `hozzavalok` (`Hozzavalok_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `osszekoto_ibfk_5` FOREIGN KEY (`etrend_id`) REFERENCES `erzekenysegek` (`erzekenyseg_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `osszekoto_ibfk_6` FOREIGN KEY (`receptek_id`) REFERENCES `receptek` (`Receptek_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `osszekoto_ibfk_7` FOREIGN KEY (`mertekegyseg_id`) REFERENCES `mertekegyseg` (`Mertekegyseg_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `receptek`
--
ALTER TABLE `receptek`
  ADD CONSTRAINT `receptek_ibfk_1` FOREIGN KEY (`napszak_osszekoto`) REFERENCES `napszak` (`napszak_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `receptek_ibfk_2` FOREIGN KEY (`konyha_osszekoto`) REFERENCES `konyha` (`konyha_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sajat_receptek`
--
ALTER TABLE `sajat_receptek`
  ADD CONSTRAINT `sajat_receptek_ibfk_1` FOREIGN KEY (`recept`) REFERENCES `receptek` (`Receptek_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sajat_receptek_ibfk_2` FOREIGN KEY (`profil`) REFERENCES `regisztracio` (`felhasznalo_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
