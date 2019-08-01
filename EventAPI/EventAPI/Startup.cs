using System;
using EventAPI.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using EventAPI.Repositories;
using EventAPI.Models;
using Swashbuckle.AspNetCore.Swagger;
using Microsoft.AspNetCore.Mvc.Formatters;
using EventAPI.CustomFormatters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IO;

namespace EventAPI
{
    public class Startup
    {
        public Startup()
        {
            var builder=new ConfigurationBuilder();
            builder.SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();             
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Console.WriteLine("ConnectionString:" + Configuration.GetValue<string>("ConnectionStrings:SqlConnection"));
            Console.WriteLine("Jwt Issuer:" + Configuration.GetValue<string>("Jwt:Issuer"));
            Console.WriteLine("Jwt Audience:" + Configuration.GetValue<string>("Jwt:Audience"));
            Console.WriteLine("Jwt Secret:" + Configuration.GetValue<string>("Jwt:Secret"));

            services.AddDbContext<EventDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("SqlConnection"));
            });

            services.AddScoped<IEventRepository<EventData>, EventRepository<EventData>>();
            services.AddScoped<IEventRepository<EventUser>, EventRepository<EventUser>>();

            services.AddSwaggerGen(config =>
            {
                config.SwaggerDoc("v1", new Info
                {
                    Title = "Event Management API",
                    Version = "1.0",
                    Contact = new Contact { Name = "Sonu Sathyadas", Email = "sonusathyadas@hotmail.com" },
                    Description = "This api gives the functions for adding, querying, updating and deleting events"
                });
            });

            services.AddCors(options =>
            {

                options.AddDefaultPolicy(configure =>
                {
                    configure.AllowAnyOrigin()
                    .WithMethods("GET")
                    .WithHeaders();
                });

                options.AddPolicy("AllowAll", config =>
                {
                    config.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });

                options.AddPolicy("AllowPartners", config =>
                {
                    config.WithOrigins("*.synergetics.com", "*.microsoft.com")
                    .WithMethods("GET")
                    .WithHeaders("Content-Type", "Authorization", "Accept");
                });
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = Configuration.GetValue<string>("Jwt:Issuer"),
                        ValidAudience = Configuration.GetValue<string>("Jwt:Audience"),
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<string>("Jwt:Secret")))
                    };
                });                

            services.AddMvc(options =>
            {
                options.OutputFormatters.RemoveType<HttpNoContentOutputFormatter>();
                options.OutputFormatters.Add( new CsvOutputFormatter());
            })
                .AddXmlDataContractSerializerFormatters() 
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)            
        {
            InitializeDatabase(app);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.ConfigureExceptionHandler();               
                app.UseHsts();
            }
           
            app.UseCors("AllowAll");

            app.UseSwagger();
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "Event Management API");
                options.RoutePrefix = "";
            });

            app.UseAuthentication();

            //app.UseHttpsRedirection();
            app.UseMvc();
        }
        private void InitializeDatabase(IApplicationBuilder app)
        {
            using(var serviceScope= app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var database=serviceScope.ServiceProvider.GetService<EventDbContext>().Database;
                database.Migrate();
            }
        }
    }
}
