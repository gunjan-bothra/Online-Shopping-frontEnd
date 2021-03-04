import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { useFormFields } from "../libs/hooksLib";
import axios from 'axios';
import {A, navigate} from 'hookrouter';
import Login from './Login';

// const routes = {
//   '/login': () => <Login />
// };

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

const SignUp = (props) =>{
  const classes = useStyles();
  const [fields, handleFieldChange] = useFormFields({
    firstName : '',
    lastName : '',
    email: '',
    password : '',
    confirmPassword: ''
  });
  const [result, setData] = useState({
        data:[],
        isAuth: false,
        loading:false,
        error:""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const graphqlQuery = {
      query: `
        mutation {
          createUser(userInput: {
            firstName: "${fields.firstName}",
            lastName: "${fields.lastName}",
            email: "${fields.email}",
            password: "${fields.password}"
          }) {
            _id
            email
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
            // {
            //     'firstName' : fields.firstName,
            //     'lastName' : fields.lastName,
            //     'email': fields.email,
            //     'password' : fields.password,
            //     'confirmPassword': fields.confirmPassword
            // }
          };
          
         axios(options)
            .then(res => {
              if (res.errors && res.errors[0].status === 422) {
                throw new Error(
                  "Validation failed. Make sure the email address isn't used yet!"
                );
              }
              if (res.errors && res.errors[0].status !== 200 && res.errors[0].status !== 201) {
                console.log('Error!');
                throw new Error('Creating a user failed!');
              }
              setData({
                data:res,
                isAuth:true,
                loading:false,
                error:""
              }); 
              navigate('/login');
            })
            // .then(resData => {
            //   console.log(resData);
            // //   this.setState({ isAuth: false, authLoading: false });
            // //   this.props.history.replace('/');
            // })
            .catch(err => {
              console.log(err);
              setData({
                data:[],
                isAuth:false,
                loading:false,
                error:err
              });
            //   this.setState({
            //     isAuth: false,
            //     authLoading: false,
            //     error: err
            //   });
            });
    }
    catch {

    }
  }

  // useEffect = () => {
  //   useRedirect('/', '/greeting');
  //   const routeResult = useRoutes(routes);
  // };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                autoComplete="current-password"
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={handleFieldChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
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
          <Grid container justify="flex-end">
            <Grid item>
              {/* <Link to='login'>
                  
                Already have an account? Sign in
              </Link> */}
              <A href="/login">Already have an account? Sign in</A>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;