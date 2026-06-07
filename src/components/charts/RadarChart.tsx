import { motion } from 'framer-motion';
import {
  Radar,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface RadarChartProps {
  data: Array<{
    subject: string;
    score: number;
    fullMark: number;
  }>;
  size?: number;
  color?: string;
}

export default function RadarChart({ data, size = 150, color = '#8B5CF6' }: RadarChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: size, height: size }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadar cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#374151" strokeWidth={0.5} />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#9CA3AF', fontSize: 9 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={false}
            axisLine={false}
          />
          <Radar
            name="评分"
            dataKey="score"
            stroke={color}
            fill={color}
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RechartsRadar>
      </ResponsiveContainer>
    </motion.div>
  );
}
