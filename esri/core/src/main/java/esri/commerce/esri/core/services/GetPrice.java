
package esri.commerce.esri.core.services;
import java.io.IOException;
import java.lang.reflect.Array;
import java.rmi.ServerException;
import java.sql.Timestamp;
import java.util.ArrayList;

import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;
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
     public String price = "";
     
     private final String consumerKey = "c73d0e48868865a5c10de2672572175c05873f0fb";
     private final String consumerSecret = "b25ca848cd700a375987434cc4ef551a";
          
     @Override
     public void activate() throws Exception {
         try
         {
        	 
        	 String locale = get("locale", String.class);
        	 String token = get("token", String.class);
        	 String secret = get("secret", String.class);
        	 String gcid = get("gcid", String.class);
        	 String quantity = get("quantity", String.class);
        	 String startDate = get("startDate", String.class);
        	 startDate = startDate != null? startDate.split("T")[0] : "";
        	 String endDate = get("endDate", String.class);
        	 endDate = endDate != null? endDate.split("T")[0] : "";
        	 
        	 logger.error("start/end dates " + startDate + "    " + endDate);
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
	        	 HttpResponse<JsonNode> response = Unirest.post("https://esridev.directtrack.com/admin/pricelist/format/json?oauth_consumer_key=" + consumerKey + "&oauth_token=" + token + "&oauth_signature_method=PLAINTEXT&oauth_timestamp=" + timestamp.getTime() + "&oauth_nonce=7D4izT&oauth_version=1.0&oauth_signature=" + consumerSecret + "%2526" + secret + "")
	        			  .header("oauth_user", "esridev:7187!rmkAMV1jk")
	        			  .header("content-type", "application/json")
	        			  .header("cache-control", "no-cache")
	        			  .header("postman-token", "b9dd1098-4759-61f6-c733-90ed4c22d461")
	        			  .body("{\n\t\"verbosity\": 3,\n\t\"request_header\": {\n\t\t\"zone\": \"" + zone + "\",\n\t\t\"product_pricelist_currency_code\": \"" + currency + "\",\n\t\t\"distributorNumber\": \"" + distributor + "\"\n\t},\n\t\"request_lineitems\": {\n\t\t\"request_lineitem\": {\n\t\t\t\"product\": \"gcID|" + gcid + "\",\n\t\t\t\"startDate\": \"" + startDate +  " 12:12:12\",\n\t\t\t\"endDate\": \"" + endDate + " 12:12:12\",\n\t\t\t\"qty\": \"1\"\n\t\t}\n\t}\n}\n")
	        			  .asJson();
	        	 
	        	 json = response.getBody().getObject();
	        	 logger.error("!!!!!!!!!!!");
	        	 logger.error("response to get price with gcid " + gcid + " is " + json.toString());
	        	 logger.error("!!!!!!!!!!!");
	        	 if(json.getJSONObject("pricing").has("lineitems")){
	        		 JSONArray array = json.getJSONObject("pricing").getJSONArray("lineitems");
		        	 for(int i = 0; i < array.length(); i++){
		        		 Product newProduct = new Product(array.getJSONObject(i));
		        		 //newProduct.setStoreListUnitPrice(json.getJSONObject("pricing").getJSONArray("lineitems").getJSONObject(0).getString("storeListUnitPrice"));
		        		 product = newProduct;
		        		 price = product.getEsriListUnitPrice();
		        		 //logger.error("price is " + product.getEsriListUnitPrice());
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

	public String getPrice() {
		logger.error("got here");
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

       
}



