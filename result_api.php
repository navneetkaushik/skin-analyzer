<?php
	// If we get here, username was provided. Check password.
	if ($_GET['Authorization'] == 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjA4NjVhOTJkYTNkNGMzYThlMWUxZTkzYzdhNDhhNGEyMjdmZDVjMmRiMmRhYjRjYTVkODcxYTcyZTViMGQ0MjkxODYyNjcxZjRkNzliMGM0In0.eyJhdWQiOiIxIiwianRpIjoiMDg2NWE5MmRhM2Q0YzNhOGUxZTFlOTNjN2E0OGE0YTIyN2ZkNWMyZGIyZGFiNGNhNWQ4NzFhNzJlNWIwZDQyOTE4NjI2NzFmNGQ3OWIwYzQiLCJpYXQiOjE1OTY0MzY1NjMsIm5iZiI6MTU5NjQzNjU2MywiZXhwIjoxNjI3OTcyNTYzLCJzdWIiOiI4Iiwic2NvcGVzIjpbXX0.DXTLgv5S7U0V48Rnhw0IVVY5WV4KBUCgz25ZjO1v7gbq0A77eq3bqrxUkM2Q3AfH-4vsafNyVCb0cIScDd1A8SuB7oU_en1ucY7R2_l8wtFgUcTP4rTy89YGhwBIw5u7PhAHcJrHR7M8xawIbr3gvHqTlC3b1Mns-HeQ0NASyDLleDLoN5odzwejUccexvSFm7IemroT_tIazS8eQt_ny0gMO9oTKoW5S7t3V5UYouH6_kU07vFUgv0-GlnFPHC3mWXgUpTilNx9camm5GJ5lwBV6BSOvWbgHy4vgJ7GXlIl8I4N9Q2RngWAco_XVlp95ZI60_3FclDJH4wqbg1zOQJ1kpE7aFQujQuymUPeOwMH28HZxYfR4jDNL1KBOpdKynU8E58p_RTLLHRuBuTStG7TzOUIjum-lrORqkMWmLqXhVpUdZdlCpWInT8ZTeViF33cjg_s5ttR6v02kl8jQ3swH5D_M-nE_eikG-q9SY8pZ_hfK0eieS8655zEAfibyqXgeH9BmSgmJphoapHQNHgTsiF5n2Y-8EsVV17NtpRR7GlEFqcor8qwJS7JDjxw8Egxam7fU5M7FwQwNtCSIDP8GuPYmsWAKYNBYC_bxu2jtta5aTWIG_QwyWsGYnycjOoR98RxRnPqDgC-IjQ1IrU2zjDvGEaArOSvIEJD_dk') {
		//echo 'Access granted. You know the password!';
	} else {
		echo 'Access denied! You do not know the password.';
		die;
	}
?>

<?php include_once('config.php');?>
<?php
define("DBHOST", "localhost");
define("DBUSER", "root");
define("DBPASS", 'secure@123');
define("DBNAME", "mamaearth");

try {
	if(isset($_POST['phone']) && isset($_POST['email']))
    {
		$conn = new PDO("mysql:host=".DBHOST.";dbname=".DBNAME, DBUSER, DBPASS);
		//$conn = new PDO("mysql:host=".DBHOST.";dbname=".DBNAME, DBUSER, DBPASS);
		// set the PDO error mode to exception
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

		
		
		$stmt1 = $conn->prepare("Select * from user_skin_result where phone = '".$_POST['phone']."' and email = '".$_POST['email']."' order by id desc limit 1");
		//$stmt->bindParam(':phone', $phone);
		//$stmt->bindParam(':email', $email);
		
		// insert a row
		//$phone = htmlspecialchars($_REQUEST['phone']);
		//$email = htmlspecialchars($_REQUEST['email']);
		
		
		
	
	

		
		
		$stmt1->execute();
		$row1=$stmt1->fetch();
		
		$params = array(
			"wrinkles" =>$row1['wrinkles'],
			"texture" =>$row1['texture'],
			"spots" =>$row1['spots'],
			"darkCircle" =>$row1['dar_circle']
		   
			
		);
	
		// die(json_encode($output->data->wrinkle));
        //echo json_encode(['user_id'=>$row['user_id'],'id'=>$row['id'],'brower_session_id'=>$row['brower_session_id'],'created_at'=>$row['created_at'],'sku_code'=>["2000000672","2000000709","2000000708","2000000576","2000000669","2000000671"]]);
		echo '{"phone":"'.$row1['phone'].'", "email":"'.$row1['email'].'", "age":"'.$row1['age'].'", "wrinkle":"'.$row1['wrinkles'].'", "dark_circle":"'.$row1['dar_circle'].'", "spots":"'.$row1['spots'].'", "textures":"'.$row1['texture'].'", "all":"'.$row1['alll'].'", "img":"", "created_at":"'.$row1['created_at'].'"}';
				  

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
