import React from 'react';


interface DataTableColumn {
  key: string;
  label: string;
  width?: string | number;
}

interface DataTableProps {
  columns: DataTableColumn[];
  data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ columns, data }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <thead>
        <tr style={{ background: '#f5f5f7' }}>
          {columns.map(col => (
            <th
              key={col.key}
              style={{
                padding: 12,
                textAlign: 'left',
                fontWeight: 600,
                borderBottom: '1px solid #e5e5e5',
                // minWidth: col.width,
                width: col.width,
                whiteSpace: 'nowrap'
              }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} style={{ padding: 16, textAlign: 'center', color: '#888' }}>No data</td>
          </tr>
        ) : (
          data.map((row, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #f0f0f0' }}>
              {columns.map(col => (
                <td key={col.key} style={{ paddingTop: 12, paddingBottom:12, paddingLeft:12 }}>{row[col.key]}</td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default DataTable;
