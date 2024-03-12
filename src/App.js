import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import Post from "./Post";
import { Link,Routes,Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {format} from "date-fns";
import api from "./api/pposts";
import useAxiosFetch from "./hook/useAxiosFetch";

function App() {
  const [posts, setPosts]=useState([])
  const [search,setSearch]=useState('')
  const[searchResults,setSearchResults]=useState([])
  const[postTitle,setPostTitle]=useState('')
  const[postBody,setPostBody]=useState('')
  const navigate=useNavigate()
  const {data,fetchError,isLoading}=useAxiosFetch('http://localhost:3500/posts')

  useEffect(() => {
    setPosts(data)
  },[data])


  useEffect(()=>{
    const filteredResults=posts.filter((post)=>(
      (post.body.toLowerCase()).includes(search.toLowerCase())||(post.title.toLowerCase()).includes(search.toLowerCase())
      
    ))
    setSearchResults(filteredResults.reverse())
  },[posts,search])

  

  const handleSubmit = async   (e) => {
      e.preventDefault();
      let id=posts.length ? posts[posts.length-1].id + 1 : 1
      
      const datetime=format (new Date(),'MMMM dd yyyy pp')
      const newPost={id,title:postTitle,datetime:datetime,body:postBody}
      try{
        const response=await api.post('/posts',newPost)
        const allPosts=[...posts,response.data]
        setPosts(allPosts)
        setPostTitle('')
        setPostBody('')
        navigate('/')
      }catch(err){
          console.log(`Error: ${err.message}`)
        
    }
      
      
  }

  const handleDelete =async (id) =>{

    try{

    await api.delete(`/posts/${id}`)
    const postsList=posts.filter(post => post.id !==id)
    setPosts(postsList)
    navigate('/')
    }catch(err){
      if(err.response){
        console.log(err.response.data)
      }
      else{
        console.log(`Error: ${err.message}`)
      }
  }
}
  return (
    <div className="App">

      

      <Header title="Akgram" />
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>

        <Route path="/" element={
        <Home 
        fetchError={fetchError}
        isLoading={isLoading}
        posts={searchResults}/>}/>
        <Route path="/post"> 
          <Route index element={<NewPost 
          handleSubmit={handleSubmit}
          postBody={postBody}
          setPostBody={setPostBody}
          postTitle={postTitle}
          setPostTitle={setPostTitle}
        
        />} />
            <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
        </Route>
      
        
        <Route path="/about" element={<About />} />
        <Route path="*" element ={ <Missing /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
