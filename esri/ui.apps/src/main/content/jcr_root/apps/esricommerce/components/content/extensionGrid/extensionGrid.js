'use strict';
var global = this;
use(["commerce_init.js"], function (commerceInit) {
    var EsriProductClass = Packages.esri.commerce.esri.core.models.EsriProduct;
    var product = {};

    var resolver = resource.getResourceResolver();
    var commerceService = resource.adaptTo(com.adobe.cq.commerce.api.CommerceService);
    var commerceHelper = resource.adaptTo(com.adobe.cq.commerce.common.CommerceHelper);
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
    
    //Get Possible Extensions
    var vm = resolver.resolve(productPath).adaptTo(org.apache.sling.api.resource.ValueMap);
    var possibleExtensions = vm.get("cq:tagsRequired");
    kyle = "";
    var extensions = [];

    var extensionBasePath = "/etc/commerce/products/esri/extensions";
    var extensionBaseResource = resolver.getResource(extensionBasePath);
    var iter = extensionBaseResource.getChildren();
    var tagManager = request.resourceResolver.adaptTo(Packages.com.day.cq.tagging.TagManager)
    if(possibleExtensions){
	    for(i=0; i< possibleExtensions.length; i++){
	        var possibleExtensionsIter = tagManager.find(possibleExtensions[i])
	        while(possibleExtensionsIter.hasNext()){
	        	var extension = possibleExtensionsIter.next();
	            var currentProduct = commerceService.getProduct(extension.getPath());
	        	currentProduct = getProductProperties(currentProduct);
	        	sqlStatement = "SELECT * FROM [cq:PageContent] WHERE CONTAINS('cq:productMaster','" + extension.getPath() + "')"
				results = resolver.findResources(sqlStatement, "JCR-SQL2");
	        	while(results.hasNext()) {
	        		var result = results.next();
	        		kyle += result.getParent().getPath();
	        		currentProduct.path = result.getParent().getPath();
	        	}
	        	extensions.push(currentProduct)
	        }
	    }
    }


    return {
    	product: product,
    	kyle: kyle,
    	locale: currentPage.getAbsoluteParent(2).getPath().replace("/content/esri/",""),
    	extensions: extensions
    };

    function getProductProperties(product) {
        if (!product) {
            return null;
        }
        var productImage;
        var image = esriProduct.getImage();
        if (image) {
            productImage = resolver.getResource(image.getPath());
        }
        
        var vm = product.adaptTo(org.apache.sling.api.resource.ValueMap);
        var kyle = "asdfå";
        var childProductResource = resolver.resolve(product.getPath());
        var childrenIterator = childProductResource.getResourceResolver().listChildren(childProductResource);
        var childPaths = [];
        var childGcids = [];
        var i = 0;
        
        while(childrenIterator.hasNext()){
        	var childPages = currentPage.listChildren();
        	nextChild = childrenIterator.next();
        	if(nextChild.getResourceType() == 'commerce/components/product') {
        		var childProduct = commerceService.getProduct(nextChild.getPath());
        		var tags = childProduct.getProperty("cq:tagsVariants", java.lang.String)
        		tags = tags != null? tags.split('/'): "";
        		kyle = kyle + tags[tags.length - 1]
        		if(tags[tags.length - 1] == "perpetual"){
        			childPaths[0] = childProduct.getPath()
        			childGcids[0] = childProduct.getProperty("gcid", java.lang.String)
        		} else if (tags[tags.length - 1] == "term"){
        			childPaths[1] = childProduct.getPath()
        			childGcids[1] = childProduct.getProperty("gcid", java.lang.String)
        		}
        	}
        }


        return {
            title: esriProduct.getTitle(),
            summaryDescription: esriProduct.getProperty('summaryDescription', java.lang.String),
            gcid: esriProduct.getProperty('gcid', java.lang.String),
            productPath: product.getPath(),
            kyle: kyle,
            gcid1: childGcids[0],
            gcid2: childGcids[1],
            childPaths: childPaths,
            image: productImage != null ?
                    productImage.adaptTo(org.apache.sling.api.resource.ValueMap).get("fileReference", java.lang.String) : "",
        };
    }
});