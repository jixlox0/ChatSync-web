import clsx, { ClassValue } from 'clsx'

import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const waitFor = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))
