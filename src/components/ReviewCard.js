import React from 'react'
import { Typography, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: '45%',
    height: 287,
    padding: 2,
    margin: '10px 10px 5px 5px',
    border: 'solid 1px #0006'
  },
  div: {
    display: 'flex',
    direction: 'row',
    flexWrap: 'wrap'
  },
  spacing: {
    marginBottom: 15
  },
  rating: {
    color: '#D3AF37'
  }
}))

export const ReviewCard = ({ data }) => {
  const classes = useStyles()
  return (
    <div className={classes.div}>
      {data.map(review => (
        <Card className={classes.gridList} key={review.id}>
          <CardContent>
            <Typography variant='subtitle1'>
              <strong>{review.title}</strong>
            </Typography>
            <Typography variant='caption'>
              by {review.name} on {review.date}
            </Typography>
            <Rating className={classes.rating} value={review.rating} readOnly />
            <Typography variant='body1'>{review.review}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
