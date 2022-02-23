﻿using Microsoft.AspNetCore.Mvc;
using WebSudoku.Models;

namespace WebSudoku.Controllers
{
	[ApiController]
	[Route("WebSudoku/DAController")]
	public class DAController : ControllerBase
	{
		public static Board GameBoard { get; private set; } = new Board();

		[Route("GetBoard")]
		[HttpGet]
		public int[][] GetBoard()
		{
			return GameBoard.GetGrid();
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
			return GameBoard.GetGrid();
		}
	}
}
