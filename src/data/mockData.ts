import { HotSpot, UserProfile, TopicSuggestion, TitleVariant, ScriptFramework, InspirationItem, InspirationDimension, InspirationDimensionData, CalendarEvent, ContentTypeConfig, ChecklistItem, ContentChecklist, MatchWeights, MatchDimension, MatchScoreBreakdown } from '@/types';

export const mockUserProfile: UserProfile = {
  id: '1',
  name: '职场博主小明',
  domain: ['职场', '职业发展', '个人成长'],
  audience: ['00后', '新人职场', '大学生'],
  style: ['干货', '实用', '幽默'],
  platform: ['抖音', '小红书', 'B站'],
};

export const mockHotSpots: HotSpot[] = [
  {
    id: '1',
    title: '00后整顿职场',
    platform: 'douyin',
    heatIndex: 9850000,
    trend: 'rising',
    matchScore: 95,
    category: '职场',
    description: '00后新员工在职场中展现出与前辈不同的处事方式，敢于拒绝不合理要求、维护自身权益，引发广泛讨论。',
    timeline: [
      { time: '3天前', event: '某公司00后员工拒绝无偿加班视频走红' },
      { time: '2天前', event: '#00后整顿职场#话题登上热搜榜第一' },
      { time: '1天前', event: '多家媒体报道讨论职场代际差异' },
    ],
    relatedTopics: ['职场PUA', '加班文化', '996工作制', '职场新人'],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'AI绘画技术突破',
    platform: 'bilibili',
    heatIndex: 7620000,
    trend: 'rising',
    matchScore: 45,
    category: '科技',
    description: '新一代AI绘画模型发布，生成质量大幅提升，引发艺术圈和科技圈的热烈讨论。',
    timeline: [
      { time: '5天前', event: '新模型Demo视频发布' },
      { time: '3天前', event: '网友晒出AI生成作品' },
      { time: '1天前', event: '关于AI取代人类画师的讨论升温' },
    ],
    relatedTopics: ['AIGC', 'Midjourney', '数字艺术', '技术伦理'],
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    title: '年轻人开始反向消费',
    platform: 'xiaohongshu',
    heatIndex: 6540000,
    trend: 'stable',
    matchScore: 82,
    category: '生活方式',
    description: '越来越多年轻人开始拒绝品牌溢价，追求性价比，从追求大牌转向关注产品本身价值。',
    timeline: [
      { time: '1周前', event: '小红书博主分享"反向消费"心得' },
      { time: '5天前', event: '相关话题浏览量破亿' },
      { time: '2天前', event: '多家平价品牌销量大涨' },
    ],
    relatedTopics: ['消费降级', '理性消费', '性价比', '断舍离'],
    createdAt: '2024-01-13',
  },
  {
    id: '4',
    title: '研究生考试成绩公布',
    platform: 'weibo',
    heatIndex: 8930000,
    trend: 'rising',
    matchScore: 70,
    category: '教育',
    description: '2024年全国硕士研究生招生考试成绩公布，相关话题持续霸榜热搜。',
    timeline: [
      { time: '今天', event: '成绩查询通道正式开放' },
      { time: '今天', event: '#考研成绩#话题阅读量破20亿' },
    ],
    relatedTopics: ['考研', '复试', '调剂', '二战考研'],
    createdAt: '2024-01-15',
  },
  {
    id: '5',
    title: '全职儿女现象引热议',
    platform: 'zhihu',
    heatIndex: 5420000,
    trend: 'rising',
    matchScore: 88,
    category: '社会',
    description: '部分年轻人选择不外出工作，而是在家陪伴照顾父母并领取父母支付的"工资"，引发社会广泛讨论。',
    timeline: [
      { time: '1周前', event: '知乎提问"如何看待全职儿女"获高赞' },
      { time: '4天前', event: '多个家庭案例被媒体报道' },
      { time: '2天前', event: '专家分析这一现象背后的社会原因' },
    ],
    relatedTopics: ['啃老', '孝文化', '就业压力', '家庭关系'],
    createdAt: '2024-01-12',
  },
  {
    id: '6',
    title: '咖啡价格战愈演愈烈',
    platform: 'xiaohongshu',
    heatIndex: 4210000,
    trend: 'stable',
    matchScore: 55,
    category: '商业',
    description: '各大咖啡品牌纷纷降价促销，9.9元咖啡成为常态，行业内卷加剧。',
    timeline: [
      { time: '2周前', event: '某品牌宣布全线产品降价' },
      { time: '1周前', event: '多个品牌跟进降价' },
      { time: '3天前', event: '专家预警行业洗牌' },
    ],
    relatedTopics: ['瑞幸', '星巴克', '咖啡市场', '价格战'],
    createdAt: '2024-01-10',
  },
  {
    id: '7',
    title: '程序员35岁危机',
    platform: 'zhihu',
    heatIndex: 6120000,
    trend: 'rising',
    matchScore: 78,
    category: '职场',
    description: '互联网行业中35岁以上程序员的就业困境再次引发关注，多位从业者分享亲身经历。',
    timeline: [
      { time: '1周前', event: '某大厂裁员消息传出' },
      { time: '5天前', event: '多位35+程序员分享转行经历' },
      { time: '2天前', event: '话题登上知乎热榜第一' },
    ],
    relatedTopics: ['互联网裁员', '职业规划', '中年危机', '程序员转行'],
    createdAt: '2024-01-13',
  },
  {
    id: '8',
    title: 'Citywalk成年轻人新宠',
    platform: 'douyin',
    heatIndex: 3890000,
    trend: 'stable',
    matchScore: 60,
    category: '生活方式',
    description: '城市漫步（Citywalk）成为年轻人新的休闲方式，不设目的地、随性探索城市的旅行方式走红。',
    timeline: [
      { time: '3周前', event: 'Citywalk相关笔记开始增多' },
      { time: '2周前', event: '多个城市推出Citywalk路线推荐' },
      { time: '1周前', event: '抖音话题播放量破10亿' },
    ],
    relatedTopics: ['城市漫游', '旅行方式', '城市探索', '周末去哪儿'],
    createdAt: '2024-01-08',
  },
];

export const generateTopics = (hotSpotId: string): TopicSuggestion[] => {
  const topics: Record<string, TopicSuggestion[]> = {
    '1': [
      {
        id: 't1-1',
        hotSpotId: '1',
        title: '新人入职的5个加分细节',
        angle: '从正向引导角度，帮助00后更好地适应职场，避免"整顿"变成"莽撞"',
        description: '00后想要在职场中站稳脚跟，光靠勇气是不够的。这5个细节，让你在保持个性的同时，也能赢得同事和领导的认可。',
        audienceAnalysis: '主要面向即将入职或刚入职的00后，以及对职场生态感兴趣的职场新人',
        competitionLevel: 'low',
        contentDirections: [
          '入职前的准备工作和心态调整',
          '第一天上班的注意事项',
          '如何与不同年龄段的同事相处',
          '正确"维权"的时机和方式',
          '新人快速成长的实用技巧',
        ],
        score: 92,
        tags: ['职场新人', '入职指南', '实用干货'],
      },
      {
        id: 't1-2',
        hotSpotId: '1',
        title: '00后职场生存指南：如何在保持个性的同时不被边缘化',
        angle: '深度分析00后职场困境的根源，给出建设性解决方案',
        description: '"整顿职场"不是目的，获得尊重和成长才是。本文分析00后与前辈的代际差异，教你如何在保持个性和融入团队之间找到平衡点。',
        audienceAnalysis: '已在职场中遭遇挫折或困惑的00后，以及希望了解年轻人想法的管理者',
        competitionLevel: 'medium',
        contentDirections: [
          '代际差异的本质是什么',
          '如何识别真正的职场PUA',
          '有效沟通的技巧',
          '建立个人边界的正确方式',
          '长期职业发展规划',
        ],
        score: 88,
        tags: ['代际沟通', '职场智慧', '深度分析'],
      },
      {
        id: 't1-3',
        hotSpotId: '1',
        title: '老板视角：我为什么喜欢有个性的00后员工',
        angle: '反常规视角，从管理者角度看待00后员工的价值',
        description: '很多人觉得00后难管，但作为一个带过几十人的团队leader，我反而觉得00后是最有潜力的一代人。他们身上的这些特质，恰恰是很多老员工缺失的。',
        audienceAnalysis: '企业管理者、HR，以及想要了解上级想法的普通员工',
        competitionLevel: 'medium',
        contentDirections: [
          '00后员工的三大优势',
          '如何管理有个性的员工',
          '新旧思维碰撞出的创新火花',
          '案例：一个00后员工如何让团队焕然一新',
          '给管理者的几点建议',
        ],
        score: 85,
        tags: ['管理视角', '团队建设', '逆向思维'],
      },
    ],
    '5': [
      {
        id: 't5-1',
        hotSpotId: '5',
        title: '"全职儿女"不是啃老，是另一种生活选择',
        angle: '客观中立地分析这一现象，避免简单的道德评判',
        description: '当我们在讨论"全职儿女"时，我们在讨论什么？是年轻人的堕落，还是社会结构变化带来的新选择？本文带你深入了解这一群体的真实生活。',
        audienceAnalysis: '对社会现象感兴趣的年轻人，面临类似选择的人，以及关心子女的父母',
        competitionLevel: 'medium',
        contentDirections: [
          '什么样的人会选择做全职儿女',
          '全职儿女的一天是怎样度过的',
          '经济账：全职儿女划算吗',
          '社会支持系统的缺失',
          '给面临选择的人的建议',
        ],
        score: 89,
        tags: ['社会观察', '生活选择', '深度报道'],
      },
      {
        id: 't5-2',
        hotSpotId: '5',
        title: '做了6个月全职儿女，我决定回去上班了',
        angle: '第一人称真实故事，分享亲身经历和感悟',
        description: '半年前，我裸辞回家当起了全职儿女，每个月从父母那里领5000块"工资"。本以为会一直这样下去，没想到6个月后我改变了主意。',
        audienceAnalysis: '对这种生活方式好奇的人，正在犹豫是否做出类似选择的人',
        competitionLevel: 'low',
        contentDirections: [
          '为什么我选择做全职儿女',
          '前3个月：真香！',
          '第4个月开始出现的问题',
          '让我决定改变的那个瞬间',
          '这段经历给我的收获',
        ],
        score: 94,
        tags: ['真实故事', '个人成长', '生活感悟'],
      },
    ],
    '7': [
      {
        id: 't7-1',
        hotSpotId: '7',
        title: '35岁被裁后，我靠这3个技能实现了收入翻倍',
        angle: '励志逆袭故事，提供可复制的方法论',
        description: '35岁生日那天，我收到了裁员通知。房贷要还，孩子要养，上有老下有小的我，没有时间焦虑。凭借这3个提前布局的技能，我在3个月内找到了新的方向，收入反而比以前更高。',
        audienceAnalysis: '30+职场人士，有职业焦虑的程序员，想要做副业的上班族',
        competitionLevel: 'medium',
        contentDirections: [
          '被裁前我做了哪些准备',
          '3个让我逆袭的核心技能',
          '如何快速找到新的收入来源',
          '中年转型的心态建设',
          '给年轻程序员的建议',
        ],
        score: 95,
        tags: ['职业转型', '副业赚钱', '程序员'],
      },
      {
        id: 't7-2',
        hotSpotId: '7',
        title: '别等到35岁才明白：职场不是竞技场，是生态系统',
        angle: '认知升级类内容，改变读者对职场的根本看法',
        description: '很多程序员把职场当成写代码，只要技术牛逼就能一路升级。但35岁的坎让很多人明白，职场的底层逻辑根本不是这样。',
        audienceAnalysis: '所有职场人士，尤其是技术出身的从业者',
        competitionLevel: 'high',
        contentDirections: [
          '为什么技术越好反而越容易遇到天花板',
          '职场生态系统的3个核心角色',
          '你需要在30岁前想清楚的3件事',
          '如何构建不可替代的竞争力',
          '不同阶段的职业发展策略',
        ],
        score: 90,
        tags: ['职业规划', '认知升级', '深度思考'],
      },
    ],
  };

  return topics[hotSpotId] || [];
};

