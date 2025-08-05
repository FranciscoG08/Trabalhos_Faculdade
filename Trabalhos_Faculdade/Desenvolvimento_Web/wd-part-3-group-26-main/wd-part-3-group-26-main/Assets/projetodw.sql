-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 09-Jan-2024 às 17:41
-- Versão do servidor: 8.0.31
-- versão do PHP: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `projetodw`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `migration`
--

DROP TABLE IF EXISTS `migration`;
CREATE TABLE IF NOT EXISTS `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `migration`
--

INSERT INTO `migration` (`version`, `apply_time`) VALUES
('m000000_000000_base', 1704064079),
('m150214_044831_init_user', 1704064614);

-- --------------------------------------------------------

--
-- Estrutura da tabela `profile`
--

DROP TABLE IF EXISTS `profile`;
CREATE TABLE IF NOT EXISTS `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `full_name` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `timezone` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `profile_user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Extraindo dados da tabela `profile`
--

INSERT INTO `profile` (`id`, `user_id`, `created_at`, `updated_at`, `full_name`, `timezone`) VALUES
(1, 1, '2023-12-31 23:16:54', NULL, 'the one', NULL),
(2, 2, '2024-01-08 17:21:14', '2024-01-08 17:21:14', NULL, NULL),
(3, 3, '2024-01-08 18:25:33', '2024-01-08 18:25:33', NULL, NULL),
(5, 5, '2024-01-08 18:57:36', '2024-01-08 18:57:36', NULL, NULL),
(6, 6, '2024-01-08 19:36:41', '2024-01-08 19:36:41', 'Guedes', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `can_admin` smallint NOT NULL DEFAULT '0',
  `can_utilizador` smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Extraindo dados da tabela `role`
--

INSERT INTO `role` (`id`, `name`, `created_at`, `updated_at`, `can_admin`, `can_utilizador`) VALUES
(1, 'Admin', '2023-12-31 23:16:54', NULL, 1, 0),
(2, 'User', '2023-12-31 23:16:54', NULL, 0, 0),
(3, 'Utilizadores', NULL, NULL, 0, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL,
  `status` smallint NOT NULL,
  `email` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `auth_key` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `access_token` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `logged_in_ip` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `logged_in_at` timestamp NULL DEFAULT NULL,
  `created_ip` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `banned_at` timestamp NULL DEFAULT NULL,
  `banned_reason` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_email` (`email`),
  UNIQUE KEY `user_username` (`username`),
  KEY `user_role_id` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `role_id`, `status`, `email`, `username`, `password`, `auth_key`, `access_token`, `logged_in_ip`, `logged_in_at`, `created_ip`, `created_at`, `updated_at`, `banned_at`, `banned_reason`) VALUES
