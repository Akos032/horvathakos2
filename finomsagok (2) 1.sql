-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1:3307
-- Létrehozás ideje: 2025. Feb 25. 10:13
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
('laktozerzekeny', 1),
('glutenerzekeny', 2);

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
('sajt', 94, 7);

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
(1, 'db', 65, 6);

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
(80, 6, 0, 1, 65, 0);

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
('vegetarianus', 1),
('vegan', 2);

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
('A lisztet és a zabpehelylisztet átszitáltam, belekevertem a cukrot és a sütőport. \r\nA mandarinokat kifacsartam és elkevertem a levüket növényi tejjel. Sütéshez általában mandula- vagy zabtejet használok.\r\nA kókuszzsírt felolvasztottam.\r\nÖsszekevertem a lisztes keveréket, a mandarinos tejet és a zsiradékot, majd kikent, zsemlemorzsával megszórt tepsibe öntöttem a masszát. Előbb rászórtam az almakockákat, majd kidíszítettem a tetejét a szeletekkel.\r\n170 fokra előmelegített sütőben nagyjából 40 perc alatt tűpróbáig sütöttem és teljesen hagytam kihűlni a formában. Sokat változik az állaga, ameddig hűl. Ha még melegen felvágjuk, akkor ragacsos maradhat a közepe.\r\n', 6, 'Torta di Mele', '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0', 5, 1),
('A lasagne elkészítéséhez kevés olajon megdinszteljük az apróra vágott vöröshagymát a fokhagymával együtt, majd rátesszük a darált húst, és nagyobb lángon egészen addig pároljuk, amíg a hús kifehéredik.\r\nSóval, borssal ízesítjük. Ezután pici vizet öntünk alá, és fedő alatt puhára pároljuk. Amikor már majdnem elkészült, felengedjük a paradicsomszósszal, bazsalikommal ízesítjük, és jól összefőzzük.\r\nKözben a vajat serpenyőben felmelegítjük, beleszórjuk a lisztet, és addig hevítjük, míg el nem kezd kifehéredni. Felengedjük a tejjel, sózzuk és nem túl sűrű besamel szószt főzünk belőle. Ha nagyon sűrű lenne, kevés tejjel higíthatjuk.\r\nEgy közepes méretű tepsit vékonyan kiolajazunk. Az aljába teszünk kevés ragut, több besamelt, majd jön rá a lasagne tésztalap. Ismét a ragu, a besamel, a tészta váltakozva. A lényeg, hogy a lasagne tetejére kerüljön az utolsó adag ragu.\r\nMegszórjuk reszelt sajttal, alufóliával letakarva, 170 fokra előmelegített sütőben, kb. 35-40 perc alatt készre sütjük (amíg a tészta megpuhul, a sajt szépen megbarnul).', 7, 'Lasagne', '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0', 5, 2),
('A sajtszószos gnocchi tésztához a hideg vízben feltett burgonyát puhára főzzük, majd leszűrjük. Rövid hűtés után meghámozzuk, krumplinyomón áttörjük, és enyhén lisztezett felületen szétterítjük. Rászitáljuk a lisztet, a közepébe ütjük a tojást, hozzáadunk 1 csipet sót, és erőteljes mozdulatokkal lágy tésztává gyúrjuk.\r\nA tésztából vékony hengereket sodrunk, amelyeket kis darabokra vágunk. Ezeket villával egyenként bordás nudlikká formázzuk - de ez a lépés ki is mardhat.\r\nA gnocchit nagy fazék lobogó vízbe dobjuk. A felszínre úszó darabokat szűrőkanállal kiemeljük, és melegen tartjuk.\r\nA szószhoz a sajtot kis darabokra vágjuk vagy durvára reszeljük, és a tejszínbe szórjuk. Megsózzuk, megborsozzuk, majd addig főzzük, amíg a sajt teljesen elolvad.\r\nVégül a gnocchit összeforgatjuk a sajtszósszal. Tetszés szerint bazsalikomlevéllel díszítve tálaljuk.', 8, 'Sajtszószos gnocchi', 'gnocchi.jpg', 5, 3),
('Pici ghín vagy valami jóféle olajon megpirítunk némi apróra vágott  gyömbért (és hagymát, ha ez belefér nekünk), és amikor megbarnultak a gyömbér szeletek szélei (és üvegesre pirult a hagyma), kipattogtatunk egy kis római köményt és fekete mustármagot a zsiradékban.\r\nEzután mehet bele némi vékonyra szelt répa, paprika, pici rózsákra szedett karfiol, de akár egy kis sós mogyorót is keverhettünk az olajba. Ha szeretjük és bírjuk a csípőset azt is bele csempészhetünk, télen az még ajánlott is az Ájurvédában!\r\nUtána picit felengedjük vízzel a fűszeres, zöldséges alapunkat és akkor teszünk bele még egy kis kurkumát, sót, babérlevelet és ha van curry levelünk azt is.\r\nEközben egy másik edényben pici lángon megpirítunk némi búzadarát vajon. Vigyázzunk becsapós lesz, mert a búzadara először mindig egy picit kifehéredik a pirításra és csak utána kezd el bebarnulni.\r\n Amikor megpirult a búzadara, felöntjük a zöldséges alap lével és 2-3 perc összeforralás után kész is. Egy perccel a tűzről való levétel előtt, tehetünk hozzá egy kis apróra vágott koriander vagy petrezselyem levelet is.\r\nAmikor felöntjük a búzadarát a zöldséges vízzel, vigyázzunk, csak szép lassan, mert ha túl hirtelen zutyintjuk bele a vizet, a felhevült búzadara felrobban.', 9, 'Upma', 'upma.jpg', 2, 1),
('Egy nagy serpenyőben a három evőkanál olajon megdinszteljük a finomra vágott vöröshagymát és fokhagymát. Hozzáadjuk a fűszereket (lereszelt gyömbér, garam masala, római kömény, koriander, kurkuma), és együtt jól összepirítjuk.\r\nBelerakjuk a meghámozott, kockákra vágott burgonyát, teszünk alá egy kis vizet, és körülbelül öt percig főzzük, hogy a krumpli kicsit megpuhuljon.\r\nKözben a karfiolt megtisztítjuk, késsel kisebb darabokra felvágjuk. Ráöntjük a hagymás krumplira, hozzátesszük a felkockázott paprikát, jó alaposan összeforgatjuk.\r\nÁtöntjük egy tepsibe, és 170 fokos sütőben jó 20 perc alatt összesütjük. Friss korianderrel tálaljuk.', 10, 'Aloo gobi', '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0', 2, 2),
('A lencsét reggel (vagy előző este) háromszoros mennyiségű vízbe beáztatjuk. Főzés előtt leöntjük róla a vizet, és egy nagy lábasban friss vízzel öntjük fel, majd kb. 40 perc alatt majdnem teljesen puhára főzzük (a pontos főzési idő a lencse fajtájától függ). Ilyenkor nem sózzuk. Miközben fő a lencse, elkészítjük a fűszeres alapot: egy nagy, vastagfalú lábasban, amit a sütőbe tudunk majd tenni (pl. cocotte, vagy más öntöttvas lábas), felolvasztjuk a vajat. Hozzáadjuk a finomra aprított hagymát, gyömbért, fokhagymát, kissé megsózzuk (így vizet enged, és könnyebben puhul), és üvegesre dinszteljük. Ekkor hozzáadjuk a fűszereket, néhány percig pirítjuk. Belekeverjük a sűrített paradicsomot és a konzerv paradicsomot, elkeverjük. A megfőtt lencsét leszűrjük, és a fűszeres-paradicsomos alaphoz adjuk. Hozzáöntjük a tejet, vagy kókusztejet, valamint annyi vizet, hogy sűrű, de leveses állagot kapjunk. Sóval, borssal ízesítjük. A sütőt előmelegítjük 100 fokra, a lábast lefedjük (a fedőjével, vagy ha nincs, szorosan, dupla réteg alufóliával), és betesszük a sütőbe. 8 órán át hagyjuk benne, de nem tud túlkészülni, tehát semmi baja nem lesz, ha valamivel tovább marad bent. Reggelre illatos, krémes, fűszeres lencsefőzelék vár bennünket. Előre is el lehet készíteni, mert kiválóan újramelegíthető, sőt, egyre jobb lesz. Rizzsel, vagy naan-nal kínáljuk, joghurtot is friss koriandert is tehetünk rá.', 11, 'Dal Makhani ', '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0', 2, 3),
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
  ADD KEY `Etrend` (`etrend_id`),
  ADD KEY `mertekegyseg_id` (`mertekegyseg_id`),
  ADD KEY `preferencia_id` (`preferencia_id`);

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
  MODIFY `erzekenyseg_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `hozzavalok`
--
ALTER TABLE `hozzavalok`
  MODIFY `Hozzavalok_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT a táblához `konyha`
--
ALTER TABLE `konyha`
  MODIFY `konyha_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `mertekegyseg`
--
ALTER TABLE `mertekegyseg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

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
-- AUTO_INCREMENT a táblához `regisztracio`
--
ALTER TABLE `regisztracio`
  MODIFY `Felhasznalo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `erzekenysegek`
--
ALTER TABLE `erzekenysegek`
  ADD CONSTRAINT `erzekenysegek_ibfk_1` FOREIGN KEY (`erzekenyseg_id`) REFERENCES `osszekoto` (`etrend_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `osszekoto`
--
ALTER TABLE `osszekoto`
  ADD CONSTRAINT `osszekoto_ibfk_1` FOREIGN KEY (`receptek_id`) REFERENCES `receptek` (`Receptek_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `osszekoto_ibfk_2` FOREIGN KEY (`hozzavalok_id`) REFERENCES `hozzavalok` (`Hozzavalok_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `osszekoto_ibfk_3` FOREIGN KEY (`mertekegyseg_id`) REFERENCES `mertekegyseg` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `osszekoto_ibfk_4` FOREIGN KEY (`preferencia_id`) REFERENCES `preferencia` (`etkezes_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
