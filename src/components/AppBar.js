import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import SignUp from './Signup';
// import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import  Login  from './Login';
// import { Link } from 'react-router-dom';
import { useRoutes, A } from "hookrouter";

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    // menuButton: {
    //   marginRight: theme.spacing(2),
    // },
    title: {
      flexGrow: 1,
    },
  }));

const LoginAppBar = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
            {/* <IconButton edge="start"  color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton> */}
                <Typography variant="h6" className={classes.title} >
                    News
                </Typography>
                {/* <Button color="inherit" >Login</Button> */}
                {/* <Link to="/login"
                  variant="body2"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                >
                  Login
                </Link> */}
                <A href="/login">Login</A>
                <A href="/signup">Signup</A>
                {/* <Link to='/signup'
                  // component="button"
                  variant="body2"
                  onClick={() => {
                    console.info("I'm a button.");
                  }}
                >
                  Signup
                </Link> */}
                {/* <Button color="inherit">Signup</Button> */}
            </Toolbar>
            </AppBar>
            {/* <Login></Login> */}
            </div>
    );
}
export default LoginAppBar;