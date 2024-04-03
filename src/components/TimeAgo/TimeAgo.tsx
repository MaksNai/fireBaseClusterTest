import { FC } from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

interface TimeAgoProps {
  timestamp: string
}

export const TimeAgo: FC<TimeAgoProps> = ({ timestamp }) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }

  return (
    <span title={timestamp}>
      {timeAgo}
    </span>
  )
}