(1, 1, 1, 'neo@neo.com', 'neo', '$2y$13$dyVw4WkZGkABf2UrGWrhHO4ZmVBv.K4puhOL59Y9jQhIdj63TlV.O', 'AWESLxEbG9-QGxEaGUZv7OxNYA2607xB', '1MMSIccdUXO5tjk-4HIiB_BOwc9KxobP', '::1', '2024-01-09 17:37:30', NULL, '2023-12-31 23:16:54', NULL, NULL, NULL),
(2, 2, 1, NULL, 'Teste', '$2y$13$kXXYFnK7v8NDUN8Is2UVruEJr6RPZ.LELvtOHiPdZrUP6BwIMyhhm', 'BKwseh78WmjemnlfSpc_OijkClbmWIRW', 'yldtfuaNnL9lj1H3e6PyRz6nxUZf2Tnt', '::1', '2024-01-08 17:21:14', '::1', '2024-01-08 17:21:14', '2024-01-08 17:21:14', NULL, NULL),
(3, 2, 1, NULL, 'CR7', '$2y$13$ILtaV6RuGBuTgrYVWVxI/egM4TneE3vhsBZsI/qApgq4SCowPjNcq', 'gOOPrYRYGjNHYw2mW0KlrbZVqsJIWTJo', '6JLucGZjWo3x2MKROpE03AN5BUWJcTrk', '::1', '2024-01-09 17:37:48', '::1', '2024-01-08 18:25:33', '2024-01-08 18:25:33', NULL, NULL),
(5, 2, 1, NULL, '111', '$2y$13$pnEQZkv3GDKIQ/dqblf9yuVFn9G.noeroLSb66U4s/JW0OVXVM.ge', 'UyHcXfvZyytYX1YfRWXLX6nyOrRYIMAF', 'JBoU6ZewJ8tvdIPpG977Zm9yD-3UkWpk', '::1', '2024-01-08 18:57:37', '::1', '2024-01-08 18:57:36', '2024-01-08 18:57:36', NULL, NULL),
(6, 1, 1, 'guedes@hotmail.com', 'JFPG', '$2y$13$fLSdGhmhlwDlojQ66Y7eNO4HUzam5T8zPbSwnC8zVWZfdFs7dvEEq', NULL, NULL, '::1', '2024-01-08 19:36:58', NULL, '2024-01-08 19:36:41', '2024-01-08 19:36:41', NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `user_auth`
--

DROP TABLE IF EXISTS `user_auth`;
CREATE TABLE IF NOT EXISTS `user_auth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `provider` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `provider_id` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `provider_attributes` text COLLATE utf8mb3_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_auth_provider_id` (`provider_id`),
  KEY `user_auth_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `user_token`
--

DROP TABLE IF EXISTS `user_token`;
CREATE TABLE IF NOT EXISTS `user_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `type` smallint NOT NULL,
  `token` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `data` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `expired_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_token_token` (`token`),
  KEY `user_token_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `utilizadores`
--

DROP TABLE IF EXISTS `utilizadores`;
CREATE TABLE IF NOT EXISTS `utilizadores` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `utilizadores`
--

INSERT INTO `utilizadores` (`Id`, `UserName`, `Password`) VALUES
(3, 'FG', '$2y$13$q8KnYKjXIqUnUxA7PDZ5JuDoq6i19vOsaaOmFC'),
(6, 'CR7', '$2y$13$WdaASYXey4.4AyWNwqRjnerLDy18D5J0FU686u'),
(5, 'admin1', '$2y$13$YqNt4yrr5cvvS6JyGa6Ihe9b105pFBXfbWrWmS'),
(7, 'batata', '$2y$13$UrW6N4elBInP4ehVJ.iftOapucYixd0CJbk.jw'),
(8, '453', '$2y$13$WENCZ3dQgX/tWxYhPWjv2OvTKXyRe9ILHSGhBa');

-- --------------------------------------------------------

--
-- Estrutura da tabela `veiculos`
--

DROP TABLE IF EXISTS `veiculos`;
CREATE TABLE IF NOT EXISTS `veiculos` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Marca` varchar(45) NOT NULL,
  `Modelo` varchar(45) NOT NULL,
  `Ano` date NOT NULL,
  `Preco` float NOT NULL,
  `Combustivel` varchar(45) NOT NULL,
  `Caixa` varchar(45) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Extraindo dados da tabela `veiculos`
--

INSERT INTO `veiculos` (`Id`, `Marca`, `Modelo`, `Ano`, `Preco`, `Combustivel`, `Caixa`) VALUES
(5, 'BMW', 'Serie 1', '2015-08-20', 121, 'Gasolina', 'Manual'),
(4, 'Ford', 'Focus', '2018-08-20', 32400, 'Gasolina', 'Manual'),
(6, 'BMW', 'Serie 1', '2015-08-09', 121, 'Gasolina', 'Manual'),
(7, 'Mercedes', 'Classe A', '0000-00-00', 2878900, 'Gasolina', 'Manual'),
(18, 'Ferrari', 'Classe A', '2015-08-06', 27880, 'Gasolina', 'Automatica'),
(16, 'Toyota', 'Yaris', '2015-08-31', 32400, 'Gasolina', 'Manual'),
(10, 'Ferrari', 'Roma', '2023-09-01', 231231000, 'Gasolinas', 'Manuala'),
(19, 'Mercedes', 'Classe A', '2015-08-20', 11, 'Diesel', 'Manual'),
(15, 'Opel', 'Corsa', '1999-04-12', 5000, 'Diesel', 'Automatica'),
(34, 'CR7', 'cr7', '1999-04-12', 11, 'Gasolina', 'Manual'),
(23, 'Porsche', '911', '2015-08-06', 140000, 'Gasolina', 'Manual'),
(24, 'Ferrari', 'Roma', '2015-08-06', 121, 'Elétrico', 'Automatica'),
(39, '5', '5', '0000-00-00', 5, 'Gasolina', 'Manual');

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Limitadores para a tabela `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

--
-- Limitadores para a tabela `user_auth`
--
ALTER TABLE `user_auth`
  ADD CONSTRAINT `user_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Limitadores para a tabela `user_token`
--
ALTER TABLE `user_token`
  ADD CONSTRAINT `user_token_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
