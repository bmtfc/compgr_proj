import Sidebar from '../components/sidebar'
import { Row, Col, InputNumber } from 'antd';
import { useRef, useState } from 'react';
import styles from '../styles/Bfractal.module.css'
import { multiplyMatrices } from '../utils/matrix';


const Triangle = () => {
  const [AX, setAX] = useState(0)
  const [AY, setAY] = useState(0)
  const [BX, setBX] = useState(0)
  const [BY, setBY] = useState(0)
  const [CX, setCX] = useState(0)
  const [CY, setCY] = useState(0)

  const canvas = useRef(null)

function sleepFor(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* Do nothing */ }
}

  const onSetClick = (e) => {
    let i = 31;
    if (canvas.current.getContext) {
      const draw = () => {
        const ctx = canvas.current.getContext('2d');
        ctx.globalCompositeOperation = 'destination-over';
        ctx.clearRect(0, 0, 500, 500);
        ctx.beginPath();
        ctx.moveTo(A[0][0], 500-A[0][1]);
        ctx.lineTo(A[1][0], 500-A[1][1]);
        ctx.lineTo(A[2][0], 500-A[2][1]);
        ctx.closePath();
        ctx.fillStyle = "#FFCC00";
        ctx.fill();
        ctx.restore()

        const A = [[AX, AY, 1], [BX, BY, 1], [CX, CY, 1]];
        const x = 25;
        var k = 1;

        for(var i = 0; i < 8; i++){
          var a = k*Math.PI/24;
          console.log(a);
          var M1 = [[Math.cos(a), Math.sin(a), 1], [-Math.sin(a), Math.cos(a), 1], [1, 1, 0]]
          var A1 = multiplyMatrices(A, M1); // rotate 30deg
          A1[0][0] = A1[0][0] + k*x;
          A1[0][1] = A1[0][1] + k*x;
          A1[1][0] = A1[1][0] + k*x;
          A1[1][1] = A1[1][1] + k*x;
          A1[2][0] = A1[2][0] + k*x;
          A1[2][1] = A1[2][1] + k*x;
          
          ctx.clearRect(0, 0, 500, 500);
          ctx.beginPath();
          ctx.moveTo(A1[0][0], 500-A1[0][1]);
          ctx.lineTo(A1[1][0], 500-A1[1][1]);
          ctx.lineTo(A1[2][0], 500-A1[2][1]);
          ctx.closePath();
          ctx.fillStyle = "#FFCC00";
          ctx.fill();
          ctx.restore()
          k++;
        }
      }
      window.requestAnimationFrame(draw);
    }
  }

  return (
    <>
      <Sidebar title="Triangle" onSetClick={onSetClick}>
        <div className={styles.tableWrapper}>
          <Row gutter={18}>
            <Col span={4}>
            </Col>
            <Col span={7}><div className={styles.tableHeader}>X</div></Col>
            <Col span={7}><div className={styles.tableHeader}>Y</div></Col>
          </Row>
          <Row gutter={18}>
            <Col span={4}>
              A
            </Col>
            <Col span={7}>
              <InputNumber value={AX} onChange={setAX}/>
            </Col>
            <Col span={7}>
              <InputNumber value={AY} onChange={setAY}/>
            </Col>
          </Row>
          <Row gutter={18}>
            <Col span={4}>
              B
            </Col>
            <Col span={7}>
              <InputNumber value={BX} onChange={setBX}/>
            </Col>
            <Col span={7}>
              <InputNumber value={BY} onChange={setBY}/>
            </Col>
          </Row>
          <Row gutter={18}>
            <Col span={4}>
              C
            </Col>
            <Col span={7}>
              <InputNumber value={CX} onChange={setCX}/>
            </Col>
            <Col span={7}>
              <InputNumber value={CY} onChange={setCY}/>
            </Col>
          </Row>  
        </div>
      </Sidebar>
      <canvas className={styles.canvas} ref={canvas} width={500} height={500}/>
    </>
  )
}

export default Triangle
