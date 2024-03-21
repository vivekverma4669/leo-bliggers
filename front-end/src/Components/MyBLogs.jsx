import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const MyBlogs = () => {

  const { token } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (type) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://leo-bliggers.onrender.com/blogs/my/?type=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      setBlogs(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(type);
  }, [token, type]);

  const justfetch = () => {
    setType('');
  };

  const onlytech = () => {
    setType('tech');
  };

  const onlyFood = () => {
    setType('food');
  };

  const onlyNews = () => {
    setType('news');
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://leo-bliggers.onrender.com/blogs/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        alert('Blog deleted successfully');
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div>
      <div className="post-filter container" style={{ display: 'flex', gap: '10px', margin: 'auto', width: '300px', padding: '20px', fontSize: '20px', justifyContent: 'space-between', border: '2px solid black', borderEndStartRadius: '10px', borderEndEndRadius: '10px' }}>
        <span className="filter-item" onClick={justfetch} id={type === '' ? 'active-filter' : ''}>All</span>
        <span className="filter-item" onClick={onlytech} id={type === 'tech' ? 'active-filter' : ''}>Tech</span>
        <span className="filter-item" onClick={onlyFood} id={type === 'food' ? 'active-filter' : ''}>Food</span>
        <span className="filter-item" onClick={onlyNews} id={type === 'news' ? 'active-filter' : ''}>News</span>
      </div>

      <h2>Your Blogs</h2>

      <div style={{ display: 'flex', flexDirection: 'column', rowGap: '30px', padding: '70px', justifyContent: 'center' }}>
        {!loading ?
          blogs.map((blog) => (
            <div key={blog._id} style={{ width: '100%', border: '2px solid black', display: 'flex', textAlign: 'center', borderRadius: '10px' , height :'250px' }}>
              <Link to={`/blogDetail/${blog._id}`}>
                <img src={blog.imageUrl} style={{ height: '100%' , width :'auto' }} />
              </Link>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <h2 style={{ color: 'teal' }}> {blog.title}</h2>
                <p>Type: {blog.type}</p>
                <p>{blog.content}</p>
                <div align='right'>
                  <span>Author: {blog.auth_email}</span>
                  <Link to={`/blogDetail/${blog._id}`} > <button style={{ margin: '10px' }} > Edit <img src='https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png' style={{ width: "20px" }} /> </button> </Link>
                  <button style={{ margin: '10px' }} onClick={() => { handleDelete(blog._id) }}>Delete <img src='https://cdn-icons-png.flaticon.com/512/3687/3687412.png' style={{ width: "20px" }} /></button>
                </div>
              </div>
            </div>





{/* 


  <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '200px' }}
    src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
    alt='Caffe Latte'
  />

  <Stack>
    <CardBody>
      <Heading size='md'>The perfect latte</Heading>

      <Text py='2'>
        Caffè latte is a coffee beverage of Italian origin made with espresso
        and steamed milk.
      </Text>
    </CardBody>

    <CardFooter>
      <Button variant='solid' colorScheme='blue'>
        Buy Latte
      </Button>
    </CardFooter>
  </Stack>
</Card>







 */}




          ))
          :
          <img src='https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif' alt='load' style={{ width: '250px' }} />
        }

        {blogs.length === 0 ?
          <div style={{ width: '600px', margin: 'auto' }}>
            <img src='https://cdn.dribbble.com/users/95510/screenshots/1694572/no-chat_gif.gif' />
          </div>
          : ""
        }
      </div>
    </div>
  )
};

export default MyBlogs;
