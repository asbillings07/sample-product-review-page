import React, { useState, useEffect } from 'react'
import { TextField, Button, Select, InputLabel } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { string as yupstring, object as yupobject } from 'yup'
import { makeStyles } from '@material-ui/core/styles'
import { Toast } from './reusable-ui/toast'

const useStyles = makeStyles(theme => ({
  selectEmpty: {
    marginTop: 8,
    marginBottom: 20
  },
  spacer: { margin: theme.spacing(1), float: 'right' },
  spacerLeft9: { marginLeft: theme.spacing(9) },
  spacerLeft: { marginLeft: theme.spacing(1) },
  fontWeightBold: { fontWeight: 'bold' },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}))

const ReviewFormSchema = yupobject().shape({
  name: yupstring().required('Required'),
  title: yupstring().required('Required'),
  review: yupstring().required('Required')
})

export const ReviewForm = ({
  isModalOpen,
  reviews,
  updateReviews,
  createToast
}) => {
  const classes = useStyles()

  const { register, triggerValidation, errors, handleSubmit } = useForm({
    validationSchema: ReviewFormSchema,
    submitFocusError: false
  })

  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [review, setReview] = useState('')
  const [reviewState, setReviewState] = useState([])

  const addReview = data => {
    data.id = parseInt(reviewState.length + 1)
    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    const yyyy = today.getFullYear()
    today = mm + '/' + dd + '/' + yyyy
    data.date = today
    data.rating = parseInt(data.rating)
    const newArr = reviewState.concat(data)
    console.log(newArr)
    updateReviews(newArr)
    createToast({
      isOpen: true,
      variant: 'info',
      message: 'Your review has been added!'
    })
    isModalOpen(false)
  }

  useEffect(() => {
    setReviewState(reviews)
  }, [reviews])

  return (
    <div>
      <form onSubmit={handleSubmit(addReview)}>
        <InputLabel htmlFor='rating'>Rating</InputLabel>
        <Select
          native
          id='rating'
          label='rating'
          name='rating'
          className={classes.selectEmpty}
          value={rating}
          inputRef={register}
          variant='outlined'
          onChange={e => {
            setRating(e.target.value)
          }}
        >
          <option value={1}>One star</option>
          <option value={2}>Two stars</option>
          <option value={3}>Three stars</option>
          <option value={4}>Four stars</option>
          <option value={5}>Five stars</option>
        </Select>

        <InputLabel id='name'>Your name</InputLabel>
        <TextField
          fullWidth
          placeholder='Enter text here...'
          margin='dense'
          className={classes.selectEmpty}
          id='name'
          name='name'
          value={name}
          variant='outlined'
          onChange={e => {
            triggerValidation('name')
            setName(e.target.value)
          }}
          inputRef={register({ pattern: /^[A-Za-z]+$/i })}
          error={!!errors.name}
          helperText={errors.name && 'Name is required'}
        />

        <InputLabel id='title'>Review title</InputLabel>
        <TextField
          fullWidth
          placeholder='Enter text here...'
          margin='dense'
          className={classes.selectEmpty}
          id='title'
          name='title'
          value={title}
          variant='outlined'
          onChange={e => {
            triggerValidation('title')
            setTitle(e.target.value)
          }}
          inputRef={register({ pattern: /^[A-Za-z]+$/i })}
          error={!!errors.title}
          helperText={errors.title && 'title is required'}
        />

        <InputLabel id='review'>Write your review below</InputLabel>
        <TextField
          fullWidth
          placeholder='Enter text here...'
          margin='dense'
          id='review'
          className={classes.selectEmpty}
          name='review'
          value={review}
          variant='outlined'
          multiline
          rows={4}
          onChange={e => {
            triggerValidation('review')
            setReview(e.target.value)
          }}
          inputRef={register}
          error={!!errors.review}
          helperText={errors.review && 'review is required'}
        />
        <Button
          variant='contained'
          color='primary'
          size='large'
          className={(classes.button, classes.spacer)}
          type='submit'
        >
          SUBMIT
        </Button>
        <Button
          variant='outlined'
          size='large'
          color='primary'
          className={(classes.button, classes.spacer)}
          onClick={() => isModalOpen(false)}
        >
          CANCEL
        </Button>
      </form>
    </div>
  )
}

ReviewForm.propTypes = {
  isModalOpen: PropTypes.func.isRequired,
  reviews: PropTypes.array.isRequired,
  updateReviews: PropTypes.func.isRequired
}
