
package esri.commerce.esri.core.services;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.commerce.api.CommerceService;
import com.adobe.cq.commerce.api.CommerceSession;
import com.adobe.cq.sightly.WCMUse;

public class CartHelper extends WCMUse{
     private final Logger logger = LoggerFactory.getLogger(getClass());

     private String totalPrice = "";
          
     @Override
     public void activate() throws Exception {

         try
         {
        	 
        	 Resource resource = get("resource", Resource.class);
        	 SlingHttpServletRequest request = get("request", SlingHttpServletRequest.class);
        	 SlingHttpServletResponse response = get("response", SlingHttpServletResponse.class);

        	 CommerceService commerceService = resource.adaptTo(CommerceService.class);
        	 CommerceSession commerceSession = commerceService.login(request, response);
        	 
        	 logger.error("Cart Helper activated. Count is " + commerceSession.getCartEntryCount());
        	 
        	 GetPrice getPriceService = new GetPrice();
        	 String price = getPriceService.getProduct().getStoreListUnitPrice();
        	 
        	 logger.error("Price is " + price);
        	 
        	 commerceSession.getCartEntryCount();
         }
         catch(Exception e)
         {
        	 logger.error("ERROR ", e);
             e.printStackTrace();
         }
     }

	public String getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(String totalPrice) {
		this.totalPrice = totalPrice;
	}

       
}



