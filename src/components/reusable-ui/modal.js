import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'
import PropTypes from 'prop-types'

export const CustomModal = ({
  isOpen,
  handleClose,
  title,
  subtitle,
  children
}) => {
  return (
    <>
      <Dialog
        maxWidth='md'
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='max-width-dialog-title'
      >
        <DialogTitle id='max-width-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{subtitle}</DialogContentText>
          {children}
        </DialogContent>
      </Dialog>
    </>
  )
}

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.element.isRequired
}
