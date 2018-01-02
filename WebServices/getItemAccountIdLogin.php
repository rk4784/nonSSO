<?php

include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Content-type: application/x-www-form-urlencoded');

$username = $_POST['username'];

$result = mysqli_query($conn,"select * from lastUserCreated where username='".$username."'");	


$Notes = array();

if(!$result) {
    die("Error retrieving scores " . mysqli_error($conn));        
} 
else
{
    while ($row = mysqli_fetch_object($result)) {
    
        $Note=array("id"=>$row->id,"itemAccountId"=>$row->itemAccountId,"dfiAccountId"=>$row->dfiAccountId,"userName"=>$row->userName);
        array_push($Notes,$Note);    
    }
    mysqli_free_result($result);
};
echo json_encode($Notes);
?>