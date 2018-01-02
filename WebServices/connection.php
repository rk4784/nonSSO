<?php

$conn = mysqli_connect('localhost', 'root', '', 'Cobrands');
// $conn = mysqli_connect('192.168.57.181', 'root', 'root','Cobrands');
// $conn = mysqli_connect('mysql.hostinger.in', 'u708100227_root', 'root123', 'u708100227_cobra');


if(!$conn){
     // echo "error";
 	// echo mysqli_error($conn);
}else{
     // echo "success";
 };

?>