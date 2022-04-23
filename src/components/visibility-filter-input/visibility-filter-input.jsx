import React from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { setFilter } from '../../actions/actions';
import PropTypes from "prop-types";

function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="filter"
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);


VisibilityFilterInput.propTypes = {
  setFilter: PropTypes.func.isRequired
}