function addPost() {
    const postInput = document.getElementById('post-input');
    const posts = document.getElementById('posts');
    const postText = postInput.value.trim();

    if (postText) {
        const post = document.createElement('div');
        post.textContent = postText;
        post.className = 'post';
        posts.appendChild(post);
        postInput.value = '';
    } else {
        alert('Please write something to post.');
    }
}

function buyVideo(videoName, price) {
    const paymentMethod = prompt(`You are buying "${videoName}" for ${price} BDT. Enter your payment method (bKash/Nagad):`);

    if (paymentMethod && (paymentMethod.toLowerCase() === 'bkash' || paymentMethod.toLowerCase() === 'nagad')) {
        alert(`Payment successful via ${paymentMethod}. You have purchased "${videoName}".`);
    } else {
        alert('Invalid payment method. Please try again.');
    }
}
