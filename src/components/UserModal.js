import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './UserModal.css';

/**
 * UserModal - A modal dialog with legacy patterns
 *
 * Legacy patterns used:
 * 1. findDOMNode for measuring and DOM manipulation
 * 2. String refs for accessing child components
 * 3. Imperative DOM manipulation
 *
 * Modern alternatives:
 * 1. Use callback refs or createRef for DOM access
 * 2. Use object refs instead of string refs
 * 3. Use state and props for declarative updates
 */
class UserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false,
      modalHeight: 0,
      focusedInput: null
    };
  }

  componentDidMount() {
    // Legacy: Using findDOMNode to measure the modal
    // Modern alternative: Use callback ref and measure directly
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      const height = node.offsetHeight;
      this.setState({ modalHeight: height });

      // Legacy: Imperative DOM manipulation
      node.style.opacity = '0';
      setTimeout(() => {
        node.style.transition = 'opacity 0.3s ease-in-out';
        node.style.opacity = '1';
      }, 10);
    }

    // Legacy: Using string ref to focus input
    // Modern alternative: Use createRef or callback ref
    if (this.refs.nameInput) {
      this.refs.nameInput.focus();
    }

    document.addEventListener('keydown', this.handleEscapeKey);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.focusedInput !== this.state.focusedInput) {
      // Legacy: Using findDOMNode to scroll to focused element
      const node = ReactDOM.findDOMNode(this);
      if (node && this.state.focusedInput) {
        const inputRef = this.refs[this.state.focusedInput];
        if (inputRef) {
          const inputNode = ReactDOM.findDOMNode(inputRef);
          if (inputNode) {
            inputNode.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscapeKey);
  }

  handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      this.handleClose();
    }
  };

  handleClose = () => {
    // Legacy: Using findDOMNode for animation before closing
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      this.setState({ isAnimating: true });
      node.style.opacity = '0';
      setTimeout(() => {
        this.props.onClose();
      }, 300);
    } else {
      this.props.onClose();
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // Legacy: Using string refs to get form values
    const formData = {
      name: this.refs.nameInput.value,
      email: this.refs.emailInput.value,
      role: this.refs.roleInput.value,
      bio: this.refs.bioInput.value
    };

    this.props.onSave(formData);
    this.handleClose();
  };

  handleInputFocus = (inputName) => {
    this.setState({ focusedInput: inputName });
  };

  measureModalContent = () => {
    // Legacy: Using findDOMNode to measure content
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      const contentNode = node.querySelector('.modal-content');
      if (contentNode) {
        return {
          width: contentNode.offsetWidth,
          height: contentNode.offsetHeight
        };
      }
    }
    return { width: 0, height: 0 };
  };

  render() {
    const { user, isOpen } = this.props;
    const { isAnimating, modalHeight } = this.state;

    if (!isOpen) {
      return null;
    }

    return (
      <div className="modal-overlay" onClick={this.handleClose}>
        <div
          className="modal-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h2>{user ? 'Edit User' : 'New User'}</h2>
            <button
              className="modal-close-btn"
              onClick={this.handleClose}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <form onSubmit={this.handleSubmit} className="modal-content">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                ref="nameInput"
                type="text"
                id="name"
                name="name"
                defaultValue={user?.name || ''}
                onFocus={() => this.handleInputFocus('nameInput')}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                ref="emailInput"
                type="email"
                id="email"
                name="email"
                defaultValue={user?.email || ''}
                onFocus={() => this.handleInputFocus('emailInput')}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input
                ref="roleInput"
                type="text"
                id="role"
                name="role"
                defaultValue={user?.role || ''}
                onFocus={() => this.handleInputFocus('roleInput')}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                ref="bioInput"
                id="bio"
                name="bio"
                defaultValue={user?.bio || ''}
                onFocus={() => this.handleInputFocus('bioInput')}
                rows="4"
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.handleClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isAnimating}
              >
                {user ? 'Update' : 'Create'}
              </button>
            </div>
          </form>

          {modalHeight > 0 && (
            <div className="modal-debug-info">
              Modal height: {modalHeight}px
            </div>
          )}
        </div>
      </div>
    );
  }
}

UserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    bio: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default UserModal;
