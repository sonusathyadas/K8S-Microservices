using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventAPI.Models
{
    public abstract class BaseEntity
    {
        public virtual int Id { get; set; }
    }
}
