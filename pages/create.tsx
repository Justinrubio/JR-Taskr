import React, { useState } from "react";
import Layout from "../components/Layout";
import Router from "next/router";

const Draft: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h2>Create a new task</h2>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: #121212;
        
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          color: #f7f7f7;
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 3px;
          border: 1px solid grey;
          background: #121212;
        }

        input[type="submit"] {
          border: 1px solid #f7f7f7;
          color: #f7f7f7;
          padding: 0.5rem 1rem;
          border-radius: 3px;
          background: unset;
        }

        .back {
          color: #f7f7f7;
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;