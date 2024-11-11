'use client';

import Ddasomi from '@/svgs/Ddasomiz/whiteSomi.svg';

interface LevelBarProps {
  level: number;
  experience: number;
  experiencePercent: number;
}
export default function LevelBar({ level, experience, experiencePercent }: LevelBarProps) {
  return (
    <div className="relative flex items-center mt-2 w-64 px-3 min-w-48 py-1 rounded-full font-nanumExtraBold bg-main3 shadow-md">
      <div className="absolute left-0 top-0">
        <Ddasomi />
      </div>
      <span className="ml-10 text-left">Lv.{level}</span>
      <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#5ba45b] rounded-full transition-width duration-300 ease-in-out"
          style={{ width: `${experience}%` }}
        />
      </div>
      <span className="text-sm text-[#5ba45b] font-hakgyoansimB">{experiencePercent}%</span>
    </div>
  );
}
