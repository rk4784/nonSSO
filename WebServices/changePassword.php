<?php

include("connection.php");
header('Content-type: application/x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");

$userName = $_POST['userName'];
$oldPassword = $_POST['oldPassword'];
$newPassword = $_POST['newPassword'];


$data=array();
$sql = mysqli_query("select * from users where userName = '".$userName."' and password = '".$oldPassword."'");

if (mysqli_num_rows ($sql)==1) 
{
	$sql = mysqli_query($conn,"UPDATE users SET password = '".$newPassword."' where userName = '".$userName."'");
	$status=array("status"=>1);
	array_push($data,$status);
}
else{
	$status=array("status"=>0);
	array_push($data,$status);
};

echo json_encode($data);

mysqli_close($conn);
?>