import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { ProductReview } from './ProductReview'

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
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <ProductReview />
      </div>
    </MuiThemeProvider>
  )
}
