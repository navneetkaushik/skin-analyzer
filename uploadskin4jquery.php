<?php include_once('config.php');?>
<?php 
$img = $_POST['fileToUpload'];
// die(json_encode($img));
	$fileNewName = time();
    $folderPath = 'uploads/'.$fileNewName.'/';
	mkdir($folderPath, 0777);
	chmod($folderPath, 0777);
  
    $image_parts = explode(";base64,", $img);
    $image_type_aux = explode("image/", $image_parts[0]);
    $image_type = $image_type_aux[1];
  
    $image_base64 = base64_decode($image_parts[1]);
    $fileName = '0.'.$image_type;
  
    $file = $folderPath . $fileName;
    file_put_contents($file, $image_base64);
	
	
	
	







	$exif = exif_read_data($file);
	
	
	
	
	if (isset($exif['Orientation']))
		{
		  switch ($exif['Orientation'])
		  {
			case 3:
				// Need to rotate 180 deg
				$imageResource = imagecreatefromjpeg($file);
				$image = imagerotate($imageResource, 180, 0);
				imagejpeg($image, $file, 100);
			  	break;
		
			case 6:
			  	// Need to rotate 90 deg clockwise
			 	$imageResource = imagecreatefromjpeg($file);
				$image = imagerotate($imageResource, 270, 0);
				imagejpeg($image, $file, 100);	
			  	break;
		
			case 8:
			  	// Need to rotate 90 deg counter clockwise
			  	$imageResource = imagecreatefromjpeg($file);
			  	$image = imagerotate($imageResource, 90, 0);
				imagejpeg($image, $file, 100);
			  break;
		  }
		}else{
			if($exif['ExifImageWidth']){
				$imageResource = imagecreatefromjpeg($file);
				//$image = imagerotate($imageResource, -270, 0);
				//$file = $folderPath . $fileName;
				imagejpeg($image, $file, 100);
			}
		}
	
	
	
	
	
	
	
	
	



  
    ////////Check image with python
	$my_command = escapeshellcmd("/home/yeppar/miniconda3/envs/bodyshop/bin/python /var/www/html/bodyshop/python/webcam_record.py ".UPLOAD_DIR.$file);
	$my_command2 = escapeshellcmd("/home/yeppar/miniconda3/envs/bodyshop/bin/python /var/www/html/bodyshop/python/skin/realtime_demo.py --image ".UPLOAD_DIR.$file);
	$my_command3 = escapeshellcmd("/home/yeppar/miniconda3/envs/bodyshop/bin/python /var/www/html/bodyshop/python/detect.py ".UPLOAD_DIR.$file);

	$command_output = shell_exec($my_command);
	$command_output2 = shell_exec($my_command2);
	$command_output3 = shell_exec($my_command3);
	//print_r($command_output);
	////////Check image with python
	
	$json['exif'] = $exif;
	$json['img'] = $file;
	$json['dir'] = $folderPath;
	
	$img = BASEURL.$file; 
	// Open image as a string 
	$data = file_get_contents($img); 
	// getimagesizefromstring function accepts image data as string 
	list($width, $height, $type, $attr) = getimagesizefromstring($data);
	$json['imgwidth'] = $width;
	$json['imgheight'] = $height;
	
	
	
	
	$json['landmarks'] = $command_output;
	$json['analyze'] = $command_output2;
	
	echo json_encode($json);
	
die;
?>