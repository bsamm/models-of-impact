import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './ModelTileItemDescription.css';

class ModelTileItemDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.description,
    };
  }

  render() {
    return (
      <tr className="description">
        <td />
        <td>
          {this.props.description}
        </td>
      </tr>
    );
  }
}

ModelTileItemDescription.defaultProps = {
  description: '',
};

ModelTileItemDescription.propTypes = {
  description: PropTypes.string,
};

export default ModelTileItemDescription;

