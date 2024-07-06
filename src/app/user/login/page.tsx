"use client";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Form, useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { string } from "yup";

function Login() {
  const validationSchema = yup.object({
    userName: string()
      .required()
      .min(8, "Username must be at least 8 characters long")
      .max(16, "Username must be no more than 16 characters long")
      .matches(
        /^[a-zA-Z0-9._-]+$/,
        "Username can only contain letters, numbers, periods, underscores, and hyphens"
      )
      .required("Username is required"),

    password: string()
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password must be no more than 16 characters long")
      .matches(
        /^[\x20-\x7E]+$/,
        "Password must contain only keyboard characters"
      )
      .required("Password is required"),

    firstName: string()
      .matches(/^[a-zA-Z]+$/, "First name can only contain letters")
      .required("First name is required"),

    lastName: string()
      .matches(/^[a-zA-Z]+$/, "Last name can only contain letters")
      .required("Last name is required"),
  });
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });
  //   const handleSubmit = (event: HTMLFormElement) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     });
  //   };

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
          </Avatar> */}
          <Typography
            component="h1"
            variant="h5"
          >
            Sign in
          </Typography>
          {/* <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        > */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            label="First Name"
            autoComplete="current-firstName"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            label="Last Name"
            autoComplete="current-lastName"
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid
              item
              xs
            >
              <Link
                href="#"
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
      {/* </Box> */}
    </Container>
  );
}

export default Login;
