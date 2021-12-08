import Sidebar from '../components/sidebar'
import { InputNumber, Typography, Slider } from 'antd';
import { useRef, useState, useEffect } from 'react';
import styles from '../styles/Colors.module.css'
import { hsvToHSL } from '../utils/hsvToRGB';
import { cmykToHsl } from '../utils/cmykToHsl';

const { Title } = Typography;

const Colors = () => {
  const [c, setC] = useState(0)
  const [m, setM] = useState(0)
  const [y, setY] = useState(0)
  const [k, setK] = useState(0)
  
  const [h, setH] = useState(0)
  const [s, setS] = useState(0)
  const [v, setV] = useState(0)

  const [lightness, setLightness] = useState(30)
  
  const [hsl, setHsl] = useState('')

  const colorBox = useRef(null)

  const onSetCMYK = () => {
    const box = colorBox.current
    const hsl = cmykToHsl(c, m, y, k)
    const color = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`

    box.style.backgroundColor = color
    setHsl(hsl)
  }

  const onSetHSV = () => {
    const box = colorBox.current
    const hsl = hsvToHSL(h, s, v)
    const color = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`

    box.style.backgroundColor = color
    setHsl(hsl)
  }

  useEffect(() => {
    const box = colorBox.current
    let color= `hsl(${hsl[0]}, ${hsl[1]}%, ${lightness}%)`

    box.style.backgroundColor = color
  }, [lightness])

  return (
    <>
      <Sidebar title="Colors" double buttonName="Set HSV" onSetClick={onSetHSV} onButtonClick={onSetCMYK}>
        <div>
          <Title level={5}>CMYK</Title>
          <div className={styles.inputsWrapper}>
            <InputNumber min={0} value={c} onChange={setC}/>
            <InputNumber min={0} value={m} onChange={setM}/>
            <InputNumber min={0} value={y} onChange={setY}/>
            <InputNumber min={0} value={k} onChange={setK}/>
          </div>
          <Title level={5} className={styles.title}>HSV</Title>
          <div className={styles.inputsWrapper}>
            <InputNumber min={0} value={h} onChange={setH}/>
            <InputNumber min={0} value={s} onChange={setS}/>
            <InputNumber min={0} value={v} onChange={setV}/>
          </div>
        </div>
      </Sidebar>
      {/* Canvas */}
      <div className={styles.sliderWrapper}>
        <div className={styles.color} ref={colorBox}/>
        <Title level={4}>Lightness</Title>
        <Slider defaultValue={30} value={lightness} onChange={setLightness} />
      </div>
    </>
  )
}

export default Colors

