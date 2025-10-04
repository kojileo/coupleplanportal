import { format, parseISO, isValid } from 'date-fns'
import { ja } from 'date-fns/locale'

// 日付フォーマット
export const formatDate = (date: string | Date, formatStr: string = 'yyyy-MM-dd'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    if (!isValid(dateObj)) return ''
    return format(dateObj, formatStr, { locale: ja })
  } catch {
    return ''
  }
}

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, 'yyyy年MM月dd日 HH:mm')
}

export const formatTime = (date: string | Date): string => {
  return formatDate(date, 'HH:mm')
}

// 数値フォーマット
export const formatNumber = (num: number, decimals: number = 0): string => {
  return new Intl.NumberFormat('ja-JP', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num)
}

export const formatCurrency = (amount: number, currency: string = 'JPY'): string => {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

// 文字列ユーティリティ
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// 配列ユーティリティ
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const groupBy = <T, K extends string | number>(
  array: T[],
  key: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((groups, item) => {
    const group = key(item)
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {} as Record<K, T[]>)
}

export const uniqueBy = <T, K>(array: T[], key: (item: T) => K): T[] => {
  const seen = new Set<K>()
  return array.filter(item => {
    const k = key(item)
    if (seen.has(k)) return false
    seen.add(k)
    return true
  })
}

// バリデーション
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[0-9-+()\s]+$/
  return phoneRegex.test(phone)
}

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'パスワードは8文字以上で入力してください' }
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return { valid: false, message: 'パスワードは大文字、小文字、数字を含む必要があります' }
  }
  return { valid: true }
}

// ローカルストレージ
export const storage = {
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('ローカルストレージへの保存に失敗しました:', error)
    }
  },
  
  get: <T>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('ローカルストレージからの読み込みに失敗しました:', error)
      return null
    }
  },
  
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('ローカルストレージからの削除に失敗しました:', error)
    }
  },
  
  clear: (): void => {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('ローカルストレージのクリアに失敗しました:', error)
    }
  }
}

// デバウンス・スロットル
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// URL関連
export const buildUrl = (base: string, params: Record<string, any>): string => {
  const url = new URL(base)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value))
    }
  })
  return url.toString()
}

export const getQueryParams = (): Record<string, string> => {
  if (typeof window === 'undefined') return {}
  
  const params = new URLSearchParams(window.location.search)
  const result: Record<string, string> = {}
  
  for (const [key, value] of params.entries()) {
    result[key] = value
  }
  
  return result
}

// エラーハンドリング
export const handleError = (error: unknown, context: string = ''): void => {
  console.error(`エラーが発生しました (${context}):`, error)
  
  // エラーメッセージの表示（toast等）
  if (typeof window !== 'undefined') {
    // ここでtoast通知などを実装
    console.error('エラーが発生しました。しばらく時間をおいてから再度お試しください。')
  }
}

// 非同期処理のラッパー
export const safeAsync = async <T>(
  fn: () => Promise<T>,
  errorMessage: string = '処理中にエラーが発生しました'
): Promise<T | null> => {
  try {
    return await fn()
  } catch (error) {
    handleError(error)
    return null
  }
}

// 画像関連
export const getImageUrl = (path: string): string => {
  if (path.startsWith('http')) return path
  return `/images/${path}`
}

export const getPlaceholderImage = (width: number, height: number): string => {
  return `https://via.placeholder.com/${width}x${height}`
}

// 色関連
export const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

// 距離計算
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371 // 地球の半径（km）
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// ランダム生成
export const generateId = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export const generateRandomColor = (): string => {
  const colors = [
    '#ff6b6b', '#4ecdc4', '#ffe66d', '#a8e6cf', '#ffd3a5',
    '#fd79a8', '#a8e6cf', '#ffd3a5', '#ff6b6b', '#4ecdc4'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}
