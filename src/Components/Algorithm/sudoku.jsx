var n = 9
var mygrid = []

function canPlace(grid, i, j, num) {
	for (var r = 0; r <= 9; r++) {
		if (grid[r][j] === num || grid[i][r] === num) {
			console.log(grid, 'can');
			return [grid, false];
		}
	}
	var sx = (i / 3) * 3;
	var sy = (j / 3) * 3;
	for (r = sx; r < sx + 3; r++) {
		for (var c = sy; c < sy + 3; c++) {
			if (grid[i][r] === num) {
				return [grid, false];
			}
		}
	}
	console.log(grid, 'can');
	return [grid, true];
}

function sudokuHelper(grid, i, j) {
	if (i === n) {
		return [grid, true];
	}
	if (j === n) {
		return sudokuHelper(grid, i + 1, 0, n);
	}
	if (grid[i][j] !== 0) {
		return sudokuHelper(grid, i, j + 1, n);
	}
	for (var num = 0; num < 9; num++) {
		var ch = canPlace(grid, i, j, n, num + 1)[1];
		if (ch) {
			grid[i][j] = num + 1;
			var ifsolved = sudokuHelper(grid, i, j + 1, n);
			grid = ifsolved[0];
			if (ifsolved[1] === true) {
				return [grid, true];
			}
		}
	}
	grid[i][j] = 0;
	return [grid, false];
}

export function sudoku(grid) {
	mygrid = []
	for (var i = 0; i < n; i++) {
		var smg = []
		for (var j = 0; j < n; j++) {
			if (grid[i][j].length === 0) {
				smg.push(0)
			}
			else {
				smg.push(parseInt(grid[i][j]))
			}
		}
		mygrid.push(smg)
	}

	var res = sudokuHelper(mygrid, 0, 0);
	console.log(res, 'main');
	return res[0];
}