package com.ddasoom.emergency_service.emergency.application.service;

import com.ddasoom.emergency_service.common.annotation.UseCase;
import com.ddasoom.emergency_service.emergency.adapter.in.web.response.PhoneBookResponse;
import com.ddasoom.emergency_service.emergency.application.domain.PhoneBook;
import com.ddasoom.emergency_service.emergency.application.port.in.PhoneBookCommand;
import com.ddasoom.emergency_service.emergency.application.port.in.PhoneBookUseCase;
import com.ddasoom.emergency_service.emergency.application.port.in.SendMsgCommand;
import com.ddasoom.emergency_service.emergency.application.port.out.PhoneBookPort;
import com.ddasoom.emergency_service.emergency.application.port.out.SendPhoneBookPort;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional
@RequiredArgsConstructor
public class phoneBookService implements PhoneBookUseCase {

    private final PhoneBookPort phoneBookPort;
    private final SendPhoneBookPort sendPhoneBookPort;

    @Override
    public void addPhoneBook(PhoneBookCommand command) {
        PhoneBook phoneBook = new PhoneBook(
                null,
                command.userId(),
                command.phoneNumber(),
                command.alias()
        );

        phoneBookPort.addPhoneBook(phoneBook);
    }

    @Transactional(readOnly = true)
    @Override
    public List<PhoneBookResponse> findPhoneBookList(Long userId) {
        List<PhoneBook> phoneBookList = phoneBookPort.findPhoneBookList(userId);

        return phoneBookList.stream().map(phoneBook ->
                new PhoneBookResponse(
                        phoneBook.phoneBookId(),
                        phoneBook.phoneNumber(),
                        phoneBook.alias())
        ).toList();
    }

    @Transactional(readOnly = true)
    @Override
    public void sendMessage(SendMsgCommand command) {
        String text = command.username() + "님이 공황 발작이 발생한\n 지 10분이 경과했습니다.\n\n" +
                "한번 연락해 보세요!";
        sendPhoneBookPort.sendMessage(command.phoneNumbers(), text);
    }

    @Override
    public void deletePhoneBook(Long phoneBookId) {
        phoneBookPort.deletePhoneBook(phoneBookId);
    }
}
