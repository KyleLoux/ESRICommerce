
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
     private float totalPrice = 0;
          
     @Override
     public void activate() throws Exception {
         try
         {
        	 
        	 String locale = get("locale", String.class);
        	 String token = get("token", String.class);
        	 String secret = get("secret", String.class);
        	 String sku = get("sku", String.class);
        	 String quantity = get("quantity", String.class);
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
        	 if (sku != null) {
	        	 HttpResponse<JsonNode> response = Unirest.post("https://esridev.directtrack.com/admin/pricelist/format/json?oauth_consumer_key=c73d0e48868865a5c10de2672572175c05873f0fb&oauth_token=" + token + "&oauth_signature_method=PLAINTEXT&oauth_timestamp=" + timestamp.getTime() + "&oauth_nonce=7D4izT&oauth_version=1.0&oauth_signature=b25ca848cd700a375987434cc4ef551a%26" + secret + "")
	        			  .header("oauth_user", "esridev:7187!rmkAMV1jk")
	        			  .header("content-type", "application/json")
	        			  .header("cache-control", "no-cache")
	        			  .header("postman-token", "b9dd1098-4759-61f6-c733-90ed4c22d461")
	        			  .body("{  \"verbosity\":3,\"request_header\":{  \"zone\":\"" + zone + "\",\"product_pricelist_currency_code\":\"" + currency + "\",\"distributorNumber\":\"" + distributor + "\"},\"request_lineitems\":[  {  \"product\":\"arcGIS_" + sku + "\",\"qty\":\"1\"}]}")
	        			  .asJson();
	        	 
	        	 json = response.getBody().getObject();
	        	 logger.error("response is " + json.toString());
	        	 if(json.getJSONObject("pricing").has("lineitems")){
	        		 JSONArray array = json.getJSONObject("pricing").getJSONArray("lineitems");
		        	 for(int i = 0; i < array.length(); i++){
		        		 Product newProduct = new Product(array.getJSONObject(i));
		        		 //newProduct.setStoreListUnitPrice(json.getJSONObject("pricing").getJSONArray("lineitems").getJSONObject(0).getString("storeListUnitPrice"));
		        		 product = newProduct;
		        	 }
	        	 } else{
	        		 logger.error("ERROR: Sku " + sku + "is not available");
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

	public float getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}

       
}



