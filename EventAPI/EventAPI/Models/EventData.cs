using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EventAPI.Models
{
    public class EventData : BaseEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public override int Id { get; set; }

        [Required(ErrorMessage = "Title cannot be empty")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Location cannot be empty")]
        public string Location { get; set; }

        [DataType(DataType.Date, ErrorMessage = "Start date is invalid")]
        [Required(ErrorMessage = "Start date cannot be empty")]
        [DisplayFormat(DataFormatString = "{0:dd-MMM-yyyy}")]
        public DateTime StartDate { get; set; }

        [DataType(DataType.Date, ErrorMessage = "End date is invalid")]
        [Required(ErrorMessage = "End date cannot be empty")]
        [DisplayFormat(DataFormatString = "{0:dd-MMM-yyyy}")]
        public DateTime EndDate { get; set; }

        [Required(ErrorMessage = "Speaker name is required")]
        public string Speaker { get; set; }

        [Required(ErrorMessage = "Registration link cannot be empty")]
        [Display(Name = "Registration Link")]
        [DataType(DataType.Url, ErrorMessage = "Invalid url format")]
        public string Url { get; set; }
    }
}
