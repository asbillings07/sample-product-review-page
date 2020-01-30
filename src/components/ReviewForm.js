import React, { useState } from 'react'
import {
  TextField,
  Button,
  CardContent,
  Grid,
  Paper,
  Select,
  FormGroup,
  FormControl,
  FormHelperText,
  InputLabel
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { string as yupstring, object as yupobject } from 'yup'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  selectEmpty: { marginTop: theme.spacing(3) },
  spacer: { margin: theme.spacing(1) },
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

export const ReviewForm = ({ isModalOpen, reviews, updateReviews }) => {
  const classes = useStyles()

  const {
    register,
    triggerValidation,
    errors,
    handleSubmit,
    setValue
  } = useForm({
    validationSchema: ReviewFormSchema,
    submitFocusError: false
  })

  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [review, setReview] = useState('')

  const addReview = () => {
    const reviewObj = {
      name,
      rating,
      title,
      review
    }
    updateReviews(reviews.push(reviewObj))
  }

  return (
    <div>
      <InputLabel htmlFor='rating'>Rating</InputLabel>
      <Select
        native
        id='rating'
        label='rating'
        name='rating'
        className={classes.selectEmpty}
        value={rating}
        variant='outlined'
        onChange={e => {
          setRating(e.target.value)
        }}
      >
        <option value='' />
        <option value={1}>One Star</option>
        <option value={2}>Two Stars</option>
        <option value={3}>Three Stars</option>
        <option value={4}>Four Stars</option>
        <option value={5}>Five Stars</option>
      </Select>

      <InputLabel id='fullName'>Your name</InputLabel>
      <TextField
        label='enter text here'
        margin='dense'
        id='fullName'
        name='fullName'
        value={name}
        variant='outlined'
        onChange={e => {
          setValue('name', e.target.value, true)
          triggerValidation('name')
          setName(e.target.value)
        }}
        inputRef={register}
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
      />

      <InputLabel id='title'>Review title</InputLabel>
      <TextField
        label='enter text here'
        margin='dense'
        id='title'
        name='title'
        value={title}
        variant='outlined'
        onChange={e => {
          setValue('title', e.target.value, true)
          triggerValidation('title')
          setTitle(e.target.value)
        }}
        inputRef={register}
        error={!!errors.title}
        helperText={errors.title ? errors.title.message : ''}
      />

      <InputLabel id='review'>Write your review below</InputLabel>
      <TextField
        fullWidth
        label='enter text here'
        margin='dense'
        id='review'
        name='review'
        value={review}
        variant='outlined'
        multiline
        rows={4}
        onChange={e => {
          setValue('review', e.target.value, true)
          triggerValidation('review')
          setReview(e.target.value)
        }}
        inputRef={register}
        error={!!errors.review}
        helperText={errors.review ? errors.review.message : ''}
      />

      <Button
        variant='outlined'
        color='primary'
        className={(classes.button, classes.spacer)}
        onClick={() => isModalOpen(false)}
      >
        CANCEL
      </Button>
      <Button
        variant='contained'
        color='primary'
        className={(classes.button, classes.spacer)}
        onClick={() => handleSubmit(addReview)}
      >
        SUBMIT
      </Button>
    </div>
  )
}

ReviewForm.propTypes = {
  isModalOpen: PropTypes.func.isRequired,
  reviews: PropTypes.array.isRequired,
  updateReviews: PropTypes.func.isRequired
}
