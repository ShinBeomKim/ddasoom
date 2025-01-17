import GreenSomi from '@/svgs/Ddasomiz/greenSomi.svg';
import OrangeSomi from '@/svgs/Ddasomiz/orangeSomi.svg';
import YellowSomi from '@/svgs/Ddasomiz/yellowSomi.svg';

interface DdasomiIconProps {
  trainingCount: number;
}

export default function DdasomiIcon({ trainingCount }: DdasomiIconProps) {
  switch (trainingCount) {
    case 1:
      return <YellowSomi className="w-10 h-10 mt-2" />;
    case 2:
      return <OrangeSomi className="w-10 h-10 mt-2" />;
    case 3:
      return <GreenSomi className="w-10 h-10 " />;
    default:
      return null;
  }
}
