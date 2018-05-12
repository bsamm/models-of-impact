import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'react-bulma-components/full';

import './ModelTileIntro.css';

class ModelTileIntro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelType: props.modelType,
    };
  }

  modelIntro() {
    const modelType = this.state.modelType;
    if (modelType === 'revenue') {
      return (
        <div>
          <Heading size={4}>Revenue Models</Heading>
          <small>
            A revenue model is a method for generating income in a sustainable
            manner. The models presented here are actively used in the private,
            public, and social sectors.
          </small>
        </div>
      );
    } else if (modelType === 'impact') {
      return (
        <div>
          <Heading size={4}>Impact Models</Heading>
          <small>
            An impact model is a method for creating sustainable impact on
            people and the planet. The models presented here are actively used
            in the private, public, and social sectors.
          </small>
        </div>
      );
    } else if (modelType === 'others') {
      return (
        <div>
          <Heading size={4}>Other Factors</Heading>
          <small>
            “Other Factors” describe a range of key factors that you hope to
            disrupt, evolve, or consider, as you design your new model.
            Put simply, your “Other Factors” are things that are of interest
            and relevance to the environment you are working within, today.
            As a result, “Other Factors” can be a wide range of things.
          </small>
        </div>
      );
    }
    return ('Error, no model specified');
  }

  render() {
    return (
      <div className="modelTileIntro has-text-left-desktop">
        { this.modelIntro() }
      </div>
    );
  }
}

ModelTileIntro.defaultProps = {
  modelType: '',
};

ModelTileIntro.propTypes = {
  modelType: PropTypes.string,
};

export default ModelTileIntro;
