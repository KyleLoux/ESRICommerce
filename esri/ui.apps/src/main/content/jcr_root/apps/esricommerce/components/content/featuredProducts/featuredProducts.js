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
    var redirect, errorRedirect, addToCartUrl;
    var variants = [];
    var baseProductImagePath;
    var rootProperties = currentPage.getAbsoluteParent(2).getProperties();
    var featuredProduct1Path = rootProperties.get("featured1", java.lang.String);
    var featuredProduct2Path = rootProperties.get("featured2", java.lang.String);
    var featuredProduct3Path = rootProperties.get("featured3", java.lang.String);

    var featuredProduct1 = commerceService.getProduct(featuredProduct1Path);
    var featuredProduct2 = commerceService.getProduct(featuredProduct2Path);
    var featuredProduct3 = commerceService.getProduct(featuredProduct3Path);
    

    return {
    	featuredProduct1: getProductProperties(featuredProduct1),
    	featuredProduct2: getProductProperties(featuredProduct2),
    	featuredProduct3: getProductProperties(featuredProduct3)
    };

    function getProductProperties(product) {
        if (!product) {
            return null;
        }
        var productImage;
        var localEsriProduct = new EsriProductClass(product, currentPage);
        var image = localEsriProduct.getImage();
        if (image) {
            productImage = resolver.getResource(image.getPath());
        }
        sqlStatement = "SELECT * FROM [cq:PageContent] WHERE CONTAINS('cq:productMaster','" + product.getPath() + "')"
    	results = resolver.findResources(sqlStatement, "JCR-SQL2");
    	while(results.hasNext()) {
    		var result = results.next();
    		var pagePath = result.getParent().getPath();
    	}

        return {
            title: localEsriProduct.getTitle(),
            summaryDescription: localEsriProduct.getProperty('summaryDescription', java.lang.String),
            labelCaption: localEsriProduct.getProperty('labelCaption', java.lang.String),
            pagePath: pagePath,
            image: localEsriProduct.getProperty('smallImage', java.lang.String),
        };
    }
});