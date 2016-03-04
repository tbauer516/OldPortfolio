<?php
    # Include the Autoloader (see "Libraries" for install instructions)
	require 'vendor/autoload.php';
	use Mailgun\Mailgun;

	# Instantiate the client.
	$mgClient = new Mailgun('key-dcd9484a5414e9b0f6eb816f6d8de5c7');
	$domain = "sandbox3533483544a7495b9ae67aa1bd9d2dc3.mailgun.org";

	# Make the call to the client.
	$result = $mgClient->sendMessage("$domain",
		array(
			'from'    => 'Mailgun Sandbox <ostmaster@sandbox3533483544a7495b9ae67aa1bd9d2dc3.mailgun.org>',
	        'to'      => 'Tyler Bauer <tbauer16@uw.edu>',
	        'subject' => 'Contact From Your Website',
	        'text'    => 'Congratulations Tyler Bauer, you just sent an email with Mailgun!  You are truly awesome!  You can see a record of this email in your logs: https://mailgun.com/cp/log .  You can send up to 300 emails/day from this sandbox server.  Next, you should add your own domain so you can send 10,000 emails/month for free.'));
    
	$recipient="tbauer16@uw.edu";
    $subject="Contact From Your Website";
    $sender=$_POST["name"];
    $senderEmail=$_POST["email"];
    $message=$_POST["comments"];
    $mailBody="Name: $sender\nEmail Address: $senderEmail\n\nMessage: $message";

	sleep(1);
	header("Location:http://tylerbauer.me/#/");
?>