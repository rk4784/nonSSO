<?php

include("../connection.php");
header('Content-type: application/x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");

$CobrandId = $_POST['CobrandId'];
$BankName = $_POST['BankName'];
$YSLURL = $_POST['YSLURL'];
$cobrandName = $_POST['cobrandName'];
$cobrandPassword =  base64_encode($_POST['cobrandPassword']);

$data=array();

$sql = mysqli_query($conn,"UPDATE CobrandsList SET BankName = '".$BankName."', YSLURL = '".$YSLURL."',cobrandName = '".$cobrandName."',cobrandPassword = '".$cobrandPassword."' where id = '".$CobrandId."'");

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