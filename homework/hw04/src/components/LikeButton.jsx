import React, {useState} from "react";
import {postDataToServer, deleteDataFromServer} from "../server-requests.jsx";

export default function likeButton({likeId, postId, token}) {
	const [stateLikeId, setStateLikeId] = useState(likeId);

	async function createLike() {
		const sendData = {
			post_id: postId,
		};
		const responseData = await postDataToServer(
			token,
			"/api/likes/",
			sendData
		);
		setStateLikeId(responseData.id);
	}

	async function deleteLike() {
		const responseData = await deleteDataFromServer(
			token,
			"/api/likes/" + likeId
		);
		setStateLikeId(null);
	}

	if (stateLikeId) {
		return (
			<button onClick={deleteLike}>
				<i className="fas fa-heart text-red-600" />
			</button>
		);
	} else {
		return (
			<button onClick={createLike}>
				<i className="far fa-heart" />
			</button>
		);
	}
}

