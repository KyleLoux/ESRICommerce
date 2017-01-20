'use strict';

use(["commerce_init.js"], function (commerceInit) {
    var EsriProductClass = Packages.esri.commerce.esri.core.models.EsriProduct;
    var product = {};

    var resolver = resource.getResourceResolver();
    var commerceService = resource.adaptTo(com.adobe.cq.commerce.api.CommerceService);
    var commerceSession = commerceService.login(request, response);
    var productPath = currentPage.getProperties().get("cq:productMaster", java.lang.String);
    var baseProduct = commerceService.getProduct(productPath);
    var esriProduct = new EsriProductClass(baseProduct, currentPage);
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
        var localEsriProduct = new EsriProductClass(product, currentPage);

        var vm = product.adaptTo(org.apache.sling.api.resource.ValueMap);


        return {
            title: localEsriProduct.getTitle(),
            detailedDescription: localEsriProduct.getProperty('detailedDescription', java.lang.String),
        };
    }
});