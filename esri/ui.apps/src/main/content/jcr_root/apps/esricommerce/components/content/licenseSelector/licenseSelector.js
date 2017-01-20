'use strict';
var global = this;
use(["commerce_init.js"], function (commerceInit) {
    var EsriProductClass = Packages.esri.commerce.esri.core.models.EsriProduct;
    var product = {};

    var resolver = resource.getResourceResolver();
    var commerceService = resource.adaptTo(com.adobe.cq.commerce.api.CommerceService);
    var commerceSession = commerceService.login(request, response);
    var productPath = currentPage.getProperties().get("cq:productMaster", java.lang.String);
    var baseProduct = commerceService.getProduct(productPath);
    var esriProduct = new EsriProductClass(baseProduct, currentPage);
    var tagManager = request.resourceResolver.adaptTo(Packages.com.day.cq.tagging.TagManager)
    var redirect, errorRedirect, addToCartUrl;
    var variants = [];
    var baseProductImagePath;
    var requiredTags = granite.resource.properties["requiredTags"];
    var licenseDescription = granite.resource.properties["licenseDescription"];
    var quantityDisclaimer = granite.resource.properties["quantityDisclaimer"];
    var licenseText = granite.resource.properties["licenseText"];
    var noPriceMessage = granite.resource.properties["noPriceMessage"];
    var loggedIn = currentPage.getProperties().get("loggedIn", java.lang.String);
    var notLoggedInMessage = granite.resource.properties["notLoggedInMessage"];
    var skus = [];
    var gcids = [];
    
    if (baseProduct) {
        var baseProductProperties = getProductProperties(baseProduct);
        var variationAxis = baseProduct.getProperty("cq:productVariantAxes", java.lang.String);
        var variationTitle = baseProduct.getProperty("variationTitle", java.lang.String);
        var variationLead = baseProduct.getProperty("variationLead", java.lang.String);

        var variations = {
            type: variationAxis,
            colors: {},
            sizes: []
        };

        if (request && request.getAttribute) {
            addToCartUrl = request.getAttribute("cq.commerce.addToCartUrl");
            redirect = request.getAttribute("cq.commerce.redirect");
            errorRedirect = request.getAttribute("cq.commerce.errorRedirect");
            baseProduct = request.getAttribute("cq.commerce.product");

            if (baseProduct
                    && baseProduct.getImage()) {
                baseProductImagePath = baseProduct.getImage().getPath();
            }
        }

        if (resource && resource.getResourceResolver) {
            var resolver = resource.getResourceResolver();
            redirect = resolver.map(request, redirect);
            errorRedirect = resolver.map(request, redirect);

            if (baseProductImagePath) {
                baseProductImagePath = resolver.map(baseProductImagePath);
            }
        }

        if (variationAxis) {
            var unorderedVariations = baseProduct.getVariants();

            while (unorderedVariations.hasNext()) {
                var productVariation = unorderedVariations.next();

                if (productVariation.SKU == null) {
                    continue;
                }

                var variation = getProductProperties(productVariation);

                if (variationLead !== '' && productVariation.getProperty(variationAxis, java.lang.String) === variationLead) {
                    variants.unshift(variation);
                }
                else {
                    variants.push(variation);
                }

                if ('' + variations.type === 'color') {
                    if (!variations.colors[('' + variation.color).toLowerCase()]) {
                        variations.colors[('' + variation.color).toLowerCase()] = [];
                    }
                    variations.colors[('' + variation.color).toLowerCase()].push(variation);
                }
                else if ('' + variations.type === 'size') {
                    variations.sizes.push(variation);
                }
            }
        }

        if (!variants.length) {
            variants.push(baseProductProperties);
        } else {
            baseProductProperties = variants[0];
        }
        baseProductProperties.productTrackingPath = request.getAttribute("cq.commerce.productTrackingPath");

        product.base = baseProductProperties;
        product.baseProduct = baseProduct;
        product.variants = variants;
        product.variations = variations;

        product.variationTitle = variationTitle;
        product.variationLead = variationLead;

        product.path = baseProduct.getPath();
        //product = getProductProperties(product)
    }

    product.redirect = redirect;
    product.errorRedirect = errorRedirect;
    product.addToCartUrl = addToCartUrl;
    product.resourceType = resource.resourceType;
    
  //Get Child Products
    var childProductResource = resolver.resolve(productPath);
    var childrenIterator = childProductResource.getResourceResolver().listChildren(childProductResource);
    var children = [];
    var i = 0;
    
    while(childrenIterator.hasNext()){
    	var childPages = currentPage.listChildren();
    	nextChild = childrenIterator.next();
    	if(nextChild.getResourceType() == 'commerce/components/product') {
    		var childProduct = commerceService.getProduct(nextChild.getPath());
    		var childEsriProduct = new EsriProductClass(childProduct, currentPage);
    		var tags = childProduct.getProperty("cq:tagsVariants", java.lang.String)
    		skus.push(childProduct.getProperty("sku", java.lang.String))
    		gcids.push(childProduct.getProperty("gcid", java.lang.String))
    		children.push({
    			title: childEsriProduct.getProperty("jcr:title", java.lang.String),
    			productPath: childProduct.getPath(),
    			tag: tagManager.resolve(tags).getTitle(),
    			sku: childProduct.getProperty("sku", java.lang.String),
    			gcid: childProduct.getProperty("gcid", java.lang.String)
    		});
    	}
    }
    product.children = children;
    
    
    // Cart details for testing
    var count = commerceSession.getCartEntryCount();
    var productsInCart = commerceSession.getCartEntries();
    
    
    var cart = {
    		count: count,
    		products: productsInCart
    }

    return {
    	product: product,
    	cart: cart,
    	modal: properties.get("modal"),
    	errorMessage: properties.get("errorMessage") ? properties.get("errorMessage") : "Purchasing more than 1 of this product is currently not available.",
    	locale: currentPage.getAbsoluteParent(2).getPath().replace("/content/esri/",""),
    	skus: skus,
    	gcids: gcids,
    	licenseDescription:licenseDescription,
    	quantityDisclaimer: quantityDisclaimer,
    	licenseText: licenseText ? licenseText : "License Type",
    	noPriceMessage: noPriceMessage ? noPriceMessage : "For questions or to purchase, please contact your local <a href='http://www.esri.com/about-esri/contact#international'>Esri office.</a>",
    	loggedIn: loggedIn ? loggedIn : "true",
    	notLoggedInMessage : notLoggedInMessage ? notLoggedInMessage : "Sign in to see Price"
    };

    function getProductProperties(product) {
        if (!product) {
            return null;
        }
        
        var vm = product.adaptTo(org.apache.sling.api.resource.ValueMap);
        var localEsriProduct = new EsriProductClass(product, currentPage);

        return {
            title: esriProduct.getTitle(),
            detailedDescription: esriProduct.getProperty('detailedDescription', java.lang.String),
			productPath: product.getPath(),
			sku: product.getProperty("sku", java.lang.String),
			gcid: product.getProperty("gcid", java.lang.String),
        };
    }
});