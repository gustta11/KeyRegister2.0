CREATE DATABASE  IF NOT EXISTS `keyregister` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `keyregister`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: keyregister
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `id_cursos` int NOT NULL AUTO_INCREMENT,
  `curso_nome` varchar(100) DEFAULT NULL,
  `curso_modalidade` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_cursos`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (1,'Desenvolvimento de sistema','TI Sofware');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disciplinas`
--

DROP TABLE IF EXISTS `disciplinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disciplinas` (
  `id_disciplinas` int NOT NULL AUTO_INCREMENT,
  `disciplinas_nome` varchar(100) NOT NULL,
  `turma_idturma` int NOT NULL,
  PRIMARY KEY (`id_disciplinas`),
  KEY `fk_disciplinas_turma1_idx` (`turma_idturma`),
  CONSTRAINT `fk_disciplinas_turma1` FOREIGN KEY (`turma_idturma`) REFERENCES `turma` (`id_turma`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disciplinas`
--

LOCK TABLES `disciplinas` WRITE;
/*!40000 ALTER TABLE `disciplinas` DISABLE KEYS */;
INSERT INTO `disciplinas` VALUES (1,'Banco de dados',1);
/*!40000 ALTER TABLE `disciplinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docentes`
--

DROP TABLE IF EXISTS `docentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docentes` (
  `id_docentes` int NOT NULL AUTO_INCREMENT,
  `matricula_docentes` int NOT NULL,
  `contato_docentes` varchar(11) DEFAULT NULL,
  `areaDeAtuacao_docentes` varchar(100) NOT NULL,
  `nome_docentes` varchar(100) NOT NULL,
  PRIMARY KEY (`id_docentes`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docentes`
--

LOCK TABLES `docentes` WRITE;
/*!40000 ALTER TABLE `docentes` DISABLE KEYS */;
INSERT INTO `docentes` VALUES (1,100522,'75993595953','T.I','Marcos Vínicius'),(2,100525,'7588141465','Eletromecânica','Gizelle Karine');
/*!40000 ALTER TABLE `docentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionarios` (
  `id_funcionarios` int NOT NULL,
  `funcionarios_nome` varchar(100) NOT NULL,
  `funcionarios_contato` varchar(100) DEFAULT NULL,
  `funcionarios_matricula` int NOT NULL,
  PRIMARY KEY (`id_funcionarios`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (1,'Jadiane ','75911636598',100105);
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id_reservas` int NOT NULL AUTO_INCREMENT,
  `horario_inicial` time DEFAULT NULL,
  `horario_final` time DEFAULT NULL,
  `salas_id` int NOT NULL,
  `cursos_idcursos` int NOT NULL,
  `turma_idturma` int NOT NULL,
  `docentes_id` int NOT NULL,
  `disciplinas_idDisciplinas` int NOT NULL,
  `data` date DEFAULT NULL,
  PRIMARY KEY (`id_reservas`),
  KEY `fk_reservas_salas1_idx` (`salas_id`),
  KEY `fk_reservas_cursos1_idx` (`cursos_idcursos`),
  KEY `fk_reservas_turma1_idx` (`turma_idturma`),
  KEY `fk_reservas_docentes1_idx` (`docentes_id`),
  KEY `fk_reservas_disciplinas1_idx` (`disciplinas_idDisciplinas`),
  CONSTRAINT `fk_reservas_cursos1` FOREIGN KEY (`cursos_idcursos`) REFERENCES `cursos` (`id_cursos`),
  CONSTRAINT `fk_reservas_disciplinas1` FOREIGN KEY (`disciplinas_idDisciplinas`) REFERENCES `disciplinas` (`id_disciplinas`),
  CONSTRAINT `fk_reservas_docentes1` FOREIGN KEY (`docentes_id`) REFERENCES `docentes` (`id_docentes`),
  CONSTRAINT `fk_reservas_salas1` FOREIGN KEY (`salas_id`) REFERENCES `salas` (`id_salas`),
  CONSTRAINT `fk_reservas_turma1` FOREIGN KEY (`turma_idturma`) REFERENCES `turma` (`id_turma`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,'18:40:00','21:40:00',1,1,1,1,1,'2024-10-26');
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salas`
--

DROP TABLE IF EXISTS `salas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salas` (
  `id_salas` int NOT NULL AUTO_INCREMENT,
  `salas_nome` varchar(100) NOT NULL,
  `numero` varchar(25) NOT NULL,
  `bloco` varchar(45) NOT NULL,
  PRIMARY KEY (`id_salas`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salas`
--

LOCK TABLES `salas` WRITE;
/*!40000 ALTER TABLE `salas` DISABLE KEYS */;
INSERT INTO `salas` VALUES (1,'Laboratorio de sistema','S/N','A');
/*!40000 ALTER TABLE `salas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turma`
--

DROP TABLE IF EXISTS `turma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turma` (
  `id_turma` int NOT NULL AUTO_INCREMENT,
  `nome_turma` varchar(45) DEFAULT NULL,
  `cursos_idcursos` int NOT NULL,
  `turno_turma` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_turma`),
  KEY `fk_turma_cursos_idx` (`cursos_idcursos`),
  CONSTRAINT `fk_turma_cursos` FOREIGN KEY (`cursos_idcursos`) REFERENCES `cursos` (`id_cursos`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turma`
--

LOCK TABLES `turma` WRITE;
/*!40000 ALTER TABLE `turma` DISABLE KEYS */;
INSERT INTO `turma` VALUES (1,'Desenvolvimento  sistema 2024',1,'Noturno');
/*!40000 ALTER TABLE `turma` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-26 16:30:34
