-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2025. Már 25. 10:24
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

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
  `Hozzavalok_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `hozzavalok`
--

INSERT INTO `hozzavalok` (`Hozzavalok_neve`, `Hozzavalok_id`) VALUES
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
('fokhagyma por', 440);

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
(50, 'dkg', 149, NULL),
(3, 'db', 150, NULL),
(3, 'db', 151, NULL),
(1, 'db', 152, NULL),
(1, 'kávéskanál', 153, NULL),
(5, 'dl', 154, NULL),
(1, 'csipet', 155, NULL),
(1, 'csipet', 156, NULL),
(1, 'gerezd', 157, NULL),
(50, 'dkg', 158, NULL),
(1, 'db', 159, NULL),
(4, 'dl', 160, NULL),
(1, 'teáskanál', 161, NULL),
(100, 'g', 162, NULL),
(150, 'g', 163, NULL),
(1, 'evőkanál', 164, NULL),
(1, 'evőkanál', 165, NULL),
(1, 'csipet', 166, NULL),
(1, 'csipet', 167, NULL),
(1, 'evőkanál', 168, NULL),
(2, 'db', 169, NULL),
(1, 'db', 170, NULL),
(1, 'evőkanál', 171, NULL),
(1, 'fej', 172, NULL),
(2, 'gerezd', 173, NULL),
(1, 'cm', 174, NULL),
(1, 'teáskanál', 175, NULL),
(1, 'teáskanál', 176, NULL),
(1, 'teáskanál', 177, NULL),
(2, 'teáskanál', 178, NULL),
(1, 'csésze', 179, NULL),
(100, 'g', 180, NULL),
(2, 'csésze', 181, NULL),
(1, 'csésze', 182, NULL),
(1, 'evőkanál', 183, NULL),
(2, 'teáskanál', 184, NULL),
(2, 'csipet', 185, NULL),
(1, 'csipet', 186, NULL),
(1, 'evőkanál', 187, NULL),
(2, 'csésze', 188, NULL);

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
  `hozzavalok_id` int(11) DEFAULT NULL,
  `receptek_id` int(11) DEFAULT NULL,
  `etrend_id` int(10) DEFAULT NULL,
  `mertekegyseg_id` int(10) DEFAULT NULL,
  `preferencia_id` int(11) DEFAULT NULL,
  `ervenyes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `osszekoto`
--

