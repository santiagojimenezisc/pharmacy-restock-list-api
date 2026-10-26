/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.20-13.0.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: pharmacy
-- ------------------------------------------------------
-- Server version	13.0.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Dumping data for table `laboratories`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `laboratories` WRITE;
/*!40000 ALTER TABLE `laboratories` DISABLE KEYS */;
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (1,'Farmacéutica Wadel',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (2,'Jaloma',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (3,'Bruluagsa',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (4,'AMSA Laboratorios',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (5,'Maver',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (6,'Grupo Bruluart',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (7,'Salucom',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (8,'Biomep',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (9,'Farmacéutica Hispanoamericana',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (10,'Opko',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (11,'Alvartis Pharma',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (12,'Mavi Farmacéutica',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (13,'Degorts Chemical',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (14,'Neolpharma',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (15,'Sons',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (16,'Vitae Laboratorios',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (17,'RAAM',1);
INSERT INTO `laboratories` (`id`, `name`, `active`) VALUES (18,'Wermar Pharmaceuticals',1);
/*!40000 ALTER TABLE `laboratories` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Dumping data for table `suppliers`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` (`id`, `name`, `phone`, `email`, `active`) VALUES (1,'FarmaLive Club de Precios Tultitlán',NULL,NULL,1);
INSERT INTO `suppliers` (`id`, `name`, `phone`, `email`, `active`) VALUES (2,'Dimen Tultitlán',NULL,NULL,1);
INSERT INTO `suppliers` (`id`, `name`, `phone`, `email`, `active`) VALUES (3,'MediceDepot Izcalli',NULL,NULL,1);
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Dumping data for table `sectors`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `sectors` WRITE;
/*!40000 ALTER TABLE `sectors` DISABLE KEYS */;
INSERT INTO `sectors` (`id`, `name`, `description`, `active`) VALUES (1,'Anaquel 1','Ubicación habitual del producto',1);
INSERT INTO `sectors` (`id`, `name`, `description`, `active`) VALUES (2,'Anaquel 2','Ubicación habitual del producto',1);
INSERT INTO `sectors` (`id`, `name`, `description`, `active`) VALUES (3,'Anaquel 3','Ubicación habitual del producto',1);
INSERT INTO `sectors` (`id`, `name`, `description`, `active`) VALUES (4,'Anaquel 4','Ubicación habitual del producto',1);
INSERT INTO `sectors` (`id`, `name`, `description`, `active`) VALUES (5,'Anaquel 5','Ubicación habitual del producto',1);
INSERT INTO `sectors` (`id`, `name`, `description`, `active`) VALUES (6,'Anaquel 6','Ubicación habitual del producto',1);
INSERT INTO `sectors` (`id`, `name`, `description`, `active`) VALUES (7,'Vitrina','Ubicación habitual del producto',1);
/*!40000 ALTER TABLE `sectors` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Dumping data for table `purchase_items`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `purchase_items` WRITE;
/*!40000 ALTER TABLE `purchase_items` DISABLE KEYS */;
INSERT INTO `purchase_items` (`id`, `name`, `active_substance`, `description`, `quantity`, `grammage`, `price`, `laboratory_id`, `supplier_id`, `sector_id`, `category`, `tags`, `is_medicine`, `is_complete`, `created_at`) VALUES (1,'Portem','Paracetamol','10 tabletas',10,'500 mg',35.50,5,1,1,'Analgésicos','[\"dolor\",\"fiebre\"]',1,0,'2026-10-04 21:00:37');
INSERT INTO `purchase_items` (`id`, `name`, `active_substance`, `description`, `quantity`, `grammage`, `price`, `laboratory_id`, `supplier_id`, `sector_id`, `category`, `tags`, `is_medicine`, `is_complete`, `created_at`) VALUES (2,'Mexapin','Ampicilina','20 cápsulas',3,'500 mg',26.00,5,1,1,'Antibiótico','[\"Infección\"]',1,0,'2026-10-05 01:00:50');
INSERT INTO `purchase_items` (`id`, `name`, `active_substance`, `description`, `quantity`, `grammage`, `price`, `laboratory_id`, `supplier_id`, `sector_id`, `category`, `tags`, `is_medicine`, `is_complete`, `created_at`) VALUES (3,'Amoxicilina','Amoxicilina','12 Cáspsulas',3,'500 mg',18.00,4,2,1,'Antibiótico','\"\"',1,0,'2026-10-05 06:31:43');
INSERT INTO `purchase_items` (`id`, `name`, `active_substance`, `description`, `quantity`, `grammage`, `price`, `laboratory_id`, `supplier_id`, `sector_id`, `category`, `tags`, `is_medicine`, `is_complete`, `created_at`) VALUES (5,'Nediclon','Diclofenaco','20 tabletas',5,'100 mg',8.80,6,1,2,'Analgésicos','[\"dolor\",\"fiebre\",\"desinflamante\"]',1,1,'2026-10-09 17:48:30');
INSERT INTO `purchase_items` (`id`, `name`, `active_substance`, `description`, `quantity`, `grammage`, `price`, `laboratory_id`, `supplier_id`, `sector_id`, `category`, `tags`, `is_medicine`, `is_complete`, `created_at`) VALUES (6,'Clamoxin 12 hrs','Amoxicilina, Ácido clavulánico','10 tabletas',3,'875/100mg',56.00,5,1,1,'Antibiótico','[]',1,0,'2026-10-25 16:42:17');
INSERT INTO `purchase_items` (`id`, `name`, `active_substance`, `description`, `quantity`, `grammage`, `price`, `laboratory_id`, `supplier_id`, `sector_id`, `category`, `tags`, `is_medicine`, `is_complete`, `created_at`) VALUES (7,'Beneventol','Cefixima','3 cápsulas',2,'400mg',86.00,5,3,1,'Antibiótico','[]',1,1,'2026-10-25 16:45:34');
/*!40000 ALTER TABLE `purchase_items` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed
