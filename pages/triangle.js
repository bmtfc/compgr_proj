import Sidebar from '../components/sidebar'
import { Row, Col, InputNumber } from 'antd';
import { useRef, useState } from 'react';
import styles from '../styles/Bfractal.module.css'
import { multiplyMatrices } from '../utils/matrix';
import SkeletonInput from 'antd/lib/skeleton/Input';

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

        var A = [[AX, AY, 1], [BX, BY, 1], [CX, CY, 1]]

        ctx.beginPath();
        ctx.moveTo(A[0][0], 500-A[0][1]);
        ctx.lineTo(A[1][0], 500-A[1][1]);
        ctx.lineTo(A[2][0], 500-A[2][1]);
        ctx.closePath();
        ctx.fillStyle = "#FFCC00";
        ctx.fill();
        ctx.restore()

        var x = 1;
        var y = 1;
        const M1 = [[0.866, 0.5, 1], [-0.5, 0.866, 1], [1, 1, 0]]
        const M2 = [[1, 0, 0], [0, 1, 0], [x, y, 1]]
        const M = multiplyMatrices(M1, M2);
        console.log(M);
        console.log(A);

        for(var i = 0; i<2; i++ ){
          A = multiplyMatrices(A,M);
          console.log(A);
          sleepFor(2000);
          ctx.clearRect(0, 0, 500, 500);
          ctx.beginPath();
          ctx.moveTo(A[0][0], 500-A[0][1]);
          ctx.lineTo(A[1][0], 500-A[1][1]);
          ctx.lineTo(A[2][0], 500-A[2][1]);
          ctx.closePath();
          ctx.fillStyle = "#FFCC00";
          ctx.fill();
          ctx.restore()
        }

        /*
        if(i < 30) {
          window.requestAnimationFrame(draw);
        } else {
          ctx.beginPath();
          ctx.moveTo(AX, AY);
          ctx.lineTo(BX, BY);
          ctx.lineTo(CX, CY);
          ctx.closePath();
          ctx.fillStyle = "#FFCC00";
          ctx.fill();
          ctx.restore();
        }
        */
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
