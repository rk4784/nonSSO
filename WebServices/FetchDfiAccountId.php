<?php

include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Content-type: application/x-www-form-urlencoded');

$userName = $_POST['userName'];
$cid = $_POST['cid'];

$result = mysqli_query($conn,"select * from lastUserCreated where userName='".$userName."' and cid='".$cid."'");	

$Notes = array();

if(!$result) {
    die("Error retrieving scores " . mysqli_error());        
} 
else
{
    while ($row = mysqli_fetch_object($result)) {
        
        $cobrandPassword = base64_decode($row->cobrandPassword);
        
        $userLoginPassword = base64_decode($row->userLoginPassword);
        $Note=array("id"=>$row->id,"dfiAccountId"=>$row->dfiAccountId);
        array_push($Notes,$Note);    
    }
    mysqli_free_result($result);
};
echo json_encode($Notes);
?>