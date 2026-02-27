import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * UserList Component
 *
 * Legacy patterns demonstrated:
 * 1. UNSAFE_componentWillMount for initial data filtering
 * 2. Legacy Context API (contextTypes)
 * 3. String refs (this.refs)
 * 4. Mixed state management approaches
 *
 * This component displays a list of users with filtering capabilities.
 * It uses several deprecated React patterns that should be updated in modern React.
 */
class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredUsers: [],
      filterText: '',
      selectedUserId: null,
      isLoading: true
    };
  }

  /**
   * UNSAFE_componentWillMount
   * -------------------------
   * This lifecycle method is deprecated and should be replaced with:
   * - Constructor for initialization
   * - componentDidMount for side effects
   *
   * It's called before the initial render, making it seem useful for
   * preparing data, but it can cause issues with:
   * - Server-side rendering (gets called on server AND client)
   * - Async rendering (may be called multiple times)
   * - Suspense and concurrent features
   */
  UNSAFE_componentWillMount() {
    console.log('[UserList] UNSAFE_componentWillMount called');

    // This filtering could be done in constructor or componentDidMount
    const { users } = this.props;
    this.setState({
      filteredUsers: users || [],
      isLoading: false
    });

    // Simulating some pre-render logic that's better suited for componentDidMount
    if (this.context.currentUser) {
      console.log('[UserList] Current user from context:', this.context.currentUser);
    }
  }

  componentDidMount() {
    console.log('[UserList] Component mounted');
    // In a real app, data fetching should happen here, not in componentWillMount
  }

  componentDidUpdate(prevProps) {
    // Update filtered users when props change
    if (prevProps.users !== this.props.users) {
      this.filterUsers(this.state.filterText);
    }
  }

  /**
   * Filter users based on search text
   */
  filterUsers = (searchText) => {
    const { users } = this.props;
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
    );

    this.setState({
      filteredUsers: filtered,
      filterText: searchText
    });
  }

  /**
   * Handle filter input change
   * Uses string refs (deprecated pattern)
   */
  handleFilterChange = () => {
    // String refs are deprecated - should use React.createRef() or callback refs
    const searchText = this.refs.filterInput.value;
    this.filterUsers(searchText);
  }

  /**
   * Handle user selection
   */
  handleUserClick = (userId) => {
    this.setState({ selectedUserId: userId });

    if (this.props.onUserSelect) {
      this.props.onUserSelect(userId);
    }
  }

  /**
   * Clear filter using string ref
   */
  clearFilter = () => {
    // Another example of string refs usage
    this.refs.filterInput.value = '';
    this.filterUsers('');
  }

  render() {
    const { filteredUsers, selectedUserId, filterText } = this.state;
    const { theme } = this.context; // Using legacy context

    return (
      <div className="user-list" style={{ padding: '20px' }}>
        <h2 style={{ color: theme?.primaryColor || '#333' }}>
          User Directory
        </h2>

        {/* Filter Section with String Ref */}
        <div className="filter-section" style={{ marginBottom: '20px' }}>
          <input
            ref="filterInput"
            type="text"
            placeholder="Filter users by name or email..."
            onChange={this.handleFilterChange}
            style={{
              padding: '8px',
              width: '300px',
              marginRight: '10px'
            }}
          />
          <button onClick={this.clearFilter}>
            Clear
          </button>
          {filterText && (
            <span style={{ marginLeft: '10px' }}>
              Found {filteredUsers.length} users
            </span>
          )}
        </div>

        {/* Users List */}
        <div className="users-container">
          {filteredUsers.length === 0 ? (
            <p>No users found</p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {filteredUsers.map(user => (
                <li
                  key={user.id}
                  onClick={() => this.handleUserClick(user.id)}
                  style={{
                    padding: '10px',
                    margin: '5px 0',
                    backgroundColor: selectedUserId === user.id ? '#e3f2fd' : '#f5f5f5',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <strong>{user.name}</strong>
                  <br />
                  <small>{user.email}</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

/**
 * Legacy Context API
 * ------------------
 * contextTypes is the old way to consume context.
 * Modern React uses:
 * - React.createContext()
 * - Context.Provider and Context.Consumer
 * - useContext hook (in functional components)
 * - static contextType (in class components)
 */
UserList.contextTypes = {
  theme: PropTypes.object,
  currentUser: PropTypes.object
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    })
  ).isRequired,
  onUserSelect: PropTypes.func
};

UserList.defaultProps = {
  users: []
};

export default UserList;
