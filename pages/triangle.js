import Sidebar from '../components/sidebar'
import { Row, Col, InputNumber } from 'antd';
import { useRef, useState } from 'react';
import styles from '../styles/Bfractal.module.css'

const Triangle = () => {
  const [AX, setAX] = useState(0)
  const [AY, setAY] = useState(0)
  const [BX, setBX] = useState(0)
  const [BY, setBY] = useState(0)
  const [CX, setCX] = useState(0)
  const [CY, setCY] = useState(0)

  const canvas = useRef(null)

  const onSetClick = (e) => {
    let i = 1;
    let x = 0;
    let y = 0;
    if (canvas.current.getContext) {
      const draw = () => {
        const ctx = canvas.current.getContext('2d');
        ctx.globalCompositeOperation = 'destination-over';
        ctx.clearRect(0, 0, 500, 500);

        ctx.beginPath();
        ctx.moveTo(AX, AY);
        ctx.lineTo(BX, BY);
        ctx.lineTo(CX, CY);
        ctx.closePath();
        ctx.fillStyle = "#FFCC00";
        ctx.fill();

        ctx.restore();

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
