document.addEventListener('DOMContentLoaded', () => {
    const updateForms = document.querySelectorAll('[id^="updateBlogForm"]');

    updateForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const formData = new FormData(form);
            const blogId = form.getAttribute('action').split('/').pop(); // Extract blog ID from form action URL

            fetch(`/blogs/${blogId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: formData.get('title'),
                    content: formData.get('content')
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert('Blog post updated successfully.');
                        location.reload(); 
                    } else {
                        alert('Failed to update the blog post.');
                    }
                })
                .catch(err => console.error('Error:', err));
        });
    });
});