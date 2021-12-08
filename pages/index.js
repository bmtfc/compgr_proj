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
            <Button type="primary" shape="round" size="large">
        <Link href="/info">
          Info
        </Link>
      </Button>
    </div>
  )
}

//TODO пофіксити розміщення тексту на сторінці info, щоб був один під одним
//TODO додати кольорий фон для сайдбара і головної частини вікна (якийсь сіро синій, мб як в мене на фігмі)
//TODO на головній сторінці зробити кнопки по центру
//TODO на сторінці з рухом трикутника додати повзунок (межі 0__12) як к-сть ітерацій в циклі
