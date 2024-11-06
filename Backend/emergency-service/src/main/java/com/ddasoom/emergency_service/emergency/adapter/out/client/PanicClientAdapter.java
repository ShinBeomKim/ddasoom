package com.ddasoom.emergency_service.emergency.adapter.out.client;

import com.ddasoom.emergency_service.common.annotation.WebAdapter;
import com.ddasoom.emergency_service.emergency.application.domain.PanicSimple;
import com.ddasoom.emergency_service.emergency.application.port.out.PanicPort;
import lombok.RequiredArgsConstructor;

@WebAdapter
@RequiredArgsConstructor
public class PanicClientAdapter implements PanicPort {

    private final DiaryServiceClient diaryServiceClient;

    @Override
    public PanicSimple getPanicSimple(Long userId) {
        return diaryServiceClient.getPanicSimple(userId).data();
    }
}