const titleTemplates: Record<string, TitleVariant[]> = {
  't1-1': [
    {
      id: 'title-1',
      topicId: 't1-1',
      title: '新人入职的5个加分细节，学会一个都能少走3年弯路',
      style: 'practical',
      scores: { curiosity: 75, emotion: 65, practical: 95, uniqueness: 60, overall: 79 },
      analysis: '强调实用性和价值感，用"少走3年弯路"制造焦虑同时给出解决方案，适合干货类内容。',
      suggestions: ['可以把"3年"改成具体场景', '数字效果很好，可以保留'],
    },
    {
      id: 'title-2',
      topicId: 't1-1',
      title: '00后别再"整顿职场"了！这5件事做到位，领导主动给你加薪',
      style: 'controversy',
      scores: { curiosity: 90, emotion: 85, practical: 70, uniqueness: 80, overall: 81 },
      analysis: '反常规观点制造冲突，用"别再整顿职场"吸引注意力，"主动加薪"给出明确好处。',
      suggestions: ['开头一定要解释为什么"别再整顿"', '可以加一个真实案例增加可信度'],
    },
    {
      id: 'title-3',
      topicId: 't1-1',
      title: '刚入职就被夸"情商高"，我只是做对了这5件小事',
      style: 'story',
      scores: { curiosity: 80, emotion: 75, practical: 65, uniqueness: 70, overall: 72 },
      analysis: '第一人称叙事增加代入感，"被夸情商高"是正向反馈，容易引发读者的模仿欲。',
      suggestions: ['可以增加具体的对话场景', '结尾可以加一个自己踩过的坑'],
    },
    {
      id: 'title-4',
      topicId: 't1-1',
      title: '为什么有的新人入职3个月就转正，有的人半年还在试用期？',
      style: 'curiosity',
      scores: { curiosity: 95, emotion: 60, practical: 70, uniqueness: 75, overall: 75 },
      analysis: '疑问句引发好奇心，对比制造认知冲突，读者会想知道答案而点进来。',
      suggestions: ['开头可以用一个真实案例引出', '答案要具体可操作'],
    },
    {
      id: 'title-5',
      topicId: 't1-1',
      title: '入职第一天我就得罪了同事，后来靠这5个细节扭转了局面',
      style: 'emotion',
      scores: { curiosity: 85, emotion: 90, practical: 75, uniqueness: 85, overall: 84 },
      analysis: '先抑后扬的叙事结构，"得罪同事"制造紧张感，"扭转局面"给出爽点，情绪价值拉满。',
      suggestions: ['一定要把"得罪同事"的场景写具体', '转折点要突出细节的重要性'],
    },
    {
      id: 'title-6',
      topicId: 't1-1',
      title: '新人入职避坑指南：这5个细节没做好，能力再强也白搭',
      style: 'practical',
      scores: { curiosity: 70, emotion: 70, practical: 90, uniqueness: 55, overall: 71 },
      analysis: '"避坑指南"是经典实用类标题模板，"能力再强也白搭"制造焦虑感，促使读者学习。',
      suggestions: ['可以用反向案例开头', '每个坑配一个真实例子效果更好'],
    },
    {
      id: 'title-7',
      topicId: 't1-1',
      title: '领导私下跟我说：职场新人这5个细节，比能力还重要',
      style: 'curiosity',
      scores: { curiosity: 92, emotion: 65, practical: 80, uniqueness: 88, overall: 81 },
      analysis: '"领导私下跟我说"制造独家感和权威性，"比能力还重要"反常识，引发好奇心。',
      suggestions: ['可以营造一种"内部消息"的感觉', '结尾可以加一个与领导的对话片段'],
    },
    {
      id: 'title-8',
      topicId: 't1-1',
      title: '作为一个带过100+新人的leader，我最看重这5个加分细节',
      style: 'practical',
      scores: { curiosity: 85, emotion: 60, practical: 92, uniqueness: 75, overall: 78 },
      analysis: '权威身份背书（带过100+新人）增加内容可信度，"最看重"强调重要性。',
      suggestions: ['可以增加一个"反面教材"案例', '每个细节解释"为什么重要"'],
    },
    {
      id: 'title-9',
      topicId: 't1-1',
      title: '00后新人必看：不想被当成"小孩"，这5件事一定要做到位',
      style: 'emotion',
      scores: { curiosity: 80, emotion: 88, practical: 75, uniqueness: 70, overall: 78 },
      analysis: '精准戳中00后的痛点——不想被轻视，情绪共鸣强，目标用户明确。',
      suggestions: ['开头可以用一句00后常听到的话引出', "避免说教感，多用'我理解'"],
    },
    {
      id: 'title-10',
      topicId: 't1-1',
      title: '同事都夸我"会来事"，其实我只是记住了这5个简单的细节',
      style: 'story',
      scores: { curiosity: 75, emotion: 80, practical: 70, uniqueness: 80, overall: 76 },
      analysis: '"会来事"是一个有争议的标签，"简单的细节"降低学习门槛，读者会想知道到底是什么。',
      suggestions: ['可以重新定义"会来事"是高情商不是世故', '每个细节配一个具体场景'],
    },
    {
      id: 'title-11',
      topicId: 't1-1',
      title: '入职3个月就成了团队核心，这5个细节帮了大忙',
      style: 'story',
      scores: { curiosity: 88, emotion: 75, practical: 80, uniqueness: 72, overall: 79 },
      analysis: '3个月vs团队核心制造强烈对比，结果导向让读者看到学习后的美好前景。',
      suggestions: ['可以对比入职前和入职3个月的变化', '突出"细节"的决定性作用'],
    },
    {
      id: 'title-12',
      topicId: 't1-1',
      title: '职场不是学校，没人会主动教你这些——新人必知的5个潜规则',
      style: 'controversy',
      scores: { curiosity: 85, emotion: 75, practical: 85, uniqueness: 65, overall: 78 },
      analysis: '"潜规则"带有神秘色彩，"没人会主动教你"制造紧迫感和稀缺感。',
      suggestions: ['把"潜规则"重新定义为"默认共识"', '强调这是保护自己的方式'],
    },
  ],
  't1-2': [
    {
      id: 'title-t2-1',
      topicId: 't1-2',
      title: '00后职场生存指南：如何在保持个性的同时不被边缘化',
      style: 'practical',
      scores: { curiosity: 80, emotion: 85, practical: 90, uniqueness: 75, overall: 82 },
      analysis: '直击00后核心痛点，既有共鸣又给方法，平衡感很好。',
      suggestions: ['开头加一个真实案例', '突出"保持个性"的度的把握'],
    },
    {
      id: 'title-t2-2',
      topicId: 't1-2',
      title: '"我凭什么要迁就他们？"00后如何优雅地拒绝职场PUA',
      style: 'emotion',
      scores: { curiosity: 90, emotion: 92, practical: 70, uniqueness: 85, overall: 84 },
      analysis: '用00后的口头禅开头，情绪共鸣极强，"优雅拒绝"给出明确态度。',
      suggestions: ['一定要区分"正当拒绝"和"情绪化对抗"的区别', '结尾升华到"有尊严地工作"'],
    },
    {
      id: 'title-t2-3',
      topicId: 't1-2',
      title: '在职场"做自己"真的会死吗？95后00后必看',
      style: 'curiosity',
      scores: { curiosity: 95, emotion: 75, practical: 70, uniqueness: 80, overall: 80 },
      analysis: '犀利设问引发好奇，"真的会死吗"制造强烈认知冲突。',
      suggestions: ['答案要出人意料但又在情理之中', '用数据或案例支撑观点'],
    },
    {
      id: 'title-t2-4',
      topicId: 't1-2',
      title: '领导最怕的不是00后整顿职场，而是这3个"伪个性',
      style: 'controversy',
      scores: { curiosity: 88, emotion: 70, practical: 80, uniqueness: 90, overall: 82 },
      analysis: '反常规观点——整顿职场不是问题，"伪个性"才是问题。',
      suggestions: ['定义清楚什么是"伪个性"', '给出"真个性"的标准'],
    },
    {
      id: 'title-t2-5',
      topicId: 't1-2',
      title: '我是00后，我不想"融入"，但我也不想被孤立',
      style: 'story',
      scores: { curiosity: 80, emotion: 90, practical: 75, uniqueness: 85, overall: 82 },
      analysis: '第一人称坦诚表达，真实感强，容易引发同类群体的强烈共鸣。',
      suggestions: ['分享自己的真实经历', '给出从"不融入也能被尊重"的具体方法'],
    },
    {
      id: 'title-t2-6',
      topicId: 't1-2',
      title: '00后请记住：职场可以有棱角，但别带刺',
      style: 'practical',
      scores: { curiosity: 70, emotion: 80, practical: 85, uniqueness: 75, overall: 78 },
      analysis: '用比喻手法形象易懂，"有棱角但别带刺"精准表达核心观点。',
      suggestions: ['解释"棱角"和"刺"的区别', '用具体场景说明'],
    },
    {
      id: 'title-t2-7',
      topicId: 't1-2',
      title: '为什么你那么有个性，却在职场混得那么惨？',
      style: 'curiosity',
      scores: { curiosity: 92, emotion: 75, practical: 80, uniqueness: 88, overall: 84 },
      analysis: '强烈对比制造认知失调，读者会带着"我是不是也这样"的心态点进来。',
      suggestions: ['答案不能是"要磨平棱角"', '要给出建设性方案'],
    },
    {
      id: 'title-t2-8',
      topicId: 't1-2',
      title: '00后职场真相：你以为的"做自己"，在别人眼里可能是"没教养"',
      style: 'controversy',
      scores: { curiosity: 94, emotion: 85, practical: 75, uniqueness: 92, overall: 86 },
      analysis: '尖锐但有道理的观点，会引发争议和讨论，传播性强。',
      suggestions: ['开头先共情再讲道理', '语气要温和但观点要明确'],
    },
    {
      id: 'title-t2-9',
      topicId: 't1-2',
      title: '从被排挤到被尊重，00后职场逆袭的5个心法',
      style: 'story',
      scores: { curiosity: 85, emotion: 88, practical: 82, uniqueness: 78, overall: 83 },
      analysis: '逆袭故事永远有吸引力，"心法"比"方法"更有深度感。',
      suggestions: ['突出心理变化的描写', '每个心法配一个具体做法'],
    },
    {
      id: 'title-t2-10',
      topicId: 't1-2',
      title: '00后不用学"职场不需要讨好所有人，但要学会这3件事',
      style: 'emotion',
      scores: { curiosity: 78, emotion: 82, practical: 90, uniqueness: 70, overall: 80 },
      analysis: '先站在00后的立场说话，"不用讨好"很得人心，"学会3件事"给出干货。',
      suggestions: ['强调"讨好"和"尊重"的区别', '3件事要具体可操作'],
    },
    {
      id: 'title-t2-11',
      topicId: 't1-2',
      title: '职场3年，我终于找到了"做自己"和"被接纳"的平衡点',
      style: 'story',
      scores: { curiosity: 82, emotion: 85, practical: 88, uniqueness: 80, overall: 84 },
      analysis: '过来人身份分享经验，"平衡点"是00后最想听的答案。',
      suggestions: ['分享找平衡点的过程', '给出判断标准'],
    },
    {
      id: 'title-t2-12',
      topicId: 't1-2',
      title: '00后请收好：保持个性，但别拿"年轻"当挡箭牌',
      style: 'practical',
      scores: { curiosity: 80, emotion: 78, practical: 85, uniqueness: 82, overall: 81 },
      analysis: '点破一个常见误区，有警醒作用，容易引发反思。',
      suggestions: ['区分"年轻"和"不成熟"的区别', '给出正确的"年轻优势"用法'],
    },
  ],
  't1-3': [
    {
      id: 'title-t3-1',
      topicId: 't1-3',
      title: '老板视角：我为什么喜欢有个性的00后员工',
      style: 'curiosity',
      scores: { curiosity: 92, emotion: 70, practical: 80, uniqueness: 95, overall: 84 },
      analysis: '反常规视角，老板说"喜欢00后"打破刻板印象，00后会想知道原因。',
      suggestions: ['用老板的口吻', '给出具体喜欢的点'],
    },
    {
      id: 'title-t3-2',
      topicId: 't1-3',
      title: '作为老板，我反而更愿意给"整顿职场"的00后加薪',
      style: 'controversy',
      scores: { curiosity: 95, emotion: 80, practical: 75, uniqueness: 90, overall: 85 },
      analysis: '完全反常识——老板给"整顿职场"的人加薪？读者会好奇为什么。',
      suggestions: ['解释"整顿职场"和"有原则"的区别', '给出老板真正欣赏的特质'],
    },
    {
      id: 'title-t3-3',
      topicId: 't1-3',
      title: '老板真心话：00后身上这3个特质，比经验还值钱',
      style: 'practical',
      scores: { curiosity: 88, emotion: 75, practical: 85, uniqueness: 80, overall: 82 },
      analysis: '"比经验还值钱"制造悬念，00后会想知道自己有没有这些特质。',
      suggestions: ['每个特质配一个真实案例', '对比传统经验为什么不重要'],
    },
    {
      id: 'title-t3-4',
      topicId: 't1-3',
      title: '我是老板，我最怕的不是刺头员工，而是没想法的人',
      style: 'story',
      scores: { curiosity: 85, emotion: 80, practical: 78, uniqueness: 88, overall: 83 },
      analysis: '说出很多老板想说但没说的真心话，有共鸣。',
      suggestions: ['讲一个"刺头"和"没想法"的对比案例', '给出如何"有想法"的方法'],
    },
    {
      id: 'title-t3-5',
      topicId: 't1-3',
      title: '00后别再被"职场经验"骗了，老板要的根本不是这个',
      style: 'emotion',
      scores: { curiosity: 90, emotion: 85, practical: 72, uniqueness: 85, overall: 83 },
      analysis: '戳破"经验论"的假象，告诉00后他们的价值在哪里。',
      suggestions: ['拆解"经验"的误区', '给出老板真正看重的东西'],
    },
    {
      id: 'title-t3-6',
      topicId: 't1-3',
      title: '当老板10年，我终于明白：00后才是未来',
      style: 'story',
      scores: { curiosity: 82, emotion: 88, practical: 70, uniqueness: 82, overall: 81 },
      analysis: '10年老板的感悟，有分量感，"00后是未来"给00后很大认同感。',
      suggestions: ['讲一个观念转变的故事', '具体说明00后的优势'],
    },
    {
      id: 'title-t3-7',
      topicId: 't1-3',
      title: '老板偷偷告诉你：00后这样提加薪，成功率90%',
      style: 'practical',
      scores: { curiosity: 90, emotion: 75, practical: 92, uniqueness: 78, overall: 84 },
      analysis: '"偷偷告诉你"制造独家感，"90%成功率"给出具体结果。',
      suggestions: ['给出具体的加薪话术', '强调00后的独特优势'],
    },
    {
      id: 'title-t3-8',
      topicId: 't1-3',
      title: '为什么00后一入职就敢怼老板？因为他们看透了这3件事',
      style: 'curiosity',
      scores: { curiosity: 94, emotion: 78, practical: 72, uniqueness: 85, overall: 82 },
      analysis: '"看透了这3件事"制造悬念，读者会想知道是哪3件。',
      suggestions: ['这3件事要深刻有道理', '给出建设性的做法'],
    },
    {
      id: 'title-t3-9',
      topicId: 't1-3',
      title: '老板：我宁愿要一个敢说真话的00后，也不要10个唯唯诺诺的老员工',
      style: 'controversy',
      scores: { curiosity: 88, emotion: 82, practical: 75, uniqueness: 92, overall: 84 },
      analysis: '强烈对比表达观点，"敢说真话"戳中很多00后痛点。',
      suggestions: ['解释为什么唯唯诺诺的老员工不受欢迎', '给出"敢说真话"的正确方式'],
    },
    {
      id: 'title-t3-10',
      topicId: 't1-3',
      title: '从00后身上，我学到了做老板的意义',
      style: 'story',
      scores: { curiosity: 80, emotion: 90, practical: 68, uniqueness: 85, overall: 81 },
      analysis: '老板反过来向00后学习，视角独特，情感真挚。',
      suggestions: ['讲一个具体的学习经历', '结尾升华到代际共融'],
    },
    {
      id: 'title-t3-11',
      topicId: 't1-3',
      title: '老板揭秘：00后职场的3个隐形优势',
      style: 'practical',
      scores: { curiosity: 85, emotion: 75, practical: 88, uniqueness: 78, overall: 81 },
      analysis: '"隐形优势"说明很多00后自己都不知道，有价值感。',
      suggestions: ['每个优势配一个具体案例', '告诉00后如何发挥'],
    },
    {
      id: 'title-t3-12',
      topicId: 't1-3',
      title: '00后不用改个性，老板需要的就是你的"不一样"',
      style: 'emotion',
      scores: { curiosity: 80, emotion: 92, practical: 78, uniqueness: 80, overall: 82 },
      analysis: '给00后信心，"不用改个性"是他们最想听的话。',
      suggestions: ['强调"不一样"的价值', '给出如何把不一样变成优势的方法'],
    },
  ],
};

