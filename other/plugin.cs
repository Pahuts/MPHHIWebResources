using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Client;
using Microsoft.Xrm.Sdk.Query;
using Newtonsoft.Json; // for Json Functions
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.ServiceModel;
using System.ServiceModel.Description;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.Xrm.Tooling.Connector;
using System.Text;
using Microsoft.Xrm.Sdk.Workflow;
using System.Activities;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;

namespace SamplePlugin
{
    public class CustomWorkflowStep : CodeActivity
    {
        public IWorkflowContext workflowContext;
        public IOrganizationServiceFactory serviceFactory;
        public IOrganizationService service;
        public ITracingService tracingService;

        protected override void Execute(CodeActivityContext context)
        {
            // change values
            string resource = "https://octcrm.crm3.dynamics.com";
            string resourceApiUrl = "https://octcrm.api.crm3.dynamics.com/api/data/v9.2/";
            string clientId = "4cb0ac1a-4e4e-4e3a-9ffb-d231ddf6dce9"; // integrationuser@oct.ca
            string clientSecretKey = "rWD9le1qJWj__3.TSNbsSQn9-fO_i_4xVU";
            string tenant = "octoeeo.onmicrosoft.com";
            string accessToken = "";
            string authority = "https://login.microsoftonline.com/{0}/v2.0";

            Console.WriteLine("Setting Up Connection...");

            // client id and client secret of the application
            ClientCredential clientCrendential = new ClientCredential(clientId, clientSecretKey);
            // Authenticate the registered application with Azure Active Directory.
            AuthenticationContext authContext = new AuthenticationContext(string.Format(authority, tenant), false);
            AuthenticationResult authResult = await authContext.AcquireTokenAsync(resource, clientCrendential);
            accessToken = authResult.AccessToken;
            Console.WriteLine($"Access Token Retrieved...");
            Console.WriteLine($"{accessToken}");
            
            // use HttpClient to call the Web API
            HttpClient httpClient = new HttpClient();
            httpClient.DefaultRequestHeaders.Add("OData-MaxVersion", "4.0");
            httpClient.DefaultRequestHeaders.Add("OData-Version", "4.0");
            httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            httpClient.BaseAddress = new Uri($"{resourceApiUrl}");
            var response = httpClient.GetAsync("WhoAmI").Result;
            if (response.IsSuccessStatusCode)
            {
            var userDetails = response.Content.ReadAsStringAsync().Result;
            JObject body = JObject.Parse(userDetails);
            Guid userId = (Guid)body["UserId"];
            Console.WriteLine("Connection Success!");
            }       
        }
    }

    public class PaymayaWebAPI : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            string endPoint = string.Empty;
            string subKey = string.Empty;
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory factory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = factory.CreateOrganizationService(context.UserId);

