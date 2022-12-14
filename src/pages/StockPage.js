
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components

import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { StockListHead, StockListToolbar } from '../sections/@dashboard/stock';

// mock
//  import product from '../_mock/stock';
import { getListProduct,deleteProduct } from '../service/productService'

// ----------------------------------------------------------------------


const TABLE_HEAD = [
  { id: 'name', label: 'Nombre', alignRight: false },
  { id: 'clima', label: 'Clima', alignRight: false },
  { id: 'precio', label: 'Precio', alignRight: false },
  { id: 'IdCategoria', label: 'Categoria', alignRight: false },
  { id: 'IdMesa', label: 'Mesa', alignRight: false },
  { id: 'IdInvernadero', label: 'Invernadero', alignRight: false },
  { id: 'sede', label: 'Sede', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: ''},
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function StockPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [product, setproduct] = useState([]);

  useEffect(() => {
    getListProduct().then(data => {
      setproduct(data);     
      console.log(data)
    }
    );
  }, []);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const deletep = (productId) => {
    deleteProduct(productId);
  };

  
  

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = product.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - product.length) : 0;

  const filteredStock = applySortFilter(product, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredStock.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> product </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            product
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} href="newp" >
            New Product
            
          </Button>
        </Stack>

        <Card>
          <StockListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 700 }}>
              <Table>
                <StockListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={product.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredStock.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, nombre, clima, precio, idCategoria, idMesa, idInvernadero, sede} = row;
                    const selectedUser = selected.indexOf(nombre) !== -1;
                    console.log(row)

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, nombre)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={nombre} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {nombre}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{clima}</TableCell>
                        <TableCell align="left">{precio}</TableCell>
                        <TableCell align="left">{idCategoria}</TableCell>
                        <TableCell align="left">{idMesa}</TableCell>
                        <TableCell align="left">{idInvernadero}</TableCell>
                        <TableCell align="left">{sede}</TableCell>
                        {/* <TableCell align="left">{status ? 'Yes' : 'No'}</TableCell> */}


                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={product.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
        >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        {filteredStock.map((row) => {
                const { id } = row;  
                console.log (row)
                return (

        <MenuItem  key={id} sx={{ color: 'error.main' }} onClick={() => deletep (row.id)} >
        {/* <MenuItem sx={{ color: 'error.main' }} onClick={(e) => deletep(product.id, e)} > */}
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete

        </MenuItem>

     );
        
      })}
      </Popover>

    </>
  );
}
