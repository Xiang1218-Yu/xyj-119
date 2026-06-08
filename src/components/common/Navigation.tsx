import { motion } from 'framer-motion';
import { Flame, Lightbulb, FileText, Scroll, User, Sparkles, Calendar } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'hotspot', label: '热点追踪', icon: Flame },
  { id: 'inspiration', label: '灵感抽取', icon: Sparkles },
  { id: 'topic', label: '选题生成', icon: Lightbulb },
  { id: 'title', label: '标题优化', icon: FileText },
  { id: 'script', label: '脚本框架', icon: Scroll },
  { id: 'calendar', label: '发布日历', icon: Calendar },
  { id: 'profile', label: '账号设置', icon: User },
] as const;

export default function Navigation() {
  const { currentPage, setCurrentPage } = useAppStore();

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 z-50">
      <div className="p-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">选题大师</h1>
            <p className="text-xs text-slate-400">创作者的灵感引擎</p>
          </div>
        </motion.div>

        <div className="space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setCurrentPage(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                  isActive 
                    ? "bg-gradient-to-r from-violet-600/30 to-purple-600/30 text-violet-300 border border-violet-500/30" 
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                  isActive ? "bg-violet-500/20" : "bg-slate-800 group-hover:bg-slate-700"
                )}>
                  <Icon className={cn(
                    "w-4 h-4 transition-all",
                    isActive ? "text-violet-400" : "text-slate-500 group-hover:text-slate-300"
                  )} />
                </div>
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="bg-gradient-to-br from-violet-600/20 to-purple-600/20 rounded-xl p-4 border border-violet-500/20">
          <p className="text-xs text-slate-400 mb-1">当前进度</p>
          <div className="flex gap-1 mb-2">
            {navItems.slice(0, 4).map((_, i) => {
              const stepIndex = navItems.findIndex(n => n.id === currentPage);
              const isDone = i < stepIndex;
              const isCurrent = i === stepIndex;
              return (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-all",
                    isDone ? "bg-violet-500" : isCurrent ? "bg-violet-400/60" : "bg-slate-700"
                  )}
                />
              );
            })}
          </div>
          <p className="text-xs text-violet-300">
            {currentPage === 'hotspot' && '发现热点中...'}
            {currentPage === 'topic' && '生成选题建议...'}
            {currentPage === 'title' && '优化标题方案...'}
            {currentPage === 'script' && '搭建脚本框架...'}
            {currentPage === 'profile' && '个性化设置'}
          </p>
        </div>
      </div>
    </nav>
  );
}
