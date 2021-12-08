import Sidebar from '../components/sidebar'
import { InputNumber, Typography, Button } from 'antd';
import { useRef, useState } from 'react';
import styles from '../styles/Bfractal.module.css'

const { Title } = Typography;

const Bfractal = () => {
  const [k, setK] = useState(3000)
  const canvas = useRef(null)

  const onSetClick = (e) => {
    const ctx = canvas.current.getContext('2d');
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 700, 700);

    let previousX = 350
    let previousY = 350

    for ( let j = 1; j < k; j++ ) {
      setTimeout(() => {
        ctx.beginPath();
        ctx.moveTo(previousX, previousY);
        previousX = previousX + Math.random() * (6 + 6) -6
        previousY = previousY + Math.random() * (6 + 6) -6

        if (previousX <= 0) {
          previousX = 0
        }
        if (previousY <= 0) {
          previousY = 0
        }
        if (previousX >= 700) {
          previousX = 700
        }
        if (previousY >= 700) {
          previousY = 700
        }

        ctx.lineTo(previousX, previousY);
        ctx.closePath();
        ctx.stroke();
      }, 1000);
    }
  }

  return (
    <>
      <Sidebar title="Brownian motion fractal" onSetClick={onSetClick}>
        <div className={styles.inputWrapper}>
          <Title level={5} className={styles.lable}>k = </Title>
          <InputNumber min={1} value={k} onChange={setK}/>
        </div>
      </Sidebar>
      <canvas className={styles.canvas} ref={canvas} width={700} height={700}/>
    </>
  )
}

export default Bfractal
