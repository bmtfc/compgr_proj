import styles from '../styles/Home.module.css'
import { Button } from 'antd';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Button type="primary" shape="round" size="large">
        <Link href="/bfractal">
          Brownian motion fractal
        </Link>
      </Button>
      <Button type="primary" shape="round" size="large">
        <Link href="/pfractal">
          Plasma fractal
        </Link>
      </Button>
      <Button type="primary" shape="round" size="large">
        <Link href="/colors">
          Colors
        </Link>
      </Button>
      <Button type="primary" shape="round" size="large">
        <Link href="/triangle">
          Triangle
        </Link>
      </Button>
    </div>
  )
}
