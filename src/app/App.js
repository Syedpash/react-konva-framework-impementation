import {Container, Row, Col} from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Shapes22 from '../containers/Shapes';
import ToolbarContainer from '../containers/ToolbarContainer';
import Tabbar from '../containers/TabbarContainer';
import ShapeTransform from '../containers/ShapeTransform';
import DrawCurve from '../containers/DrawCurve';
function App() {
  return (
    <Container fluid>
      <Row className="top-bar" noGutters>
        <p>This is Top Bar</p>
      </Row>

      <Row className="tab-bar" noGutters>
      {/* <Tabbar /> */}
      </Row>

      <Row className="workspace" noGutters>
          <Col lg={10} className="canvas" style={{border: "1px solid black"}}>
            {/* <ShapeTransform /> */}
          <Shapes22 />
          {/* <DrawCurve /> */}
          </Col>
          <Col lg={2} className="utility">
           <ToolbarContainer />
          </Col>
      </Row>
    </Container>
  );
}

export default App;
