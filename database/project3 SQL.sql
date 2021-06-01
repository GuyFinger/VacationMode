CREATE DATABASE project3

CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) NOT NULL,
  `auth` tinyint(1) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4;

CREATE TABLE `uservacations` (
  `userID` int(11) NOT NULL,
  `vacationID` int(11) NOT NULL,
  PRIMARY KEY (`userID`,`vacationID`),
  KEY `vacationID` (`vacationID`),
  CONSTRAINT `uservacations_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`),
  CONSTRAINT `uservacations_ibfk_2` FOREIGN KEY (`vacationID`) REFERENCES `vacations` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `vacations` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `vacationName` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `start` date DEFAULT NULL,
  `end` date DEFAULT NULL,
  `price` int(11) NOT NULL,
  `destination` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

