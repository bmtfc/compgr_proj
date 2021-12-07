import Sidebar from '../components/sidebar'
import { InputNumber, Typography, Button } from 'antd';
import { useState } from 'react';
import styles from '../styles/Bfractal.module.css'

const { Title } = Typography;

const Bfractal = () => {
  const [k, setK] = useState(3000)

  const onSetClick = (e) => {
    //TODO build canva
  }

  return (
    <>
      <Sidebar title="Brownian motion fractal" onSetClick={onSetClick}>
        <div className={styles.inputWrapper}>
          <Title level={5} className={styles.lable}>k = </Title>
          <InputNumber min={1} value={k} onChange={setK}/>
        </div>
        {/* Canvas */}
      </Sidebar>
    </>
  )
}

export default Bfractal
