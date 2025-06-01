import { Container, Row, Col , Badge } from 'react-bootstrap';

function QuestionDisplay( props) {
    const qs= props.questions[0];
  return <Container fluid>
    <Row>
        <Col as='h2'> Question number {qs.id}</Col>
    </Row>
    <Row>
        <Col> {qs.text} </Col>
    </Row>
    </Container>
}

export default QuestionDisplay;