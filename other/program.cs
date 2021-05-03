using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace D365S2S
{
    class Program
    {
        static void Main(string[] args)
        {
            var contacts = CrmRequest(
                HttpMethod.Get,
                "https://nttdemotrialazure.crm5.dynamics.com/api/data/v9.1/contacts")
                .Result.Content.ReadAsStringAsync();
            // Similarly you can make POST, PATCH & DELETE requests  
        }

        public static async Task<string> AccessTokenGenerator()
        {
            string clientId = "587ec345-1700-4105-90c0-d5140cd436c9"; // Your Azure AD Application ID  
            string clientSecret = "1p1.bwoYZd-Zj.BJt6x1QP34t_.aKZ~FR9"; // Client secret generated in your App  
            string authority = "https://login.microsoftonline.com/c54e1065-1b39-4fde-8676-d5225e454b3d"; // Azure AD App Tenant ID  
            string resourceUrl = "https://nttdemotrialazure.crm5.dynamics.com/"; // Your Dynamics 365 Organization URL  

            var credentials = new ClientCredential(clientId, clientSecret);
            var authContext = new Microsoft.IdentityModel.Clients.ActiveDirectory.AuthenticationContext(authority);
            var result = await authContext.AcquireTokenAsync(resourceUrl, credentials);
            return result.AccessToken;
        }

        public static async Task<HttpResponseMessage> CrmRequest(HttpMethod httpMethod, string requestUri, string body = null)
        {
            // Acquiring Access Token  
            var accessToken = await AccessTokenGenerator();

            var client = new HttpClient();
            var message = new HttpRequestMessage(httpMethod, requestUri);

            // OData related headers  
            message.Headers.Add("OData-MaxVersion", "4.0");
            message.Headers.Add("OData-Version", "4.0");
            message.Headers.Add("Prefer", "odata.include-annotations=\"*\"");

            // Passing AccessToken in Authentication header  
            message.Headers.Add("Authorization", $"Bearer {accessToken}");

            // Adding body content in HTTP request   
            if (body != null)
                message.Content = new StringContent(body, UnicodeEncoding.UTF8, "application/json");

            return await client.SendAsync(message);
        }
    }
}