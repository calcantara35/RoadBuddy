import React from "react";
import PropTypes from "prop-types";

//connect this component with redux
import { connect } from "react-redux";

const Alert = ({ alerts }) => {
  return (
    // conditional
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
};

// when using props, you need this
Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

// taking redux state to a prop in this component, array of alerts
const mapStateToProps = state => ({
  // array of alerts to make with the redux state of alert
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
