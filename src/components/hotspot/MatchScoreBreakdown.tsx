import { motion } from 'framer-motion';
import { Target, Users, Palette, Globe, TrendingUp } from 'lucide-react';
import { MatchScoreBreakdown as MatchScoreBreakdownType, MatchDimension } from '@/types';
import { matchDimensions } from '@/data/mockData';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Target,
  Users,
  Palette,
  Globe,
};

interface MatchScoreBreakdownProps {
  breakdown: MatchScoreBreakdownType;
}

export default function MatchScoreBreakdown({ breakdown }: MatchScoreBreakdownProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-slate-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-slate-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return '高度匹配';
    if (score >= 60) return '中等匹配';
    return '较低匹配';
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-medium text-slate-300">匹配度明细</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-2xl font-bold", getScoreColor(breakdown.overall))}>
            {breakdown.overall}%
          </span>
          <span className={cn(
            "px-2 py-0.5 rounded-full text-xs font-medium",
            breakdown.overall >= 80 ? "bg-emerald-500/20 text-emerald-300" :
            breakdown.overall >= 60 ? "bg-amber-500/20 text-amber-300" :
            "bg-slate-500/20 text-slate-300"
          )}>
            {getScoreLabel(breakdown.overall)}
          </span>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {matchDimensions.map((dim: MatchDimension) => {
          const Icon = iconMap[dim.icon] || Target;
          const score = breakdown[dim.id];

          return (
            <motion.div
              key={dim.id}
              variants={item}
              className="flex items-center gap-3"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${dim.color}20` }}
              >
                <Icon className="w-4 h-4" style={{ color: dim.color }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-400">{dim.name}</span>
                  <span className={cn("text-xs font-semibold", getScoreColor(score))}>
                    {score}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={cn("h-full rounded-full", getScoreBg(score))}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
