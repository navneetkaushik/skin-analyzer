<?php include_once('config.php');?>


<?php
define("DBHOST", "boddessadmin.cu1nmpejvnbg.ap-south-1.rds.amazonaws.com");
define("DBUSER", "productadmin");
define("DBPASS", 'Que$tr#t&i!');
define("DBNAME", "rugs");

try {
	if(isset($_REQUEST['customer_id']) && isset($_REQUEST['browser_session_id']))
    {
		$conn = new PDO("mysql:host=".DBHOST.";port=3299;dbname=".DBNAME, DBUSER, DBPASS);
		// set the PDO error mode to exception
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		
		// insert a row
		$usid = htmlspecialchars($_REQUEST['customer_id']);
		$browid = htmlspecialchars($_REQUEST['browser_session_id']);

		// prepare sql and bind parameters

		$stmt = $conn->prepare("Select * from user_brower where user_id = :usid and brower_session_id = :browid order by id desc limit 1");
		$stmt->bindParam(':usid', $usid);
		$stmt->bindParam(':browid', $browid);
	
		$stmt->execute();
        // $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
		$row=$stmt->fetch();
		

		$stmt1 = $conn->prepare("Select * from user_skin_result where user_id = :usid and brower_session_id = :browid order by id desc limit 1");
		$stmt1->bindParam(':usid', $usid);
		$stmt1->bindParam(':browid', $browid);
	
	

		// insert a row
	
		$stmt1->execute();
        // $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
		$row1=$stmt1->fetch();
		
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
		echo '{"user_id":"'.$row['user_id'].'","age":"'.$row1['age'].'","id":"'.$row['id'].'","brower_session_id":"'.$row['brower_session_id'].'","created_at":"'.$row['created_at'].'","image_url":"'.$row['image_url'].'",
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
		echo json_encode(["result"=>"false","msg"=>"Parameter Missing"]);
	}
    // echo "New records created successfully";
}
catch(PDOException $e)
{
	echo "Error1: " . $e->getMessage();
}
catch(Exception $e)
{
	echo "Error2: " . $e->getMessage();
}
$conn = null;

?>
