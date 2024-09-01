form.addEventListener("submit", (e) => {
    e.preventDefault();
    const login = {
        email: email.value,
        password: password.value,
    }
    fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            if (data.status == "error") {
                success.style.display = "none"
                error.style.display = "block"
                error.innerText = data.error
            } else {
                error.style.display = "none"
                success.style.display = "block"
                success.innerText = data.success

                setTimeout(() => {
                    window.location.href = "/"; // Redirect to the homepage
                }, 2000); 
            }
        })
})