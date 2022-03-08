using System.Collections.Generic;
using WebSudoku.Data;
using WebSudoku.Models;
using WebSudoku.Controllers;
using System.Linq;

namespace WebSudoku.Data
{
	public class UserDAL : IDataAccessLayer<User>
	{
		private UserContext db;

		public UserDAL(UserContext context)
		{
			db = context;
		}

		public void AddItem(User item)
		{
			if(db.Users.Find(item.ID) == null)
			{
				db.Add(item);
				db.SaveChanges();
			}
		}

		public int AddBoard(Board item)
		{
			if (db.Boards.Find(item.ID) == null)
			{
				db.Add(item);
				db.SaveChanges();
				return db.Boards.FirstOrDefault(x => x.InitialData == item.InitialData).ID;
			}

			return 0;
		}

		public IEnumerable<User> FilterCollection(params string[] filters)
		{
			throw new System.NotImplementedException();
		}

		public IEnumerable<User> GetCollection()
		{
			return db.Users.ToList();
		}

		public User GetItem(string id)
		{
			User item = db.Users.FirstOrDefault(x => x.AuthID == id);
			if(item == null)
			{
				item = new User();
				item.AuthID = id;
				AddItem(item);
				db.SaveChanges();
			}

			return item;
		}

		public Board GetBoard(int id)
		{
			return db.Boards.Find(id);
		}

		public void RemoveItem(int id)
		{
			var item = db.Users.Find(id);
			if (item != null)
			{
				db.Users.Remove(item);
				db.SaveChanges();
			}
		}

		public IEnumerable<User> SearchCollection(string query)
		{
			throw new System.NotImplementedException();
		}

		public void UpdateItem(User item)
		{
			var result = db.Users.Find(item.ID);
			if (result != null)
			{
				db.Entry(result).CurrentValues.SetValues(item);
				db.SaveChanges();
			}
		}

		public int UpdateBoard(Board board)
		{
			var result = db.Boards.Find(board.ID);
			if (result != null)
			{
				db.Entry(result).CurrentValues.SetValues(board);
				db.SaveChanges();
				return board.ID;
			}
			else
			{
				db.Add(board);
				db.SaveChanges();
				return db.Boards.FirstOrDefault(x => x.InitialData == board.InitialData).ID;
			}
		}

		public Board LoadGame(int userID)
		{
			Board board = db.Boards.FirstOrDefault(x => x.UserID == userID);
			board?.Load();

			return board;
		}

		public void SaveGame(User user, Board board)
		{
			user.CurrentBoardID = UpdateBoard(board);

			UpdateItem(user);
		}

		public void List()
		{
			List<Board> list = db.Boards.ToList();
		}
	}
}
