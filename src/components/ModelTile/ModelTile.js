import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Table } from 'react-bulma-components/full';

import ModelTileItem from '../ModelTileItem/ModelTileItem';
import ModelTileIntro from '../ModelTileIntro/ModelTileIntro';
import ModelTileOtherFactorsForm from '../ModelTileOtherFactorsForm/ModelTileOtherFactorsForm';

import './ModelTile.css';

class ModelTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      modelType: props.modelType,
      othersFormHidden: props.othersFormHidden,
      addOtherFactorFunction: props.addOtherFactorFunction,
      removeOtherFactorFunction: props.removeOtherFactorFunction,
      enableDescription: props.enableDescription,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      othersFormHidden: nextProps.othersFormHidden,
      data: nextProps.data,
    });
  }

  render() {
    const othersFormHidden = this.state.othersFormHidden;
    const enableDescription = this.state.enableDescription;
    const removeOtherFactorFunction = this.state.removeOtherFactorFunction;
    const listOfModels = this.props.data.map((data) => (
      <ModelTileItem
        key={data.id}
        id={data.id}
        name={data.name}
        description={data.description}
        enableDescription={enableDescription}
        removeOtherFactorFunction={removeOtherFactorFunction}
      />
    ));

    return (
      <Card className="model-tile">
        <div className="model-intro">
          <ModelTileIntro modelType={this.props.modelType} />
        </div>
        <div className="model-list">
          <Table className="is-hoverable">
            { listOfModels }
          </Table>
        </div>
        {
          !othersFormHidden &&
          <ModelTileOtherFactorsForm
            modelType={this.props.modelType}
            addOtherFactorFunction={this.state.addOtherFactorFunction}
          />
        }
      </Card>
    );
  }
}

ModelTile.defaultProps = {
  modelType: '',
  data: [],
  othersFormHidden: false,
  addOtherFactorFunction: null,
  removeOtherFactorFunction: null,
  enableDescription: false,
};

ModelTile.propTypes = {
  modelType: PropTypes.string,
  data: PropTypes.array,
  othersFormHidden: PropTypes.bool,
  addOtherFactorFunction: PropTypes.func,
  removeOtherFactorFunction: PropTypes.func,
  enableDescription: PropTypes.bool,
};

export default ModelTile;
