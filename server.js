const express = require('express');
const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // Parse form data

// Sample data (no database)
const movies = [
  { id: 1, title: "Inception", description: "A thief who steals corporate secrets through the use of dream-sharing technology.", year: 2010, director: "Christopher Nolan" },
  { id: 2, title: "The Matrix", description: "A computer hacker learns about the true nature of reality and his role in the war against its controllers.", year: 1999, director: "The Wachowskis" },
  { id: 3, title: "Interstellar", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", year: 2014, director: "Christopher Nolan" },
  { id: 4, title: "The Shawshank Redemption", description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", year: 1994, director: "Frank Darabont" },
  { id: 5, title: "Pulp Fiction", description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", year: 1994, director: "Quentin Tarantino" }
];

let reviews = [
  { id: 1, movieId: 1, username: "moviefan123", rating: 5, comment: "Mind-blowing concept and execution!" },
  { id: 2, movieId: 2, rating: 4, username: "scifi_lover", comment: "Revolutionary for its time, still holds up today." }
]; 

// Routes
app.get('/', (req, res) => {
  res.render('index', { movies });
});

// Form to submit a review
app.get('/review/:movieId', (req, res) => {
  const movieId = parseInt(req.params.movieId);
  const movie = movies.find(m => m.id === movieId);
  
  if (!movie) {
    return res.status(404).send('Movie not found');
  }
  
  res.render('review', { movie });
});

// Handle form submission
app.post('/submit-review', (req, res) => {
  const { movieId, username, rating, comment } = req.body;
  
  // Simple validation
  if (!movieId || !username || !rating || !comment) {
    return res.status(400).send('All fields are required');
  }
  
  // Create new review
  const newReview = {
    id: reviews.length + 1,
    movieId: parseInt(movieId),
    username,
    rating: parseInt(rating),
    comment,
    date: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
  };
  
  // Add to reviews array
  reviews.push(newReview);
  
  res.redirect('/reviews'); // Show all reviews
});

// Display all reviews
app.get('/reviews', (req, res) => {
  // Enhance reviews with movie titles for display
  const enhancedReviews = reviews.map(review => {
    const movie = movies.find(m => m.id === review.movieId);
    return {
      ...review,
      movieTitle: movie ? movie.title : 'Unknown Movie'
    };
  });
  
  res.render('reviews', { reviews: enhancedReviews });
});

// View a specific movie and its reviews
app.get('/movie/:movieId', (req, res) => {
  const movieId = parseInt(req.params.movieId);
  const movie = movies.find(m => m.id === movieId);
  
  if (!movie) {
    return res.status(404).send('Movie not found');
  }
  
  const movieReviews = reviews.filter(r => r.movieId === movieId);
  
  res.render('movie', { movie, reviews: movieReviews });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});