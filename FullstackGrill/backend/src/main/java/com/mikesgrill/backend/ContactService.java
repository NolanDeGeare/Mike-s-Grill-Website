package com.mikesgrill.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final JavaMailSender mailSender;

    @Value("${admin.email}")
    private String adminEmail;

    public ContactService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactEmail(ContactMessage msg) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(adminEmail);
        mail.setSubject("Website contact: " + msg.getName());
        String body = "Name: " + msg.getName() + "\n"
                    + "Email: " + msg.getEmail() + "\n\n"
                    + msg.getMessage();
        mail.setText(body);
        mail.setReplyTo(msg.getEmail());
        mailSender.send(mail);
    }
}