const scriptTemplates: Record<string, ScriptFramework> = {
  't1-1': {
    id: 'script-1',
    topicId: 't1-1',
    title: '新人入职的5个加分细节',
    hook: {
      type: '场景引入',
      content: '你有没有过这种经历：明明自己能力不差，干活也勤快，但在公司就是没有存在感？领导不重视，同事也不怎么搭理你。而有些新人，明明和你一起入职，却能在3个月内就脱颖而出，成为团队里的香饽饽。',
      duration: '0:00-0:15',
    },
    body: [
      {
        id: 'body-1',
        title: '细节一：记住每个人的名字和喜好',
        content: '上班第一天，把部门所有人的名字、职位、甚至他们经常点什么奶茶都记下来。下次见面叫得出名字，偶尔随口说一句"你上次点的那家奶茶好喝吗"，瞬间拉近距离。',
        duration: '0:15-0:45',
        goldenQuote: '"记住别人的名字，是最低成本的社交投资。"',
      },
      {
        id: 'body-2',
        title: '细节二：学会"接话"而不是"打断"',
        content: '开会时别急着发表高见，等别人说完，先肯定一句"刚才XX说的这点特别好"，再补充自己的想法。没人喜欢被否定，但人人都喜欢被认同。',
        duration: '0:45-1:15',
      },
      {
        id: 'body-3',
        title: '细节三：不做"伸手党"，提问前先思考',
        content: '遇到问题先自己查资料、想办法，实在搞不定再去问人。提问时先说"我已经尝试了A和B方法，但还是有问题"，别人才愿意帮你。',
        duration: '1:15-1:45',
        goldenQuote: '"能百度到的问题，就别麻烦别人。"',
      },
      {
        id: 'body-4',
        title: '细节四：靠谱比能力更重要',
        content: '答应的事情一定要做到，做不到提前说。事事有回音，件件有着落。久而久之，领导就会觉得：这个年轻人，靠谱。',
        duration: '1:45-2:15',
      },
      {
        id: 'body-5',
        title: '细节五：学会"恰到好处"地展示自己',
        content: '不是让你去抢功，而是在合适的场合让领导看到你的价值。周会汇报、项目复盘，都是你展示成果的好机会。酒香也怕巷子深。',
        duration: '2:15-2:45',
        goldenQuote: '"你的价值，要让别人看得见。"',
      },
    ],
    goldenQuotes: [
      {
        id: 'gq-1',
        content: '记住别人的名字，是最低成本的社交投资。',
        position: '第一点结尾',
        type: '社交智慧',
      },
      {
        id: 'gq-2',
        content: '能百度到的问题，就别麻烦别人。',
        position: '第三点结尾',
        type: '职场素养',
      },
      {
        id: 'gq-3',
        content: '你的价值，要让别人看得见。',
        position: '第五点结尾',
        type: '个人成长',
      },
      {
        id: 'gq-4',
        content: '职场没有白走的路，每一步都算数。',
        position: '结尾升华',
        type: '励志金句',
      },
    ],
    easterEggs: [
      {
        id: 'ee-1',
        position: '开头0:10处',
        type: '互动彩蛋',
        description: '屏幕弹出选择题："你觉得职场新人最重要的品质是什么？A.能力强 B.情商高 C.很靠谱 D.长得好看"，在评论区留下你的答案。',
      },
      {
        id: 'ee-2',
        position: '2:00处',
        type: '反转彩蛋',
        description: '插一个小片段："我刚入职时也踩过一个大坑..." 然后快速闪回一个搞笑的失败经历，拉近距离。',
      },
      {
        id: 'ee-3',
        position: '结尾2:50处',
        type: '福利彩蛋',
        description: '"评论区留言【新人】，我把整理好的《新人入职避坑手册》免费送给你，里面还有30个职场高频问题的标准答案。"',
      },
    ],
    ending: {
      content: '其实职场没有那么复杂，很多时候，决定你能不能走得远的，恰恰是这些容易被忽略的小细节。把小事做好，大事自然会来找你。',
      callToAction: '觉得有用的话，记得点赞收藏，分享给你身边正在找工作或者刚入职的朋友。关注我，每天一个职场小技巧，让你的升职加薪之路走得更顺畅。我们下期见！',
      duration: '2:45-3:10',
    },
    totalDuration: '约3分10秒',
  },
  't1-2': {
    id: 'script-2',
    topicId: 't1-2',
    title: '00后职场生存指南：如何在保持个性的同时不被边缘化',
    hook: {
      type: '灵魂拷问',
      content: '你有没有过这种感觉：明明自己没做错什么，但就是感觉和周围的环境格格不入？你不想讨好任何人，不想参加无聊的应酬，不想说违心的话，但又怕被当成"异类"，被孤立，被排挤。',
      duration: '0:00-0:18',
    },
    body: [
      {
        id: 'body-t2-1',
        title: '第一，区分"个性"和"任性"',
        content: '很多人搞混了这两个概念。什么是个性？你有自己的原则，不随波逐流，敢于表达不同意见。什么是任性？只考虑自己的感受，不尊重别人的边界，把没礼貌当真性情。前者让人敬佩，后者让人讨厌。',
        duration: '0:18-0:50',
        goldenQuote: '"有个性不是让人不舒服，而是让人记住你。"',
      },
      {
        id: 'body-t2-2',
        title: '第二，用实力建立你的不可替代性',
        content: '职场的真相是：只要你有实力，你的"不一样"就是特点；没有实力，你的"不一样"就是毛病。与其花精力去"融入"，不如花时间把业务做到最好。当你不可替代时，没人会在意你喜不喜欢应酬。',
        duration: '0:50-1:25',
        goldenQuote: '"实力是最好的社交货币。"',
      },
      {
        id: 'body-t2-3',
        title: '第三，学会"选择性社交"',
        content: '你不需要和所有人都成为朋友，但要和关键人物保持良好关系。谁是关键人物？你的直接领导，核心业务伙伴，能帮你成长的前辈。其他人，保持礼貌和距离就够了。',
        duration: '1:25-2:00',
      },
      {
        id: 'body-t2-4',
        title: '第四，沟通时"对事不对人"',
        content: '00后最容易犯的错：把对事情的不满，变成对人的攻击。比如不要说"你怎么总是这样"，要说"这件事如果这样做可能效果更好"。就事论事，既表达了观点，又不会树敌。',
        duration: '2:00-2:35',
        goldenQuote: '"可以提意见，但不要带情绪。"',
      },
      {
        id: 'body-t2-5',
        title: '第五，建立你的"个人品牌"',
        content: '与其努力让所有人都喜欢你，不如让别人清楚地知道你是谁、你擅长什么、你坚持什么。当你的个人品牌足够清晰时，欣赏你的人会主动靠近你，不欣赏你的人也会敬你三分。',
        duration: '2:35-3:10',
      },
    ],
    goldenQuotes: [
      {
        id: 'gq-t2-1',
        content: '有个性不是让人不舒服，而是让人记住你。',
        position: '第一点结尾',
        type: '处世智慧',
      },
      {
        id: 'gq-t2-2',
        content: '实力是最好的社交货币。',
        position: '第二点结尾',
        type: '职场真相',
      },
      {
        id: 'gq-t2-3',
        content: '可以提意见，但不要带情绪。',
        position: '第四点结尾',
        type: '沟通技巧',
      },
      {
        id: 'gq-t2-4',
        content: '你不需要融入圈子，你只需要成为自己的圈子。',
        position: '结尾升华',
        type: '个人成长',
      },
    ],
    easterEggs: [
      {
        id: 'ee-t2-1',
        position: '开头0:15处',
        type: '互动彩蛋',
        description: '屏幕弹出投票："你是社牛还是社恐？A.社牛 B.社恐 C.看情况"，评论区留下你的答案。',
      },
      {
        id: 'ee-t2-2',
        position: '2:20处',
        type: '反转彩蛋',
        description: '插一句真心话："其实我以前也很在意别人的看法，直到我发现...他们根本没在看你。"',
      },
      {
        id: 'ee-t2-3',
        position: '结尾3:15处',
        type: '福利彩蛋',
        description: '"评论区留言【个性】，我把整理的《00后职场沟通话术手册》送给你，包含20个高频场景的标准应答模板。"',
      },
    ],
    ending: {
      content: '最后想对所有00后说：你不需要改变自己来适应这个世界，你只需要找到和这个世界和平共处的方式。保持你的棱角，但不要带刺；保持你的个性，但不要任性。',
      callToAction: '如果你也是不想随波逐流的00后，点个赞让我知道。关注我，我们一起在职场里做一个"有个性但不讨人厌"的人。评论区聊聊，你在职场中遇到过哪些"要你融入"的道德绑架？',
      duration: '3:10-3:40',
    },
    totalDuration: '约3分40秒',
  },
  't1-3': {
    id: 'script-3',
    topicId: 't1-3',
    title: '老板视角：我为什么喜欢有个性的00后员工',
    hook: {
      type: '身份反差',
      content: '作为一个创业5年的老板，我想告诉你一个秘密：比起那些听话、顺从、从不顶嘴的老员工，我反而更喜欢有个性的00后。别急着反驳，听完你就懂了。',
      duration: '0:00-0:15',
    },
    body: [
      {
        id: 'body-t3-1',
        title: '第一，00后敢说真话，这太珍贵了',
        content: '很多老员工在公司待久了，就学会了"看脸色说话"。开会时老板问"有什么意见吗？"，大家都说"没有"，心里其实有一堆想法。但00后会直接说："老板，我觉得这个方案有问题。"这份坦诚，是创新的源头。',
        duration: '0:15-0:50',
        goldenQuote: '"一群只会说"是"的人，做不出伟大的产品。"',
      },
      {
        id: 'body-t3-2',
        title: '第二，00后学习能力强，接受新事物快',
        content: '很多老员工守着老经验不愿变，你教他用个新工具比登天还难。但00后不一样，他们天生就是互联网原住民，什么新工具、新玩法，他们看一眼就会。这种学习能力，就是公司的未来。',
        duration: '0:50-1:25',
      },
      {
        id: 'body-t3-3',
        title: '第三，00后不玩办公室政治，简单直接',
        content: '我最怕那种表面一团和气，背后勾心斗角的员工。00后不一样，他们不搞小圈子，不打小报告，有矛盾当面说清楚。这种简单的人际关系，能让整个团队的效率提高一倍。',
        duration: '1:25-2:00',
        goldenQuote: '"职场最好的风气，就是有事说事。"',
      },
      {
        id: 'body-t3-4',
        title: '第四，00后重视自我成长，驱动力强',
        content: '很多老员工上班就是混日子，你推一下动一下。但00后会主动问："我还能学些什么？"、"这个项目我可以参与吗？"这种自驱力，是多少钱都买不来的。',
        duration: '2:00-2:35',
      },
      {
        id: 'body-t3-5',
        title: '第五，00后不迷信权威，敢于挑战不合理',
        content: '以前的员工，老板说什么就是什么，错的也照做。但00后会说："老板，这个规定不合理。"一开始我也不舒服，但后来发现，正是这些"挑战"，让公司避免了很多愚蠢的决策。',
        duration: '2:35-3:10',
        goldenQuote: '"好的公司，鼓励员工挑战老板；坏的公司，要求员工服从老板。"',
      },
    ],
    goldenQuotes: [
      {
        id: 'gq-t3-1',
        content: '一群只会说"是"的人，做不出伟大的产品。',
        position: '第一点结尾',
        type: '管理智慧',
      },
      {
        id: 'gq-t3-2',
        content: '职场最好的风气，就是有事说事。',
        position: '第三点结尾',
        type: '企业文化',
      },
      {
        id: 'gq-t3-3',
        content: '好的公司，鼓励员工挑战老板；坏的公司，要求员工服从老板。',
        position: '第五点结尾',
        type: '管理哲学',
      },
      {
        id: 'gq-t3-4',
        content: '这个世界终究是年轻人的，与其害怕他们，不如拥抱他们。',
        position: '结尾升华',
        type: '代际共融',
      },
    ],
    easterEggs: [
      {
        id: 'ee-t3-1',
        position: '开头0:12处',
        type: '互动彩蛋',
        description: '屏幕弹出投票："你是00后吗？A.是 B.不是 C.我是80/90后老板"，评论区站队。',
      },
      {
        id: 'ee-t3-2',
        position: '1:50处',
        type: '反转彩蛋',
        description: '插一个小反转："当然，我也不是喜欢所有00后。那种拿着个性当挡箭牌，连基本工作都做不好的，我也会直接开掉。"',
      },
      {
        id: 'ee-t3-3',
        position: '结尾3:15处',
        type: '福利彩蛋',
        description: '"评论区留言【老板】，我把我做了5年老板总结的《给年轻员工的10条建议》免费分享给你，不管你是老板还是员工，都值得一看。"',
      },
    ],
    ending: {
      content: '最后，我想对所有老板说：不要害怕有个性的00后，他们不是来"整顿"你的，他们是来帮你的公司变得更好的。改变很难，但不改变，就会被淘汰。',
      callToAction: '同意的点个赞，不同意的评论区说说你的看法。关注我，一个敢说真话的创业者，带你了解真实的职场。下期聊聊：老板最喜欢什么样的00后员工？',
      duration: '3:10-3:40',
    },
    totalDuration: '约3分40秒',
  },
};

