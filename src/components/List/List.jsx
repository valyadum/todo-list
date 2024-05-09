import { Box, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function List() {
  const [todo, setTodo] = useState([]);
  const [error, setError] = useState(null); 
   const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
        setIsLoading(true);
       fetch('https://jsonplaceholder.typicode.com/posts')
         .then(response => response.json())
         .then(data => {
           setTodo(data);
         })
         .catch(err => {
           setError(err);
           console.error(err);
         })
         .finally(() => {
           setIsLoading(false);
         });
      }, []);
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
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {todo &&
          todo.map(item => {
            return (
              <Grid item xs={8} key={item.id}>
                <Card sx={{ minWidth: 275 }}>
                  <Link to={`${item.id}`}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {item.body}
                      </Typography>
                    </CardContent>
                  </Link>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    );
}

export default List