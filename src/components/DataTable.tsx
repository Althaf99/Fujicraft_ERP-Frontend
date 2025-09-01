import React from 'react';

interface DataTableColumn {
  key: string;
  label: string;
  width?: string | number;
}

interface DataTableProps {
  columns: DataTableColumn[];
  data: any[];
  actions?: (row: any, idx: number) => React.ReactNode;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, actions }) => {
  return (
    <table style={{
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      background: '#fff',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      margin: 0
    }}>
      <thead>
  <tr style={{ background: '#f5f5f7', borderBottom: '2px solid #e5e5e5' }}>
          {columns.map(col => (
            <th
              key={col.key}
              style={{
                padding: '14px 16px',
                textAlign: 'left',
                fontWeight: 600,
                borderBottom: '2px solid #e5e5e5',
                background: '#f5f5f7',
                width: col.width,
                whiteSpace: 'nowrap',
                fontSize: 15
              }}
            >
              {col.label}
            </th>
          ))}
          {actions && <th style={{ padding: 12, textAlign: 'center', fontWeight: 600, borderBottom: '2px solid #e5e5e5', width: 120, background: '#f5f5f7', verticalAlign: 'middle' }}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + (actions ? 1 : 0)} style={{ padding: 20, textAlign: 'center', color: '#888', fontSize: 15 }}>No data</td>
          </tr>
        ) : (
          data.map((row, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #ececec', transition: 'background 0.2s' }}>
              {columns.map(col => (
                <td key={col.key} style={{ padding: '13px 16px', fontSize: 15, background: '#fff' }}>{row[col.key]}</td>
              ))}
              {actions && <td style={{ padding: '13px 16px', background: '#fff', textAlign: 'center', verticalAlign: 'middle' }}>{actions(row, idx)}</td>}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
