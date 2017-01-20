
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

public class ValidateCart extends WCMUse{
     private final Logger logger = LoggerFactory.getLogger(getClass());
     
     private String token = "";
     private boolean cartIsValid = true;
     private final String clientID = "Q5Xqcht8SN4XlG5f";
     private final String clientSecret = "6b71f8bce53341e69aa8e3dec1a1da62";
     private String needsNewEndDate = "";
     private String newEndDate = "";
     private String invalidSku = "";
     private String ValidateCartOauth2 = "";
     private String ValidateCartEndpoint = "";
     
     @Override
     public void activate() throws Exception {
         try
         {
        	 
        	 OSGIConfig osgi = getSlingScriptHelper().getService(OSGIConfig.class);
        	 ValidateCartOauth2 = osgi.getValidateCartOauth2();
        	 ValidateCartEndpoint = osgi.getValidateCartEndpoint();
        	 
        	 String[] skus = get("skus", String.class).split(",");
        	 String[] quantities = get("quantities", String.class).split(",");
        	 String[] endDates = get("endDates", String.class).split(",");
        	 
        	 JSONObject json = new JSONObject();
        	 JSONObject bodyJson = new JSONObject();
        	 JSONArray jsonArray = new JSONArray();
        	 
        	 bodyJson.put("username", "ecommesri28");
        	 bodyJson.put("customerNumber", "525144");
        	 for(int i = 0; i < skus.length; i++){
        		 JSONObject product = new JSONObject();
        		 product.put("sku", skus[i]);
        		 product.put("quantity", quantities[i]);
        		 product.put("endDate", endDates[i]);
        		 jsonArray.put(i, product);
        	 }
        	 bodyJson.put("cartContent", jsonArray);

        	 
    		 //Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        		 HttpResponse<JsonNode> response = Unirest.post(ValidateCartOauth2)
        				  .header("content-type", "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW")
        				  .header("authorization", "b45a3ced2854488692c08a02372868180586c0007")
        				  .header("cache-control", "no-cache")
        				  .header("postman-token", "6b866555-6768-9090-3221-616f997acee3")
        				  .body("------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"client_id\"\r\n\r\n" + clientID + "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"client_secret\"\r\n\r\n" + clientSecret + "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"grant_type\"\r\n\r\nclient_credentials\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--")
        				  .asJson();
	        	 
	        	 json = response.getBody().getObject(); 	 
	        	 token = json.getString("access_token");
	        	 
	        	 HttpResponse<JsonNode> response2 = Unirest.post(ValidateCartEndpoint)
	        			  .header("authorization", "" + token)
	        			  .header("content-type", "application/json")
	        			  .header("cache-control", "no-cache")
	        			  .header("postman-token", "4cf57dc6-0162-8216-2f94-38d7e5e13cd8")
	        			  .body(bodyJson.toString())
	        			  .asJson();
	        	 
	        	 JSONArray array = response2.getBody().getArray();
	        	 for(int i = 0; i < array.length(); i++){
	        		 JSONObject obj = array.getJSONObject(i);
	        		 if(obj.has("extendedData")){
	        			 JSONArray arr = obj.getJSONArray("extendedData");
	        			 if(arr.length() > 0){
		        			 JSONObject extendedData = arr.getJSONObject(0);
		        			 if(extendedData.has("sku") && extendedData.has("endDate")){
		        				 setNeedsNewEndDate(obj.getString("sku"));
		        				 setNewEndDate(extendedData.getString("endDate"));
		        			 }
	        			 }
	        		 }
        			 logger.error("obj is " + obj.toString());

	        		 
	        		 if (obj.get("statusCode").equals(2)){
	        			 cartIsValid = false;
	        			 logger.error("invalid sku " + obj.getString("sku"));
	        			 setInvalidSku(obj.getString("sku"));
	        			 break;
	        		 }
	        	 }
	        	 
         }
         catch(Exception e)
         {
        	 logger.error("ERROR ", e);
             e.printStackTrace();
         }
         
                  
     }


	public String getToken() {
		return token;
	}


	public void setToken(String token) {
		this.token = token;
	}


	public boolean isCartIsValid() {
		return cartIsValid;
	}


	public void setCartIsValid(boolean cartIsValid) {
		this.cartIsValid = cartIsValid;
	}


	public String getNewEndDate() {
		return newEndDate;
	}


	public void setNewEndDate(String newEndDate) {
		this.newEndDate = newEndDate;
	}


	public String getNeedsNewEndDate() {
		return needsNewEndDate;
	}


	public void setNeedsNewEndDate(String needsNewEndDate) {
		this.needsNewEndDate = needsNewEndDate;
	}


	public String getInvalidSku() {
		return invalidSku;
	}


	public void setInvalidSku(String invalidSku) {
		this.invalidSku = invalidSku;
	}

       
}



