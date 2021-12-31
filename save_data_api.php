<?php include_once('config.php');?>


<?php
define("DBHOST", "boddessadmin.cu1nmpejvnbg.ap-south-1.rds.amazonaws.com");
	define("DBUSER", "productadmin");
	define("DBPASS", 'Que$tr#t&i!');
	define("DBNAME", "rugs");

try {
	if(isset($_REQUEST['customer_id']))
    {
		//$conn = new PDO("mysql:host=".DBHOST.";dbname=".DBNAME, DBUSER, DBPASS);
		$conn = new PDO("mysql:host=".DBHOST.";port=3299;dbname=".DBNAME, DBUSER, DBPASS);
		// set the PDO error mode to exception
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		// prepare sql and bind parameters

		$stmt = $conn->prepare("INSERT INTO user_brower (user_id, brower_session_id,age,question_ans)
		VALUES (:usid, :bsid, :ag, :quesans)");
		$stmt->bindParam(':usid', $usid);
		$stmt->bindParam(':bsid', $bsid);
		$stmt->bindParam(':ag', $age);
		$stmt->bindParam(':quesans', $quesans);
		// insert a row
		$usid = htmlspecialchars($_REQUEST['customer_id']);
		$bsid = htmlspecialchars(isset($_REQUEST['browser_session_id']) ? $_REQUEST['browser_session_id'] : "api" );
		$age = htmlspecialchars(isset($_REQUEST['age']) ? $_REQUEST['age'] : 0);
        $quesans = htmlspecialchars(isset($_REQUEST['Question']) ? $_REQUEST['Question'] : null);
        // echo "ok 1";
        
		if($stmt->execute())
		{
			$img = $_REQUEST['fileToUpload'];
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
        
            ////////Check image with python
            $my_command = escapeshellcmd("/home/ubuntu/miniconda3/bin/python3 /var/www/html/bodyshop/python/webcam_record.py ".UPLOAD_DIR.$file);
            $my_command2 = escapeshellcmd("/home/ubuntu/miniconda3/bin/python3 /var/www/html/bodyshop/python/skin/realtime_demo.py --image ".UPLOAD_DIR.$file);
                

            $command_output = shell_exec($my_command);
            $command_output2 = shell_exec($my_command2);
            // print_r($command_output);
            ////////Check image with python

            $json['img'] = "https://vpro.boddess.com/".$file;
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
            
            $conn = null;
            
            //$conn = new PDO("mysql:host=".DBHOST.";dbname=".DBNAME, DBUSER, DBPASS);
			$conn = new PDO("mysql:host=".DBHOST.";port=3299;dbname=".DBNAME, DBUSER, DBPASS);
			// set the PDO error mode to exception
			$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

			// prepare sql and bind parameters
			
			$stmt2 = $conn->prepare("INSERT INTO user_skin_result (user_id, wrinkles, dar_circle, texture, spots,alll,age)
			VALUES (:usid, :wrinkle, :dar_circl, :textur, :spot, :al, :ag)");
			$stmt2->bindParam(':usid', $usid);
			$stmt2->bindParam(':wrinkle', $wrinkle);
			$stmt2->bindParam(':dar_circl', $dar_circl);
			$stmt2->bindParam(':textur', $textur);
			$stmt2->bindParam(':spot', $spot);
			$stmt2->bindParam(':al', $al);
			$stmt2->bindParam(':ag', $ag);
        
            

            ////////////////////////
            $arr2=json_decode(json_encode(json_decode($json['analyze'])), true); ;
            // echo "ok 2";
           
            $spots="";
            $wrinkles="";
            $darkCircle="";
            $texture="";
            $health="";
            $alll="";
            // echo "ok 3";

            // die(print_r($arr2->age));

            if(!$arr2['age']){
              $arr2['age']=34;  
            }
            else{
              $agey=$arr2['age'];
            }
            /////////Spots
            if($arr2['age']<14){
                $rand_num = floatval('0.'.rand());
                $spots = floor($rand_num * 10) + 0;
                
            }else if($arr2['age']>=14 && $arr2['age']<25){
                $rand_num = floatval('0.'.rand());
                $spots = floor($rand_num * 20) + 40;
                
            }else if($arr2['age']>=25 && $arr2['age']<45){
                $rand_num = floatval('0.'.rand());
                $spots = floor($rand_num * 30) + 10;
                
            }else{
                $rand_num = floatval('0.'.rand());
                $spots = floor($rand_num * 20) + 30;
            }
            // echo "ok 3";
            /////////Dark Circle
            if($arr2['age']<25){
                $rand_num = floatval('0.'.rand());
                $darkCircle = floor($rand_num * 30) + 10;
                
            }else if($arr2['age']>=25 && $arr2['age']<40){
                $rand_num = floatval('0.'.rand());
                $darkCircle = floor($rand_num * 30) + 40;
                
            }else{
                $rand_num = floatval('0.'.rand());
                $darkCircle = floor($rand_num * 20) + 30;
                
            }
            
            // echo "ok 4";
            
            /////////Wrinkles
            if($arr2['age']<25){
                $rand_num = floatval('0.'.rand());
                $wrinkles = floor($rand_num * 10) + 0;
                
            }else if($arr2['age']>=25 && $arr2['age']<40){
                $rand_num = floatval('0.'.rand());
                $wrinkles = floor($rand_num * 20) + 20;
                
            }else{
                $rand_num = floatval('0.'.rand());
                $wrinkles = floor($rand_num * 30) + 40;
                
            }
            
            // die($rand_num);
            if($arr2['gender']=='F'){
                $spots = $spots+5;
                $darkCircle = $darkCircle+5;
                $wrinkles = $spots-5;
            }
            /////////Texture
            $texture = 100-round(($spots+$darkCircle+$wrinkles)/3);
            $alll = round(($texture+$spots+$darkCircle+$wrinkles)/4);
            
            // echo "ok 5";
            


            ///////////////////////////

			// insert a row
			
			$wrinkle = htmlspecialchars($wrinkles);
			$textur = htmlspecialchars($texture);
			$spot = htmlspecialchars($spots);
			$al = htmlspecialchars($alll);
			$ag = htmlspecialchars($arr2['age']);
			$dar_circl = htmlspecialchars($darkCircle);
            // echo "ok 6";
		
		
			if($stmt2->execute())
			{
                // echo json_encode();
                $conn = null;
                //$conn = new PDO("mysql:host=".DBHOST.";dbname=".DBNAME, DBUSER, DBPASS);
				$conn = new PDO("mysql:host=".DBHOST.";port=3299;dbname=".DBNAME, DBUSER, DBPASS);
                // set the PDO error mode to exception
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
                // prepare sql and bind parameters
        
                $stmt12 = $conn->prepare("Select * from user_brower where user_id = :usid order by id desc limit 1");
                $stmt12->bindParam(':usid', $usid);
            
            
        
                // insert a row
                // $usid = htmlspecialchars($_REQUEST['customer_id']);
            
                $stmt12->execute();
                // $result = $stmt1->setFetchMode(PDO::FETCH_ASSOC);
                $row=$stmt12->fetch();
        
                $stmt11 = $conn->prepare("Select * from user_skin_result where user_id = :usid order by id desc limit 1");
                $stmt11->bindParam(':usid', $usid);
            
            
        
                // insert a row
            
                $stmt11->execute();
                // $result = $stmt1->setFetchMode(PDO::FETCH_ASSOC);
                $row1=$stmt11->fetch();
                
                $params = array(
                    "wrinkles" =>$row1['wrinkles'],
                    "texture" =>$row1['texture'],
                    "spots" =>$row1['spots'],
                    "darkCircle" =>$row1['dar_circle']
                   
                    
                );
            
                $url="https://vpro.boddess.com/simpleadminpanel/api/get-product-sku";
            
                $postData = '';
                //create name value pairs seperated by &
                foreach($params as $k => $v) 
                { 
                    $postData .= $k . '='.$v.'&'; 
                }
                $postData = rtrim($postData, '&');
                
              
                $ch = curl_init();  
            
            
               
                curl_setopt($ch, CURLOPT_HEADER, 1);
               
                curl_setopt($ch,CURLOPT_URL,$url);
                curl_setopt($ch,CURLOPT_RETURNTRANSFER,true);
                curl_setopt($ch, CURLOPT_HEADER, false);
                
                curl_setopt($ch, CURLOPT_POST, count($postData));
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);    
                    curl_setopt($ch, CURLOPT_HEADER, false);
            
                $output=curl_exec($ch);
               
                $output=json_decode($output);
            
                curl_close($ch);
                // die(json_encode($output->data->wrinkle));
                //echo json_encode(['user_id'=>$row['user_id'],'id'=>$row['id'],'brower_session_id'=>$row['brower_session_id'],'created_at'=>$row['created_at'],'sku_code'=>["2000000672","2000000709","2000000708","2000000576","2000000669","2000000671"]]);
                echo '{"skin_analysis_result":'.json_encode($json).',"user_id":"'.$row['user_id'].'","age":"'.$row1['age'].'","id":"'.$row['id'].'","brower_session_id":"'.$row['brower_session_id'].'","created_at":"'.$row['created_at'].'",
                        "data":[
                         {
                          "concernArea":"wrinkle",
                          "score":'.$row1['wrinkles'].',
                          "products_sku":'.json_encode($output->data->wrinkle).'
                          
                         },
                         {
                          "concernArea":"dark_circle",
                          "score":"'.$row1['dar_circle'].'",
                          "products_sku":'.json_encode($output->data->darkCircle).'
                          
                         },
                         {
                          "concernArea":"spots",
                          "score":"'.$row1['spots'].'",
                          "products_sku":'.json_encode($output->data->spots).'
                          
                         },
                         {
                          "concernArea":"textures",
                          "score":"'.$row1['texture'].'",
                          "products_sku":'.json_encode($output->data->texture).'
                          
                         },
                         {
                            "concernArea":"all",
                            "score":"'.$row1['alll'].'",
                            "products_sku":'.json_encode(array_merge($output->data->wrinkle,$output->data->darkCircle,$output->data->spots,$output->data->texture)).'
                            
                        }
                          ]}';
			}
			else
			{
				echo json_encode(["result"=>"false","msg"=>"Save Failed"]);

			}
            // echo "ok 7";

            
      

		}
		else
		{
			echo json_encode(["result"=>"false","msg"=>"Registration Failed"]);

		}

	}
	else
	{
		echo json_encode(["result"=>"false","msg"=>"Parameter Missing"]);
	}
    // echo "New records created successfully";
}
catch(PDOException $e)
{
echo "Error: " . $e->getMessage();
}
catch(Exception $e)
{
echo "Error: " . $e->getMessage();
}
$conn = null;

?>
