import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

function Details() {
  const { id } = useParams();
  const [todo, setTodo] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/list';
  useEffect(() => {
    setIsLoading(true);
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => response.json())
        .then(data => {
          setTodo(data);
        })
        .catch(err => {
          setError(err); 
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [id]);

 if (error) {
   return (
     <Typography variant="h6" color="error" align="center">
       Oops there's a mess: {error.message}
     </Typography>
   );
 }
 return isLoading ? (
   <Box
     display="flex"
     justifyContent="center"
     alignItems="center"
     height="100vh"
   >
     <CircularProgress size={30} />
   </Box>
 ) : (
   <div>
     <Link to={backLinkHref} style={{ margin: 30 }}>
       &#60; Back to list
     </Link>
     {todo && (
       <Box
         height={400}
         width={800}
         my={9}
         mx={'auto'}
         display="flex"
         flexDirection="column"
         alignItems="center"
         justifyContent="center"
         gap={6}
         p={2}
         backgroundColor="#d3d3d310"
         sx={{ border: '2px solid grey' }}
       >
         <Typography variant="h5">Title: {todo.title}</Typography>
         <Typography sx={{ mb: 1.5 }} color="text.secondary">
           Text: {todo.body}
         </Typography>
       </Box>
     )}
   </div>
 );
}

export default Details;
