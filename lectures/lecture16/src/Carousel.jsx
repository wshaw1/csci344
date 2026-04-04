import React from "react";
import { useState } from "react";
import "./Carousel.css";

export default function Carousel({ gallery }) {
	console.log(gallery);
	const [currentImage, changeImage] = useState(0);
	return (
		<div className="carousel">
			{/* display the first image in the gallery array below */}
			{/* also display a "Photo X of Y" message below the image */}
			<img src={gallery[currentImage]} />
			<p>Photo {currentImage} of 10</p>
			<button onClick={changeImage(currentImage+1)}>next</button>
			<button onClick={changeImage(currentImage-1)}>prev</button>
		</div>
	);
}
