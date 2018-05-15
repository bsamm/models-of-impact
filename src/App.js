import React, { Component } from 'react';
import { Container, Columns, Hero, Heading } from 'react-bulma-components/full';
import ReactGA from 'react-ga';

import './App.css';

import impactsData from './data/impacts.json';
import revenuesData from './data/revenues.json';

import ModelTile from './components/ModelTile/ModelTile';
import RoundController from './components/RoundController/RoundController';

ReactGA.initialize('UA-51847402-9');
ReactGA.pageview(window.location.pathname + window.location.search);

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleOthersForm = this.toggleOthersForm.bind(this);
    this.addOtherFactor = this.addOtherFactor.bind(this);
    this.removeOtherFactor = this.removeOtherFactor.bind(this);
    this.state = {
      othersFormHidden: true,
      othersData: [],
    };
  }

  toggleOthersForm() {
    this.setState({ othersFormHidden: !this.state.othersFormHidden });
  }

  addOtherFactor(value) {
    if (value.length > 0) {
      if (this.state.othersData.length < 20) {
        const id = (`0${this.state.othersData.length + 1}`).slice(-2);
        const otherFactor = {
          id,
          name: value,
          description: '',
        };
        this.setState({
          othersData: this.state.othersData.concat([otherFactor]),
        });
      } else {
        this.toggleOthersForm();
      }
    }
  }

  removeOtherFactor(component) {
    const data = this.state.othersData;
    const cId = Number(component.state.id);
    const cIdx = cId - 1;
    data.splice(cIdx, 1);
    this.reassignIDs(data);
  }

  reassignIDs(data) {
    data.forEach((i) => {
      const item = i;
      const pos = data.indexOf(item);
      item.id = (`0${pos + 1}`).slice(-2);
    });
    this.updateData(data);
  }

  updateData(data) {
    this.setState({ othersData: data });
  }

  render() {
    return (
      <div className="app">
        <Hero color="danger">
          <Hero.Body>
            <Container fluid>
              <Heading size={2}>
                MODELS OF IMPACT
              </Heading>
              <Heading subtitle>
                The business model design game created by <a href="https://www.mattmanos.com/">Matthew Manos</a> at <a href="http://verynice.co/">verynice</a>. <a href="http://www.modelsofimpact.co/">Learn More</a>.
              </Heading>
              <Heading className="is-7">
                This site was created by Brandon Sammons (<a href="https://github.com/bsamm">@bsamm</a>) under a <a href="https://creativecommons.org/licenses/by-nd/4.0/">Attribution-NoDerivatives 4.0 International</a> license.
              </Heading>
            </Container>
          </Hero.Body>
        </Hero>
        <Container fluid>
          <Columns>
            <Columns.Column size="one-third">
              <div className="others-card">
                <ModelTile
                  modelType="others"
                  data={this.state.othersData}
                  othersFormHidden={this.state.othersFormHidden}
                  addOtherFactorFunction={this.addOtherFactor}
                  removeOtherFactorFunction={this.removeOtherFactor}
                  enableDescription={false}
                />
              </div>
            </Columns.Column>
            <Columns.Column>
              <div className="impacts-card">
                <ModelTile data={impactsData} modelType="impact" enableDescription />
              </div>
            </Columns.Column>
            <Columns.Column>
              <div className="revenues-card">
                <ModelTile data={revenuesData} modelType="revenue" enableDescription />
              </div>
            </Columns.Column>
          </Columns>
        </Container>
        <RoundController
          toggleOthersFormFunction={this.toggleOthersForm}
          othersFormHidden={this.state.othersFormHidden}
          othersData={this.state.othersData}
        />
      </div>
    );
  }
}

export default App;
