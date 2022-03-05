using System.Collections.Generic;
using WebSudoku.Data;
using WebSudoku.Models;
using System.Linq;

namespace WebSudoku.Data
{
	public class UserDAL : IDataAccessLayer<User>
	{
		public UserContext db { get; set; }

		public void AddItem(User item)
		{
			if(db.Users.Find(item.ID) == null)
			{
				db.Add(item);
			}
		}

		public IEnumerable<User> FilterCollection(params string[] filters)
		{
			throw new System.NotImplementedException();
		}

		public IEnumerable<User> GetCollection()
		{
			return db.Users.ToList();
		}

		public User GetItem(int id)
		{
			return db.Users.Find(id);
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

		public Board LoadGame(int userID)
		{
			Board board = db.Boards.FirstOrDefault(x => x.UserID == userID);
			board?.Load();

			return board;
		}

		public void SaveGame(Board board)
		{
			board.Save();

			var result = db.Boards.Find(board.ID);
			if (result != null)
			{
				db.Entry(result).CurrentValues.SetValues(board);
				db.SaveChanges();
			}
			else
			{
				db.Add(board);
			}
		}
	}
}
