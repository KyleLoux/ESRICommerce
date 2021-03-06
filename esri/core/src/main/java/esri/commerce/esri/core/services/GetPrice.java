
package esri.commerce.esri.core.services;
import java.io.IOException;
import java.lang.reflect.Array;
import java.rmi.ServerException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Dictionary;
import java.util.Map;

import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.ReferenceCardinality;
import org.apache.felix.scr.annotations.ReferencePolicy;
import org.apache.felix.scr.annotations.Service;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.json.JSONArray;
import org.json.JSONObject;
import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;
import org.osgi.framework.ServiceReference;
import org.osgi.service.cm.Configuration;
import org.osgi.service.cm.ConfigurationAdmin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;

import esri.commerce.esri.core.models.Product;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response; 

import okhttp3.OkHttpClient;
import com.adobe.cq.sightly.WCMUse;


public class GetPrice extends WCMUse{
	
     private final Logger logger = LoggerFactory.getLogger(getClass());
     private Product product = null;
     public boolean hasPrice = false;
     
     private String consumerKey = "c73d0e48868865a5c10de2672572175c05873f0fb";
     private String consumerSecret = "b25ca848cd700a375987434cc4ef551a";
     private String APIURL;
     
     public String test = "";
     

     @Override
     public void activate() throws Exception {
         try
         {

        	 OSGIConfig osgi = getSlingScriptHelper().getService(OSGIConfig.class);
        	 APIURL = osgi.getGetPriceEndPoint();
        	 consumerKey = osgi.getConsumerKey();
        	 consumerSecret = osgi.getConsumerSecret();

        	 
        	 String locale = get("locale", String.class);
        	 String token = get("token", String.class);
        	 String secret = get("secret", String.class);
        	 String gcid = get("gcid", String.class);
        	 String quantity = get("quantity", String.class);
        	 String startDate = get("startDate", String.class);
        	 startDate = startDate != null? startDate.split("T")[0] : "";
        	 String endDate = get("endDate", String.class);
        	 endDate = endDate != null? endDate.split("T")[0] : "";
        	 
        	 String zone = "";
        	 String currency = "";
        	 String distributor = "";
        	 JSONObject json = new JSONObject();
        	         	 
        	 //For Testing Only
        	 //locale = "CA";
        	 
        	if("en".equals(locale)){
	         	zone = "US";
	         	currency = "USD";
	         	distributor = "456795";
	         } else {
	         	zone = "CA";
	         	currency = "CAD";
	         	distributor = "2000";
	         }        	
        	 
    		 Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        	 if (gcid != null) {
	        	 HttpResponse<JsonNode> response = Unirest.post(APIURL + "?oauth_consumer_key=" + consumerKey + "&oauth_token=" + token + "&oauth_signature_method=PLAINTEXT&oauth_timestamp=" + timestamp.getTime() + "&oauth_nonce=7D4izT&oauth_version=1.0&oauth_signature=" + consumerSecret + "%2526" + secret + "")
	        			  .header("oauth_user", "esridev:7187!rmkAMV1jk")
	        			  .header("content-type", "application/json")
	        			  .header("cache-control", "no-cache")
	        			  .header("postman-token", "b9dd1098-4759-61f6-c733-90ed4c22d461")
	        			  .body("{\n\t\"verbosity\": 0,\n\t\"request_header\": {\n\t\t\"zone\": \"" + zone + "\",\n\t\t\"product_pricelist_currency_code\": \"" + currency + "\",\n\t\t\"distributorNumber\": \"" + distributor + "\"\n\t},\n\t\"request_lineitems\": {\n\t\t\"request_lineitem\": {\n\t\t\t\"product\": \"gcID|" + gcid + "\",\n\t\t\t\"startDate\": \"" + startDate +  " 12:12:12\",\n\t\t\t\"endDate\": \"" + endDate + " 12:12:12\",\n\t\t\t\"qty\": \"1\"\n\t\t}\n\t}\n}\n")
	        			  .asJson();
	        	 
	        	 json = response.getBody().getObject();
	        	 if(json.getJSONObject("pricing").has("lineitems")){
	        		 JSONArray array = json.getJSONObject("pricing").getJSONArray("lineitems");
		        	 for(int i = 0; i < array.length(); i++){
		        		 Product newProduct = new Product(array.getJSONObject(i));
		        		 product = newProduct;
		        		 hasPrice = true;
		        	 }
	        		 
	        	 } else{
	        		 logger.error("ERROR: GCID " + gcid + "is not available");
	        	 }
        	 }
         }
         catch(Exception e)
         {
        	 logger.error("ERROR ", e);
             e.printStackTrace();
         }
     }


	public Product getProduct() {
		return product;
	}


	public void setProduct(Product product) {
		this.product = product;
	}

	public boolean isHasPrice() {
		return hasPrice;
	}

	public void setHasPrice(boolean hasPrice) {
		this.hasPrice = hasPrice;
	}
	
	public String getTest() {
		return this.test;
	}
	
	public void setTest(String test){
		this.test = test;
	}
}



