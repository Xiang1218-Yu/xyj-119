import { motion, AnimatePresence } from 'framer-motion';
import { Star, Flame, X, BookmarkX } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';

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

export default function FavoriteSidebar() {
  const { hotSpots, favoriteIds, toggleFavorite, setScrollToHotSpotId, setCurrentPage } = useAppStore();

  const favoriteHotSpots = hotSpots.filter(h => favoriteIds.includes(h.id));

  const handleLocate = (hotSpotId: string) => {
    setCurrentPage('hotspot');
    setScrollToHotSpotId(hotSpotId);
  };

  const handleRemoveFavorite = (e: React.MouseEvent, hotSpotId: string) => {
    e.stopPropagation();
    toggleFavorite(hotSpotId);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900/50 backdrop-blur-xl border-l border-slate-800">
      <div className="px-4 py-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <h2 className="text-base font-bold text-white">收藏夹</h2>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
            {favoriteHotSpots.length}
          </span>
        </div>
        <p className="text-xs text-slate-500">点击快速定位到热点</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {favoriteHotSpots.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 px-4 text-center"
            >
              <BookmarkX className="w-12 h-12 text-slate-600 mb-3" />
              <p className="text-sm text-slate-500">暂无收藏的热点</p>
              <p className="text-xs text-slate-600 mt-1">点击热点卡片右上角的星标添加收藏</p>
            </motion.div>
          ) : (
            favoriteHotSpots.map((hotspot, index) => (
              <motion.div
                key={hotspot.id}
                layout
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => handleLocate(hotspot.id)}
                className="group px-4 py-3 border-b border-slate-800/50 cursor-pointer hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-xs font-medium border",
                        platformColors[hotspot.platform]
                      )}>
                        {platformLabels[hotspot.platform]}
                      </span>
                      <div className="flex items-center gap-0.5 text-orange-400">
                        <Flame className="w-3 h-3" />
                        <span className="text-xs font-medium">{formatHeatIndex(hotspot.heatIndex)}</span>
                      </div>
                    </div>
                    <h3 className="text-sm font-medium text-slate-200 line-clamp-2 group-hover:text-white transition-colors">
                      #{hotspot.title}
                    </h3>
                  </div>
                  <button
                    onClick={(e) => handleRemoveFavorite(e, hotspot.id)}
                    className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-500 hover:bg-red-500/20 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    title="取消收藏"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
