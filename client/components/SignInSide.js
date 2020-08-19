import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {auth} from '../store'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="/">ShopX</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage:
      'url(https://wallpaper.wiki/wp-content/uploads/2019/02/1msflight_rv6_kahoolawe.jpg)',
    backgroundRepeat: 'no-repeat',
    width: '40%',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    alignItems: 'center'
  },

  text: {
    fontFamily: ['Helvetica Neue', 'sans- serif'],
    fontWeight: 100,
    display: 'inline-block',
    margin: '3em',
    fontSize: '3em'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 2, 0),
    height: '60px'
  },
  checkBox: {
    margin: theme.spacing(0, 2, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  googleLogin: {
    margin: theme.spacing(4, 2, 4, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}))

const SignIn = props => {
  const {name, displayName, handleSubmit, error, isLoggedIn} = props
  const classes = useStyles()

  if (isLoggedIn) return null

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image}>
        <h1 className={classes.text}>ShopX</h1>
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h6">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit}
            name={name}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  className={classes.checkBox}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {error && error.response && (
              <div style={{color: 'red'}}> {error.response.data} </div>
            )}
            <a className={classes.googleLogin} href="/auth/google">
              {displayName} with Google
            </a>
            <Grid container>
              <Grid item xs>
                <Link to="/">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/signup">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
            <Box mt={20}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      console.log('handleSubmit -> evt.target', evt.target)
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export default connect(mapLogin, mapDispatch)(SignIn)
