import { motion } from 'framer-motion';
import { Heart, Trash2, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { InspirationCombination, InspirationDimension } from '@/types';
import { inspirationDimensions } from '@/data/mockData';
import { copyToClipboard } from '@/utils/copyToClipboard';

interface FavoriteInspirationCardProps {
  combination: InspirationCombination;
  onRemove: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function FavoriteInspirationCard({
  combination,
  onRemove,
  onToggleFavorite,
}: FavoriteInspirationCardProps) {
  const [copied, setCopied] = useState(false);
  const dimensions: InspirationDimension[] = ['scene', 'emotion', 'style', 'audience', 'format'];

  const handleCopy = async () => {
    const text = `🎯 灵感组合
📍 场景：${combination.scene.text}
💝 情感：${combination.emotion.text}
🎨 风格：${combination.style.text}
👥 受众：${combination.audience.text}
📝 形式：${combination.format.text}

${combination.scene.description ? `💡 场景说明：${combination.scene.description}` : ''}
${combination.emotion.description ? `💡 情感说明：${combination.emotion.description}` : ''}
${combination.style.description ? `💡 风格说明：${combination.style.description}` : ''}
${combination.audience.description ? `💡 受众说明：${combination.audience.description}` : ''}
${combination.format.description ? `💡 形式说明：${combination.format.description}` : ''}`;

    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600/50 transition-all"
    >
      <div className="flex justify-between items-start mb-3">
        <span className="text-xs text-slate-500">{formatDate(combination.createdAt)}</span>
        <div className="flex gap-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-colors"
            title="复制"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggleFavorite(combination.id)}
            className={cn(
              "w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
              combination.isFavorite 
                ? "bg-rose-500/20 text-rose-400" 
                : "bg-slate-700/50 text-slate-400 hover:text-rose-400"
            )}
            title={combination.isFavorite ? "取消收藏" : "收藏"}
          >
            <Heart className={cn("w-3.5 h-3.5", combination.isFavorite && "fill-current")} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onRemove(combination.id)}
            className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-700/50 text-slate-400 hover:text-rose-400 transition-colors"
            title="删除"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>

      <div className="space-y-2">
        {dimensions.map((dim) => {
          const dimData = inspirationDimensions[dim];
          const item = combination[dim];
          return (
            <div key={dim} className="flex items-center gap-2 text-sm">
              <span className={cn(
                "w-1.5 h-1.5 rounded-full bg-gradient-to-r flex-shrink-0",
                dimData.color
              )} />
              <span className="text-slate-500 w-16 flex-shrink-0">{dimData.name}：</span>
              <span className="text-slate-200 truncate">{item.text}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
