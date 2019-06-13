$(document).foundation();

categories = ['adventure', 'coding', 'design', 'entrepreneurship'];

$('.entrepreneurship').css("display", "none");
// $('.coding').css("display", "none");


// 2D array of children;
map = $('.map').children();

/* Does a row after current row exist? */
function hasNext(map, row) {
	if (map[row + 1] == null) {
		return false;
	} else {
		return true;
	}
}

/* Is given row completely empty? */
function isEmpty(map, row) {
	if (map[row] == null) {
		return true;
	}

	if ($(map[row].children[0]).css("display") == "none" 
		&& $(map[0].children[1]).css("display") == "none" 
		&& $(map[0].children[2]).css("display") == "none") {
		return true;
	} else {
		return false;
	}
}

/* Does given row have items in any slot? */
function hasItems(map, row) {
	if (map[row] == null) {
		return false;
	}

	if ($(map[row].children[0]).css("display") != "none" 
		|| $(map[row].children[1]).css("display") != "none" 
		|| $(map[row].children[2]).css("display") != "none") {
		return true;
	} else {
		return false;
	}
}

/* Is there at least one item that occurs later? */
function hasItemsLater(map, row) {
	if (map[row] == null) {
		return false;
	}

	if (hasItems(map, row + 1)) {
		return true;
	} else {
		return hasItemsLater(map, row + 1);
	}
}

/* Delete next item occuring after given row */
function deleteFromNext(map, row) {

	if (!hasNext(map, row)) {
		return null;
	} else if (hasItems(map, row + 1)) {
		// remove one from that row starting at the back
		if ($(map[row + 1].children[2]).css("display") != "none") {
			$(map[row + 1].children[2]).css("display", "none");
			return $(map[row + 1].children[2]);
		} else if ($(map[row + 1].children[1]).css("display") != "none") {
			$(map[row + 1].children[1]).css("display", "none");
			return $(map[row + 1].children[1]);
		} else {
			$(map[row + 1].children[0]).css("display", "none");
			return $(map[row + 1].children[0]);
		}
	} else {
		return deleteFromNext(map, row + 1);
	}
}

/* Recurrsively rearrange a map */
function rearrange(map, row) {
	// BASE CASE: if row doesn't exist or is empty, end.
	if ((map[row] == null || (isEmpty(map, row)) && !hasNext(map, row))) {
		return true;	
	// if either slot 1 or 2 is empty and there's another row, do stuff	
	} else if (($(map[row].children[0]).css("display") == "none" 
		|| $(map[row].children[1]).css("display") == "none" 
		|| $(map[row].children[2]).css("display") == "none") 
		&& hasNext(map, row)) {
		
		if (!hasItemsLater(map, row)) {
			return true;
		}

		// HANDLE SLOT ZERO
		// set empty one to an x
		if ($(map[row].children[0]).css("display") == "none" && hasItemsLater(map, row)) {
			
			var toDelete = deleteFromNext(map, row);
			$(map[row].children[0]).replaceWith(toDelete.wrap('<p/>').parent().html());
			$(toDelete).unwrap();
			$(map[row].children[0]).css("display", "block");
		}

		// HANDLE SLOT ONE
		// set empty one to an x
		if ($(map[row].children[1]).css("display") == "none" && hasItemsLater(map, row)) {
			var toDelete = deleteFromNext(map, row);
			$(map[row].children[1]).replaceWith(toDelete.wrap('<p/>').parent().html());
			$(toDelete).unwrap();
			$(map[row].children[1]).css("display", "block");
		}

		// HANDLE SLOT TWO
		if ($(map[row].children[2]).css("display") == "none" && hasItemsLater(map, row)) {
			var toDelete = deleteFromNext(map, row);
			$(map[row].children[2]).replaceWith(toDelete.wrap('<p/>').parent().html());
			$(toDelete).unwrap();
			$(map[row].children[2]).css("display", "block");
		}

		return rearrange(map, row + 1);
	} else {
		return rearrange(map, row + 1);
	}

}

rearrange(map, 0);


/* the magic lines
	var toDelete = deleteFromNext(map, 0); // deletes and saves item
	$(map[0].children[1]).replaceWith(toDelete.wrap('<p/>').parent().html()); // makes the swap
	$(toDelete).unwrap(); // cleans up the p wrapper left behind
	$(map[0].children[1]).css("display", "block"); // shows that square again
*/