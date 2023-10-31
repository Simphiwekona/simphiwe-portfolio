package com.example.playground;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TwilioClient {
    @Value("${twilio.accountSid}")
    private String twilioAccountSid;

    @Value("${twilio.authToken}")
    private String twilioAuthToken;

    public void sendWhatsAppMessage(String toPhoneNumber, String message){
        Twilio.init(twilioAccountSid, twilioAuthToken);

        Message.creator(
                new com.twilio.type.PhoneNumber("whatsapp:" + toPhoneNumber),
                new com.twilio.type.PhoneNumber("whatsapp:" + toPhoneNumber),
                message
        ).create();
    }
}
