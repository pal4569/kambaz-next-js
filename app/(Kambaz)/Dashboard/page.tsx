import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
export default function Dashboard() {
  return (
  <div id="wd-dashboard">
    <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
    <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
    <div id="wd-dashboard-courses">
      <Row xs={1} md={5} className="g-4">
      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
        <Card>
        <Link href="/Courses/1234/Home"
              className="wd-dashboard-course-link text-decoration-none text-dark">
          <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/>
          <CardBody>
          <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle>
          <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
            Full Stack software developer</CardText>
          <Button variant="primary">Go</Button>
          </CardBody>
        </Link>
        </Card>
      </Col>
      <Col className="wd-dashboard-course" style={{ width: "300px" }}> ... Another course ... </Col>
      <Col className="wd-dashboard-course" style={{ width: "300px" }}> ... Another course ... </Col>
      </Row>
    </div>
  </div>

);}
