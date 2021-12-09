import Sidebar from '../components/sidebar'
import { Plasma } from '../utils/plasma'
import styles from '../styles/Pfractal.module.css'

const Pfractal = () => {
  const onSetClick = (e) => {
    const plasma = new Plasma()

    plasma.init('canvas', 500, 500, 1, 0)

    plasma.draw()
  }

  return (
    <>
      <Sidebar title="Plasma fractal" onSetClick={onSetClick} />
      <canvas className={styles.canvas} id="canvas" width={500} height={500} />
    </>
  )
}

export default Pfractal
