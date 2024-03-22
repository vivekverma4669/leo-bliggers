import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Card, CardHeader, CardBody, CardFooter, Image, Stack, Heading, Text, Button } from '@chakra-ui/react';

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
            <Card key={blog._id}  direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
              <Image src={blog.imageUrl}    objectFit='cover' maxW={{ base: '100%', sm: '200px' }}/>
              <Stack spacing={4} p={6}>
                <Heading color="teal">{blog.title}</Heading>
                <Text>Type: {blog.type}</Text>
                <Text>{blog.content}</Text>
                <Stack direction="row" justify="flex-end">
                  <Text>Author: {blog.auth_email}</Text>
                  <Link to={`/blogDetail/${blog._id}`}>
                    <Button variant="outline" colorScheme="teal" leftIcon={<img src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png" style={{ width: "20px" }} />}>Edit</Button>
                  </Link>
                  <Button variant="outline" colorScheme="red" onClick={() => { handleDelete(blog._id) }} leftIcon={<img src="https://cdn-icons-png.flaticon.com/512/3687/3687412.png" style={{ width: "20px" }} />}>Delete</Button>
                </Stack>
              </Stack>
            </Card>
          ))
          :
          <img src='https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif' alt='load' style={{ width: '250px' }} />
        }

        {blogs.length === 0 ?
          <div style={{ width: '600px', margin: 'auto' }}>
            <img src='https://cdn.dribbble.com/users/95510/screenshots/1694572/no-chat_gif.gif' alt="No blogs available"/>
          </div>
          : ""
        }

        </div>
    </div>
  )
};

export default MyBlogs;
