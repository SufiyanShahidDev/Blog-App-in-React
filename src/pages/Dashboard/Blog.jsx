import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase/config.js';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../../components/Navbar.jsx';
import CreateBlogModal from '../../components/CreateBlogModal.jsx';

const Blog = () => {
  const [user, setUser] = useState(null)

  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(user)

        // ...
      } else {

        setUser(null)
        // ...
      }
    });
  };



  useEffect(() => {
    getUser()
  }, [])
  return (
    <>

      <Navbar user={user} />

      <CreateBlogModal
       />
      
    </>

  )
}

export default Blog