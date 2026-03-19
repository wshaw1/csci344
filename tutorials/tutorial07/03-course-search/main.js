let searchTerm = "";
let openOnly = false;

function getInstructorString(course) {
	return course.Instructors.map((instructor) => instructor.Name).join(
		" &bull; ",
	);
}

function isClassOpen(course) {
    return course.Classification.Open;
}

function doesTermMatch(course) {
	// If searchTerm is empty, return true (show all courses)
	if (searchTerm === "") {
		return true;
	}

	// Convert searchTerm to lowercase
	searchTerm = searchTerm.toLowerCase().trim();

	// Check if searchTerm appears in (all converted to lowercase):
	//   - course.Code
	codeMatch = course.Code.toLowerCase().includes(searchTerm);

	//   - course.Title
	titleMatch = course.Title.toLowerCase().includes(searchTerm);

	//   - course.CRN (convert to string first)
	crnMatch = course.CRN === searchTerm;

	//   - course.Instructors[].Name (use map to get all names, then join)
	instructorMatch = getInstructorString(course)
		.toLowerCase()
		.includes(searchTerm);
	
	// Use includes() for case-insensitive matching
	// Return true if searchTerm matches any of these fields
	return codeMatch || titleMatch || crnMatch || instructorMatch;
}

function dataToHTML(course) {
    // should return a formatted HTML card with the relevant course info
    // (using template literals). 
	return `
		<section class="course-card">
			<h2>${course.Code}: ${course.Title}</h2>
			${getOpenClosedHTML(course)}
			<p>
				${course.Days} &bull; ${course.Location.FullLocation} 201&bull; ${course.Hours} credit hour(s)
			</p>
			<p>
				<strong>${getInstructorString(course)}</strong>
			</p>
		</section>
	`;
}

function getOpenClosedHTML(course) {
	if (!isClassOpen(course)) {
		return `
			<p class="status closed">
        <i class="fa-solid fa-circle-check"></i>
        Closed &bull; ${course.CRN} &bull; Num on waitlist ${course.WaitlistAvailable}
			</p>
		`;
	} else {
		return `
			<p class="status open">
        <i class="fa-solid fa-circle-check"></i>
        Open &bull; ${course.CRN} &bull; Seats Available: ${course.EnrollmentMax - course.EnrollmentCurrent}
			</p>
		`;
	}
}

function showMatchingCourses() {
	const containerEl = document.querySelector(".courses");
	containerEl.innerHTML = "";
	let matchingCourses = courseList.filter(doesTermMatch);

	if (openOnly) {
		matchingCourses = matchingCourses.filter(isClassOpen);
	}

	if (matchingCourses.length === 0) {
		containerEl.innerHTML = "No courses match your search.";
		return;
	}
	
	matchingCourses.forEach((course) => {
		const htmlSnippet = dataToHTML(course);
		containerEl.insertAdjacentHTML("beforeend", htmlSnippet);
	});
}

function filterCourses() {
	searchTerm = document.querySelector("#search_term").value;
	openOnly = document.querySelector("#is_open").checked;
	showMatchingCourses();
}

// show all courses initially:
showMatchingCourses();
