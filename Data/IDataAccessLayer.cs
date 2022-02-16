using System.Collections.Generic;
using WebSudoku.Models;

namespace WebSudoku.Data
{
	public interface IDataAccessLayer<T>
	{
		UserContext db { get; set; }

		IEnumerable<T> GetCollection();
		IEnumerable<T> SearchCollection(string query);
		IEnumerable<T> FilterCollection(params string[] filters);
		void AddItem(T item);
		void UpdateItem(T item);
		void RemoveItem(int id);
		T GetItem(int id);
	}
}
