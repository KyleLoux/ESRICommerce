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

        var EsriProductClass = Packages.esri.commerce.esri.core.models.EsriProduct;
        var featuredProductPath = properties.get(CONST.FEATUREDPRODUCT_PROP);
            
        var resolver = resource.getResourceResolver();
        var commerceService = resource.adaptTo(com.adobe.cq.commerce.api.CommerceService);
        var commerceSession = commerceService.login(request, response);
        var baseProduct = commerceService.getProduct(featuredProduct);
        var esriProduct = new EsriProductClass(baseProduct, currentPage);
        var featuredProduct = commerceService.getProduct(featuredProductPath);
        var featuredEsriProduct = new EsriProductClass(featuredProduct, currentPage);
        
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
	        	title: featuredEsriProduct.getTitle(),
	        	description: featuredEsriProduct.getProperty('summaryDescription', java.lang.String),
	        	caption: featuredEsriProduct.getProperty('labelCaption', java.lang.String),
	        	image: featuredEsriProduct.getProperty('largeImage', java.lang.String),
	        	pagePath: result.getParent().getPath()
	        };
        }

});
