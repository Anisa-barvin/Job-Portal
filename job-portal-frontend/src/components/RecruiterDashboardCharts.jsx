import { useEffect, useState } from "react";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#198754", "#dc3545", "#ffc107"];

function RecruiterDashboardCharts() {
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  const fetchChartData = async () => {
    try {
      const res = await API.get("/applications/stats/recruiter/charts");
      setBarData(res.data.applicationsPerJob);
      setPieData(res.data.statusDistribution);
    } catch {
      alert("Failed to load chart data");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchChartData();
  }, []);

  return (
    <div className="row mt-4">
      
      {/* BAR CHART */}
      <div className="col-md-7">
        <div className="card p-3 shadow-sm">
          <h6 className="mb-3">Applications per Job</h6>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="jobTitle" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="applications" fill="#0d6efd" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PIE CHART */}
      <div className="col-md-5">
        <div className="card p-3 shadow-sm">
          <h6 className="mb-3">Application Status</h6>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

export default RecruiterDashboardCharts;
