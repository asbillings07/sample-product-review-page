/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { LinearProgress, Button, Typography, Snackbar } from '@material-ui/core'
import { makeStyles, withStyles, lighten } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'
import { Toast } from './reusable-ui/toast'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
  },
  rating: {
    color: '#D3AF37',
    marginRight: 20,
    marginBottom: 17
  },
  button: {
    border: 'none',
    textDecoration: 'underline',
    color: '#D3AF37',
    cursor: 'pointer'
  },
  div: {
    marginTop: 25
  }
}))

const BorderLinearProgress = withStyles({
  root: {
    height: 45,
    backgroundColor: lighten('#D3AF37', 0.5)
  },
  bar: {
    borderRadius: 0,
    backgroundColor: '#D3AF37'
  }
})(LinearProgress)

export const BarChart = ({ reviews, filterReviews, stateReviews }) => {
  const [filterList, setFilterList] = useState([])
  const [toast, setToast] = useState({
    isOpen: false,
    message: '',
    variant: 'success'
  })
  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') return
    setToast({ isOpen: false, message: '', variant: 'info' })
  }
  useEffect(() => {
    setFilterList(reviews)
    filterReviews(reviews)
  }, [filterReviews, reviews])

  const displayRatings = (array, number) => {
    const rating = array
      .map(reviews => reviews.rating)
      .filter(rate => rate === number).length
    return rating * 20
  }
  const ratings = reviews.map(review => review.rating)

  const avgRating = reviews
    .map(review => review.rating)
    .reduce((acc, cv) => acc + cv / ratings.length, 0)

  const filterByRating = number => {
    let newList = []
    console.log(newList)
    console.log(ratings.includes(number))
    if (ratings.includes(number)) {
      newList = filterList.filter(review => review.rating === number)
    } else {
      newList = stateReviews
      setToast({
        isOpen: true,
        variant: 'info',
        message: 'No reviews based on that filter, reseting reviews'
      })
    }
    setFilterList(newList)
    filterReviews(newList)
  }

  const classes = useStyles()
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={toast.isOpen}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
      >
        <Toast
          data-testid='snackBarMessage'
          variant={toast.variant}
          message={toast.message}
          onClose={handleCloseMessage}
        />
      </Snackbar>
      <div className={classes.div}>
        <Typography variant='h3'>
          {' '}
          <strong>CUSTOMER REVIEWS</strong>
        </Typography>
      </div>
      <div className={classes.div}>
        <Rating className={classes.rating} value={avgRating} readOnly />
        <Typography variant='caption'>{avgRating} out of 5</Typography>
      </div>
      <Typography>{ratings.length} reviews</Typography>
      <div className={classes.div}>
        <Button onClick={() => filterByRating(5)} className={classes.button}>
          5 Star
        </Button>
        <BorderLinearProgress
          className={classes.margin}
          variant='determinate'
          value={displayRatings(reviews, 5)}
        />
        <Button onClick={() => filterByRating(4)} className={classes.button}>
          4 Star
        </Button>
        <BorderLinearProgress
          className={classes.margin}
          variant='determinate'
          color='secondary'
          valueBuffer={5}
          value={displayRatings(reviews, 4)}
        />
        <Button onClick={() => filterByRating(3)} className={classes.button}>
          3 Star
        </Button>
        <BorderLinearProgress
          className={classes.margin}
          variant='determinate'
          color='secondary'
          value={displayRatings(reviews, 3)}
        />
        <Button onClick={() => filterByRating(2)} className={classes.button}>
          2 Star
        </Button>
        <BorderLinearProgress
          className={classes.margin}
          variant='determinate'
          color='secondary'
          value={displayRatings(reviews, 2)}
        />
        <Button onClick={() => filterByRating(1)} className={classes.button}>
          1 Star
        </Button>
        <BorderLinearProgress
          className={classes.margin}
          variant='determinate'
          color='secondary'
          value={displayRatings(reviews, 1)}
        />
      </div>
    </>
  )
}
