using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebSudoku.Models
{
	public class User
	{
		[Required]
		public int ID { get; set; }
		public string AuthID { get; set; }
		public int SettingsDataID { get; set; }
		public int CurrentBoardID { get; set; }
	}
}
