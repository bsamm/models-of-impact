import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Columns } from 'react-bulma-components/full';
import ReactGA from 'react-ga';

import './ModelTileOtherFactorsForm.css';

class ModelTileOtherFactorsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelType: props.modelType,
      addOtherFactorFunction: props.addOtherFactorFunction,
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      addOtherFactorFunction: nextProps.addOtherFactorFunction,
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    ReactGA.event({
      category: 'Other Factor',
      action: 'Someone added an other factor'
    });
    this.state.addOtherFactorFunction(this.state.value);
    event.preventDefault();
    this.setState({ value: '' });
  }

  modelButton(modelType) {
    if (modelType === 'others') {
      return (
        <form onSubmit={this.handleSubmit}>
          <Columns>
            <Columns.Column size={9}>
              <input
                className="input is-info"
                type="text"
                placeholder="Other Factor"
                value={this.state.value}
                onChange={this.handleChange}
                ref={(input) => input && input.focus()}
              />
              <p className="help has-text-left-desktop">Add 20. Click to delete.</p>
            </Columns.Column>
            <Columns.Column size={3}>
              <button type="submit" className="button is-info">
                + Add
              </button>
            </Columns.Column>
          </Columns>
        </form>
      );
    }
    return false;
  }

  render() {
    return (
      <div className="modelButton">
        { this.modelButton(this.state.modelType) }
      </div>
    );
  }
}

ModelTileOtherFactorsForm.defaultProps = {
  modelType: '',
  addOtherFactorFunction: null,
};

ModelTileOtherFactorsForm.propTypes = {
  modelType: PropTypes.string,
  addOtherFactorFunction: PropTypes.func,
};

export default ModelTileOtherFactorsForm;
