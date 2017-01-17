/*
 *  Copyright 2015 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// Server-side JavaScript for the main.html logic
use(["commerce_init.js"], function (commerceInit) {
	var product = {};

    var resolver = resource.getResourceResolver();
    var commerceService = resource.adaptTo(com.adobe.cq.commerce.api.CommerceService);
    var commerceSession = commerceService.login(request, response);
    var productPath = currentPage.getProperties().get("cq:productMaster", java.lang.String);
    var baseProduct = commerceService.getProduct(productPath);
     
    if(baseProduct != null){
	    var image = baseProduct.getImage();
	    if (image) {
	        var productImage = resolver.getResource(image.getPath());
	        var vm = productImage.adaptTo(org.apache.sling.api.resource.ValueMap);
	        var imagePath = vm.get("fileReference");
	    }

	    return {
	        title: baseProduct.getTitle(),
	        image: imagePath,
	        bannerText: properties.get("bannerText", java.lang.String),
	        bannerCTA: properties.get("bannerCTA", java.lang.String),
	        bannerLink: properties.get("bannerLink", java.lang.String)
	    };
    }
});