import React, { useEffect, useState } from 'react';
import { 
  FiTrendingUp, 
  FiTrendingDown, 
  FiUsers, 
  FiActivity,
  FiDollarSign,
  FiBarChart2
} from 'react-icons/fi';
import { userAPI } from '../services/api';
import Header from '../components/Header';

const Analytics = () => {
  const [users, setUsers] = useState([]);
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
      setUsers(usersData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlanDistribution = () => {
    const distribution = users.reduce((acc, user) => {
      acc[user.subscriptionPlan] = (acc[user.subscriptionPlan] || 0) + 1;
      return acc;
    }, {});
    return distribution;
  };

  const getChurnRiskDistribution = () => {
    const distribution = users.reduce((acc, user) => {
      acc[user.churnRisk] = (acc[user.churnRisk] || 0) + 1;
      return acc;
    }, {});
    return distribution;
  };

  const getEngagementDistribution = () => {
    const distribution = users.reduce((acc, user) => {
      acc[user.engagement] = (acc[user.engagement] || 0) + 1;
      return acc;
    }, {});
    return distribution;
  };

  const getTopUsers = () => {
    return [...users]
      .sort((a, b) => b.retentionScore - a.retentionScore)
      .slice(0, 5);
  };

  const getAtRiskUsers = () => {
    return users.filter(user => user.churnRisk === 'High' || user.status === 'Inactive');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent-yellow"></div>
      </div>
    );
  }

  const planDistribution = getPlanDistribution();
  const churnRiskDistribution = getChurnRiskDistribution();
  const engagementDistribution = getEngagementDistribution();
  const topUsers = getTopUsers();
  const atRiskUsers = getAtRiskUsers();

  return (
    <div className="min-h-screen">
      <Header 
        title="Analytics" 
        subtitle="Comprehensive user retention insights and metrics"
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-accent-yellow/10 rounded-lg">
              <FiUsers size={24} className="text-accent-yellow" />
            </div>
            <FiTrendingUp className="text-green-400" size={20} />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Total Users</h3>
          <p className="text-3xl font-bold text-white">{users.length}</p>
          <p className="text-sm text-green-400 mt-2">+12.5% vs last month</p>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-400/10 rounded-lg">
              <FiActivity size={24} className="text-green-400" />
            </div>
            <FiTrendingUp className="text-green-400" size={20} />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Avg. Retention</h3>
          <p className="text-3xl font-bold text-white">{analytics?.averageRetentionScore}%</p>
          <p className="text-sm text-green-400 mt-2">+5.2% vs last month</p>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-400/10 rounded-lg">
              <FiTrendingDown size={24} className="text-red-400" />
            </div>
            <FiTrendingDown className="text-red-400" size={20} />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Churn Rate</h3>
          <p className="text-3xl font-bold text-white">{analytics?.churnRate}%</p>
          <p className="text-sm text-green-400 mt-2">-2.1% vs last month</p>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-accent-orange/10 rounded-lg">
              <FiDollarSign size={24} className="text-accent-orange" />
            </div>
            <FiTrendingUp className="text-green-400" size={20} />
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-white">${analytics?.totalRevenue?.toLocaleString()}</p>
          <p className="text-sm text-green-400 mt-2">+15.8% vs last month</p>
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Subscription Plan Distribution */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FiBarChart2 className="text-accent-yellow" />
            Subscription Plans
          </h3>
          <div className="space-y-4">
            {Object.entries(planDistribution).map(([plan, count]) => {
              const percentage = ((count / users.length) * 100).toFixed(1);
              const colors = {
                Basic: 'bg-blue-500',
                Premium: 'bg-accent-yellow',
                Enterprise: 'bg-purple-500'
              };
              return (
                <div key={plan}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">{plan}</span>
                    <span className="text-white font-semibold">{count} ({percentage}%)</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-3">
                    <div 
                      className={`${colors[plan]} h-3 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Churn Risk Distribution */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FiBarChart2 className="text-accent-orange" />
            Churn Risk
          </h3>
          <div className="space-y-4">
            {Object.entries(churnRiskDistribution).map(([risk, count]) => {
              const percentage = ((count / users.length) * 100).toFixed(1);
              const colors = {
                Low: 'bg-green-500',
                Medium: 'bg-yellow-500',
                High: 'bg-red-500'
              };
              return (
                <div key={risk}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">{risk} Risk</span>
                    <span className="text-white font-semibold">{count} ({percentage}%)</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-3">
                    <div 
                      className={`${colors[risk]} h-3 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Engagement Distribution */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FiBarChart2 className="text-green-400" />
            Engagement Levels
          </h3>
          <div className="space-y-4">
            {Object.entries(engagementDistribution).map(([level, count]) => {
              const percentage = ((count / users.length) * 100).toFixed(1);
              const colors = {
                Low: 'bg-red-500',
                Medium: 'bg-yellow-500',
                High: 'bg-green-500'
              };
              return (
                <div key={level}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">{level}</span>
                    <span className="text-white font-semibold">{count} ({percentage}%)</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-3">
                    <div 
                      className={`${colors[level]} h-3 rounded-full transition-all`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Performers and At Risk Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FiTrendingUp className="text-green-400" />
            Top Performing Users
          </h3>
          <div className="space-y-4">
            {topUsers.map((user, index) => (
              <div key={user.id} className="flex items-center gap-4 p-4 bg-glass-dark rounded-lg hover:bg-glass-white transition-all">
                <div className="text-2xl font-bold text-accent-yellow">#{index + 1}</div>
                <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-black font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.subscriptionPlan}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-400">{user.retentionScore}%</p>
                  <p className="text-sm text-gray-400">Retention</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* At Risk Users */}
        <div className="glass-card p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FiTrendingDown className="text-red-400" />
            Users At Risk ({atRiskUsers.length})
          </h3>
          <div className="space-y-4">
            {atRiskUsers.slice(0, 5).map((user) => (
              <div key={user.id} className="flex items-center gap-4 p-4 bg-glass-dark rounded-lg hover:bg-glass-white transition-all">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold px-3 py-1 rounded-full ${user.status === 'Inactive' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {user.status === 'Inactive' ? 'Inactive' : 'High Risk'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
