import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
// import { addProduct } from "src/service/addProdcut";
import * as Yup from 'yup';
import { createCategoria } from '../../../service/categoriaService';


import './NewCategoria.css';

const Formulario = () => {
 

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
      categoria: '',

    },

    validationSchema: Yup.object({
      categoria: Yup.string().required('Debes ingresar la categoriao'),

    }),

    onSubmit: (data) => {
      createCategoria(data);
    },
  });

  return (
    <div>
      <Typography color="primary" variant="h2" align="center">
        Nuevo Producto
      </Typography>

      <form className="form-container" onSubmit={handleSubmit}>
        <Grid container alignItems={'left'} justifyContent="space-between" spacing={3} sx={{ width: '50%' }}>

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
        </Grid>
        <Button type="submit" variant="contained">
          Crear
        </Button>
      </form>
    </div>
  );
};

export default Formulario;
