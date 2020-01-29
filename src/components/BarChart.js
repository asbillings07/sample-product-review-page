import React from 'react'
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
  rating: {
    color: '#D3AF37'
  },
  button: {
    border: 'none',
    textDecoration: 'underline',
    color: '#D3AF37',
    cursor: 'pointer'
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

export const BarChart = ({ reviews, ratings }) => {
  const classes = useStyles()
  return (
    <>
      <div>
        <Typography>CUSTOMER REVIEWS</Typography>
      </div>
      <div>
        <Rating className={classes.rating} value={4} readOnly />
        <Typography variant='caption'>4 out of 5</Typography>
      </div>
      <Typography>4 reviews</Typography>
      <div>
        <Button className={classes.button}>5 Star</Button>
        <BorderLinearProgress
          className={classes.margin}
          variant='determinate'
          value={30}
        />
        <Button className={classes.button}>4 Star</Button>
        <BorderLinearProgress
          className={classes.margin}
          variant='determinate'
          color='secondary'
          valueBuffer={5}
          value={20}
        />
        <Button className={classes.button}>3 Star</Button>
        <BorderLinearProgress
          className={classes.margin}
          variant='determinate'
          color='secondary'
          value={20}
        />
        <Button className={classes.button}>2 Star</Button>
        <BorderLinearProgress
          className={classes.margin}
          variant='determinate'
          color='secondary'
          value={0}
        />
        <Button className={classes.button}>1 Star</Button>
        <BorderLinearProgress
          className={classes.margin}
          variant='determinate'
          color='secondary'
          value={0}
        />
      </div>
    </>
  )
}
