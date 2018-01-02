<?php

include("connection.php");
header('Content-type: application/x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");

$userName = $_POST['userName'];
$password = $_POST['password'];

$result = mysqli_query($conn,"select id,role,userName from users where userName='".$userName."' and password='".$password."'");
//echo "select id,role,userName from users where userName='".$userName."' and password='".$password."'";
$Notes = array();

 if(!$result) {
     die("Error retrieving scores " . mysqli_error($result));
 } 
else
 {
     while ($row = mysqli_fetch_object($result)) {
       
         $Note=array("id"=>$row->id,"userName"=>$row->userName,"role"=>$row->role);
         
         array_push($Notes,$Note);    
     }
     mysqli_free_result($result);
 };
 echo json_encode($Notes);
mysqli_close($conn);

?>