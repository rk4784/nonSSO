<?php

include("connection.php");
header('Content-type: application/x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");

$BankName = $_POST['BankName'];
$Product = $_POST['Product'];
$envs = $_POST['envs'];
$is_itemAccountIdFlow = $_POST['is_itemAccountIdFlow'];
$is_AccountNumberMatch = $_POST['is_AccountNumberMatch'];
$uid = $_POST['uid'];
$UNIQUE_ISSUER = $_POST['UNIQUE_ISSUER'];
$CONSUMER_URL = $_POST['CONSUMER_URL'];
$TARGET_URL = $_POST['TARGET_URL'];
$PROXY_URL = $_POST['PROXY_URL'];
$SAML_VERSION = $_POST['SAML_VERSION'];
$ASS_ENCRYPT_FLAG = $_POST['ASS_ENCRYPT_FLAG'];
$MULTI_KEY_FLAG = $_POST['MULTI_KEY_FLAG'];
$CUSTOM_ENCRYPTION_FLAG = $_POST['CUSTOM_ENCRYPTION_FLAG'];
$ENCRYPT_FLAG = $_POST['ENCRYPT_FLAG'];
$ATTRIB_ENCRYPTION_MECHANISM = $_POST['ATTRIB_ENCRYPTION_MECHANISM'];
$ENCODE_ATTR_FLAG = $_POST['ENCODE_ATTR_FLAG'];
$SIGN_RES_FLAG = $_POST['SIGN_RES_FLAG'];
$SIGN_ASSER_FLAG = $_POST['SIGN_ASSER_FLAG'];
$SIGN_ALIAS_KEY = $_POST['SIGN_ALIAS_KEY'];
$LIT_FLAG = $_POST['LIT_FLAG'];


$data=array();

$sql = mysqli_query($conn,"INSERT INTO CobrandsList (uid,BankName,Product,envs,is_itemAccountIdFlow,is_AccountNumberMatch,UNIQUE_ISSUER,CONSUMER_URL,TARGET_URL,PROXY_URL,SAML_VERSION,ASS_ENCRYPT_FLAG,MULTI_KEY_FLAG,CUSTOM_ENCRYPTION_FLAG,ENCRYPT_FLAG,ATTRIB_ENCRYPTION_MECHANISM,ENCODE_ATTR_FLAG,SIGN_RES_FLAG,SIGN_ASSER_FLAG,SIGN_ALIAS_KEY,LIT_FLAG,cobrand_Type) VALUES ('".$uid."','".$BankName."','".$Product."','".$envs."',$is_itemAccountIdFlow,$is_AccountNumberMatch,'".$UNIQUE_ISSUER."','".$CONSUMER_URL."','".$TARGET_URL."','".$PROXY_URL."','".$SAML_VERSION."','".$ASS_ENCRYPT_FLAG."','".$MULTI_KEY_FLAG."','".$CUSTOM_ENCRYPTION_FLAG."','".$ENCRYPT_FLAG."','".$ATTRIB_ENCRYPTION_MECHANISM."','".$ENCODE_ATTR_FLAG."','".$SIGN_RES_FLAG."','".$SIGN_ASSER_FLAG."','".$SIGN_ALIAS_KEY."','".$LIT_FLAG."','SSO')");

 // echo "INSERT INTO CobrandsList (uid,BankName,Product,envs,is_itemAccountIdFlow,is_AccountNumberMatch,UNIQUE_ISSUER,CONSUMER_URL,TARGET_URL,PROXY_URL,SAML_VERSION,ASS_ENCRYPT_FLAG,MULTI_KEY_FLAG,CUSTOM_ENCRYPTION_FLAG,ENCRYPT_FLAG,ATTRIB_ENCRYPTION_MECHANISM,ENCODE_ATTR_FLAG,SIGN_RES_FLAG,SIGN_ASSER_FLAG,SIGN_ALIAS_KEY,LIT_FLAG) VALUES ('".$uid."','".$BankName."','".$Product."','".$envs."',$is_itemAccountIdFlow,$is_AccountNumberMatch,'".$UNIQUE_ISSUER."','".$CONSUMER_URL."','".$TARGET_URL."','".$PROXY_URL."','".$SAML_VERSION."','".$ASS_ENCRYPT_FLAG."','".$MULTI_KEY_FLAG."','".$CUSTOM_ENCRYPTION_FLAG."','".$ENCRYPT_FLAG."','".$ATTRIB_ENCRYPTION_MECHANISM."','".$ENCODE_ATTR_FLAG."','".$SIGN_RES_FLAG."','".$SIGN_ASSER_FLAG."','".$SIGN_ALIAS_KEY."','".$LIT_FLAG."',)";

// $last_inserted_id = mysqli_insert_id($conn);
// $sql = mysqli_query($conn,"INSERT INTO lastUserCreated (cid, userName, password) VALUES ('".$last_inserted_id."','".$CobrandUserNameSave."', 'test@123')");

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