import {Col, Container, Nav, NavDropdown, Navbar, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import Intro from './pages/ReactIntro';
import Tictactoe from './pages/Tictactoe';
import Product from './pages/Product';
import Gallery from './pages/Gallery';

export default function App() {
  return (
    <>    
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/" className='text-white'>Fadil x <i>Jagoo<span className='text-danger'>IT</span></i></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className='text-white'>Home</Nav.Link>
            <NavDropdown className='text-white' title={<span className="text-white">Latihan</span>} id="basic-nav-dropdown">
              <NavDropdown.Item href="/tictactoe">TicTacToe</NavDropdown.Item>
              <NavDropdown.Item href="/product">Product</NavDropdown.Item>
              <NavDropdown.Item href="/gallery">Gallery</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container className='py-4'>
    <Row className='justify-content-center'>
      <Col sm={10}>
        <Routes>
          <Route path='/' element={<Intro/>}/>
          <Route path='/tictactoe' element={<Tictactoe/>}/>
          <Route path='/product' element={<Product/>}/>
          <Route path='/gallery' element={<Gallery/>}/>
        </Routes>
      </Col>
    </Row>
    </Container>
    </>
  );
}
