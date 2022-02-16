using Microsoft.EntityFrameworkCore.Migrations;

namespace WebSudoku.Migrations.User
{
	public partial class UserDB : Migration
	{
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
			    name: "Board",
			    columns: table => new
			    {
				    ID = table.Column<int>(type: "int", nullable: false)
				    .Annotation("SqlServer:Identity", "1, 1"),
				    Timer = table.Column<float>(type: "real", nullable: false),
				    Mistakes = table.Column<int>(type: "int", nullable: false),
				    Hints = table.Column<int>(type: "int", nullable: false),
				    UnsolvedData = table.Column<string>(type: "varchar(128)", nullable: false),
				    CurrentData = table.Column<string>(type: "varchar(128)", nullable: false),
				    NotesData = table.Column<string>(type: "varchar(1024)", nullable: false),
				    Difficulty = table.Column<int>(type: "int", nullable: false)
			    },
			    constraints: table =>
			    {
				    table.PrimaryKey("PK_Board", x => x.ID);
			    });

			migrationBuilder.CreateTable(
			    name: "Settings",
			    columns: table => new
			    {
				    ID = table.Column<int>(type: "int", nullable: false)
				    .Annotation("SqlServer:Identity", "1, 1"),
				    ThemeID = table.Column<int>(type: "int", nullable: false),
				    SymbolID = table.Column<int>(type: "int", nullable: false),
				    GameSound = table.Column<bool>(type: "bit", nullable: false)
			    },
			    constraints: table =>
			    {
				    table.PrimaryKey("PK_Settings", x => x.ID);
			    });

			migrationBuilder.CreateTable(
			    name: "Users",
			    columns: table => new
			    {
				    ID = table.Column<int>(type: "int", nullable: false)
				    .Annotation("SqlServer:Identity", "1, 1"),
				    BestTimeEasy = table.Column<float>(type: "real", nullable: false),
				    AvgTimeEasy = table.Column<float>(type: "real", nullable: false),
				    BestTimeMedium = table.Column<float>(type: "real", nullable: false),
				    AvgTimeMedium = table.Column<float>(type: "real", nullable: false),
				    BestTimeHard = table.Column<float>(type: "real", nullable: false),
				    AvgTimeHard = table.Column<float>(type: "real", nullable: false),
				    GamesFinishedEasy = table.Column<int>(type: "int", nullable: false),
				    GamesFinishedMedium = table.Column<int>(type: "int", nullable: false),
				    GamesFinishedHard = table.Column<int>(type: "int", nullable: false),
				    SettingsDataID = table.Column<int>(type: "int", nullable: true),
				    CurrentBoardID = table.Column<int>(type: "int", nullable: true)
			    },
			    constraints: table =>
			    {
				    table.PrimaryKey("PK_Users", x => x.ID);
				    table.ForeignKey(
			    name: "FK_Users_Board_CurrentBoardID",
			    column: x => x.CurrentBoardID,
			    principalTable: "Board",
			    principalColumn: "ID",
			    onDelete: ReferentialAction.Restrict);
				    table.ForeignKey(
			    name: "FK_Users_Settings_SettingsDataID",
			    column: x => x.SettingsDataID,
			    principalTable: "Settings",
			    principalColumn: "ID",
			    onDelete: ReferentialAction.Restrict);
			    });

			migrationBuilder.CreateIndex(
			    name: "IX_Users_CurrentBoardID",
			    table: "Users",
			    column: "CurrentBoardID");

			migrationBuilder.CreateIndex(
			    name: "IX_Users_SettingsDataID",
			    table: "Users",
			    column: "SettingsDataID");
		}

		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
			    name: "Users");

			migrationBuilder.DropTable(
			    name: "Board");

			migrationBuilder.DropTable(
			    name: "Settings");
		}
	}
}
