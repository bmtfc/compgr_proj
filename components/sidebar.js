import styles from '../styles/Sidebar.module.css'

import { Typography, Button } from 'antd';
import Link from 'next/link';

const { Title } = Typography;

const Sidebar = ({children, title, onSetClick, double, buttonName, onButtonClick}) => {
  return (
    <div className={styles.container}>
      <Title level={3}>{title}</Title>
      {children}
      <div className={styles.buttonWrapper}>
        {double && 
          <Button type="primary" shape="round" size="large" onClick={onButtonClick}>
            Set CMYK
          </Button>
        }
        <Button type="primary" shape="round" size="large" onClick={onSetClick}>
          {buttonName || 'Set'}
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
