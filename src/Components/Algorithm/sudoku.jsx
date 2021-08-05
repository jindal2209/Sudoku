var n = 9

function givePosition(i, j) {
	return (i * 9) + j;
}

function canPlace(grid, i, j, num) {
	for (var r = 0; r < n; r++) {
		var p1 = givePosition(r, j)
		var p2 = givePosition(i, r)
		if (grid[p1].value === num || grid[p2].value === num) {
			return false;
		}
	}
	var sx = parseInt(i / 3) * 3;
	var sy = parseInt(j / 3) * 3;
	for (r = sx; r < sx + 3; r++) {
		for (var c = sy; c < sy + 3; c++) {
			p1 = givePosition(i, r)
			if (grid[p1].value === num) {
				return false;
			}
		}
	}
	return true;
}

async function sudokuHelper(grid, i, j) {
	var pos = (i * 9) + j;
	if (i === n) {
		return true;
	}
	if (j === n) {
		return sudokuHelper(grid, i + 1, 0);
	}
	if (grid[pos].value !== '') {
		return sudokuHelper(grid, i, j + 1);
	}
	for (var num = 0; num < 9; num++) {
		var ch = canPlace(grid, i, j, num + 1);
		if (ch === true) {
			grid[pos].value = num + 1;
			var ifsolved = sudokuHelper(grid, i, j + 1);
			if (ifsolved === true) {
				return true;
			}
		}
	}
	grid[pos].value = '';
	return false;
}

export function sudoku() {
	var grid = document.querySelectorAll('.element-block');
	sudokuHelper(grid, 0, 0);
}