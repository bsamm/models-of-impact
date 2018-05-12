import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ModelTileItem.css';

import ModelTileItemDescription from '../ModelTileItemDescription/ModelTileItemDescription';

class ModelTileItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      name: props.name,
      description: props.description,
      isHidden: true,
      removeOtherFactorFunction: props.removeOtherFactorFunction,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      removeOtherFactorFunction: nextProps.removeOtherFactorFunction,
    });
  }

  onClick() {
    if (this.props.enableDescription) {
      this.setState({ isHidden: !this.state.isHidden });
    } else {
      this.state.removeOtherFactorFunction(this);
    }
  }

  render() {
    return (
      <tbody className="modelTileItem">
        <tr onClick={() => { this.onClick(); }}>
          <th className="th-id">
            {this.props.id}
          </th>
          <td>
            {this.props.name}
          </td>
        </tr>
        {!this.state.isHidden && <ModelTileItemDescription description={this.props.description} />}
      </tbody>
    );
  }
}

ModelTileItem.defaultProps = {
  id: null,
  name: '',
  description: '',
  removeOtherFactorFunction: null,
  enableDescription: false,
};

ModelTileItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  removeOtherFactorFunction: PropTypes.func,
  enableDescription: PropTypes.bool,
};

export default ModelTileItem;

