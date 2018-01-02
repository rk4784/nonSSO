<?php

include("../connection.php");
header('Access-Control-Allow-Origin: *');
header('Content-type: application/x-www-form-urlencoded');

$CobrandId = $_POST['CobrandId'];

$result = mysqli_query($conn,"select * from CobrandsList where id='".$CobrandId."'");

$Notes = array();

if(!$result) {
    die("Error retrieving scores " . mysqli_error());
} 
else
{
    while ($row = mysqli_fetch_object($result)) {
        
        $cobrandPassword = base64_decode($row->cobrandPassword);
        
        $Note=array("id"=>$row->id,"BankName"=>$row->BankName,"YSLURL"=>$row->YSLURL,"cobrandName"=>$row->cobrandName,"cobrandPassword"=>$cobrandPassword);
        
        array_push($Notes,$Note);
    }
    mysqli_free_result($result);
};
echo json_encode($Notes);
?>
