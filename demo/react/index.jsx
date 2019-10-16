const { Router, Route, Link, HashRouter } = ReactRouterDOM;

const Home = () => <div><h1>Home</h1><p>Welcome the our demo page</p></div>
const About = () => <div><h1>About</h1></div>


class App extends React.Component {
  componentWillMount() {
    const { history } = this.props;
    this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    this.handleLocationChange(history.location);
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  }

  handleLocationChange = (location) => {
    // 路由变化时执行 sensors.quick("autoTrackSinglePage");
    console.log('changed:', location);
    sensors.quick("autoTrackSinglePage");
  }

  render() {
    // Render the rest of the application with its routes
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </div>
    );
  }
}

class BasicExample extends React.Component {
  render() {
    return (
      <HashRouter>
        <Route component={App} />
      </HashRouter>
    );
  }
}

ReactDOM.render(
  <BasicExample />,
  document.getElementById('app')
);