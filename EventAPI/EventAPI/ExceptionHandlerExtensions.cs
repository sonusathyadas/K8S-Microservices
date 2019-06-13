using Microsoft.AspNetCore.Builder;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Diagnostics;
using System.IO;

namespace EventAPI
{
    public static class ExceptionHandlerExtensions
    {
        public static IApplicationBuilder ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            return app.UseExceptionHandler(config =>
            {
                config.Run(async (context) =>
                {
                    dynamic error=null;

                    var exPathFeature=context.Features.Get<IExceptionHandlerPathFeature>();
                    if(exPathFeature.Error is IOException)
                    {
                        error=new { Message = "IOException raised" };
                    }
                    else if(exPathFeature.Error is InvalidOperationException)
                    {
                        error = new { Message = "InvalidOperationException raised" };
                    }
                    else
                    {
                        error = new { Message = "Some other exception raised" };
                    }
                    context.Response.ContentType = "application/json";                   
                    string errorMessage = JsonConvert.SerializeObject(error);
                    await context.Response.WriteAsync(errorMessage);
                });
            });
        }
    }
}
