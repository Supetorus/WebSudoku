namespace WebSudoku.Models
{
	public class Settings
	{
		public int ID { get; private set; }
		public int ThemeID { get; set; }
		public int SymbolID { get; set; }
		public bool GameSound { get; set; }
	}
}
