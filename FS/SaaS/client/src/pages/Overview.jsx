import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import PageHeader from '../components/PageHeader';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const KpiCard = ({ label, value, hint }) => (
  <div className="kpi-card">
    <div className="label small muted">{label}</div>
    <div style={{ marginTop: 8 }} className="flex items-baseline justify-between">
      <div className="value">{value}</div>
      {hint && <div className="small muted">{hint}</div>}
    </div>
  </div>
);

const Overview = () => {
  const [dauSeries, setDauSeries] = useState([]);
  const [mau, setMau] = useState(0);
  const [stickiness, setStickiness] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadMetrics = async () => {
    setLoading(true);
    try {
      const [{ data: dauData }, { data: mauData }, { data: stickData }] = await Promise.all([
        api.get('/metrics/dau?days=30'),
        api.get('/metrics/mau?months=1'),
        api.get('/metrics/stickiness'),
      ]);

      setDauSeries(dauData.data || []);
      setMau(mauData.mau ?? 0);
      setStickiness(Math.round((stickData.stickiness ?? 0) * 10000) / 100);
    } catch (err) {
      // Better error logging for auth failures
      if (err?.response) {
        console.error(`Failed to load metrics - status ${err.response.status}:`, err.response.data || err.message);
      } else {
        console.error('Failed to load metrics', err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  return (
    <div className="page container p-6">
      <PageHeader title="Overview" subtitle="Company-level product usage and retention KPIs" />

      <section className="kpi-grid mb-6">
        <KpiCard label="MAU" value={loading ? '—' : mau} hint="Last 30 days" />
        <KpiCard label="Avg DAU" value={loading ? '—' : (dauSeries.length ? Math.round(dauSeries.reduce((s,r)=>s+r.count,0)/dauSeries.length) : 0)} hint="30-day average" />
        <KpiCard label="Stickiness (DAU ÷ MAU)" value={loading ? '—' : `${stickiness}%`} hint="Higher = more engaged" />
      </section>

      <section className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 style={{ margin: 0 }} className="text-lg font-medium">Daily Active Users (DAU)</h2>
          <div className="small muted">Last 30 days</div>
        </div>
        <div className="chart-wrap" style={{ width: '100%', height: 300, minWidth: 0, minHeight: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dauSeries} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#FF6D00" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};

export default Overview;
