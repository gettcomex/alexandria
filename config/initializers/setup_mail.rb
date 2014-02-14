ActionMailer::Base.smtp_settings = {  
  :address              => "smtp.gmail.com",  
  :port                 => 587,  
  :domain               => "gmail.com",  
  :user_name            => "lucasluandemelo@gmail.com",  
  :password             => "theislander",  
  :authentication       => "plain",  
  :enable_starttls_auto => true  
}  