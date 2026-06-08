export type Platform = 'weibo' | 'douyin' | 'zhihu' | 'xiaohongshu' | 'bilibili';
export type Trend = 'rising' | 'stable' | 'falling';
export type CompetitionLevel = 'low' | 'medium' | 'high';
export type TitleStyle = 'curiosity' | 'emotion' | 'practical' | 'controversy' | 'story';

export type ContentType = 'article' | 'video' | 'shortVideo' | 'live' | 'podcast' | 'carousel';
export type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';
export type PomodoroStatus = 'idle' | 'running' | 'paused';

export interface HotSpot {
  id: string;
  title: string;
  platform: Platform;
  heatIndex: number;
  trend: Trend;
  matchScore: number;
  category: string;
  description: string;
  timeline: Array<{ time: string; event: string }>;
  relatedTopics: string[];
  createdAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  domain: string[];
  audience: string[];
  style: string[];
  platform: string[];
}

export interface TopicSuggestion {
  id: string;
  hotSpotId: string;
  title: string;
  angle: string;
  description: string;
  audienceAnalysis: string;
  competitionLevel: CompetitionLevel;
  contentDirections: string[];
  score: number;
  tags: string[];
}

export interface TitleVariant {
  id: string;
  topicId: string;
  title: string;
  style: TitleStyle;
  scores: {
    curiosity: number;
    emotion: number;
    practical: number;
    uniqueness: number;
    overall: number;
  };
  analysis: string;
  suggestions: string[];
}

export interface ScriptFramework {
  id: string;
  topicId: string;
  title: string;
  hook: {
    type: string;
    content: string;
    duration: string;
  };
  body: Array<{
    id: string;
    title: string;
    content: string;
    duration: string;
    goldenQuote?: string;
  }>;
  goldenQuotes: Array<{
    id: string;
    content: string;
    position: string;
    type: string;
  }>;
  easterEggs: Array<{
    id: string;
    position: string;
    type: string;
    description: string;
  }>;
  ending: {
    content: string;
    callToAction: string;
    duration: string;
  };
  totalDuration: string;
}

export type InspirationDimension = 'scene' | 'emotion' | 'style' | 'audience' | 'format';

export interface InspirationDimensionData {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface InspirationItem {
  id: string;
  text: string;
  description?: string;
  tags?: string[];
}

export interface InspirationCombination {
  id: string;
  scene: InspirationItem;
  emotion: InspirationItem;
  style: InspirationItem;
  audience: InspirationItem;
  format: InspirationItem;
  createdAt: number;
  isFavorite: boolean;
}

export interface InspirationState {
  currentCombination: InspirationCombination | null;
  favoriteCombinations: InspirationCombination[];
  lockedDimensions: Record<InspirationDimension, boolean>;
  isRolling: boolean;
}

export interface ContentTypeConfig {
  type: ContentType;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  contentType: ContentType;
  platform: string;
  scheduledDate: string;
  scheduledTime?: string;
  reminderEnabled: boolean;
  reminderMinutesBefore?: number;
  topicId?: string;
  status: 'draft' | 'scheduled' | 'published' | 'cancelled';
  createdAt: string;
}

export interface PomodoroSession {
  id: string;
  mode: PomodoroMode;
  duration: number;
  startTime: number;
  endTime?: number;
  completed: boolean;
  taskTitle?: string;
}

export interface PomodoroState {
  status: PomodoroStatus;
  mode: PomodoroMode;
  timeRemaining: number;
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
  completedSessions: number;
  currentSessionStart: number | null;
  sessions: PomodoroSession[];
}
