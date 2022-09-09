import Link from "next/link";
import classes from "../styles/TopMenu.module.sass"
import {TopMenu} from "../interfaces/TopMenu"
import {useEffect, useState} from "react"
import {NextPageContext} from "next"
import {Container, Nav, Placeholder, Navbar, Row, Offcanvas} from "react-bootstrap"

export function TopMenu({topMenuSections: serverProps}: TopMenu){
    const [topMenuSections, setTopMenuSections] = useState()
    useEffect(() => {
        async function load(){
            const response = await fetch(`${process.env.API_URL}/topMenuSections`)
            const data = await response.json()

            setTopMenuSections(data)
        }
        if (!serverProps)
            load()
    }, [])

    if (!topMenuSections){
        return (
            <Container fluid className={classes.topMenuContainer}>
                <Row>
                    <Placeholder as={Navbar} className={classes.placeholder}></Placeholder>
                </Row>
            </Container>
        )
    }

    return (
        <Container fluid className={classes.topMenuContainer}>
            <Row>
                <Navbar expand="md" variant={'dark'}>
                    <Container>
                        <Link href={"/"} passHref>
                            <Navbar.Brand href="/">Next.JS</Navbar.Brand>
                        </Link>
                        <Navbar.Toggle aria-controls="offcanvas-navbar-nav" />
                        <Navbar.Collapse id="offcanvas-navbar-nav">
                            <Navbar.Offcanvas
                            id={'offcanvas-navbar-nav'}
                            aria-labelledby={'offcanvas-label-navbar-nav'}
                            placement={'start'}
                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id={'offcanvas-label-navbar-nav'}>
                                        Offcavas
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body>
                                    <Container className={'ms-2'}>
                                        <Nav className={'justify-content-start'}>
                                            {topMenuSections.map(topMenuSection => (
                                                <Nav.Item className={'mx-2'} key={topMenuSection.id}>
                                                    <Link href={topMenuSection.link} passHref>
                                                        <Nav.Link>{topMenuSection.title}</Nav.Link>
                                                    </Link>
                                                </Nav.Item>
                                            ))}
                                        </Nav>
                                    </Container>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Row>
        </Container>
    )
}

TopMenu.getInitialProps = async (req: NextPageContext) => {
    if (!req) return {topMenuSections: null}
    const response = await fetch(`${process.env.API_URL}/topMenuSections`)
    const topMenuSections: TopMenu = await response.json()
    return topMenuSections
}
