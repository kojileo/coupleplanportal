// ユーザー関連の型定義
export interface User {
  id: string
  name: string
  email: string
  age?: number
  gender?: 'male' | 'female' | 'other'
  location?: string
  interests: string[]
  profileImage?: string
  createdAt: Date
  updatedAt: Date
}

export interface Partner {
  id: string
  name: string
  age?: number
  gender?: 'male' | 'female' | 'other'
  location?: string
  interests: string[]
  profileImage?: string
}

// デートプラン関連の型定義
export interface DatePlan {
  id: string
  title: string
  description?: string
  date: string
  time: string
  duration: number
  budget: number
  location: string
  spots: DateSpot[]
  status: 'draft' | 'confirmed' | 'completed' | 'cancelled'
  type: 'ai_generated' | 'custom' | 'template'
  preferences: string[]
  partnerPreferences: string[]
  specialRequests?: string
  occasion?: string
  totalDistance?: string
  walkingTime?: string
  highlights: string[]
  createdAt: Date
  updatedAt: Date
}

export interface DateSpot {
  id: string
  name: string
  description: string
  category: string
  time: string
  price: string
  rating: number
  address?: string
  phone?: string
  website?: string
  image?: string
  coordinates?: {
    lat: number
    lng: number
  }
}

// ポータル関連の型定義
export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  readTime: string
  views: number
  rating: number
  tags: string[]
  author: string
  publishedAt: Date
  updatedAt: Date
}

export interface Spot {
  id: string
  name: string
  description: string
  category: string
  rating: number
  price: string
  image: string
  address: string
  phone?: string
  website?: string
  coordinates?: {
    lat: number
    lng: number
  }
  features: string[]
  openingHours?: {
    [key: string]: string
  }
}

// 共同編集関連の型定義
export interface CollaborationSession {
  id: string
  planId: string
  participants: string[]
  isActive: boolean
  lastActivity: Date
  conflicts: Conflict[]
}

export interface Conflict {
  id: string
  field: string
  userChanges: any
  partnerChanges: any
  resolved: boolean
  resolvedBy?: string
  resolvedAt?: Date
}

// 仲裁関連の型定義
export interface MediationRequest {
  id: string
  userId: string
  partnerId: string
  issue: string
  description: string
  urgency: 'low' | 'medium' | 'high'
  status: 'pending' | 'analyzing' | 'resolved' | 'cancelled'
  analysis?: MediationAnalysis
  suggestions?: MediationSuggestion[]
  createdAt: Date
  updatedAt: Date
}

export interface MediationAnalysis {
  id: string
  requestId: string
  patterns: string[]
  emotions: string[]
  suggestions: string[]
  confidence: number
  createdAt: Date
}

export interface MediationSuggestion {
  id: string
  requestId: string
  title: string
  description: string
  steps: string[]
  estimatedTime: string
  difficulty: 'easy' | 'medium' | 'hard'
  acceptanceRate?: number
}

// Date Canvas関連の型定義
export interface Canvas {
  id: string
  planId: string
  title: string
  elements: CanvasElement[]
  background?: string
  createdAt: Date
  updatedAt: Date
}

export interface CanvasElement {
  id: string
  type: 'text' | 'image' | 'pin' | 'shape'
  position: { x: number; y: number }
  size: { width: number; height: number }
  content: any
  style?: any
  locked?: boolean
}

// 課金関連の型定義
export interface Subscription {
  id: string
  userId: string
  plan: 'free' | 'basic' | 'premium'
  status: 'active' | 'cancelled' | 'expired'
  startDate: Date
  endDate?: Date
  autoRenew: boolean
  features: string[]
}

export interface Payment {
  id: string
  userId: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  method: string
  transactionId?: string
  createdAt: Date
}

// 通知関連の型定義
export interface Notification {
  id: string
  userId: string
  type: 'plan_created' | 'plan_updated' | 'partner_joined' | 'reminder' | 'system'
  title: string
  message: string
  read: boolean
  data?: any
  createdAt: Date
}

// API関連の型定義
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// フォーム関連の型定義
export interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'checkbox' | 'radio'
  required: boolean
  placeholder?: string
  options?: { value: string; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
}

export interface FormData {
  [key: string]: any
}

// 検索関連の型定義
export interface SearchFilters {
  category?: string
  location?: string
  budget?: {
    min: number
    max: number
  }
  rating?: number
  features?: string[]
  date?: string
  time?: string
}

export interface SearchResult<T> {
  items: T[]
  total: number
  filters: SearchFilters
  suggestions?: string[]
}

// 統計関連の型定義
export interface UserStats {
  totalPlans: number
  completedPlans: number
  favoriteSpots: number
  totalSpent: number
  averageRating: number
  monthlyPlans: number
}

export interface AppStats {
  totalUsers: number
  totalPlans: number
  activeUsers: number
  popularSpots: Spot[]
  trendingArticles: Article[]
}
