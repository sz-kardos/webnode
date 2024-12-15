-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: mysql.omega:3306
-- Létrehozás ideje: 2024. Dec 15. 21:44
-- Kiszolgáló verziója: 5.7.42-log
-- PHP verzió: 7.2.34-52+0~20241121.100+debian12~1.gbpe01bd2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `db023`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `eloadas`
--

CREATE TABLE `eloadas` (
  `id` int(11) NOT NULL,
  `filmid` int(11) NOT NULL,
  `moziid` int(11) NOT NULL,
  `datum` date DEFAULT NULL,
  `nezoszam` int(11) DEFAULT NULL,
  `bevetel` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `film`
--

CREATE TABLE `film` (
  `fkod` int(11) NOT NULL,
  `filmcim` varchar(255) NOT NULL,
  `mufaj` varchar(100) DEFAULT NULL,
  `hossz` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `film`
--

INSERT INTO `film` (`fkod`, `filmcim`, `mufaj`, `hossz`) VALUES
(1, 'Csókolj meg, édes!', 'Dráma', 67),
(2, 'Repülõ arany', 'Kaland', 48),
(3, 'Piri mindent tud', 'Vígjáték', 92);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `hely`
--

CREATE TABLE `hely` (
  `hkod` int(11) NOT NULL,
  `fkod` int(11) NOT NULL,
  `moziazon` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `mozi`
--

CREATE TABLE `mozi` (
  `moziazon` int(11) NOT NULL,
  `mozinev` varchar(255) NOT NULL,
  `cim` varchar(255) DEFAULT NULL,
  `irszam` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- A tábla adatainak kiíratása `mozi`
--

INSERT INTO `mozi` (`moziazon`, `mozinev`, `cim`, `irszam`) VALUES
(1, 'Gárdonyi Lajos', 'Budapest', 320),
(2, 'Pécsi Sándor', 'Sárospatak', 250),
(3, 'Páger Antal', 'Szeged', 303);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `uzenetek`
--

CREATE TABLE `uzenetek` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `uzenet` text NOT NULL,
  `idopont` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `eloadas`
--
ALTER TABLE `eloadas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `filmid` (`filmid`),
  ADD KEY `moziid` (`moziid`);

--
-- A tábla indexei `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`fkod`);

--
-- A tábla indexei `hely`
--
ALTER TABLE `hely`
  ADD PRIMARY KEY (`hkod`),
  ADD KEY `fkod` (`fkod`),
  ADD KEY `moziazon` (`moziazon`);

--
-- A tábla indexei `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `mozi`
--
ALTER TABLE `mozi`
  ADD PRIMARY KEY (`moziazon`);

--
-- A tábla indexei `uzenetek`
--
ALTER TABLE `uzenetek`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `eloadas`
--
ALTER TABLE `eloadas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `film`
--
ALTER TABLE `film`
  MODIFY `fkod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `hely`
--
ALTER TABLE `hely`
  MODIFY `hkod` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `mozi`
--
ALTER TABLE `mozi`
  MODIFY `moziazon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `uzenetek`
--
ALTER TABLE `uzenetek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `eloadas`
--
ALTER TABLE `eloadas`
  ADD CONSTRAINT `eloadas_ibfk_1` FOREIGN KEY (`filmid`) REFERENCES `film` (`fkod`),
  ADD CONSTRAINT `eloadas_ibfk_2` FOREIGN KEY (`moziid`) REFERENCES `mozi` (`moziazon`);

--
-- Megkötések a táblához `hely`
--
ALTER TABLE `hely`
  ADD CONSTRAINT `hely_ibfk_1` FOREIGN KEY (`fkod`) REFERENCES `film` (`fkod`),
  ADD CONSTRAINT `hely_ibfk_2` FOREIGN KEY (`moziazon`) REFERENCES `mozi` (`moziazon`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
