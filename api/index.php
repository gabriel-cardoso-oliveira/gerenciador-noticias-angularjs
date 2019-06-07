<?php
include 'db.php';
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();
$app->config('debug', false);
$app->response()->header('Content-Type', 'application/json;charset=UTF-8');

$app->get('/noticias', 'getNoticias');
$app->post('/noticias', 'AdicionarNoticia');
$app->put('/noticias', 'editarNoticia');
$app->delete('/noticias', 'excluirNoticia');
$app->get('/noticias/:id','getNoticiaId');

$app->run();

function getNoticias() {
  $sql = "SELECT id_noticia, titulo_noticia, texto_noticia, imagem_noticia, DATE_FORMAT(data_noticia, '%T %d-%m-%Y') AS data FROM noticias ORDER BY id_noticia DESC";
  
  try {
      $db = getDB();
      $stmt = $db->prepare($sql);
      $stmt->execute();
      $noticias = $stmt->fetchAll(PDO::FETCH_OBJ);
      $db = null;
      if(sizeof($noticias) == 0){
          echo '{"error":{"text":d}}';
      }else{
          echo json_encode($noticias);
      }
  } catch(PDOException $e) {
      echo '{"error":{"text":"'. $e->getMessage() .'"}}';
  }
}

function AdicionarNoticia() {
	$request = \Slim\Slim::getInstance()->request();
	$noticia = json_decode($request->getBody());
  $sql = "INSERT noticias (titulo_noticia, texto_noticia) VALUES (:titulo, :texto)";
  
	try {
		$db = getDB();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("titulo", $noticia->titulo);
		$stmt->bindParam("texto", $noticia->texto);
		$stmt->execute();
		$db = null;
		echo json_encode($noticia);
	} catch(PDOException $e) {
	  echo '{"error":{"text":"'. $e->getMessage() .'"}}';
	}
}

function editarNoticia() {
	$request = \Slim\Slim::getInstance()->request();
	$noticia = json_decode($request->getBody());
  $sql = "UPDATE noticias SET titulo_noticia =:titulo, texto_noticia =:texto WHERE id_noticia =:id";
  
	try {
		$db = getDB();
		$stmt = $db->prepare($sql);
    $stmt->bindParam("titulo", $noticia->titulo);
    $stmt->bindParam("texto", $noticia->texto);
    $stmt->bindParam("id", $noticia->id);
		$stmt->execute();
		$db = null;
		echo json_encode($noticia);
	} catch(PDOException $e) {
	  echo '{"error":{"text":"'. $e->getMessage() .'"}}';
	}
}

function excluirNoticia() {
	$request = \Slim\Slim::getInstance()->request();
	$noticia = json_decode($request->getBody());
  $sql = "DELETE FROM noticias WHERE id_noticia = :id";
	try {
		$db = getDB();
		$stmt = $db->prepare($sql);
    $stmt->bindParam("id", $noticia->id);
		$stmt->execute();
    $db = null;
    
    echo '{"Resposta": "Ok" }';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getNoticiaId($id) {
  $sql = "SELECT * FROM noticias WHERE id_noticia = :id";
  
  try {
      $db = getDB();
      $stmt = $db->prepare($sql);
      $stmt->bindParam("id", $id);
      $stmt->execute();
      $noticia = $stmt->fetchAll(PDO::FETCH_OBJ);
      $db = null;
      if(sizeof($noticia) == 0){
          echo '{"error":{"text":d}}';
      }else{
          echo json_encode($noticia);
      }
  } catch(PDOException $e) {
      echo '{"error":{"text":"'. $e->getMessage() .'"}}';
  }
}
?>