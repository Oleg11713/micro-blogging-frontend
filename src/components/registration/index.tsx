import React, { useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

import { registration, resetToken } from "../../http/userAPI";

import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";

function Registration() {
  const [loading, setLoading] = useState(false);

  const validationSchema = yup.object({
    firstName: yup.string().required("Пожалуйста, заполните данное поле"),
    secondName: yup.string().required("Пожалуйста, заполните данное поле"),
    age: yup.number().required("Пожалуйста, заполните данное поле"),
    email: yup
      .string()
      .email("Введите корректный адрес эл. почты")
      .required("Пожалуйста, заполните данное поле"),
    password: yup.string().required("Пожалуйста, заполните данное поле"),
    passwordConfirm: yup.string().required("Пожалуйста, заполните данное поле"),
  });

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    formik.handleSubmit();
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      secondName: "",
      age: 0,
      email: "",
      password: "",
      passwordConfirm: "",
    },
    onSubmit: async values => {
      if (values.password !== values.passwordConfirm) {
        return toast.error("Пароли не совпадают", {
          className: "toast-error",
          draggable: false,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }

      try {
        setLoading(true);
        const displayName = `${values.firstName} ${values.secondName}`;
        try {
          await registration(
            displayName,
            values.age,
            values.email,
            values.password,
          );
        } finally {
          setLoading(true);
        }
        toast.success("На ваш email отправлено подтверждение", {
          className: "toast-success",
          position: toast.POSITION.BOTTOM_CENTER,
        });
        formik.resetForm();
        resetToken();
      } catch (e) {
        let errorMessage = "Ошибка регистрации";
        if (e instanceof Error) {
          errorMessage = e.message;
        }
        toast.error(`${errorMessage}`, {
          className: "toast-error",
          draggable: false,
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
      return setLoading(false);
    },
    validationSchema,
  });

  return (
    <div className="registration">
      <div className="title">Регистрация</div>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          id="secondName"
          name="secondName"
          label="Second Name"
          value={formik.values.secondName}
          onChange={formik.handleChange}
          error={formik.touched.secondName && Boolean(formik.errors.secondName)}
          helperText={formik.touched.secondName && formik.errors.secondName}
        />
        <TextField
          id="age"
          name="age"
          label="Age"
          value={formik.values.age}
          onChange={formik.handleChange}
          error={formik.touched.age && Boolean(formik.errors.age)}
          helperText={formik.touched.age && formik.errors.age}
        />
        <TextField
          id="emailSignUp"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="passwordSignUp"
          name="password"
          type="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          id="passwordConfirm"
          name="passwordConfirm"
          type="password"
          value={formik.values.passwordConfirm}
          onChange={formik.handleChange}
          error={
            formik.touched.passwordConfirm &&
            Boolean(formik.errors.passwordConfirm)
          }
          helperText={
            formik.touched.passwordConfirm && formik.errors.passwordConfirm
          }
          label="Confirm Password"
        />
        <div className="hint-for-login">
          Есть аккаунт?{" "}
          <NavLink className="login-link" to="/auth/login">
            Войдите!
          </NavLink>
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          type="submit"
        >
          ЗАРЕГИСТРИРОВАТЬСЯ
        </Button>
      </form>
    </div>
  );
}

export default Registration;
