<?php include_once('config.php');?>
<?php ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
	
	
	$img = $_POST['fileToUpload'];
	$fileNewName = time();
    $folderPath = $_POST['dirToUpload'].'/';
	mkdir($folderPath, 0777);
	chmod($folderPath, 0777);

    $image_parts = explode(";base64,", $img);
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];
  
    $image_base64 = base64_decode($image_parts[1]);
    $fileName = 'analyze.png';
  
    $file = $folderPath . $fileName;
    file_put_contents($file, $image_base64);
	
	///////////Rotate image to 180 degree////////////
		$source_img = imagecreatefrompng($file);
		
		//$rotated_img = imagerotate($source_img, 270, 0); 
		
		imageflip($source_img, IMG_FLIP_HORIZONTAL);
		
		//$file2 = $_POST['dirToUpload'].'/'.'analyze2.png';
		
		$imageSave = imagepng($source_img, $file);
		
		//imagedestroy($source_img);
  	///////////Rotate image to 180 degree////////////
	
	
	define("DBHOST", "boddessadmin.cu1nmpejvnbg.ap-south-1.rds.amazonaws.com");
	define("DBUSER", "productadmin");
	define("DBPASS", 'Que$tr#t&i!');
	define("DBNAME", "rugs");
	
	
	$conn = new PDO("mysql:host=".DBHOST.";port=3299;dbname=".DBNAME, DBUSER, DBPASS);
	// set the PDO error mode to exception
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


	// prepare sql and bind parameters
	$session = session_id();
	$data = [
		'image_url' => 'https://vpro.boddess.com/'.$file,
		'customer_id' => $_POST['customer_id'],
		'brow_id' => $_POST['browser_session_id'],
	];
	$sql = "UPDATE user_brower SET image_url=:image_url WHERE user_id=:customer_id and brower_session_id=:brow_id ORDER BY `id` DESC LIMIT 1";
	$stmt= $conn->prepare($sql);
	$stmt->execute($data);
	
die;
?>