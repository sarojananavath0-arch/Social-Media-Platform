
// Load saved posts and messages
let posts = JSON.parse(localStorage.getItem("socialPosts")) || [
    { text: "Welcome to My Social Media Platform!", likes: 0 }
];

let messages = JSON.parse(localStorage.getItem("socialMessages")) || [];

// Save posts
function savePosts() {
    localStorage.setItem("socialPosts", JSON.stringify(posts));
}

// Save messages
function saveMessages() {
    localStorage.setItem("socialMessages", JSON.stringify(messages));
}

// Display posts
function displayPosts() {
    const postContainer = document.getElementById("posts");
    postContainer.innerHTML = "";

    posts.forEach((post, index) => {
        const postDiv = document.createElement("div");
        postDiv.className = "post";

        const paragraph = document.createElement("p");
        paragraph.textContent = post.text;

        const likeButton = document.createElement("button");
        likeButton.textContent = "Like (" + post.likes + ")";
        likeButton.onclick = function () {
            posts[index].likes++;
            savePosts();
            displayPosts();
        };

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.background = "red";
        deleteButton.style.marginLeft = "10px";

        deleteButton.onclick = function () {
            posts.splice(index, 1);
            savePosts();
            displayPosts();
        };

        postDiv.appendChild(paragraph);
        postDiv.appendChild(likeButton);
        postDiv.appendChild(deleteButton);

        postContainer.appendChild(postDiv);
    });
}

// Create a new post
function addPost() {
    const postText = document.getElementById("postText");
    const text = postText.value.trim();

    if (text === "") {
        alert("Please write something before posting!");
        return;
    }

    posts.unshift({
        text: text,
        likes: 0
    });

    savePosts();
    displayPosts();

    postText.value = "";
}

// Display messages
function displayMessages() {
    const messageList = document.getElementById("messageList");
    messageList.innerHTML = "";

    if (messages.length === 0) {
        messageList.textContent = "No messages yet.";
        return;
    }

    messages.forEach(function (message) {
        const paragraph = document.createElement("p");
        paragraph.textContent = message;
        messageList.appendChild(paragraph);
    });
}

// Send a message
function sendMessage() {
    const messageText = document.getElementById("messageText");
    const text = messageText.value.trim();

    if (text === "") {
        alert("Please write a message!");
        return;
    }

    messages.push(text);

    saveMessages();
    displayMessages();

    messageText.value = "";
}

// Display saved content when page opens
displayPosts();
displayMessages();


