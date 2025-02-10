import './App.css';

const HQLogo = () => {
  return (
    <div className="wedding-logo">
      <div className='wedding-logo-box'>
        <div className="logo-text" id='logo-text-1'>QUY</div>
        <div className="logo-text" id='logo-text-2'>& HI</div>
      </div>
      <div className="logo-text" id='logo-text-3'>EN</div>
    </div>

  );
};

const WelcomeMessage = () => {
  return (
    <div className="message-wrap">
      <span></span>
    </div>
  );
};

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-welcome">
        <h1><a href="https://revoloero.github.io/vqm-wedding">HOMEPAGE</a></h1>

        <HQLogo />
        <WelcomeMessage />
      </div>
    </div>
  );
};

function App() {
  return (
    <div>
      <Banner />
    </div>
  )
}

export default App;
