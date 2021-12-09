import Sidebar from '../components/sidebar'
import { InputNumber, Typography, Slider } from 'antd';
import { useRef, useState, useEffect } from 'react';
import styles from '../styles/Colors.module.css'
import { cmyk2rgb } from '../utils/cmyk.js';
import { hsvToHSL, HSVtoRGB } from '../utils/hsv.js';

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
  
  var r = 0, g = 0, b = 0;

  const onSetCMYK = () => {
    let rgb = cmyk2rgb(Math.abs(c), Math.abs(m), Math.abs(y), Math.abs(k));
    r = Math.round(rgb.r);
    g = Math.round(rgb.g);
    b = Math.round(rgb.b);
    
    if (c < 0 )
      r = -r;
    if (m < 0)
      g = -g;
    if (y < 0)
      b = -b; 
    

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var destX = 1;
    var destY = 1;
    var imageObj = document.getElementById('image')

    context.drawImage(imageObj, destX, destY);

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        var red = data[i]; // red
        var green = data[i + 1]; // green
        var blue = data[i + 2]; // blue
        // i+3 is alpha (the fourth element)
        data[i] = red + r;
        data[i + 1] = green + g;
        data[i + 2] = blue + b;
    }

    // overwrite original image
    context.putImageData(imageData, 0, 0);
    const hsl = hsvToHSL(h, s, v)

    setHsl(hsl)
  }

  const onSetHSV = () => {

    let rgb = HSVtoRGB(h, s, v);
    r = Math.round(rgb.r);
    g = Math.round(rgb.g);
    b = Math.round(rgb.b);

    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var destX = 1;
    var destY = 1;
    const imageObj = document.getElementById('image')

    context.drawImage(imageObj, destX, destY);

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        var red = data[i];
        var green = data[i + 1];
        var blue = data[i + 2];
        // i+3 is alpha (the fourth element)
        data[i] = red + r;
        data[i + 1] = green + g;
        data[i + 2] = blue + b;
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
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    var destX = 1;
    var destY = 1;
    const imageObj = document.getElementById('image')

    context.drawImage(imageObj, destX, destY);

    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4) {
        var blue = data[i + 2];
        data[i + 2] = (blue * lightness / 100 );
    }

    // overwrite original image
    context.putImageData(imageData, 0, 0);
    const hsl = hsvToHSL(h, s, v)

    setHsl(hsl)
  }, [lightness])

  return (
    <>
      <Sidebar title="Colors" double buttonName="Set HSV" onSetClick={onSetHSV} onButtonClick={onSetCMYK}>
        <div>
          <input ref={input} type="file" onChange={onImageUpload}/>
          <Title level={5}>CMYK</Title>
          <div className={styles.inputsWrapper}>
            <InputNumber min={-255} max={255} value={c} onChange={setC}/>
            <InputNumber min={-255} max={255} value={m} onChange={setM}/>
            <InputNumber min={-255} max={255} value={y} onChange={setY}/>
            <InputNumber min={0} value={k} onChange={setK}/>
          </div>
          <Title level={5} className={styles.title}>HSV</Title>
          <div className={styles.inputsWrapper}>
            <InputNumber min={0} max={1} value={h} step={0.01} onChange={setH}/>
            <InputNumber min={-1} max={1} value={s} step={0.01} onChange={setS}/>
            <InputNumber min={-1} max={1} value={v} step={0.01}  onChange={setV}/>
          </div>
        </div>
      </Sidebar>
      {/* Сanvas */}
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