            //Guid variableID = new Guid("7cfff73c-8787-eb11-a812-000d3a8fed3b");
            endPoint = "https://mvpapitest.azure-api.net/";
            context.OutputParameters["endPoint"] = endPoint;
            subKey = "27887b1f5c0f47c69e224829f0235b11";
            context.OutputParameters["subKey"] = subKey;
        }
    }
        public class CustomAction : IPlugin
        {
            public void Execute(IServiceProvider serviceProvider)
            {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);


        }
            public OrganizationRequest Create()
            {
                var req = new OrganizationRequest()
                {
                    RequestName = "msdyn_searchresourceavailability"
                };

                // Resource Requirement
                Entity newReqObject = new Entity("msdyn_resourcerequirement");
                newReqObject["msdyn_fromdate"] = new DateTime(2019, 11, 11, 8, 30, 0, DateTimeKind.Local).ToUniversalTime();
                newReqObject["msdyn_todate"] = new DateTime(2019, 11, 15, 17, 30, 0, DateTimeKind.Local).ToUniversalTime();
                newReqObject["msdyn_remainingduration"] = 30;
                newReqObject["msdyn_duration"] = 30;
                // These three fields are not in the document but you use to filter the location
                newReqObject["msdyn_worklocation"] = new OptionSetValue(690970000);
                newReqObject["msdyn_latitude"] = -43.50185;
                newReqObject["msdyn_longitude"] = 172.59811;


                // Settings
                Entity travelRadius = new Entity("travelradius");
                travelRadius["Value"] = 50;
                travelRadius["Unit"] = 192350001;

                Entity settings = new Entity("systemuser");
                settings["MaxResourceTravelRadius"] = travelRadius;
                settings["ConsiderTravelTime"] = true;
                settings["UseRealTimeResourceLocation"] = true;


                // Rescourse Specification
                var rescourseSpecificationEntity = new Entity
                {
                    LogicalName = "systemuser"
                };

                EntityCollection characteristicsUnitEntityCollection = new EntityCollection();

                Entity characteristic1 = new Entity();
                characteristic1.Attributes.Add("characteristic", new EntityReference("characteristic", new Guid("98e62c87-f7d1-4c4b-bca7-9531ae91da99")));
                characteristicsUnitEntityCollection.Entities.Add(characteristic1);

                Entity characteristic2 = new Entity();
                characteristic2.Attributes.Add("characteristic", new EntityReference("characteristic", new Guid("98e62c87-f7d1-4c4b-bca7-9531ae91da99")));
                characteristicsUnitEntityCollection.Entities.Add(characteristic2);


                //Territories
                EntityCollection territoriesEntityCollection = new EntityCollection();

                Entity territory = new Entity();
                territory.Attributes.Add("territory", new EntityReference("territory", new Guid("98e62c87-f7d1-4c4b-bca7-9531ae91da99")));
                territoriesEntityCollection.Entities.Add(territory);

                //Teams
                EntityCollection teamsEntityCollection = new EntityCollection();

                Entity team = new Entity();
                team.Attributes.Add("team", new EntityReference("team", new Guid("98e62c87-f7d1-4c4b-bca7-9531ae91da99")));
                teamsEntityCollection.Entities.Add(team);

                //Business Units
                EntityCollection BUEntityCollection = new EntityCollection()
                {
                    [0] = new Entity("businessunit", new Guid("98e62c87-f7d1-4c4b-bca7-9531ae91da99"))
                };

                // Add to constraint
                var constraintEntity = new Entity("systemuser");
                constraintEntity.Attributes.Add("Characteristics", characteristicsUnitEntityCollection);
                constraintEntity.Attributes.Add("BusinessUnits", BUEntityCollection);
                constraintEntity.Attributes.Add("Territories", territoriesEntityCollection);
                constraintEntity.Attributes.Add("Teams", teamsEntityCollection);

                rescourseSpecificationEntity.Attributes.Add("Constraints", constraintEntity);


                // Add to request object
                req["Version"] = "1";
            req["Settings"] = settings;
            req["Requirement"] = newReqObject;

            // Optional - Use it to filter the resources
            req["ResourceSpecification"] = rescourseSpecificationEntity;

            return req;
        }
    }
    public class DownloadDocumentTemplateMarvTrial : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);
            string noteSubject = context.InputParameters["NoteSubject"].ToString();
            string pdfFileName = context.InputParameters["FileName"].ToString();
            string OpptyTemplateid = context.InputParameters["OpptyTemplateId"].ToString();
            string documentTemplateId = context.InputParameters["TemplateId"].ToString();
            string recordId = context.InputParameters["RecordId"].ToString();
            string opptyRecordId = context.InputParameters["OpptyRecordId"].ToString();
            int typeCode = Convert.ToInt32(context.InputParameters["TypeCode"]);
            int opptyTypeCode = Convert.ToInt32(context.InputParameters["OpptyTypeCode"]);

            CreatePDFNote(service, noteSubject, pdfFileName, OpptyTemplateid, documentTemplateId, recordId, opptyRecordId, typeCode, opptyTypeCode);
        }
        public static void CreatePDFNote(IOrganizationService _service, string noteSubject, string pdfFileName, string OpptyTemplateid, string documentTemplateId, string recordId, string opptyRecordId, int entityTypeCode, int opptyEntityTypeCode)
        {

            
            OrganizationRequest request = new OrganizationRequest("ExportPdfDocument");
            request["EntityTypeCode"] = entityTypeCode;
            request["SelectedTemplate"] = new EntityReference("documenttemplate", new Guid(documentTemplateId));
            List<Guid> records = new List<Guid> { new Guid(recordId) };
            request["SelectedRecords"] = JsonConvert.SerializeObject(records);

            OrganizationResponse pdfResponse = (OrganizationResponse)_service.Execute(request);

            //Write to file
            string b64File = Convert.ToBase64String((byte[])pdfResponse["PdfFile"]);

            // Create note by using the above base 64 string / create email attachment and send it to customer .

            Entity Annotation = new Entity("annotation");
            Annotation.Attributes["subject"] = noteSubject;
            Annotation.Attributes["documentbody"] = b64File;
            Annotation.Attributes["objectid"] = new EntityReference("msemr_appointmentemr", new Guid(opptyRecordId));
            Annotation.Attributes["mimetype"] = @"application/pdf";
            Annotation.Attributes["notetext"] = "";
            Annotation.Attributes["filename"] = pdfFileName;
            _service.Create(Annotation);

        // upload file to sharepoint
            //string defaultSite = "https://marvtrial.sharepoint.com";
            //string leadLibraryName = "Appointment (EMR)";
            //string destLocation = "Covid-19 Test - Bert Hair_1932E2D51266EB11A812002248163BE8";
            //string filename = "Test File";
            //string content = b64File;
            //Uri spSite = new Uri(defaultSite);
            ////You need to create a token by providing the user name and password.This has been handled in the library by Scott Durrow.
            //Uri url = new Uri(String.Format("{0}/_api/web/GetFolderByServerRelativeUrl('/{1}')/Files/add(url='{2}', overwrite=true)", defaultSite, leadLibraryName + "/" + destLocation, filename));           
            //var webRequest = (HttpWebRequest)HttpWebRequest.Create(url);
            ////Create the digest and pass the digest to header as shown below
            //webRequest.Headers.Add("X-RequestDigest", digest);
            //webRequest.ContentLength = content.Length;
            //HttpWebRequest webrequest = (HttpWebRequest)HttpWebRequest.Create(url);
            //webrequest.Method = "POST";
            //webrequest.Accept = "application/json;odata=verbose;charset=utf-8";
            //webrequest.AllowAutoRedirect = false;
            //webrequest.ContentLength = content.Length;
            //using (Stream s = webrequest.GetRequestStream())
            //{
            //    s.Write(requestContent, 0, requestContent.Length);
            //    s.Close();
            //}
            //HttpWebResponse response = (HttpWebResponse)webrequest.GetResponse();
            //StreamReader sr = new StreamReader(response.GetResponseStream(), Encoding.GetEncoding("utf-8"));
            //byte[] responseStream = Encoding.UTF8.GetBytes(sr.ReadToEnd());
            //string encoderesponse = Encoding.UTF8.GetString(responseStream, 0, responseStream.Length);

            //// sharepoint file upload
            //string siteUrl = "https://marvtrial.sharepoint.com";
            //string relativePath = "";
            //string documentBytes = b64File;
            //string fileName = filename;

            //Uri url = new Uri(String.Format("{0}/_api/web/GetFolderByServerRelativeUrl('/{1}')/Files/add(url='{2}', overwrite=true)", defaultSite, leadLibraryName + "/" + destLocation, filename));
            ////throw new InvalidWorkflowException("resourceUrl:::" + resourceUrl);
            //string digest = _service.GetRequestDigest();
            //// Set X-RequestDigest
            //var webRequests = (HttpWebRequest)HttpWebRequest.Create(url);
            //webRequest.Headers.Add("X-RequestDigest", digest);
            //// Send a json odata request to SPO rest services to fetch all list items for the list.
            //byte[] result = HttpHelper.SendODataJsonRequest(
            //  url,
            //  "POST", // reading data from SP through the rest api usually uses the GET verb
            //  documentBytes,
            //  webRequest,
            //  _spo // pass in the helper object that allows us to make authenticated calls to SPO rest services
            //  );
            //string response = Encoding.UTF8.GetString(result, 0, result.Length);
        }
    }

    //    public class DownloadDocumentTemplate : IPlugin
    //{
    //    public void Execute(IServiceProvider serviceProvider)
    //    {
    //        IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
    //        IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
    //        IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

    //        string OpptyTemplateid = context.InputParameters["OpptyTemplateId"].ToString();
    //        string documentTemplateId = context.InputParameters["TemplateId"].ToString();
    //        string recordId = context.InputParameters["RecordId"].ToString();
    //        string opptyRecordId = context.InputParameters["OpptyRecordId"].ToString();
    //        int typeCode = Convert.ToInt32(context.InputParameters["TypeCode"]);
    //        int opptyTypeCode = Convert.ToInt32(context.InputParameters["OpptyTypeCode"]);

    //        CreatePDFNote(service, OpptyTemplateid, documentTemplateId, recordId, opptyRecordId, typeCode, opptyTypeCode);
    //    }
    //    public static void CreatePDFNote(IOrganizationService _service, string OpptyTemplateid, string documentTemplateId, string recordId, string opptyRecordId, int entityTypeCode, int opptyEntityTypeCode)
    //    {

    //        // Create new Organization service with admin user to call "ExportPdfDocument" message
    //        //IOrganizationService pdfService = GetExportPDFService();    

    //        //try
    //        //{
    //            // write file for the contact details template
    //            OrganizationRequest request = new OrganizationRequest("ExportPdfDocument");
    //            request["EntityTypeCode"] = entityTypeCode;
    //            request["SelectedTemplate"] = new EntityReference("documenttemplate", new Guid(documentTemplateId));
    //            List<Guid> records = new List<Guid> { new Guid(recordId) };
    //            request["SelectedRecords"] = JsonConvert.SerializeObject(records);

    //            OrganizationResponse pdfResponse = (OrganizationResponse)_service.Execute(request);

    //            //Write to file
    //            string b64File = Convert.ToBase64String((byte[])pdfResponse["PdfFile"]);

    //            // Create note by using the above base 64 string / create email attachment and send it to customer .

    //            Entity Annotation = new Entity("annotation");
    //            Annotation.Attributes["subject"] = "Fetched Contact Details";
    //            Annotation.Attributes["documentbody"] = b64File;
    //            Annotation.Attributes["objectid"] = new EntityReference("opportunity", new Guid(opptyRecordId));
    //            Annotation.Attributes["mimetype"] = @"application/pdf";
    //            Annotation.Attributes["notetext"] = "";
    //            Annotation.Attributes["filename"] = "PDFtoNote.pdf";
    //            _service.Create(Annotation);

    //            //byte[] data = Convert.FromBase64String(b64File);

    //            //File.WriteAllBytes("D:/Downloads/" + "ContactDetails.pdf", data);

    //            //byte[] data = Convert.FromBase64String(Annotation.Attributes["documentbody"].ToString());

    //            //File.WriteAllBytes("D:/Downloads" + Annotation.Attributes["filename"].ToString(), data);


    //            // write file for the oppty template
    //            //OrganizationRequest opptyrequest = new OrganizationRequest("ExportPdfDocument");
    //            //opptyrequest["EntityTypeCode"] = opptyEntityTypeCode;
    //            //opptyrequest["SelectedTemplate"] = new EntityReference("documenttemplate", new Guid(OpptyTemplateid));
    //            //List<Guid> opptyrecords = new List<Guid> { new Guid(opptyRecordId) };
    //            //opptyrequest["SelectedRecords"] = JsonConvert.SerializeObject(opptyrecords);

    //            //OrganizationResponse opptypdfResponse = (OrganizationResponse)pdfService.Execute(opptyrequest);

    //            //Write to file
    //            //string opptyb64File = Convert.ToBase64String((byte[])opptypdfResponse["PdfFile"]);

    //            // Create Oppty note by using the above base 64 string / create email attachment and send it to customer .

    //            // Annotation.Attributes["subject"] = "Oppty Details";
    //            // Annotation.Attributes["documentbody"] = opptyb64File;
    //            // Annotation.Attributes["objectid"] = new EntityReference("opportunity", new Guid(opptyRecordId));
    //            // Annotation.Attributes["mimetype"] = @"application/pdf";
    //            // Annotation.Attributes["notetext"] = "";
    //            // Annotation.Attributes["filename"] = "OpptyDetails.pdf";
    //            // _service.Create(Annotation);


    //            //Create a query to retrieve attachments.

    //            //var query = new QueryExpression
    //            //{
    //            //    EntityName = "annotation",
    //            //    ColumnSet = new ColumnSet("subject", "filename", "mimetype", "documentbody"),

    //            //    //Define the conditions for each attachment.
    //            //    Criteria = new FilterExpression
    //            //    {
    //            //        // FilterOperator = LogicalOperator.And,
    //            //        Conditions =
    //            //      {
    //            ////The ObjectTypeCode must be specified, or else the query
    //            ////defaults to "email" instead of "template".
    //            //       new ConditionExpression
    //            //         {
    //            //           AttributeName = "objecttypecode",
    //            //           Operator = ConditionOperator.Equal,
    //            //           Values = { 3 }
    //            //          },
    //            ////Specify which template we need.
    //            //       new ConditionExpression
    //            //          {
    //            //            AttributeName = "isdocument",
    //            //            Operator = ConditionOperator.Equal,
    //            //            Values = {1}
    //            //           }
    //            //           }
    //            //    }
    //            //};

    //            ////Write out the filename of each attachment retrieved.
    //            //foreach (Entity attachment in _service.RetrieveMultiple(query).Entities)
    //            //{
    //            //    Console.WriteLine("Retrieved attachment {0}", Annotation.Attributes["filename"]);
    //            //}

    //        //}
    //        //catch (Exception ex)
    //        //{
    //        //}
    //    }



    //    public static IOrganizationService GetExportPDFService()
    //    {
    //        IOrganizationService _service = null;
    //        if (_service == null)
    //        {
    //            // old version of connecting to crm
    //            string serviceURL = "https://aimdev.api.crm5.dynamics.com/XRMServices/2011/Organization.svc";
    //            ClientCredentials credentials = new ClientCredentials();
    //            credentials.UserName.UserName = "crm.sa@aim.edu";
    //            credentials.UserName.Password = ";q4w:$RJK'4S";
    //            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
    //            Uri serviceuri = new Uri(serviceURL);
    //            //ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12; //TLS1.2 is required for v9 and above
    //            //CrmServiceClient con = new CrmServiceClient(@"AuthType=Office365;Username=crm.sa@aim.edu; Password=;Url=//aimdev.crm5.dynamics.com");
    //            //_service = (IOrganizationService)con.OrganizationWebProxyClient != null ?
    //            //                    (IOrganizationService)con.OrganizationWebProxyClient : (IOrganizationService)con.OrganizationServiceProxy;

    //            //try
    //            //{
    //                OrganizationServiceProxy proxy = new OrganizationServiceProxy(serviceuri, null, credentials, null);
    //                proxy.EnableProxyTypes();
    //                _service = (IOrganizationService)proxy;
    //                //_service = (IOrganizationService)con.OrganizationWebProxyClient != null ?
    //                //(IOrganizationService)con.OrganizationWebProxyClient : (IOrganizationService)con.OrganizationServiceProxy;

    //            //}
    //            //catch (Exception ex)
    //            //{

    //            //}
    //        }
    //        return _service;
    //    }


    //}

    public class ValidateAccountName : IPlugin
    {
        //Invalid names from unsecure configuration
        private List<string> invalidNames = new List<string>();

        // Constructor to capture the unsecure configuration
        public ValidateAccountName(string unsecure)
        {
            // Parse the configuration data and set invalidNames
            if (!string.IsNullOrWhiteSpace(unsecure))
                unsecure.Split(',').ToList().ForEach(s =>
                {
                    invalidNames.Add(s.Trim());
                });
        }
        public void Execute(IServiceProvider serviceProvider)
        {

            // Obtain the tracing service
            ITracingService tracingService =
            (ITracingService)serviceProvider.GetService(typeof(ITracingService));
            try
            {

                // Obtain the execution context from the service provider.  
                IPluginExecutionContext context = (IPluginExecutionContext)
                    serviceProvider.GetService(typeof(IPluginExecutionContext));

                // Verify all the requirements for the step registration
                if (context.InputParameters.Contains("Target") && //Is a message with Target
                    context.InputParameters["Target"] is Entity && //Target is an entity
                    ((Entity)context.InputParameters["Target"]).LogicalName.Equals("account") && //Target is an account
                    ((Entity)context.InputParameters["Target"])["name"] != null && //account name is passed
                    context.MessageName.Equals("Update") && //Message is Update
                    context.PreEntityImages["a"] != null && //PreEntityImage with alias 'a' included with step
                    context.PreEntityImages["a"]["name"] != null) //account name included with PreEntityImage with step
                {
                    // Obtain the target entity from the input parameters.  
                    var entity = (Entity)context.InputParameters["Target"];
                    var newAccountName = (string)entity["name"];
                    var oldAccountName = (string)context.PreEntityImages["a"]["name"];

                    if (invalidNames.Count > 0)
                    {
                        tracingService.Trace("ValidateAccountName: Testing for {0} invalid names:", invalidNames.Count);

                        if (invalidNames.Contains(newAccountName.ToLower().Trim()))
                        {
                            tracingService.Trace("ValidateAccountName: new name '{0}' found in invalid names.", newAccountName);

                            // Test whether the old name contained the new name
                            if (!oldAccountName.ToLower().Contains(newAccountName.ToLower().Trim()))
                            {
                                tracingService.Trace("ValidateAccountName: new name '{0}' not found in '{1}'.", newAccountName, oldAccountName);

                                string message = string.Format("You can't change the name of this account from '{0}' to '{1}'.", oldAccountName, newAccountName);

                                throw new InvalidPluginExecutionException(message);
                            }

                            tracingService.Trace("ValidateAccountName: new name '{0}' found in old name '{1}'.", newAccountName, oldAccountName);
                        }

                        tracingService.Trace("ValidateAccountName: new name '{0}' not found in invalidNames.", newAccountName);
                    }
                    else
                    {
                        tracingService.Trace("ValidateAccountName: No invalid names passed in configuration.");
                    }
                }
                else
                {
                    tracingService.Trace("ValidateAccountName: The step for this plug-in is not configured correctly.");
                }
            }
            catch (Exception ex)
            {
                tracingService.Trace("SamplePlugin: {0}", ex.ToString());
                throw;
            }
        }
    }
    public class FollowupPlugin : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            // Obtain the tracing service
            ITracingService tracingService =
            (ITracingService)serviceProvider.GetService(typeof(ITracingService));

            // Obtain the execution context from the service provider.  
            IPluginExecutionContext context = (IPluginExecutionContext)
                serviceProvider.GetService(typeof(IPluginExecutionContext));

            // The InputParameters collection contains all the data passed in the message request.  
            if (context.InputParameters.Contains("Target") &&
                context.InputParameters["Target"] is Entity)
            {
                // Obtain the target entity from the input parameters.  
                Entity entity = (Entity)context.InputParameters["Target"];

                // Obtain the organization service reference which you will need for  
                // web service calls.  
                IOrganizationServiceFactory serviceFactory =
                    (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
                IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

                try
                {
                    // Plug-in business logic goes here.
                    // Create a task activity to follow up with the account customer in 7 days.
                    Entity followup = new Entity("task");
                    followup["subject"] = "Send e-mail to the new customer.";
                    followup["description"] = "Follow up with the customer. Check if there are any new issues that need resolution";
                    followup["scheduledstart"] = DateTime.Now.AddDays(7);
                    followup["scheduledend"] = DateTime.Now.AddDays(7);
                    followup["category"] = context.PrimaryEntityName;

                    // Refer to the account in the task activity.
                    if (context.OutputParameters.Contains("id"))
                    {
                        Guid regardingobjectid = new Guid(context.OutputParameters["id"].ToString());
                        string regardingobjectidType = "account";

                        followup["regardingobjectid"] = new EntityReference(regardingobjectidType, regardingobjectid);
                    }

                    // Create the task in Microsoft Dynamics CRM.
                    tracingService.Trace("FollowupPlugin: Creating the task activity.");
                    service.Create(followup);
                }

                catch (FaultException<OrganizationServiceFault> ex)
                {
                    throw new InvalidPluginExecutionException("An error occurred in FollowUpPlugin.", ex);
                }

                catch (Exception ex)
                {
                    tracingService.Trace("FollowUpPlugin: {0}", ex.ToString());
                    throw;
                }
            }
        }
    }
}


