/*
 * #%L
 * ACS AEM Samples
 * %%
 * Copyright (C) 2015 Adobe
 * %%
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * #L%
 */

package esri.commerce.esri.core.servlets;
import java.io.IOException;
import java.rmi.ServerException;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response; 

import okhttp3.OkHttpClient;

@SlingServlet(paths="/bin/test", methods = "GET", metatype=true)
public class TestServlet extends org.apache.sling.api.servlets.SlingAllMethodsServlet {
     private static final long serialVersionUID = 2598426539166789515L;
        
     private final Logger logger = LoggerFactory.getLogger(getClass());
     
        
                  
     @Override
     protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServerException, IOException {
         
      try
      {

    	  HttpResponse<String> response2 = Unirest.post("https://esridev.directtrack.com/admin/pricelist/format/json?oauth_consumer_key=451b700786aa144c68a5a7fe7ca34f1e0568c0e82&oauth_token=78a390976845987b932acc9ad13cab1c0585c3422&oauth_signature_method=PLAINTEXT&oauth_timestamp=1482437832&oauth_nonce=wwkp0i&oauth_version=1.0&oauth_signature=cbb5ac1de395baafd7457931a4088415%25262cd87b7e74e9b4908829c445b0d61d29")
    			  .header("oauth_user", "esridev:7187!rmkAMV1jk")
    			  .header("content-type", "application/json")
    			  .header("cache-control", "no-cache")
    			  .header("postman-token", "ff2dfb00-181e-7df4-6e0f-02648c74e80a")
    			  .body("{  \"verbosity\":3,\"request_header\":{  \"zone\":\"CA\",\"product_pricelist_currency_code\":\"CAD\",\"distributorNumber\":\"2000\"},\"request_lineitems\":[  {  \"product\":\"arcGIS_148104\",\"startDate\":\"2016-12-12 12:12:12\",\"endDate\":\"2017-06-12 12:12:12\",\"qty\":\"1\"}]}")
    			  .asString();
          response.getWriter().write(response2.getBody());
          
      }
      catch(Exception e)
      {
          e.printStackTrace();
      }
    }
       
 
       
}