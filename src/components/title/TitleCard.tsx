import { motion } from 'framer-motion';
import { Check, Copy, ChevronDown, ChevronUp, Sparkles, BarChart3, Lightbulb } from 'lucide-react';
import { TitleVariant } from '@/types';
import { useAppStore } from '@/store/useAppStore';
import RadarChart from '@/components/charts/RadarChart';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface TitleCardProps {
  title: TitleVariant;
  index: number;
}

const styleLabels: Record<string, { label: string; color: string; bg: string }> = {
  curiosity: { label: '好奇心', color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
  emotion: { label: '情感共鸣', color: 'text-pink-400', bg: 'bg-pink-500/20' },
  practical: { label: '实用干货', color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
  controversy: { label: '争议话题', color: 'text-amber-400', bg: 'bg-amber-500/20' },
  story: { label: '故事叙述', color: 'text-violet-400', bg: 'bg-violet-500/20' },
};

export default function TitleCard({ title, index }: TitleCardProps) {
  const { selectedTitles, toggleTitleSelection, selectedTopic } = useAppStore();
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const isSelected = selectedTitles.some(t => t.id === title.id);
  const styleInfo = styleLabels[title.style];

  const radarData = [
    { subject: '好奇心', score: title.scores.curiosity, fullMark: 100 },
    { subject: '情感', score: title.scores.emotion, fullMark: 100 },
    { subject: '实用', score: title.scores.practical, fullMark: 100 },
    { subject: '独特', score: title.scores.uniqueness, fullMark: 100 },
  ];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(title.title);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-400';
    if (score >= 75) return 'text-violet-400';
    if (score >= 65) return 'text-amber-400';
    return 'text-slate-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "group relative rounded-2xl border transition-all duration-300 overflow-hidden",
        isSelected
          ? "bg-gradient-to-br from-violet-600/20 to-purple-600/20 border-violet-500/50 shadow-lg shadow-violet-500/20"
          : "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600"
      )}
    >
      <div 
        className="p-5 cursor-pointer"
        onClick={() => toggleTitleSelection(title)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-medium",
              styleInfo.bg,
              styleInfo.color
            )}>
              {styleInfo.label}
            </span>
            <span className="text-xs text-slate-500">#{index + 1}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="w-8 h-8 rounded-lg bg-slate-700/50 hover:bg-slate-600 flex items-center justify-center transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400" />
              )}
            </motion.button>
            
            <div 
              className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                isSelected
                  ? "bg-emerald-500"
                  : "bg-slate-700/50 group-hover:bg-slate-600"
              )}
            >
              {isSelected && <Check className="w-4 h-4 text-white" />}
            </div>
          </div>
        </div>

        <h3 className={cn(
          "text-base font-semibold mb-4 leading-relaxed transition-colors",
          isSelected ? "text-violet-100" : "text-slate-100"
        )}>
          「{title.title}」
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className={cn(
                "text-2xl font-bold",
                getScoreColor(title.scores.overall)
              )}>
                {title.scores.overall}
              </div>
              <div className="text-xs text-slate-500">综合评分</div>
            </div>
            
            <div className="hidden md:block">
              <RadarChart data={radarData} size={80} />
            </div>
          </div>

          <div className="flex items-center gap-1">
            <BarChart3 className="w-4 h-4 text-slate-500" />
            <motion.button
              whileTap={{ rotate: expanded ? 180 : -180 }}
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-slate-700/50 p-5 bg-slate-900/50"
        >
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: '好奇心', value: title.scores.curiosity },
              { label: '情感共鸣', value: title.scores.emotion },
              { label: '实用价值', value: title.scores.practical },
              { label: '独特性', value: title.scores.uniqueness },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="relative w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-1">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={cn(
                      "absolute top-0 left-0 h-full rounded-full",
                      item.value >= 80 ? "bg-emerald-500" :
                      item.value >= 65 ? "bg-violet-500" : "bg-amber-500"
                    )}
                  />
                </div>
                <div className={cn("text-sm font-semibold", getScoreColor(item.value))}>
                  {item.value}
                </div>
                <div className="text-xs text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-slate-300">标题分析</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{title.analysis}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium text-slate-300">优化建议</span>
            </div>
            <ul className="space-y-1">
              {title.suggestions.map((suggestion, i) => (
                <li key={i} className="text-sm text-slate-400 flex items-start gap-2">
                  <span className="text-violet-400 mt-1">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {isSelected && (
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-violet-500 to-purple-500" />
      )}
    </motion.div>
  );
}
