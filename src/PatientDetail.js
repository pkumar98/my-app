import React, { memo } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useFetch from './hooks/fetchPatient';

const PatientDetail = memo(function PatientDetail(id) {
  const [data] = useFetch(id);

  const formatAddress = (address) => {
    return address ? address[0].text : 'N/A';
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Gender</TableCell>
              <TableCell align="right">BirthDate</TableCell>
              <TableCell align="right">Addresss</TableCell>
              <TableCell align="right">Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="right">{data.id}</TableCell>
              <TableCell align="right">{data.name}</TableCell>
              <TableCell align="right">{data.gender}</TableCell>
              <TableCell align="right">{data.birthDate}</TableCell>
              <TableCell align="right">
                {formatAddress(data.address) || 'N/A'}
              </TableCell>
              <TableCell align="right">{'N/A'}</TableCell>
            </TableRow>
            {/* {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
});

export default PatientDetail;