INSERT INTO `osszekoto` (`hozzavalok_id`, `receptek_id`, `etrend_id`, `mertekegyseg_id`, `preferencia_id`, `ervenyes`) VALUES
(176, 45, 2, 149, 0, 1),
(382, 45, 2, 150, 0, 1),
(170, 45, 2, 151, 0, 1),
(171, 45, 2, 152, 0, 1),
(417, 45, 2, 153, 0, 1),
(418, 45, 2, 154, 0, 1),
(161, 45, 2, 155, 0, 1),
(201, 45, 2, 156, 0, 1),
(169, 45, 2, 157, 0, 1),
(419, 45, 2, 158, 0, 1),
(163, 45, 2, 159, 0, 1),
(418, 45, 2, 160, 0, 1),
(161, 45, 2, 161, 0, 1),
(233, 46, 1, 162, 1, 1),
(424, 46, 1, 163, 1, 1),
(166, 46, 1, 164, 1, 1),
(179, 46, 1, 165, 1, 1),
(161, 46, 1, 166, 1, 1),
(201, 46, 1, 167, 1, 1),
(425, 46, 1, 168, 1, 1),
(236, 47, 0, 169, 2, 1),
(426, 47, 0, 170, 2, 1),
(336, 47, 0, 171, 2, 1),
(168, 47, 0, 172, 2, 1),
(169, 47, 0, 173, 2, 1),
(429, 47, 0, 174, 2, 1),
(430, 47, 0, 175, 2, 1),
(431, 47, 0, 176, 2, 1),
(434, 47, 0, 177, 2, 1),
(436, 47, 0, 178, 2, 1),
(435, 47, 0, 179, 2, 1),
(437, 48, 1, 180, 4, 1),
(165, 48, 1, 181, 4, 1),
(439, 48, 1, 182, 4, 1),
(166, 48, 1, 183, 4, 1),
(440, 48, 1, 184, 4, 1),
(161, 48, 1, 185, 4, 1),
(201, 48, 1, 186, 4, 1),
(164, 48, 1, 187, 4, 1),
(418, 48, 1, 188, 4, 1);

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
('Pörkölt készítése\r\nElőkészítés: A húst apró kockákra vágjuk. A paradicsomnak lehúzzuk a héját, és felkockázzuk. A hagymákat és a paprikát szintén apróra vágjuk.\r\nA hagymát üvegesre pároljuk kevés olajon, majd hozzáadjuk a fűszerpaprikát.\r\nA kockákra vágott sertéshúst a hagymához adjuk, és addig pirítjuk, amíg kissé megpirul.\r\nA felkockázott paprikát és paradicsomot hozzáadjuk, összekeverjük.\r\nFelöntjük annyi vízzel, hogy ellepje a húst, majd ízlés szerint fűszerezzük.\r\nLassú tűzön főzöm, időnként megkeverjük. Amikor besűrűsödik a szaft (kb 1 óra) elkészült a pörkölt.\r\nNokedli készítése\r\nA nokedli tésztájához összekeverjük a lisztet, tojást, vizet és sót egy tálban, hogy sűrű, ragacsos tésztát kapjak.\r\nForrásban lévő vízbe szaggatjuk a tésztát egy nokedli szaggatóval, majd amint feljönnek a víz tetejére leszűrjük.', 45, 'Sertéspörkölt nokedlivel', '1742293089622-223025598.jpg', 1, 2),
('Főzd meg a tésztát sós vízben, majd szűrd le.\r\nEgy serpenyőben olvaszd fel a vajat, és pirítsd meg a hagymát (ha használod).\r\nA leszűrt tésztát keverd össze a túróval, a pirított hagymával és a tejföllel.\r\nSóval, borssal ízesítsd.', 46, ' Túrós Csusza', '1742893134573-52071968.jpg', 1, 1),
('Zöldségek előkészítése: A krumplit és karfiolt apróra vágd fel.\r\nFűszeres alap elkészítése: Egy serpenyőben hevítsd az olajat. Add hozzá a hagymát és pirítsd 5 percig.\r\nFokhagyma és gyömbér: Add hozzá a fokhagymát és gyömbért, pirítsd tovább 2-3 percig.\r\nFűszerek: Keverd hozzá a kurkumát, koriandert, köményt, és chili port. Pirítsd 1 percig.\r\nZöldségek hozzáadása: Add hozzá a felkockázott krumplit és karfiolt, és keverd össze. Öntsd hozzá a paradicsompürét és főzd 15-20 percig, amíg a zöldségek megpuhulnak.', 47, 'Aloo Gobi', '1742894191050-423696743.jpg', 2, 3),
('Tészta főzése: Főzd meg a makarónit sós vízben a csomagolás utasítása szerint.\r\nSzósz készítése: Egy serpenyőben melegítsd fel a vajat, majd add hozzá a lisztet, és kevergetve pirítsd 1-2 percig. Lassan öntsd hozzá a tejet, folyamatos keverés mellett, hogy sima szószt kapj. Főzd 5 percig, amíg besűrűsödik.\r\nSajt hozzáadása: Add hozzá a reszelt sajtot, fokhagyma port, sót és borsot, és keverd, amíg a sajt teljesen felolvad.\r\nTészta összeállítása: A megfőtt makarónit keverd össze a sajtszósszal, és ha szükséges, egy kis vízzel hígíthatod a szószt.', 48, ' Mac and Cheese', '1742894613915-253614925.jpg', 3, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `regisztracio`
--

DROP TABLE IF EXISTS `regisztracio`;
CREATE TABLE `regisztracio` (
  `Admin` int(1) NOT NULL,
  `Felhasznalo_id` int(11) NOT NULL,
  `Email` varchar(100) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Jelszo` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `Felhasznalonev` varchar(30) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `regisztracio`
--

INSERT INTO `regisztracio` (`Admin`, `Felhasznalo_id`, `Email`, `Jelszo`, `Felhasznalonev`) VALUES
(0, 1, 'horvath0akos@gmail.com', '$2b$10$UADHvTcUBgNN57Z5yDUEm.2fDLULGJsxALCMK4KMAVDvVG.oRdMBW', 'Akos0603'),
(0, 2, 'ricsi0varju@gmail.com', '$2b$10$O1DJeZ2r4AxHE7jgUfj6yucmJmzevKG1bpaUEb.YNLG7LYkUwhKjC', 'varjuricsi'),
(0, 3, 'konyhafonok@gmail.com', '$2b$10$pIgGD7bMcSfGZ5vAY2ttDOGmNQmyYp41p0Nn390CczgK.8PUW3XNW', 'Konyha fönök');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sajat_receptek`
--

DROP TABLE IF EXISTS `sajat_receptek`;
CREATE TABLE `sajat_receptek` (
  `Recept` int(10) NOT NULL,
  `Profil` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `sajat_receptek`
--

INSERT INTO `sajat_receptek` (`Recept`, `Profil`) VALUES
(45, 2);

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
  ADD PRIMARY KEY (`Hozzavalok_id`);

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
  ADD UNIQUE KEY `Email` (`Email`,`Felhasznalonev`);

--
-- A tábla indexei `sajat_receptek`
--
ALTER TABLE `sajat_receptek`
  ADD KEY `Recept` (`Recept`,`Profil`),
  ADD KEY `Profil` (`Profil`);

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
  MODIFY `Hozzavalok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=441;

--
-- AUTO_INCREMENT a táblához `konyha`
--
ALTER TABLE `konyha`
  MODIFY `konyha_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `mertekegyseg`
--
ALTER TABLE `mertekegyseg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=189;

--
-- AUTO_INCREMENT a táblához `napszak`
--
ALTER TABLE `napszak`
  MODIFY `napszak_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `receptek`
--
ALTER TABLE `receptek`
  MODIFY `Receptek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT a táblához `regisztracio`
--
ALTER TABLE `regisztracio`
  MODIFY `Felhasznalo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
