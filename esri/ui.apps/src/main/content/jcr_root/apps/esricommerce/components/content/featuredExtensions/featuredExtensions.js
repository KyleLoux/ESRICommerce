'use strict';
var global = this;
use(["commerce_init.js"], function (commerceInit) {
    var EsriProductClass = Packages.esri.commerce.esri.core.models.EsriProduct;
    var product = {};

    var resolver = resource.getResourceResolver();
    var commerceService = resource.adaptTo(com.adobe.cq.commerce.api.CommerceService);
    var commerceHelper = resource.adaptTo(com.adobe.cq.commerce.common.CommerceHelper);
    var commerceSession = commerceService.login(request, response);
    var extensions = properties.get("extension");
    var title = properties.get("title");
    var items = new Array();
    var kyle = "";
    if (null != extensions) {
    	if (extensions.getClass().getName().equals("java.lang.String")) {
    		items[0] = JSON.parse(extensions);
    	} else {
            for (i = 0; i < extensions.length; i=i+3) {
            	var product1 = commerceService.getProduct(extensions[i]);
            	var product2 = commerceService.getProduct(extensions[i + 1]);
            	var product3 = commerceService.getProduct(extensions[i + 2]);
                items.push({
                	extension1: getProductProperties(product1),
                	extension2: getProductProperties(product2),
                	extension3: getProductProperties(product3),
                })
            };
        };
    };

    return {
    	extensions: items,
    	title: title
    };

    function getProductProperties(product) {
        if (!product) {
            return null;
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
            pagePath: pagePath,
       };
    }
});