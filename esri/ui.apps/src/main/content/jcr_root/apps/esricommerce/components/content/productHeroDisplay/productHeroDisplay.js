/*******************************************************************************
 * Copyright 2016 Adobe Systems Incorporated
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/

"use strict";
use(function () {
    var CONST = {
        	FEATUREDPRODUCT_PROP: "featuredProduct"
        };
       
        var featuredProductPath = properties.get(CONST.FEATUREDPRODUCT_PROP);
            
        var resolver = resource.getResourceResolver();
        var commerceService = resource.adaptTo(com.adobe.cq.commerce.api.CommerceService);
        var commerceSession = commerceService.login(request, response);
        var baseProduct = commerceService.getProduct(featuredProduct);
        var featuredProduct = commerceService.getProduct(featuredProductPath);
        
        if(featuredProduct != null){
	        var image = featuredProduct.getImage();
		        var productImage = null;
		        if (image) {
		            productImage = resolver.getResource(image.getPath());
		        }
	        
	        sqlStatement = "SELECT * FROM [cq:PageContent] WHERE CONTAINS('cq:productMaster','" + featuredProductPath + "')"
			results = resolver.findResources(sqlStatement, "JCR-SQL2");
	    	while(results.hasNext()) {
	    		var result = results.next();
	    	}
	        
	        return {
	        	title: featuredProduct.getTitle(),
	        	description: featuredProduct.getProperty('summaryDescription', java.lang.String),
	        	caption: featuredProduct.getProperty('labelCaption', java.lang.String),
	        	image: featuredProduct.getProperty('largeImage', java.lang.String),
	        	pagePath: result.getParent().getPath()
	        };
        }

});
