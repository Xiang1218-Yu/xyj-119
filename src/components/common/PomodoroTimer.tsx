import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipForward, Clock, Settings, Check } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';
import type { PomodoroMode } from '@/types';

const modeConfig: Record<PomodoroMode, { label: string; gradient: string; ringColor: string }> = {
  work: {
    label: '专注时间',
    gradient: 'from-rose-500 to-orange-500',
    ringColor: 'stroke-rose-500',
  },
  shortBreak: {
    label: '短休息',
    gradient: 'from-emerald-500 to-teal-500',
    ringColor: 'stroke-emerald-500',
  },
  longBreak: {
    label: '长休息',
    gradient: 'from-blue-500 to-indigo-500',
    ringColor: 'stroke-blue-500',
  },
};

export default function PomodoroTimer() {
  const { pomodoro, startPomodoro, pausePomodoro, resumePomodoro, resetPomodoro, tickPomodoro, setPomodoroDuration, skipPomodoro } = useAppStore();
  const [showSettings, setShowSettings] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (pomodoro.status === 'running') {
      intervalRef.current = window.setInterval(() => {
        tickPomodoro();
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pomodoro.status, tickPomodoro]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = pomodoro.mode === 'work' ? pomodoro.workDuration :
    pomodoro.mode === 'shortBreak' ? pomodoro.shortBreakDuration : pomodoro.longBreakDuration;
  const progress = 1 - (pomodoro.timeRemaining / (totalDuration * 60));
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const todaySessions = pomodoro.sessions.filter(s => {
    const sessionDate = new Date(s.startTime).toDateString();
    return sessionDate === new Date().toDateString() && s.completed;
  });
  const todayWorkSessions = todaySessions.filter(s => s.mode === 'work').length;
  const todayFocusMinutes = todaySessions
    .filter(s => s.mode === 'work')
    .reduce((acc, s) => acc + s.duration, 0) / 60;

  const handleStart = () => {
    startPomodoro(taskInput.trim() || undefined);
    setTaskInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br",
            modeConfig[pomodoro.mode].gradient
          )}>
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">创作番茄钟</h3>
            <p className="text-xs text-slate-400">保持专注，高效创作</p>
          </div>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
        >
          <Settings className={cn(
            "w-4 h-4 transition-transform",
            showSettings && "rotate-45"
          )} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {showSettings ? (
          <motion.div
            key="settings"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-3 gap-3">
              {(['work', 'shortBreak', 'longBreak'] as PomodoroMode[]).map(mode => (
                <div key={mode} className="space-y-2">
                  <label className="text-xs text-slate-400 block">
                    {modeConfig[mode].label}（分钟）
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={mode === 'work' ? pomodoro.workDuration :
                      mode === 'shortBreak' ? pomodoro.shortBreakDuration : pomodoro.longBreakDuration}
                    onChange={(e) => setPomodoroDuration(mode, parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white text-sm focus:outline-none focus:border-violet-500"
                  />
                </div>
              ))}
            </div>
            <div className="text-xs text-slate-500">
              每 {pomodoro.sessionsBeforeLongBreak} 个专注周期后自动进入长休息
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="timer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center mb-6"
          >
            <div className="relative mb-6">
              <svg width="200" height="200" className="transform -rotate-90">
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-slate-700/50"
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className={cn(modeConfig[pomodoro.mode].ringColor)}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.5 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-xs text-slate-400 mb-1">
                  {modeConfig[pomodoro.mode].label}
                </div>
                <motion.div
                  key={pomodoro.timeRemaining}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-bold text-white font-mono"
                >
                  {formatTime(pomodoro.timeRemaining)}
                </motion.div>
                <div className="text-xs text-slate-500 mt-1">
                  今日已完成 {todayWorkSessions} 个番茄
                </div>
              </div>
            </div>

            {pomodoro.status === 'idle' && (
              <input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="输入当前任务（可选）"
                className="w-full max-w-xs px-4 py-2 rounded-lg bg-slate-700/30 border border-slate-600/50 text-white text-sm mb-4 focus:outline-none focus:border-violet-500 placeholder:text-slate-500"
              />
            )}

            <div className="flex items-center gap-3">
              {pomodoro.status === 'idle' ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleStart}
                  className={cn(
                    "flex items-center gap-2 px-8 py-3 rounded-xl font-medium text-white bg-gradient-to-r",
                    modeConfig[pomodoro.mode].gradient
                  )}
                >
                  <Play className="w-5 h-5" />
                  开始
                </motion.button>
              ) : pomodoro.status === 'running' ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={pausePomodoro}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-slate-700 hover:bg-slate-600"
                  >
                    <Pause className="w-5 h-5" />
                    暂停
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={resetPomodoro}
                    className="p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resumePomodoro}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r",
                      modeConfig[pomodoro.mode].gradient
                    )}
                  >
                    <Play className="w-5 h-5" />
                    继续
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={resetPomodoro}
                    className="p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </motion.button>
                </>
              )}
              
              {pomodoro.status !== 'idle' && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={skipPomodoro}
                  className="p-3 rounded-xl bg-slate-700/50 hover:bg-slate-700"
                  title="跳过"
                >
                  <SkipForward className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-700/50">
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{todayWorkSessions}</div>
          <div className="text-xs text-slate-500">今日番茄</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-400">{Math.round(todayFocusMinutes)}</div>
          <div className="text-xs text-slate-500">专注分钟</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-violet-400">{pomodoro.completedSessions}</div>
          <div className="text-xs text-slate-500">累计完成</div>
        </div>
      </div>

      <AnimatePresence>
        {pomodoro.status === 'idle' && !showSettings && todaySessions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-slate-700/50 overflow-hidden"
          >
            <h4 className="text-sm font-medium text-slate-300 mb-3">今日记录</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {todaySessions.slice().reverse().map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    session.mode === 'work' ? 'bg-rose-500' :
                    session.mode === 'shortBreak' ? 'bg-emerald-500' : 'bg-blue-500'
                  )} />
                  <span className="text-slate-400 flex-1">
                    {session.taskTitle || (session.mode === 'work' ? '专注时间' : '休息时间')}
                  </span>
                  <span className="text-slate-500 font-mono">
                    {formatTime(session.duration)}
                  </span>
                  <Check className="w-4 h-4 text-emerald-500" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
