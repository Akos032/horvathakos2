-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2025. Már 18. 10:32
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
('liszt', 417),
('cukor', 418),
('tojás', 419),
('tej', 420),
('vaj', 421),
('só', 422),
('bors', 423),
('olívaolaj', 424),
('paradicsom', 425),
('csirkehús', 426),
('burgonya', 427),
('hagyma', 428),
('fokhagyma', 429),
('sajt', 430),
('sütőpor', 431),
('rizs', 432),
('tészta', 433),
('tejszín', 434),
('alma', 435),
('banán', 436),
('narancs', 437),
('eper', 438),
('szilva', 439),
('málna', 440),
('körte', 441),
('grapefruit', 442),
('kivi', 443),
('barack', 444),
('zöldborsó', 445),
('sárgarépa', 446),
('brokkoli', 447),
('karfiol', 448),
('cukkini', 449),
('padlizsán', 450),
('spenót', 451),
('paradicsom', 452),
('kukorica', 453),
('cékla', 454),
('kelbimbó', 455),
('gomba', 456),
('saláta', 457),
('uborka', 458),
('joghurt', 459),
('tehéntúró', 460),
('feta', 461),
('ricotta', 462),
('gorgonzola', 463),
('parmezán', 464),
('mozzarella', 465),
('túró', 466),
('görög joghurt', 467),
('kefír', 468),
('szójaszósz', 469),
('balsamico ecet', 470),
('margarin', 471),
('mustár', 472),
('mayonnaise', 473),
('ketchup', 474),
('spagetti', 475),
('lasagna', 476),
('penne', 477),
('fusilli', 478),
('quinoa', 479),
('bulgur', 480),
('hummus', 481),
('couscous', 482),
('savanyúság', 483),
('szőlő', 484),
('gyömbér', 485),
('fahéj', 486),
('szegfűszeg', 487),
('szerecsendió', 488),
('oregano', 489),
('bazsalikom', 490),
('rozmaring', 491),
('tárkony', 492),
('muskátli', 493),
('babérlevél', 494),
('majoránna', 495),
('kakukkfű', 496),
('petrezselyem', 497),
('kapor', 498),
('mandula', 499),
('dió', 500),
('földimogyoró', 501),
('kesudió', 502),
('pisztácia', 503),
('kókuszreszelék', 504),
('chili', 505),
('fokhagyma por', 506),
('himalája só', 507),
('kókuszolaj', 508),
('kacsa zsír', 509),
('libazsír', 510),
('sertés zsír', 511),
('tökmag', 512),
('napraforgómag', 513),
('szezámmag', 514),
('chia mag', 515),
('lenmag', 516),
('zabpehely', 517),
('majonéz', 518),
('sajtmártás', 519),
('ajvar', 520),
('guacamole', 521),
('salsa', 522),
('hoisin szósz', 523),
('tárkonyecet', 524),
('áfonya', 525),
('földieper', 526),
('cseresznye', 527),
('mogyoróvaj', 528),
('méz', 529),
('juharszirup', 530),
('xilit', 531),
('aszaltszilva', 532),
('datolya', 533),
('kávé', 534),
('tea', 535),
('zöldtea', 536),
('fekete tea', 537),
('sárgaborsó', 538),
('könnyű túró', 539),
('tejföl', 540),
('cottage cheese', 541),
('tök', 542),
('kókuszvíz', 543),
('citromfű', 544),
('melissa', 545),
('áfonya lekvár', 546),
('eper lekvár', 547),
('barack lekvár', 548),
('szilva lekvár', 549),
('torma', 550),
('gyömbér szirup', 551),
('almaecet', 552),
('szójaszósz', 553),
('gránátalma', 554),
('körtelekvár', 555),
('zöld tea', 556),
('szójatej', 557),
('mandulatej', 558),
('fahéjas cukor', 559),
('gyümölcslé', 560),
('zöldségleves', 561),
('tojáspótló', 562),
('sóskafőzelék', 563),
('rizskorpa', 564),
('fa keksz', 565),
('gyümölcs joghurt', 566),
('nyers mandula', 567),
('kókuszos édesség', 568),
('marcipán', 569),
('málna szirup', 570),
('tejcsokoládé', 571),
('fekete csokoládé', 572),
('sajtos keksz', 573),
('nugát', 574),
('citrusos édes', 575),
('piritott mandula', 576),
('mézeskalács fűszerkeverék', 577),
('pudingpor', 578),
('édesburgonya', 579),
('szőlőcukor', 580),
('rúd cukor', 581),
('csemege kukorica', 582),
('gyümölcsíz', 583),
('palacsinta liszt', 584),
('tökfőzelék', 585),
('karfiolrizs', 586),
('almaszósz', 587),
('túrós csusza', 588),
('fagyasztott bogyós gyümölcs', 589),
('friss fűszernövények', 590),
('chili por', 591),
('citromlé', 592),
('paradicsomszósz', 593),
('tojásfehérje por', 594),
('vegan sajttal', 595),
('fűszerkeverék', 596),
('házi ketchup', 597),
('yogurt', 598),
('zöld hagyma', 599),
('fehér kenyér', 600),
('gluténmentes liszt', 601),
('túrókrém', 602),
('sonka', 603),
('fűszerezett vaj', 604),
('liba máj', 605),
('kókusz tej', 606),
('zöldség keverék', 607),
('mozzarella golyó', 608),
('lazac', 609),
('tonhal', 610),
('makréla', 611),
('sardínia', 612),
('halolaj', 613),
('tenger gyümölcsei', 614),
('csirke szárny', 615),
('marha steak', 616),
('sertéshús', 617),
('pulyka szelet', 618),
('nyúlhús', 619),
('kacsacomb', 620),
('libamáj', 621),
('túrófélék', 622),
('tehéntúró', 623),
('gluténmentes kenyér', 624),
('pita kenyér', 625),
('bagett', 626),
('houska', 627),
('ciabatta', 628),
('kurtoskalacs', 629),
('kakaópor', 630),
('szárított paradicsom', 631),
('kókuszliszt', 632),
('mák', 633),
('túrós batyu', 634),
('fánk', 635),
('krémes', 636),
('tiramisu', 637),
('almás lepény', 638),
('pizzaszósz', 639),
('majonézes saláta', 640),
('cápa hús', 641),
('kacsa hús', 642),
('húsleves', 643),
('tojáskrém', 644),
('francia saláta', 645),
('töltött káposzta', 646),
('pörkölt', 647),
('rizses hús', 648),
('sült csirke', 649),
('rakott krumpli', 650),
('lecsó', 651),
('tojásos nokedli', 652),
('töltött paprika', 653),
('krémleves', 654),
('pulykasült', 655),
('töltött káposzta', 656),
('zöldséges pörkölt', 657),
('töltött padlizsán', 658),
('sült zöldségek', 659),
('frittata', 660),
('sült hal', 661),
('képviselőfánk', 662),
('töltött tojás', 663),
('sült sertéshús', 664),
('tojásos pirított rizs', 665);

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
  MODIFY `Hozzavalok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=666;

--
-- AUTO_INCREMENT a táblához `konyha`
--
ALTER TABLE `konyha`
  MODIFY `konyha_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `mertekegyseg`
