
package esri.commerce.esri.core.services;
import java.sql.Timestamp;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;

import com.adobe.cq.sightly.WCMUse;

public class GetTotalPrice extends WCMUse{
     private final Logger logger = LoggerFactory.getLogger(getClass());
     private float totalPrice = 0;
          
     private final String consumerKey = "c73d0e48868865a5c10de2672572175c05873f0fb";
     private final String consumerSecret = "b25ca848cd700a375987434cc4ef551a";       
     
     @Override
     public void activate() throws Exception {
         try
         {
        	 
        	 String locale = get("locale", String.class);
        	 String token = get("token", String.class);
        	 String secret = get("secret", String.class);
        	 String gcids = get("gcids", String.class);
        	 String quantities = get("quantities", String.class);
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
        	 
    		 String[] gcidList = gcids.split(",");
    		 String[] quantityList = quantities.split(",");
    		 for(int i = 0; i < gcidList.length; i++) {
    			 Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        		 logger.error("a quantity appears " + quantityList[i]);
    			 HttpResponse<JsonNode> response = Unirest.post("https://esridev.directtrack.com/admin/pricelist/format/json?oauth_consumer_key=" + consumerKey + "&oauth_token=" + token + "&oauth_signature_method=PLAINTEXT&oauth_timestamp=" + timestamp.getTime() + "&oauth_nonce=7D4izT&oauth_version=1.0&oauth_signature=" + consumerSecret + "%26" + secret + "")
        			  .header("oauth_user", "esridev:7187!rmkAMV1jk")
        			  .header("content-type", "application/json")
        			  .header("cache-control", "no-cache")
        			  .header("postman-token", "b9dd1098-4759-61f6-c733-90ed4c22d461")
        			  .body("{  \"verbosity\":3,\"request_header\":{  \"zone\":\"" + zone + "\",\"product_pricelist_currency_code\":\"" + currency + "\",\"distributorNumber\":\"" + distributor + "\"},\"request_lineitems\":[  {  \"product\":\"arcGIS_" + gcidList[i] + "\",\"qty\":\"1\"}]}")
        			  .asJson();
        	 
   	        	 json = response.getBody().getObject();
   	        	 if(json.getJSONObject("pricing").has("lineitems")){
	        		 JSONArray array = json.getJSONObject("pricing").getJSONArray("lineitems");
	        		 if(array.getJSONObject(0).has("esriListUnitPrice")) {
	    	        	 setTotalPrice(totalPrice + (Float.parseFloat(quantityList[i]) * Float.parseFloat(array.getJSONObject(0).getString("esriListUnitPrice"))));
	        		 }
	        	 } else{
	        		 logger.error("ERROR: GCID " + gcidList[i] + " was not found.");
	        	 }
    		 }        
         }
         catch(Exception e)
         {
        	 logger.error("ERROR ", e);
             e.printStackTrace();
         }
     }	

	public String getTotalPrice() {
		return String.format("%.02f", totalPrice);
	}

	public void setTotalPrice(float totalPrice) {
		this.totalPrice = totalPrice;
	}

       
}



