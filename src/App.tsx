import './App.css'
import CheckboxList from './checkout'
import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <CheckboxList />
      </Box>
    </Container>

  )
}

export default App
