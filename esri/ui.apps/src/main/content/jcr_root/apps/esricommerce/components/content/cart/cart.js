'use strict';
var global = this;
use(["commerce_init.js"], function (commerceInit) {
    var product = {};

    var resolver = resource.getResourceResolver();
    var commerceService = resource.adaptTo(com.adobe.cq.commerce.api.CommerceService);
    var commerceSession = commerceService.login(request, response);
    var productPath = currentPage.getProperties().get("cq:productMaster", java.lang.String);
    var baseProduct = commerceService.getProduct(productPath);
    var redirect, errorRedirect, addToCartUrl;
    var variants = [];
    var baseProductImagePath;
    var requiredTags = granite.resource.properties["requiredTags"];
    var skus = "";
    var quantities = "";
    var skuFlag = false;
    var kyle = "test";
    var products = [];
    var license = "";  
    // Cart details for testing
    var count = commerceSession.getCartEntryCount();
    var productsInCart = commerceSession.getCartEntries();
    
    
    for(var i = 0; i < commerceSession.getCartEntryCount(); i++){
    	var currentProduct = productsInCart.get(i).getProduct();
    	var quantity = productsInCart.get(i).getQuantity();
    	var sku = currentProduct.getProperty("sku", java.lang.String);
    	var tags = currentProduct.getProperty("cq:tagsVariants", java.lang.String);
    	var startDate = currentProduct.getProperty("effectiveDate", java.lang.String);
    	var endDate = currentProduct.getProperty("endDate", java.lang.String);
    	var image = resolver.getResource(currentProduct.getImage().getPath());
    	
    	if(tags != null && tags.contains("perpetual")){
    		license = "Perpetual"
    	} else if (tags != null && tags.contains("term")){
    		license = "One-Year Subscription";
    	}
    	products.push({
    		sku: sku,
    		license: license,
    		startDate: startDate != null? new Date(startDate).toDateString(): "",
    		endDate: endDate != null? new Date(endDate).toDateString(): "",
    		image: image != null? image.adaptTo(org.apache.sling.api.resource.ValueMap).get("fileReference", java.lang.String) : ""
    				
    	})
    	kyle += startDate;
    	if(!skuFlag){
    		skuFlag = true
    	} else{
    		skus += ",";
    		quantities += ','
    			
    	}
    	skus += sku;
    	quantities += quantity;
    }
    
    
    var cart = {
    		count: count,
    		products: productsInCart
    }

    return {
    	cart: cart,
    	skus: skus,
    	quantities: quantities,
    	products: products,
    	locale : currentPage.getAbsoluteParent(2).getPath().replace("/content/esri/","").replace("/content/esricommerce/",""),
    	storefrontPath: pageProperties.get("storefrontPath", java.lang.String)
    };


});