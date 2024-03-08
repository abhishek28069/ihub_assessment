import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToggleSlider } from "./ToggleSlider";
import { Link } from "react-router-dom";

export const BlogCard = ({ searchTerm }) => {
  const [posts, setPosts] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = isChecked
          ? `${import.meta.env.VITE_APP_NODE_SERVER_URL}/published-blogs-last-week`
          : `${import.meta.env.VITE_APP_NODE_SERVER_URL}/published-blogs`;
        url = searchTerm === "" ? url : `${import.meta.env.VITE_APP_NODE_SERVER_URL}/blog/${encodeURIComponent(searchTerm)}`;

        const response = await axios.get(url);
        setPosts(response.data.posts);
        console.log(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [isChecked, searchTerm]);

  return (
    <>
      {posts.length === 0 ? (
        <div className="flex justify-center text-[#8c8c8c] text-xl">Nothing to see</div>
      ) : (
        <div className="relative grid max-w-3xl gap-6 pb-32 mx-auto md:grid-cols-1 xl:grid-cols-2 xl:max-w-7xl">
          <div className="absolute right-4 -top-6">
            {searchTerm === "" && (
              <ToggleSlider isChecked={isChecked} handleToggle={handleToggle}>
                Published in Last Week
              </ToggleSlider>
            )}
          </div>
          {posts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} state={post} className="group">
              <div className="w-full p-2 mx-auto overflow-hidden rounded-lg">
                {post.feature_image ? (
                  <img
                    className="object-cover object-center w-full h-64 p-2 overflow-hidden rounded-xl"
                    src={post.feature_image || "https://via.placeholder.com/800x400"}
                    alt="Blog Post Image"
                  />
                ) : (
                  <div className="w-full m-2 h-60 rounded-xl bg-gradient-to-br from-blue-800 to-blue-950"></div>
                )}
                <div className="p-2">
                  <h3 className="text-3xl font-medium mb-2 truncate w-[90%] group-hover:text-blue-500">{post.title}</h3>
                  <p className="mb-2 line-clamp-2">{post.excerpt.substring(post.excerpt.indexOf("\n\n"))}</p>
                  <p className="text-[#8c8c8c] truncate">By {post.authors.map((author) => author.name).join(", ")}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
