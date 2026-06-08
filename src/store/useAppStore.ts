import { create } from 'zustand';
import { HotSpot, UserProfile, TopicSuggestion, TitleVariant, ScriptFramework, InspirationCombination, InspirationDimension, InspirationItem, CalendarEvent, PomodoroState, PomodoroMode, PomodoroSession, ContentChecklist, ChecklistItem } from '@/types';
import { mockHotSpots, mockUserProfile, generateTopics, generateTitles, generateScript, refreshHotSpots, getRandomInspirationItem, mockCalendarEvents, generateCalendarEvent, generateChecklist, generateChecklistItem } from '@/data/mockData';

interface AppState {
  userProfile: UserProfile;
  hotSpots: HotSpot[];
  selectedHotSpot: HotSpot | null;
  topics: TopicSuggestion[];
  selectedTopic: TopicSuggestion | null;
  titleVariants: TitleVariant[];
  selectedTitles: TitleVariant[];
  scriptFramework: ScriptFramework | null;
  currentPage: 'hotspot' | 'topic' | 'title' | 'script' | 'inspiration' | 'profile' | 'calendar';
  calendarEvents: CalendarEvent[];
  selectedCalendarEvent: CalendarEvent | null;
  pomodoro: PomodoroState;
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
  updateScriptFramework: (updates: Partial<ScriptFramework>) => void;
  updateScriptBodySection: (sectionId: string, updates: Partial<ScriptFramework['body'][0]>) => void;
  updateScriptGoldenQuote: (quoteId: string, updates: Partial<ScriptFramework['goldenQuotes'][0]>) => void;
  updateScriptEasterEgg: (eggId: string, updates: Partial<ScriptFramework['easterEggs'][0]>) => void;
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
  
  addCalendarEvent: (event: Partial<CalendarEvent>) => CalendarEvent;
  updateCalendarEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteCalendarEvent: (id: string) => void;
  setSelectedCalendarEvent: (event: CalendarEvent | null) => void;
  moveCalendarEvent: (id: string, newDate: string, newTime?: string) => void;
  toggleReminder: (id: string) => void;
  
  startPomodoro: (taskTitle?: string) => void;
  pausePomodoro: () => void;
  resumePomodoro: () => void;
  resetPomodoro: () => void;
  tickPomodoro: () => void;
  setPomodoroDuration: (mode: PomodoroMode, minutes: number) => void;
  skipPomodoro: () => void;

  checklists: Record<string, ContentChecklist>;
  activeChecklistId: string | null;
  
  createChecklist: (data: { scriptId?: string; calendarEventId?: string; platform?: string; title?: string }) => ContentChecklist;
  getChecklist: (id: string) => ContentChecklist | undefined;
  getChecklistByScriptId: (scriptId: string) => ContentChecklist | undefined;
  getChecklistByCalendarEventId: (eventId: string) => ContentChecklist | undefined;
  toggleChecklistItem: (checklistId: string, itemId: string) => void;
  addChecklistItem: (checklistId: string, item: Partial<ChecklistItem>) => void;
  removeChecklistItem: (checklistId: string, itemId: string) => void;
  updateChecklistItem: (checklistId: string, itemId: string, updates: Partial<ChecklistItem>) => void;
  setActiveChecklistId: (id: string | null) => void;
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
  calendarEvents: mockCalendarEvents,
  selectedCalendarEvent: null,
  pomodoro: {
    status: 'idle',
    mode: 'work',
    timeRemaining: 25 * 60,
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsBeforeLongBreak: 4,
    completedSessions: 0,
    currentSessionStart: null,
    sessions: [],
  },
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
  checklists: {},
  activeChecklistId: null,

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

  updateScriptFramework: (updates) => {
    const { scriptFramework } = get();
    if (!scriptFramework) return;
    set({
      scriptFramework: { ...scriptFramework, ...updates },
    });
  },

  updateScriptBodySection: (sectionId, updates) => {
    const { scriptFramework } = get();
    if (!scriptFramework) return;
    const updatedBody = scriptFramework.body.map((section) =>
      section.id === sectionId ? { ...section, ...updates } : section
    );
    set({
      scriptFramework: { ...scriptFramework, body: updatedBody },
    });
  },

