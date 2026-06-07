import { motion } from 'framer-motion';
import { Lightbulb, ArrowLeft, RefreshCw, Settings, Sparkles, User, Target } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import TopicCard from '@/components/topic/TopicCard';
import { cn } from '@/lib/utils';

export default function TopicPage() {
  const { 
    selectedHotSpot, 
    topics, 
    userProfile, 
    setCurrentPage,
    generateTopicsForHotSpot,
    selectedTopic
  } = useAppStore();

  if (!selectedHotSpot) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-6">
            <Lightbulb className="w-10 h-10 text-slate-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-300 mb-2">先选择一个热点</h2>
          <p className="text-slate-500 mb-6">去热点追踪页选择你感兴趣的热点</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentPage('hotspot')}
            className="px-6 py-2.5 rounded-xl bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors"
          >
            去选择热点
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (topics.length === 0) {
    generateTopicsForHotSpot(selectedHotSpot.id);
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800"
      >
        <div className="px-8 py-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage('hotspot')}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">智能选题建议</h1>
                  <div className="px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-xs font-medium text-violet-300">AI 生成</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  基于热点 <span className="text-violet-400 font-medium">「{selectedHotSpot.title}」</span> 为你生成的差异化选题
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => generateTopicsForHotSpot(selectedHotSpot.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm">重新生成</span>
              </motion.button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-violet-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">当前账号</p>
                  <p className="text-sm font-medium text-slate-200">{userProfile.name}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-700" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Target className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">内容领域</p>
                  <p className="text-sm font-medium text-slate-200">{userProfile.domain.join(' / ')}</p>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-700" />
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-slate-500" />
                <button 
                  onClick={() => setCurrentPage('profile')}
                  className="text-sm text-violet-400 hover:text-violet-300 transition-colors"
                >
                  修改定位
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Lightbulb className="w-5 h-5 text-violet-400" />
            <span className="text-slate-300 font-medium">
              为你生成 <span className="text-violet-400 font-bold">{topics.length}</span> 个选题建议
            </span>
          </div>
          
          {selectedTopic && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/20 border border-violet-500/30"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-300">
                已选择：{selectedTopic.title}
              </span>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
          {topics.map((topic, index) => (
            <TopicCard key={topic.id} topic={topic} index={index} />
          ))}
        </div>

        {topics.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-2 border-violet-500 border-t-transparent rounded-full mb-4"
            />
            <p className="text-slate-400">正在生成选题建议...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
