document.addEventListener('DOMContentLoaded', function() {
    // Form validation for review submission
    const reviewForm = document.getElementById('reviewForm');
    
    if (reviewForm) {
      reviewForm.addEventListener('submit', function(event) {
        let isValid = true;
        
        // Validate username
        const username = document.getElementById('username');
        const usernameError = document.getElementById('username-error');
        
        if (!username.value.trim()) {
          usernameError.textContent = 'Please enter your name';
          isValid = false;
        } else if (username.value.trim().length < 3) {
          usernameError.textContent = 'Name must be at least 3 characters';
          isValid = false;
        } else {
          usernameError.textContent = '';
        }
        
        // Validate rating
        const rating = document.getElementById('rating');
        const ratingError = document.getElementById('rating-error');
        
        if (!rating.value) {
          ratingError.textContent = 'Please select a rating';
          isValid = false;
        } else {
          ratingError.textContent = '';
        }
        
        // Validate comment
        const comment = document.getElementById('comment');
        const commentError = document.getElementById('comment-error');
        
        if (!comment.value.trim()) {
          commentError.textContent = 'Please enter your review';
          isValid = false;
        } else if (comment.value.trim().length < 10) {
          commentError.textContent = 'Review must be at least 10 characters';
          isValid = false;
        } else {
          commentError.textContent = '';
        }
        
        // Prevent form submission if validation fails
        if (!isValid) {
          event.preventDefault();
        }
      });
    }
    
    // Add animation to movie cards and review cards
    const cards = document.querySelectorAll('.movie-card, .review-card');
    
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });
  });