import React, { useState } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { ProductReview } from './ProductReview'
import { Toast } from './reusable-ui/toast'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#008483'
    },
    secondary: {
      main: '#D3AF37'
    },
    common: { black: '#000', white: '#fff' },
    grey: { light: '#f5f5f5', main: '#e3e3e3' }
  }
})

export const App = () => {
  const [toast, setToast] = useState({
    isOpen: false,
    message: '',
    variant: 'success'
  })
  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') return
    setToast({ isOpen: false, message: '', variant: 'info' })
  }
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Toast
          data-testid='snackBarMessage'
          isOpen={toast.isOpen}
          variant={toast.variant}
          message={toast.message}
          onClose={handleCloseMessage}
        />
        <ProductReview createToast={setToast} />
      </div>
    </MuiThemeProvider>
  )
}
