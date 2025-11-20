package com.mikesgrill.backend;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    public ContactMessage saveContactMessage(ContactMessage msg) {
        return contactMessageRepository.save(msg);
    }

    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    public boolean deleteMessage(Long id) {
        if (contactMessageRepository.existsById(id)) {
            contactMessageRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
