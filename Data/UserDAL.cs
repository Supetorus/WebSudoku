using System.Collections.Generic;
using WebSudoku.Data;
using WebSudoku.Models;
using System.Linq;

namespace WebSudoku.Data
{
	public class UserDAL : IDataAccessLayer<User>
	{
		public Context<User> db { get; set; }

		public void AddItem(User item)
		{
			if(db.Set.Find(item.ID) == null)
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
			return db.Set.ToList();
		}

		public User GetItem(int id)
		{
			return db.Set.Find(id);
		}

		public void RemoveItem(int id)
		{
			var item = db.Set.Find(id);
			if (item != null)
			{
				db.Set.Remove(item);
				db.SaveChanges();
			}
		}

		public IEnumerable<User> SearchCollection(string query)
		{
			throw new System.NotImplementedException();
		}

		public void UpdateItem(User item)
		{
			var result = db.Set.Find(item.ID);
			if (result != null)
			{
				db.Entry(result).CurrentValues.SetValues(item);
				db.SaveChanges();
			}
		}
	}
}
