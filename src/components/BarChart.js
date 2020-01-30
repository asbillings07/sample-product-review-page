/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { LinearProgress, Button, Typography } from '@material-ui/core'
import { makeStyles, withStyles, lighten } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  margin: {
    margin: theme.spacing(1)
  },
  customerReview: {
    margin: 25
  },
  rating: {
    color: '#D3AF37',
    marginRight: 10,
    marginBottom: 17
  },
  ratingReview: {
    float: 'left',
    marginLeft: '-1px'
  },
  button: {
    border: 'none',
    textDecoration: 'underline',
    color: '#D3AF37',
    cursor: 'pointer'
  },
  div: {
    clear: 'both'
  },
  caption: {
    marginRight: 149
  },
  reviewNumber: {
    marginLeft: 5,
    marginBottom: 10
  },
  barGraph: {
    float: 'left',
    marginLeft: '-2px',
    marginRight: 6
  }
}))

const BorderLinearProgress = withStyles({
  root: {
    height: 30,
    width: 265,
    backgroundColor: lighten('#ffffff', 0.5),
    border: 'solid 1px #0006'
  },
  bar: {
    borderRadius: 0,
    backgroundColor: '#D3AF37'
  }
})(LinearProgress)

export const BarChart = ({
  reviews,
  filterReviews,
  stateReviews,
  createToast
}) => {
  const [filterList, setFilterList] = useState([])

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
  const reducer = (acc, cv) => acc + cv / ratings.length
  const avgRating = reviews.map(review => review.rating).reduce(reducer, 0)
  const avgReviewRating = parseInt(avgRating)
  const filterByRating = number => {
    let newList = []
    console.log(newList)
    console.log(ratings.includes(number))
    if (ratings.includes(number)) {
      newList = filterList.filter(review => review.rating === number)
    } else {
      newList = stateReviews
      createToast({
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
      <div className={classes.customerReview}>
        <Typography variant='h3'>
          {' '}
          <strong>CUSTOMER REVIEWS</strong>
        </Typography>
      </div>
      <div className={classes.ratingReview}>
        <Rating className={classes.rating} value={avgReviewRating} readOnly />
      </div>
      <div className={classes.caption}>
        <Typography variant='subtitle1'>{avgReviewRating} out of 5</Typography>
      </div>
      <div className={classes.div}>
        <div className={classes.reviewNumber}>
          <Typography>{ratings.length} reviews</Typography>
        </div>
      </div>
      <div className={classes.barGraph}>
        <Button onClick={() => filterByRating(5)} className={classes.button}>
          5 Star
        </Button>
      </div>

      <BorderLinearProgress
        className={classes.margin}
        variant='determinate'
        value={displayRatings(reviews, 5)}
      />
      <div className={classes.barGraph}>
        <Button onClick={() => filterByRating(4)} className={classes.button}>
          4 Star
        </Button>
      </div>

      <BorderLinearProgress
        className={classes.margin}
        variant='determinate'
        color='secondary'
        valueBuffer={5}
        value={displayRatings(reviews, 4)}
      />
      <div className={classes.barGraph}>
        <Button onClick={() => filterByRating(3)} className={classes.button}>
          3 Star
        </Button>
      </div>
      <BorderLinearProgress
        className={classes.margin}
        variant='determinate'
        color='secondary'
        value={displayRatings(reviews, 3)}
      />
      <div className={classes.barGraph}>
        <Button onClick={() => filterByRating(2)} className={classes.button}>
          2 Star
        </Button>
      </div>
      <BorderLinearProgress
        className={classes.margin}
        variant='determinate'
        color='secondary'
        value={displayRatings(reviews, 2)}
      />
      <div className={classes.barGraph}>
        <Button onClick={() => filterByRating(1)} className={classes.button}>
          1 Star
        </Button>
      </div>
      <BorderLinearProgress
        className={classes.margin}
        variant='determinate'
        color='secondary'
        value={displayRatings(reviews, 1)}
      />
    </>
  )
}
