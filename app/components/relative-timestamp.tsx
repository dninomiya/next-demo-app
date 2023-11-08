import { differenceInDays, format, formatDistanceToNow } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function RelativeTimestamp({ date }: { date: Date }) {
  const diffInDays = differenceInDays(new Date(), date);

  if (diffInDays < 8) {
    return (
      <time>
        {formatDistanceToNow(date, {
          locale: ja,
          addSuffix: true,
        })}
      </time>
    );
  } else if (diffInDays < 365) {
    return <time>{format(date, 'MM月dd日')}</time>;
  } else {
    return <time>{format(date, 'yyyy年MM月dd日')}</time>;
  }
}
