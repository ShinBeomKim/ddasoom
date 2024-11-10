// Character Component
'use client';

import { useState, useEffect } from 'react';
import Ddasomi from '@/svgs/Ddasomiz/ddasomi.svg';
import BabySomi from '@/svgs/Ddasomiz/babySomi.svg';
import Level3 from '@/svgs/Ddasomiz/level3.svg';

export default function Character() {
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const levelUp = setInterval(() => {
      setLevel(prevLevel => (prevLevel % 3) + 1); // 레벨을 1~3 순환
    }, 5000);

    return () => clearInterval(levelUp);
  }, []);

  const getCharacterSvg = () => {
    switch (level) {
      case 1:
        return <BabySomi width={100} height={100} />;
      case 2:
        return <Ddasomi width={80} height={90} />;
      case 3:
        return <Level3 width={150} height={150} />;
      default:
        return null;
    }
  };

  const getBalloonText = () => {
    switch (level) {
      case 1:
        return '응애';
      case 2:
        return '따소미에용~~!';
      case 3:
        return '료이키텐카잇 따육맨 등장';
      default:
        return '';
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* 말풍선 */}
      <div className="relative bg-gray1 p-4 rounded-2xl shadow-md text-center text-sm max-w-72 mb-4">
        <span>{getBalloonText()}</span>
        {/* 말풍선 꼬리 */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-full w-4 h-4 bg-gray1 rotate-45 " />
      </div>

      {/* 캐릭터 */}
      {getCharacterSvg()}
    </div>
  );
}