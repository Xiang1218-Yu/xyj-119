import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Bell, 
  BellOff, 
  Trash2, 
  X, 
  Save,
  BarChart3,
  Clock,
  Video,
  FileText,
  Radio,
  Image,
  LiveTv
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { useState, useMemo, useRef } from 'react';
import { contentTypeConfigs } from '@/data/mockData';
import PomodoroTimer from '@/components/common/PomodoroTimer';
import type { CalendarEvent, ContentType } from '@/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const contentTypeIcons: Record<ContentType, any> = {
  article: FileText,
  video: Video,
  shortVideo: Clock,
  live: LiveTv,
  podcast: Radio,
  carousel: Image,
};

const statusColors = {
  draft: 'bg-slate-600',
  scheduled: 'bg-amber-500',
  published: 'bg-emerald-500',
  cancelled: 'bg-rose-500',
};

const statusLabels = {
  draft: '草稿',
  scheduled: '已排期',
  published: '已发布',
  cancelled: '已取消',
};

const platformOptions = ['抖音', '小红书', 'B站', '公众号', '微博', '知乎', '视频号', '小宇宙', '快手'];

export default function CalendarPage() {
  const { 
    calendarEvents, 
    addCalendarEvent, 
    updateCalendarEvent, 
    deleteCalendarEvent,
    selectedCalendarEvent,
    setSelectedCalendarEvent,
    moveCalendarEvent,
    toggleReminder
  } = useAppStore();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<CalendarEvent> | null>(null);
  const [draggedEvent, setDraggedEvent] = useState<string | null>(null);
  const [dragOverDate, setDragOverDate] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  }, [startDate]);

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {};
    calendarEvents.forEach(event => {
      if (!map[event.scheduledDate]) {
        map[event.scheduledDate] = [];
      }
      map[event.scheduledDate].push(event);
    });
    return map;
  }, [calendarEvents]);

  const formatDateKey = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return formatDateKey(date) === formatDateKey(today);
  };

  const isCurrentMonth = (date: Date): boolean => {
    return date.getMonth() === month;
  };

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleOpenAddModal = (date?: Date) => {
    setEditingEvent({
      title: '',
      description: '',
      contentType: 'article',
      platform: '公众号',
      scheduledDate: date ? formatDateKey(date) : formatDateKey(new Date()),
      scheduledTime: '09:00',
      reminderEnabled: true,
      reminderMinutesBefore: 30,
      status: 'draft',
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (event: CalendarEvent) => {
    setEditingEvent({ ...event });
    setShowModal(true);
  };

  const handleSaveEvent = () => {
    if (!editingEvent || !editingEvent.title?.trim()) return;

    if (editingEvent.id) {
      updateCalendarEvent(editingEvent.id, editingEvent);
    } else {
      addCalendarEvent(editingEvent);
    }
    setShowModal(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id: string) => {
    deleteCalendarEvent(id);
    setShowModal(false);
    setEditingEvent(null);
  };

  const handleDragStart = (e: React.DragEvent, eventId: string) => {
    setDraggedEvent(eventId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, date: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverDate(date);
  };

  const handleDragLeave = () => {
    setDragOverDate(null);
  };

  const handleDrop = (e: React.DragEvent, date: string) => {
    e.preventDefault();
    if (draggedEvent) {
      moveCalendarEvent(draggedEvent, date);
    }
    setDraggedEvent(null);
    setDragOverDate(null);
  };

  const handleDragEnd = () => {
    setDraggedEvent(null);
    setDragOverDate(null);
  };

  const getContentTypeConfig = (type: ContentType) => {
    return contentTypeConfigs.find(c => c.type === type) || contentTypeConfigs[0];
  };

  const statistics = useMemo(() => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const monthAgo = new Date(today);
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const thisWeekEvents = calendarEvents.filter(e => {
      const eventDate = new Date(e.scheduledDate);
      return eventDate >= weekAgo && eventDate <= today;
    });

    const thisMonthEvents = calendarEvents.filter(e => {
      const eventDate = new Date(e.scheduledDate);
      return eventDate >= monthAgo && eventDate <= today;
    });

    const typeCounts: Record<string, number> = {};
    const platformCounts: Record<string, number> = {};
    const dailyCounts: Record<string, number> = {};

    calendarEvents.forEach(event => {
      typeCounts[event.contentType] = (typeCounts[event.contentType] || 0) + 1;
      platformCounts[event.platform] = (platformCounts[event.platform] || 0) + 1;
      
      const eventDate = new Date(event.scheduledDate);
      if (eventDate >= monthAgo && eventDate <= today) {
        const dateKey = formatDateKey(eventDate);
        dailyCounts[dateKey] = (dailyCounts[dateKey] || 0) + 1;
      }
    });

    const chartData = Object.entries(dailyCounts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => {
        const d = new Date(date);
        return {
          date: `${d.getMonth() + 1}/${d.getDate()}`,
          count,
          fullDate: date,
        };
      });

    return {
      thisWeekCount: thisWeekEvents.length,
      thisMonthCount: thisMonthEvents.length,
      totalCount: calendarEvents.length,
      publishedCount: calendarEvents.filter(e => e.status === 'published').length,
      scheduledCount: calendarEvents.filter(e => e.status === 'scheduled').length,
      draftCount: calendarEvents.filter(e => e.status === 'draft').length,
      typeCounts,
      platformCounts,
      chartData,
    };
  }, [calendarEvents]);

  const getChartColor = (index: number) => {
    const colors = ['#8B5CF6', '#10B981', '#F59E0B', '#F43F5E', '#06B6D4', '#EC4899'];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800"
      >
        <div className="px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-white">内容发布日历</h1>
              </div>
              <p className="text-slate-400 text-sm">
                规划你的内容发布时间，保持稳定的创作节奏
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOpenAddModal()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 transition-all"
            >
              <Plus className="w-4 h-4" />
              添加发布计划
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={goToPrevMonth}
                    className="p-2 rounded-lg hover:bg-slate-700/50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <h2 className="text-xl font-bold text-white">
                    {year}年{month + 1}月
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={goToNextMonth}
                    className="p-2 rounded-lg hover:bg-slate-700/50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goToToday}
                    className="px-3 py-1.5 text-sm rounded-lg bg-violet-500/20 text-violet-300 hover:bg-violet-500/30"
                  >
                    今天
                  </motion.button>
                </div>

                <div className="flex items-center gap-3">
                  {contentTypeConfigs.map(config => (
                    <div key={config.type} className="flex items-center gap-1.5">
                      <div className={cn("w-2 h-2 rounded-full", config.bgColor, config.borderColor, "border")} />
                      <span className="text-xs text-slate-400">{config.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-2">
                {weekDays.map(day => (
                  <div key={day} className="text-center text-xs text-slate-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, index) => {
                  const dateKey = formatDateKey(date);
                  const dayEvents = eventsByDate[dateKey] || [];
                  const isTodayDate = isToday(date);
                  const isCurrent = isCurrentMonth(date);
                  const isDragOver = dragOverDate === dateKey;

                  return (
                    <motion.div
                      key={dateKey + index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.01 }}
                      onDragOver={(e) => handleDragOver(e, dateKey)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, dateKey)}
                      onClick={() => {
                        if (!dayEvents.length) {
                          handleOpenAddModal(date);
                        }
                      }}
                      className={cn(
                        "min-h-28 p-1.5 rounded-xl border transition-all cursor-pointer group",
                        isCurrent ? "bg-slate-800/30" : "bg-slate-900/30",
                        isTodayDate && "border-violet-500/50 bg-violet-500/10",
                        isDragOver && "border-dashed border-violet-400 bg-violet-500/20",
                        !isDragOver && "border-slate-700/30 hover:border-slate-600/50"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={cn(
                          "text-sm font-medium",
                          isCurrent ? "text-slate-300" : "text-slate-600",
                          isTodayDate && "text-violet-300"
                        )}>
                          {date.getDate()}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="text-xs text-slate-500">
                            {dayEvents.length}
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map((event, eventIndex) => {
                          const config = getContentTypeConfig(event.contentType);
                          const Icon = contentTypeIcons[event.contentType];
                          
                          return (
                            <motion.div
                              key={event.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.01 + eventIndex * 0.05 }}
                              draggable
                              onDragStart={(e) => handleDragStart(e, event.id)}
                              onDragEnd={handleDragEnd}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenEditModal(event);
                              }}
                              className={cn(
                                "text-xs p-1.5 rounded-lg border cursor-move group/event",
                                config.bgColor,
                                config.borderColor,
                                draggedEvent === event.id && "opacity-50"
                              )}
                            >
                              <div className="flex items-center gap-1">
                                <Icon className={cn("w-3 h-3 flex-shrink-0", config.color)} />
                                <span className="text-slate-200 truncate flex-1">
                                  {event.title}
                                </span>
                                <div className={cn(
                                  "w-1.5 h-1.5 rounded-full flex-shrink-0",
                                  statusColors[event.status]
                                )} />
                              </div>
                              {event.scheduledTime && (
                                <div className="text-[10px] text-slate-400 mt-0.5">
                                  {event.scheduledTime} · {event.platform}
                                </div>
                              )}
                            </motion.div>
                          );
                        })}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-slate-500 text-center py-1">
                            +{dayEvents.length - 3} 更多
                          </div>
                        )}
                      </div>

                      {!dayEvents.length && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center h-12">
                          <Plus className="w-4 h-4 text-slate-600" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-violet-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">发布频率统计</h3>
                  <p className="text-xs text-slate-400">过去30天的内容发布趋势</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-700/30">
                  <div className="text-2xl font-bold text-white">{statistics.thisWeekCount}</div>
                  <div className="text-xs text-slate-400">本周发布</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-700/30">
                  <div className="text-2xl font-bold text-emerald-400">{statistics.thisMonthCount}</div>
                  <div className="text-xs text-slate-400">本月发布</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-700/30">
                  <div className="text-2xl font-bold text-amber-400">{statistics.scheduledCount}</div>
                  <div className="text-xs text-slate-400">待发布</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-700/30">
                  <div className="text-2xl font-bold text-violet-400">{statistics.totalCount}</div>
                  <div className="text-xs text-slate-400">总计划</div>
                </div>
              </div>

              {statistics.chartData.length > 0 ? (
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statistics.chartData}>
                      <XAxis 
                        dataKey="date" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748B', fontSize: 11 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#64748B', fontSize: 11 }}
                        width={30}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1E293B',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          color: '#F1F5F9',
                          fontSize: '12px',
                        }}
                        formatter={(value: number) => [`${value} 篇`, '发布数量']}
                      />
                      <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {statistics.chartData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={getChartColor(index)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-slate-500">
                  暂无发布数据，开始添加你的第一个发布计划吧
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-3">内容类型分布</h4>
                  <div className="space-y-2">
                    {Object.entries(statistics.typeCounts).map(([type, count]) => {
                      const config = getContentTypeConfig(type as ContentType);
                      return (
                        <div key={type} className="flex items-center gap-3">
                          <div className={cn("w-3 h-3 rounded-full", config.bgColor, config.borderColor, "border")} />
                          <span className="text-sm text-slate-400 flex-1">{config.label}</span>
                          <span className="text-sm text-white font-medium">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-300 mb-3">发布平台分布</h4>
                  <div className="space-y-2">
                    {Object.entries(statistics.platformCounts).map(([platform, count]) => (
                      <div key={platform} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-slate-600" />
                        <span className="text-sm text-slate-400 flex-1">{platform}</span>
                        <span className="text-sm text-white font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="col-span-4 space-y-6">
            <PomodoroTimer />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50"
            >
              <h3 className="font-semibold text-white mb-4">即将发布</h3>
              <div className="space-y-3">
                {calendarEvents
                  .filter(e => e.status !== 'published' && e.status !== 'cancelled')
                  .sort((a, b) => a.scheduledDate.localeCompare(b.scheduledDate))
                  .slice(0, 5)
                  .map((event, index) => {
                    const config = getContentTypeConfig(event.contentType);
                    const eventDate = new Date(event.scheduledDate);
                    const today = new Date();
                    const diffDays = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        onClick={() => handleOpenEditModal(event)}
                        className="p-3 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 cursor-pointer transition-colors border border-transparent hover:border-slate-600/50"
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                            config.bgColor
                          )}>
                            {(() => {
                              const Icon = contentTypeIcons[event.contentType];
                              return <Icon className={cn("w-4 h-4", config.color)} />;
                            })()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-white truncate">
                              {event.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-slate-400">
                                {event.scheduledDate} {event.scheduledTime}
                              </span>
                              <span className="text-xs text-slate-500">·</span>
                              <span className="text-xs text-slate-400">{event.platform}</span>
                            </div>
                          </div>
                          <div className={cn(
                            "w-2 h-2 rounded-full flex-shrink-0 mt-2",
                            statusColors[event.status]
                          )} />
                        </div>
                        {diffDays >= 0 && diffDays <= 7 && (
                          <div className="mt-2 ml-11">
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded-full",
                              diffDays === 0 ? "bg-rose-500/20 text-rose-300" :
                              diffDays <= 2 ? "bg-amber-500/20 text-amber-300" :
                              "bg-emerald-500/20 text-emerald-300"
                            )}>
                              {diffDays === 0 ? "今天发布" : `还有 ${diffDays} 天`}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                {calendarEvents.filter(e => e.status !== 'published' && e.status !== 'cancelled').length === 0 && (
                  <div className="text-center py-8 text-slate-500 text-sm">
                    暂无待发布内容
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && editingEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <CalendarIcon className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {editingEvent.id ? '编辑发布计划' : '添加发布计划'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {editingEvent.id ? '修改内容发布安排' : '规划新的内容发布'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div>
                  <label className="text-sm text-slate-400 mb-1.5 block">内容标题 *</label>
                  <input
                    type="text"
                    value={editingEvent.title || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    placeholder="输入内容标题"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-1.5 block">内容描述</label>
                  <textarea
                    value={editingEvent.description || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                    placeholder="简要描述内容主题"
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-slate-400 mb-1.5 block">发布日期</label>
                    <input
                      type="date"
                      value={editingEvent.scheduledDate || ''}
                      onChange={(e) => setEditingEvent({ ...editingEvent, scheduledDate: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-400 mb-1.5 block">发布时间</label>
                    <input
                      type="time"
                      value={editingEvent.scheduledTime || ''}
                      onChange={(e) => setEditingEvent({ ...editingEvent, scheduledTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:border-violet-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">内容类型</label>
                  <div className="grid grid-cols-3 gap-2">
                    {contentTypeConfigs.map(config => {
                      const Icon = contentTypeIcons[config.type];
                      const isSelected = editingEvent.contentType === config.type;
                      return (
                        <button
                          key={config.type}
                          onClick={() => setEditingEvent({ ...editingEvent, contentType: config.type })}
                          className={cn(
                            "p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all",
                            isSelected
                              ? `${config.bgColor} ${config.borderColor} border`
                              : "bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50"
                          )}
                        >
                          <Icon className={cn("w-5 h-5", isSelected ? config.color : "text-slate-400")} />
                          <span className={cn("text-xs", isSelected ? "text-white" : "text-slate-400")}>
                            {config.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">发布平台</label>
                  <div className="flex flex-wrap gap-2">
                    {platformOptions.map(platform => {
                      const isSelected = editingEvent.platform === platform;
                      return (
                        <button
                          key={platform}
                          onClick={() => setEditingEvent({ ...editingEvent, platform })}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-sm transition-all",
                            isSelected
                              ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                              : "bg-slate-700/30 text-slate-400 border border-slate-600/50 hover:bg-slate-700/50"
                          )}
                        >
                          {platform}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-slate-400 mb-2 block">状态</label>
                  <div className="flex gap-2">
                    {(['draft', 'scheduled', 'published', 'cancelled'] as const).map(status => (
                      <button
                        key={status}
                        onClick={() => setEditingEvent({ ...editingEvent, status })}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-all",
                          editingEvent.status === status
                            ? "bg-slate-700 text-white"
                            : "bg-slate-700/30 text-slate-400 hover:bg-slate-700/50"
                        )}
                      >
                        <div className={cn("w-2 h-2 rounded-full", statusColors[status])} />
                        {statusLabels[status]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {editingEvent.reminderEnabled ? (
                        <Bell className="w-5 h-5 text-violet-400" />
                      ) : (
                        <BellOff className="w-5 h-5 text-slate-500" />
                      )}
                      <div>
                        <div className="text-sm text-white">发布提醒</div>
                        <div className="text-xs text-slate-400">
                          {editingEvent.reminderEnabled
                            ? `发布前 ${editingEvent.reminderMinutesBefore || 30} 分钟提醒`
                            : '未开启提醒'}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditingEvent({
                        ...editingEvent,
                        reminderEnabled: !editingEvent.reminderEnabled
                      })}
                      className={cn(
                        "relative w-12 h-6 rounded-full transition-colors",
                        editingEvent.reminderEnabled ? "bg-violet-500" : "bg-slate-600"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                        editingEvent.reminderEnabled ? "left-7" : "left-1"
                      )} />
                    </button>
                  </div>

                  {editingEvent.reminderEnabled && (
                    <div className="mt-4">
                      <label className="text-sm text-slate-400 mb-1.5 block">提前提醒时间（分钟）</label>
                      <select
                        value={editingEvent.reminderMinutesBefore || 30}
                        onChange={(e) => setEditingEvent({
                          ...editingEvent,
                          reminderMinutesBefore: parseInt(e.target.value)
                        })}
                        className="w-full px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white focus:outline-none focus:border-violet-500"
                      >
                        <option value={5}>5 分钟前</option>
                        <option value={15}>15 分钟前</option>
                        <option value={30}>30 分钟前</option>
                        <option value={60}>1 小时前</option>
                        <option value={120}>2 小时前</option>
                        <option value={1440}>1 天前</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between p-6 border-t border-slate-700/50 bg-slate-800/50">
                {editingEvent.id ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteEvent(editingEvent.id!)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    删除
                  </motion.button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:bg-slate-700/50 transition-colors"
                  >
                    取消
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveEvent}
                    disabled={!editingEvent.title?.trim()}
                    className={cn(
                      "flex items-center gap-2 px-6 py-2 rounded-xl font-medium text-white transition-all",
                      editingEvent.title?.trim()
                        ? "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
                        : "bg-slate-600 cursor-not-allowed opacity-50"
                    )}
                  >
                    <Save className="w-4 h-4" />
                    保存
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
