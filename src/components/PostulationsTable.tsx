import { useEffect, useState } from "react";
import { getApplications } from "../services/api";
import "./PostulationTable.css"; // Agrega este import

interface Application {
  id: string;
  company: string;
  role: string;
  applicationDate: string;
  status: string;
  description: string;
  url: string;
  notes?: string;
}

export default function PostulationTable() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    getApplications().then(setApplications);
  }, []);

  const getStatusClass = (status: string) => {
    const formatted = status.toLowerCase().replace(/\s+/g, "-");
    return `status-pill status-${formatted}`;
  };

  return (
    <div className="table-container">
      <h2 className="table-title">Mis Postulaciones</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Empresa</th>
            <th>Cargo</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Descripción</th>
            <th>URL</th>
            <th>Notas</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.company}</td>
              <td>{app.role}</td>
              <td>{new Date(app.applicationDate).toLocaleDateString()}</td>
              <td>
                <span className={getStatusClass(app.status)}>
                  {app.status}
                </span>
              </td>
              <td>{app.description}</td>
              <td>
                <a href={app.url} target="_blank" rel="noopener noreferrer">
                  {app.url}
                </a>
              </td>
              <td>{app.notes || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
