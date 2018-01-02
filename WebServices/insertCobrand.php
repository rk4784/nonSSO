<?php

include("connection.php");
header('Content-type: application/x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");

$BankName = $_POST['BankName'];
$restUrl = $_POST['restUrl'];
$YSLURL = $_POST['YSLURL'];
$cobrandName = $_POST['cobrandName'];
$cobrandPassword1 = $_POST['cobrandPassword'];
$userLoginName = $_POST['userLoginName'];
$userLoginPassword1 = $_POST['userLoginPassword'];
$Product = $_POST['Product'];
$envs = $_POST['envs'];
$finAppUrl = $_POST['finAppUrl'];
$CobrandUserNameSave = $_POST['CobrandUserNameSave'];
$is_itemAccountIdFlow = $_POST['is_itemAccountIdFlow'];
$is_AccountNumberMatch = $_POST['is_AccountNumberMatch'];
$is_SyncApi = $_POST['is_SyncApi'];
$is_YSL = $_POST['is_YSL'];
$uid = $_POST['uid'];
$cobrandPassword =  base64_encode($cobrandPassword1);
$userLoginPassword =  base64_encode($userLoginPassword1);

$data=array();

$sql = mysqli_query($conn,"INSERT INTO CobrandsList (is_YSL,uid,BankName, restUrl, cobrandName,cobrandPassword,userLoginName,userLoginPassword,Product,envs,finAppUrl,is_itemAccountIdFlow,is_AccountNumberMatch,YSLURL,is_SyncApi) VALUES ('".$is_YSL."','".$uid."','".$BankName."', '".$restUrl."', '".$cobrandName."','".$cobrandPassword."','".$userLoginName."','".$userLoginPassword."','".$Product."','".$envs."','".$finAppUrl."',$is_itemAccountIdFlow,$is_AccountNumberMatch,'".$YSLURL."',$is_SyncApi)");

 //echo "INSERT INTO CobrandsList (is_YSL,uid,BankName, restUrl, cobrandName,cobrandPassword,userLoginName,userLoginPassword,Product,envs,finAppUrl,is_itemAccountIdFlow,is_AccountNumberMatch,YSLURL,is_SyncApi) VALUES ('".$is_YSL."',".$uid."','".$BankName."', '".$restUrl."', '".$cobrandName."','".$cobrandPassword."','".$userLoginName."','".$userLoginPassword."','".$Product."','".$envs."','".$finAppUrl."',$is_itemAccountIdFlow,$is_AccountNumberMatch,'".$YSLURL."',$is_SyncApi)";

$last_inserted_id = mysqli_insert_id($conn);
$sql = mysqli_query($conn,"INSERT INTO lastUserCreated (cid, userName, password) VALUES ('".$last_inserted_id."','".$CobrandUserNameSave."', 'test@123')");

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