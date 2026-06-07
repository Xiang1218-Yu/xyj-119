import { motion } from 'framer-motion';
import { 
  Scroll, ArrowLeft, RefreshCw, Download, Copy, Check, 
  Quote, Gift, Play, Clock, FileText, Sparkles, ChevronRight,
  Bookmark, Share2, X, Globe
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function ScriptPage() {
  const { 
    selectedTopic, 
    scriptFramework, 
    selectedTitles,
    setCurrentPage,
    generateScriptForTopic
  } = useAppStore();
  
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'full' | 'hook' | 'body' | 'quotes' | 'eggs'>('full');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareCopied, setShareCopied] = useState<string | null>(null);

  useEffect(() => {
    if (selectedTopic && !scriptFramework) {
      generateScriptForTopic(selectedTopic.id);
    }
  }, [selectedTopic, scriptFramework, generateScriptForTopic]);

  const handleRegenerate = async () => {
    if (!selectedTopic || isRegenerating) return;
    setIsRegenerating(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    generateScriptForTopic(selectedTopic.id, true);
    setIsRegenerating(false);
  };

  const handleShare = async (platform: string) => {
    if (!scriptFramework) return;
    
    const shareText = `📝 选题：${scriptFramework.title}\n\n💡 已为你生成完整脚本框架，包含开头引入、正文分论点、金句推荐和彩蛋规划！\n\n${selectedTitles.length > 0 ? `🎯 备选标题：${selectedTitles.map(t => `「${t.title}」`).join('、')}\n\n` : ''}来自「内容创作者选题工具」`;
    
    try {
      if (platform === 'copy') {
        await navigator.clipboard.writeText(shareText);
        setShareCopied('copy');
        setTimeout(() => setShareCopied(null), 2000);
      } else if (platform === 'link') {
        const shareUrl = `${window.location.origin}?topic=${selectedTopic.id}`;
        await navigator.clipboard.writeText(shareUrl);
        setShareCopied('link');
        setTimeout(() => setShareCopied(null), 2000);
      } else if (navigator.share) {
        await navigator.share({
          title: scriptFramework.title,
          text: shareText,
          url: window.location.href,
        });
      }
    } catch (e) {
      console.warn('Share failed:', e);
    }
  };

  if (!selectedTopic) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto mb-6">
            <Scroll className="w-10 h-10 text-slate-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-300 mb-2">先选择一个选题</h2>
          <p className="text-slate-500 mb-6">去选题生成页选择你感兴趣的选题</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentPage('topic')}
            className="px-6 py-2.5 rounded-xl bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors"
          >
            去选择选题
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getFullScriptText = () => {
    if (!scriptFramework) return '';
    return [
      `【标题】${scriptFramework.title}`,
      `【时长】${scriptFramework.totalDuration}`,
      '',
      `【开头引入】（${scriptFramework.hook.type} - ${scriptFramework.hook.duration}）`,
      scriptFramework.hook.content,
      '',
      '【正文分论点】',
      ...scriptFramework.body.map((s, i) => [
        `${i + 1}. ${s.title}（${s.duration}）`,
        s.content,
        s.goldenQuote ? `金句：${s.goldenQuote}` : '',
        ''
      ].filter(Boolean).join('\n')),
      '',
      '【金句推荐】',
      ...scriptFramework.goldenQuotes.map(q => `- [${q.type}] ${q.content}（${q.position}）`),
      '',
      '【彩蛋规划】',
      ...scriptFramework.easterEggs.map(e => `- [${e.type}] ${e.position}：${e.description}`),
      '',
      `【结尾升华】（${scriptFramework.ending.duration}）`,
      scriptFramework.ending.content,
      '',
      '【互动引导】',
      scriptFramework.ending.callToAction,
    ].join('\n');
  };

  const tabs = [
    { id: 'full', label: '完整脚本' },
    { id: 'hook', label: '开头引入' },
    { id: 'body', label: '正文框架' },
    { id: 'quotes', label: '金句推荐' },
    { id: 'eggs', label: '彩蛋规划' },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800"
      >
        <div className="px-8 py-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage('title')}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </motion.button>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-white">脚本框架生成</h1>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-medium text-emerald-300">AI 生成</span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm">
                  为选题 <span className="text-violet-400 font-medium">「{selectedTopic.title}」</span> 生成的完整脚本框架
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRegenerate}
                disabled={isRegenerating}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={cn("w-4 h-4", isRegenerating && "animate-spin")} />
                <span className="text-sm">{isRegenerating ? "生成中..." : "重新生成"}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-sm">分享方案</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (!scriptFramework) return;
                  const blob = new Blob([getFullScriptText()], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${scriptFramework.title}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">导出脚本</span>
              </motion.button>
            </div>
          </div>

          {selectedTitles.length > 0 && (
            <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20 mb-4">
              <p className="text-xs text-violet-300 mb-2">📝 已选标题（可直接使用）：</p>
              <div className="flex flex-wrap gap-2">
                {selectedTitles.map((t, i) => (
                  <span key={t.id} className="px-3 py-1.5 rounded-lg bg-slate-800 text-sm text-slate-200">
                    {i + 1}. 「{t.title}」
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-1.5">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-violet-500 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                )}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="px-8 py-6">
        {scriptFramework ? (
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{scriptFramework.title}</h2>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-300">时长：{scriptFramework.totalDuration}</span>
                </div>
              </div>
            </motion.div>

            {(activeTab === 'full' || activeTab === 'hook') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">开头引入（{scriptFramework.hook.type}）</h3>
                    <span className="text-xs text-slate-500">{scriptFramework.hook.duration}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopy(scriptFramework.hook.content, 'hook')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-sm transition-colors"
                  >
                    {copiedSection === 'hook' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copiedSection === 'hook' ? '已复制' : '复制'}
                  </motion.button>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-pink-500/20">
                  <p className="text-slate-200 leading-relaxed">{scriptFramework.hook.content}</p>
                </div>
              </motion.div>
            )}

            {(activeTab === 'full' || activeTab === 'body') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">正文分论点</h3>
                </div>
                
                <div className="space-y-4">
                  {scriptFramework.body.map((section, index) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="relative"
                    >
                      <div className="absolute left-4 top-12 bottom-0 w-px bg-gradient-to-b from-violet-500/50 to-transparent" />
                      
                      <div className="flex items-start gap-4">
                        <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-white">{index + 1}</span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-slate-100">{section.title}</h4>
                              <span className="text-xs text-slate-500">{section.duration}</span>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleCopy(section.content, section.id)}
                              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs transition-colors"
                            >
                              {copiedSection === section.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            </motion.button>
                          </div>
                          
                          <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 mb-2">
                            <p className="text-slate-300 text-sm leading-relaxed">{section.content}</p>
                          </div>
                          
                          {section.goldenQuote && (
                            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                              <Quote className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-amber-200 italic">{section.goldenQuote}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {(activeTab === 'full' || activeTab === 'quotes') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">金句推荐</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {scriptFramework.goldenQuotes.map((quote, index) => (
                    <motion.div
                      key={quote.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="relative group"
                    >
                      <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 hover:border-amber-500/40 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-xs text-amber-300">{quote.type}</span>
                            <span className="text-xs text-slate-500">{quote.position}</span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCopy(quote.content, quote.id)}
                            className="opacity-0 group-hover:opacity-100 flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 text-slate-400 text-xs transition-all"
                          >
                            {copiedSection === quote.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </motion.button>
                        </div>
                        <p className="text-amber-100 italic">"{quote.content}"</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {(activeTab === 'full' || activeTab === 'eggs') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                    <Gift className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">彩蛋规划</h3>
                </div>
                
                <div className="space-y-3">
                  {scriptFramework.easterEggs.map((egg, index) => (
                    <motion.div
                      key={egg.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-cyan-400">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-xs text-cyan-300">{egg.type}</span>
                            <span className="text-xs text-slate-500">位置：{egg.position}</span>
                          </div>
                          <p className="text-slate-200 text-sm">{egg.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-cyan-400/50" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {(activeTab === 'full' || activeTab === 'hook') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                      <Bookmark className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">结尾升华</h3>
                    <span className="text-xs text-slate-500">{scriptFramework.ending.duration}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopy(scriptFramework.ending.content + '\n\n' + scriptFramework.ending.callToAction, 'ending')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 text-sm transition-colors"
                  >
                    {copiedSection === 'ending' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copiedSection === 'ending' ? '已复制' : '复制'}
                  </motion.button>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20">
                  <p className="text-slate-200 leading-relaxed mb-3">{scriptFramework.ending.content}</p>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <p className="text-sm text-emerald-200">
                      <span className="font-medium">互动引导：</span>{scriptFramework.ending.callToAction}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex justify-center gap-4 pt-6 border-t border-slate-800"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowShareModal(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                分享方案
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCopy(getFullScriptText(), 'full')}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-xl font-medium",
                  "bg-gradient-to-r from-violet-500 to-purple-600 text-white",
                  "hover:from-violet-600 hover:to-purple-700 transition-all",
                  "shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
                )}
              >
                {copiedSection === 'full' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiedSection === 'full' ? '已复制全部' : '复制完整脚本'}
              </motion.button>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-2 border-violet-500 border-t-transparent rounded-full mb-4"
            />
            <p className="text-slate-400">正在生成脚本框架...</p>
          </motion.div>
        )}
      </div>

      {showShareModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowShareModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md mx-4 p-6 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">分享脚本方案</h3>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleShare('copy')}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-left transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                  <Copy className="w-5 h-5 text-violet-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">复制分享文案</p>
                  <p className="text-xs text-slate-400">复制完整的方案分享给朋友</p>
                </div>
                {shareCopied === 'copy' && <Check className="w-5 h-5 text-emerald-400" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleShare('link')}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-left transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">复制链接</p>
                  <p className="text-xs text-slate-400">生成分享链接发送给好友</p>
                </div>
                {shareCopied === 'link' && <Check className="w-5 h-5 text-emerald-400" />}
              </motion.button>

              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleShare('native')}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-left transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">系统分享</p>
                    <p className="text-xs text-slate-400">通过系统分享菜单发送</p>
                  </div>
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (!scriptFramework) return;
                  const blob = new Blob([getFullScriptText()], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${scriptFramework.title}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-left transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Download className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">下载脚本文件</p>
                  <p className="text-xs text-slate-400">导出为 TXT 文件保存</p>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
