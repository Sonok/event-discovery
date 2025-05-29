// src/App.jsx
// MVP Event App – Instagram-style UI using React + TailwindCSS

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AiFillHome, AiOutlineSearch, AiOutlineUser, AiOutlineMessage } from 'react-icons/ai';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-50 text-gray-800">
        <TopNav />
        <main className="flex-1 overflow-auto max-w-md mx-auto">
          <Routes>
            <Route path="/" element={<EventFeed />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

function TopNav() {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-white shadow-sm">
      <h1 className="font-bold text-2xl">eventgram</h1>
      <div className="flex gap-4 text-xl">
        <span>➕</span>
        <span>❤️</span>
        <span>📤</span>
      </div>
    </div>
  );
}

function BottomNav() {
  return (
    <nav className="flex justify-around items-center p-3 bg-white shadow-inner">
      <Link to="/" className="no-underline"><AiFillHome size={24} /></Link>
      <Link to="/map" className="no-underline"><AiOutlineSearch size={24} /></Link>
      <Link to="/discover" className="no-underline"><AiOutlineUser size={24} /></Link>
      <Link to="/messages" className="no-underline"><AiOutlineMessage size={24} /></Link>
      <Link to="/profile" className="no-underline"><AiOutlineUser size={24} /></Link>
    </nav>
  );
}

function EventStories() {
  const highlights = ['Music', 'Tech', 'Fitness', 'Art'];
  return (
    <div className="flex gap-4 overflow-x-auto py-4 bg-white">
      {highlights.map((tag, idx) => (
        <div key={idx} className="flex-shrink-0 flex flex-col items-center">
          <div className="story-ring">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-sm">
              {tag[0]}
            </div>
          </div>
          <span className="text-xs mt-1 text-gray-700">{tag}</span>
        </div>
      ))}
    </div>
  );
}

function EventFeed() {
  const events = [
    { id: 1, title: "Taylor Swift Concert", location: "NYC" },
    { id: 2, title: "Tech Meetup", location: "SF" }
  ];
  return (
    <div className="p-4 bg-gray-50">
      <EventStories />
      {events.map(event => (
        <div key={event.id} className="post-card mb-6">
          <div className="post-header">
            <div className="post-avatar" />
            <div>
              <p className="font-semibold text-gray-800">{event.title}</p>
              <p className="text-sm text-gray-500">{event.location}</p>
            </div>
          </div>
          <div className="post-image">
            [Image Placeholder]
          </div>
          <div className="post-footer">
            This is a description...
          </div>
        </div>
      ))}
    </div>
  );
}

function MapView() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Explore Nearby</h1>
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        [Map Placeholder]
      </div>
    </div>
  );
}

function Discover() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Discover Friends</h1>
      <p className="text-gray-500">AI-generated suggestions coming soon...</p>
    </div>
  );
}

function Messages() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Messages</h1>
      <p className="text-gray-500">Real-time chat via Firebase coming soon...</p>
    </div>
  );
}

function Profile() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Profile</h1>
      <p className="text-gray-500">User info, attended events, and preferences...</p>
    </div>
  );
}

export default App;