// sets variables involving items and positions of said items in the "carousel"
let currentPosition = 0;
let gap = 10;
const slideWidth = 400;

// a function that is called when either button "back" or "forward" is pressed
// accepts 1 parameter as which button is clicked
function moveCarousel(direction) {

		// selects all of the items with the tag "carousel-item"
    const items = document.querySelectorAll(".carousel-item");

		// increments or decrements the currentPosition variable based on which button is clicked
    if (direction == "forward") {
        // minus 2 b/c first 2 slides already showing
        if (currentPosition >= items.length - 2) {
            return false;
        }
        currentPosition++;
    } else {
        if (currentPosition == 0) {
            return false;
        }
        currentPosition--;
    }

		// converts the current slide position into a pixel offset for the large slide of items
    const offset = (slideWidth + gap) * currentPosition;

		// moves the position of each item so that only the ones in frame are visible
    for (const item of items) {
        item.style.transform = `translateX(-${offset}px)`;
    }
}
