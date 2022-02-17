using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebSudoku.Models
{
	public class User
	{
		[Required]
		public int ID { get; private set; }
		public float BestTimeEasy { get; set; }
		public float AvgTimeEasy { get; set; }
		public float BestTimeMedium { get; set; }
		public float AvgTimeMedium { get; set; }
		public float BestTimeHard { get; set; }
		public float AvgTimeHard { get; set; }
		public int GamesFinishedEasy { get; set; }
		public int GamesFinishedMedium { get; set; }
		public int GamesFinishedHard { get; set; }
		public Settings SettingsData { get; set; }
		public Board CurrentBoard { get; set; }
	}
}
