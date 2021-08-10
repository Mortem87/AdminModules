using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace wap_modules.WebForms.AdminUserDR
{
    public partial class Controller : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
    }
    public class ResultCustomDeclaration
    {
        public List<CustomDeclaration> Customs { get; set; }

        public Message Response { get; set; }

    }
    public class Message
    {
        public int StatusCode { get; set; }
        public string Description { get; set; }
    }
    public class CustomDeclaration
    {
        public string CODE { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string FECHA { get; set; }
        public string PATENTE { get; set; }
        public string ADUANA { get; set; }
        public string PEDIMENTO { get; set; }
        public string CLAVE { get; set; }
        public string TIPO { get; set; }
        public string REGIMEN { get; set; }
    }
}