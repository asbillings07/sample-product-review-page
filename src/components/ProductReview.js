import React, { useState, useEffect } from 'react'
import { Typography, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import productImage from '../images/Software-Box-Mock-Up.jpg'
import { BarChart } from './BarChart'
import { ReviewCard } from './ReviewCard'
import axios from 'axios'

const useStyles = makeStyles({
  text: {
    marginTop: 25
  },
  list: {
    marginBottom: 25
  },
  image: {
    width: '100%',
    height: 500,
    margin: 25
  },
  button: {
    marginRight: 10,
    padding: 13
  },
  buttonRight: {
    marginRight: 115,
    padding: 13
  },
  card: {
    margin: 10
  },
  spacing: {
    marginBottom: 15
  },
  rating: {
    color: '#D3AF37'
  }
})
export const ProductReview = () => {
  const classes = useStyles()

  const [reviewData, setReviewData] = useState([])
  const getReviews = async () => {
    const res = await axios.get(
      'https://my.api.mockaroo.com/reviews.json?key=b97913e0'
    )
    console.log(res.data)
    setReviewData(res.data)
  }
  useEffect(() => {
    getReviews()
  }, [])
  // const [value, setValue] = useState(2)
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <img className={classes.image} src={productImage} alt='product' />
          <BarChart />
        </Grid>
        <Grid item xs={8}>
          <Typography className={classes.text} variant='h3'>
            {' '}
            <strong>ROADIE COMMUICATOR - INCLUDES INSTALLATION SOFTWARE</strong>
          </Typography>
          <Typography variant='caption'>
            by <strong>Roadie</strong>
          </Typography>
          <Typography variant='body1' className={classes.list}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            <br />
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </li>
          </Typography>
          <Grid
            item
            container
            direction='row'
            justify='flex-end'
            alignItems='center'
          >
            <Button
              className={classes.button}
              color='primary'
              variant='outlined'
            >
              LEAVE REVIEW
            </Button>
            <Button
              color='primary'
              variant='contained'
              className={classes.buttonRight}
            >
              ADD TO CART
            </Button>
          </Grid>

          <Grid className={classes.card} container spacing={3}>
            <Grid item xs={4}>
              <ReviewCard data={reviewData} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
