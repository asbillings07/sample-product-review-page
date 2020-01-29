import React from 'react'
import { Typography, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Rating } from '@material-ui/lab'

const useStyles = makeStyles({
  spacing: {
    marginBottom: 15
  }
})

export const ReviewCard = ({ data }) => {
  const classes = useStyles()
  return (
    <div>
      {data.map(review => (
        <Card className={classes.spacing} key={review.id}>
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
