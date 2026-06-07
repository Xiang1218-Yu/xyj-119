import { motion } from 'framer-motion';
import { Star, Users, Target, Check, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { TopicSuggestion } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  topic: TopicSuggestion;
  index: number;
}

const competitionColors: Record<string, { bg: string; text: string; label: string }> = {
  low: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: '竞争小' },
  medium: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: '竞争中等' },
  high: { bg: 'bg-red-500/20', text: 'text-red-400', label: '竞争大' },
};

export default function TopicCard({ topic, index }: TopicCardProps) {
  const { selectedTopic, setSelectedTopic, generateTitlesForTopic, setCurrentPage } = useAppStore();
  const isSelected = selectedTopic?.id === topic.id;

  const handleSelect = () => {
    if (isSelected) {
      generateTitlesForTopic(topic.id);
      setCurrentPage('title');
    } else {
      setSelectedTopic(topic);
    }
  };

  const renderStars = (score: number) => {
    const stars = Math.round(score / 20);
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "w-4 h-4",
          i < stars ? "text-amber-400 fill-amber-400" : "text-slate-600"
        )}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={handleSelect}
      className={cn(
        "group relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden",
        isSelected
          ? "bg-gradient-to-br from-violet-600/20 to-purple-600/20 border-violet-500/50 shadow-lg shadow-violet-500/20"
          : "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600"
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-transparent rounded-bl-full" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">选题建议 #{index + 1}</span>
              <div className="flex items-center gap-0.5">
                {renderStars(topic.score)}
              </div>
            </div>
          </div>
          
          <div className={cn(
            "px-2.5 py-1 rounded-full flex items-center gap-1",
            competitionColors[topic.competitionLevel].bg
          )}>
            <TrendingUp className={cn("w-3 h-3", competitionColors[topic.competitionLevel].text)} />
            <span className={cn("text-xs font-medium", competitionColors[topic.competitionLevel].text)}>
              {competitionColors[topic.competitionLevel].label}
            </span>
          </div>
        </div>

        <h3 className={cn(
          "text-xl font-bold mb-3 leading-tight transition-colors",
          isSelected ? "text-violet-200" : "text-slate-100 group-hover:text-white"
        )}>
          {topic.title}
        </h3>

        <div className="mb-4 p-3 rounded-xl bg-slate-900/50 border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-violet-400" />
            <span className="text-xs font-medium text-violet-300">差异化角度</span>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {topic.angle}
          </p>
        </div>

        <p className="text-sm text-slate-400 mb-4 line-clamp-2">
          {topic.description}
        </p>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-slate-500" />
            <span className="text-xs text-slate-400">{topic.audienceAnalysis.slice(0, 20)}...</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-amber-300">{topic.score}分</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {topic.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mb-4">
          <p className="text-xs text-slate-500 mb-2">内容延伸方向：</p>
          <div className="flex flex-wrap gap-1.5">
            {topic.contentDirections.slice(0, 3).map((direction, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-slate-700/50 text-xs text-slate-300"
              >
                {direction.slice(0, 12)}...
              </span>
            ))}
          </div>
        </div>

        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-4 border-t border-violet-500/30"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2",
                "bg-gradient-to-r from-violet-500 to-purple-600 text-white",
                "hover:from-violet-600 hover:to-purple-700 transition-all",
                "shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
              )}
            >
              <FileText className="w-4 h-4" />
              生成标题变体
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}

        {isSelected && (
          <div className="absolute top-4 right-4">
            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

import { FileText } from 'lucide-react';
