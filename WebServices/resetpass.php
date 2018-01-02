<?php
include("connection.php");
header('Content-type: application/x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");

if(isset($_POST['pass'])){
	
	$pass = $_POST['pass'];
	$acode= $_POST['code'];
	$query = mysqli_query($conn,"select * from users where activation_code='".$acode."'");
	if (mysqli_num_rows ($query)==1) 
	{
		$query3 = mysqli_query($conn,"update users set password='".$pass."' , activation_code= '' where activation_code='".$acode."'");

		echo 'Your password has been changed.<br> ';
		echo 'Please <a href="http://192.168.57.181/FL2.2/"> Login </a>';
	}
	else
	{
		echo 'Code already used.';

	}
}

?>

<form action="resetpass.php" method="POST">
	<p>New Password:</p><input type="password" name="pass" />
	<input type="hidden" name="code" value="<?php echo $_GET['code'];?>" />
	<input type="submit"  name="submit" value="Submit" />
</form>