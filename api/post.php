<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));

$username = '';
$email = '';
$password = '';
$confirm_password = '';
$missingParameters = array();
$privacy = '';

// check data
if(!empty($data->username)) {
	$username = $data->username;
} else {
	$username = "missing";
	$missingParameters[] = "username";
}

if(!empty($data->email)) {
	$email = $data->email;
} else{
	$missingParameters[] = "email";
}

if(!empty($data->password)) {
	$password = $data->password;
} else{
	$missingParameters[] = "password";
}

if(!empty($data->confirm_password)) {
} else{
	$missingParameters[] = "confirm_password";
}

if(!empty($data->privacy)) {
	$privacy = $data->privacy;
} else {
	$privacy = "not accepted";
	$missingParameters[] = "privacy";
}

if(!empty($data->password || $data->confirm_password)) {
	if($data->password != $data->confirm_password){
		$errorPassword = "passwords are not equal";
	}
} 




	if (!$firstname || $firstname === '' || !$email || $email === '' || !$password || $password === '') {
		echo json_encode(
			[
				'success' => false, 
				'message' => "missing parameters",
				'username' => $username,
				"missing_fields" => $missingParameters,
				"error_password" => $errorPassword
			]
		);
		exit;
	}



$response = json_encode([
    'success' => true, 
    'user' => [
		'firstname' => $username,
		'email' => $email,
		'password' => $password,
		'confirm_password' => $confirm_password,
	],
]);

echo $response;
