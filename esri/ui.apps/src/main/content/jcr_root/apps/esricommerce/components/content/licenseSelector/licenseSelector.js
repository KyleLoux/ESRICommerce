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
    var skus = [];
    
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
    		var tags = childProduct.getProperty("cq:tagsVariants", java.lang.String).split('/')
    		skus.push(childProduct.getProperty("sku", java.lang.String))
    		children.push({
    			title: childProduct.getProperty("jcr:title", java.lang.String),
    			productPath: childProduct.getPath(),
    			tag: tags[tags.length - 1],
    			sku: childProduct.getProperty("sku", java.lang.String),
    			first: i == 0? true : false
    		});
        	i++;
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
    	skus: skus
    };

    function getProductProperties(product) {
        if (!product) {
            return null;
        }
        var productImage;
        var image = product.getImage();
        if (image) {
            productImage = resolver.getResource(image.getPath());
        }
        
        var vm = product.adaptTo(org.apache.sling.api.resource.ValueMap);


        return {
            title: product.getTitle(),
            detailedDescription: product.getProperty('detailedDescription', java.lang.String)
        };
    }
});