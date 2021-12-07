import Sidebar from '../components/sidebar'
import { InputNumber, Typography, Slider } from 'antd';
import { useState } from 'react';
import styles from '../styles/Colors.module.css'

const { Title } = Typography;

const Colors = () => {
  const [c, setC] = useState(0)
  const [m, setM] = useState(0)
  const [y, setY] = useState(0)
  const [k, setK] = useState(0)
  
  const [h, setH] = useState(0)
  const [s, setS] = useState(0)
  const [f, setF] = useState(0)

  const [lightness, setLightness] = useState(30)

  const onSetClick = (e) => {
    //TODO build canva
  }

  return (
    <>
      <Sidebar title="Colors" onSetClick={onSetClick}>
        <div>
          <Title level={5}>CMYK</Title>
          <div className={styles.inputsWrapper}>
            <InputNumber min={0} value={k} onChange={setC}/>
            <InputNumber min={0} value={k} onChange={setM}/>
            <InputNumber min={0} value={k} onChange={setY}/>
            <InputNumber min={0} value={k} onChange={setK}/>
          </div>
          <Title level={5} className={styles.title}>HSV</Title>
          <div className={styles.inputsWrapper}>
            <InputNumber min={0} value={k} onChange={setH}/>
            <InputNumber min={0} value={k} onChange={setS}/>
            <InputNumber min={0} value={k} onChange={setF}/>
          </div>
        </div>
      </Sidebar>
      {/* Canvas */}
      <div className={styles.sliderWrapper}>
          <Title level={4}>Lightness</Title>
         <Slider defaultValue={30} value={lightness} onChange={setLightness} />
      </div>
    </>
  )
}

export default Colors

