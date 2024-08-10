using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AppUserKeyBinding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppUserKeyBinding",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AppUserId = table.Column<int>(type: "INTEGER", nullable: false),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    NextPage = table.Column<int>(type: "INTEGER", nullable: false),
                    PreviousPage = table.Column<int>(type: "INTEGER", nullable: false),
                    Close = table.Column<int>(type: "INTEGER", nullable: false),
                    ToggleMenu = table.Column<int>(type: "INTEGER", nullable: false),
                    GoToPage = table.Column<int>(type: "INTEGER", nullable: false),
                    FullScreen = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserKeyBinding", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppUserKeyBinding_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppUserKeyBinding_AppUserId",
                table: "AppUserKeyBinding",
                column: "AppUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppUserKeyBinding");
        }
    }
}
