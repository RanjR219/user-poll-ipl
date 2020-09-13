import React, { useState } from "react";
import Navbar from "./Navbar/Navbar";
import TextArea from "./TextArea/TextArea";
import Posts from "./Posts/Posts";
import Auth from "./Auth/Auth";
import AvatarPic from "./AvatarPic/AvatarPic";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import Grid from "@material-ui/core/Grid";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#111d5e",
    },
    secondary: {
      main: "#f37121",
      contrastText: "#fff",
    },
  },
});

function App() {
  const [posts, setPosts] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  React.useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((results) => results.json())
      .then((data) => {
        setPosts(data); // array of objects
        console.log(data);
      });
  }, []);

  function onAddPost(newPost) {
    console.log(newPost);

    setPosts((prevPosts) => {
      return [newPost, ...prevPosts];
    });
  }

  function onUserVote(action, index) {
    const currentPost = posts[index];
    fetch(`http://localhost:5000/posts/${currentPost._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votes:
          action === "like" ? currentPost.like + 1 : currentPost.dislike + 1,
        type: action,
      }),
    });
    setPosts((prevPosts) => {
      let newPosts = [];
      prevPosts.forEach((prevPost, i) => {
        if (i === index) {
          if (action === "like") {
            prevPost.like += 1;
          } else {
            prevPost.dislike += 1;
          }
        }
        newPosts.push(prevPost);
      });
      return newPosts;
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Navbar setIsLoggedIn={setIsLoggedIn} loginStatus={isLoggedIn} />
        {isLoggedIn ? (
          <div className="container">
            <Grid container spacing={1}>
              <Grid item xs={9}>
                <TextArea user={user} onAdd={onAddPost} />
              </Grid>
              <Grid item xs={3}>
                <AvatarPic user={user} />
              </Grid>
            </Grid>

            {posts.map((postItem, index) => {
              return (
                <Grid container spacing={1}>
                  <Grid item xs={9}>
                    <Posts
                      key={index}
                      id={index}
                      post={postItem}
                      onUserVote={onUserVote}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <AvatarPic user={postItem.user} />
                  </Grid>
                </Grid>
              );
            })}
          </div>
        ) : (
          <Auth
            isLoggedIn={isLoggedIn}
            setUser={setUser}
            setIsLoggedIn={setIsLoggedIn}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
