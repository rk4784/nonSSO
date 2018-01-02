<?php

include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Content-type: application/x-www-form-urlencoded');

$CobrandId = $_POST['CobrandId'];

$result = mysqli_query($conn,"select * from CobrandsList where deleted=0 and envs != 'Local'");

$Notes = array();

if(!$result) {
    die("Error retrieving scores " . mysqli_error());        
} 
else
{
    while ($row = mysqli_fetch_object($result)) {
    	$cobrandPassword = base64_decode($row->cobrandPassword);
        $userLoginPassword = base64_decode($row->userLoginPassword);
        $Note=array("id"=>$row->id,"is_itemAccountIdFlow"=>$row->is_itemAccountIdFlow,"is_AccountNumberMatch"=>$row->is_AccountNumberMatch,"BankName"=>$row->BankName,"restUrl"=>$row->restUrl,"finAppUrl"=>$row->finAppUrl,"cobrandName"=>$row->cobrandName,"cobrandPassword"=>$cobrandPassword,"userLoginName"=>$row->userLoginName,"userLoginPassword"=>$userLoginPassword,"Product"=>$row->Product,"envs"=>$row->envs,"CobrandUserNameSave"=>$row->CobrandUserNameSave);
        array_push($Notes,$Note);    
    }
    mysqli_free_result($result);
};
echo json_encode($Notes);
?>