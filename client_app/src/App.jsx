import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { BlogCard } from "./components/BlogCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  return (
    <div className="h-screen font-outfit">
      <div className="m-12 text-4xl font-bold text-center">Published Posts</div>
      <div className="flex justify-center mb-16">
        <input
          className="w-1/4 p-2 rounded-lg"
          type="text"
          placeholder="search by id, slug, title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <BlogCard searchTerm={debouncedSearchTerm} />
    </div>
  );
}

export default App;
