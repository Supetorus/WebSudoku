using Microsoft.AspNetCore.Mvc;
using WebSudoku.Models;

namespace WebSudoku.Controllers
{
	[ApiController]
	[Route("WebSudoku/DAController")]
	public class DAController : ControllerBase
	{
		public Board GameBoard { get; private set; }

		public DAController()
		{
			GameBoard = new Board();
			GameBoard.Generate(1);
		}

		[Route("GetBoard")]
		[HttpGet]
		public int[] GetBoard()
		{
			int[] array = new int[Board.SIZE * Board.SIZE];
			int[,] board = GameBoard.GetGrid();

			for (int i = 0; i < array.Length; ++i)
			{
				array[i] = board[i / Board.SIZE, i % Board.SIZE];
			}

			return array;
		}
	}
}
