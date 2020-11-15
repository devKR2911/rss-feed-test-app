import { Navbar } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark" className="primary-navbar d-flex justify-content-center">
      <Navbar.Brand href="/">RSS FEEDER</Navbar.Brand>
    </Navbar>
  );
}
