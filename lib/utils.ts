import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num)
}

export function animateCounter(
  target: number,
  duration: number = 2000,
  callback: (value: number) => void
) {
  let start = 0
  const increment = target / (duration / 16)
  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      callback(target)
      clearInterval(timer)
    } else {
      callback(Math.floor(start))
    }
  }, 16)
  return timer
}
