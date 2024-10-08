"use client";
import { registerValidationSchema } from "@/constants/validations";
import { useAppSelector } from "@/hooks/useStore";
import axios from "@/lib/axios";
import { getValidAuthToken } from "@/lib/cookies";
import { prisma } from "@/lib/utils/prisma";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Register() {
  const { token } = getValidAuthToken();

  const { dic } = useAppSelector((state) => state.localeSlice);

  const { push } = useRouter();
  usePathname();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: registerValidationSchema(dic),
    onSubmit: async (values) => {
      await axios.post("/auth/register", values).then(
        (value) => {
          console.log(value);
          alert(JSON.stringify(value.data.userName));
        },
        (reject) => {
          // ? REJECTED
          if (reject.response.status === 409)
            formik.setFieldError("userName", "Username is already taken");
        }
      );
    },
  });

  useEffect(() => {
    if (token) push("/");
  });

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
            {dic.REGISTER}
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
            label={dic.USER_NAME}
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
            autoComplete="off"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={dic.USER_PASSWORD}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            type="password"
            id="password"
            autoComplete="new-password"
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
            label={dic.USER_FNAME}
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
            label={dic.USER_LNAME}
            autoComplete="current-lastName"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2, height: 60 }}
          >
            {dic.SIGNUP}
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="/user/login"
                variant="body2"
              >
                {"Already have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </form>
      {/* </Box> */}
    </Container>
  );
}

export default Register;
