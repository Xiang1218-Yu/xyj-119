import { create } from 'zustand';
import { HotSpot, UserProfile, TopicSuggestion, TitleVariant, ScriptFramework } from '@/types';
import { mockHotSpots, mockUserProfile, generateTopics, generateTitles, generateScript, refreshHotSpots } from '@/data/mockData';

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
  isRefreshing: boolean;
  
  setSelectedHotSpot: (hotspot: HotSpot | null) => void;
  setSelectedTopic: (topic: TopicSuggestion | null) => void;
  toggleTitleSelection: (title: TitleVariant) => void;
  setCurrentPage: (page: AppState['currentPage']) => void;
  setSelectedPlatform: (platform: string | null) => void;
  setSortBy: (sortBy: AppState['sortBy']) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  refreshHotSpotList: () => Promise<void>;
  generateTopicsForHotSpot: (hotSpotId: string) => void;
  generateTitlesForTopic: (topicId: string, regenerate?: boolean) => void;
  generateScriptForTopic: (topicId: string, regenerate?: boolean) => void;
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
  isRefreshing: false,

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
  
  updateUserProfile: (profile) => {
    const { userProfile } = get();
    const updated = { ...userProfile, ...profile };
    set({ userProfile: updated });
    try {
      localStorage.setItem('userProfile', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save profile to localStorage');
    }
  },
  
  refreshHotSpotList: async () => {
    set({ isRefreshing: true });
    await new Promise(resolve => setTimeout(resolve, 800));
    const refreshed = refreshHotSpots();
    set({ hotSpots: refreshed, isRefreshing: false });
  },
  
  generateTopicsForHotSpot: (hotSpotId) => {
    const topics = generateTopics(hotSpotId);
    set({ topics, selectedTopic: null, titleVariants: [], selectedTitles: [], scriptFramework: null });
  },
  
  generateTitlesForTopic: (topicId, regenerate = false) => {
    const titles = generateTitles(topicId, regenerate);
    set({ titleVariants: titles, selectedTitles: [], scriptFramework: null });
  },
  
  generateScriptForTopic: (topicId, regenerate = false) => {
    const script = generateScript(topicId, regenerate);
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

const loadSavedProfile = () => {
  try {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      const profile = JSON.parse(saved);
      useAppStore.setState({ userProfile: profile });
    }
  } catch (e) {
    console.warn('Failed to load profile from localStorage');
  }
};

loadSavedProfile();