const randomVariations = {
  titles: [
    ['学会一个都能少走3年弯路', '学会一个都能少走5年弯路', '学会一个都能少走2年弯路'],
    ['领导主动给你加薪', '领导偷偷给你加薪', '领导主动给你升职'],
    ['我只是做对了这5件小事', '我只是做对了这5件事', '我只是做好了这5件小事'],
    ['有的人半年还在试用期？', '有的人一年还在试用期？', '有的人3个月就转正了？'],
    ['后来靠这5个细节扭转了局面', '后来靠这5个细节逆袭', '后来靠这5个细节挽回局面'],
    ['能力再强也白搭', '能力再强也没用', '能力再强也百搭'],
    ['比能力还重要', '比能力更重要', '比能力重要10倍'],
    ['我最看重这5个加分细节', '我最欣赏这5个加分细节', '我最在意这5个加分细节'],
    ['这5件事一定要做到位', '这5件事一定要做好', '这5件事一定要注意'],
    ['比简历还重要的5个细节', '比面试还重要的5个细节', '比学历还重要的5个细节'],
    ['学会秒变职场达人', '学会秒变职场高手', '学会秒变职场明星'],
    ['90%的新人都忽略了', '80%的新人都忽略了', '70%的新人都忽略了'],
  ],
  scriptHook: [
    '你有没有过这种经历', '你有没有遇过这种情况', '你有没有碰到这种事',
  ],
  scriptContent: [
    '很多人以为', '很多人觉得', '很多人认为',
    '其实', '实际上', '事实上',
    '我给你举个例子', '我给你讲个真实案例', '我给你讲个故事',
  ],
  goldenQuotes: [
    ['职场没有白走的路，每一步都算数', '职场没有捷径，但有方法', '职场路漫漫，细节定成败'],
    ['把小事做好，大事自然来', '把细节做好，机会自然来', '把简单的事做好，成功自然来'],
    ['真正的职场高手，都是细节控', '真正的职场赢家，都注重细节', '真正厉害的人，都在细节上下功夫'],
    ['情商不是讨好别人，而是做好自己', '情商不是圆滑，而是让人舒服', '情商不是会说话，而是会做人'],
  ],
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const getRandomItem = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const refreshHotSpots = (): HotSpot[] => {
  return mockHotSpots.map(spot => {
    const heatChange = Math.floor(Math.random() * 200000) - 100000;
    const matchChange = Math.floor(Math.random() * 10) - 5;
    const trends: Array<'rising' | 'stable' | 'falling'> = ['rising', 'stable', 'falling'];
    
    return {
      ...spot,
      heatIndex: Math.max(100000, spot.heatIndex + heatChange),
      matchScore: Math.max(0, Math.min(100, spot.matchScore + matchChange)),
      trend: getRandomItem(trends),
    };
  });
};

export const generateTitles = (topicId: string, regenerate = false): TitleVariant[] => {
  const baseTitles = titleTemplates[topicId] || [];
  
  if (!regenerate) return baseTitles;
  
  return baseTitles.map((title, index) => {
    const variationIndex = index % randomVariations.titles.length;
    const variations = randomVariations.titles[variationIndex];
    let newTitleText = title.title;
    
    const originalPatterns = [
      { pattern: '学会一个都能少走3年弯路', variations: randomVariations.titles[0] },
      { pattern: '领导主动给你加薪', variations: randomVariations.titles[1] },
      { pattern: '我只是做对了这5件小事', variations: randomVariations.titles[2] },
      { pattern: '有的人半年还在试用期？', variations: randomVariations.titles[3] },
      { pattern: '后来靠这5个细节扭转了局面', variations: randomVariations.titles[4] },
      { pattern: '能力再强也白搭', variations: randomVariations.titles[5] },
      { pattern: '比能力还重要', variations: randomVariations.titles[6] },
      { pattern: '我最看重这5个加分细节', variations: randomVariations.titles[7] },
      { pattern: '这5件事一定要做到位', variations: randomVariations.titles[8] },
    ];
    
    originalPatterns.forEach(({ pattern, variations: vars }) => {
      if (newTitleText.includes(pattern)) {
        newTitleText = newTitleText.replace(pattern, getRandomItem(vars));
      }
    });
    
    const scoreVariation = Math.floor(Math.random() * 10) - 5;
    const newScores = {
      curiosity: Math.max(50, Math.min(100, title.scores.curiosity + scoreVariation)),
      emotion: Math.max(50, Math.min(100, title.scores.emotion + scoreVariation)),
      practical: Math.max(50, Math.min(100, title.scores.practical + scoreVariation)),
      uniqueness: Math.max(50, Math.min(100, title.scores.uniqueness + scoreVariation)),
      overall: 0,
    };
    newScores.overall = Math.round((newScores.curiosity + newScores.emotion + newScores.practical + newScores.uniqueness) / 4);
    
    return {
      ...title,
      id: `${title.id}-${Date.now()}-${index}`,
      title: newTitleText,
      scores: newScores,
    };
  });
};

export const generateScript = (topicId: string, regenerate = false): ScriptFramework | null => {
  const baseScript = scriptTemplates[topicId];
  if (!baseScript) return null;
  
  if (!regenerate) return baseScript;
  
  const newHook = {
    ...baseScript.hook,
    content: baseScript.hook.content.replace(
      '你有没有过这种经历',
      getRandomItem(randomVariations.scriptHook)
    ),
  };
  
  const newBody = baseScript.body.map((section, index) => {
    let newContent = section.content;
    randomVariations.scriptContent.forEach(pattern => {
      if (newContent.includes(pattern)) {
        newContent = newContent.replace(pattern, getRandomItem(randomVariations.scriptContent));
      }
    });
    
    return {
      ...section,
      id: `${section.id}-${Date.now()}-${index}`,
      content: newContent,
      goldenQuote: section.goldenQuote ? `"${getRandomItem(randomVariations.goldenQuotes[index % randomVariations.goldenQuotes.length])}"` : undefined,
    };
  });
  
  const newQuotes = baseScript.goldenQuotes.map((quote, index) => ({
    ...quote,
    id: `${quote.id}-${Date.now()}-${index}`,
    content: getRandomItem(randomVariations.goldenQuotes[index % randomVariations.goldenQuotes.length]),
  }));
  
  const newEggs = shuffleArray(baseScript.easterEggs).map((egg, index) => ({
    ...egg,
    id: `${egg.id}-${Date.now()}-${index}`,
  }));
  
  return {
    ...baseScript,
    id: `${baseScript.id}-${Date.now()}`,
    hook: newHook,
    body: newBody,
    goldenQuotes: newQuotes,
    easterEggs: newEggs,
  };
};

export const inspirationDimensions: Record<InspirationDimension, InspirationDimensionData> = {
  scene: {
    id: 'scene',
    name: '创作场景',
    icon: 'MapPin',
    color: 'from-violet-500 to-purple-600',
  },
  emotion: {
    id: 'emotion',
    name: '情感基调',
    icon: 'Heart',
    color: 'from-pink-500 to-rose-600',
  },
  style: {
    id: 'style',
    name: '内容风格',
    icon: 'Palette',
    color: 'from-amber-500 to-orange-600',
  },
  audience: {
    id: 'audience',
    name: '目标受众',
    icon: 'Users',
    color: 'from-emerald-500 to-teal-600',
  },
  format: {
    id: 'format',
    name: '内容形式',
    icon: 'FileText',
    color: 'from-blue-500 to-indigo-600',
  },
};

export const inspirationPool: Record<InspirationDimension, InspirationItem[]> = {
  scene: [
    { id: 's1', text: '深夜加班的办公室', description: '都市年轻人的奋斗日常', tags: ['职场', '奋斗', '都市'] },
    { id: 's2', text: '周末的咖啡馆', description: '悠闲时光中的思考', tags: ['生活', '文艺', '休闲'] },
    { id: 's3', text: '春运回家的火车', description: '中国人的集体记忆', tags: ['亲情', '乡愁', '社会'] },
    { id: 's4', text: '毕业十年的同学会', description: '时光荏苒的感慨', tags: ['青春', '回忆', '成长'] },
    { id: 's5', text: '第一次租房的小窝', description: '北漂沪漂的起点', tags: ['漂泊', '独立', '生活'] },
    { id: 's6', text: '凌晨三点的医院走廊', description: '生命与健康的思考', tags: ['健康', '亲情', '感悟'] },
    { id: 's7', text: '双十一的快递驿站', description: '消费时代的缩影', tags: ['消费', '社会', '热点'] },
    { id: 's8', text: '高考后的校园', description: '青春的告别与开始', tags: ['青春', '教育', '成长'] },
    { id: 's9', text: '裁员后的公司会议室', description: '职场人的焦虑与重生', tags: ['职场', '焦虑', '转型'] },
    { id: 's10', text: '相亲角的父母们', description: '两代人的婚恋观念碰撞', tags: ['婚恋', '家庭', '社会'] },
    { id: 's11', text: '直播间的主播日常', description: '新媒体时代的职业', tags: ['新媒体', '职业', '互联网'] },
    { id: 's12', text: '城中村的出租屋', description: '大城市的追梦人', tags: ['奋斗', '城市', '梦想'] },
    { id: 's13', text: '养老院的春节', description: '老龄化社会的缩影', tags: ['养老', '亲情', '社会'] },
    { id: 's14', text: '创业公司的茶水间', description: '梦想与现实的碰撞', tags: ['创业', '梦想', '职场'] },
    { id: 's15', text: '地铁站的早高峰', description: '都市人的日常奔波', tags: ['都市', '生活', '通勤'] },
  ],
  emotion: [
    { id: 'e1', text: '温暖治愈', description: '让人感到人间值得', tags: ['温暖', '治愈', '正能量'] },
    { id: 'e2', text: '扎心共鸣', description: '一句话戳中泪点', tags: ['共鸣', '情感', '真实'] },
    { id: 'e3', text: '热血励志', description: '看完想立刻去奋斗', tags: ['励志', '热血', '奋斗'] },
    { id: 'e4', text: '幽默反讽', description: '笑着笑着就沉默了', tags: ['幽默', '反讽', '搞笑'] },
    { id: 'e5', text: '深度焦虑', description: '当代人的集体困境', tags: ['焦虑', '深度', '思考'] },
    { id: 'e6', text: ' nostalgic 怀旧', description: '8090后的集体回忆', tags: ['怀旧', '青春', '回忆'] },
    { id: 'e7', text: '爽感逆袭', description: '小人物的高光时刻', tags: ['逆袭', '爽文', '励志'] },
    { id: 'e8', text: '细思极恐', description: '生活中的恐怖真相', tags: ['深度', '思考', '社会'] },
    { id: 'e9', text: '感动泪目', description: '看哭了无数人', tags: ['感动', '泪目', '亲情'] },
    { id: 'e10', text: '愤怒不平', description: '不吐不快的社会现象', tags: ['愤怒', '社会', '批判'] },
    { id: 'e11', text: '轻松愉悦', description: '看完心情变好', tags: ['轻松', '愉悦', '快乐'] },
    { id: 'e12', text: '迷茫困惑', description: '年轻人的十字路口', tags: ['迷茫', '成长', '选择'] },
    { id: 'e13', text: '骄傲自豪', description: '作为中国人的底气', tags: ['爱国', '自豪', '正能量'] },
    { id: 'e14', text: '心酸无奈', description: '成年人的崩溃瞬间', tags: ['心酸', '无奈', '成人世界'] },
    { id: 'e15', text: '释然放下', description: '与自己和解的智慧', tags: ['释然', '放下', '智慧'] },
  ],
  style: [
    { id: 'st1', text: '干货科普', description: '实用知识分享', tags: ['干货', '科普', '实用'] },
    { id: 'st2', text: '故事叙述', description: '用故事打动人心', tags: ['故事', '叙事', '情感'] },
    { id: 'st3', text: '观点评论', description: '鲜明的个人观点', tags: ['观点', '评论', '犀利'] },
    { id: 'st4', text: '对比反差', description: '没有对比就没有伤害', tags: ['对比', '反差', '冲击'] },
    { id: 'st5', text: '数据说话', description: '用数据揭示真相', tags: ['数据', '深度', '专业'] },
    { id: 'st6', text: '个人经历', description: '第一人称真实分享', tags: ['真实', '经历', '个人'] },
    { id: 'st7', text: '盘点总结', description: '一网打尽式盘点', tags: ['盘点', '总结', '清单'] },
    { id: 'st8', text: '深度解析', description: '透过现象看本质', tags: ['深度', '解析', '思考'] },
    { id: 'st9', text: '干货教程', description: '手把手教学', tags: ['教程', '实用', '技能'] },
    { id: 'st10', text: '话题讨论', description: '引发读者参与', tags: ['讨论', '互动', '话题'] },
    { id: 'st11', text: '金句集锦', description: '每一句都想收藏', tags: ['金句', '文案', '收藏'] },
    { id: 'st12', text: '漫画图解', description: '一图胜千言', tags: ['漫画', '图解', '视觉'] },
    { id: 'st13', text: '访谈对话', description: '听听别人怎么说', tags: ['访谈', '对话', '人物'] },
    { id: 'st14', text: '时间线梳理', description: '来龙去脉一目了然', tags: ['时间线', '梳理', '逻辑'] },
    { id: 'st15', text: '避坑指南', description: '前人踩过的坑', tags: ['避坑', '指南', '经验'] },
  ],
  audience: [
    { id: 'a1', text: '刚毕业的00后', description: '职场新新人', tags: ['00后', '职场新人', '毕业生'] },
    { id: 'a2', text: '30+已婚女性', description: '家庭事业双重压力', tags: ['30+', '女性', '婚姻'] },
    { id: 'a3', text: '一线城市打拼者', description: '北漂沪漂深漂', tags: ['北漂', '沪漂', '一线城市'] },
    { id: 'a4', text: '焦虑的父母', description: '育儿教育的烦恼', tags: ['父母', '育儿', '教育'] },
    { id: 'a5', text: '创业者/自由职业', description: '不安分的灵魂', tags: ['创业', '自由职业', '梦想'] },
    { id: 'a6', text: '考研/考公大军', description: '千军万马过独木桥', tags: ['考研', '考公', '考试'] },
    { id: 'a7', text: '互联网从业者', description: '996的主力军', tags: ['互联网', '程序员', '996'] },
    { id: 'a8', text: '单身青年', description: '一人吃饱全家不饿', tags: ['单身', '青年', '独居'] },
    { id: 'a9', text: '二胎家庭', description: '甜蜜的负担', tags: ['二胎', '家庭', '育儿'] },
    { id: 'a10', text: '退休银发族', description: '新的人生阶段', tags: ['退休', '银发', '老年'] },
    { id: 'a11', text: '斜杠青年', description: '多重身份的探索者', tags: ['斜杠', '青年', '副业'] },
    { id: 'a12', text: '全职妈妈', description: '最辛苦的职业', tags: ['全职妈妈', '家庭', '育儿'] },
    { id: 'a13', text: 'Z世代大学生', description: '互联网原住民', tags: ['Z世代', '大学生', '年轻'] },
    { id: 'a14', text: '中年职场人', description: '上有老下有小', tags: ['中年', '职场', '压力'] },
    { id: 'a15', text: '自媒体创作者', description: '内容生产主力军', tags: ['自媒体', '创作', '内容'] },
  ],
  format: [
    { id: 'f1', text: '短视频脚本', description: '15-60秒黄金时长', tags: ['短视频', '抖音', '快手'] },
    { id: 'f2', text: '小红书笔记', description: '种草图文首选', tags: ['小红书', '图文', '种草'] },
    { id: 'f3', text: '公众号长文', description: '深度内容平台', tags: ['公众号', '长文', '深度'] },
    { id: 'f4', text: '微博热搜文案', description: '140字的艺术', tags: ['微博', '热搜', '话题'] },
    { id: 'f5', text: '知乎问答', description: '专业知识分享', tags: ['知乎', '问答', '专业'] },
    { id: 'f6', text: 'B站视频文案', description: '年轻人的文化社区', tags: ['B站', '视频', '二次元'] },
    { id: 'f7', text: '朋友圈文案', description: '人设打造神器', tags: ['朋友圈', '文案', '社交'] },
    { id: 'f8', text: '播客节目', description: '耳朵的盛宴', tags: ['播客', '音频', '陪伴'] },
    { id: 'f9', text: '直播脚本', description: '实时互动内容', tags: ['直播', '互动', '带货'] },
    { id: 'f10', text: '条漫脚本', description: '读图时代首选', tags: ['条漫', '漫画', '视觉'] },
    { id: 'f11', text: '系列连载', description: '追剧式内容', tags: ['连载', '系列', '故事'] },
    { id: 'f12', text: '干货清单', description: '收藏即正义', tags: ['清单', '干货', '收藏'] },
    { id: 'f13', text: '人物专访', description: '讲述别人的故事', tags: ['人物', '专访', '故事'] },
    { id: 'f14', text: '热点评论', description: '追热点必备', tags: ['热点', '评论', '时事'] },
    { id: 'f15', text: '教程攻略', description: '实用价值拉满', tags: ['教程', '攻略', '技能'] },
  ],
};

export const getRandomInspirationItem = (dimension: InspirationDimension): InspirationItem => {
  const items = inspirationPool[dimension];
  return items[Math.floor(Math.random() * items.length)];
};

export const contentTypeConfigs: ContentTypeConfig[] = [
  { type: 'article', label: '图文', color: 'text-violet-400', bgColor: 'bg-violet-500/20', borderColor: 'border-violet-500/30' },
  { type: 'video', label: '长视频', color: 'text-emerald-400', bgColor: 'bg-emerald-500/20', borderColor: 'border-emerald-500/30' },
  { type: 'shortVideo', label: '短视频', color: 'text-rose-400', bgColor: 'bg-rose-500/20', borderColor: 'border-rose-500/30' },
  { type: 'live', label: '直播', color: 'text-amber-400', bgColor: 'bg-amber-500/20', borderColor: 'border-amber-500/30' },
  { type: 'podcast', label: '播客', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20', borderColor: 'border-cyan-500/30' },
  { type: 'carousel', label: '图文集', color: 'text-pink-400', bgColor: 'bg-pink-500/20', borderColor: 'border-pink-500/30' },
];

const getDateString = (daysFromNow: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split('T')[0];
};

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'cal-1',
    title: '00后职场新人指南',
    description: '分享00后如何在职场中保持个性同时获得认可',
    contentType: 'article',
    platform: '公众号',
    scheduledDate: getDateString(-2),
    scheduledTime: '09:00',
    reminderEnabled: true,
    reminderMinutesBefore: 60,
    status: 'published',
    createdAt: '2024-01-10',
  },
  {
    id: 'cal-2',
    title: '新人入职5个加分细节',
    description: '短视频版本，适合抖音和视频号',
    contentType: 'shortVideo',
    platform: '抖音',
    scheduledDate: getDateString(-1),
    scheduledTime: '18:00',
    reminderEnabled: true,
    reminderMinutesBefore: 30,
    status: 'published',
    createdAt: '2024-01-12',
  },
  {
    id: 'cal-3',
    title: '老板视角看00后员工',
    description: '深度长文，探讨代际管理差异',
    contentType: 'article',
    platform: '知乎',
    scheduledDate: getDateString(0),
    scheduledTime: '10:00',
    reminderEnabled: true,
    reminderMinutesBefore: 60,
    status: 'scheduled',
    createdAt: '2024-01-13',
  },
  {
    id: 'cal-4',
    title: '职场避坑指南直播',
    description: '和粉丝互动答疑',
    contentType: 'live',
    platform: '视频号',
    scheduledDate: getDateString(1),
    scheduledTime: '20:00',
    reminderEnabled: true,
    reminderMinutesBefore: 120,
    status: 'scheduled',
    createdAt: '2024-01-14',
  },
  {
    id: 'cal-5',
    title: '35岁职场危机分析',
    description: '数据驱动的深度分析',
    contentType: 'video',
    platform: 'B站',
    scheduledDate: getDateString(3),
    scheduledTime: '19:30',
    reminderEnabled: false,
    status: 'scheduled',
    createdAt: '2024-01-15',
  },
  {
    id: 'cal-6',
    title: '年轻人消费观念变化',
    description: '小红书图文笔记',
    contentType: 'carousel',
    platform: '小红书',
    scheduledDate: getDateString(5),
    scheduledTime: '12:00',
    reminderEnabled: true,
    reminderMinutesBefore: 30,
    status: 'draft',
    createdAt: '2024-01-15',
  },
  {
    id: 'cal-7',
    title: '副业赚钱经验分享',
    description: '播客节目',
    contentType: 'podcast',
    platform: '小宇宙',
    scheduledDate: getDateString(7),
    scheduledTime: '08:00',
    reminderEnabled: true,
    reminderMinutesBefore: 60,
    status: 'draft',
    createdAt: '2024-01-15',
  },
  {
    id: 'cal-8',
    title: '春节特别企划：年终总结',
    description: '短视频合集',
    contentType: 'shortVideo',
    platform: '抖音',
    scheduledDate: getDateString(10),
    scheduledTime: '10:00',
    reminderEnabled: false,
    status: 'draft',
    createdAt: '2024-01-15',
  },
];

