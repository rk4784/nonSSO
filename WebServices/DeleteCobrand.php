<?php

include("connection.php");
include('headerSet.php');
header('Content-type: application/x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");

$CobrandId = $_POST['CobrandId'];

$sql = mysqli_query($conn,"UPDATE CobrandsList SET deleted = true where id = '".$CobrandId."'");

$data=array();

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
