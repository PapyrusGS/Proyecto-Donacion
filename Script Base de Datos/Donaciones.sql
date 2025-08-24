-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: localhost    Database: Donaciones
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `Donaciones`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Donaciones` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `Donaciones`;

--
-- Table structure for table `DetalleDonacion`
--

DROP TABLE IF EXISTS `DetalleDonacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DetalleDonacion` (
  `id_detalle` int NOT NULL,
  `id_donacion` int NOT NULL,
  `id_organo` int DEFAULT NULL,
  `id_tipo_sangre` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`id_detalle`),
  KEY `id_donacion` (`id_donacion`),
  KEY `id_organo` (`id_organo`),
  KEY `id_tipo_sangre` (`id_tipo_sangre`),
  CONSTRAINT `detalledonacion_ibfk_1` FOREIGN KEY (`id_donacion`) REFERENCES `Donaciones` (`id_donacion`),
  CONSTRAINT `detalledonacion_ibfk_2` FOREIGN KEY (`id_organo`) REFERENCES `Organos` (`id_organo`),
  CONSTRAINT `detalledonacion_ibfk_3` FOREIGN KEY (`id_tipo_sangre`) REFERENCES `TiposSangre` (`id_tipo_sangre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DetalleDonacion`
--

LOCK TABLES `DetalleDonacion` WRITE;
/*!40000 ALTER TABLE `DetalleDonacion` DISABLE KEYS */;
INSERT INTO `DetalleDonacion` VALUES (1,1,NULL,1,2),(2,2,NULL,7,1),(3,3,3,NULL,1),(4,4,1,NULL,1);
/*!40000 ALTER TABLE `DetalleDonacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Donaciones`
--

DROP TABLE IF EXISTS `Donaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Donaciones` (
  `id_donacion` int NOT NULL,
  `id_hospital` int NOT NULL,
  `id_donante` int NOT NULL,
  `id_enfermera` int NOT NULL,
  `estado` enum('Completada','Rechazada','En Proceso') NOT NULL,
  `tipo_donacion` enum('Sangre','Organo') NOT NULL,
  `fecha_donacion` date NOT NULL,
  `observaciones` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_donacion`),
  KEY `id_hospital` (`id_hospital`),
  KEY `id_donante` (`id_donante`),
  KEY `id_enfermera` (`id_enfermera`),
  CONSTRAINT `donaciones_ibfk_1` FOREIGN KEY (`id_hospital`) REFERENCES `Hospitales` (`id_hospital`),
  CONSTRAINT `donaciones_ibfk_2` FOREIGN KEY (`id_donante`) REFERENCES `Donantes` (`id_donante`),
  CONSTRAINT `donaciones_ibfk_3` FOREIGN KEY (`id_enfermera`) REFERENCES `Enfermeras` (`id_enfermera`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Donaciones`
--

LOCK TABLES `Donaciones` WRITE;
/*!40000 ALTER TABLE `Donaciones` DISABLE KEYS */;
INSERT INTO `Donaciones` VALUES (1,1,1,1,'Completada','Sangre','2025-08-01','Donación exitosa'),(2,2,2,2,'En Proceso','Sangre','2025-08-10','En análisis'),(3,3,3,3,'Rechazada','Organo','2025-08-15','Donante con problemas de salud'),(4,1,4,1,'Completada','Organo','2025-08-20','Riñón apto para trasplante');
/*!40000 ALTER TABLE `Donaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Donantes`
--

DROP TABLE IF EXISTS `Donantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Donantes` (
  `id_donante` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `ci` varchar(20) NOT NULL,
  `peso` float NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `id_tipo_sangre` int DEFAULT NULL,
  `estado_donante` varchar(20) DEFAULT NULL,
  `id_estadoSalud` int DEFAULT NULL,
  PRIMARY KEY (`id_donante`),
  UNIQUE KEY `email` (`email`),
  KEY `id_tipo_sangre` (`id_tipo_sangre`),
  KEY `id_estadoSalud` (`id_estadoSalud`),
  CONSTRAINT `donantes_ibfk_1` FOREIGN KEY (`id_tipo_sangre`) REFERENCES `TiposSangre` (`id_tipo_sangre`),
  CONSTRAINT `donantes_ibfk_2` FOREIGN KEY (`id_estadoSalud`) REFERENCES `EstadoSalud` (`id_estadoSalud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Donantes`
--

LOCK TABLES `Donantes` WRITE;
/*!40000 ALTER TABLE `Donantes` DISABLE KEYS */;
INSERT INTO `Donantes` VALUES (1,'Pedro','Gutiérrez','pgutierrez@gmail.com','76543211','1234567',72,'1990-05-14',1,'Activo',1),(2,'Lucía','Ramírez','lramirez@gmail.com','70123457','2345678',65,'1985-10-23',7,'Activo',1),(3,'Carlos','Fernández','cfernandez@gmail.com','78945613','3456789',80,'1992-02-10',3,'Inactivo',2),(4,'Sofía','Pérez','sperez@gmail.com','76543212','4567890',55,'1998-07-30',5,'Activo',1);
/*!40000 ALTER TABLE `Donantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Enfermeras`
--

DROP TABLE IF EXISTS `Enfermeras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Enfermeras` (
  `id_enfermera` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  PRIMARY KEY (`id_enfermera`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Enfermeras`
--

LOCK TABLES `Enfermeras` WRITE;
/*!40000 ALTER TABLE `Enfermeras` DISABLE KEYS */;
INSERT INTO `Enfermeras` VALUES (1,'Laura Martínez','lmartinez','12345'),(2,'Ana López','alopez','12345'),(3,'María Fernández','mfernandez','12345');
/*!40000 ALTER TABLE `Enfermeras` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `EstadoSalud`
--

DROP TABLE IF EXISTS `EstadoSalud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `EstadoSalud` (
  `id_estadoSalud` int NOT NULL,
  `estado` varchar(20) NOT NULL,
  PRIMARY KEY (`id_estadoSalud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `EstadoSalud`
--

LOCK TABLES `EstadoSalud` WRITE;
/*!40000 ALTER TABLE `EstadoSalud` DISABLE KEYS */;
INSERT INTO `EstadoSalud` VALUES (1,'Buena salud'),(2,'Enfermo'),(3,'Muerte Cerebral'),(4,'Estado Vegetal');
/*!40000 ALTER TABLE `EstadoSalud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Hospitales`
--

DROP TABLE IF EXISTS `Hospitales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Hospitales` (
  `id_hospital` int NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `nombre` varchar(150) NOT NULL,
  `direccion` varchar(200) DEFAULT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `director` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_hospital`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Hospitales`
--

LOCK TABLES `Hospitales` WRITE;
/*!40000 ALTER TABLE `Hospitales` DISABLE KEYS */;
INSERT INTO `Hospitales` VALUES (1,'Hospital','Hospital General La Paz','Av. Arce #123','76543210','Dr. Juan Pérez'),(2,'Banco de Sangre','Banco de Sangre Central','Calle Bolívar #456','70123456','Dra. María López'),(3,'Hospital','Clínica del Sur','Av. Ballivián #789','78945612','Dr. Carlos Ruiz');
/*!40000 ALTER TABLE `Hospitales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InventarioOrganos`
--

DROP TABLE IF EXISTS `InventarioOrganos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InventarioOrganos` (
  `id_inventario` int NOT NULL,
  `id_organo` int NOT NULL,
  `id_hospital` int NOT NULL,
  `id_donacion` int NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `fecha_vencimiento` date DEFAULT NULL,
  `estado` enum('Disponible','Reservado','Trasplantado','Descartado') NOT NULL,
  PRIMARY KEY (`id_inventario`),
  KEY `id_organo` (`id_organo`),
  KEY `id_hospital` (`id_hospital`),
  KEY `id_donacion` (`id_donacion`),
  CONSTRAINT `inventarioorganos_ibfk_1` FOREIGN KEY (`id_organo`) REFERENCES `Organos` (`id_organo`),
  CONSTRAINT `inventarioorganos_ibfk_2` FOREIGN KEY (`id_hospital`) REFERENCES `Hospitales` (`id_hospital`),
  CONSTRAINT `inventarioorganos_ibfk_3` FOREIGN KEY (`id_donacion`) REFERENCES `Donaciones` (`id_donacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InventarioOrganos`
--

LOCK TABLES `InventarioOrganos` WRITE;
/*!40000 ALTER TABLE `InventarioOrganos` DISABLE KEYS */;
INSERT INTO `InventarioOrganos` VALUES (1,1,1,4,'2025-08-20','2025-09-05','Disponible'),(2,3,3,3,'2025-08-15','2025-08-25','Descartado');
/*!40000 ALTER TABLE `InventarioOrganos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `InventarioSangre`
--

DROP TABLE IF EXISTS `InventarioSangre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `InventarioSangre` (
  `id_inventario` int NOT NULL,
  `id_tipo_sangre` int NOT NULL,
  `id_hospital` int NOT NULL,
  `id_donacion` int NOT NULL,
  `cantidad` int NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `fecha_vencimiento` date NOT NULL,
  `estado` enum('Disponible','Usada','Vencida','Descartada') NOT NULL,
  PRIMARY KEY (`id_inventario`),
  KEY `id_tipo_sangre` (`id_tipo_sangre`),
  KEY `id_hospital` (`id_hospital`),
  KEY `id_donacion` (`id_donacion`),
  CONSTRAINT `inventariosangre_ibfk_1` FOREIGN KEY (`id_tipo_sangre`) REFERENCES `TiposSangre` (`id_tipo_sangre`),
  CONSTRAINT `inventariosangre_ibfk_2` FOREIGN KEY (`id_hospital`) REFERENCES `Hospitales` (`id_hospital`),
  CONSTRAINT `inventariosangre_ibfk_3` FOREIGN KEY (`id_donacion`) REFERENCES `Donaciones` (`id_donacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InventarioSangre`
--

LOCK TABLES `InventarioSangre` WRITE;
/*!40000 ALTER TABLE `InventarioSangre` DISABLE KEYS */;
INSERT INTO `InventarioSangre` VALUES (1,1,1,1,2,'2025-08-01','2025-09-01','Disponible'),(2,7,2,2,1,'2025-08-10','2025-09-10','Usada');
/*!40000 ALTER TABLE `InventarioSangre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Organos`
--

DROP TABLE IF EXISTS `Organos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Organos` (
  `id_organo` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id_organo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Organos`
--

LOCK TABLES `Organos` WRITE;
/*!40000 ALTER TABLE `Organos` DISABLE KEYS */;
INSERT INTO `Organos` VALUES (1,'Riñón','Órgano vital encargado de filtrar la sangre'),(2,'Hígado','Órgano que metaboliza nutrientes y elimina toxinas'),(3,'Corazón','Órgano que bombea la sangre'),(4,'Pulmón','Órgano que oxigena la sangre');
/*!40000 ALTER TABLE `Organos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TiposSangre`
--

DROP TABLE IF EXISTS `TiposSangre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TiposSangre` (
  `id_tipo_sangre` int NOT NULL,
  `tipo` varchar(3) NOT NULL,
  `factor_rh` char(1) NOT NULL,
  PRIMARY KEY (`id_tipo_sangre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TiposSangre`
--

LOCK TABLES `TiposSangre` WRITE;
/*!40000 ALTER TABLE `TiposSangre` DISABLE KEYS */;
INSERT INTO `TiposSangre` VALUES (1,'A','+'),(2,'A','-'),(3,'B','+'),(4,'B','-'),(5,'AB','+'),(6,'AB','-'),(7,'O','+'),(8,'O','-');
/*!40000 ALTER TABLE `TiposSangre` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-23 20:25:14
