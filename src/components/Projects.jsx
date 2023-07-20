import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import projImg1 from '../assets/img/project-img1.png';
import projImg2 from '../assets/img/project-img2.png';
import projImg3 from '../assets/img/project-img3.png';
import projImg4 from '../assets/img/project-img4.png';
import projImg5 from '../assets/img/project-img5.png';
import colorSharp2 from '../assets/img/color-sharp2.png';
import { ProjectCard } from "./ProjectCard";
import 'animate.css';
import TrackVisibility from "react-on-screen";

export const Projects = () => {

    const projects1 = [
        {
            title: "Weather App",
            description: "Design & Development",
            imgUrl: projImg1,
        },
        {
            title: "News App",
            description: "Design & Development",
            imgUrl: projImg2,
        },
        {
            title: "Contact Manager App",
            description: "Design & Development",
            imgUrl: projImg3,
        }
    ];

    const projects2 = [
        {
            title: "Personal Portfolio",
            description: "Design & Development",
            imgUrl: projImg4,
        },
        {
            title: "Restaurant Website",
            description: "Design & Development",
            imgUrl: projImg5,
        }
    ];

    return (
        <section className="project" id="project">
            <Container>
                <Row>
                    <Col>
                        <TrackVisibility>
                            {({ isVisible }) =>
                                <div className={isVisible ? "animate__animated animate__bounce" : ""}>
                                    <h2>Projects</h2>
                                    <p>Some of my projects are shown below.</p>
                                </div>}
                        </TrackVisibility>
                        <Tab.Container id="projects-tabs" defaultActiveKey="first">
                            <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Tab 1</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Tab 2</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Tab 3</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Row>
                                        {
                                            projects1.map((project, index) => {
                                                return (
                                                    <ProjectCard key={index}{...project} />
                                                )
                                            })
                                        }
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Row>
                                        {
                                            projects2.map((project, index) => {
                                                return (
                                                    <ProjectCard key={index}{...project} />
                                                )
                                            })
                                        }
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <p>Still working on it.</p>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
            </Container>
            <img className="background-image-right" src={colorSharp2} />
        </section>
    )
}