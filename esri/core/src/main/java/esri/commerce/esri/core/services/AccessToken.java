
package esri.commerce.esri.core.services;
import java.io.IOException;
import java.rmi.ServerException;
import java.sql.Timestamp;

import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response; 

import okhttp3.OkHttpClient;
import com.adobe.cq.sightly.WCMUse;

public class AccessToken extends WCMUse{
     private final Logger logger = LoggerFactory.getLogger(getClass());
          
     private String token = "";
     private String secret = "";
     
     private String requestTokenAPI;
     private String authorizeTokenAPI;
     private String accessTokenAPI;
     
     private final String consumerKey = "c73d0e48868865a5c10de2672572175c05873f0fb";
     private final String consumerSecret = "b25ca848cd700a375987434cc4ef551a";

     @Override
     public void activate() throws Exception {

    	 JSONObject json = new JSONObject();
    	 JSONObject json2 = new JSONObject();
    	 JSONObject json3 = new JSONObject();
    	 
    	 OSGIConfig osgi = getSlingScriptHelper().getService(OSGIConfig.class);
    	 requestTokenAPI = osgi.getRequestTokenEndpoint();
    	 authorizeTokenAPI = osgi.getAuthorizeTokenEndpoint();
    	 accessTokenAPI = osgi.getAcessTokenEndpoint();
    	 
         try
         {
        	 Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        	 HttpResponse<JsonNode> response = Unirest.post(requestTokenAPI)
        			  .header("content-type", "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW")
        			  .header("cache-control", "no-cache")
        			  .header("postman-token", "6b592337-941b-f55d-93a8-83eaad6e0271")
        			  .body("------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_consumer_key\"\r\n\r\n" + consumerKey + "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_token\"\r\n\r\n\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_signature_method\"\r\n\r\nPLAINTEXT\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_timestamp\"\r\n\r\n"+timestamp.getTime()+"\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_nonce\"\r\n\r\nOzPmA8\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_version\"\r\n\r\n1.0\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_signature\"\r\n\r\n" + consumerSecret + "%26\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--")
        			  .asJson();
        	 json = response.getBody().getObject();
        	         	 
        	 
        	 HttpResponse<JsonNode> response2 = Unirest.post(authorizeTokenAPI)
        			  .header("content-type", "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW")
        			  .header("oauth_user", "esridev:7187!rmkAMV1jk")
        			  .header("cache-control", "no-cache")
        			  .header("postman-token", "4f3d5136-1c85-3f59-375b-65d3c7de72e9")
        			  .body("------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_user\"\r\n\r\nZXNyaWRldjo3MTg3IXJta0FNVjFqaw==\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_consumer_key\"\r\n\r\n" + consumerKey + "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_token\"\r\n\r\n" + json.getString("oauth_token") +  "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_signature_method\"\r\n\r\nPLAINTEXT\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_timestamp\"\r\n\r\n" + timestamp.getTime() + "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_nonce\"\r\n\r\nogFaOM\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_version\"\r\n\r\n1.0\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_signature\"\r\n\r\n" + consumerSecret + "%2617a78829630f534f73eac2571eea18b1\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--")
        			  .asJson();
        	 
        	 json2 = response2.getBody().getObject();
        	 
        	 HttpResponse<JsonNode> response3 = Unirest.post(accessTokenAPI)
        			  .header("content-type", "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW")
        			  .header("oauth_user", "ZXNyaWRldjo3MTg3IXJta0FNVjFqaw==")
        			  .header("cache-control", "no-cache")
        			  .header("postman-token", "a889f47d-6167-f863-4b13-c610f0ff8a10")
        			  .body("------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_user\"\r\n\r\nZXNyaWRldjo3MTg3IXJta0FNVjFqaw==\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_verifier\"\r\n\r\n" + json2.getString("oauth_verifier") + "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_consumer_key\"\r\n\r\n" + consumerKey + "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_token\"\r\n\r\n" + json.getString("oauth_token") + "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_signature_method\"\r\n\r\nPLAINTEXT\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_timestamp\"\r\n\r\n" + timestamp.getTime() + "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_nonce\"\r\n\r\niUyC0J\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_version\"\r\n\r\n1.0\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"oauth_signature\"\r\n\r\n" + consumerSecret + "&" + json.getString("oauth_token_secret") + "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--")
        			  .asJson();
        	 json3 = response3.getBody().getObject();
         }
         catch(Exception e)
         {
        	 logger.error("ERROR ", e);
             e.printStackTrace();
         }
         token = json3.getString("oauth_token");
         secret = json3.getString("oauth_token_secret");
     }
     
     public String getToken(){
    	 return token;
     }
     
     public String getSecret(){
    	 return secret;
     }
       
 
       
}