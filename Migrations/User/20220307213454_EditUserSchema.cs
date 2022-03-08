using Microsoft.EntityFrameworkCore.Migrations;

namespace WebSudoku.Migrations.User
{
    public partial class EditUserSchema : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AuthID",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AuthID",
                table: "Users");
        }
    }
}
