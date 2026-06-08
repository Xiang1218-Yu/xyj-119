import { motion } from 'framer-motion';
import { RotateCcw, Target, Users, Palette, Globe, Info } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { matchDimensions } from '@/data/mockData';
import { MatchWeights } from '@/types';
import { cn } from '@/lib/utils';
import RadarChart from '@/components/charts/RadarChart';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Target,
  Users,
  Palette,
  Globe,
};

export default function MatchWeightEditor() {
  const { matchWeights, updateMatchWeights, resetMatchWeights } = useAppStore();
  const [localWeights, setLocalWeights] = useState<MatchWeights>(matchWeights);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const totalWeight = localWeights.domain + localWeights.audience + localWeights.style + localWeights.platform;

  const radarData = matchDimensions.map(dim => ({
    subject: dim.name,
    score: localWeights[dim.id],
    fullMark: 100,
  }));

  const handleSliderChange = (dimension: keyof MatchWeights, value: number) => {
    const newWeights = { ...localWeights, [dimension]: value };
    setLocalWeights(newWeights);
  };

  const handleSliderCommit = (dimension: keyof MatchWeights, value: number) => {
    const newWeights = { ...localWeights, [dimension]: value };
    setLocalWeights(newWeights);
    updateMatchWeights({ [dimension]: value });
  };

  const handleReset = () => {
    resetMatchWeights();
    setLocalWeights({
      domain: 35,
      audience: 30,
      style: 20,
      platform: 15,
    });
    setShowResetConfirm(false);
  };

  const getWeightColor = (value: number) => {
    if (value >= 35) return 'text-violet-400';
    if (value >= 25) return 'text-emerald-400';
    if (value >= 15) return 'text-amber-400';
    return 'text-slate-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50"
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-100 mb-1">匹配度权重设置</h3>
          <p className="text-sm text-slate-500">
            调整各维度在热点匹配计算中的权重占比，总权重为 {totalWeight}%
          </p>
        </div>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowResetConfirm(!showResetConfirm)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            重置默认
          </motion.button>

          {showResetConfirm && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 top-full mt-2 p-3 rounded-xl bg-slate-700 border border-slate-600 shadow-xl z-10 min-w-[180px]"
            >
              <p className="text-sm text-slate-300 mb-3">确定要重置为默认权重吗？</p>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:bg-slate-600 transition-colors"
                >
                  取消
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReset}
                  className="flex-1 px-3 py-1.5 rounded-lg text-sm bg-violet-500 text-white hover:bg-violet-600 transition-colors"
                >
                  确定
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <div className="relative">
            <RadarChart data={radarData} size={240} color="#8B5CF6" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{totalWeight}</div>
                <div className="text-xs text-slate-500">总权重</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {matchDimensions.map((dim, index) => {
            const Icon = iconMap[dim.icon] || Target;
            const value = localWeights[dim.id];

            return (
              <motion.div
                key={dim.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${dim.color}20` }}
                    >
                      <Icon className="w-4.5 h-4.5" style={{ color: dim.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-slate-200 text-sm">{dim.name}</span>
                        <div className="group relative">
                          <Info className="w-3.5 h-3.5 text-slate-500 cursor-help" />
                          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                            <div className="px-3 py-2 rounded-lg bg-slate-700 text-xs text-slate-300 whitespace-nowrap border border-slate-600">
                              {dim.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={cn("text-xl font-bold", getWeightColor(value))}>
                    {value}%
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={value}
                    onChange={(e) => handleSliderChange(dim.id, parseInt(e.target.value))}
                    onMouseUp={(e) => handleSliderCommit(dim.id, parseInt((e.target as HTMLInputElement).value))}
                    onTouchEnd={(e) => {
                      const target = e.target as HTMLInputElement;
                      handleSliderCommit(dim.id, parseInt(target.value));
                    }}
                    className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${dim.color} 0%, ${dim.color} ${(value - 5) / 55 * 100}%, #374151 ${(value - 5) / 55 * 100}%, #374151 100%)`,
                    }}
                  />
                  <div className="flex justify-between mt-1.5">
                    <span className="text-xs text-slate-600">5%</span>
                    <span className="text-xs text-slate-600">30%</span>
                    <span className="text-xs text-slate-600">60%</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700/50">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-500">
            <Info className="w-4 h-4" />
            <span>权重越高，该维度在匹配计算中的影响越大</span>
          </div>
          <div className="text-slate-400">
            当前配置已自动保存
          </div>
        </div>
      </div>
    </motion.div>
  );
}
