package com.example.playground.controller;

import com.example.playground.TwilioClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController; // Add this import

@RestController // Add this annotation
public class ContactFormController {
    @Value("${twilio.whatsappPhoneNumber}")
    private String twilioWhatsappPhoneNumber;

    private final TwilioClient twilioClient;

    @Autowired
    public ContactFormController(TwilioClient twilioClient){
        this.twilioClient = twilioClient;
    }

    @PostMapping("/submitContactForm")
    public ResponseEntity<String> submitContactForm(@RequestParam("name") String name, @RequestParam("message") String message){
        String whatsappMessage = "Name: " + name + "\nMessage: "+ message;

        // Send the Whatsapp message
        twilioClient.sendWhatsAppMessage(twilioWhatsappPhoneNumber, whatsappMessage);

        System.out.println("Whatsapp: " + whatsappMessage);

        return ResponseEntity.ok("Form submitted successfully!");
    }
}
