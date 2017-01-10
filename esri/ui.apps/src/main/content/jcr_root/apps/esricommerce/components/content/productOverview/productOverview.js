'use strict';

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
//            redirect = resolver.map(request, redirect);
//            errorRedirect = resolver.map(request, redirect);

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

        if(baseProduct){
        	product.path = baseProduct.getPath();
        }
    }

//    product.redirect = redirect;
//    product.errorRedirect = errorRedirect;
    product.addToCartUrl = addToCartUrl;
    product.resourceType = resource.resourceType;
    
    /* Find all extensions that have tag ArcGIS Desktop 
    var basePath = "/etc/commerce/products/esri/arcgis_desktop";
    var baseResource = resolver.getResource(basePath);
    var possibleExtensions = [];
    var kyle = [];
    var tag = "";
    
    var iter = baseResource.getChildren();
    for (i = 0; i < iter.length; i++){
    	vm = iter[i].adaptTo(org.apache.sling.api.resource.ValueMap);
    	tags = vm.get("cq:tagsRequired");
    	if (tags) {
	    	for (j = 0; j < tags.length; j++) {
	    		kyle.push( tags[j] + " : " + requiredTags[j]);
	        	if ((tags[j].toString()).equals(requiredTags[0])){
	        		possibleExtensions.push(vm.get("jcr:title"));
	        	}
	    	}
    	}

    	
    	
    }*/
    
    
    
    

    return {
    	product: product
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
            path: product.getPath(),
            pagePath: product.getPagePath(),
            sku: product.getSKU(),
            title: product.getTitle(),
            effectiveDate: product.getProperty('effectiveDate', java.lang.String),
            endDate: product.getProperty('endDate', java.lang.String),
            mainLabel: product.getProperty('mainLabel', java.lang.String),
            summaryDescription: product.getProperty('summaryDescription', java.lang.String),
            detailedDescription: product.getProperty('detailedDescription', java.lang.String),
            labelCaption: product.getProperty('labelCaption', java.lang.String),
            productTags: product.getProperty('cq:tags', java.lang.String),
            featured: product.getProperty('featured', java.lang.String),
            sapProductName: product.getProperty('sapProductName', java.lang.String),
            productVersion: product.getProperty('productVersion', java.lang.String),
            landingStyle: product.getProperty('landingStyle', java.lang.String),
            landingPriority: product.getProperty('landingPriority', java.lang.String),
            features: product.getProperty('features', java.lang.String),
            industries: product.getProperty('industries', java.lang.String),
            variants: product.getProperty('variants', java.lang.String),
            image: productImage != null ?
                productImage.adaptTo(org.apache.sling.api.resource.ValueMap).get("fileReference", java.lang.String) : ""
        };
    }
});