<?php

include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Content-type: application/x-www-form-urlencoded');

$cid = $_POST['cid'];
$username = $_POST['username'];
$password = $_POST['password'];
$itemAccountId = $_POST['itemAccountId'];
$dfiAccountId = $_POST['dfiAccountId'];
$last_inserted_id1 = $_POST["last_inserted_id1"];
$status = $_POST["status"];

$data=array();

if($status == "new"){
	
	$sql = mysqli_query($conn,"INSERT INTO lastUserCreated (cid, userName, password) VALUES ('".$cid."','".$username."', '".$password."')");
	
	if(!$sql){
		$status=array("status"=>0);	
		array_push($data,$status);
	}else{
		$status=array("status"=>1,"last_inserted_id"=>mysqli_insert_id($conn));
		array_push($data,$status);
	}

}else{
  //echo "UPDATE lastUserCreated set itemAccountId = '".$itemAccountId."', dfiAccountId='".$dfiAccountId."' where id = '".$last_inserted_id1."'";
	 $sql = mysqli_query($conn,"UPDATE lastUserCreated set itemAccountId = '".$itemAccountId."', dfiAccountId='".$dfiAccountId."' where id = '".$last_inserted_id1."'");
	
	if(!$sql){
		$status=array("status"=>0);	
		array_push($data,$status);
	}else{
		$status=array("status"=>1);
		array_push($data,$status);
	}
}

// $sql = mysqli_query($conn,"update CobrandsList set CobrandUserNameSave = '".$username."' where id = '".$id."'");

//echo "INSERT INTO CobrandsList (BankName, restUrl, cobrandName,cobrandPassword,userLoginName,userLoginPassword,is_IAV,envs) VALUES ('".$BankName."', '".$restUrl."', ".$cobrandName.",".$cobrandPassword.",".$userLoginName.",".$userLoginPassword.",$is_IAV,".$envs.")";


echo json_encode($data);

mysqli_close($conn);

?>