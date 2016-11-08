using System.Web.Mvc;

namespace WebApplication3.Controllers
{
    [Authorize]
    public class ChatController : Controller
    {
        public ActionResult Index() => View();
    }
}