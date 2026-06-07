export type Platform = 'weibo' | 'douyin' | 'zhihu' | 'xiaohongshu' | 'bilibili';
export type Trend = 'rising' | 'stable' | 'falling';
export type CompetitionLevel = 'low' | 'medium' | 'high';
export type TitleStyle = 'curiosity' | 'emotion' | 'practical' | 'controversy' | 'story';

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
