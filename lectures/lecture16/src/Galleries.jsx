import React, { useState } from "react";

export default function Galleries({ galleries, activeIndex, setActiveIndex}) {
	console.log(galleries);

	function switchGallery() {
		alert("switch gallery!");
		setActiveIndex(idx);
	}

	return (
		<>
			{
				galleries.map(function(gallery, idx) {
					return (
						<button
							onClick={() => {
								switchGallery(idx);
							}}
						>
							{gallery.name} - {idx === activeIndex ? "Active" : ""}
						</button>
					)
				})
			}
		</>
	);
}
