import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'

const products = JSON.parse(localStorage.getItem('cart')) || [
  {name: 'Product 1', desc: 'A nice thing', price: '$9.99'},
  {name: 'Product 2', desc: 'Another thing', price: '$3.45'},
  {name: 'Product 3', desc: 'Something else', price: '$6.51'},
  {name: 'Product 4', desc: 'Best thing of all', price: '$14.11'},
  {name: 'Shipping', desc: '', price: 'Free'}
]

const address = JSON.parse(localStorage.getItem('address'))

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(2)
  }
}))

export default function Review(props) {
  const classes = useStyles()
  const {state} = props

  const payments = [
    {name: 'Card type', detail: 'Visa'},
    {name: 'Card holder', detail: state.cardName},
    {name: 'Card number', detail: state.cardNumber},
    {name: 'Expiry date', detail: state.expDate}
  ]
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">
              ${product.price} X {product.qty}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $
            {products.reduce((acc, current) => {
              return acc + current.price * current.qty
            }, 0)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {`${address.firstName ? address.firstName : 'Unknown user'} ${
              address.lastName ? address.lastName : ''
            }`}
          </Typography>
          <Typography gutterBottom>
            {`${address.address}, ${address.city}, ${address.state}, ${address.zipCode}`}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
