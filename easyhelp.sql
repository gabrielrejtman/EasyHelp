-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 26/01/2024 às 15:46
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
('3', 3, '3', '$2b$10$BG.wG06TzFCkYjZWjOlxS.JUR4MqbmkRrq0U//wBqeZYubutNO1Qe'),
('Jorge Silva', 2, 'Adm', '$2b$10$SfNeqia3joOZiP8fxgt4TO0NexonROls70/5Hqq7jEe3FTgoIkbOy'),
('Fulano Ciclano', 1, 'Apertador', '$2b$10$WHfSlo98FUriFvj83k6Dt.P5EOyVF4UVcLJbAnnFFi.o9JQvELnoO');

-- --------------------------------------------------------

--
-- Estrutura para tabela `ocorrência`
--

DROP TABLE IF EXISTS `ocorrência`;
CREATE TABLE IF NOT EXISTS `ocorrência` (
  `status` varchar(15) NOT NULL,
  `hora_inicio` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hora_fim` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `setor` varchar(20) DEFAULT NULL,
  `avaliacao` int DEFAULT NULL,
  `id` int NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `problema`
--

DROP TABLE IF EXISTS `problema`;
CREATE TABLE IF NOT EXISTS `problema` (
  `id` int NOT NULL,
  `titulo` varchar(50) NOT NULL,
  `descricao` varchar(9999) NOT NULL,
  `categoria` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
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

-- --------------------------------------------------------

--
-- Estrutura para tabela `tecnico`
--

DROP TABLE IF EXISTS `tecnico`;
CREATE TABLE IF NOT EXISTS `tecnico` (
  `matricula_tecnico` int NOT NULL,
  `nome` varchar(30) NOT NULL,
  `cargo` varchar(15) NOT NULL,
  `categoria` varchar(20) NOT NULL,
  PRIMARY KEY (`matricula_tecnico`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
