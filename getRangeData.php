<?php

try {
	if(isset($_REQUEST['age']))
    {
	
		$params = array(
			"age" =>$_REQUEST['age'],
		
			
		);
	
		$url="https://www.begininvest.com/simpleadminpanel/api/get-range-setting-by-age";
	
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
	   
		echo $output;
	
		curl_close($ch);
		// die(json_encode($output->data->wrinkle));
        //echo json_encode(['user_id'=>$row['user_id'],'id'=>$row['id'],'brower_session_id'=>$row['brower_session_id'],'created_at'=>$row['created_at'],'sku_code'=>["2000000672","2000000709","2000000708","2000000576","2000000669","2000000671"]]);
	
				  

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
