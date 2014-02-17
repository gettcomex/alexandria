ActionMailer::Base.smtp_settings = {  
  :address              => "smtp.gmail.com",  
  :port                 => 587,  
  :domain               => "gmail.com",  
  :user_name            => "alexandria.biblioteca.no.reply@gmail.com",  
  :password             => "alexandria18",  
  :authentication       => "plain",  
  :enable_starttls_auto => true  
}  
