import { StatsCard } from "./StatsCard";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const AnalyticsView = () => {
  const engagementData = [
    { name: 'Mon', value: 24 },
    { name: 'Tue', value: 35 },
    { name: 'Wed', value: 42 },
    { name: 'Thu', value: 38 },
    { name: 'Fri', value: 45 },
    { name: 'Sat', value: 50 },
    { name: 'Sun', value: 40 },
  ];

  const contentTypeData = [
    { name: 'Photos', value: 45 },
    { name: 'Reels', value: 30 },
    { name: 'Stories', value: 25 },
  ];

  const COLORS = ['#833AB4', '#C13584', '#E1306C'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatsCard
          title="Total Liked Posts"
          value="847"
          description="Posts you've liked across Instagram"
        />
        <StatsCard
          title="Monthly Usage"
          value="2.3 hrs"
          description="Average daily time spent"
        />
        <StatsCard
          title="Comments Made"
          value="126"
          description="Total comments on other posts"
        />
        <StatsCard
          title="Saved Posts"
          value="234"
          description="Posts you've bookmarked"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="backdrop-blur-md bg-black/40 rounded-2xl p-6 h-[300px]">
          <h3 className="text-xl font-semibold mb-4 text-white">Weekly Engagement</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="value" fill="url(#colorGradient)" />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#833AB4" />
                  <stop offset="100%" stopColor="#E1306C" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="backdrop-blur-md bg-black/40 rounded-2xl p-6 h-[300px]">
          <h3 className="text-xl font-semibold mb-4 text-white">Content Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={contentTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {contentTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};