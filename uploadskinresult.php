<?php 
define("DBHOST", "localhost");
define("DBUSER", "username");
define("DBPASS", 'password');
define("DBNAME", "database");

	try
	{
		if(
			isset($_POST['phone']) &&
			isset($_POST['email']) &&
			isset($_POST['wrinkles']) &&
			isset($_POST['texture']) && 
			isset($_POST['spots']) && 
			isset($_POST['alll']) && 
			isset($_POST['userid']) && 
			isset($_POST['darkCircle'])){

				$conn = new PDO("mysql:host=".DBHOST.";dbname=".DBNAME, DBUSER, DBPASS);
				// set the PDO error mode to exception
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

				// prepare sql and bind parameters
			
				$stmt = $conn->prepare("INSERT INTO user_skin_result (
														phone, email, wrinkles, dar_circle, texture, spots, alll, age)
										VALUES (
											:phone, 
											:email,
											:wrinkle, 
											:dar_circl, 
											:textur, 
											:spot, 
											:al, 
											:ag)");
			
			//$stmt->bindParam(':usid', $usid);
			$stmt->bindParam(':phone', $phone);
			$stmt->bindParam(':email', $email);
			$stmt->bindParam(':wrinkle', $wrinkle);
			$stmt->bindParam(':dar_circl', $dar_circl);
			$stmt->bindParam(':textur', $textur);
			$stmt->bindParam(':spot', $spot);
			$stmt->bindParam(':al', $al);
			$stmt->bindParam(':ag', $ag);
			//$stmt->bindParam(':browserid', $browserid);
		

			// insert a row
			//$usid = htmlspecialchars($_POST['userid']);
			$phone = htmlspecialchars($_POST['phone']);
			$email = htmlspecialchars($_POST['email']);
			$wrinkle = htmlspecialchars($_POST['wrinkles']);
			$textur = htmlspecialchars($_POST['texture']);
			$spot = htmlspecialchars($_POST['spots']);
			$al = htmlspecialchars($_POST['alll']);
			$ag = htmlspecialchars($_POST['age']);
			$dar_circl = htmlspecialchars($_POST['darkCircle']);
			//$browserid = htmlspecialchars($_POST['browserid']);
		
		
			if($stmt->execute())
			{
				echo json_encode(["result"=>"true","msg"=>"Save Successfull"]);
			}
			else
			{
				echo json_encode(["result"=>"false","msg"=>"Save Failed"]);

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
	$conn = null;

?>
