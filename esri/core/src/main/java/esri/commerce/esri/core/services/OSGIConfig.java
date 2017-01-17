
package esri.commerce.esri.core.services;
import java.io.IOException;
import java.rmi.ServerException;
import java.sql.Timestamp;
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

@Service(value = OSGIConfig.class)
@Component(
	    label = "ESRI Configurations",
	    description = "Configurations for all ESRI Services",
	    immediate = true,
	    metatype = true)
public class OSGIConfig{
	private final Logger logger = LoggerFactory.getLogger(getClass());
          
 	@Property(label="Request Token API Endpoint",value = "https://esridev.directtrack.com/admin/api/request_token")
 	private static final String REQUEST_TOKEN_ENDPOINT = "requestToken";
 	 
 	@Property(label="Authorize Token API Endpoint",value = "https://esridev.directtrack.com/admin/api/authorize")
	private static final String AUTHORIZE_TOKEN_ENDPOINT = "authorizeToken";
 	 
 	@Property(label="Access Token API Endpoint",value = "https://esridev.directtrack.com/admin/api/access_token")
 	private static final String ACCESS_TOKEN_ENDPOINT = "accessToken";
 	 
 	@Property(label="Get Price API Endpoint",value = "https://esridev.directtrack.com/admin/pricelist/format/json")
	private static final String GET_PRICE_ENDPOINT = "getPrice";

 	@Property(label="Validate Cart Oauth2 API",value = "https://www.arcgis.com/sharing/rest/oauth2/token/")
	private static final String VALIDATE_CART_OAUTH2 = "oauth2";
 	
 	@Property(label="Validate Cart API",value = "https://7n3htow3ue.execute-api.us-west-2.amazonaws.com/staging/EntitlementService/validate-cart")
	private static final String VALIDATE_CART_ENDPOINT = "validateCart";
 	
 	@Property(label="Create Cart API",value = "https://ordersummary-dev.esri.com/custom/testorder/index.php")
	private static final String CREATE_CART_ENDPOINT = "createCart";
 	
	public String requestTokenEndpoint;
 	public String authorizeTokenEndpoint;
 	public String accessTokenEndpoint;
 	public String getPriceEndpoint;
 	public String validateCartOauth2;
 	public String validateCartEndpoint;
 	public String createCartEndpoint;
 	 
 	 
    @Activate
    public void activate(Map<String, Object> properties) throws Exception {
    	this.requestTokenEndpoint = PropertiesUtil.toString(properties.get(REQUEST_TOKEN_ENDPOINT), "");
    	this.authorizeTokenEndpoint = PropertiesUtil.toString(properties.get(AUTHORIZE_TOKEN_ENDPOINT), "");
    	this.accessTokenEndpoint = PropertiesUtil.toString(properties.get(ACCESS_TOKEN_ENDPOINT), "");
    	this.getPriceEndpoint = PropertiesUtil.toString(properties.get(GET_PRICE_ENDPOINT), "");
    	this.validateCartOauth2 = PropertiesUtil.toString(properties.get(VALIDATE_CART_OAUTH2), "");
    	this.validateCartEndpoint = PropertiesUtil.toString(properties.get(VALIDATE_CART_ENDPOINT), "");
    	this.createCartEndpoint = PropertiesUtil.toString(properties.get(CREATE_CART_ENDPOINT), "");
    }
     
    
    public String getRequestTokenEndpoint(){
    	return this.requestTokenEndpoint;
    }
     
    public void setRequestTokenEndpoint(String requestTokenEndpoint){
    	this.requestTokenEndpoint = requestTokenEndpoint;
    }
    
    public String getAuthorizeTokenEndpoint(){
    	return this.authorizeTokenEndpoint;
    }
     
    public void setAuthorizeTokenEndpoint(String authorizeTokenEndpoint){
    	this.authorizeTokenEndpoint = authorizeTokenEndpoint;
    }
    
    public String getAcessTokenEndpoint(){
    	return this.accessTokenEndpoint;
    }
     
    public void setAccessTokenEndpoint(String accessTokenEndpoint){
    	this.accessTokenEndpoint = getPriceEndpoint;
    }
    
    public String getGetPriceEndPoint(){
    	return this.getPriceEndpoint;
    }
     
    public void setGetPriceEndpoint(String getPriceEndpoint){
    	this.getPriceEndpoint = getPriceEndpoint;
    }
 
    public String getValidateCartOauth2(){
    	return this.validateCartOauth2;
    }
     
    public void setValidateCartOauth2(String validateCartOauth2){
    	this.validateCartOauth2 = validateCartOauth2;
    }
    
    public String getValidateCartEndpoint(){
    	return this.validateCartEndpoint;
    }
     
    public void setValidateCartEndpoint(String validateCartEndpoint){
    	this.validateCartEndpoint = validateCartEndpoint;
    }
    
    public String getCreateCartEndpoint(){
    	return this.createCartEndpoint;
    }
     
    public void setCreateCartEndpoint(String createCartEndpoint){
    	this.createCartEndpoint =createCartEndpoint;
    }
       
}