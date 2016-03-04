<?php
    $recipient="tbauer16@uw.edu";
    $subject="Contact From Your Website";
    $sender=$_POST["name"];
    $senderEmail=$_POST["email"];
    $message=$_POST["comments"];
    $mailBody="Name: $sender\nEmail Address: $senderEmail\n\nMessage: $message";
    mail($recipient, $subject, $mailBody);
	sleep(1);
	header("Location:http://tylerbauer.me/#/");
?>