--
ALTER TABLE `mertekegyseg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

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
  MODIFY `Receptek_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `osszekoto`
--
ALTER TABLE `osszekoto`
  ADD CONSTRAINT `osszekoto_ibfk_1` FOREIGN KEY (`hozzavalok_id`) REFERENCES `hozzavalok` (`Hozzavalok_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `osszekoto_ibfk_2` FOREIGN KEY (`receptek_id`) REFERENCES `receptek` (`Receptek_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `osszekoto_ibfk_3` FOREIGN KEY (`mertekegyseg_id`) REFERENCES `mertekegyseg` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `osszekoto_ibfk_4` FOREIGN KEY (`preferencia_id`) REFERENCES `preferencia` (`etkezes_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `osszekoto_ibfk_5` FOREIGN KEY (`etrend_id`) REFERENCES `erzekenysegek` (`erzekenyseg_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `receptek`
--
ALTER TABLE `receptek`
  ADD CONSTRAINT `receptek_ibfk_1` FOREIGN KEY (`napszak_oszekoto`) REFERENCES `napszak` (`napszak_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `receptek_ibfk_2` FOREIGN KEY (`konyha_oszekoto`) REFERENCES `konyha` (`konyha_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `regisztracio`
--
ALTER TABLE `regisztracio`
  ADD CONSTRAINT `regisztracio_ibfk_1` FOREIGN KEY (`sajatrecept`) REFERENCES `receptek` (`Receptek_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
