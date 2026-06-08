import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, Plus, Trash2, ListChecks, FileText, Layout, 
  Globe, MoreHorizontal, X, Edit3, CheckCircle2,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import type { ContentChecklist, ChecklistItem } from '@/types';

const categoryConfig = {
  content: { label: '内容质量', icon: FileText, color: 'text-violet-400', bgColor: 'bg-violet-500/10', borderColor: 'border-violet-500/20' },
  format: { label: '格式规范', icon: Layout, color: 'text-cyan-400', bgColor: 'bg-cyan-500/10', borderColor: 'border-cyan-500/20' },
  platform: { label: '平台适配', icon: Globe, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/20' },
  other: { label: '其他', icon: MoreHorizontal, color: 'text-amber-400', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/20' },
};

interface ContentChecklistProps {
  checklistId: string;
  className?: string;
}

export default function ContentChecklist({ checklistId, className }: ContentChecklistProps) {
  const { 
    checklists, 
    toggleChecklistItem, 
    addChecklistItem, 
    removeChecklistItem,
    updateChecklistItem,
    createChecklist,
    getChecklistByScriptId,
    getChecklistByCalendarEventId,
  } = useAppStore();

  const [showAddInput, setShowAddInput] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<'content' | 'format' | 'platform' | 'other'>('other');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    content: true,
    format: true,
    platform: true,
    other: true,
  });

  const checklist = checklists[checklistId];

  const progress = useMemo(() => {
    if (!checklist || checklist.items.length === 0) return { completed: 0, total: 0, percentage: 0 };
    const completed = checklist.items.filter(i => i.completed).length;
    return {
      completed,
      total: checklist.items.length,
      percentage: Math.round((completed / checklist.items.length) * 100),
    };
  }, [checklist]);

  const itemsByCategory = useMemo(() => {
    if (!checklist) return {};
    return checklist.items.reduce((acc, item) => {
      const category = item.category || 'other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {} as Record<string, ChecklistItem[]>);
  }, [checklist]);

  const handleAddItem = () => {
    if (!newItemTitle.trim()) return;
    addChecklistItem(checklistId, {
      title: newItemTitle.trim(),
      category: newItemCategory,
      isCustom: true,
      completed: false,
    });
    setNewItemTitle('');
    setShowAddInput(false);
  };

  const handleStartEdit = (item: ChecklistItem) => {
    setEditingItemId(item.id);
    setEditTitle(item.title);
  };

  const handleSaveEdit = (itemId: string) => {
    if (!editTitle.trim()) {
      setEditingItemId(null);
      return;
    }
    updateChecklistItem(checklistId, itemId, { title: editTitle.trim() });
    setEditingItemId(null);
    setEditTitle('');
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const getCategoryProgress = (category: string) => {
    const items = itemsByCategory[category] || [];
    if (items.length === 0) return 0;
    const completed = items.filter(i => i.completed).length;
    return Math.round((completed / items.length) * 100);
  };

  if (!checklist) {
    return (
      <div className={cn("p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50", className)}>
        <div className="text-center py-8">
          <ListChecks className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 mb-4">暂无检查清单</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-2xl bg-slate-800/50 border border-slate-700/50 overflow-hidden", className)}>
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
              <ListChecks className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{checklist.title}</h3>
              {checklist.platform && (
                <p className="text-xs text-slate-400">
                  发布平台：<span className="text-emerald-400">{checklist.platform}</span>
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{progress.percentage}%</div>
            <p className="text-xs text-slate-400">
              {progress.completed}/{progress.total} 项已完成
            </p>
          </div>
        </div>

        <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress.percentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={cn(
              "absolute inset-y-0 left-0 rounded-full",
              progress.percentage === 100
                ? "bg-gradient-to-r from-emerald-500 to-green-500"
                : "bg-gradient-to-r from-violet-500 to-purple-500"
            )}
          />
        </div>

        {progress.percentage === 100 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span className="text-sm text-emerald-300">太棒了！所有检查项都已完成，可以发布了！</span>
          </motion.div>
        )}
      </div>

      <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
        {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((category) => {
          const items = itemsByCategory[category] || [];
          if (items.length === 0) return null;
          
          const config = categoryConfig[category];
          const catProgress = getCategoryProgress(category);
          const isExpanded = expandedCategories[category];
          const Icon = config.icon;

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn("rounded-xl border overflow-hidden", config.borderColor, config.bgColor)}
            >
              <button
                onClick={() => toggleCategory(category)}
                className="w-full p-3 flex items-center justify-between hover:bg-slate-700/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon className={cn("w-4 h-4", config.color)} />
                  <span className="font-medium text-white text-sm">{config.label}</span>
                  <span className="text-xs text-slate-400">
                    ({items.filter(i => i.completed).length}/{items.length})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", catProgress === 100 ? "bg-emerald-500" : "bg-violet-500")}
                      style={{ width: `${catProgress}%` }}
                    />
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 pt-0 space-y-2">
                      {items.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={cn(
                            "group flex items-start gap-3 p-3 rounded-lg transition-colors",
                            item.completed ? "bg-slate-700/30" : "bg-slate-700/10 hover:bg-slate-700/30"
                          )}
                        >
                          <button
                            onClick={() => toggleChecklistItem(checklistId, item.id)}
                            className={cn(
                              "mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all",
                              item.completed
                                ? "bg-emerald-500 border-emerald-500"
                                : "border-slate-600 hover:border-violet-400"
                            )}
                          >
                            {item.completed && <Check className="w-3 h-3 text-white" />}
                          </button>

                          <div className="flex-1 min-w-0">
                            {editingItemId === item.id ? (
                              <div className="flex items-center gap-2">
                                <input
                                  type="text"
                                  value={editTitle}
                                  onChange={(e) => setEditTitle(e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSaveEdit(item.id);
                                    if (e.key === 'Escape') setEditingItemId(null);
                                  }}
                                  className="flex-1 px-3 py-1 rounded-lg bg-slate-700 border border-slate-600 text-white text-sm focus:outline-none focus:border-violet-500"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleSaveEdit(item.id)}
                                  className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setEditingItemId(null)}
                                  className="p-1.5 rounded-lg bg-slate-700 text-slate-400 hover:bg-slate-600"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <>
                                <p className={cn(
                                  "text-sm transition-all",
                                  item.completed ? "text-slate-500 line-through" : "text-slate-200"
                                )}>
                                  {item.title}
                                  {item.platform && (
                                    <span className="ml-2 text-xs text-emerald-400">[{item.platform}]</span>
                                  )}
                                  {item.isCustom && (
                                    <span className="ml-2 text-xs text-amber-400">[自定义]</span>
                                  )}
                                </p>
                                {item.description && (
                                  <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                                )}
                              </>
                            )}
                          </div>

                          {editingItemId !== item.id && (
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {item.isCustom && (
                                <button
                                  onClick={() => handleStartEdit(item)}
                                  className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-violet-400 transition-colors"
                                  title="编辑"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                              )}
                              {item.isCustom && (
                                <button
                                  onClick={() => removeChecklistItem(checklistId, item.id)}
                                  className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                                  title="删除"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        <AnimatePresence>
          {showAddInput ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-xl bg-slate-700/30 border border-slate-600/50 space-y-3">
                <input
                  type="text"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddItem();
                    if (e.key === 'Escape') {
                      setShowAddInput(false);
                      setNewItemTitle('');
                    }
                  }}
                  placeholder="输入自定义检查项..."
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder:text-slate-500 focus:outline-none focus:border-violet-500 text-sm"
                  autoFocus
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">分类：</span>
                    {(Object.keys(categoryConfig) as Array<keyof typeof categoryConfig>).map((cat) => {
                      const config = categoryConfig[cat];
                      const Icon = config.icon;
                      return (
                        <button
                          key={cat}
                          onClick={() => setNewItemCategory(cat)}
                          className={cn(
                            "flex items-center gap-1 px-2 py-1 rounded-lg text-xs transition-all",
                            newItemCategory === cat
                              ? `${config.bgColor} ${config.color}`
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                          )}
                        >
                          <Icon className="w-3 h-3" />
                          {config.label}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setShowAddInput(false);
                        setNewItemTitle('');
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-700 transition-colors"
                    >
                      取消
                    </button>
                    <button
                      onClick={handleAddItem}
                      disabled={!newItemTitle.trim()}
                      className={cn(
                        "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-colors",
                        newItemTitle.trim()
                          ? "bg-violet-500 text-white hover:bg-violet-600"
                          : "bg-slate-700 text-slate-500 cursor-not-allowed"
                      )}
                    >
                      <Check className="w-3 h-3" />
                      添加
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setShowAddInput(true)}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-slate-600 text-slate-400 hover:text-violet-400 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">添加自定义检查项</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
