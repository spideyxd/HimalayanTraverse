import React from 'react'
import NavBar from './Component/Navbar';
import  Footer from "./Component/Footer";
import { Stack } from 'react-bootstrap';
import Carousell from './Component/Corousal';
import TrekDistributionChart from './Component/TrekDistributionChart';
import Home from "./Component/Home";

function App() {
  return (
    <>
    <Stack>

    <NavBar  />

    <Home/>
    <TrekDistributionChart />
    {/* <Carousell/> */}
    
    <Footer style={{ position: 'sticky', bottom: 0 }}/>
    </Stack>

    </>
  )
}

export default App