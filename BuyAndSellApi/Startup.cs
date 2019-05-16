using AutoMapper;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;

namespace BuyAndSellApi
{
    public class Startup
    {
        public IConfigurationRoot ConfigurationRoot { get; set; }
        public static string ConnectionString { get; private set; }
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            Configuration = configuration;
            ConfigurationRoot = new ConfigurationBuilder().SetBasePath(environment.ContentRootPath)
                .AddJsonFile("appsettings.json").Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddEntityFrameworkNpgsql()
                .AddDbContext<BuyAndSellContext>()
                .BuildServiceProvider();

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "Buy and sell API",
                    Version = "v1",
                    Contact = new OpenApiContact
                    {
                        Name = "Betsegaw Degefe",
                        Email = "betsegawyes@gmail.com",
                    }
                });
            });

            services.AddAutoMapper();

            services.AddScoped(typeof(IBuyAndSellRepository<>), typeof(BuyAndSellRepository<>));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "Buy and sell API"); });

            app.UseHttpsRedirection();
            app.UseMvc();
            ConnectionString = Configuration["ConnectionStrings:BuyAndSellDatabase"];
        }
    }
}