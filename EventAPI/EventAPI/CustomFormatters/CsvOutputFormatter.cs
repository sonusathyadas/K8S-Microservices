using Microsoft.AspNetCore.Mvc.Formatters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Net.Http.Headers;
using EventAPI.Models;
using Microsoft.AspNetCore.Http;

namespace EventAPI.CustomFormatters
{
    public class CsvOutputFormatter : TextOutputFormatter
    {
        public CsvOutputFormatter()
        {
            SupportedMediaTypes.Add(MediaTypeHeaderValue.Parse("text/csv"));
            SupportedEncodings.Add(Encoding.UTF8);
            SupportedEncodings.Add(Encoding.Unicode);
        }

        protected override bool CanWriteType(Type type)
        {
            if(typeof(EventData).IsAssignableFrom(type) || typeof(IEnumerable<EventData>).IsAssignableFrom(type) |
                typeof(EventUser).IsAssignableFrom(type) || typeof(IEnumerable<EventUser>).IsAssignableFrom(type))
            {
                return base.CanWriteType(type);
            }
            return false;
        }

        public override async Task WriteResponseBodyAsync(OutputFormatterWriteContext context, Encoding selectedEncoding)
        {
            //IServiceProvider serviceProvider = context.HttpContext.RequestServices;

            var response = context.HttpContext.Response;
            var buffer = new StringBuilder();
            if(context.Object is EventData)
            {
                var edata = context.Object as EventData;
                buffer.AppendLine("Id,Title,StartDate,EndDate,Location,Speaker,Url");
                buffer.AppendLine($"{edata.Id},{edata.Title},{edata.StartDate},{edata.EndDate},{edata.Location},{edata.Speaker},{edata.Url}");
            }
            else if(context.Object is IEnumerable<EventData>)
            {
                var edataList = context.Object as IEnumerable<EventData>;
                buffer.AppendLine("Id,Title,StartDate,EndDate,Location,Speaker,Url");
                foreach (var edata in edataList)
                {
                    buffer.AppendLine($"{edata.Id},{edata.Title},{edata.StartDate},{edata.EndDate},{edata.Location},{edata.Speaker},{edata.Url}");
                }
            }else if(context.Object is EventUser)
            {
                //single event user
            }
            else if(context.Object is IEnumerable<EventUser>)
            {
                //collection of event user
            }
            await response.WriteAsync(buffer.ToString());
        }
    }
}
