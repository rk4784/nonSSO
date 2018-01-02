<?php

include("connection.php");
header('Content-type: application/x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");

$Uname = $_POST['userName'];
$password = $_POST['password'];
$name = $_POST['name'];
//$password =  base64_encode($password1);

$data=array();
$sql1 = mysqli_query("select * from users where userName='".$Uname."'");
echo mysqli_affected_rows($sql1);
$sql = mysqli_query($conn,"INSERT INTO users (userName, password, name) VALUES ('".$Uname."', '".$password."','".$name."')");


if(!$sql){
    $status=array("status"=>0);	
    array_push($data,$status);
}
else{
    $sql2 = mysqli_query($conn,"select * from users where id='".mysqli_insert_id($conn)."'");
    if(!$sql2) {
        die("Error retrieving scores " . mysqli_error());
    }
    else
    {
        while ($row = mysqli_fetch_object($sql2)) {
            $Note=array("status"=>1,"id"=>$row->id,"userName"=>$row->userName,"name"=>$row->name);
            array_push($data,$Note);
    }
    mysqli_free_result($result);
        
}
//    $status=array("status"=>1,"userId"=>mysqli_insert_id($conn));	
//    array_push($data,$status);
}
echo json_encode($data);

mysqli_close($conn);

?>