export interface VibeProject {
  id: string
  name: string
  url: string
  description: string
  category: string
  aiTools: string[]
  source: string
  sourceUrl?: string
  coverUrl?: string
  featured?: boolean
  createdAt: string
}

export type Category = '全部' | '游戏' | '工具' | '创意' | '聊天' | '数据可视化' | '生活'
export type AiTool = '全部' | 'Cursor' | 'Claude' | 'ChatGPT' | 'Bolt' | 'v0' | '其他'

export const CATEGORY_COLORS: Record<string, string> = {
  '游戏': '#EC4899',
  '工具': '#3B82F6',
  '创意': '#8B5CF6',
  '聊天': '#10B981',
  '数据可视化': '#F59E0B',
  '生活': '#06B6D4',
}

export const CATEGORY_EMOJIS: Record<string, string> = {
  '游戏': '🎮',
  '工具': '🔧',
  '创意': '✨',
  '聊天': '💬',
  '数据可视化': '📊',
  '生活': '🌟',
}

export const AI_TOOL_COLORS: Record<string, string> = {
  'Cursor': '#8B5CF6',
  'Claude': '#F97316',
  'ChatGPT': '#10B981',
  'Bolt': '#3B82F6',
  'v0': '#94A3B8',
  '其他': '#64748B',
}

export const SOURCE_ICONS: Record<string, string> = {
  'Twitter': '🐦',
  'Reddit': '🟠',
  'Product Hunt': '🐱',
  '即刻': '⚡',
  '小红书': '📖',
  '其他': '🌐',
}
