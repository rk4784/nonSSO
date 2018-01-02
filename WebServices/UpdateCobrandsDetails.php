<?php

include("connection.php");
header('Content-type: application/x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");

$CobrandId = $_POST['CobrandId'];
$BankName = $_POST['BankName'];
$restUrl = $_POST['restUrl'];
$finAppUrl = $_POST['finAppUrl'];
$cobrandName = $_POST['cobrandName'];
$cobrandPassword1 = $_POST['cobrandPassword'];
$is_itemAccountIdFlow = $_POST['is_itemAccountIdFlow'];
$is_ANM = $_POST['is_ANM'];
$Product = $_POST['Product'];
$YSLURL = $_POST['YSLURL'];
$cobrandPassword =  base64_encode($cobrandPassword1);

$data=array();

$sql = mysqli_query($conn,"UPDATE CobrandsList SET YSLURL = '".$YSLURL."', BankName = '".$BankName."', restUrl = '".$restUrl."', finAppUrl = '".$finAppUrl."',cobrandName = '".$cobrandName."',cobrandPassword = '".$cobrandPassword."', is_itemAccountIdFlow = $is_itemAccountIdFlow ,is_AccountNumberMatch = $is_ANM ,Product = '".$Product."'  where id = '".$CobrandId."'");
// echo "UPDATE CobrandsList SET BankName = '".$BankName."', restUrl = '".$restUrl."', finAppUrl = '".$finAppUrl."',cobrandName = '".$cobrandName."',cobrandPassword = '".$cobrandPassword."', is_itemAccountIdFlow = $is_itemAccountIdFlow ,is_AccountNumberMatch = $is_ANM ,Product = '".$Product."'  where id = '".$CobrandId."'";
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