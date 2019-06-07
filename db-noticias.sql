-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.1.30-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win32
-- HeidiSQL Versão:              10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Copiando estrutura do banco de dados para db-noticias
CREATE DATABASE IF NOT EXISTS `db-noticias` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `db-noticias`;

-- Copiando estrutura para tabela db-noticias.noticias
CREATE TABLE IF NOT EXISTS `noticias` (
  `id_noticia` int(11) NOT NULL AUTO_INCREMENT,
  `titulo_noticia` text,
  `texto_noticia` text,
  `data_noticia` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `imagem_noticia` text,
  PRIMARY KEY (`id_noticia`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

-- Copiando dados para a tabela db-noticias.noticias: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `noticias` DISABLE KEYS */;
INSERT INTO `noticias` (`id_noticia`, `titulo_noticia`, `texto_noticia`, `data_noticia`, `imagem_noticia`) VALUES
	(1, 'INSS', 'Controladoria Geral da União identifica acúmulo irregular em 44 mil benefícios.', '2019-06-05 17:02:28', NULL),
	(2, 'Lava Jato', 'Beto Richa é denunciado por corrupção e lavagem de dinheiro', '2019-06-07 08:13:11', NULL),
	(3, 'Regras de Aposentadoria', 'Confederação defende manter municípios na reforma da Previdência', '2019-06-05 17:07:57', NULL),
	(4, 'Frio no Sul', 'Duas cidades de Santa Catarina têm temperaturas abaixo de zero', '2019-06-05 17:07:58', NULL),
	(5, 'Sul dos EUA', 'Alabama aprova projeto de castração química para pedófilos', '2019-06-05 17:07:58', NULL),
	(6, 'Violência', 'Mulher é morta em tentativa de assalto a ônibus no Rio', '2019-06-05 17:07:58', NULL);
/*!40000 ALTER TABLE `noticias` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
