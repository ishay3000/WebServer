import React from 'react'
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';


const Menu = (props) => {
    const { location } = props

    const logOut = () => {
        sessionStorage.removeItem('userLoggedIn')
        window.location = '/'
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" fixed='top' bg="dark" variant='dark'>
                <Container>

                    <Navbar.Brand href="#home">Smart Channel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        {/* <Nav className="mr-auto"> */}
                        <Nav activeKey={location.pathname} className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="#hardware">Hardware</Nav.Link>
                            <Nav.Link href="#config">Config</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                        </Nav>
                        <Nav>
                            <Button onClick={logOut}>Sign out</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar>
            <br/>
            <br/>
            <br/>
        </div>
    )
}

export default Menu;