<?php

include("connection.php");
header('Content-type: application/x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");

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
        
        $userLoginPassword = base64_decode($row->userLoginPassword);
        
        $Note=array("id"=>$row->id,"is_itemAccountIdFlow"=>$row->is_itemAccountIdFlow,"is_AccountNumberMatch"=>$row->is_AccountNumberMatch,"BankName"=>$row->BankName,"restUrl"=>$row->restUrl,"finAppUrl"=>$row->finAppUrl,"cobrandName"=>$row->cobrandName,"cobrandPassword"=>$cobrandPassword,"Product"=>$row->Product,"envs"=>$row->envs,"LIT_FLAG"=>$row->LIT_FLAG,"SIGN_ALIAS_KEY"=>$row->SIGN_ALIAS_KEY,"SIGN_ASSER_FLAG"=>$row->SIGN_ASSER_FLAG,"SIGN_RES_FLAG"=>$row->SIGN_RES_FLAG,"ENCODE_ATTR_FLAG"=>$row->ENCODE_ATTR_FLAG,"ATTRIB_ENCRYPTION_MECHANISM"=>$row->ATTRIB_ENCRYPTION_MECHANISM,"MULTI_KEY_FLAG"=>$row->MULTI_KEY_FLAG,"ASS_ENCRYPT_FLAG"=>$row->ASS_ENCRYPT_FLAG,"SAML_VERSION"=>$row->SAML_VERSION,"PROXY_URL"=>$row->PROXY_URL,"TARGET_URL"=>$row->TARGET_URL,"CONSUMER_URL"=>$row->CONSUMER_URL,"UNIQUE_ISSUER"=>$row->UNIQUE_ISSUER,"cobrand_Type"=>$row->cobrand_Type,"YSLURL"=>$row->YSLURL);
        
        array_push($Notes,$Note);
    }
    mysqli_free_result($result);
};
echo json_encode($Notes);
?>
