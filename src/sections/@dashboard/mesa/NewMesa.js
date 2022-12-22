import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { createMesa } from '../../../service/mesaService';

import { getListInvernadero  } from '../../../service/invernaderoService';




import './NewMesa.css';

const Formulario = () => {

  const [invernadero, setInvernadero] = useState([]);

  useEffect(() => {
    getListInvernadero().then((data) => {
      setInvernadero(data);
      console.log(data);
    });
  }, []);


  const { handleSubmit, handleChange, values, setFieldValue, errors } = useFormik({
    initialValues: {
      mesa: '',
      invernadero: '',

    },

    validationSchema: Yup.object({
      // mesa: Yup.string().required('Debes ingresar la mesa'),
      // invernadero: Yup.string().required(),

    }),

    onSubmit: (data) => {
      createMesa(data);

    },
  });

  return (
    <div>
      <Typography color="primary" variant="h2" align="center">
        Nueva Mesa
      </Typography>

      <form className="form-container" onSubmit={handleSubmit}>
        <Grid container alignItems={'left'} justifyContent="space-between" spacing={3} sx={{ width: '50%' }}>

          <Grid item xs={12} md={6}>
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
            value={values.invernadero}
            label="idInvernadero"
              onChange={handleChange}
            >{ 
              invernadero.map(item =>
                <MenuItem Key={item.id} value={item.id} >{item.invernadero}</MenuItem>
                )
            }
            </Select>
            </FormControl>
            
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
