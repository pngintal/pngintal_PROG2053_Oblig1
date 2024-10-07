let currentPage = 1;
const APIposts = document.getElementById('API_posts');
const loadingText = document.getElementById('loading');
let allPostsFetched = false; // Variable to check if all posts are fetched

// Function that fetches posts from API
function fetchPosts(page, limit = 27) {
    if (allPostsFetched) return; // Prevents fetching if all posts are fetched

    loadingText.style.display = 'block'; // Shows loading text while fetching
    
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
        .then(response => response.json())
        .then(posts => {
            if (posts.length === 0) {
                allPostsFetched = true;  // Set variable to true if no more posts are fetched
                loadingText.style.display = 'none';  // Hides loading text if no more posts
                return;  // Stops the function if no more posts
            }
            
            // Makes a post for each post fetched
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                `;
                APIposts.appendChild(postElement); // Appends the latest post
            });
            
            loadingText.style.display = 'none'; // Hides loading text when posts are loaded
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
            loadingText.style.display = 'none';
        });
}

// Loads first set of posts
fetchPosts(currentPage);

// Loads more posts on scroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 && !allPostsFetched) {
        currentPage++;
        fetchPosts(currentPage, 3);  // Loads the next row of posts
    }
});