<?php

include("connection.php");
header('Access-Control-Allow-Origin: *');
header('Content-type: application/x-www-form-urlencoded');

$userId = $_POST['userId'];
// echo "rahul";
// echo $userId;
if($userId == 7){
	$result = mysqli_query($conn,"select * from CobrandsList where envs!='Local'  and deleted=0");	
}else{
	$result = mysqli_query($conn,"select * from CobrandsList where uid='".$userId."'  and deleted=0");	
}


$Notes = array();

if(!$result) {
    die("Error retrieving scores " . mysqli_error());        
} 
else
{
    while ($row = mysqli_fetch_object($result)) {
        
        $cobrandPassword = base64_decode($row->cobrandPassword);
        
        $userLoginPassword = base64_decode($row->userLoginPassword);
        $Note=array("id"=>$row->id,"is_itemAccountIdFlow"=>$row->is_itemAccountIdFlow,"is_AccountNumberMatch"=>$row->is_AccountNumberMatch,"BankName"=>$row->BankName,"restUrl"=>$row->restUrl,"finAppUrl"=>$row->finAppUrl,"cobrandName"=>$row->cobrandName,"cobrandPassword"=>$cobrandPassword,"Product"=>$row->Product,"envs"=>$row->envs,'UNIQUE_ISSUER'=>$row->UNIQUE_ISSUER,'CONSUMER_URL'=>$row->CONSUMER_URL,'TARGET_URL'=>$row->TARGET_URL,'PROXY_URL'=>$row->PROXY_URL,'SAML_VERSION'=>$row->SAML_VERSION,'ASS_ENCRYPT_FLAG'=>$row->ASS_ENCRYPT_FLAG,'MULTI_KEY_FLAG'=>$row->MULTI_KEY_FLAG,'CUSTOM_ENCRYPTION_FLAG'=>$row->CUSTOM_ENCRYPTION_FLAG,'ENCRYPT_FLAG'=>$row->ENCRYPT_FLAG,'ATTRIB_ENCRYPTION_MECHANISM'=>$row->ATTRIB_ENCRYPTION_MECHANISM,'ENCODE_ATTR_FLAG'=>$row->ENCODE_ATTR_FLAG,'SIGN_RES_FLAG'=>$row->SIGN_RES_FLAG,'SIGN_ASSER_FLAG'=>$row->SIGN_ASSER_FLAG,'SIGN_ALIAS_KEY'=>$row->SIGN_ALIAS_KEY,'LIT_FLAG'=>$row->LIT_FLAG,'cobrand_Type'=>$row->cobrand_Type,'is_YSL'=>$row->is_YSL,'YSLURL'=>$row->YSLURL);
        array_push($Notes,$Note);    
    }
    mysqli_free_result($result);
};
echo json_encode($Notes);
?>