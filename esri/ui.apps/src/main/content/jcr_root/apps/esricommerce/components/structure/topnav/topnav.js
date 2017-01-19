/*
 *  Copyright 2015 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

// Server-side JavaScript for the topnav logic
use(function () {
    var items = [];
    var root = currentPage.getAbsoluteParent(2);
    var currentNavPath = currentPage.getAbsoluteParent(2).getPath();
    var it = root.listChildren(new Packages.com.day.cq.wcm.api.PageFilter());
    var cartPath = "/content/esri/en/cart";
    
    while (it.hasNext()) {
        var page = it.next();
        pageContentResource = page.getContentResource();
        pageValueMap = pageContentResource.adaptTo(org.apache.sling.api.resource.ValueMap);
        if (pageValueMap.get("hideInNav", java.lang.Boolean)) {
        	continue;
        }

        // No strict comparison, because the types returned from the Java APIs
        // don't strictly match the JavaScript types
        var className = (page.getPath() == currentNavPath)? "is-active" : "";
        var isCart = (page.getTitle() == 'Cart');

        items.push({
            page: page,
            className : className,
            isCart: isCart
        });
    }

    return {
        items: items,
        currentNavPath: currentNavPath,
        cartPath: cartPath
    };
});