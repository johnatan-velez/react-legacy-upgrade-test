import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ThemeProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light'
    };
  }

  // OLD CONTEXT API - DEPRECATED
  getChildContext() {
    return {
      theme: this.state.theme,
      toggleTheme: this.toggleTheme
    };
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light'
    }));
  }

  render() {
    const { theme } = this.state;
    const backgroundColor = theme === 'light' ? '#ffffff' : '#333333';
    const color = theme === 'light' ? '#000000' : '#ffffff';

    return (
      <div style={{ backgroundColor, color, minHeight: '100vh', padding: '20px' }}>
        <button onClick={this.toggleTheme} style={{ marginBottom: '20px' }}>
          Toggle Theme (Current: {theme})
        </button>
        {this.props.children}
      </div>
    );
  }
}

// OLD CONTEXT API - DEPRECATED
ThemeProvider.childContextTypes = {
  theme: PropTypes.string,
  toggleTheme: PropTypes.func
};

export default ThemeProvider;
