CREATE DATABASE  IF NOT EXISTS `atlas` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `atlas`;
-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: atlas
-- ------------------------------------------------------
-- Server version	5.5.23

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

--
-- Table structure for table `arquivo`
--

DROP TABLE IF EXISTS `arquivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `arquivo` (
  `idArquivo` int(4) NOT NULL AUTO_INCREMENT,
  `idTipo` int(4) DEFAULT NULL,
  `NomeArquivo` varchar(60) NOT NULL,
  `Caminho` varchar(500) NOT NULL,
  `idUsuario` int(4) DEFAULT NULL,
  `community` int(11) DEFAULT NULL,
  PRIMARY KEY (`idArquivo`),
  KEY `idTipo` (`idTipo`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `arquivo_ibfk_1` FOREIGN KEY (`idTipo`) REFERENCES `tipo` (`idTipo`),
  CONSTRAINT `idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arquivo`
--

LOCK TABLES `arquivo` WRITE;
/*!40000 ALTER TABLE `arquivo` DISABLE KEYS */;
INSERT INTO `arquivo` VALUES (104,46,'batata.foda','C:\\xampp\\htdocs\\atlas\\atlas\\arquivos\\FODA\\ph@ph.com\\batata.foda',10,NULL),(105,86,'batata.FeatuRESB','C:\\xampp\\htdocs\\atlas\\atlas\\arquivos\\FeatuRESB\\ph@ph.com\\batata.FeatuRESB',10,NULL),(106,86,'com.featuresb','C:\\xampp\\htdocs\\atlas\\atlas\\arquivos\\FeatuRESB\\ph@ph.com\\com.featuresb',10,1),(172,46,'foda.foda','C:xampphtdocsatlasatlasarquivosFODAfoda.foda',14,1),(174,86,'featuresb.FeatuRESB','C:xampphtdocsatlasatlasarquivosFODAfeaturebs.FeatuRESB',14,1),(175,66,'czarnecki.czar','C:xampphtdocsatlasatlasarquivosFODAczarnecki.czar',14,1);
/*!40000 ALTER TABLE `arquivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagrama`
--

DROP TABLE IF EXISTS `diagrama`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diagrama` (
  `idDiagrama` int(4) NOT NULL AUTO_INCREMENT,
  `idTipo` int(2) DEFAULT NULL,
  PRIMARY KEY (`idDiagrama`),
  KEY `idTipo` (`idTipo`),
  CONSTRAINT `diagrama_ibfk_1` FOREIGN KEY (`idTipo`) REFERENCES `projeto` (`idTipo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagrama`
--

LOCK TABLES `diagrama` WRITE;
/*!40000 ALTER TABLE `diagrama` DISABLE KEYS */;
INSERT INTO `diagrama` VALUES (1,46);
/*!40000 ALTER TABLE `diagrama` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projeto`
--

DROP TABLE IF EXISTS `projeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projeto` (
  `idProjeto` int(4) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(60) NOT NULL,
  `idUsuario` int(4) DEFAULT NULL,
  `idTipo` int(2) DEFAULT NULL,
  PRIMARY KEY (`idProjeto`),
  KEY `idUsuario` (`idUsuario`),
  KEY `idTipo` (`idTipo`),
  CONSTRAINT `Projeto_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `Projeto_ibfk_2` FOREIGN KEY (`idTipo`) REFERENCES `tipo` (`idTipo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projeto`
--

LOCK TABLES `projeto` WRITE;
/*!40000 ALTER TABLE `projeto` DISABLE KEYS */;
INSERT INTO `projeto` VALUES (2,'Teste',4,46),(3,'Teste2',4,46);
/*!40000 ALTER TABLE `projeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo`
--

DROP TABLE IF EXISTS `tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipo` (
  `idTipo` int(2) NOT NULL,
  `Nome` varchar(15) NOT NULL,
  PRIMARY KEY (`idTipo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo`
--

LOCK TABLES `tipo` WRITE;
/*!40000 ALTER TABLE `tipo` DISABLE KEYS */;
INSERT INTO `tipo` VALUES (46,'Foda'),(66,'Czarnecki'),(86,'FeatuRESB');
/*!40000 ALTER TABLE `tipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuario` (
  `idUsuario` int(4) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(80) NOT NULL,
  `Email` varchar(80) NOT NULL,
  `Senha` varchar(32) NOT NULL,
  `Pais` varchar(50) DEFAULT NULL,
  `Instituicao` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (4,'A','a@a.com','12345','BR','AA'),(7,'Gabriel Senna de Oliveira','gabriel@gmail.com','1234','Não identificado','PUCRS'),(9,'Joçao','joçao@gmail.com','123','Não identificado','PUCRS'),(10,'Raphael','ph@ph.com','faca','Não identificado','Al-Qaeda'),(11,'goeuab','gapo','123','Não identificado','puc'),(12,'a','a2@a.com','2','Não identificado','2'),(14,'edirapha','edirapha@gmail.com','12345','Não identificado','Brasil'),(15,'Humano','humano@gmail.com','12345','Algeria','PUCAL'),(16,'Humano','humano2@gmail.com','1234','Afghanistan','PUCAL');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-10-27 15:39:49
CREATE DATABASE  IF NOT EXISTS `bd_projeto` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `bd_projeto`;
-- MySQL dump 10.13  Distrib 5.5.16, for Win32 (x86)
--
-- Host: 127.0.0.1    Database: bd_projeto
-- ------------------------------------------------------
-- Server version	5.5.23

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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-10-27 15:39:49
