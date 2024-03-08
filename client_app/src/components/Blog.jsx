import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";

export const Blog = () => {
  const [post, setPost] = React.useState({});
  const { id } = useParams();

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = `${import.meta.env.VITE_APP_NODE_SERVER_URL}/blog/${id}`;
        const response = await axios.get(url);
        setPost(response.data.posts[0]);
        console.log(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl pt-16 pb-32 mx-auto xl:max-w-5xl">
      <div className="p-2">
        <Link className="px-4 py-2 bg-blue-800 rounded hover:bg-blue-700" to="/">
          Go Back
        </Link>
      </div>
      <div className="p-2">
        <h1 className="mb-2 ">{post?.title}</h1>
        <p className="text-[#8c8c8c] truncate">By {post?.authors?.map((author) => author.name).join(", ")}</p>
      </div>
      {post.feature_image && (
        <img className="object-cover object-center w-full p-2 overflow-hidden rounded-xl" src={post?.feature_image} alt="Blog Post Image" />
      )}

      <div className="p-2">
        <div className="border-[#8c8c8c] my-8 border"></div>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </div>
  );
};
