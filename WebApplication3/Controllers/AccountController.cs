using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [AllowAnonymous]
    public class AccountController : Controller
    {
        public ActionResult Login() => View();

        [HttpPost]
        public ActionResult Login(LoginViewModel loginViewModel)
        {
            HttpContext.GetOwinContext().Authentication
                .SignIn(new ClaimsIdentity(new [] { new Claim(ClaimTypes.Name, loginViewModel.Name) }, DefaultAuthenticationTypes.ApplicationCookie));
            return RedirectToAction("Index", "Chat");
        }
    }
}