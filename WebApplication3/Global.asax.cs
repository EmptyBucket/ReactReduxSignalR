using System.Web.Mvc;
using System.Web.Routing;

namespace WebApplication3
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            AssetsProvider.Bind(Server.MapPath("~/webpack-assets.json"));
        }
    }
}
