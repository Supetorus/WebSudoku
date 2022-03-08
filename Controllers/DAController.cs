using Microsoft.AspNetCore.Mvc;
using WebSudoku.Models;
using WebSudoku.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace WebSudoku.Controllers
{
	[Authorize]
	[ApiController]
	[Route("WebSudoku/DAController")]
	public class DAController : ControllerBase
	{
		private readonly UserDAL dal;
		private readonly UserManager<IdentityUser> UserManager;
		public static User GameUser { get; set; }
		public static Board GameBoard { get; private set; }

		public DAController(IDataAccessLayer<User> dal, UserManager<IdentityUser> UserManager)
		{
			this.dal = dal as UserDAL;
			this.UserManager = UserManager;
		}

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

		[Route("Generate/{difficulty}")]
		[HttpPost]
		public int[][] GenerateBoard(int difficulty)
		{
			if(GameBoard.ID != 0 && !GameBoard.IsGameWon())
			{
				dal.RemoveBoard(GameBoard.ID);
			}
			GameBoard.Generate(difficulty);
			GameBoard.Save(0);
			GameBoard.ID = 0;
			GameBoard.ID = dal.AddBoard(GameBoard);
			dal.SaveGame(GameUser, GameBoard);
			return GameBoard.GetInitialGrid();
		}

		[Route("GetHint")]
		[HttpGet]
		public string GetHint()
		{
			Board.GridNum gn = GameBoard.GetHint();
			return $"{gn.x},{gn.y},{gn.value}";
		}

		[Route("GetUndo")]
		[HttpGet]
		public string GetUndo()
		{
			Board.GridNum gn = GameBoard.GetUndo();
			GameBoard.SetNumUndo(gn.x, gn.y, gn.value);
			return $"{gn.x},{gn.y},{gn.value}";
		}

		[Route("Save/{time}")]
		[HttpPost]
		public void Save(float time)
		{
			GameBoard.Save(time);
			dal.SaveGame(GameUser, GameBoard);
		}

		[Route("Load")]
		[HttpPost]
		public bool Load()
		{
			GameUser = dal.GetItem(UserManager.GetUserId(User));
			if (GameUser.CurrentBoardID != 0)
			{
				GameBoard = dal.GetBoard(GameUser.CurrentBoardID);
				GameBoard.Load();
				return true;
			}
			else
			{
				GameBoard = new Board();
				GameBoard.UserID = GameUser.ID;
				return false;
			}
		}
	}
}
