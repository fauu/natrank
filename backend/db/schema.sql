CREATE DATABASE  IF NOT EXISTS `natrank`
USE `natrank`;


DROP TABLE IF EXISTS `city`;
CREATE TABLE `city` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `city_country`;
CREATE TABLE `city_country` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `city_id` int unsigned NOT NULL,
  `country_id` int unsigned NOT NULL,
  `period_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_city_country_city_city_id` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_city_country_country_country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_city_country_period_period_id` FOREIGN KEY (`period_id`) REFERENCES `period` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `country`;
CREATE TABLE `country` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `code` char(3) NOT NULL,
  `team_id` int unsigned DEFAULT NULL,
  `period_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_country_team_team_id` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_country_period_period_id` FOREIGN KEY (`period_id`) REFERENCES `period` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `flag`;
CREATE TABLE `flag` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `code` char(8) NOT NULL,
  `country_id` int unsigned NOT NULL,
  `period_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_flag_country_country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_flag_period_period_id` FOREIGN KEY (`period_id`) REFERENCES `period` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `match`;
CREATE TABLE `match` (
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
  INDEX `idx_match_date` (`date`),
  CONSTRAINT `fk_match_match_type_type_id` FOREIGN KEY (`type_id`) REFERENCES `match_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_match_city` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_match_team_team1_id` FOREIGN KEY (`team1_id`) REFERENCES `team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_match_team_team2_id` FOREIGN KEY (`team2_id`) REFERENCES `team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_match_team_home_team_id` FOREIGN KEY (`home_team_id`) REFERENCES `team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_match_team_winner_team_id` FOREIGN KEY (`winner_team_id`) REFERENCES `team` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `match_type`;
CREATE TABLE `match_type` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `fifa_name` varchar(40) DEFAULT NULL,
  `weight` tinyint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `match_type_country`;
CREATE TABLE `match_type_country` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `country_id` int unsigned NOT NULL,
  `match_type_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_match_type_country_country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_match_type_country_match_type_match_type_id` FOREIGN KEY (`match_type_id`) REFERENCES `match_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `notable_match`;
CREATE TABLE `notable_match` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int unsigned NOT NULL,
  `team_id` int unsigned NOT NULL,
  `match_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_notable_match_notable_match_category_category_id` FOREIGN KEY (`category_id`) REFERENCES `notable_match_category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_notable_match_team_team_id` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_notable_match_match_team_id` FOREIGN KEY (`match_id`) REFERENCES `match` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `notable_match_category`;
CREATE TABLE `notable_match_category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `period`;
CREATE TABLE `period` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `date_from` date NOT NULL,
  `date_to` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `ranking`;
CREATE TABLE `ranking` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_ranking_date` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `ranking_entry`;
CREATE TABLE `ranking_entry` (
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
  CONSTRAINT `fk_ranking_entry_team_team_id` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ranking_entry_ranking_ranking_id` FOREIGN KEY (`ranking_id`) REFERENCES `ranking` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `team`;
CREATE TABLE `team` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `home_advantage_coefficient` double NOT NULL DEFAULT '250',
  `highest_rank_id` int unsigned DEFAULT NULL,
  `lowest_rank_id` int unsigned DEFAULT NULL,
  `highest_rating_id` int unsigned DEFAULT NULL,
  `lowest_rating_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_team_team_extreme_highest_rank_id` FOREIGN KEY (`highest_rank_id`) REFERENCES `team_extreme` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk_team_team_extreme_lowest_rank_id` FOREIGN KEY (`lowest_rank_id`) REFERENCES `team_extreme` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk_team_team_extreme_highest_rating_id` FOREIGN KEY (`highest_rating_id`) REFERENCES `team_extreme` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `fk_team_team_extreme_lowest_rating_id` FOREIGN KEY (`lowest_rating_id`) REFERENCES `team_extreme` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `team_extreme`;
CREATE TABLE `team_extreme` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type_id` int unsigned NOT NULL,
  `value` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_team_extreme_team_extreme_type_type_id` FOREIGN KEY (`type_id`) REFERENCES `team_extreme_type` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `team_extreme_period`;
CREATE TABLE `team_extreme_period` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `team_extreme_id` int unsigned NOT NULL,
  `period_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_team_extreme_period_team_extreme_team_extreme_id` FOREIGN KEY (`team_extreme_id`) REFERENCES `team_extreme` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_team_extreme_period_period_period_id` FOREIGN KEY (`period_id`) REFERENCES `period` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `team_extreme_type`;
CREATE TABLE `team_extreme_type` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `team_rank`;
CREATE TABLE `team_rank` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `team_id` int unsigned NOT NULL,
  `rank` smallint unsigned NOT NULL,
  `change` smallint DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_team_rank_date` (`date`),
  INDEX `idx_team_rank_rank` (`rank`),
  INDEX `idx_team_rank_change` (`change`),
  CONSTRAINT `fk_team_rank_team_team_id` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `team_rating`;
CREATE TABLE `team_rating` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `team_id` int unsigned NOT NULL,
  `match_id` int unsigned DEFAULT NULL,
  `rating` smallint unsigned NOT NULL,
  `change` smallint NOT NULL,
  `provisional` bit NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_team_rating_date` (`date`),
  INDEX `idx_team_rating_rating` (`rating`),
  INDEX `idx_team_rating_change` (`change`),
  INDEX `idx_team_rating_provisional` (`provisional`),
  CONSTRAINT `fk_team_rating_team_team_id` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_team_rating_match_match_id` FOREIGN KEY (`match_id`) REFERENCES `match` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(450) NOT NULL,
  `enabled` bit NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `idx_user_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `role` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unq_user_role_user_id_role` (`user_id`, `role`),
  CONSTRAINT `fk_user_role_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `util_country_code`;
CREATE TABLE `util_country_code` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `country_name` varchar(30) NOT NULL,
  `code` char(3) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_util_country_code_country_name` (`country_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


INSERT INTO `util_country_code` VALUES (2,'Algeria','ALG'),(3,'Angola','ANG'),(4,'Benin','BEN'),(5,'Botswana','BOT'),(6,'Burkina Faso','BFA'),(7,'Burundi','BDI'),(8,'Cameroon','CMR'),(9,'Cape Verde Islands','CPV'),(10,'Central African Republic','CTA'),(11,'Chad','CHA'),(12,'Comoros Islands','COM'),(13,'Congo','CGO'),(14,'Congo DR','COD'),(15,'Cote d’Ivoire','CIV'),(16,'Djibouti','DJI'),(17,'Egypt','EGY'),(18,'Equatorial Guinea','EQG'),(19,'Eritrea','ERI'),(20,'Ethiopia','ETH'),(21,'Gabon','GAB'),(22,'Gambia','GAM'),(23,'Ghana','GHA'),(24,'Guinea','GUI'),(25,'Guinea-Bissau','GNB'),(26,'Kenya','KEN'),(27,'Lesotho','LES'),(28,'Liberia','LBR'),(29,'Libya','LBY'),(30,'Madagascar','MAD'),(31,'Malawi','MWI'),(32,'Mali','MLI'),(33,'Mauritania','MTN'),(34,'Mauritius','MRI'),(35,'Morocco','MAR'),(36,'Mozambique','MOZ'),(37,'Namibia','NAM'),(38,'Niger','NIG'),(39,'Nigeria','NGA'),(40,'Rwanda','RWA'),(41,'Sao Tome e Principe','STP'),(42,'Senegal','SEN'),(43,'Seychelles','SEY'),(44,'Sierra Leone','SLE'),(45,'Somalia','SOM'),(46,'South Africa','RSA'),(47,'South Sudan','SSD'),(48,'Sudan','SUD'),(49,'Swaziland','SWZ'),(50,'Tanzania','TAN'),(51,'Togo','TOG'),(52,'Tunisia','TUN'),(53,'Uganda','UGA'),(54,'Zambia','ZAM'),(55,'Zimbabwe','ZIM'),(56,'Afghanistan','AFG'),(57,'Australia','AUS'),(58,'Bahrain','BHR'),(59,'Bangladesh','BAN'),(60,'Bhutan','BHU'),(61,'Brunei Darussalam','BRU'),(62,'Cambodia','CAM'),(63,'China PR','CHN'),(64,'Chinese Taipei','TPE'),(65,'East Timor','TLS'),(66,'Guam','GUM'),(67,'Hong Kong','HKG'),(68,'India','IND'),(69,'Indonesia','IDN'),(70,'Iran','IRN'),(71,'Iraq','IRQ'),(72,'Japan','JPN'),(73,'Jordan','JOR'),(74,'Korea DPR','PRK'),(75,'Korea Republic','KOR'),(76,'Kuwait','KUW'),(77,'Kyrgyzstan','KGZ'),(78,'Laos','LAO'),(79,'Lebanon','LIB'),(80,'Macao','MAC'),(81,'Malaysia','MAS'),(82,'Maldives','MDV'),(83,'Mongolia','MGL'),(84,'Myanmar','MYA'),(85,'Nepal','NEP'),(86,'Oman','OMA'),(87,'Pakistan','PAK'),(88,'Palestine','PAL'),(89,'Philippines','PHI'),(90,'Qatar','QAT'),(91,'Saudi Arabia','KSA'),(92,'Singapore','SIN'),(93,'Sri Lanka','SRI'),(94,'Syria','SYR'),(95,'Tajikistan','TJK'),(96,'Thailand','THA'),(97,'Turkmenistan','TKM'),(98,'United Arab Emirates','UAE'),(99,'Uzbekistan','UZB'),(100,'Vietnam','VIE'),(101,'Yemen','YEM'),(102,'Albania','ALB'),(103,'Andorra','AND'),(104,'Armenia','ARM'),(105,'Austria','AUT'),(106,'Azerbaijan','AZE'),(107,'Belarus','BLR'),(108,'Belgium','BEL'),(109,'Bosnia and Herzegovina','BIH'),(110,'Bulgaria','BUL'),(111,'Croatia','CRO'),(112,'Cyprus','CYP'),(113,'Czech Republic','CZE'),(114,'Denmark','DEN'),(115,'England','ENG'),(116,'Estonia','EST'),(117,'Faroe Islands','FRO'),(118,'Finland','FIN'),(119,'France','FRA'),(120,'Georgia','GEO'),(121,'Germany','GER'),(122,'Great Britain','GBR'),(123,'Greece','GRE'),(124,'Holland','NED'),(125,'Hungary','HUN'),(126,'Iceland','ISL'),(127,'Israel','ISR'),(128,'Italy','ITA'),(129,'Kazakhstan','KAZ'),(130,'Latvia','LVA'),(131,'Liechtenstein','LIE'),(132,'Lithuania','LTU'),(133,'Luxembourg','LUX'),(134,'Macedonia FYR','MKD'),(135,'Malta','MLT'),(136,'Moldova','MDA'),(137,'Monaco','MON'),(138,'Montenegro','MNE'),(139,'Northern Ireland','NIR'),(140,'Norway','NOR'),(141,'Poland','POL'),(142,'Portugal','POR'),(143,'Republic of Ireland','IRL'),(144,'Romania','ROU'),(145,'Russia','RUS'),(146,'San Marino','SMR'),(147,'Scotland','SCO'),(148,'Serbia','SRB'),(149,'Slovakia','SVK'),(150,'Slovenia','SVN'),(151,'Spain','ESP'),(152,'Sweden','SWE'),(153,'Switzerland','SUI'),(154,'Turkey','TUR'),(155,'Ukraine','UKR'),(156,'Wales','WAL'),(157,'Vatican','VAT'),(158,'Anguilla','AIA'),(159,'Antigua & Barbuda','ATG'),(160,'Aruba','ARU'),(161,'Bahamas','BAH'),(162,'Barbados','BRB'),(163,'Belize','BLZ'),(164,'Bermuda','BER'),(165,'British Virgin Islands','VGB'),(166,'Canada','CAN'),(167,'Cayman Islands','CAY'),(168,'Costa Rica','CRC'),(169,'Cuba','CUB'),(170,'Curacao','CUW'),(171,'Dominica','DMA'),(172,'Dominican Republic','DOM'),(173,'El Salvador','SLV'),(174,'Grenada','GRN'),(175,'Guatemala','GUA'),(176,'Guyana','GUY'),(177,'Haiti','HAI'),(178,'Honduras','HON'),(179,'Jamaica','JAM'),(180,'Mexico','MEX'),(181,'Montserrat','MSR'),(182,'Nicaragua','NCA'),(183,'Panama','PAN'),(184,'Puerto Rico','PUR'),(185,'St. Kitts & Nevis','SKN'),(186,'St. Lucia','LCA'),(187,'St. Vincent & The Grenadines','VIN'),(188,'Surinam','SUR'),(189,'Trinidad & Tobago','TRI'),(190,'Turks & Caicos Islands','TCA'),(191,'United States of America','USA'),(192,'United States Virgin Islands','VIR'),(193,'American Samoa','ASA'),(195,'Cook Islands','COK'),(196,'Fiji','FIJ'),(198,'Kiribati','KIR'),(199,'Marshall Islands','MHL'),(200,'Micronesia','FSM'),(201,'Nauru','NRU'),(202,'New Caledonia','NCL'),(203,'New Zealand','NZL'),(204,'Palau','PLW'),(205,'Papua New Guinea','PNG'),(206,'Samoa','SAM'),(207,'Solomon Islands','SOL'),(208,'Tahiti','TAH'),(209,'Tonga','TGA'),(210,'Tuvalu','TUV'),(211,'Vanuatu','VAN'),(212,'Argentina','ARG'),(213,'Bolivia','BOL'),(214,'Brazil','BRA'),(215,'Chile','CHI'),(216,'Colombia','COL'),(217,'Ecuador','ECU'),(218,'Paraguay','PAR'),(219,'Peru','PER'),(220,'Uruguay','URU'),(221,'Venezuela','VEN'),(222,'Commonwealth of Independent States','CIS'),(223,'Czechoslovakia','TCH'),(224,'East Germany','DDR'),(225,'Netherland Antilles','ANT'),(226,'North Vietnam','VNO'),(227,'North Yemen','NYE'),(228,'Saarland','SAA'),(229,'Serbia & Montenegro','SCG'),(230,'South Vietnam','VSO'),(231,'South Yemen','SYE'),(232,'Soviet Union','URS'),(233,'West Germany','FRG'),(234,'Yugoslavia','YUG'),(235,'Bohemia','BOH'),(236,'Burma','BUR'),(237,'Ceylon','CEY'),(238,'Congo-Kinshasa','CKN'),(239,'Congo-Brazzaville','COB'),(240,'Dahomey','DAH'),(241,'Dutch Indies','DEI'),(242,'New Hebrides','HEB'),(244,'Rhodesia','RHO'),(245,'Tanganyika','TAA'),(246,'Taiwan','TAI'),(247,'United Arab Republic','UAR'),(248,'Upper Volta','UPV'),(249,'Western Samoa','WSM'),(250,'Zaire','ZAI');

