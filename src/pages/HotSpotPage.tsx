import { motion } from 'framer-motion';
import { Flame, Filter, SortAsc, Zap, RefreshCw, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';
import HotSpotCard from '@/components/hotspot/HotSpotCard';
import FavoriteSidebar from '@/components/hotspot/FavoriteSidebar';
import { cn } from '@/lib/utils';

const platforms = [
  { id: null, label: '全部' },
  { id: 'douyin', label: '抖音' },
  { id: 'weibo', label: '微博' },
  { id: 'zhihu', label: '知乎' },
  { id: 'xiaohongshu', label: '小红书' },
  { id: 'bilibili', label: 'B站' },
];

const sortOptions = [
  { id: 'match', label: '匹配度优先' },
  { id: 'heat', label: '热度优先' },
  { id: 'time', label: '时间优先' },
];

export default function HotSpotPage() {
  const { 
    hotSpots, 
    userProfile, 
    selectedPlatform, 
    setSelectedPlatform,
    sortBy, 
    setSortBy,
    selectedHotSpot,
    isRefreshing,
    refreshHotSpotList,
    scrollToHotSpotId,
    setScrollToHotSpotId,
    favoriteIds
  } = useAppStore();

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollToHotSpotId && containerRef.current) {
      const element = document.getElementById(`hotspot-${scrollToHotSpotId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('ring-2', 'ring-amber-400', 'ring-offset-2', 'ring-offset-slate-950');
        setTimeout(() => {
          element.classList.remove('ring-2', 'ring-amber-400', 'ring-offset-2', 'ring-offset-slate-950');
        }, 2000);
        setScrollToHotSpotId(null);
      }
    }
  }, [scrollToHotSpotId, setScrollToHotSpotId]);

  const filteredHotSpots = hotSpots
    .filter(h => !selectedPlatform || h.platform === selectedPlatform)
    .sort((a, b) => {
      if (sortBy === 'heat') return b.heatIndex - a.heatIndex;
      if (sortBy === 'match') return b.matchScore - a.matchScore;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <div ref={containerRef} className="flex-1 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800"
        >
        <div className="px-8 py-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-white">全网热点追踪</h1>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-medium text-emerald-300">实时更新</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                已根据你的账号定位 <span className="text-violet-400 font-medium">「{userProfile.domain.join(' / ')}」</span> 智能筛选
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={refreshHotSpotList}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
              <span className="text-sm">{isRefreshing ? "刷新中..." : "刷新热点"}</span>
            </motion.button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <div className="flex gap-1.5">
                {platforms.map((platform) => (
                  <motion.button
                    key={platform.id || 'all'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPlatform(platform.id)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all",
                      selectedPlatform === platform.id
                        ? "bg-violet-500 text-white"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                    )}
                  >
                    {platform.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <SortAsc className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'heat' | 'match' | 'time')}
                className="bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg text-sm border-none outline-none cursor-pointer hover:bg-slate-700 transition-colors"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Flame className="w-5 h-5 text-orange-400" />
            <span className="text-slate-300 font-medium">
              为你找到 <span className="text-violet-400 font-bold">{filteredHotSpots.length}</span> 个相关热点
            </span>
          </div>
          
          {selectedHotSpot && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-500/20 border border-violet-500/30"
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-300">
                已选择：{selectedHotSpot.title}
              </span>
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredHotSpots.map((hotspot, index) => (
            <HotSpotCard key={hotspot.id} hotspot={hotspot} index={index} />
          ))}
        </div>

        {filteredHotSpots.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-slate-500"
          >
            <Filter className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg">暂无符合条件的热点</p>
            <p className="text-sm mt-1">试试更换筛选条件</p>
          </motion.div>
        )}
      </div>
      </div>
      <aside className="w-72 flex-shrink-0 sticky top-0 h-screen overflow-hidden border-l border-slate-800">
        <FavoriteSidebar />
      </aside>
    </div>
  );
}
