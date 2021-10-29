using Microsoft.EntityFrameworkCore;
using WebApplication1.Campos;

namespace WebApplication1.context
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext>options): base(options)
        {
                    
        }
        public DbSet<Campos_tabla> SB_clientes { get; set; }
    }
}
