import React from 'react'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { Close, Info, CheckCircle, Warning } from '@material-ui/icons'
import ErrorIcon from '@material-ui/icons/Error'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { amber, green } from '@material-ui/core/colors'

/** Material UI Component holds a toast message content. Use inconjunction with the SnackBar component  */
const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const variantIcon = {
  success: CheckCircle,
  warning: Warning,
  error: ErrorIcon,
  info: Info
}

export const Toast = ({ className, message, onClose, variant, ...other }) => {
  const classes = useStyles1()

  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby='client-snackbar'
      message={
        <span id='client-snackbar' className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key='close'
          aria-label='close'
          color='inherit'
          onClick={onClose}
        >
          <Close className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  )
}

Toast.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired
}
