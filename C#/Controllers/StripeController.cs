using log4net;
using RootProject.Models.Domain;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace RootProject.Web.Controllers.Api
{
    [RoutePrefix(STRIPE API)]
    public class StripeController : ApiController
    {
        private static readonly ILog log = LogManager.GetLogger(typeof(StripeController));

        [Route, HttpPost]
        public HttpResponseMessage ChargeUser(StripeChargeModel model)
        {
            try
            {
                string key = System.Configuration.ConfigurationManager.AppSettings["StripeSecretKey"];
                StripeConfiguration.SetApiKey(key);
                // Get the payment token submitted by the form:
                string token = model.Source;
                var amount = model.Amount;
                var email = model.Receipt_Email;
                var charges = new StripeChargeService();

                var charge = charges.Create(new StripeChargeCreateOptions
                {
                    ReceiptEmail = email,
                    Amount = amount,
                    Currency = "usd",
                    Description = "Donation",
                    SourceTokenOrExistingSourceId = token
                });
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch(Exception ex)
            {
                log.Error("Error sending stripe payment", ex);
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }
            
    }
}
