import { isBeforeValentinesWeek } from '../utils/dateUtils';
import Countdown from './Countdown';
import DayCard from './DayCard';

export default function DateGate() {
  const beforeWeek = isBeforeValentinesWeek();

  if (beforeWeek) {
    return <Countdown />;
  }

  return <DayCard />;
}
