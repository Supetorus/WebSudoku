using Microsoft.AspNetCore.Mvc;
using WebSudoku.Models;

namespace WebSudoku.Controllers
{
	[ApiController]
	[Route("WebSudoku/DAController")]
	public class DAController : ControllerBase
	{
		public static Board GameBoard { get; private set; } = new Board();

		[Route("GetCurrentGrid")]
		[HttpGet]
		public int[][] GetCurrentBoard()
		{
			return GameBoard.GetCurrentGrid();
		}

		[Route("GetInitialGrid")]
		[HttpGet]
		public int[][] GetInitialBoard()
		{
			return GameBoard.GetInitialGrid();
		}

		[Route("GetCorrectNum/{x}/{y}")]
		[HttpGet]
		public int GetInitialBoard(int x, int y)
		{
			return GameBoard.GetCorrectNum(x, y);
		}

		[Route("SetNum/{x}/{y}/{value}")]
		[HttpPost]
		public bool SetBoardNum(int x, int y, int value)
		{
			return GameBoard.SetNum(x, y, value);
		}

		[Route("Generate")]
		[HttpPost]
		public int[][] GenerateBoard()
		{
			GameBoard.Generate(1);
			return GameBoard.GetInitialGrid();
		}

		[Route("GetHint")]
		[HttpGet]
		public Board.GridNum GetHint()
		{
			return GameBoard.GetHint();
		}
	}
}
