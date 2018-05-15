import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Level, Heading, Box, Button } from 'react-bulma-components/full';
import renderHTML from 'react-render-html';
import ReactGA from 'react-ga';
import _ from 'lodash';

import './RoundController.css';

import impactsData from '../../data/impacts.json';
import revenuesData from '../../data/revenues.json';

class RoundController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleOthersFormFunction: props.toggleOthersFormFunction,
      othersFormHidden: props.othersFormHidden,
      othersData: props.othersData,
      roundOneString: '',
      roundTwoString: '',
      roundThreeString: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      othersFormHidden: nextProps.othersFormHidden,
      othersData: nextProps.othersData,
    });
  }

  getValue(round, dataType) {
    let data = {};
    let randomRMStringFull = '';
    switch (dataType) {
      case 'OF':
        data = this.state.othersData;
        break;
      case 'IM':
        data = impactsData;
        break;
      case 'RM':
        data = revenuesData;
        break;
      default:
        data = [];
    }
    _.times(round, () => {
      const randomRM = _.sample(data);
      const randomRMString = `<span class="round-model-number">${randomRM.id}</span> ${randomRM.name}`;
      randomRMStringFull = `${randomRMStringFull} ${randomRMString}`;
      return randomRMStringFull;
    });
    return randomRMStringFull;
  }

  playRound(round) {
    ReactGA.event({
      category: 'Round ' + round,
      action: 'Someone played a round, round ' + round
    });
    if (this.state.othersData.length > 0) {
      const randomOFString = this.getValue(round, 'OF');
      const randomIMString = this.getValue(round, 'IM');
      const randomRMString = this.getValue(round, 'RM');
      this.displayRound(randomOFString, randomIMString, randomRMString, round);
    }
  }

  displayRound(OFString, IMString, RMString, round) {
    const stringForState = (
      <p className="round-items">
        <span className="round-model-type">OF:</span> {renderHTML(OFString)} <br />
        <span className="round-model-type">IM:</span> {renderHTML(IMString)} <br />
        <span className="round-model-type">RM:</span> {renderHTML(RMString)}
      </p>
    );
    switch (round) {
      case 1:
        this.setState({
          roundOneString: stringForState,
        });
        break;
      case 2:
        this.setState({
          roundTwoString: stringForState,
        });
        break;
      case 3:
        this.setState({
          roundThreeString: stringForState,
        });
        break;
      default:
    }
  }

  render() {
    const button = this.state.othersFormHidden ? (
      <Button color="info" onClick={this.state.toggleOthersFormFunction}>+ Add</Button>
    ) : (
      <Button color="danger" onClick={this.state.toggleOthersFormFunction}>x</Button>
    );
    return (
      <Box>
        <Level renderAs="nav">
          <Level.Item style={{ textAlign: 'center' }}>
            <div>
              <Heading renderAs="p" heading>
                Add 20 Other Factors
              </Heading>
              <Heading renderAs="p">
                { button }
              </Heading>
            </div>
          </Level.Item>
          <Level.Item style={{ textAlign: 'center' }}>
            <div>
              <Heading renderAs="p" heading>
                Randomly selects One
              </Heading>
              <Heading renderAs="p">
                <Button color="danger" onClick={() => { this.playRound(1); }} >Round 1</Button>
              </Heading>
              {this.state.roundOneString}
            </div>
          </Level.Item>
          <Level.Item style={{ textAlign: 'center' }}>
            <div>
              <Heading renderAs="p" heading>
                Randomly selects Two
              </Heading>
              <Heading renderAs="p">
                <Button color="danger" onClick={() => { this.playRound(2); }}>Round 2</Button>
              </Heading>
              {this.state.roundTwoString}
            </div>
          </Level.Item>
          <Level.Item style={{ textAlign: 'center' }}>
            <div>
              <Heading renderAs="p" heading>
                Randomly selects Three
              </Heading>
              <Heading renderAs="p">
                <Button color="danger" onClick={() => { this.playRound(3); }}>Round 3 </Button>
              </Heading>
              {this.state.roundThreeString}
            </div>
          </Level.Item>
        </Level>
      </Box>
    );
  }
}

RoundController.defaultProps = {
  othersFormHidden: true,
  toggleOthersFormFunction: null,
  othersData: [],
};

RoundController.propTypes = {
  othersFormHidden: PropTypes.bool,
  toggleOthersFormFunction: PropTypes.func,
  othersData: PropTypes.array,
};

export default RoundController;
