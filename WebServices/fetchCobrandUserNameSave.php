<?php

include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Content-type: application/x-www-form-urlencoded');

$CobrandId = $_POST['CobrandId'];
$status = $_POST['status'];
$product = $_POST['product'];

if($status == "lastUserCreated"){
	if($product == "IAV"){
        
       $result = mysqli_query($conn,"select * from lastUserCreated where cid=".$CobrandId." order by id desc limit 10");
   }else{
    
       $result = mysqli_query($conn,"select * from lastUserCreated where cid=".$CobrandId." order by id desc limit 10");
   }
}else{
    
	$result = mysqli_query($conn,"select * from lastUserCreated where cid=".$CobrandId." order by id desc limit 1");
}
// $result = mysqli_query($conn,"select CobrandUserNameSave,id from CobrandsList where id = ".$CobrandId."");

$Notes = array();

if(!$result) {
    die("Error retrieving scores " . mysqli_error());        
} 
else
{
    while ($row = mysqli_fetch_object($result)) {
        $Note=array("id"=>$row->id,"itemAccountId"=>$row->itemAccountId,"userName"=>$row->userName,"cid"=>$row->cid,"password"=>$row->password);
        array_push($Notes,$Note);
    }
    mysqli_free_result($result);
};
echo json_encode($Notes);
?>