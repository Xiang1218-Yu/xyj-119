import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, Heart, Sparkles, BookMarked, Copy, Check, RotateCcw } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { InspirationDimension } from '@/types';
import SlotMachine from '@/components/inspiration/SlotMachine';
import FavoriteInspirationCard from '@/components/inspiration/FavoriteInspirationCard';
import Empty from '@/components/Empty';
import { copyToClipboard } from '@/utils/copyToClipboard';

export default function InspirationPage() {
  const {
    currentInspiration,
    favoriteInspirations,
    lockedDimensions,
    isRollingInspiration,
    rollInspiration,
    toggleDimensionLock,
    toggleInspirationFavorite,
    removeFavoriteInspiration,
  } = useAppStore();

  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'generate' | 'favorites'>('generate');

  const dimensions: InspirationDimension[] = ['scene', 'emotion', 'style', 'audience', 'format'];

  const handleCopy = async () => {
    if (!currentInspiration) return;
    
    const text = `🎯 灵感组合
📍 场景：${currentInspiration.scene.text}
💝 情感：${currentInspiration.emotion.text}
🎨 风格：${currentInspiration.style.text}
👥 受众：${currentInspiration.audience.text}
📝 形式：${currentInspiration.format.text}

${currentInspiration.scene.description ? `💡 场景说明：${currentInspiration.scene.description}` : ''}
${currentInspiration.emotion.description ? `💡 情感说明：${currentInspiration.emotion.description}` : ''}
${currentInspiration.style.description ? `💡 风格说明：${currentInspiration.style.description}` : ''}
${currentInspiration.audience.description ? `💡 受众说明：${currentInspiration.audience.description}` : ''}
${currentInspiration.format.description ? `💡 形式说明：${currentInspiration.format.description}` : ''}`;

    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const lockedCount = Object.values(lockedDimensions).filter(Boolean).length;

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">创作灵感抽取器</h1>
            <p className="text-slate-400 text-sm">老虎机式随机组合，激发无限创作灵感</p>
          </div>
        </div>
      </motion.div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('generate')}
          className={cn(
            "px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2",
            activeTab === 'generate'
              ? "bg-violet-600 text-white"
              : "bg-slate-800 text-slate-400 hover:text-slate-200"
          )}
        >
          <Shuffle className="w-4 h-4" />
          灵感抽取
        </button>
        <button
          onClick={() => setActiveTab('favorites')}
          className={cn(
            "px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2",
            activeTab === 'favorites'
              ? "bg-violet-600 text-white"
              : "bg-slate-800 text-slate-400 hover:text-slate-200"
          )}
        >
          <BookMarked className="w-4 h-4" />
          我的收藏
          {favoriteInspirations.length > 0 && (
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center">
              {favoriteInspirations.length}
            </span>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'generate' ? (
          <motion.div
            key="generate"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 mb-6">
              <div className="grid grid-cols-5 gap-4 mb-6">
                {dimensions.map((dim, index) => (
                  <motion.div
                    key={dim}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SlotMachine
                      dimension={dim}
                      currentItem={currentInspiration ? currentInspiration[dim] : null}
                      isLocked={lockedDimensions[dim]}
                      isRolling={isRollingInspiration}
                      onToggleLock={() => toggleDimensionLock(dim)}
                    />
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={rollInspiration}
                  disabled={isRollingInspiration}
                  className={cn(
                    "px-8 py-3 rounded-xl font-semibold text-white flex items-center gap-2",
                    "bg-gradient-to-r from-violet-600 to-purple-600",
                    "hover:from-violet-500 hover:to-purple-500",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "shadow-lg shadow-violet-500/25",
                    "transition-all duration-300"
                  )}
                >
                  {isRollingInspiration ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <RotateCcw className="w-5 h-5" />
                      </motion.div>
                      抽取中...
                    </>
                  ) : (
                    <>
                      <Shuffle className="w-5 h-5" />
                      开始抽取
                    </>
                  )}
                </motion.button>

                {currentInspiration && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleInspirationFavorite(currentInspiration.id)}
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                        currentInspiration.isFavorite
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/50"
                          : "bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-700"
                      )}
                      title={currentInspiration.isFavorite ? "取消收藏" : "收藏灵感"}
                    >
                      <Heart className={cn("w-5 h-5", currentInspiration.isFavorite && "fill-current")} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCopy}
                      className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 transition-all"
                      title="复制灵感组合"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </motion.button>
                  </>
                )}
              </div>

              {lockedCount > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-amber-400 mt-4"
                >
                  已锁定 {lockedCount} 个维度，将只抽取未锁定的维度
                </motion.p>
              )}

              {!currentInspiration && !isRollingInspiration && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-slate-500 mt-4"
                >
                  点击"开始抽取"获取你的创作灵感
                </motion.p>
              )}
            </div>

            {currentInspiration && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-violet-900/30 to-purple-900/30 rounded-2xl p-6 border border-violet-700/30"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                  灵感组合预览
                </h3>
                <div className="space-y-3">
                  {dimensions.map((dim) => {
                    const item = currentInspiration[dim];
                    return (
                      <div key={dim} className="flex items-start gap-3">
                        <span className="text-violet-400 font-medium w-20 flex-shrink-0">
                          {dim === 'scene' && '📍 场景'}
                          {dim === 'emotion' && '💝 情感'}
                          {dim === 'style' && '🎨 风格'}
                          {dim === 'audience' && '👥 受众'}
                          {dim === 'format' && '📝 形式'}
                        </span>
                        <div>
                          <p className="text-white font-medium">{item.text}</p>
                          {item.description && (
                            <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">💡 创作建议</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    尝试以<span className="text-violet-300">「{currentInspiration.scene.text}」</span>为背景，
                    用<span className="text-rose-300">「{currentInspiration.emotion.text}」</span>的情感基调，
                    以<span className="text-amber-300">「{currentInspiration.style.text}」</span>的风格，
                    为<span className="text-emerald-300">「{currentInspiration.audience.text}」</span>创作
                    <span className="text-blue-300">「{currentInspiration.format.text}」</span>内容。
                    这个组合有潜力成为爆款哦！
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="favorites"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {favoriteInspirations.length === 0 ? (
              <Empty
                icon={<BookMarked className="w-12 h-12 text-slate-600" />}
                title="还没有收藏的灵感"
                description="抽取灵感时点击❤️按钮收藏喜欢的组合"
              />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <AnimatePresence>
                  {favoriteInspirations.map((item) => (
                    <FavoriteInspirationCard
                      key={item.id}
                      combination={item}
                      onRemove={removeFavoriteInspiration}
                      onToggleFavorite={toggleInspirationFavorite}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
