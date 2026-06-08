import { motion } from 'framer-motion';
import { Flame, TrendingUp, TrendingDown, Minus, Check, Eye, Star, Lightbulb } from 'lucide-react';
import { HotSpot } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import MatchScoreBreakdown from '@/components/hotspot/MatchScoreBreakdown';

interface HotSpotCardProps {
  hotspot: HotSpot;
  index: number;
}

const platformLabels: Record<string, string> = {
  weibo: '微博',
  douyin: '抖音',
  zhihu: '知乎',
  xiaohongshu: '小红书',
  bilibili: 'B站',
};

const platformColors: Record<string, string> = {
  weibo: 'bg-red-500/20 text-red-400 border-red-500/30',
  douyin: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  zhihu: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  xiaohongshu: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  bilibili: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
};

const formatHeatIndex = (num: number): string => {
  if (num >= 10000000) return (num / 10000000).toFixed(1) + '千万';
  if (num >= 10000) return (num / 10000).toFixed(1) + '万';
  return num.toString();
};

export default function HotSpotCard({ hotspot, index }: HotSpotCardProps) {
  const { selectedHotSpot, setSelectedHotSpot, generateTopicsForHotSpot, setCurrentPage, toggleFavorite, isFavorite, getMatchScoreBreakdown } = useAppStore();
  const isSelected = selectedHotSpot?.id === hotspot.id;
  const isHighMatch = hotspot.matchScore >= 80;
  const isFavorited = isFavorite(hotspot.id);
  const matchBreakdown = isSelected ? getMatchScoreBreakdown(hotspot.id) : null;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(hotspot.id);
  };

  const handleSelect = () => {
    if (isSelected) {
      generateTopicsForHotSpot(hotspot.id);
      setCurrentPage('topic');
    } else {
      setSelectedHotSpot(hotspot);
    }
  };

  const TrendIcon = hotspot.trend === 'rising' ? TrendingUp : hotspot.trend === 'falling' ? TrendingDown : Minus;
  const trendColor = hotspot.trend === 'rising' ? 'text-emerald-400' : hotspot.trend === 'falling' ? 'text-red-400' : 'text-slate-400';

  return (
    <motion.div
      id={`hotspot-${hotspot.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={handleSelect}
      className={cn(
        "group relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden",
        isSelected
          ? "bg-gradient-to-br from-violet-600/20 to-purple-600/20 border-violet-500/50 shadow-lg shadow-violet-500/20"
          : "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 hover:shadow-xl"
      )}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleFavoriteClick}
        className={cn(
          "absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
          isFavorited
            ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30"
            : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
        )}
      >
        <Star className={cn("w-4 h-4", isFavorited && "fill-current")} />
      </motion.button>

      {isHighMatch && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-3 right-14 px-2 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center gap-1"
        >
          <Flame className="w-3 h-3 text-amber-400" />
          <span className="text-xs font-medium text-amber-300">高匹配</span>
        </motion.div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={cn(
            "px-2.5 py-1 rounded-lg text-xs font-medium border",
            platformColors[hotspot.platform]
          )}>
            {platformLabels[hotspot.platform]}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-slate-700/50 text-slate-300 text-xs">
            {hotspot.category}
          </span>
        </div>
        <span className="text-xs text-slate-500">{hotspot.createdAt}</span>
      </div>

      <h3 className={cn(
        "text-lg font-bold mb-2 leading-tight transition-colors",
        isSelected ? "text-violet-200" : "text-slate-100 group-hover:text-white"
      )}>
        #{hotspot.title}
      </h3>

      <p className="text-sm text-slate-400 mb-4 line-clamp-2">
        {hotspot.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-semibold text-slate-200">
              {formatHeatIndex(hotspot.heatIndex)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <TrendIcon className={cn("w-4 h-4", trendColor)} />
            <span className={cn("text-xs", trendColor)}>
              {hotspot.trend === 'rising' ? '上升' : hotspot.trend === 'falling' ? '下降' : '平稳'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${hotspot.matchScore}%` }}
                transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                className={cn(
                  "h-full rounded-full",
                  hotspot.matchScore >= 80 ? "bg-gradient-to-r from-amber-500 to-orange-500" :
                  hotspot.matchScore >= 60 ? "bg-gradient-to-r from-violet-500 to-purple-500" :
                  "bg-gradient-to-r from-slate-500 to-slate-400"
                )}
              />
            </div>
            <span className="text-xs text-slate-400 mt-1 block text-right">
              匹配度 {hotspot.matchScore}%
            </span>
          </div>
        </div>
      </div>

      {isSelected && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-violet-500/30"
        >
          {matchBreakdown && (
            <div className="mb-4 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
              <MatchScoreBreakdown breakdown={matchBreakdown} />
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mb-4">
            {hotspot.relatedTopics.map((topic, i) => (
              <span key={i} className="px-2 py-0.5 rounded-md bg-slate-700/50 text-xs text-slate-300">
                #{topic}
              </span>
            ))}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "w-full py-2.5 rounded-xl font-medium text-sm flex items-center justify-center gap-2",
              "bg-gradient-to-r from-violet-500 to-purple-600 text-white",
              "hover:from-violet-600 hover:to-purple-700 transition-all",
              "shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
            )}
          >
            <Lightbulb className="w-4 h-4" />
            基于此热点生成选题
          </motion.button>
        </motion.div>
      )}

      {!isSelected && (
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-slate-700/80 flex items-center justify-center">
            <Eye className="w-4 h-4 text-slate-300" />
          </div>
        </div>
      )}

      {isSelected && (
        <div className="absolute top-4 right-28">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
