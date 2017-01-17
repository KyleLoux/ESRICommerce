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
    var errorMessage = granite.resource.properties["errorMessage"];
    var skus = "";
    var gcids = "";
    var quantities = "";
    var startDates = "";
    var endDates = "";
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
    	var gcid = currentProduct.getProperty("gcid", java.lang.String);
    	var tags = currentProduct.getProperty("cq:tagsVariants", java.lang.String);
    	var startDate = currentProduct.getProperty("effectiveDate", java.lang.String);
    	var endDate = currentProduct.getProperty("endDate", java.lang.String);
    	if(currentProduct.getImage()){
    		var image = resolver.getResource(currentProduct.getImage().getPath());
    	}
    	
    	if(tags != null && tags.contains("perpetual")){
    		license = "Perpetual"
    	} else if (tags != null && tags.contains("term")){
    		license = "One-Year Subscription";
    	}
    	products.push({
    		sku: sku,
    		quantity: quantity,
    		gcid: gcid,
    		license: license,
    		startDate: startDate,
    		endDate: endDate,
    		startDateText: startDate != null? new Date(startDate).toDateString(): "",
    		endDateText: endDate != null? new Date(endDate).toDateString(): "",    				
    		image: image != null? image.adaptTo(org.apache.sling.api.resource.ValueMap).get("fileReference", java.lang.String) : ""
    				
    	})
    	kyle += startDate;
    	if(!skuFlag){
    		skuFlag = true
    	} else{
    		skus += ",";
    		gcids += ",";
    		quantities += ',';
    		startDates += ',';
    		endDates += ',';
    			
    	}
    	skus += sku;
    	gcids += gcid;
    	quantities += quantity;
    	startDates += startDate;
    	endDates += endDate;
    }
    
    var distributor = "2000";
    var country = "CA";
    var currency = "CAD";
    var formLocale = "en_CA"
    var locale = currentPage.getAbsoluteParent(2).getPath().replace("/content/esri/","").replace("/content/esricommerce/","")
	if(locale == 'en'){
     	distributor = "456795";
     	country = "US";
     	currency = "USD";
     	formLocale = "en_US"
    } 
    
    var cart = {
    		count: count,
    		products: productsInCart
    }

    return {
    	cart: cart,
    	skus: skus,
    	gcids: gcids,
    	quantities: quantities,
    	endDates: endDates,
    	startDates: startDates,
    	products: products,
    	locale : locale,
    	distributor : distributor,
    	country: country,
    	currency: currency,
    	formLocale: formLocale,
    	storefrontPath: pageProperties.get("storefrontPath", java.lang.String),
    	errorMessage: errorMessage
    };


});