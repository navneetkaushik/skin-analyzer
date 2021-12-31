<?php include_once('config.php');?>


<?php
define("DBHOST", "boddessadmin.cu1nmpejvnbg.ap-south-1.rds.amazonaws.com");
define("DBUSER", "productadmin");
define("DBPASS", 'Que$tr#t&i!');
define("DBNAME", "rugs");

try {
	if(isset($_POST['customer_id']) && isset($_POST['browser_session_id']))
    {
		$conn = new PDO("mysql:host=".DBHOST.";port=3299;dbname=".DBNAME, DBUSER, DBPASS);
		//$conn = new PDO("mysql:host=".DBHOST.";dbname=".DBNAME, DBUSER, DBPASS);
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
		$usid = htmlspecialchars($_POST['customer_id']);
		$bsid = htmlspecialchars($_POST['browser_session_id']);
		$age = htmlspecialchars(isset($_POST['age']) ? $_POST['age'] : 0);
		$quesans = htmlspecialchars(isset($_POST['Question']) ? $_POST['Question'] : null);
		if($stmt->execute())
		{
			echo json_encode(["result"=>"true","msg"=>"Register Successfull"]);
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
$conn = null;

?>
