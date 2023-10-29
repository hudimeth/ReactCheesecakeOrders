using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactCheesecakeOrders5_22.Data
{
    public class CheesecakeOrderingRepo
    {
        private readonly string _connectionString;
        public CheesecakeOrderingRepo(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void SubmitOrder(Order order)
        {
            var context = new CheesecakeOrderingDbContext(_connectionString);
            context.Add(order);
            context.SaveChanges();
        }
        public List<Order> GetAll()
        {
            var context = new CheesecakeOrderingDbContext(_connectionString);
            return context.Orders.ToList();
        }
        public Order GetOrder(int id)
        {
            var context = new CheesecakeOrderingDbContext(_connectionString);
            return context.Orders.FirstOrDefault(o => o.Id == id);
        }

    }
}
