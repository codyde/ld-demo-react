import logo from './logo.svg';
import ldlogo from './ld-light.png'
import './App.css';
import { withLDProvider, useFlags } from 'launchdarkly-react-client-sdk';
import Header from './components/header';
import Login from './components/login'

function App() {
  const { animate, loginBox, newHeader, logoVersion } = useFlags()

  console.log(logoVersion)
  return (
    <div className="App">
      <header className="App-header">
        {newHeader ? (<Header />): (<div />)}
        {logoVersion ? (<img src={ldlogo} className={animate} alt="logo" />) : 
        (<img src={logo} className={animate} alt="logo" />)}
        {loginBox ? (<Login />) : (<div />)}
      </header>
    </div>
  );
}

export default withLDProvider({
  clientSideID: '61e0b1b8db33a21597362608',
  options: {
    bootstrap:'localStorage'
  },
})(App);
