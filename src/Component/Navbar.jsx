import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavBar() {
  const customNavbarLinkStyle = {
    color: 'white', // Set the text color to white
    marginRight: '15px', // Add some right margin for spacing
  };
  return (
    <Navbar fixed="top" expand="md" className="bg-dark">
  <Container>
    <Navbar.Brand style={customNavbarLinkStyle} href="#home">HimalayanTraverse</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link href="/" style={customNavbarLinkStyle}>Home</Nav.Link>
        <Nav.Link href="/treks" style={customNavbarLinkStyle}>Treks</Nav.Link>
        <Nav.Link href="/nearbytreks" style={customNavbarLinkStyle}>NearBy</Nav.Link>
        <Nav.Link href="/blogs" style={customNavbarLinkStyle}>Blogs</Nav.Link>
        <Nav.Link href="/faq" style={customNavbarLinkStyle}>FAQ</Nav.Link>
        <Nav.Link href="/contact" style={customNavbarLinkStyle}>Contact Us</Nav.Link>
        <Nav.Link href="/feed" style={customNavbarLinkStyle}>Post a Query</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}

export default NavBar;
