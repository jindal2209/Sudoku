import { useEffect, useState } from "react";
import { sudoku } from "../Algorithm/sudoku";
import './sudokuComponent.css';

export function Sudoku() {
	var [grid, setGrid] = useState([]);
	// var [sudokuGrid, setSudokuGrid] = useState([]);

	function resetGrid() {
		var arr = [];
		var numarr = []
		for (var r = 0; r < 9; r++) {
			var sarr = []
			var snumarr = []
			for (var c = 0; c < 9; c++) {
				var cls = ''
				if (r === 2 || r === 5) {
					cls += 'bottom ';
				}
				if (r === 3 || r === 6) {
					cls += 'top ';
				}
				if (c === 2 || c === 5) {
					cls += 'right ';
				}
				if (c === 3 || c === 6) {
					cls += 'left ';
				}
				sarr.push({ 'cls': cls + 'element-block', 'val': '' })
				snumarr.push(0);
			}
			numarr.push(snumarr)
			arr.push(sarr)
		}
		// setSudokuGrid(numarr)
		setGrid(arr);
	}

	useEffect(() => {
		resetGrid();
	}, [])

	function handleGridChange(g) {
		console.log('hihuil');
		setGrid([...g])
	}

	function handleChange() {
		var ele = document.querySelectorAll('.element-block');
		var argrid = [...grid];
		for (var i = 0; i < ele.length; i++) {
			var r = parseInt(i / 9);
			var c = parseInt(i % 9);
			if (ele[i].value === '')
				argrid[r][c].val = ''
			else
				argrid[r][c].val = parseInt(ele[i].value)
		}
		setGrid([...argrid])
	}

	function solve() {
		var myg = sudoku(grid, handleGridChange);
		// setGrid([...myg])
	}

	return (
		<div>
			<div className='navbar'>
				<ul>
					<li><a className='heading' href="#home">Sudoku Solver</a></li>
					<li style={{ float: 'right' }}>
						<a style={{ padding: '5px' }} href="https://github.com/jindal2209/Sudoku" target='_blank' rel='noreferrer' >
							<img style={{ width: '70px' }} src={process.env.PUBLIC_URL + "/iff.png"} alt='myGithub' />
						</a>
					</li>
				</ul>
			</div>
			<div style={{ marginTop: '30px' }}>
				<div className='box'>
					<div className='board'>
						{
							grid.map((row, ridx) => (
								<div key={ridx}>
									<span>
										{
											row.map((col, cidx) => (
												<input
													className={col.cls}
													type='text'
													maxLength='1'
													key={cidx}
													value={col.val}
													onChange={handleChange}
													style={{
														width: 345 / 9,
														height: 345 / 9
													}}
												/>
											))
										}
									</span>
									<br />
								</div>
							))
						}
					</div>
				</div>
				<br />
				<div><button className='btn' id='nqueen' onClick={solve}>SOLVE SUDOKU</button></div>
			</div>
		</div>
	)
}