import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import './App.scss';
import ToolBar from '../components/toolbar/ToolBar';
import HomePage from '../components/home/HomePage';
import EmergencyPage from '../components/emergency/EmergencyPage';
import ParkMapPage from '../components/ParkMapPage/ParkMapPage';
import WeatherForecastPage from '../components/weatherforecast/WeatherForecastPage';
import ConnectModal from '../components/connectModal/ConnectModal';
import RunWalkPage from '../components/runwalk/RunWalkPage';
import TrackDetail from '../components/trackDetail/TrackDetail';
import BodyweightPage from '../components/BodyweightPage/BodyweightPage';

const history = createHashHistory();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      connectModalOpen: false
    };
  }

  showConnectModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      connectModalOpen: true
    }));
  };

  hideConnectModal = () => {
    console.log('hide modal')
    this.setState((prevState) => ({
      ...prevState,
      connectModalOpen: false
    }));
  };

  render() {
    const { connectModalOpen } = this.state;
    return (
      <div className="App">
        <Router history={history}>
          <main className="appContentWrapper">
            <Route path="/emergency" exact component={EmergencyPage} />
            <Route path="/map" exact component={ParkMapPage} />
            <Route path="/weather" exact component={WeatherForecastPage} />
            <Route path="/runwalk" exact component={RunWalkPage} />
            <Route path="/runwalk/track/:trackId" exact component={TrackDetail} />
            <Route path="/bodyweight" exact component={BodyweightPage} />
            <Route path="/" exact component={HomePage} />
          </main>
          <ToolBar history={history} showConnectModal={this.showConnectModal} />
          { connectModalOpen ? <ConnectModal closeConnectModal={this.hideConnectModal} /> : null }
        </Router>
      </div>
    );
  }
}

export default App;