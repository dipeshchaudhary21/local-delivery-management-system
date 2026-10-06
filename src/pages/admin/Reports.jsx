import { useState } from "react";
import DashboardSidebar from "../../components/DashboardSidebar";
import "./Reports.css";

const parcels = [
  { trackingId: "CC-10001", customer: "Dipesh", destination: "Kathmandu", date: "2026-09-15", status: "Delivered" },
  { trackingId: "CC-10002", customer: "Sita", destination: "Pokhara", date: "2026-09-16", status: "In Transit" },
  { trackingId: "CC-10003", customer: "Hari", destination: "Biratnagar", date: "2026-09-17", status: "Pending" },
  { trackingId: "CC-10004", customer: "Mina", destination: "Dharan", date: "2026-09-19", status: "Delivered" },
  { trackingId: "CC-10005", customer: "Raju", destination: "Lalitpur", date: "2026-09-22", status: "In Transit" },
];

function csvValue(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function Reports({ onLogout }) {
  const [filters, setFilters] = useState({ from: "", to: "", status: "All" });
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  function handleChange(event) {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  }

  function generateReport(event) {
    event.preventDefault();

    if (filters.from && filters.to && filters.from > filters.to) {
      setError("Start date must be before end date.");
      setReport(null);
      return;
    }

    const results = parcels.filter((parcel) => {
      const afterStart = !filters.from || parcel.date >= filters.from;
      const beforeEnd = !filters.to || parcel.date <= filters.to;
      const matchesStatus = filters.status === "All" || parcel.status === filters.status;
      return afterStart && beforeEnd && matchesStatus;
    });

    setError("");
    setReport({ rows: results, generatedAt: new Date().toLocaleString() });
  }

  function downloadCsv() {
    if (!report) return;

    const rows = [
      ["Tracking ID", "Customer", "Destination", "Date", "Status"],
      ...report.rows.map(({ trackingId, customer, destination, date, status }) => [trackingId, customer, destination, date, status]),
    ];
    const csv = rows.map((row) => row.map(csvValue).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "courier-parcel-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  const delivered = report?.rows.filter((parcel) => parcel.status === "Delivered").length ?? 0;
  const inTransit = report?.rows.filter((parcel) => parcel.status === "In Transit").length ?? 0;
  const pending = report?.rows.filter((parcel) => parcel.status === "Pending").length ?? 0;

  return (
    <DashboardSidebar role="admin" onLogout={onLogout}>
      <main className="reports-page">
        <header className="reports-header">
          <h1>Reports</h1>
          <p>Generate parcel reports by date and delivery status.</p>
        </header>

        <form className="report-filters" onSubmit={generateReport}>
          <label>
            From
            <input type="date" name="from" value={filters.from} onChange={handleChange} />
          </label>
          <label>
            To
            <input type="date" name="to" value={filters.to} onChange={handleChange} />
          </label>
          <label>
            Status
            <select name="status" value={filters.status} onChange={handleChange}>
              <option>All</option>
              <option>Pending</option>
              <option>In Transit</option>
              <option>Delivered</option>
            </select>
          </label>
          <button type="submit">Generate Report</button>
        </form>

        {error && <p className="report-error" role="alert">{error}</p>}

        {report && (
          <section className="generated-report" aria-live="polite">
            <div className="report-result-heading">
              <div>
                <h2>Parcel Report</h2>
                <p>Generated {report.generatedAt}</p>
              </div>
              <button type="button" onClick={downloadCsv}>Download CSV</button>
            </div>

            <div className="report-summary">
              <article><span>Total parcels</span><strong>{report.rows.length}</strong></article>
              <article><span>Delivered</span><strong>{delivered}</strong></article>
              <article><span>In transit</span><strong>{inTransit}</strong></article>
              <article><span>Pending</span><strong>{pending}</strong></article>
            </div>

            {report.rows.length ? (
              <div className="report-table-wrap">
                <table>
                  <thead><tr><th>Tracking ID</th><th>Customer</th><th>Destination</th><th>Date</th><th>Status</th></tr></thead>
                  <tbody>
                    {report.rows.map((parcel) => (
                      <tr key={parcel.trackingId}>
                        <td>{parcel.trackingId}</td><td>{parcel.customer}</td><td>{parcel.destination}</td><td>{parcel.date}</td><td>{parcel.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p className="report-empty">No parcels match these filters.</p>}
          </section>
        )}
      </main>
    </DashboardSidebar>
  );
}

export default Reports;
