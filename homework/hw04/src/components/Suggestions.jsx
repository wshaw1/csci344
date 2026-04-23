import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Suggestion from "./Suggestion.jsx";

export default function Suggestions({ token }) {
	const [suggestions, setSuggestions] = useState([]);

	async function getSuggestions() {
		const data = await getDataFromServer(token, "/api/suggestions");
		setSuggestions(data);
	}

	useEffect(() => {
		getSuggestions();
	}, []);

	return (
		<div class="mt-4" id="suggestions">
			<p class="text-base text-gray-400 font-bold mb-4">Suggestions for you</p>
			{
				suggestions.map(suggestion => <Suggestion suggestion={suggestion} /> )
			}
		</div>
	);
}
