import { create } from 'zustand';
import { HotSpot, UserProfile, TopicSuggestion, TitleVariant, ScriptFramework } from '@/types';
import { mockHotSpots, mockUserProfile, generateTopics, generateTitles, generateScript } from '@/data/mockData';

interface AppState {
  userProfile: UserProfile;
  hotSpots: HotSpot[];
  selectedHotSpot: HotSpot | null;
  topics: TopicSuggestion[];
  selectedTopic: TopicSuggestion | null;
  titleVariants: TitleVariant[];
  selectedTitles: TitleVariant[];
  scriptFramework: ScriptFramework | null;
  currentPage: 'hotspot' | 'topic' | 'title' | 'script' | 'profile';
  selectedPlatform: string | null;
  sortBy: 'heat' | 'match' | 'time';
  
  setSelectedHotSpot: (hotspot: HotSpot | null) => void;
  setSelectedTopic: (topic: TopicSuggestion | null) => void;
  toggleTitleSelection: (title: TitleVariant) => void;
  setCurrentPage: (page: AppState['currentPage']) => void;
  setSelectedPlatform: (platform: string | null) => void;
  setSortBy: (sortBy: AppState['sortBy']) => void;
  generateTopicsForHotSpot: (hotSpotId: string) => void;
  generateTitlesForTopic: (topicId: string) => void;
  generateScriptForTopic: (topicId: string) => void;
  clearSelectedTitles: () => void;
  navigateToNextStep: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  userProfile: mockUserProfile,
  hotSpots: mockHotSpots,
  selectedHotSpot: null,
  topics: [],
  selectedTopic: null,
  titleVariants: [],
  selectedTitles: [],
  scriptFramework: null,
  currentPage: 'hotspot',
  selectedPlatform: null,
  sortBy: 'match',

  setSelectedHotSpot: (hotspot) => set({ selectedHotSpot: hotspot }),
  setSelectedTopic: (topic) => set({ selectedTopic: topic }),
  
  toggleTitleSelection: (title) => {
    const { selectedTitles } = get();
    const isSelected = selectedTitles.some(t => t.id === title.id);
    if (isSelected) {
      set({ selectedTitles: selectedTitles.filter(t => t.id !== title.id) });
    } else if (selectedTitles.length < 3) {
      set({ selectedTitles: [...selectedTitles, title] });
    }
  },
  
  setCurrentPage: (page) => set({ currentPage: page }),
  setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
  setSortBy: (sortBy) => set({ sortBy }),
  
  generateTopicsForHotSpot: (hotSpotId) => {
    const topics = generateTopics(hotSpotId);
    set({ topics, selectedTopic: null, titleVariants: [], selectedTitles: [], scriptFramework: null });
  },
  
  generateTitlesForTopic: (topicId) => {
    const titles = generateTitles(topicId);
    set({ titleVariants: titles, selectedTitles: [], scriptFramework: null });
  },
  
  generateScriptForTopic: (topicId) => {
    const script = generateScript(topicId);
    set({ scriptFramework: script });
  },
  
  clearSelectedTitles: () => set({ selectedTitles: [] }),
  
  navigateToNextStep: () => {
    const { currentPage, selectedHotSpot, selectedTopic } = get();
    if (currentPage === 'hotspot' && selectedHotSpot) {
      set({ currentPage: 'topic' });
    } else if (currentPage === 'topic' && selectedTopic) {
      set({ currentPage: 'title' });
    } else if (currentPage === 'title') {
      set({ currentPage: 'script' });
    }
  },
}));
