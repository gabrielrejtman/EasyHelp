-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 12/01/2024 às 15:06
-- Versão do servidor: 8.2.0
-- Versão do PHP: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `easyhelp`
--
CREATE DATABASE IF NOT EXISTS `easyhelp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `easyhelp`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `administrador`
--

DROP TABLE IF EXISTS `administrador`;
CREATE TABLE IF NOT EXISTS `administrador` (
  `nome` varchar(30) NOT NULL,
  `matricula_adm` int NOT NULL,
  `cargo` varchar(20) NOT NULL,
  `senha_adm_hash` varchar(60) NOT NULL,
  PRIMARY KEY (`matricula_adm`),
  UNIQUE KEY `matricula_adm` (`matricula_adm`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Despejando dados para a tabela `administrador`
--

INSERT INTO `administrador` (`nome`, `matricula_adm`, `cargo`, `senha_adm_hash`) VALUES
('', 123, '', '$2b$10$bkhjVbTqukzKOwwaOUA8WuUNWprJvOKyMrIsYFNu9gRp1YuKyYOCS'),
('', 133, '', '$2b$10$KHtdnzxw2hgT1iXw03IVLOPAVZ7TOF/y9e49zlfpcAI5KhnXqP5Ty'),
('', 777, '', '$2b$10$MC.isObD86telsEk3tKUEuJLGvie5yE/nGWsFSiH8VAfJ1/oZMcBe'),
('Jorge Silva', 7712, 'Chefe Teste', '$2b$10$eG7NNfhw1bTXy8lcB9Mwz.p1nsTAdeBg5JKwUYXvJBUb1XCr1M4nO'),
('Jose da Silva', 11112, 'Lider', '$2b$10$9k4eImkLib1smbIgWbAzN..GcKV1xaoPofbyPFS7NtL1WsYIc9cSC'),
('Fulano de Tal', 1334, 'Tester', '$2b$10$A5QJ0c7w5TRKy.KVh00Tt.GoCsWY88tbM/q07FCLnTkIGqPF031j6'),
('Raimundo Silva', 444, 'Admin Teste', '$2b$10$thvUCYzcZPrxQ6YbgdIFEuU7wKmMVoYHbyDj/4JmSmdJ4RrJk7HpS');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pesquisa`
--

DROP TABLE IF EXISTS `pesquisa`;
CREATE TABLE IF NOT EXISTS `pesquisa` (
  `entrada` varchar(255) DEFAULT NULL,
  `idPesquisa` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idPesquisa`),
  UNIQUE KEY `idPesquisa` (`idPesquisa`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `solucao`
--

DROP TABLE IF EXISTS `solucao`;
CREATE TABLE IF NOT EXISTS `solucao` (
  `idSolucao` int NOT NULL AUTO_INCREMENT,
  `nome_solucao` varchar(30) DEFAULT NULL,
  `resposta` varchar(255) NOT NULL,
  `categoria` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idSolucao`),
  UNIQUE KEY `idSolucao` (`idSolucao`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `supervisor`
--

DROP TABLE IF EXISTS `supervisor`;
CREATE TABLE IF NOT EXISTS `supervisor` (
  `matricula_supervisor` int NOT NULL,
  `linha` varchar(4) DEFAULT NULL,
  `setor` varchar(15) NOT NULL,
  `senha_supervisor_hash` varchar(60) NOT NULL,
  PRIMARY KEY (`matricula_supervisor`),
  UNIQUE KEY `matricula_supervisor` (`matricula_supervisor`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