  updateScriptGoldenQuote: (quoteId, updates) => {
    const { scriptFramework } = get();
    if (!scriptFramework) return;
    const updatedQuotes = scriptFramework.goldenQuotes.map((quote) =>
      quote.id === quoteId ? { ...quote, ...updates } : quote
    );
    set({
      scriptFramework: { ...scriptFramework, goldenQuotes: updatedQuotes },
    });
  },

  updateScriptEasterEgg: (eggId, updates) => {
    const { scriptFramework } = get();
    if (!scriptFramework) return;
    const updatedEggs = scriptFramework.easterEggs.map((egg) =>
      egg.id === eggId ? { ...egg, ...updates } : egg
    );
    set({
      scriptFramework: { ...scriptFramework, easterEggs: updatedEggs },
    });
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

  addCalendarEvent: (event) => {
    const { calendarEvents } = get();
    const newEvent = generateCalendarEvent(event);
    const updatedEvents = [...calendarEvents, newEvent];
    set({ calendarEvents: updatedEvents });
    try {
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    } catch (e) {
      console.warn('Failed to save calendar events to localStorage');
    }
    return newEvent;
  },

  updateCalendarEvent: (id, updates) => {
    const { calendarEvents } = get();
    const updatedEvents = calendarEvents.map(e =>
      e.id === id ? { ...e, ...updates } : e
    );
    set({ calendarEvents: updatedEvents });
    try {
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    } catch (e) {
      console.warn('Failed to save calendar events to localStorage');
    }
  },

  deleteCalendarEvent: (id) => {
    const { calendarEvents, selectedCalendarEvent } = get();
    const updatedEvents = calendarEvents.filter(e => e.id !== id);
    set({
      calendarEvents: updatedEvents,
      selectedCalendarEvent: selectedCalendarEvent?.id === id ? null : selectedCalendarEvent,
    });
    try {
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    } catch (e) {
      console.warn('Failed to save calendar events to localStorage');
    }
  },

  setSelectedCalendarEvent: (event) => set({ selectedCalendarEvent: event }),

  moveCalendarEvent: (id, newDate, newTime) => {
    const { calendarEvents } = get();
    const updatedEvents = calendarEvents.map(e =>
      e.id === id ? { ...e, scheduledDate: newDate, scheduledTime: newTime ?? e.scheduledTime } : e
    );
    set({ calendarEvents: updatedEvents });
    try {
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    } catch (e) {
      console.warn('Failed to save calendar events to localStorage');
    }
  },

  toggleReminder: (id) => {
    const { calendarEvents } = get();
    const updatedEvents = calendarEvents.map(e =>
      e.id === id ? { ...e, reminderEnabled: !e.reminderEnabled } : e
    );
    set({ calendarEvents: updatedEvents });
    try {
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    } catch (e) {
      console.warn('Failed to save calendar events to localStorage');
    }
  },

  startPomodoro: (taskTitle) => {
    const { pomodoro } = get();
    const duration = pomodoro.mode === 'work' ? pomodoro.workDuration :
      pomodoro.mode === 'shortBreak' ? pomodoro.shortBreakDuration : pomodoro.longBreakDuration;
    
    const session: PomodoroSession = {
      id: `pomodoro-${Date.now()}`,
      mode: pomodoro.mode,
      duration: duration * 60,
      startTime: Date.now(),
      completed: false,
      taskTitle,
    };

    set({
      pomodoro: {
        ...pomodoro,
        status: 'running',
        timeRemaining: duration * 60,
        currentSessionStart: Date.now(),
        sessions: [...pomodoro.sessions, session],
      },
    });
  },

  pausePomodoro: () => {
    const { pomodoro } = get();
    set({
      pomodoro: {
        ...pomodoro,
        status: 'paused',
      },
    });
  },

  resumePomodoro: () => {
    const { pomodoro } = get();
    set({
      pomodoro: {
        ...pomodoro,
        status: 'running',
      },
    });
  },

  resetPomodoro: () => {
    const { pomodoro } = get();
    const duration = pomodoro.mode === 'work' ? pomodoro.workDuration :
      pomodoro.mode === 'shortBreak' ? pomodoro.shortBreakDuration : pomodoro.longBreakDuration;
    
    set({
      pomodoro: {
        ...pomodoro,
        status: 'idle',
        timeRemaining: duration * 60,
        currentSessionStart: null,
        sessions: pomodoro.sessions.map(s => s.endTime ? s : { ...s, endTime: Date.now() }),
      },
    });
  },

  tickPomodoro: () => {
    const { pomodoro } = get();
    if (pomodoro.status !== 'running') return;

    const newTimeRemaining = pomodoro.timeRemaining - 1;

    if (newTimeRemaining <= 0) {
      const nextMode = pomodoro.mode === 'work'
        ? (pomodoro.completedSessions + 1) % pomodoro.sessionsBeforeLongBreak === 0
          ? 'longBreak'
          : 'shortBreak'
        : 'work';

      const nextDuration = nextMode === 'work' ? pomodoro.workDuration :
        nextMode === 'shortBreak' ? pomodoro.shortBreakDuration : pomodoro.longBreakDuration;

      const updatedSessions = pomodoro.sessions.map(s =>
        !s.endTime ? { ...s, endTime: Date.now(), completed: true } : s
      );

      const nextSession: PomodoroSession = {
        id: `pomodoro-${Date.now()}`,
        mode: nextMode,
        duration: nextDuration * 60,
        startTime: Date.now(),
        completed: false,
      };

      set({
        pomodoro: {
          ...pomodoro,
          status: 'running',
          mode: nextMode,
          timeRemaining: nextDuration * 60,
          completedSessions: pomodoro.mode === 'work' ? pomodoro.completedSessions + 1 : pomodoro.completedSessions,
          currentSessionStart: Date.now(),
          sessions: [...updatedSessions, nextSession],
        },
      });

      try {
        localStorage.setItem('pomodoroSessions', JSON.stringify([...updatedSessions, nextSession]));
      } catch (e) {
        console.warn('Failed to save pomodoro sessions to localStorage');
      }
    } else {
      set({
        pomodoro: {
          ...pomodoro,
          timeRemaining: newTimeRemaining,
        },
      });
    }
  },

  setPomodoroDuration: (mode, minutes) => {
    const { pomodoro } = get();
    const key = mode === 'work' ? 'workDuration' :
      mode === 'shortBreak' ? 'shortBreakDuration' : 'longBreakDuration';
    
    set({
      pomodoro: {
        ...pomodoro,
        [key]: minutes,
        timeRemaining: pomodoro.mode === mode && pomodoro.status === 'idle' ? minutes * 60 : pomodoro.timeRemaining,
      },
    });
  },

  skipPomodoro: () => {
    const { pomodoro } = get();
    const nextMode = pomodoro.mode === 'work' ? 'shortBreak' : 'work';
    const nextDuration = nextMode === 'work' ? pomodoro.workDuration : pomodoro.shortBreakDuration;

    set({
      pomodoro: {
        ...pomodoro,
        status: 'idle',
        mode: nextMode,
        timeRemaining: nextDuration * 60,
        currentSessionStart: null,
      },
    });
  },

  createChecklist: (data) => {
    const { checklists } = get();
    const newChecklist = generateChecklist(data);
    const updatedChecklists = { ...checklists, [newChecklist.id]: newChecklist };
    set({ 
      checklists: updatedChecklists,
      activeChecklistId: newChecklist.id,
    });
    try {
      localStorage.setItem('checklists', JSON.stringify(updatedChecklists));
    } catch (e) {
      console.warn('Failed to save checklists to localStorage');
    }
    return newChecklist;
  },

  getChecklist: (id) => {
    return get().checklists[id];
  },

  getChecklistByScriptId: (scriptId) => {
    const { checklists } = get();
    return Object.values(checklists).find(c => c.scriptId === scriptId);
  },

  getChecklistByCalendarEventId: (eventId) => {
    const { checklists } = get();
    return Object.values(checklists).find(c => c.calendarEventId === eventId);
  },

  toggleChecklistItem: (checklistId, itemId) => {
    const { checklists } = get();
    const checklist = checklists[checklistId];
    if (!checklist) return;

    const updatedItems = checklist.items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          completed: !item.completed,
          completedAt: !item.completed ? new Date().toISOString() : undefined,
        };
      }
      return item;
    });

    const updatedChecklist = {
      ...checklist,
      items: updatedItems,
      updatedAt: new Date().toISOString(),
    };

    const updatedChecklists = { ...checklists, [checklistId]: updatedChecklist };
    set({ checklists: updatedChecklists });
    try {
      localStorage.setItem('checklists', JSON.stringify(updatedChecklists));
    } catch (e) {
      console.warn('Failed to save checklists to localStorage');
    }
  },

  addChecklistItem: (checklistId, item) => {
    const { checklists } = get();
    const checklist = checklists[checklistId];
    if (!checklist) return;

    const newItem = generateChecklistItem(item);
    const updatedChecklist = {
      ...checklist,
      items: [...checklist.items, newItem],
      updatedAt: new Date().toISOString(),
    };

    const updatedChecklists = { ...checklists, [checklistId]: updatedChecklist };
    set({ checklists: updatedChecklists });
    try {
      localStorage.setItem('checklists', JSON.stringify(updatedChecklists));
    } catch (e) {
      console.warn('Failed to save checklists to localStorage');
    }
  },

  removeChecklistItem: (checklistId, itemId) => {
    const { checklists } = get();
    const checklist = checklists[checklistId];
    if (!checklist) return;

    const updatedItems = checklist.items.filter(item => item.id !== itemId);
    const updatedChecklist = {
      ...checklist,
      items: updatedItems,
      updatedAt: new Date().toISOString(),
    };

    const updatedChecklists = { ...checklists, [checklistId]: updatedChecklist };
    set({ checklists: updatedChecklists });
    try {
      localStorage.setItem('checklists', JSON.stringify(updatedChecklists));
    } catch (e) {
      console.warn('Failed to save checklists to localStorage');
    }
  },

  updateChecklistItem: (checklistId, itemId, updates) => {
    const { checklists } = get();
    const checklist = checklists[checklistId];
    if (!checklist) return;

    const updatedItems = checklist.items.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    );

    const updatedChecklist = {
      ...checklist,
      items: updatedItems,
      updatedAt: new Date().toISOString(),
    };

    const updatedChecklists = { ...checklists, [checklistId]: updatedChecklist };
    set({ checklists: updatedChecklists });
    try {
      localStorage.setItem('checklists', JSON.stringify(updatedChecklists));
    } catch (e) {
      console.warn('Failed to save checklists to localStorage');
    }
  },

  setActiveChecklistId: (id) => set({ activeChecklistId: id }),
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

const loadSavedCalendarEvents = () => {
  try {
    const saved = localStorage.getItem('calendarEvents');
    if (saved) {
      const calendarEvents = JSON.parse(saved);
      useAppStore.setState({ calendarEvents });
    }
  } catch (e) {
    console.warn('Failed to load calendar events from localStorage');
  }
};

loadSavedCalendarEvents();

const loadSavedPomodoroSessions = () => {
  try {
    const saved = localStorage.getItem('pomodoroSessions');
    if (saved) {
      const sessions = JSON.parse(saved);
      useAppStore.setState(state => ({
        pomodoro: { ...state.pomodoro, sessions },
      }));
    }
  } catch (e) {
    console.warn('Failed to load pomodoro sessions from localStorage');
  }
};

loadSavedPomodoroSessions();

const loadSavedChecklists = () => {
  try {
    const saved = localStorage.getItem('checklists');
    if (saved) {
      const checklists = JSON.parse(saved);
      useAppStore.setState({ checklists });
    }
  } catch (e) {
    console.warn('Failed to load checklists from localStorage');
  }
};

loadSavedChecklists();
