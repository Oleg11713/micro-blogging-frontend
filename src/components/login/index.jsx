import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, TextField } from '@material-ui/core';

import { login } from '../../http/userAPI';
import { setCurrentUser } from '../../redux/user/actions';

import './styles.scss';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Введите корректный адрес эл. почты')
      .required('Пожалуйста, заполните данное поле'),
    password: yup.string().required('Пожалуйста, заполните данное поле'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async values => {
      try {
        setLoading(true);
        const user = await login(values.email, values.password);
        dispatch(setCurrentUser(user));
        history.push('/');
      } catch (e) {
        toast.error(`${e.response.data.message}`, {
          className: 'toast-error',
          draggable: false,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }

      setLoading(false);
    },
    validationSchema,
  });

  return (
    <div className="login">
      <div className="title">Авторизация</div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="emailSignIn"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="passwordSignIn"
          name="password"
          type="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <div className="hint-for-registration">
          Нет аккаунта?{' '}
          <NavLink className="registration-link" to="/auth/registration">
            Зарегистрируйся!
          </NavLink>
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          type="submit"
        >
          ВОЙТИ
        </Button>
      </form>
    </div>
  );
}

export default Login;
