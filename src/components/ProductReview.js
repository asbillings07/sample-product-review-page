import React, { useState, useEffect } from 'react'
import { Typography, Button, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import productImage from '../images/Software-Box-Mock-Up-optimized.jpg'
import { BarChart } from './BarChart'
import { ReviewCard } from './ReviewCard'
import { CustomModal } from './reusable-ui/modal'
import { ReviewForm } from './ReviewForm'
import axios from 'axios'
import { data } from '../data'
const useStyles = makeStyles({
  text: {
    marginTop: 25
  },
  list: {
    marginBottom: 25,
    marginTop: 20
  },
  image: {
    width: '50%',
    marginTop: 30
  },
  button: {
    marginRight: 10,
    padding: 13
  },
  buttonRight: {
    padding: 13
  },
  buttons: {
    marginLeft: '-21px'
  },
  spacing: {
    marginBottom: 15
  },
  padding: {
    padding: '0px 25px 0px 25px'
  },
  rating: {
    color: '#D3AF37'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export const ProductReview = ({ createToast }) => {
  const classes = useStyles()

  const [reviewData, setReviewData] = useState([])
  const [state, setState] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const getReviews = async () => {
    const res = await axios.get(
      'https://my.api.mockaroo.com/reviews.json?key=b5d05ab0'
    )
    // this is here just in case my free mock api runs over limit, then it will pull from local
    if (res.status === '200') {
      setReviewData(res.data)
      setState(res.data)
    } else {
      setReviewData(data)
      setState(data)
    }
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  useEffect(() => {
    getReviews()
  }, [])

  return (
    <Grid container>
      <div>
        <CustomModal
          isOpen={isOpen}
          handleClose={closeModal}
          title='ADD REVIEW'
        >
          <ReviewForm
            setState={setState}
            createToast={createToast}
            isModalOpen={setIsOpen}
            reviews={reviewData}
            updateReviews={setReviewData}
          />
        </CustomModal>
      </div>
      <div>
        <Grid className={classes.padding} container spacing={1}>
          <Grid item md={4}>
            <img className={classes.image} src={productImage} alt='product' />
            <BarChart
              createToast={createToast}
              reviews={reviewData}
              filterReviews={setReviewData}
              stateReviews={state}
            />
          </Grid>
          <Grid item md={8}>
            <Typography className={classes.text} variant='h3'>
              {' '}
              <strong>
                ROADIE COMMUICATOR - INCLUDES INSTALLATION SOFTWARE
              </strong>
            </Typography>
            <Typography variant='subtitle1'>
              by <strong>Roadie</strong>
            </Typography>
            <Typography variant='body1' className={classes.list}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <ul>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </li>
            </ul>
            <Grid className={classes.buttons} item container justify='flex-end'>
              <Button
                onClick={() => setIsOpen(true)}
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
            <Grid className={classes.card}>
              <ReviewCard data={reviewData} />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  )
}
