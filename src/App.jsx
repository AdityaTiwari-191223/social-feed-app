import { useState } from "react";

const initialPosts = [
  {
    id: 1,
    username: "aditya_01",
    image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=800&q=80",
    caption: "This is my first post!",
    likes: 12,
    timestamp: "2025-06-22T10:00:00Z",
  },
  {
    id: 2,
    username: "tiwari_ai",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80",
    caption: "Another day, another view 🌄",
    likes: 45,
    timestamp: "2025-06-22T13:00:00Z",
  }
];

function App() {
  const [posts, setPosts] = useState(initialPosts);
  const [sortType, setSortType] = useState("latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const handleLike = (id) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const filteredAndSortedPosts = [...posts]
    .filter((post) =>
      post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.caption.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "latest") {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else if (sortType === "likes") {
        return b.likes - a.likes;
      }
      return 0;
    });

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen`}>
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📸 Social Feed</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
          <input
            type="text"
            placeholder="🔍 Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 w-full max-w-md shadow-sm"
          />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm dark:bg-gray-800"
          >
            <option value="latest">📅 Latest</option>
            <option value="likes">❤️ Most Liked</option>
          </select>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {filteredAndSortedPosts.length > 0 ? (
            filteredAndSortedPosts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://avatars.githubusercontent.com/u/76719042?v=4"
                      alt="Aditya"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="font-semibold text-lg">@{post.username}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(post.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <img src={post.image} alt="Post" className="w-full h-64 object-cover" />
                <div className="p-4">
                  <p className="mb-3">{post.caption}</p>
                  <button
                    onClick={() => handleLike(post.id)}
                    className="text-red-500 font-semibold hover:scale-105 transition"
                  >
                    ❤️ {post.likes} Likes
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
