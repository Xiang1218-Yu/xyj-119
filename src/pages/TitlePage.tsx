import { motion } from 'framer-motion';
import { FileText, ArrowLeft, RefreshCw, ArrowRight, Filter, Check, Sparkles, TrendingUp } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import TitleCard from '@/components/title/TitleCard';
import RadarChart from '@/components/charts/RadarChart';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const styleFilters = [
  { id: null, label: '全部' },
  { id: 'curiosity', label: '好奇心' },
  { id: 'emotion', label: '情感共鸣' },
  { id: 'practical', label: '实用干货' },
  { id: 'controversy', label: '争议话题' },
  { id: 'story', label: '故事叙述' },
];

export default function TitlePage() {
  const { 
    selectedTopic, 
    titleVariants, 
    selectedTitles, 
    userProfile,
    setCurrentPage,
    generateTitlesForTopic,
    generateScriptForTopic,
    clearSelectedTitles
  } = useAppStore();
  
  const [styleFilter, setStyleFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'score' | 'curiosity' | 'emotion' | 'practical' | 'uniqueness'>('score');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  useEffect(() => {
    if (selectedTopic && titleVariants.length === 0 && !hasGenerated) {
      setHasGenerated(true);
      generateTitlesForTopic(selectedTopic.id);
    }
  }, [selectedTopic, hasGenerated]);

  const handleRegenerate = async () => {
    if (!selectedTopic || isRegenerating) return;
    setIsRegenerating(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    generateTitlesForTopic(selectedTopic.id, true);
    setIsRegenerating(false);
  };

  if (!selectedTopic) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-slate-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-300 mb-2">先选择一个选题</h2>
          <p className="text-slate-500 mb-6">去选题生成页选择你感兴趣的选题</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentPage('topic')}
            className="px-6 py-2.5 rounded-xl bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors"
          >
            去选择选题
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const filteredTitles = titleVariants
    .filter(t => !styleFilter || t.style === styleFilter)
    .sort((a, b) => {
      if (sortBy === 'score') return b.scores.overall - a.scores.overall;
      if (sortBy === 'curiosity') return b.scores.curiosity - a.scores.curiosity;
      if (sortBy === 'emotion') return b.scores.emotion - a.scores.emotion;
      if (sortBy === 'practical') return b.scores.practical - a.scores.practical;
      return b.scores.uniqueness - a.scores.uniqueness;
    });

  const topTitle = [...titleVariants].sort((a, b) => b.scores.overall - a.scores.overall)[0];

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
                onClick={() => setCurrentPage('topic')}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">标题优化分析</h1>
                  <div className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-medium text-amber-300">点击潜力分析</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  为选题 <span className="text-violet-400 font-medium">「{selectedTopic.title}」</span> 生成的 {titleVariants.length} 个标题变体
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={cn("w-4 h-4", isRegenerating && "animate-spin")} />
                <span className="text-sm">{isRegenerating ? "生成中..." : "重新生成"}</span>
              </motion.button>
            </div>
          </div>

          {topTitle && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/30 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-amber-300 mb-0.5">🏆 最佳标题推荐</p>
                    <p className="text-sm font-medium text-amber-100">「{topTitle.title}」</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-400">{topTitle.scores.overall}分</p>
                  <p className="text-xs text-amber-300">综合评分</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <div className="flex gap-1.5">
                {styleFilters.map((filter) => (
                  <motion.button
                    key={filter.id || 'all'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStyleFilter(filter.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                      styleFilter === filter.id
                        ? "bg-violet-500 text-white"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                    )}
                  >
                    {filter.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">排序：</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-sm border-none outline-none cursor-pointer hover:bg-slate-700 transition-colors"
              >
                <option value="score">综合评分</option>
                <option value="curiosity">好奇心</option>
                <option value="emotion">情感共鸣</option>
                <option value="practical">实用价值</option>
                <option value="uniqueness">独特性</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-violet-400" />
            <span className="text-slate-300 font-medium">
              共 <span className="text-violet-400 font-bold">{filteredTitles.length}</span> 个标题变体
              {selectedTitles.length > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs">
                  已选择 {selectedTitles.length}/3
                </span>
              )}
            </span>
          </div>
          
          {selectedTitles.length > 0 && (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={clearSelectedTitles}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-sm transition-colors"
              >
                清除选择
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  generateScriptForTopic(selectedTopic.id);
                  setCurrentPage('script');
                }}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm",
                  "bg-gradient-to-r from-violet-500 to-purple-600 text-white",
                  "hover:from-violet-600 hover:to-purple-700 transition-all",
                  "shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
                )}
              >
                生成脚本框架
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}
        </div>

        {selectedTitles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50"
          >
            <p className="text-xs text-slate-400 mb-3">已选择的标题对比：</p>
            <div className="grid grid-cols-3 gap-4">
              {selectedTitles.map((title, i) => (
                <div key={title.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-bold text-violet-400">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200 mb-2 line-clamp-2">「{title.title}」</p>
                    <div className="flex items-center gap-4">
                      <RadarChart 
                        data={[
                          { subject: '好奇', score: title.scores.curiosity, fullMark: 100 },
                          { subject: '情感', score: title.scores.emotion, fullMark: 100 },
                          { subject: '实用', score: title.scores.practical, fullMark: 100 },
                          { subject: '独特', score: title.scores.uniqueness, fullMark: 100 },
                        ]} 
                        size={80}
                      />
                      <div className="text-center">
                        <p className="text-xl font-bold text-emerald-400">{title.scores.overall}</p>
                        <p className="text-xs text-slate-500">综合评分</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredTitles.map((title, index) => (
            <TitleCard key={title.id} title={title} index={index} />
          ))}
        </div>

        {filteredTitles.length === 0 && (
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
            <p className="text-slate-400">正在生成标题变体...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
