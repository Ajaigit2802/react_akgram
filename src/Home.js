import React from 'react'
import Feed from './Feed'

const Home = ({posts,isLoading,fetchError}) => {
  return (
    <main className='Home'>
      {isLoading && <p className='statusMsg'>Loading posts...</p>}
      {!isLoading && fetchError && <p className='statusMsg'>{fetchError}</p>}
      {!isLoading && !fetchError &&
        (posts.length ? (
            <Feed posts={posts} />
        ):
        <p style={{marginTop:"2rem"}}>No post available</p>)
        }
    </main>
  )
}

export default Home