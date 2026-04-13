import React from "react";

export default function Comments({post}) {
	let comment_block = (
			<div> </div>
		);
	if (post.comments.length === 1) {
		comment_block = (
			<div>
				<p className="text-sm mb-3">
					<strong>{post.comments[0].user.username}</strong>
					{post.comments[0].text}
				</p>
				<p className="uppercase text-gray-500 text-xs">{post.comments[0].display_time}</p>
			</div>
		);
	} else if (post.comments.length === 2) {
		comment_block = (
			<div>
				<p className="text-sm mb-3">
					<strong>{post.comments[0].user.username}</strong>
					{post.comments[0].text}
				</p>
				<p className="uppercase text-gray-500 text-xs">{post.comments[0].display_time}</p>
				<p className="text-sm mb-3">
					<strong>{post.comments[1].user.username}</strong>
					{post.comments[1].text}
				</p>
				<p className="uppercase text-gray-500 text-xs">{post.comments[1].display_time}</p>
			</div>
		);
	} else if (post.comments.length > 2) {
		comment_block = (
			<div>
				<button className="text-blue-500 py-2">View all {post.comments.length} comments</button>
				<p className="text-sm mb-3">
					<strong>{post.comments[0].user.username}</strong>
					{post.comments[0].text}
				</p>
				<p className="uppercase text-gray-500 text-xs">{post.comments[0].display_time}</p>
			</div>
		);
	}
	return comment_block;
}
