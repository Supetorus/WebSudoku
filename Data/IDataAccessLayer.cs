using System.Collections.Generic;

namespace WebSudoku.Data
{
	public interface IDataAccessLayer<T> where T : class
	{
		Context<T> db { get; set; }

		IEnumerable<T> GetCollection();
		IEnumerable<T> SearchCollection(string query);
		IEnumerable<T> FilterCollection(params string[] filters);
		void AddItem(T item);
		void UpdateItem(T item);
		void RemoveItem(int id);
		T GetItem(int id);
	}
}
