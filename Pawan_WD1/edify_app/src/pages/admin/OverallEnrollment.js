import React, { useState, useEffect } from "react";
import { Container, Breadcrumb } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import api from "../../services/Api";

const OverallEnrollment = () => {
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getGraphData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/enrollmentStatus/active`);

      if (response.status === 200) {
        setGraphData(response.data);
        setError(null);
      } else {
        setError("An error occured while fetching enrollments!");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGraphData();
  }, []);

  return (
    <>
      <Container fluid="lg">
        <div className="d-flex my-4 row g-3">
          <Breadcrumb className="ms-4 col-md-6">
            <Breadcrumb.Item href="/admin-dashboard">
              Admin Dashboard
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/admin-dashboard/enrollment-management">
              Enrollment Management
            </Breadcrumb.Item>
            <Breadcrumb.Item>Overall Enrollment</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {loading && (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border" role="status"></div>
            <span className="p-2">Wait while loading...</span>
          </div>
        )}
        {error && (
          <div class="alert alert-danger" role="alert">
            {error.message}
          </div>
        )}

        <div className="row py-5">
          <div className="col-md-12">
            <h4 className="text-center">Overall Stats</h4>

            <ResponsiveContainer height={400}>
              <BarChart
                data={graphData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid stroke="#cacaca" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="active" fill="#3c733f" barSize={30} />
                {/* <Bar dataKey="graduate" fill="#82ca9d" barSize={20} /> */}
              </BarChart>
            </ResponsiveContainer>
          </div>
         
        </div>
      </Container>
    </>
  );
};

export default OverallEnrollment;
