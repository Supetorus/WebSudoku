using Microsoft.EntityFrameworkCore.Migrations;

namespace WebSudoku.Migrations.User
{
    public partial class CreateUserSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Boards",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    Difficulty = table.Column<int>(type: "int", nullable: false),
                    Mistakes = table.Column<int>(type: "int", nullable: false),
                    Hints = table.Column<int>(type: "int", nullable: false),
                    Timer = table.Column<float>(type: "real", nullable: false),
                    InitialData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CurrentData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NotesData = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Moves = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Boards", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SettingsDataID = table.Column<int>(type: "int", nullable: false),
                    CurrentBoardID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "UserSettings",
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
                    table.PrimaryKey("PK_UserSettings", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Boards");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "UserSettings");
        }
    }
}
