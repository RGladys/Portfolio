<?php 
	try {
    	   $pdo = new PDO('mysql:host=localhost;dbname=portfolio;encoding=utf8', 'root', '');
    	   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    	   $pdo->setAttribute( PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC );
    	} catch( PDOException $e ) {
    	   echo 'ERROR: ' . $e->getMessage();
    	};

    if (isset($_GET['find'])) {
		$projects = $_GET['find'];
	
		if ($projects == 'all') {

			$data = $pdo->query('SELECT * FROM `projects`');
    		$array = [];
	
			foreach($data->fetchAll() as $value) {
				$array[] = $value;	
			};
			echo json_encode($array);

		} else {

			$data = $pdo->query('SELECT * FROM `projects` WHERE `id` IN (SELECT `project_id` FROM `tags` WHERE `tag` = "' . $projects . '")');
    		$array = [];
	
			foreach($data->fetchAll() as $value) {
				$array[] = $value;	
			};
			echo json_encode($array);

		}
	} else if (isset($_GET['tags'])) {
		$id = $_GET['tags'];
		$data = $pdo->query('SELECT `tag` FROM `tags` WHERE `project_id` = "' . $id . '"');

		foreach($data->fetchAll() as $value) {
			$array[] = $value;	
		};
		echo json_encode($array);
	}

?>