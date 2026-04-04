// requires utilities.js to be loaded first:
// included in index.html


let token = null;
const rootURL = "https://photo-app-secured.herokuapp.com";
let username = "wshaw";   // change to your username :)
let password = "password";
let userData = null;

async function initializeScreen() {
    token = await getToken();
    showNav();
    // invoke all of the Part 1 functions here
		showPosts();
		getUser();
		showSuggestions();
		showStories();
}

async function showStories() {
	    const response = await fetch(`${rootURL}/api/stories/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
        }
    });
    const data = await response.json();

		data.forEach(post => {
			document.querySelector("#stories").insertAdjacentHTML("beforeend", `
				<div class="flex flex-col justify-center items-center">
					<img src=${post.user.thumb_url} class="rounded-full border-4 border-gray-300" />
					<p class="text-xs text-gray-500">${post.user.username}</p>
        </div>
			`);
		});
		
}

async function showSuggestions() {
	    const response = await fetch(`${rootURL}/api/suggestions/`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
        }
    });
    const data = await response.json();

		document.querySelector("#suggestions").innerHTML = `
			<p class="text-base text-gray-400 font-bold mb-4">Suggestions for you</p>
		`;

		data.forEach(post => {
			document.querySelector("#suggestions").insertAdjacentHTML("beforeend", `
				<section class="flex justify-between items-center mb-4 gap-2">
					<img src=${post.thumb_url} class="rounded-full" />
					<div class="w-[180px]">
						<p class="font-bold text-sm">${post.username}</p>
						<p class="text-gray-500 text-xs">suggested for you</p>
					</div>
					<button class="text-blue-500 text-sm py-2">follow</button>
				</section>
			`);
		});
		
}

async function getUser() {
	const response = await fetch("https://photo-app-secured.herokuapp.com/api/profile/", {
			method: "GET",
			headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
			}
	});
	const data = await response.json();
	userData = data;

	document.querySelector("#user").innerHTML = `
		<img src=${data.thumb_url} class="rounded-full w-16">
		<h2 class="font-Comfortaa font-bold text-2xl">${data.username}</h2>
	`;
}

// fetch and display the posts
async function showPosts() {
	const endpoint = `${rootURL}/api/posts/`;

	const response = await fetch(endpoint, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
	});

	const posts = await response.json();

	const postsContainerEl = document.querySelector("#postsContainer");

	posts.forEach(post => {
		const htmlSnippet = postToHTML(post);
		postsContainerEl.insertAdjacentHTML('beforeend', htmlSnippet);
	});

}

function getComments(post) {
	if (post.comments.length == 0) {
		return "";
	} else if (post.comments.length == 1) {
		return `
			<p class="text-sm mb-3">
				<strong>${post.comments[0].user.username}</strong>
				${post.comments[0].text}
			</p>
		`;
	} else {
		return `
			<button class="text-blue-500 text-sm py-2">View all ${post.comments.length} comments</button>
			<p class="text-sm mb-3">
				<strong>${post.comments[0].user.username}</strong>
				${post.comments[0].text}
			</p>
		`;
	}
}

function getLikes(post) {
	if (post.likes.length === 0) {
		return `${post.likes.length} likes`;
	} else if (post.likes.length === 1) {
		return "1 like";
	} else {
		return `${post.likes.length} likes`;
	}
}

function getLikeButton(post) {
	if (post.current_user_like_id !== undefined) {
		return `
			<button onclick="unLike(${post.current_user_like_id})">
				<i class="fas fa-heart" style="color: rgb(255, 59, 59);"></i>
			</button>
		`;
	} else {
		return `
			<button onclick="like(${post.id})">
				<i class="far fa-heart"></i>
			</button>
		`;
	}
}

async function like(postID) {
	const endpoint = '/api/likes/';
	const postData = {
    "post_id": postID,
	};

	const response = await fetch(`${rootURL}/api/likes/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(postData)
	});
	const data = await response.json();
	console.log(data);
}

async function unLike(likeId) {
	const endpoint = `${rootURL}/api/likes/${likeId}`
	const response = await fetch(endpoint, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		}
	});
	const data = await response.json();
	console.log(data);
}

function getBookmarkButton(post) {
	if (post.current_user_bookmark_id !== undefined) {
		return `
			<button onclick="unBookmark(${post.current_user_bookmark_id})">
				<i class="fas fa-bookmark"></i>
			</button>
		`;
	} else {
		return `
			<button onclick="bookmark(${post.id})">
				<i class="far fa-bookmark"></i>
			</button>
		`;
	}
}

async function bookmark(postID) {
	const endpoint = '/api/bookmarks/';
	const postData = {
    "post_id": postID,
	};

	const response = await fetch(`${rootURL}/api/bookmarks/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		body: JSON.stringify(postData)
	});
	const data = await response.json();
	console.log(data);
}

async function unBookmark(bookmarkId) {
	const endpoint = `${rootURL}/api/bookmarks/${bookmarkId}`
	const response = await fetch(endpoint, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		}
	});
	const data = await response.json();
	console.log(data);
}

function postToHTML(post) {
	return `
		<section class="bg-white border mb-10">
			<div class="p-4 flex justify-between">
				<h3 class="text-lg font-Comfortaa font-bold">${post.user.username}</h3>
				<button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
			</div>
			<img src="${post.image_url}" alt="${post.alt_text}" width="300" height="300" class="w-full bg-cover">
			<div class="p-4">
				<div class="flex justify-between text-2xl mb-3">
					<div>
						${getLikeButton(post)}
						<button><i class="far fa-comment"></i></button>
						<button><i class="far fa-paper-plane"></i></button>
					</div>
					<div>
						${getBookmarkButton(post)}
					</div>
				</div>
				<p class="font-bold mb-3">${getLikes(post)}</p>
				<div class="text-sm mb-3">
					<p>
						<strong>${post.user.username}</strong>
						${post.caption}
					</p>
				</div>
				${getComments(post)}		
				<p class="uppercase text-gray-500 text-xs">${post.display_time}</p>
			</div>
			<div class="flex justify-between items-center p-3">
				<div class="flex items-center gap-3 min-w-[80%]">
					<i class="far fa-smile text-lg"></i>
					<input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
				</div>
				<button class="text-blue-500 py-2">Post</button>
			</div>
		</section>
	`
}

async function getToken() {
    return await getAccessToken(rootURL, username, password);
}

function showNav() {
    document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:









// after all of the functions are defined, 
// invoke initialize at the bottom:
initializeScreen();
