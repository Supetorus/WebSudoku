using Microsoft.EntityFrameworkCore;
using WebSudoku.Models;

namespace WebSudoku.Data
{
	public class UserContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<Settings> UserSettings { get; set; }
		public DbSet<Board> Boards { get; set; }

		public UserContext(DbContextOptions options) : base(options)
		{

		}
	}
}
