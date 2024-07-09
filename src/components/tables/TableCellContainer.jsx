import React from 'react';
import { TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TableCellContainer = ({ path, children }) => {
  const navigate = useNavigate();
  return (
    <TableRow
      onClick={() => path && navigate(path)}
      sx={{
        cursor: path && 'pointer',
        '&:hover': {
          background: 'rgba(145, 158, 171, 0.16)',
        },
        '&:last-child td, &:last-child th': { border: 0 },
      }}
    >
      {children}
    </TableRow>
  );
};

export default TableCellContainer;
