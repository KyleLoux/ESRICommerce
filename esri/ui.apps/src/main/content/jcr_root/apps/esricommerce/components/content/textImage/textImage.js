/*******************************************************************************
 * Copyright 2016 Adobe Systems Incorporated
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/

"use strict";

/**
 * Title foundation component JS backing script
 */
 use(function () {
	 
    var CONST = {
        PROP_TITLE: "title",
        PROP_TEXT: "text",
        PROP_IMAGE: "image",
        PROP_LOCATION: "location"
    };
    
    var title = granite.resource.properties[CONST.PROP_TITLE];
    var text = granite.resource.properties[CONST.PROP_TEXT];
    var image = granite.resource.properties[CONST.PROP_IMAGE];
    var location = granite.resource.properties[CONST.PROP_LOCATION];
    
    return {
    	title: title,
    	text: text,
    	image: image,
    	location: location
    }
    
});
