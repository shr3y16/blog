document.addEventListener('DOMContentLoaded', () => {
    const deleteButtons = document.querySelectorAll('.delete-btn');

    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const blogId = e.target.getAttribute('data-id');

            if (confirm('Are you sure you want to delete this blog post?')) {
                fetch(`/blogs/${blogId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'success') {
                        // Optionally remove the card from the DOM
                        e.target.closest('.col-md-4').remove();
                    } else {
                        alert('Failed to delete the blog post.');
                    }
                })
                .catch(err => console.error('Error:', err));
            }
        });
    });
});
