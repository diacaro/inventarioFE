import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
// import { addProduct } from "src/service/addProdcut";
import * as Yup from 'yup';
import { createInvernadero, createSede } from '../../../service/invernaderoService';


import './NewInvernadero.css';

const Formulario = () => {
 

  const { handleSubmit, handleChange, values, setFieldValue, errors } = useFormik({
    initialValues: {
      invernadero: '',
      sede: '',

    },

    validationSchema: Yup.object({
      Invernadero: Yup.string().required('Debes ingresar el Invernadero'),
      sede: Yup.string().required('Debes ingresar la sede'),

    }),

    onSubmit: (data) => {
      createInvernadero(data);
      createSede(data);
    },
  });

  return (
    <div>
      <Typography color="primary" variant="h2" align="center">
        Nuevo Invernadero
      </Typography>

      <form className="form-container" onSubmit={handleSubmit}>
        <Grid container alignItems={'left'} justifyContent="space-between" spacing={3} sx={{ width: '50%' }}>

          <Grid item xs={12} md={12}>
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
          <Grid item xs={12} md={12}>
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
