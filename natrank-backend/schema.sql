CREATE DATABASE  IF NOT EXISTS `natrank` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `natrank`;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `City`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `City` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `CityCountry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CityCountry` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `city_id` int unsigned NOT NULL,
  `country_id` int unsigned NOT NULL,
  `period_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_CityCountry_City` FOREIGN KEY (`city_id`) REFERENCES `City` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_CityCountry_Country` FOREIGN KEY (`country_id`) REFERENCES `Country` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_CityCountry_Period` FOREIGN KEY (`period_id`) REFERENCES `Period` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `Country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Country` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `code` char(3) NOT NULL,
  `team_id` int unsigned DEFAULT NULL,
  `period_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Country_Team` FOREIGN KEY (`team_id`) REFERENCES `Team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Country_Period` FOREIGN KEY (`period_id`) REFERENCES `Period` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `Flag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Flag` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `code` char(8) NOT NULL,
  `country_id` int unsigned NOT NULL,
  `period_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Flag_Country` FOREIGN KEY (`country_id`) REFERENCES `Country` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Flag_Period` FOREIGN KEY (`period_id`) REFERENCES `Period` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `Match`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Match` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `type_id` int unsigned NOT NULL,
  `city_id` int unsigned DEFAULT NULL,
  `team1_id` int unsigned NOT NULL,
  `team2_id` int unsigned NOT NULL,
  `team1_goals` tinyint NOT NULL,
  `team2_goals` tinyint NOT NULL,
  `result_extra` varchar(30) DEFAULT NULL,
  `home_team_id` int unsigned DEFAULT NULL,
  `winner_team_id` int unsigned DEFAULT NULL,
  `penalty_shootout` bit NOT NULL DEFAULT 0,
  `team1_rating` smallint unsigned DEFAULT NULL,
  `team2_rating` smallint unsigned DEFAULT NULL,
  `team1_rating_change` smallint DEFAULT NULL,
  `team2_rating_change` smallint DEFAULT NULL,
  `team1_rank` smallint unsigned DEFAULT NULL,
  `team2_rank` smallint unsigned DEFAULT NULL,
  `team1_rank_change` smallint DEFAULT NULL,
  `team2_rank_change` smallint DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_Match_date` (`date`),
  CONSTRAINT `fk_Match_MatchType` FOREIGN KEY (`type_id`) REFERENCES `MatchType` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Match_City` FOREIGN KEY (`city_id`) REFERENCES `City` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Match_Team1` FOREIGN KEY (`team1_id`) REFERENCES `Team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Match_Team2` FOREIGN KEY (`team2_id`) REFERENCES `Team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Match_HomeTeam` FOREIGN KEY (`home_team_id`) REFERENCES `Team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Match_WinnerTeam` FOREIGN KEY (`winner_team_id`) REFERENCES `Team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `MatchType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MatchType` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `fifa_name` varchar(40) DEFAULT NULL,
  `weight` tinyint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `MatchTypeCountry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `MatchTypeCountry` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `country_id` int unsigned NOT NULL,
  `match_type_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_MatchTypeCountry_Country` FOREIGN KEY (`country_id`) REFERENCES `Country` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_MatchTypeCountry_MatchType` FOREIGN KEY (`match_type_id`) REFERENCES `MatchType` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `NotableMatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `NotableMatch` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int unsigned NOT NULL,
  `team_id` int unsigned NOT NULL,
  `match_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_NotableMatch_Category` FOREIGN KEY (`category_id`) REFERENCES `NotableMatchCategory` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_NotableMatch_Team` FOREIGN KEY (`team_id`) REFERENCES `Team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_NotableMatch_Match` FOREIGN KEY (`match_id`) REFERENCES `Match` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `NotableMatchCategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `NotableMatchCategory` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `Period`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Period` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `date_from` date NOT NULL,
  `date_to` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `Ranking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ranking` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_Ranking_date` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `RankingEntry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `RankingEntry` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `ranking_id` int unsigned NOT NULL,
  `team_id` int unsigned NOT NULL,
  `rank` smallint unsigned DEFAULT NULL,
  `rank_change` smallint DEFAULT NULL,
  `rating` smallint unsigned DEFAULT NULL,
  `matches_total` smallint unsigned NOT NULL,
  `matches_home` smallint unsigned NOT NULL,
  `matches_away` smallint unsigned NOT NULL,
  `matches_neutral` smallint unsigned NOT NULL,
  `wins` smallint unsigned NOT NULL,
  `losses` smallint unsigned NOT NULL,
  `draws` smallint unsigned NOT NULL,
  `goals_for` smallint unsigned NOT NULL,
  `goals_against` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_RankingEntry_Team` FOREIGN KEY (`team_id`) REFERENCES `Team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_RankingEntry_Ranking` FOREIGN KEY (`ranking_id`) REFERENCES `Ranking` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `Team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Team` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `home_advantage_coefficient` double NOT NULL DEFAULT '250',
  `highest_rank_id` int unsigned DEFAULT NULL,
  `lowest_rank_id` int unsigned DEFAULT NULL,
  `highest_rating_id` int unsigned DEFAULT NULL,
  `lowest_rating_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_Team_TeamExtreme1` FOREIGN KEY (`highest_rank_id`) REFERENCES `TeamExtreme` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk_Team_TeamExtreme2` FOREIGN KEY (`lowest_rank_id`) REFERENCES `TeamExtreme` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk_Team_TeamExtreme3` FOREIGN KEY (`highest_rating_id`) REFERENCES `TeamExtreme` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk_Team_TeamExtreme4` FOREIGN KEY (`lowest_rating_id`) REFERENCES `TeamExtreme` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `TeamExtreme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TeamExtreme` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type_id` int unsigned NOT NULL,
  `value` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_TeamExtreme_TeamExtremeType` FOREIGN KEY (`type_id`) REFERENCES `TeamExtremeType` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `TeamExtremePeriod`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TeamExtremePeriod` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `team_extreme_id` int unsigned NOT NULL,
  `period_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_TeamExtremePeriod_TeamExtreme` FOREIGN KEY (`team_extreme_id`) REFERENCES `TeamExtreme` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_TeamExtremePeriod_Period` FOREIGN KEY (`period_id`) REFERENCES `Period` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `TeamExtremeType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TeamExtremeType` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `TeamRank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TeamRank` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `team_id` int unsigned NOT NULL,
  `rank` smallint unsigned NOT NULL,
  `change` smallint DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_TeamRank_date` (`date`),
  INDEX `idx_TeamRank_rank` (`rank`),
  INDEX `idx_TeamRank_change` (`change`),
  CONSTRAINT `fk_TeamRank_Team` FOREIGN KEY (`team_id`) REFERENCES `Team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `TeamRating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TeamRating` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `team_id` int unsigned NOT NULL,
  `match_id` int unsigned DEFAULT NULL,
  `rating` smallint unsigned NOT NULL,
  `change` smallint NOT NULL,
  `provisional` bit NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_TeamRank_date` (`date`),
  INDEX `idx_TeamRank_rating` (`rating`),
  INDEX `idx_TeamRank_change` (`change`),
  INDEX `idx_TeamRank_provisional` (`provisional`),
  CONSTRAINT `fk_TeamRating_Team` FOREIGN KEY (`team_id`) REFERENCES `Team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_TeamRating_Match` FOREIGN KEY (`match_id`) REFERENCES `Match` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `User` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(450) NOT NULL,
  `enabled` bit NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `idx_User_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `UserRole`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UserRole` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_UserRole_user_id_role` (`user_id`, `role`),
  CONSTRAINT `fk_UserRole_User` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `utilCountryCode`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utilCountryCode` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `country_name` varchar(30) NOT NULL,
  `code` char(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_utilCountryCode_country_name` (`country_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `utilCountryCode` WRITE;
/*!40000 ALTER TABLE `utilCountryCode` DISABLE KEYS */;
INSERT INTO `utilCountryCode` VALUES (2,'Algeria','ALG'),(3,'Angola','ANG'),(4,'Benin','BEN'),(5,'Botswana','BOT'),(6,'Burkina Faso','BFA'),(7,'Burundi','BDI'),(8,'Cameroon','CMR'),(9,'Cape Verde Islands','CPV'),(10,'Central African Republic','CTA'),(11,'Chad','CHA'),(12,'Comoros Islands','COM'),(13,'Congo','CGO'),(14,'Congo DR','COD'),(15,'Cote d’Ivoire','CIV'),(16,'Djibouti','DJI'),(17,'Egypt','EGY'),(18,'Equatorial Guinea','EQG'),(19,'Eritrea','ERI'),(20,'Ethiopia','ETH'),(21,'Gabon','GAB'),(22,'Gambia','GAM'),(23,'Ghana','GHA'),(24,'Guinea','GUI'),(25,'Guinea-Bissau','GNB'),(26,'Kenya','KEN'),(27,'Lesotho','LES'),(28,'Liberia','LBR'),(29,'Libya','LBY'),(30,'Madagascar','MAD'),(31,'Malawi','MWI'),(32,'Mali','MLI'),(33,'Mauritania','MTN'),(34,'Mauritius','MRI'),(35,'Morocco','MAR'),(36,'Mozambique','MOZ'),(37,'Namibia','NAM'),(38,'Niger','NIG'),(39,'Nigeria','NGA'),(40,'Rwanda','RWA'),(41,'Sao Tome e Principe','STP'),(42,'Senegal','SEN'),(43,'Seychelles','SEY'),(44,'Sierra Leone','SLE'),(45,'Somalia','SOM'),(46,'South Africa','RSA'),(47,'South Sudan','SSD'),(48,'Sudan','SUD'),(49,'Swaziland','SWZ'),(50,'Tanzania','TAN'),(51,'Togo','TOG'),(52,'Tunisia','TUN'),(53,'Uganda','UGA'),(54,'Zambia','ZAM'),(55,'Zimbabwe','ZIM'),(56,'Afghanistan','AFG'),(57,'Australia','AUS'),(58,'Bahrain','BHR'),(59,'Bangladesh','BAN'),(60,'Bhutan','BHU'),(61,'Brunei Darussalam','BRU'),(62,'Cambodia','CAM'),(63,'China PR','CHN'),(64,'Chinese Taipei','TPE'),(65,'East Timor','TLS'),(66,'Guam','GUM'),(67,'Hong Kong','HKG'),(68,'India','IND'),(69,'Indonesia','IDN'),(70,'Iran','IRN'),(71,'Iraq','IRQ'),(72,'Japan','JPN'),(73,'Jordan','JOR'),(74,'Korea DPR','PRK'),(75,'Korea Republic','KOR'),(76,'Kuwait','KUW'),(77,'Kyrgyzstan','KGZ'),(78,'Laos','LAO'),(79,'Lebanon','LIB'),(80,'Macao','MAC'),(81,'Malaysia','MAS'),(82,'Maldives','MDV'),(83,'Mongolia','MGL'),(84,'Myanmar','MYA'),(85,'Nepal','NEP'),(86,'Oman','OMA'),(87,'Pakistan','PAK'),(88,'Palestine','PAL'),(89,'Philippines','PHI'),(90,'Qatar','QAT'),(91,'Saudi Arabia','KSA'),(92,'Singapore','SIN'),(93,'Sri Lanka','SRI'),(94,'Syria','SYR'),(95,'Tajikistan','TJK'),(96,'Thailand','THA'),(97,'Turkmenistan','TKM'),(98,'United Arab Emirates','UAE'),(99,'Uzbekistan','UZB'),(100,'Vietnam','VIE'),(101,'Yemen','YEM'),(102,'Albania','ALB'),(103,'Andorra','AND'),(104,'Armenia','ARM'),(105,'Austria','AUT'),(106,'Azerbaijan','AZE'),(107,'Belarus','BLR'),(108,'Belgium','BEL'),(109,'Bosnia and Herzegovina','BIH'),(110,'Bulgaria','BUL'),(111,'Croatia','CRO'),(112,'Cyprus','CYP'),(113,'Czech Republic','CZE'),(114,'Denmark','DEN'),(115,'England','ENG'),(116,'Estonia','EST'),(117,'Faroe Islands','FRO'),(118,'Finland','FIN'),(119,'France','FRA'),(120,'Georgia','GEO'),(121,'Germany','GER'),(122,'Great Britain','GBR'),(123,'Greece','GRE'),(124,'Holland','NED'),(125,'Hungary','HUN'),(126,'Iceland','ISL'),(127,'Israel','ISR'),(128,'Italy','ITA'),(129,'Kazakhstan','KAZ'),(130,'Latvia','LVA'),(131,'Liechtenstein','LIE'),(132,'Lithuania','LTU'),(133,'Luxembourg','LUX'),(134,'Macedonia FYR','MKD'),(135,'Malta','MLT'),(136,'Moldova','MDA'),(137,'Monaco','MON'),(138,'Montenegro','MNE'),(139,'Northern Ireland','NIR'),(140,'Norway','NOR'),(141,'Poland','POL'),(142,'Portugal','POR'),(143,'Republic of Ireland','IRL'),(144,'Romania','ROU'),(145,'Russia','RUS'),(146,'San Marino','SMR'),(147,'Scotland','SCO'),(148,'Serbia','SRB'),(149,'Slovakia','SVK'),(150,'Slovenia','SVN'),(151,'Spain','ESP'),(152,'Sweden','SWE'),(153,'Switzerland','SUI'),(154,'Turkey','TUR'),(155,'Ukraine','UKR'),(156,'Wales','WAL'),(157,'Vatican','VAT'),(158,'Anguilla','AIA'),(159,'Antigua & Barbuda','ATG'),(160,'Aruba','ARU'),(161,'Bahamas','BAH'),(162,'Barbados','BRB'),(163,'Belize','BLZ'),(164,'Bermuda','BER'),(165,'British Virgin Islands','VGB'),(166,'Canada','CAN'),(167,'Cayman Islands','CAY'),(168,'Costa Rica','CRC'),(169,'Cuba','CUB'),(170,'Curacao','CUW'),(171,'Dominica','DMA'),(172,'Dominican Republic','DOM'),(173,'El Salvador','SLV'),(174,'Grenada','GRN'),(175,'Guatemala','GUA'),(176,'Guyana','GUY'),(177,'Haiti','HAI'),(178,'Honduras','HON'),(179,'Jamaica','JAM'),(180,'Mexico','MEX'),(181,'Montserrat','MSR'),(182,'Nicaragua','NCA'),(183,'Panama','PAN'),(184,'Puerto Rico','PUR'),(185,'St. Kitts & Nevis','SKN'),(186,'St. Lucia','LCA'),(187,'St. Vincent & The Grenadines','VIN'),(188,'Surinam','SUR'),(189,'Trinidad & Tobago','TRI'),(190,'Turks & Caicos Islands','TCA'),(191,'United States of America','USA'),(192,'United States Virgin Islands','VIR'),(193,'American Samoa','ASA'),(195,'Cook Islands','COK'),(196,'Fiji','FIJ'),(198,'Kiribati','KIR'),(199,'Marshall Islands','MHL'),(200,'Micronesia','FSM'),(201,'Nauru','NRU'),(202,'New Caledonia','NCL'),(203,'New Zealand','NZL'),(204,'Palau','PLW'),(205,'Papua New Guinea','PNG'),(206,'Samoa','SAM'),(207,'Solomon Islands','SOL'),(208,'Tahiti','TAH'),(209,'Tonga','TGA'),(210,'Tuvalu','TUV'),(211,'Vanuatu','VAN'),(212,'Argentina','ARG'),(213,'Bolivia','BOL'),(214,'Brazil','BRA'),(215,'Chile','CHI'),(216,'Colombia','COL'),(217,'Ecuador','ECU'),(218,'Paraguay','PAR'),(219,'Peru','PER'),(220,'Uruguay','URU'),(221,'Venezuela','VEN'),(222,'Commonwealth of Independent States','CIS'),(223,'Czechoslovakia','TCH'),(224,'East Germany','DDR'),(225,'Netherland Antilles','ANT'),(226,'North Vietnam','VNO'),(227,'North Yemen','NYE'),(228,'Saarland','SAA'),(229,'Serbia & Montenegro','SCG'),(230,'South Vietnam','VSO'),(231,'South Yemen','SYE'),(232,'Soviet Union','URS'),(233,'West Germany','FRG'),(234,'Yugoslavia','YUG'),(235,'Bohemia','BOH'),(236,'Burma','BUR'),(237,'Ceylon','CEY'),(238,'Congo-Kinshasa','CKN'),(239,'Congo-Brazzaville','COB'),(240,'Dahomey','DAH'),(241,'Dutch Indies','DEI'),(242,'New Hebrides','HEB'),(244,'Rhodesia','RHO'),(245,'Tanganyika','TAA'),(246,'Taiwan','TAI'),(247,'United Arab Republic','UAR'),(248,'Upper Volta','UPV'),(249,'Western Samoa','WSM'),(250,'Zaire','ZAI');
/*!40000 ALTER TABLE `utilCountryCode` ENABLE KEYS */;
UNLOCK TABLES;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

