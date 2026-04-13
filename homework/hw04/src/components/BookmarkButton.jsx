import React, {useState} from "react";
import {postDataToServer, deleteDataFromServer} from "../server-requests.jsx";

export default function BookmarkButton({bookmarkId, postId, token}) {
	const [stateBookmarkId, setStateBookmarkId] = useState(bookmarkId);

	async function createBookmark() {
		const sendData = {
			post_id: postId,
		};
		const responseData = await postDataToServer(
			token,
			"/api/bookmarks/",
			sendData
		);
		setStateBookmarkId(responseData.id);
	}

	async function deleteBookmark() {
		const responseData = await deleteDataFromServer(
			token,
			"/api/bookmarks/" + bookmarkId
		);
		setStateBookmarkId(null);
	}

	if (stateBookmarkId) {
		return (
			<button onClick={deleteBookmark}>
				<i className="fas fa-bookmark" />
			</button>
		);
	} else {
		return (
			<button onClick={createBookmark}>
				<i className="far fa-bookmark" />
			</button>
		);
	}
}
