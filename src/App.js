import React from 'react'
import NavBar from './Component/Navbar';
import  Footer from "./Component/Footer";
import { Stack } from 'react-bootstrap';
import Carousell from './Component/Corousal';
function App() {
  return (
    <>
    <Stack>

    <NavBar  />
    <Carousell/>
    <Footer style={{ position: 'sticky', bottom: 0 }}/>
    </Stack>

    </>
  )
}

export default App