import { SQLTime } from '@/types/common'
import clsx, { ClassValue } from 'clsx'
import moment from 'moment'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function PingedTime(props: { time: SQLTime }) {
  return (
    <span className="text-left">
      {props.time && props.time.Valid ? moment(props.time.Time.toString()).fromNow() : 'Never'}
    </span>
  )
}

export const waitFor = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))
