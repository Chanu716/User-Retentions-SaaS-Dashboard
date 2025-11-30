import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiSearch, FiPlus } from 'react-icons/fi';
import { userAPI } from '../services/api';
import { toast } from 'react-toastify';
import Header from '../components/Header';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPlan, setFilterPlan] = useState('All');
  const [deleteModal, setDeleteModal] = useState({ show: false, userId: null });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, filterStatus, filterPlan, users]);

  const fetchUsers = async () => {
    try {
      const data = await userAPI.getAllUsers();
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'All') {
      filtered = filtered.filter(user => user.status === filterStatus);
    }

    // Plan filter
    if (filterPlan !== 'All') {
      filtered = filtered.filter(user => user.subscriptionPlan === filterPlan);
    }

    setFilteredUsers(filtered);
  };

  const handleDelete = async () => {
    try {
      await userAPI.deleteUser(deleteModal.userId);
      toast.success('User deleted successfully!');
      setDeleteModal({ show: false, userId: null });
      fetchUsers();
    } catch (error) {
      toast.error('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' 
      ? 'text-green-400 bg-green-400/10' 
      : 'text-red-400 bg-red-400/10';
  };

  const getRiskColor = (risk) => {
    if (risk === 'Low') return 'text-green-400 bg-green-400/10';
    if (risk === 'Medium') return 'text-yellow-400 bg-yellow-400/10';
    return 'text-red-400 bg-red-400/10';
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
        title="All Users" 
        subtitle={`Managing ${users.length} total users`}
      />

      {/* Filters and Search */}
      <div className="glass-card p-6 rounded-xl mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 glass-card px-4 py-3 rounded-lg border border-accent-yellow/20">
              <FiSearch className="text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none text-white placeholder-gray-400 w-full"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full glass-card px-4 py-3 rounded-lg border border-accent-yellow/20 text-white bg-dark-card outline-none"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Plan Filter */}
          <div>
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="w-full glass-card px-4 py-3 rounded-lg border border-accent-yellow/20 text-white bg-dark-card outline-none"
            >
              <option value="All">All Plans</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-400 text-sm">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <Link
            to="/add-user"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-gold text-black font-semibold rounded-lg hover:opacity-90 transition-all"
          >
            <FiPlus /> Add New User
          </Link>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="glass-card rounded-xl overflow-hidden glass-hover animate-fade-in">
            <div className="p-6">
              {/* User Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center text-black font-bold text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{user.name}</h3>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                  {user.status}
                </span>
              </div>

              {/* User Details */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Plan:</span>
                  <span className="text-white font-semibold">{user.subscriptionPlan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Joined:</span>
                  <span className="text-white text-sm">{user.joinDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">Sessions:</span>
                  <span className="text-white font-semibold">{user.totalSessions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">LTV:</span>
                  <span className="text-accent-yellow font-bold">${user.lifetimeValue}</span>
                </div>
              </div>

              {/* Retention Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Retention Score</span>
                  <span className="text-white font-semibold">{user.retentionScore}%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-gold h-2 rounded-full transition-all"
                    style={{ width: `${user.retentionScore}%` }}
                  />
                </div>
              </div>

              {/* Churn Risk */}
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(user.churnRisk)}`}>
                  Churn Risk: {user.churnRisk}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-800">
                <Link
                  to={`/edit-user/${user.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all"
                >
                  <FiEdit2 size={16} /> Edit
                </Link>
                <button
                  onClick={() => setDeleteModal({ show: true, userId: user.id })}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all"
                >
                  <FiTrash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No users found</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-md w-full p-6 rounded-xl border border-accent-yellow/20 animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteModal({ show: false, userId: null })}
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
