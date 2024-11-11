'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import background from '@/components/BackGround/Background.module.css';
import Check from '@/svgs/Check.svg';
import { getCompletedTrainingData } from '@/api/mainAPI';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import queryKeys from '@/api/querykeys';

export default function MissionContent() {
  const queryClient = useQueryClient();
  const { data: completedData } = useQuery({
    queryKey: [queryKeys.COMPLETED_TRAINING],
    queryFn: () => getCompletedTrainingData(),
  });
  const [timeLeft, setTimeLeft] = useState('');
  const [isCompleted, setIsCompleted] = useState([false, false, false]); // 훈련 완료 여부를 저장하는 배열

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.COMPLETED_TRAINING] });

    if (completedData?.data) {
      const completionStatus = [
        completedData?.data.breath, // 호흡 연습
        completedData?.data.grounding, // 그라운딩
        completedData?.data.comedown, // 안정화 기법
      ];
      setIsCompleted(completionStatus);
    }

    const calculateTimeLeft = () => {
      const now = new Date();
      const nextMidnight = new Date();
      nextMidnight.setHours(24, 0, 0, 0);

      const diff = nextMidnight.getTime() - now.getTime();
      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

      setTimeLeft(`${hours}:${minutes}:${seconds}`);
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timerId);
  }, [completedData]);

  const missionData = [
    { name: '호흡 연습', reward: '쓰다듬기 X 5', link: '/training/breath' },
    { name: '그라운딩', reward: '안아주기 X 5', link: '/training/grounding' },
    { name: '안정화 기법', reward: '놀아주기 X 5', link: '/training/calmDown' },
  ];

  return (
    <div className="flex flex-col items-center min-h-96">
      <div className={`${background.background2} flex flex-col justify-center w-full h-24 border-y-8 font-nanumBold`}>
        <span className="text-3xl ml-5 flex justify-between items-baseline text-main4">
          오늘의 훈련 <span className="text-xs mr-5">- {timeLeft} 후 리셋</span>
        </span>
      </div>

      {missionData.map((mission, index) => (
        <div key={index} className="min-h-24 max-h-32 w-full flex flex-col mt-2 items-center justify-center rounded-lg">
          <div
            className={`w-11/12 rounded-2xl mx-4 p-4 h-24 gap-1 flex justify-between ${
              isCompleted[index] ? 'bg-[#daffda]' : 'bg-[#d4ddd4]'
            }`}>
            <div className="flex flex-col">
              <span className="text-3xl font-hakgyoansimR">{mission.name}</span>
              <div className="flex items-center">
                <span className="bg-main1 rounded-3xl p-1 px-3 text-main4 mr-1">보상</span>
                <span className={`text-sm ${isCompleted[index] ? 'font-nanumBold text-[#168641]' : 'text-gray5'}`}>
                  {mission.reward}
                </span>
              </div>
            </div>

            {isCompleted[index] ? (
              <Check />
            ) : (
              <Link href={mission.link}>
                <button className="bg-sub5 text-white px-5 py-2 flex flex-col mt-7 justify-center rounded-full text-sm font-nanumBold">
                  이동
                </button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