export const generateCalendarEvent = (data: Partial<CalendarEvent>): CalendarEvent => {
  return {
    id: `cal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: data.title || '新内容',
    description: data.description || '',
    contentType: data.contentType || 'article',
    platform: data.platform || '公众号',
    scheduledDate: data.scheduledDate || new Date().toISOString().split('T')[0],
    scheduledTime: data.scheduledTime || '09:00',
    reminderEnabled: data.reminderEnabled ?? true,
    reminderMinutesBefore: data.reminderMinutesBefore || 30,
    topicId: data.topicId,
    status: data.status || 'draft',
    createdAt: new Date().toISOString(),
  };
};

export const defaultChecklistItems: Omit<ChecklistItem, 'id' | 'createdAt'>[] = [
  {
    title: '标题符合平台风格',
    description: '标题长度、关键词、表达方式适配目标平台',
    completed: false,
    isCustom: false,
    category: 'content',
  },
  {
    title: '开头3秒抓住注意力',
    description: '开头引入部分是否有足够的吸引力',
    completed: false,
    isCustom: false,
    category: 'content',
  },
  {
    title: '正文逻辑清晰',
    description: '分论点之间有逻辑关联，层层递进',
    completed: false,
    isCustom: false,
    category: 'content',
  },
  {
    title: '金句已植入',
    description: '是否有让人印象深刻的金句',
    completed: false,
    isCustom: false,
    category: 'content',
  },
  {
    title: '结尾有互动引导',
    description: '结尾是否引导用户评论、点赞、关注',
    completed: false,
    isCustom: false,
    category: 'content',
  },
  {
    title: '字数/时长符合要求',
    description: '内容长度符合平台推荐范围',
    completed: false,
    isCustom: false,
    category: 'format',
  },
  {
    title: '分段清晰易读',
    description: '段落长度适中，有足够的呼吸感',
    completed: false,
    isCustom: false,
    category: 'format',
  },
  {
    title: '错别字检查',
    description: '通读全文，检查错别字和语法错误',
    completed: false,
    isCustom: false,
    category: 'format',
  },
  {
    title: '敏感词检测',
    description: '检查是否有平台违禁内容',
    completed: false,
    isCustom: false,
    category: 'platform',
  },
  {
    title: '话题标签设置',
    description: '已添加合适的话题标签/hashtag',
    completed: false,
    isCustom: false,
    category: 'platform',
  },
  {
    title: '封面图准备',
    description: '已准备符合平台规格的封面图',
    completed: false,
    isCustom: false,
    category: 'platform',
  },
];

export const platformSpecificChecklist: Record<string, Omit<ChecklistItem, 'id' | 'createdAt'>[]> = {
  '抖音': [
    { title: '视频画面比例9:16', completed: false, isCustom: false, category: 'format', platform: '抖音' },
    { title: '字幕清晰可见', completed: false, isCustom: false, category: 'format', platform: '抖音' },
    { title: 'BGM版权合规', completed: false, isCustom: false, category: 'platform', platform: '抖音' },
  ],
  '小红书': [
    { title: '首图吸睛', completed: false, isCustom: false, category: 'format', platform: '小红书' },
    { title: 'emoji使用恰当', completed: false, isCustom: false, category: 'format', platform: '小红书' },
    { title: '标签数量5-10个', completed: false, isCustom: false, category: 'platform', platform: '小红书' },
  ],
  'B站': [
    { title: '视频标题有B站风格', completed: false, isCustom: false, category: 'content', platform: 'B站' },
    { title: '分P设置合理', completed: false, isCustom: false, category: 'format', platform: 'B站' },
    { title: '简介和关联视频已设置', completed: false, isCustom: false, category: 'platform', platform: 'B站' },
  ],
  '公众号': [
    { title: '排版美观', completed: false, isCustom: false, category: 'format', platform: '公众号' },
    { title: '封面图尺寸2.35:1', completed: false, isCustom: false, category: 'format', platform: '公众号' },
    { title: '摘要已填写', completed: false, isCustom: false, category: 'platform', platform: '公众号' },
  ],
  '微博': [
    { title: '字数控制在140字内', completed: false, isCustom: false, category: 'format', platform: '微博' },
    { title: '带话题#', completed: false, isCustom: false, category: 'platform', platform: '微博' },
    { title: '@相关账号', completed: false, isCustom: false, category: 'platform', platform: '微博' },
  ],
  '知乎': [
    { title: '回答结构清晰', completed: false, isCustom: false, category: 'content', platform: '知乎' },
    { title: '开头说明身份/立场', completed: false, isCustom: false, category: 'content', platform: '知乎' },
    { title: '引用来源标注', completed: false, isCustom: false, category: 'format', platform: '知乎' },
  ],
  '视频号': [
    { title: '视频时长1分钟内最佳', completed: false, isCustom: false, category: 'format', platform: '视频号' },
    { title: '适配朋友圈分享', completed: false, isCustom: false, category: 'platform', platform: '视频号' },
  ],
  '小宇宙': [
    { title: '音频质量清晰', completed: false, isCustom: false, category: 'format', platform: '小宇宙' },
    { title: '节目简介吸引人', completed: false, isCustom: false, category: 'content', platform: '小宇宙' },
    { title: '时间轴标签已添加', completed: false, isCustom: false, category: 'platform', platform: '小宇宙' },
  ],
  '快手': [
    { title: '视频风格接地气', completed: false, isCustom: false, category: 'content', platform: '快手' },
    { title: '封面文字醒目', completed: false, isCustom: false, category: 'format', platform: '快手' },
  ],
};

export const generateChecklistItem = (
  data: Partial<ChecklistItem>
): ChecklistItem => {
  return {
    id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: data.title || '新检查项',
    description: data.description,
    completed: data.completed ?? false,
    isCustom: data.isCustom ?? true,
    category: data.category || 'other',
    platform: data.platform,
    scriptId: data.scriptId,
    createdAt: new Date().toISOString(),
    completedAt: data.completedAt,
  };
};

export const generateChecklist = (
  data: Partial<ContentChecklist> & { scriptId?: string; platform?: string }
): ContentChecklist => {
  const now = new Date().toISOString();
  const items: ChecklistItem[] = [];

  defaultChecklistItems.forEach(item => {
    items.push(generateChecklistItem({
      ...item,
      scriptId: data.scriptId,
      platform: data.platform,
    }));
  });

  if (data.platform && platformSpecificChecklist[data.platform]) {
    platformSpecificChecklist[data.platform].forEach(item => {
      items.push(generateChecklistItem({
        ...item,
        scriptId: data.scriptId,
      }));
    });
  }

  return {
    id: `checklist-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    scriptId: data.scriptId,
    calendarEventId: data.calendarEventId,
    platform: data.platform,
    title: data.title || '内容完稿检查清单',
    items,
    createdAt: now,
    updatedAt: now,
  };
};

