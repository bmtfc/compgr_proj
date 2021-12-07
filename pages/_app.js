import '../styles/globals.css'
import Wrapper from '../components/wrapper.js'

function MyApp({ Component, pageProps }) {
  return <Wrapper><Component {...pageProps} /></Wrapper>
}

export default MyApp
