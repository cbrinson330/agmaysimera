<?php 
	class formHandle {
		private $name;
		private $email;
		private $message;
		private $returnMessage;
		private $emailSent;
		private $recipiant;
		private $subject;
	
		function __construct($nameInit, $emailInit, $messageInit, $subjectInit, $recipiantInit) {
			$this->name = $nameInit;
			$this->email = $emailInit;
			$this->message = $messageInit;
			$this->subject = $subjectInit;
			$this->recipiant = $recipiantInit;
			$this->emailSent = false;
		}

		private function isVaidEmail() {
			return filter_var($this->email, FILTER_VALIDATE_EMAIL);
		}

		private function getEmailBody() {
			$emailBody = $this->email ' has filled out the form on the website and says: \n';
			$emailBody .= $this->message;

			return emailBody;
		}

		public function sendForm(){
			if(mail($this->recipiant, $this->subject, $this->getEmailBody())){
				
			}
			else {
				
			}
		}
		
		public function printReturnMessage() {

		}
	}

	$formSub = new formHandle($_POST['name'], $_POST['email'], $_POST['message'], 'Message From Website Contact Form', 'cbrinson330@gmail.com');
	$formSub->sendForm();
	$formSub->printReturnMessage();
?>
