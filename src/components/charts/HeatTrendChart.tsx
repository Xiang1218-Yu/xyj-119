import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface HeatTrendChartProps {
  data: Array<{
    time: string;
    value: number;
  }>;
  height?: number;
}

export default function HeatTrendChart({ data, height = 60 }: HeatTrendChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="heatGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#F1F5F9',
              fontSize: '12px',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8B5CF6"
            strokeWidth={2}
            fill="url(#heatGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export { LineChart, Line, XAxis, YAxis };
