using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactCheesecakeOrders5_22.Data;

namespace ReactCheesecakeOrders5_22.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheesecakeOrdersController : ControllerBase
    {
        private string _connectionString;
        public CheesecakeOrdersController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpPost]
        [Route("submitorder")]
        public void SubmitOrder(Order order)
        {
            var repo = new CheesecakeOrderingRepo(_connectionString);
            repo.SubmitOrder(order);
        }
        [HttpGet]
        [Route("getall")]
        public List<Order> GetAll()
        {
            var repo = new CheesecakeOrderingRepo(_connectionString);
            return repo.GetAll();
        }
        [HttpGet]
        [Route("getorder")]
        public Order GetOrder(int id)
        {
            var repo = new CheesecakeOrderingRepo(_connectionString);
            return repo.GetOrder(id);
        }
    }
}
