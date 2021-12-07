import styles from '../styles/Sidebar.module.css'

import { Typography, Button } from 'antd';
import Link from 'next/link';

const { Title } = Typography;

const Sidebar = ({children, title, onSetClick}) => {
  return (
    <div className={styles.container}>
      <Title level={3}>{title}</Title>
      {children}
      <div className={styles.buttonWrapper}>
        <Button type="primary" shape="round" size="large" onClick={onSetClick}>
          Set
        </Button>
        <Button type="primary" danger shape="round" size="large">
          <Link href="/">
            Back
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
