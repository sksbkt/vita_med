"use client";
import { loginValidationSchema } from "@/constants/validations";
import { useAppSelector } from "@/hooks/useStore";
import { getValidAuthToken } from "@/lib/cookies";
import { useLoginMutation } from "@/lib/features/authSlice/authApiSlice";
import { RememberMe } from "@mui/icons-material";
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
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import * as yup from "yup";
import { string } from "yup";

function Login() {
  const { token } = getValidAuthToken();

  const { dic } = useAppSelector((state) => state.localeSlice);

  const { push } = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: loginValidationSchema(dic),
    onSubmit: async (values) => {
      try {
        const response = await login({
          userName: values.userName,
          password: values.password,
        }).unwrap();
        if (response) alert(JSON.stringify(response.token));
      } catch (error: unknown) {
        console.log("ERROR", error);
      }
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
          <Typography
            component="h1"
            variant="h5"
          >
            {dic.SIGN_IN}
          </Typography>

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
            label={dic.USER_PASSWORD}
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
              />
            }
            label={dic.REMEMBER_ME}
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
                {dic.FORGOT_PASSWORD}
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="/user/register"
                variant="body2"
              >
                {dic.SIGN_UP_TEXT}
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
