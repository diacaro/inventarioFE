import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
// import { addProduct } from "src/service/addProdcut";
import * as Yup from 'yup';
import { getListInvernadero } from '../../../service/invernaderoService';
import { getListMesa } from '../../../service/mesaService';


import './NewProduct.css';

const Formulario = () => {
  const [invernaderos, setInvernaderos] = useState([]);
  const [mesa, setMesa] = useState([]);

  useEffect(() => {
    getListInvernadero().then((data) => {
      setInvernaderos(data);
      console.log(data);
    });
    getListMesa().then((data) => {
      setMesa(data);
      console.log(data);
    });
  }, []);

  // let valoresIniciales = {
  //   nombre: "",
  //   email: "",
  //   contraseña: ""
  // }

  // const enviarForm = (data) => {
  //   console.log(data);
  // };
  // useEffect(() => {
  //   addProduct().then(data => {

  //     console.log(data)

  //        }
  //   );
  // }, []);

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
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.invernadero}
              label="invernadero"
              onChange={handleChange}
            >{ 
              invernaderos.map(item =>
                <MenuItem Key={item.id} value={item.id} >{item.invernadero}</MenuItem>
                )
            }
            </Select>

            
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
