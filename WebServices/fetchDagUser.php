<?php

include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Content-type: application/x-www-form-urlencoded');

$userId = $_POST['userId'];
if($userId == 7){
	$result = mysqli_query($conn,"select * from catelog");	
}else{
	$result = mysqli_query($conn,"select * from catelog where uid='".$userId."'");	
}

$Notes = array();

if(!$result) {
    die("Error retrieving scores " . mysqli_error($conn));        
} 
else
{
    while ($row = mysqli_fetch_object($result)) {
    
        $Note=array("id"=>$row->id,"name"=>$row->name,"firstName"=>$row->firstName,"lastName"=>$row->lastName,"accountNumber"=>$row->accountNumber);
        array_push($Notes,$Note);    
    }
    mysqli_free_result($result);
};
echo json_encode($Notes);
?>