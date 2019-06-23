using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace lagerhaus
{
    public class Program
    {
        public const string ENV_VAR_PREFIX = "LHAUS_";

        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) {
            var url = Environment.GetEnvironmentVariable($"{ENV_VAR_PREFIX}FRONTEND_URL") ?? "http://*:5000";
            System.Console.WriteLine($"Using URL: {url}");

            return WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, config) => {
                    config.AddEnvironmentVariables(ENV_VAR_PREFIX);
                })
                .UseStartup<Startup>()
                .UseUrls(url);
        }
    }
}