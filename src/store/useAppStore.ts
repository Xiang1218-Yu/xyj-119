import { create } from 'zustand';
import { HotSpot, UserProfile, TopicSuggestion, TitleVariant, ScriptFramework, InspirationCombination, InspirationDimension, InspirationItem } from '@/types';
import { mockHotSpots, mockUserProfile, generateTopics, generateTitles, generateScript, refreshHotSpots, getRandomInspirationItem } from '@/data/mockData';

interface AppState {
  userProfile: UserProfile;
  hotSpots: HotSpot[];
  selectedHotSpot: HotSpot | null;
  topics: TopicSuggestion[];
  selectedTopic: TopicSuggestion | null;
  titleVariants: TitleVariant[];
  selectedTitles: TitleVariant[];
  scriptFramework: ScriptFramework | null;
  currentPage: 'hotspot' | 'topic' | 'title' | 'script' | 'inspiration' | 'profile';
  selectedPlatform: string | null;
  sortBy: 'heat' | 'match' | 'time';
  isRefreshing: boolean;
  favoriteIds: string[];
  scrollToHotSpotId: string | null;
  currentInspiration: InspirationCombination | null;
  favoriteInspirations: InspirationCombination[];
  lockedDimensions: Record<InspirationDimension, boolean>;
  isRollingInspiration: boolean;
  
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
  toggleFavorite: (hotSpotId: string) => void;
  isFavorite: (hotSpotId: string) => boolean;
  setScrollToHotSpotId: (id: string | null) => void;
  rollInspiration: () => void;
  toggleDimensionLock: (dimension: InspirationDimension) => void;
  toggleInspirationFavorite: (inspirationId: string) => void;
  removeFavoriteInspiration: (inspirationId: string) => void;
  generateInspirationCombination: () => InspirationCombination;
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
  favoriteIds: [],
  scrollToHotSpotId: null,
  currentInspiration: null,
  favoriteInspirations: [],
  lockedDimensions: {
    scene: false,
    emotion: false,
    style: false,
    audience: false,
    format: false,
  },
  isRollingInspiration: false,

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

  toggleFavorite: (hotSpotId) => {
    const { favoriteIds } = get();
    const isFavorited = favoriteIds.includes(hotSpotId);
    let newFavoriteIds: string[];
    if (isFavorited) {
      newFavoriteIds = favoriteIds.filter(id => id !== hotSpotId);
    } else {
      newFavoriteIds = [...favoriteIds, hotSpotId];
    }
    set({ favoriteIds: newFavoriteIds });
    try {
      localStorage.setItem('favoriteHotSpots', JSON.stringify(newFavoriteIds));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage');
    }
  },

  isFavorite: (hotSpotId) => {
    return get().favoriteIds.includes(hotSpotId);
  },

  setScrollToHotSpotId: (id) => set({ scrollToHotSpotId: id }),

  generateInspirationCombination: () => {
    const { lockedDimensions, currentInspiration } = get();
    const dimensions: InspirationDimension[] = ['scene', 'emotion', 'style', 'audience', 'format'];
    
    const combination: Partial<InspirationCombination> = {};
    
    dimensions.forEach(dim => {
      if (lockedDimensions[dim] && currentInspiration) {
        combination[dim] = currentInspiration[dim];
      } else {
        combination[dim] = getRandomInspirationItem(dim);
      }
    });
    
    return {
      id: `inspiration-${Date.now()}`,
      scene: combination.scene!,
      emotion: combination.emotion!,
      style: combination.style!,
      audience: combination.audience!,
      format: combination.format!,
      createdAt: Date.now(),
      isFavorite: false,
    };
  },

  rollInspiration: async () => {
    set({ isRollingInspiration: true });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newCombination = get().generateInspirationCombination();
    set({ 
      currentInspiration: newCombination,
      isRollingInspiration: false 
    });
  },

  toggleDimensionLock: (dimension) => {
    const { lockedDimensions } = get();
    set({
      lockedDimensions: {
        ...lockedDimensions,
        [dimension]: !lockedDimensions[dimension],
      },
    });
  },

  toggleInspirationFavorite: (inspirationId) => {
    const { favoriteInspirations, currentInspiration } = get();
    
    if (currentInspiration && currentInspiration.id === inspirationId) {
      const isFavorited = currentInspiration.isFavorite;
      const updatedInspiration = {
        ...currentInspiration,
        isFavorite: !isFavorited,
      };
      
      let newFavorites: InspirationCombination[];
      if (isFavorited) {
        newFavorites = favoriteInspirations.filter(f => f.id !== inspirationId);
      } else {
        newFavorites = [...favoriteInspirations, updatedInspiration];
      }
      
      set({
        currentInspiration: updatedInspiration,
        favoriteInspirations: newFavorites,
      });
      
      try {
        localStorage.setItem('favoriteInspirations', JSON.stringify(newFavorites));
      } catch (e) {
        console.warn('Failed to save inspiration favorites to localStorage');
      }
    } else {
      const isFavorited = favoriteInspirations.some(f => f.id === inspirationId);
      let newFavorites: InspirationCombination[];
      
      if (isFavorited) {
        newFavorites = favoriteInspirations.filter(f => f.id !== inspirationId);
      } else {
        const favToUpdate = favoriteInspirations.find(f => f.id === inspirationId);
        if (favToUpdate) {
          newFavorites = [...favoriteInspirations, { ...favToUpdate, isFavorite: true }];
        } else {
          newFavorites = favoriteInspirations;
        }
      }
      
      set({ favoriteInspirations: newFavorites });
      
      try {
        localStorage.setItem('favoriteInspirations', JSON.stringify(newFavorites));
      } catch (e) {
        console.warn('Failed to save inspiration favorites to localStorage');
      }
    }
  },

  removeFavoriteInspiration: (inspirationId) => {
    const { favoriteInspirations, currentInspiration } = get();
    const newFavorites = favoriteInspirations.filter(f => f.id !== inspirationId);
    
    let updatedCurrent = currentInspiration;
    if (currentInspiration && currentInspiration.id === inspirationId) {
      updatedCurrent = { ...currentInspiration, isFavorite: false };
    }
    
    set({
      favoriteInspirations: newFavorites,
      currentInspiration: updatedCurrent,
    });
    
    try {
      localStorage.setItem('favoriteInspirations', JSON.stringify(newFavorites));
    } catch (e) {
      console.warn('Failed to save inspiration favorites to localStorage');
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

const loadSavedFavorites = () => {
  try {
    const saved = localStorage.getItem('favoriteHotSpots');
    if (saved) {
      const favoriteIds = JSON.parse(saved);
      useAppStore.setState({ favoriteIds });
    }
  } catch (e) {
    console.warn('Failed to load favorites from localStorage');
  }
};

loadSavedProfile();
loadSavedFavorites();

const loadSavedInspirationFavorites = () => {
  try {
    const saved = localStorage.getItem('favoriteInspirations');
    if (saved) {
      const favoriteInspirations = JSON.parse(saved);
      useAppStore.setState({ favoriteInspirations });
    }
  } catch (e) {
    console.warn('Failed to load inspiration favorites from localStorage');
  }
};

loadSavedInspirationFavorites();
