<?php
include("connection.php");
header('Content-type: application/x-www-form-urlencoded');
header('Content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

$Name = $_POST['addCatelogName'];
$Fname = $_POST['addCatelogFName'];
$lname = $_POST['addCatelogLName'];
$accountNumber = $_POST['addCatelogAccountNumber'];
$uid = $_POST['uid'];

$data=array();

 $sql = mysqli_query($conn,"INSERT INTO catelog (uid,name,firstName,lastName,accountNumber) VALUES (".$uid.",'".$Name."','".$Fname."', '".$lname."', ".$accountNumber.")");

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