using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using lagerhaus.Models;
using Microsoft.Extensions.Configuration;

namespace lagerhaus.Controllers
{
    public class HomeController : Controller
    {
        private IConfiguration configuration;

        public HomeController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public IActionResult Index()
        {
            LoadBackendUrl();
            return View();
        }
        
        private void LoadBackendUrl() =>
            ViewData["BackendUrl"] = configuration.GetValue<string>("BACKEND_URL") ?? "http://localhost:5001/api";
    }
}
