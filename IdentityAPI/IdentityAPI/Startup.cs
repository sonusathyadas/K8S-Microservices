using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityAPI.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using IdentityAPI.Services;
using Swashbuckle.AspNetCore.Swagger;

namespace IdentityAPI
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            this.Configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")                
                .AddEnvironmentVariables()
                .Build();            
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            Console.WriteLine("ConnectionString:" + Configuration.GetValue<string>("ConnectionStrings:IdentityConnection"));
            Console.WriteLine("Jwt Issuer:" + Configuration.GetValue<string>("Jwt:Issuer"));
            Console.WriteLine("Jwt Audience:" + Configuration.GetValue<string>("Jwt:Audience"));
            Console.WriteLine("Jwt Secret:" + Configuration.GetValue<string>("Jwt:Secret"));
            
            services.AddDbContext<IdentityDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("IdentityConnection"));
            });

            services.AddScoped<IIdentityManager, IdentityManager>();

            services.AddCors(options=>
            {
                options.AddDefaultPolicy(config =>
                {
                    config.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Identity API", Version = "1.0" });
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            InitializeDatabase(app);
               
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(); //Apply default policy

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.RoutePrefix = "";
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Identity API");
            });

            app.UseMvc();
        }

        private void InitializeDatabase(IApplicationBuilder app)
        {
            Console.WriteLine(Configuration.GetConnectionString("IdentityConnection"));
            using(var serviceScope= app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var database=serviceScope.ServiceProvider.GetService<IdentityDbContext>().Database;
                database.Migrate();
            }
        }
    }
}
