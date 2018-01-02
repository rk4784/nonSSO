<?php
include("connection.php");
require 'PHPMailer/class.phpmailer.php';
require_once ("PHPMailer/PHPMailerAutoload.php");
require 'PHPMailer/class.smtp.php';

header('Content-type: application/x-www-form-urlencoded');
header("Access-Control-Allow-Origin: *");
$email = $_POST["email"];

$result = mysqli_query($conn,"select * from users where userName='".$email."'");
$data=array();
if (mysqli_num_rows ($result)==1) 
{
    
// $code=rand(100,999);
  $code=generateRandomString();
// $message="You activation link is: http://bing.fun2pk.com/resetpass.php?email=$email&code=$code";
  $query2 = mysqli_query($conn,"update users set activation_code='".$code."' where userName='".$email."'");

  $mail = new PHPMailer;

$mail->IsSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';                 // Specify main and backup server
$mail->Port = 587;                                    // Set the SMTP port
$mail->SMTPDebug = 0;
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'rahul54784';                // SMTP username
$mail->Password = 'R@hul54784@@';                  // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted
$mail->Debugoutput = 'html';
$mail->From = 'rahul54784@gmail.com';
$mail->FromName = 'Yodlee';
$mail->AddAddress($email, '');
$mail->IsHTML(true);                                  // Set email format to HTML
$mail->Subject = 'Yodlee Sample app password reset link';
$mail->Body    = 'You activation link is: http://192.168.57.181/FL2.2/WebServices/resetpass.php?email='.$email.'&code='.$code.'';
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

$userStatus=array("userStatus"=>1); 
array_push($data,$userStatus);
if(!$mail->Send()) {
    // echo 'Mailer Error: ' . $mail->ErrorInfo;
  $mailStatus=array("mailStatus"=>0); 
  array_push($data,$mailStatus);
}else{
  // echo "success";
 // array_push($datas,$data);
  $mailStatus=array("mailStatus"=>1); 
  array_push($data,$mailStatus);
}
}
else
{
  // echo 'No user exist with this email id';
  $userStatus=array("userStatus"=>0,"mailStatus"=>0);
  array_push($data,$userStatus);
}

function generateRandomString($length = 10) {
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charactersLength = strlen($characters);
  $randomString = '';
  for ($i = 0; $i < $length; $i++) {
    $randomString .= $characters[rand(0, $charactersLength - 1)];
  }
  return $randomString;
}

echo json_encode($data);

mysqli_close($conn);
?>