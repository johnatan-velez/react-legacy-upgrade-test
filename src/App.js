import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import './App.css';

// Mock data
const mockPosts = [
  { id: 1, title: 'First Post', body: 'This is the first post content.' },
  { id: 2, title: 'Second Post', body: 'This is the second post content.' },
  { id: 3, title: 'Third Post', body: 'This is the third post content.' },
];

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com' },
];

// Home component
function Home() {
  return (
    <div>
      <h1>Welcome to React Legacy Upgrade Test</h1>
      <p>This is a demo application showcasing React Router v6.</p>
    </div>
  );
}

// Posts List component
function PostsList() {
  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {mockPosts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Single Post component
function Post() {
  const { id: idParam } = useParams();
  const [post, setPost] = React.useState(null);
  const id = parseInt(idParam);

  React.useEffect(() => {
    const foundPost = mockPosts.find(p => p.id === id);
    setPost(foundPost);
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <Link to="/posts">Back to Posts</Link>
    </div>
  );
}

// Users List component
function UsersList() {
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {mockUsers.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Single User component
function User() {
  const { id: idParam } = useParams();
  const [user, setUser] = React.useState(null);
  const id = parseInt(idParam);

  React.useEffect(() => {
    const foundUser = mockUsers.find(u => u.id === id);
    setUser(foundUser);
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <Link to="/users">Back to Users</Link>
    </div>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/users">Users</Link></li>
          </ul>
        </nav>

        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostsList />} />
            <Route path="/posts/:id" element={<Post />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
