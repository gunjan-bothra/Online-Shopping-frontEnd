import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFormFields } from "../libs/hooksLib";
import axios from 'axios';
import { A, navigate} from 'hookrouter';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Login() {
  const classes = useStyles();
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password : ''
  });
  const [login, setLogin] = useState({
      isAuth: false,
      token: "",
      authLoading: true,
      userId: "" 
  });

  const handleLogin = (event) => {
    event.preventDefault();
    const graphqlQuery = {
      query : `
        {
          login(email: "${fields.email}", password: "${fields.password}")
          {
            token
            userId
          }
        }
      ` 
      
    }
    try {
        const options = {
            url: 'http://localhost:8080/graphql',
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: graphqlQuery
          };
          
         axios(options)
            .then(resData => {
              if (resData.errors && resData.errors[0].status === 401) {
                throw new Error(
                  "Validation failed. Make sure the email address isn't used yet!"
                );
              }
              if (resData.errors && resData.errors[0].status !== 200 && resData.errors[0].status !== 201) {
                console.log('Error!');
                throw new Error('Creating a user failed!');
              }
              console.log('User logged in sucessfully');
              setLogin({
                isAuth: true,
                token: resData.data.data.login.token,
                authLoading: false,
                userId: resData.data.data.login.userId
              });
              navigate('/app');
            })
            .catch(err => {
              console.log(err);
            });
    }
    catch {

    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <Grid container spacing={2}>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                // autoComplete="email"
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                // autoComplete="current-password"
                onChange={handleFieldChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
