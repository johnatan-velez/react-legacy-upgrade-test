import React from 'react';
import PropTypes from 'prop-types';
import './SettingsForm.css';

/**
 * SettingsForm - A settings form with legacy patterns
 *
 * Legacy patterns used:
 * 1. UNSAFE_componentWillMount for data initialization
 * 2. String refs for form field access
 * 3. componentWillReceiveProps for prop changes
 *
 * Modern alternatives:
 * 1. Use componentDidMount or constructor for initialization
 * 2. Use createRef or callback refs instead of string refs
 * 3. Use componentDidUpdate with proper conditions
 */
class SettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        username: '',
        email: '',
        notifications: true,
        theme: 'light',
        language: 'en',
        timezone: 'UTC'
      },
      isDirty: false,
      validationErrors: {},
      isInitialized: false
    };
  }

  // Legacy: UNSAFE_componentWillMount
  // Modern alternative: Move this logic to constructor or componentDidMount
  UNSAFE_componentWillMount() {
    console.warn('UNSAFE_componentWillMount is deprecated and will be removed in React 18');

    // Simulate loading settings from props or localStorage
    const savedSettings = this.loadSettingsFromStorage();
    if (savedSettings) {
      this.setState({
        settings: { ...this.state.settings, ...savedSettings },
        isInitialized: true
      });
    } else if (this.props.initialSettings) {
      this.setState({
        settings: { ...this.state.settings, ...this.props.initialSettings },
        isInitialized: true
      });
    }
  }

  // Legacy: componentWillReceiveProps
  // Modern alternative: Use componentDidUpdate or getDerivedStateFromProps
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.warn('UNSAFE_componentWillReceiveProps is deprecated');

    if (nextProps.initialSettings !== this.props.initialSettings) {
      this.setState({
        settings: { ...this.state.settings, ...nextProps.initialSettings },
        isDirty: false
      });
    }
  }

  componentDidMount() {
    // Legacy: Using string refs to set initial values
    // Modern alternative: Use controlled components with state
    if (this.refs.usernameInput) {
      this.refs.usernameInput.value = this.state.settings.username;
    }
    if (this.refs.emailInput) {
      this.refs.emailInput.value = this.state.settings.email;
    }
    if (this.refs.notificationsInput) {
      this.refs.notificationsInput.checked = this.state.settings.notifications;
    }
    if (this.refs.themeInput) {
      this.refs.themeInput.value = this.state.settings.theme;
    }
    if (this.refs.languageInput) {
      this.refs.languageInput.value = this.state.settings.language;
    }
    if (this.refs.timezoneInput) {
      this.refs.timezoneInput.value = this.state.settings.timezone;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Update form fields when settings change
    if (prevState.settings !== this.state.settings && !this.state.isDirty) {
      this.updateFormFields();
    }
  }

  loadSettingsFromStorage = () => {
    try {
      const saved = localStorage.getItem('userSettings');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error('Error loading settings:', error);
      return null;
    }
  };

  saveSettingsToStorage = (settings) => {
    try {
      localStorage.setItem('userSettings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  updateFormFields = () => {
    // Legacy: Using string refs to update form fields
    if (this.refs.usernameInput) {
      this.refs.usernameInput.value = this.state.settings.username;
    }
    if (this.refs.emailInput) {
      this.refs.emailInput.value = this.state.settings.email;
    }
    if (this.refs.notificationsInput) {
      this.refs.notificationsInput.checked = this.state.settings.notifications;
    }
    if (this.refs.themeInput) {
      this.refs.themeInput.value = this.state.settings.theme;
    }
    if (this.refs.languageInput) {
      this.refs.languageInput.value = this.state.settings.language;
    }
    if (this.refs.timezoneInput) {
      this.refs.timezoneInput.value = this.state.settings.timezone;
    }
  };

  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  validateUsername = (username) => {
    return username.length >= 3 && username.length <= 20;
  };

  validateForm = () => {
    const errors = {};

    // Legacy: Using string refs to get values
    const username = this.refs.usernameInput.value.trim();
    const email = this.refs.emailInput.value.trim();

    if (!this.validateUsername(username)) {
      errors.username = 'Username must be between 3 and 20 characters';
    }

    if (!this.validateEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    this.setState({ validationErrors: errors });
    return Object.keys(errors).length === 0;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.validateForm()) {
      return;
    }

    // Legacy: Using string refs to collect form data
    const formData = {
      username: this.refs.usernameInput.value.trim(),
      email: this.refs.emailInput.value.trim(),
      notifications: this.refs.notificationsInput.checked,
      theme: this.refs.themeInput.value,
      language: this.refs.languageInput.value,
      timezone: this.refs.timezoneInput.value
    };

    this.setState({
      settings: formData,
      isDirty: false,
      validationErrors: {}
    });

    this.saveSettingsToStorage(formData);

    if (this.props.onSave) {
      this.props.onSave(formData);
    }
  };

  handleReset = () => {
    // Legacy: Using string refs to reset form fields
    const defaultSettings = {
      username: '',
      email: '',
      notifications: true,
      theme: 'light',
      language: 'en',
      timezone: 'UTC'
    };

    this.setState({
      settings: defaultSettings,
      isDirty: false,
      validationErrors: {}
    });

    this.updateFormFields();
  };

  handleInputChange = () => {
    this.setState({ isDirty: true });
  };

  render() {
    const { settings, isDirty, validationErrors, isInitialized } = this.state;

    if (!isInitialized) {
      return <div className="settings-loading">Loading settings...</div>;
    }

    return (
      <div className="settings-form-container">
        <h2>User Settings</h2>
        <form onSubmit={this.handleSubmit} className="settings-form">
          <div className="form-section">
            <h3>Account Information</h3>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                ref="usernameInput"
                type="text"
                id="username"
                name="username"
                defaultValue={settings.username}
                onChange={this.handleInputChange}
                placeholder="Enter username"
                required
              />
              {validationErrors.username && (
                <span className="error-message">{validationErrors.username}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                ref="emailInput"
                type="email"
                id="email"
                name="email"
                defaultValue={settings.email}
                onChange={this.handleInputChange}
                placeholder="Enter email"
                required
              />
              {validationErrors.email && (
                <span className="error-message">{validationErrors.email}</span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h3>Preferences</h3>

            <div className="form-group checkbox-group">
              <label htmlFor="notifications">
                <input
                  ref="notificationsInput"
                  type="checkbox"
                  id="notifications"
                  name="notifications"
                  defaultChecked={settings.notifications}
                  onChange={this.handleInputChange}
                />
                Enable notifications
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="theme">Theme</label>
              <select
                ref="themeInput"
                id="theme"
                name="theme"
                defaultValue={settings.theme}
                onChange={this.handleInputChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select
                ref="languageInput"
                id="language"
                name="language"
                defaultValue={settings.language}
                onChange={this.handleInputChange}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="ja">Japanese</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="timezone">Timezone</label>
              <select
                ref="timezoneInput"
                id="timezone"
                name="timezone"
                defaultValue={settings.timezone}
                onChange={this.handleInputChange}
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
                <option value="Europe/Paris">Paris</option>
                <option value="Asia/Tokyo">Tokyo</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.handleReset}
            >
              Reset to Defaults
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isDirty}
            >
              Save Settings
            </button>
          </div>

          {isDirty && (
            <div className="unsaved-changes-notice">
              You have unsaved changes
            </div>
          )}
        </form>
      </div>
    );
  }
}

SettingsForm.propTypes = {
  initialSettings: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    notifications: PropTypes.bool,
    theme: PropTypes.oneOf(['light', 'dark', 'auto']),
    language: PropTypes.string,
    timezone: PropTypes.string
  }),
  onSave: PropTypes.func
};

SettingsForm.defaultProps = {
  initialSettings: null,
  onSave: null
};

export default SettingsForm;
