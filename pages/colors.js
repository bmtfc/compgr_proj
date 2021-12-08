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
  const [imageUrl, setImageUrl] = useState('')

  const [lightness, setLightness] = useState(30)
  
  const [hsl, setHsl] = useState('')

  const onSetCMYK = () => {
    const hsl = cmykToHsl(c, m, y, k)

    setHsl(hsl)
  }

  const onSetHSV = () => {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var destX = 1;
    var destY = 1;
    const imageObj = document.getElementById('image')

    context.drawImage(imageObj, destX, destY);

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        var red = data[i]; // red
        var green = data[i + 1]; // green
        var blue = data[i + 2]; // blue
        // i+3 is alpha (the fourth element)
        data[i] = green;
        data[i + 1] = blue;
        data[i + 2] = red;
    }

    // overwrite original image
    context.putImageData(imageData, 0, 0);
    const hsl = hsvToHSL(h, s, v)

    setHsl(hsl)
  }

  const input = useRef(null)

  const onImageUpload = (e) => {
    const [file] = input.current.files
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  }

  useEffect(() => {

  }, [lightness])

  return (
    <>
      <Sidebar title="Colors" double buttonName="Set HSV" onSetClick={onSetHSV} onButtonClick={onSetCMYK}>
        <div>
          <input ref={input} type="file" onChange={onImageUpload}/>
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
        <div className={styles.imagesWrapper}>
          {imageUrl && <img id="image" src={imageUrl} alt="your image" className={styles.image} />}
          <canvas className={styles.canvas} id="canvas" width={300} height={300} />
        </div>
        <Title level={4}>Lightness</Title>
        <Slider defaultValue={30} value={lightness} onChange={setLightness} />
      </div>
    </>
  )
}

export default Colors