export const matchDimensions: MatchDimension[] = [
  {
    id: 'domain',
    name: '内容领域',
    description: '热点所属领域与你创作领域的匹配程度',
    icon: 'Target',
    color: '#8B5CF6',
  },
  {
    id: 'audience',
    name: '目标受众',
    description: '热点受众群体与你目标受众的重合程度',
    icon: 'Users',
    color: '#10B981',
  },
  {
    id: 'style',
    name: '内容风格',
    description: '热点适合的内容风格与你创作风格的契合度',
    icon: 'Palette',
    color: '#F59E0B',
  },
  {
    id: 'platform',
    name: '发布平台',
    description: '热点来源平台与你发布平台的匹配度',
    icon: 'Globe',
    color: '#06B6D4',
  },
];

export const defaultMatchWeights: MatchWeights = {
  domain: 35,
  audience: 30,
  style: 20,
  platform: 15,
};

const platformNameMap: Record<string, string> = {
  douyin: '抖音',
  weibo: '微博',
  zhihu: '知乎',
  xiaohongshu: '小红书',
  bilibili: 'B站',
};

const calculateSingleScore = (hotspotValue: string, userValues: string[]): number => {
  if (userValues.length === 0) return 50;
  
  const exactMatch = userValues.some(v => 
    hotspotValue.includes(v) || v.includes(hotspotValue));
  if (exactMatch) return 95;
  
  const partialMatch = userValues.some(v => {
    const hotspotKeywords = hotspotValue.split(/[，,\s]+/);
    return hotspotKeywords.some(kw => v.includes(kw) || kw.includes(v));
  });
  if (partialMatch) return 70;
  
  return Math.floor(Math.random() * 30) + 30;
};

