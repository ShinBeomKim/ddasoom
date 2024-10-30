package com.ddasoom.diary_service.diary.application.service;

import static java.time.LocalDate.now;

import com.ddasoom.diary_service.common.annotation.UseCase;
import com.ddasoom.diary_service.diary.adapter.in.web.response.CalendarsResponse;
import com.ddasoom.diary_service.diary.application.port.in.CalendarQuery;
import com.ddasoom.diary_service.diary.application.port.out.CalendarPort;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@UseCase
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CalendarService implements CalendarQuery {

    private final CalendarPort calendarPort;

    @Override
    public CalendarsResponse getCalendars(Long userId, Optional<Integer> year, Optional<Integer> month) {

        return new CalendarsResponse(
                calendarPort.getCalendars(
                        userId,
                        year.orElse(now().getYear()),
                        month.orElse(now().getMonthValue()))
        );
    }
}