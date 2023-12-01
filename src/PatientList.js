import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Container, Box, Slider, Table, TableBody, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import CloseIcon from '@mui/icons-material/Close';
import useFetch from './hooks/fetchPatient';
import PatientDetail from './PatientDetail';
import { debounce } from './utils/';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function valuetext(value) {
  return `${value}°C`;
}

export default function PatientList() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([1, 100]);
  const [currentId, setCurrentId] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [patientData] = useFetch();


  const filterData = debounce((value) => {
    const [min, max] = value;
    if(min === 1 && max === 100) {
        setFilteredData(originalData);
    } else{
        const newData = originalData.filter((item) => {
            return item.age >= min && item.age <= max;
        });
        setFilteredData(newData);
    }

  })

  const handleChange = (event, newValue) => {
    setValue(newValue);
  } ;

  useEffect(() => {
    if(value) {
        filterData(value)
    }

  }, [value])

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = (row) => {
    if (row?.id) {
      setCurrentId(row.id);
    }

    setOpen(true);
  };

  useEffect(() => {
    setOriginalData(patientData);
    setFilteredData(patientData);
  }, [patientData]);

  return (
    <Container>
      <Box sx={{ width: 300 }}>
        <h2>Filter By Age:</h2>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Visit Time</StyledTableCell>
              <StyledTableCell align="right">Gender</StyledTableCell>
              <StyledTableCell align="right">Age</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">N/A</StyledTableCell>
                <StyledTableCell align="right">
                  {row.gender || 'N/A'}
                </StyledTableCell>

                <StyledTableCell align="right">
                  {row.age}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={(e) => handleClickOpen(row)}
                  >
                    Detail
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Patient Deatil
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <PatientDetail id={currentId} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
