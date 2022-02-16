using Microsoft.EntityFrameworkCore;

namespace WebSudoku.Data
{
	public class Context<T> : DbContext where T : class
	{
		public DbSet<T> Set { get; set; }

		public Context(DbContextOptions options) : base(options)
		{

		}
	}
}
