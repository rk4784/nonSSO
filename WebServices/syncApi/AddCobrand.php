<?php

include("../connection.php");
header('Content-type: application/x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");

$uid = $_POST['uid'];
$BankName = $_POST['BankName'];
$YSLURL = $_POST['YSLUrl'];
$cobrandName = $_POST['cobrandName'];
$cobrandPassword =  base64_encode($_POST['cobrandPassword']);

$data=array();

$sql = mysqli_query($conn,"INSERT INTO syncApi (uid,cobrandName, YSLURL, userName,Password) VALUES ('".$uid."','".$BankName."', '".$YSLURL."', '".$cobrandName."','".$cobrandPassword."')");

//echo "INSERT INTO syncApi (uid,cobrandName, YSLURL, userName,Password) VALUES (".$uid.",'".$BankName."', '".$YSLURL."', '".$cobrandName."','".$cobrandPassword."')";

if(!$sql){
    $status=array("status"=>0);	
    array_push($data,$status);
}else{
    $status=array("status"=>1);	
    array_push($data,$status);
}
echo json_encode($data);

mysqli_close($conn);

?>