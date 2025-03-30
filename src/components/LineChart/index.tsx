import { FunctionComponent } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { DayData } from '../../types';

type Props = {
  data: DayData[];
  color: string;
  name?: string;
};

export const LineChart: FunctionComponent<Props> = ({ data, color, name = 'Value' }) => {
  const chartData = data.map(item => ({
    ...item,
    [name.toLowerCase()]: item.value
  }));

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id={`colorGradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8' }}
          />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey={name.toLowerCase()}
            name={name}
            stroke={color}
            fillOpacity={1}
            fill={`url(#colorGradient-${color})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}; 