import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localStats: null
    };
  }

  // DEPRECATED LIFECYCLE - replaced by getDerivedStateFromProps
  componentWillReceiveProps(nextProps) {
    console.warn('Dashboard: componentWillReceiveProps called (DEPRECATED)');
    if (nextProps.stats !== this.props.stats) {
      this.setState({ localStats: nextProps.stats });
    }
  }

  // DEPRECATED LIFECYCLE - replaced by getSnapshotBeforeUpdate
  componentWillUpdate(nextProps, nextState) {
    console.warn('Dashboard: componentWillUpdate called (DEPRECATED)');
    console.log('About to update with stats:', nextState.localStats);
  }

  componentDidMount() {
    // Initialize with props
    this.setState({ localStats: this.props.stats });
  }

  render() {
    const { localStats } = this.state;
    const { theme } = this.context;

    const cardStyle = {
      backgroundColor: theme === 'light' ? '#f0f0f0' : '#444444',
      padding: '20px',
      margin: '10px',
      borderRadius: '8px'
    };

    return (
      <div>
        <h1>Dashboard</h1>
        <p>This component uses deprecated lifecycle methods:</p>
        <ul>
          <li><code>componentWillReceiveProps</code> - check console</li>
          <li><code>componentWillUpdate</code> - check console</li>
        </ul>

        {localStats && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <div style={cardStyle}>
              <h3>Total Users</h3>
              <p style={{ fontSize: '2em' }}>{localStats.totalUsers}</p>
            </div>
            <div style={cardStyle}>
              <h3>Active Sessions</h3>
              <p style={{ fontSize: '2em' }}>{localStats.activeSessions}</p>
            </div>
            <div style={cardStyle}>
              <h3>Revenue</h3>
              <p style={{ fontSize: '2em' }}>${localStats.revenue}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  stats: PropTypes.shape({
    totalUsers: PropTypes.number,
    activeSessions: PropTypes.number,
    revenue: PropTypes.number
  })
};

// OLD CONTEXT API - DEPRECATED
Dashboard.contextTypes = {
  theme: PropTypes.string
};

export default Dashboard;
