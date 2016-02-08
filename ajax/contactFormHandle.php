<?php
header('Content-Type: application/json');
	class formHandle {
		private $name;
		private $email;
		private $message;
		private $emailSent;
		private $recipiant;
		private $subject;
		private $successMessage = 'Thank you for contacting us.';
		private $emailErrorMessage = 'Please enter a valid email address.';
		private $errorMessage = 'There was an issue sending your message. Please try again.';
		private $returnMessage;
		private $returnCode;
	
		function __construct($nameInit, $emailInit, $messageInit, $subjectInit, $recipiantInit) {
			$this->name = $nameInit;
			$this->email = $emailInit;
			$this->message = $messageInit;
			$this->subject = $subjectInit;
			$this->recipiant = $recipiantInit;
			$this->emailSent = false;
		}

		private function isValidEmail() {
			return filter_var($this->email, FILTER_VALIDATE_EMAIL);
		}

		private function getEmailBody() {
			$emailBody = $this->email . ' has filled out the form on the website and says: ';
			$emailBody .= $this->message;

			return $emailBody;
		}

		private function printReturnMessage() {
			echo json_encode($this->returnMessage);
		}

		public function sendForm(){
			if($this->isValidEmail()){
				if(mail($this->recipiant, $this->subject, $this->getEmailBody())){
					//Email Sent
					$this->returnMessage['message'] = $this->successMessage;
          $this->returnMessage['code'] = 200;
				}
				else {
					//Email Not Sent
					$this->returnMessage['message'] = $this->errorMessage;
          $this->returnMessage['code'] = 400;
				}
			}
			else {
				//not valid email
				$this->returnMessage['message'] = $this->emailErrorMessage;
        $this->returnMessage['fieldError'] = 'email';
        $this->returnMessage['code'] = 400;
			}
		
			//echo the return message 
			$this->printReturnMessage();
		}
	}

	$formSub = new formHandle($_POST['name'], $_POST['email'], $_POST['message'], 'Message From Website Contact Form', 'helenmaysimera@gmail.com');
	$formSub->sendForm();
?>