using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Workflow;

namespace Sample_Workflow_Activity
{
    // public class Test : CodeActivity
    // {
    //     IWorkflowContext workflowContext;
    //     IOrganizationServiceFactory serviceFactory;
    //     IOrganizationService service;
    //     ITracingService tracingService;
    //     string AzureKey;
    //     string Endpoint;
    //     protected override void Execute(CodeActivityContext context)
    //     {

    //         // Initial Context
    //         workflowContext = context.GetExtension<IWorkflowContext>();
    //         serviceFactory = context.GetExtension<IOrganizationServiceFactory>();
    //         service = serviceFactory.CreateOrganizationService(workflowContext.UserId);
    //         tracingService = context.GetExtension<ITracingService>();


    //         //todo retreieve azure api
    //         RetrieveAzureKey();
    //         tracingService.Trace($"AzureKey: {AzureKey}");
    //         tracingService.Trace($"AzureKey: {Endpoint}");

    //         //todo call webapi
    //     }

    //     private void callwebapi()
    //     {
            
    //     }
    //     private void  RetrieveAzureKey()
    //     {
    //         // Define Condition Values
    //         var query_mphhi_name = "Azure Keys";

    //         // Instantiate QueryExpression query
    //         var query = new QueryExpression("mphhi_devvariable");

    //         // Add columns to query.ColumnSet
    //         query.ColumnSet.AddColumns("mphhi_devvariableid", "mphhi_name", "mphhi_subkey", "mphhi_endpoint", "createdon");
    //         query.AddOrder("mphhi_name", OrderType.Ascending);

    //         // Define filter query.Criteria
    //         query.Criteria.AddCondition("mphhi_name", ConditionOperator.Equal, query_mphhi_name);

    //         EntityCollection a = service.RetrieveMultiple(query);
            
    //         if (a.Entities.Count <= 1)
    //         {
    //             foreach(Entity b in a.Entities)
    //             {
    //                 AzureKey =  b.Contains("mphhi_subkey") ? b.GetAttributeValue<string>("mphhi_subkey") : null;
    //                 Endpoint = b.Contains("mphhi_endpoint") ? b.GetAttributeValue<string>("mphhi_endpoint") : null;
    //             }
    //         }
    //     }
    // }



}
