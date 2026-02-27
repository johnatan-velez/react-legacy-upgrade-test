# React Legacy Upgrade Test

A comprehensive test application demonstrating deprecated React patterns and APIs that need migration when upgrading from React 16 to React 18.

## Purpose

This project serves as a practical testing ground for React upgrade scenarios. It intentionally uses deprecated patterns from React 16 that are no longer supported in React 18, making it ideal for:

- Learning about React migration challenges
- Testing upgrade tools and codemods
- Understanding the impact of deprecated APIs
- Practicing manual migration techniques
- Training teams on React upgrade best practices

## Legacy Patterns Included

This application demonstrates all major deprecated React patterns:

### 1. Deprecated Lifecycle Methods

#### componentWillReceiveProps
- **Used in**: `Dashboard.js`
- **Issue**: Called on every prop update, causing performance issues
- **Modern Alternative**: `getDerivedStateFromProps` or `componentDidUpdate`

#### componentWillUpdate
- **Used in**: `Dashboard.js`
- **Issue**: Timing inconsistencies with async rendering
- **Modern Alternative**: `getSnapshotBeforeUpdate`

#### componentWillMount
- **Used in**: `UserList.js`, `SettingsForm.js`
- **Issue**: Can cause side effects and memory leaks
- **Modern Alternative**: `componentDidMount` or `useEffect`

### 2. Old Context API
- **Used in**: `ThemeProvider.js`, `Dashboard.js`
- **Pattern**: `childContextTypes` and `contextTypes`
- **Issue**: Not compatible with concurrent rendering
- **Modern Alternative**: `React.createContext()` and Context Provider/Consumer

### 3. String Refs
- **Used in**: `UserModal.js`, `SettingsForm.js`
- **Pattern**: `ref="inputName"`
- **Issue**: Deprecated, causes issues with TypeScript
- **Modern Alternative**: `React.createRef()` or callback refs

### 4. findDOMNode
- **Used in**: `UserModal.js`
- **Pattern**: `ReactDOM.findDOMNode(this)`
- **Issue**: Breaks React's abstraction, not compatible with Concurrent Mode
- **Modern Alternative**: Callback refs or `createRef()`

### 5. Legacy React Router (v4)
- **Used in**: `App.js`
- **Pattern**: React Router v4 patterns
- **Issue**: Different API from modern versions
- **Modern Alternative**: React Router v6

## Project Structure

```
src/
├── components/
│   ├── Dashboard.js          # componentWillReceiveProps, componentWillUpdate
│   ├── UserList.js            # componentWillMount
│   ├── UserModal.js           # findDOMNode, string refs
│   ├── SettingsForm.js        # componentWillMount, string refs
│   └── ThemeProvider.js       # Old Context API
├── App.js                     # Main routing and mock data
└── index.js                   # Application entry point
```

## Installation

```bash
npm install
```

## Running the Application

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

**Note**: This project uses `NODE_OPTIONS=--openssl-legacy-provider` for compatibility with older Node.js versions.

## Testing the Application

### View Deprecation Warnings

Open the browser console to see deprecation warnings for:
- `componentWillReceiveProps`
- `componentWillUpdate`
- `componentWillMount`
- String refs
- `findDOMNode`

### Test Each Component

1. **Dashboard** (`/`)
   - View stats cards
   - Check console for lifecycle warnings
   - Toggle theme to trigger prop updates

2. **User List** (`/users`)
   - View user list
   - Filter users by name
   - Check console for `componentWillMount` warning

3. **Settings** (`/settings`)
   - Try form inputs with string refs
   - Test form submission
   - Check console for warnings

## Migration Path

### Recommended Upgrade Strategy

1. **Update Dependencies**
   ```bash
   npm install react@18 react-dom@18 react-router-dom@6
   ```

2. **Run React Codemods**
   ```bash
   npx react-codemod rename-unsafe-lifecycles
   ```

3. **Manual Updates Required**
   - Replace old Context API with `React.createContext()`
   - Convert string refs to `createRef()` or callback refs
   - Replace `findDOMNode` with refs
   - Update React Router v4 to v6 patterns
   - Update lifecycle methods to modern alternatives

4. **Test Thoroughly**
   - Verify all components render correctly
   - Check for console warnings
   - Test all user interactions
   - Validate form submissions

### Migration Checklist

- [ ] Update React and ReactDOM to v18
- [ ] Update React Router to v6
- [ ] Replace `componentWillReceiveProps` with `getDerivedStateFromProps` or `componentDidUpdate`
- [ ] Replace `componentWillUpdate` with `getSnapshotBeforeUpdate`
- [ ] Replace `componentWillMount` with `componentDidMount` or `useEffect`
- [ ] Convert old Context API to new Context API
- [ ] Replace string refs with `createRef()` or callback refs
- [ ] Remove `findDOMNode` usage and use refs instead
- [ ] Test all components
- [ ] Remove deprecation warnings

## Technologies Used

- **React**: 16.14.0 (intentionally old version)
- **React Router**: 4.3.1 (legacy version)
- **PropTypes**: 15.7.2
- **Create React App**: 4.0.3

## Learning Resources

- [React 18 Upgrade Guide](https://react.dev/blog/2022/03/08/react-18-upgrade-guide)
- [React Lifecycle Methods](https://react.dev/reference/react/Component#legacy-lifecycle-methods)
- [Context API Migration](https://react.dev/reference/react/createContext)
- [Refs and the DOM](https://react.dev/learn/manipulating-the-dom-with-refs)

## License

MIT - This is a demonstration project for educational purposes.
