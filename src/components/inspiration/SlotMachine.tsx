import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, MapPin, Heart, Palette, Users, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InspirationDimension, InspirationItem, InspirationDimensionData } from '@/types';
import { inspirationDimensions, inspirationPool } from '@/data/mockData';

const iconMap: Record<string, typeof MapPin> = {
  MapPin,
  Heart,
  Palette,
  Users,
  FileText,
};

interface SlotMachineProps {
  dimension: InspirationDimension;
  currentItem: InspirationItem | null;
  isLocked: boolean;
  isRolling: boolean;
  onToggleLock: () => void;
}

export default function SlotMachine({
  dimension,
  currentItem,
  isLocked,
  isRolling,
  onToggleLock,
}: SlotMachineProps) {
  const dimensionData: InspirationDimensionData = inspirationDimensions[dimension];
  const Icon = iconMap[dimensionData.icon];
  const [displayItems, setDisplayItems] = useState<InspirationItem[]>([]);
  const animationRef = useRef<number | null>(null);
  const frameCount = useRef(0);

  useEffect(() => {
    const pool = inspirationPool[dimension];
    
    if (isRolling && !isLocked) {
      frameCount.current = 0;
      const animate = () => {
        frameCount.current += 1;
        const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
        setDisplayItems(shuffled);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (currentItem) {
        setDisplayItems([currentItem]);
      } else {
        setDisplayItems([pool[0]]);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimension, isRolling, isLocked, currentItem]);

  const currentDisplayItem = displayItems[displayItems.length - 1];

  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        className={cn(
          "relative w-full h-36 rounded-2xl overflow-hidden border-2",
          isLocked 
            ? "bg-slate-800/50 border-amber-500/50" 
            : "bg-slate-800/80 border-slate-700/50"
        )}
        whileHover={{ scale: isLocked ? 1 : 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className={cn(
          "absolute inset-0 bg-gradient-to-b opacity-20",
          dimensionData.color
        )} />
        
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-slate-950/80 to-transparent z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-950/80 to-transparent z-10" />
        
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-violet-500/50 to-transparent -translate-y-1/2 z-20" />
        
        <div className="relative h-full flex flex-col items-center justify-center p-4">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentDisplayItem?.id + frameCount.current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ 
                duration: isRolling ? 0.05 : 0.3,
                ease: "easeOut"
              }}
              className="text-center"
            >
              <p className={cn(
                "text-lg font-bold mb-1",
                isLocked ? "text-amber-300" : "text-white"
              )}>
                {currentDisplayItem?.text}
              </p>
              {currentDisplayItem?.description && (
                <p className="text-xs text-slate-400 line-clamp-2">
                  {currentDisplayItem.description}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="flex items-center gap-2 mt-3">
        <div className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br",
          dimensionData.color
        )}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-slate-300">{dimensionData.name}</span>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleLock}
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
            isLocked 
              ? "bg-amber-500/20 text-amber-400 border border-amber-500/50" 
              : "bg-slate-800 text-slate-500 hover:text-slate-300 border border-slate-700"
          )}
          title={isLocked ? "点击解锁" : "点击锁定"}
        >
          {isLocked ? (
            <Lock className="w-4 h-4" />
          ) : (
            <Unlock className="w-4 h-4" />
          )}
        </motion.button>
      </div>

      {currentDisplayItem?.tags && (
        <div className="flex flex-wrap gap-1 mt-2 justify-center">
          {currentDisplayItem.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-0.5 rounded-full bg-slate-800/50 text-slate-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
