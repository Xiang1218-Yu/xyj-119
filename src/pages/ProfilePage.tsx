import { motion } from 'framer-motion';
import { User, Target, Users, Palette, Globe, Save, Check, X } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const domainOptions = [
  '职场', '职业发展', '个人成长', '科技', '美妆', '时尚',
  '美食', '旅行', '健身', '情感', '教育', '财经', '娱乐', '游戏'
];

const audienceOptions = [
  '00后', '95后', '90后', '80后', '宝妈', '大学生', '职场新人',
  '程序员', '设计师', '创业者', '中产阶级', '银发族'
];

const styleOptions = [
  '干货', '实用', '幽默', '深度分析', '故事叙述', '情感共鸣',
  '科普', '测评', 'Vlog', '教程', '访谈', '脱口秀'
];

const platformOptions = [
  '抖音', '小红书', 'B站', '微信公众号', '微博', '知乎', '视频号', '快手'
];

export default function ProfilePage() {
  const { userProfile } = useAppStore();
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    name: userProfile.name,
    domain: [...userProfile.domain],
    audience: [...userProfile.audience],
    style: [...userProfile.style],
    platform: [...userProfile.platform],
  });

  const handleToggle = (field: 'domain' | 'audience' | 'style' | 'platform', value: string) => {
    setFormData(prev => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(v => v !== value) };
      }
      if (current.length >= 5) {
        return prev;
      }
      return { ...prev, [field]: [...current, value] };
    });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Section = ({ 
    title, 
    icon: Icon, 
    field, 
    options, 
    description 
  }: { 
    title: string; 
    icon: any; 
    field: 'domain' | 'audience' | 'style' | 'platform';
    options: string[];
    description: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-violet-400" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">{title}</h3>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
        <span className="ml-auto text-xs text-slate-500">
          已选 {formData[field].length}/5
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = formData[field].includes(option);
          return (
            <motion.button
              key={option}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleToggle(field, option)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5",
                isSelected
                  ? "bg-violet-500 text-white"
                  : "bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              )}
            >
              {option}
              {isSelected && <Check className="w-3.5 h-3.5" />}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800"
      >
        <div className="px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-white">账号定位设置</h1>
              </div>
              <p className="text-slate-400 text-sm">
                完善你的账号定位，获取更精准的热点匹配和选题建议
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className={cn(
                "flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all",
                saved
                  ? "bg-emerald-500 text-white"
                  : "bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700"
              )}
            >
              {saved ? (
                <>
                  <Check className="w-4 h-4" />
                  已保存
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  保存设置
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="px-8 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-violet-600/20 to-purple-600/20 border border-violet-500/30"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-slate-400 mb-1 block">账号名称</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-transparent text-xl font-bold text-white border-none outline-none"
                  placeholder="输入你的账号名称"
                />
              </div>
            </div>
          </motion.div>

          <Section
            title="内容领域"
            icon={Target}
            field="domain"
            options={domainOptions}
            description="选择你主要创作的内容领域，最多5个"
          />

          <Section
            title="目标受众"
            icon={Users}
            field="audience"
            options={audienceOptions}
            description="你的内容主要面向哪些人群，最多5个"
          />

          <Section
            title="内容风格"
            icon={Palette}
            field="style"
            options={styleOptions}
            description="你常用的内容创作风格，最多5个"
          />

          <Section
            title="发布平台"
            icon={Globe}
            field="platform"
            options={platformOptions}
            description="你主要在哪些平台发布内容，最多5个"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700/50"
          >
            <h3 className="font-semibold text-slate-100 mb-4">当前定位预览</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 w-20">领域：</span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.domain.map((d, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-violet-500/20 text-xs text-violet-300">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 w-20">受众：</span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.audience.map((a, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-xs text-emerald-300">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 w-20">风格：</span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.style.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-amber-500/20 text-xs text-amber-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 w-20">平台：</span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.platform.map((p, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-xs text-cyan-300">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