export const calculateMatchScoreBreakdown = (
  hotspot: HotSpot,
  userProfile: UserProfile,
  weights: MatchWeights
): MatchScoreBreakdown => {
  const platformName = platformNameMap[hotspot.platform] || hotspot.platform;
  
  const domainScore = calculateSingleScore(hotspot.category, userProfile.domain);
  const audienceScore = calculateSingleScore(hotspot.category, userProfile.audience);
  const styleScore = calculateSingleScore(hotspot.category, userProfile.style);
  const platformScore = userProfile.platform.includes(platformName) ? 90 : 50;

  const totalWeight = weights.domain + weights.audience + weights.style + weights.platform;
  const overall = Math.round(
    (domainScore * weights.domain +
     audienceScore * weights.audience +
     styleScore * weights.style +
     platformScore * weights.platform) / totalWeight
  );

  return {
    domain: domainScore,
    audience: audienceScore,
    style: styleScore,
    platform: platformScore,
    overall,
  };
};

export const calculateHotSpotMatchScores = (
  hotspots: HotSpot[],
  userProfile: UserProfile,
  weights: MatchWeights
): HotSpot[] => {
  return hotspots.map(hotspot => {
    const breakdown = calculateMatchScoreBreakdown(hotspot, userProfile, weights);
    return {
      ...hotspot,
      matchScore: breakdown.overall,
    };
  });
};
