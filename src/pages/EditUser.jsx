import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave, FiX } from 'react-icons/fi';
import { userAPI } from '../services/api';
import { toast } from 'react-toastify';
import Header from '../components/Header';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subscriptionPlan: 'Basic',
    status: 'Active',
    joinDate: '',
    lastActive: '',
    totalSessions: 0,
    averageSessionDuration: '0 min',
    retentionScore: 50,
    lifetimeValue: 0,
    churnRisk: 'Medium',
    engagement: 'Medium'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchUser = async () => {
    try {
      const data = await userAPI.getUserById(id);
      setFormData(data);
    } catch (error) {
      toast.error('Failed to fetch user data');
      console.error('Error fetching user:', error);
      navigate('/users');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (formData.retentionScore < 0 || formData.retentionScore > 100) {
      newErrors.retentionScore = 'Retention score must be between 0 and 100';
    }

    if (formData.lifetimeValue < 0) {
      newErrors.lifetimeValue = 'Lifetime value cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    setSaving(true);

    try {
      await userAPI.updateUser(id, {
        ...formData,
        totalSessions: parseInt(formData.totalSessions),
        retentionScore: parseInt(formData.retentionScore),
        lifetimeValue: parseFloat(formData.lifetimeValue)
      });
      toast.success('User updated successfully!');
      navigate('/users');
    } catch (error) {
      toast.error('Failed to update user');
      console.error('Error updating user:', error);
    } finally {
      setSaving(false);
    }
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
        title="Edit User" 
        subtitle={`Updating profile for ${formData.name}`}
      />

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="glass-card p-8 rounded-xl">
          {/* Basic Information */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-gold rounded"></div>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full glass-card px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-accent-yellow/20'} text-white bg-dark-card outline-none focus:border-accent-yellow transition-all`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full glass-card px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-accent-yellow/20'} text-white bg-dark-card outline-none focus:border-accent-yellow transition-all`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Subscription Plan *</label>
                <select
                  name="subscriptionPlan"
                  value={formData.subscriptionPlan}
                  onChange={handleChange}
                  className="w-full glass-card px-4 py-3 rounded-lg border border-accent-yellow/20 text-white bg-dark-card outline-none focus:border-accent-yellow transition-all"
                >
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full glass-card px-4 py-3 rounded-lg border border-accent-yellow/20 text-white bg-dark-card outline-none focus:border-accent-yellow transition-all"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Join Date *</label>
                <input
                  type="date"
                  name="joinDate"
                  value={formData.joinDate}
                  onChange={handleChange}
                  className="w-full glass-card px-4 py-3 rounded-lg border border-accent-yellow/20 text-white bg-dark-card outline-none focus:border-accent-yellow transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Last Active *</label>
                <input
                  type="date"
                  name="lastActive"
                  value={formData.lastActive}
                  onChange={handleChange}
                  className="w-full glass-card px-4 py-3 rounded-lg border border-accent-yellow/20 text-white bg-dark-card outline-none focus:border-accent-yellow transition-all"
                />
              </div>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-gold rounded"></div>
              Engagement Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Total Sessions</label>
                <input
                  type="number"
                  name="totalSessions"
                  value={formData.totalSessions}
                  onChange={handleChange}
                  className="w-full glass-card px-4 py-3 rounded-lg border border-accent-yellow/20 text-white bg-dark-card outline-none focus:border-accent-yellow transition-all"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Avg. Session Duration</label>
                <input
                  type="text"
                  name="averageSessionDuration"
                  value={formData.averageSessionDuration}
                  onChange={handleChange}
                  className="w-full glass-card px-4 py-3 rounded-lg border border-accent-yellow/20 text-white bg-dark-card outline-none focus:border-accent-yellow transition-all"
                  placeholder="0 min"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Engagement Level</label>
                <select
                  name="engagement"
                  value={formData.engagement}
                  onChange={handleChange}
                  className="w-full glass-card px-4 py-3 rounded-lg border border-accent-yellow/20 text-white bg-dark-card outline-none focus:border-accent-yellow transition-all"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Retention Metrics */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-gold rounded"></div>
              Retention Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Retention Score (0-100) *</label>
                <input
                  type="number"
                  name="retentionScore"
                  value={formData.retentionScore}
                  onChange={handleChange}
                  className={`w-full glass-card px-4 py-3 rounded-lg border ${errors.retentionScore ? 'border-red-500' : 'border-accent-yellow/20'} text-white bg-dark-card outline-none focus:border-accent-yellow transition-all`}
                  placeholder="50"
                  min="0"
                  max="100"
                />
                {errors.retentionScore && <p className="text-red-400 text-sm mt-1">{errors.retentionScore}</p>}
                <div className="mt-2 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-gold h-2 rounded-full transition-all"
                    style={{ width: `${formData.retentionScore}%` }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Churn Risk</label>
                <select
                  name="churnRisk"
                  value={formData.churnRisk}
                  onChange={handleChange}
                  className="w-full glass-card px-4 py-3 rounded-lg border border-accent-yellow/20 text-white bg-dark-card outline-none focus:border-accent-yellow transition-all"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">Lifetime Value ($) *</label>
                <input
                  type="number"
                  name="lifetimeValue"
                  value={formData.lifetimeValue}
                  onChange={handleChange}
                  className={`w-full glass-card px-4 py-3 rounded-lg border ${errors.lifetimeValue ? 'border-red-500' : 'border-accent-yellow/20'} text-white bg-dark-card outline-none focus:border-accent-yellow transition-all`}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
                {errors.lifetimeValue && <p className="text-red-400 text-sm mt-1">{errors.lifetimeValue}</p>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-800">
            <button
              type="button"
              onClick={() => navigate('/users')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all"
            >
              <FiX /> Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-gold text-black font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
