import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface MenuItem {
  title: string
  icon: React.ReactNode
  href?: string
  children?: MenuItem[]
  badge?: string
}

export interface User {
  id: string
  name: string
  email: string
  type: 'superadmin' | 'admin' | 'client'
  avatar?: string
}

// Toast notifications
let toastQueue: Array<{ id: string; title: string; description: string; variant?: 'default' | 'destructive' }> = []

export const toast = ({ title, description, variant = 'default' }: { title: string; description: string; variant?: 'default' | 'destructive' }) => {
  const id = Date.now().toString()
  toastQueue.push({ id, title, description, variant })
  
  // Simple toast implementation
  const toastElement = document.createElement('div')
  toastElement.className = `fixed top-4 right-4 z-50 max-w-sm p-4 rounded-lg shadow-lg transition-all duration-300 ${
    variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
  }`
  toastElement.innerHTML = `
    <div class="font-semibold">${title}</div>
    <div class="text-sm opacity-90">${description}</div>
  `
  
  document.body.appendChild(toastElement)
  
  setTimeout(() => {
    toastElement.style.opacity = '0'
    toastElement.style.transform = 'translateX(100%)'
    setTimeout(() => {
      document.body.removeChild(toastElement)
    }, 300)
  }, 3000)
}