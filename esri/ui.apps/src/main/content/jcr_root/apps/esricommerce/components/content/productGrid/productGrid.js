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
    var products = properties.get("product");
    var items = new Array();
    var kyle = "";
    if (null != products) {
    	if (products.getClass().getName().equals("java.lang.String")) {
    		items[0] = getProductProperties(products);
    	} else {
            for (i = 0; i < products.length; i=i+2) {
            	var product1 = commerceService.getProduct(products[i]);
            	var product2 = commerceService.getProduct(products[i + 1]);
            	items.push({
            		product1: getProductProperties(product1),
            		product2: getProductProperties(product2)
            	})
            };
        };
    };

    return {
    	products: items
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
        
        sqlStatement = "SELECT * FROM [cq:PageContent] WHERE CONTAINS('cq:productMaster','" + product.getPath() + "')"
    	results = resolver.findResources(sqlStatement, "JCR-SQL2");
    	while(results.hasNext()) {
    		var result = results.next();
    		var pagePath = result.getParent().getPath();
    	}
        var localEsriProduct = new EsriProductClass(product, currentPage);

        return {
            title: localEsriProduct.getTitle(),
            summaryDescription: localEsriProduct.getProperty('summaryDescription', java.lang.String),
            labelCaption: localEsriProduct.getProperty('labelCaption', java.lang.String),
            pagePath: pagePath,            
            image: localEsriProduct.getProperty('smallImage', java.lang.String)
        };
    }
});