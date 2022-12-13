import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
// import { addProduct } from "src/service/addProdcut";
import * as Yup from 'yup';
import { getListInvernadero } from '../../../service/invernaderoService';
import { getListMesa } from '../../../service/mesaService';
import { getListCategoria } from '../../../service/categoriaService';


import './NewProduct.css';

const Formulario = () => {
  const [invernadero, setInvernadero] = useState([]);
  const [mesa, setMesa] = useState([]);
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    getListInvernadero().then((data) => {
      setInvernadero(data);
      console.log(data);
    });
    getListMesa().then((data) => {
      setMesa(data);
      console.log(data);
    });
    getListCategoria().then((data) => {
      setCategoria(data);
      console.log(data);
    });
  }, []);


  const { handleSubmit, handleChange, values, setFieldValue, errors } = useFormik({
    initialValues: {
      nombre: '',
      clima: '',
      precio: '',
      categoria: '',
      mesa: '',
      invernadero: '',
      sede: '',
    },

    validationSchema: Yup.object({
      nombre: Yup.string().required('Debes ingresar un nombre'),
      // clima: Yup.string().required("Debes ingresar un email"),
      precio: Yup.string().required('Debes ingresar el precio'),
      categoria: Yup.string().required('Debes ingresar la categoriao'),
      idMesa: Yup.string().required('Debes ingresar la mesa'),
      invernadero: Yup.string().required('Debes ingresar el invernadero'),
      sede: Yup.string().required('Debes ingresar la sede'),
    }),

    onSubmit: (data) => {
      console.log(data);
    },
  });

  return (
    <div>
      <Typography color="primary" variant="h2" align="center">
        Nuevo Producto
      </Typography>

      <form className="form-container" onSubmit={handleSubmit}>
        <Grid container alignItems={'left'} justifyContent="space-between" spacing={3} sx={{ width: '50%' }}>
          {/* <Grid item xs={12} md={7}>
            <TextField
              type="text"
              label="Nombre"
              // name="nombre"
              // onChange={(e) => {
              //   setFieldValue("nombre", e.target.value);
              // }}
              variant="outlined"
              fullWidth
              value={values.nombre}
              helperText={errors.nombre}
              error={errors.nombre}
            />
          </Grid> */}

          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label="Nombre"
              variant="outlined"
              fullWidth
              name="nombre"
              onChange={handleChange}
              value={values.nombre}
              error={errors.nombre}
              helperText={errors.nombre}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label="Clima"
              variant="outlined"
              fullWidth
              name="clima"
              onChange={handleChange}
              value={values.clima}
              error={errors.clima}
              helperText={errors.clima}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              label="Precio"
              variant="outlined"
              fullWidth
              name="precio"
              onChange={handleChange}
              value={values.precio}
              error={errors.precio}
              helperText={errors.precio}
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.idCategoria}
              label="idCategoria"
              onChange={handleChange}
            >{ 
              categoria.map(item =>
                <MenuItem key = {item.id} value={item.id}>{item.categoria}</MenuItem>
                )
            }
            </Select>
            </FormControl>
            <TextField
              type="text"
              label="Categoria"
              variant="outlined"
              fullWidth
              name="categoria"
              onChange={handleChange}
              value={values.categoria}
              error={errors.categoria}
              helperText={errors.categoria}
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Mesa</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.idMesa}
              label="idMesa"
              onChange={handleChange}
            >{ 
              mesa.map(item =>
                <MenuItem key = {item.id} value={item.id}>{item.mesa}</MenuItem>
                )
            }
            </Select>
            </FormControl>
            <TextField
              type="text"
              label="Mesa"
              variant="outlined"
              fullWidth
              name="mesa"
              onChange={handleChange}
              value={values.mesa}
              error={errors.mesa}
              helperText={errors.mesa}
            />
          </Grid>
          <Grid item xs={12} md={6}>

          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Invernadero</InputLabel>            
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.idInvernadero}
              label="idInvernadero"
              onChange={handleChange}
            >{ 
              invernadero.map(item =>
                <MenuItem Key={item.id} value={item.id} >{item.invernadero}</MenuItem>
                )
            }
            </Select>
            </FormControl>

            
            <TextField
              type="text"
              label="Invernadero"
              variant="outlined"
              fullWidth
              name="invernadero"
              onChange={handleChange}
              value={values.invernadero}
              error={errors.invernadero}
              helperText={errors.invernadero}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="text"
              label="Sede"
              variant="outlined"
              fullWidth
              name="sede"
              onChange={handleChange}
              value={values.sede}
              error={errors.sede}
              helperText={errors.sede}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained">
          Crear
        </Button>
      </form>
    </div>
  );
};

export default Formulario;
