using AutoMapper;
using BuyAndSellApi.Models.Entities;
using BuyAndSellApi.Models.Repository;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
            ConfigurationRoot = new ConfigurationBuilder().SetBasePath(environment.ContentRootPath).AddJsonFile("appsettings.json").Build();  
            
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddEntityFrameworkNpgsql()
                .AddDbContext<BuyAndSellContext>()
                .BuildServiceProvider();

            services.AddAutoMapper();

            services.AddScoped<IBuyAndSellRepository<BaseEntity>, BuyAndSellRepository<BaseEntity>>();
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

            app.UseHttpsRedirection();
            app.UseMvc();
            ConnectionString = Configuration["ConnectionStrings:BuyAndSellDatabase"];
        }
    }
}