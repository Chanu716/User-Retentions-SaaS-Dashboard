import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUsers, 
  FiUserCheck, 
  FiUserX, 
  FiTrendingUp, 
  FiDollarSign,
  FiActivity,
  FiArrowRight
} from 'react-icons/fi';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { userAPI } from '../services/api';
import Header from '../components/Header';

const StatCard = ({ icon: Icon, title, value, change, color, bgColor }) => (
  <div className="glass-card p-6 rounded-xl glass-hover cursor-pointer animate-fade-in">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 ${bgColor} rounded-lg`}>
        <Icon size={24} className={color} />
      </div>
      {change && (
        <span className={`text-sm font-semibold ${change > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      )}
    </div>
    <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
    <p className="text-3xl font-bold text-white">{value}</p>
  </div>
);

const UserRow = ({ user }) => {
  const getStatusColor = (status) => {
    return status === 'Active' ? 'text-green-400' : 'text-red-400';
  };

  const getRiskColor = (risk) => {
    if (risk === 'Low') return 'text-green-400 bg-green-400/10';
    if (risk === 'Medium') return 'text-yellow-400 bg-yellow-400/10';
    return 'text-red-400 bg-red-400/10';
  };

  return (
    <tr className="border-b border-gray-800 hover:bg-glass-white transition-all">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-black font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-white">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`font-semibold ${getStatusColor(user.status)}`}>
          {user.status}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-300">{user.subscriptionPlan}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-gold h-2 rounded-full transition-all"
              style={{ width: `${user.retentionScore}%` }}
            />
          </div>
          <span className="text-sm text-gray-300">{user.retentionScore}%</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(user.churnRisk)}`}>
          {user.churnRisk}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-300">${user.lifetimeValue}</td>
    </tr>
  );
};

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [usersData, analyticsData] = await Promise.all([
        userAPI.getAllUsers(),
        userAPI.getAnalytics()
      ]);
      setAllUsers(usersData);
      setUsers(usersData.slice(0, 5)); // Show only 5 recent users
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data
  const getMonthlyData = () => {
    return [
      { month: 'Jan', users: 8, revenue: 28500, retention: 75 },
      { month: 'Feb', users: 9, revenue: 32100, retention: 78 },
      { month: 'Mar', users: 10, revenue: 35800, retention: 80 },
      { month: 'Apr', users: 10, revenue: 38200, retention: 79 },
      { month: 'May', users: 11, revenue: 40100, retention: 82 },
      { month: 'Jun', users: 12, revenue: 42720, retention: analytics?.averageRetentionScore || 79.5 }
    ];
  };

  const getPlanDistribution = () => {
    const distribution = allUsers.reduce((acc, user) => {
      acc[user.subscriptionPlan] = (acc[user.subscriptionPlan] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(distribution).map(([name, value]) => ({ name, value }));
  };

  const getChurnRiskData = () => {
    const distribution = allUsers.reduce((acc, user) => {
      acc[user.churnRisk] = (acc[user.churnRisk] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(distribution).map(([name, value]) => ({ name, value }));
  };

  const getEngagementData = () => {
    if (!allUsers || allUsers.length === 0) {
      return [];
    }
    return allUsers
      .map(user => ({
        name: user.name.split(' ')[0] || user.name,
        sessions: user.totalSessions || 0,
        retention: user.retentionScore || 0
      }))
      .sort((a, b) => b.retention - a.retention)
      .slice(0, 8);
  };

  const COLORS = {
    Basic: '#3B82F6',
    Premium: '#FFD700',
    Enterprise: '#A855F7',
    Low: '#10B981',
    Medium: '#FBBF24',
    High: '#EF4444'
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent-yellow"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        title="Dashboard" 
        subtitle="Welcome back! Here's your user retention overview."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={FiUsers}
          title="Total Users"
          value={analytics?.totalUsers || 0}
          change={12.5}
          color="text-accent-yellow"
          bgColor="bg-accent-yellow/10"
        />
        <StatCard
          icon={FiUserCheck}
          title="Active Users"
          value={analytics?.activeUsers || 0}
          change={8.2}
          color="text-green-400"
          bgColor="bg-green-400/10"
        />
        <StatCard
          icon={FiUserX}
          title="Inactive Users"
          value={analytics?.inactiveUsers || 0}
          change={-3.1}
          color="text-red-400"
          bgColor="bg-red-400/10"
        />
        <StatCard
          icon={FiDollarSign}
          title="Total Revenue"
          value={`$${analytics?.totalRevenue?.toLocaleString() || 0}`}
          change={15.8}
          color="text-accent-orange"
          bgColor="bg-accent-orange/10"
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <FiTrendingUp size={24} className="text-blue-400" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Avg. Retention Score</h3>
          <p className="text-3xl font-bold text-white">{analytics?.averageRetentionScore || 0}%</p>
          <p className="text-sm text-green-400 mt-2">↑ 5.2% from last month</p>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <FiActivity size={24} className="text-purple-400" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Churn Rate</h3>
          <p className="text-3xl font-bold text-white">{analytics?.churnRate || 0}%</p>
          <p className="text-sm text-red-400 mt-2">↓ 2.1% from last month</p>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-accent-yellow/10 rounded-lg">
              <FiDollarSign size={24} className="text-accent-yellow" />
            </div>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Avg. Lifetime Value</h3>
          <p className="text-3xl font-bold text-white">${analytics?.averageLifetimeValue || 0}</p>
          <p className="text-sm text-green-400 mt-2">↑ 8.7% from last month</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Revenue Trend */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6">Revenue Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={getMonthlyData()}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FF8C00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #FFD700',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Area type="monotone" dataKey="revenue" stroke="#FFD700" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Trend */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6">User Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={getMonthlyData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #10B981',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={3} name="Total Users" />
              <Line type="monotone" dataKey="retention" stroke="#FFD700" strokeWidth={2} name="Retention %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subscription Plan Distribution */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6">Subscription Plans</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={getPlanDistribution()}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {getPlanDistribution().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #FFD700',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Churn Risk Distribution */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6">Churn Risk Analysis</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={getChurnRiskData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #FFD700',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="value" fill="#FFD700" radius={[8, 8, 0, 0]}>
                {getChurnRiskData().map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performers Chart */}
      <div className="glass-card p-6 rounded-xl mb-8">
        <h3 className="text-xl font-bold text-white mb-6">User Engagement Overview</h3>
        {getEngagementData().length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getEngagementData()} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={80} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #FFD700',
                  borderRadius: '8px',
                  color: '#fff'
                }} 
              />
              <Legend />
              <Bar dataKey="sessions" fill="#FF8C00" name="Total Sessions" radius={[0, 8, 8, 0]} />
              <Bar dataKey="retention" fill="#FFD700" name="Retention Score" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-gray-400">
            <p>No user data available for engagement overview</p>
          </div>
        )}
      </div>

      {/* Recent Users Table */}
      <div className="glass-card rounded-xl overflow-hidden animate-slide-up">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Recent Users</h3>
            <p className="text-sm text-gray-400 mt-1">Latest user activity and metrics</p>
          </div>
          <Link 
            to="/users"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-gold text-black font-semibold rounded-lg hover:opacity-90 transition-all"
          >
            View All <FiArrowRight />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-glass-dark">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">User</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Plan</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Retention</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">Churn Risk</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">LTV</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <UserRow key={user.id} user={user} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
