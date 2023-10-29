using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactCheesecakeOrders5_22.Data
{
    public class CheesecakeOrderingDataContextFactory : IDesignTimeDbContextFactory<CheesecakeOrderingDbContext>
    {
        public CheesecakeOrderingDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
               .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}ReactCheesecakeOrdering5-22.Web"))
               .AddJsonFile("appsettings.json")
               .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new CheesecakeOrderingDbContext(config.GetConnectionString("ConStr"));
        }
    }
}
