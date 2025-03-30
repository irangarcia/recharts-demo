import { FunctionComponent } from 'react';
import {
  BarChart,
  Bar,
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
  data2: DayData[];
  color: string;
  color2: string;
  primaryKey: string;
  secondaryKey: string;
  primaryName: string;
  secondaryName: string;
};

export const StackedBarChart: FunctionComponent<Props> = ({ 
  data, 
  data2,
  color,
  color2,
  primaryKey,
  secondaryKey,
  primaryName,
  secondaryName
}) => {
  const combinedData = data.map((item, index) => ({
    ...item,
    [primaryKey]: item.value,
    [secondaryKey]: data2[index]?.value || 0
  }));

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={combinedData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
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
          <Bar dataKey={primaryKey} name={primaryName} fill={color} />
          <Bar dataKey={secondaryKey} name={secondaryName} fill={color2} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}; 