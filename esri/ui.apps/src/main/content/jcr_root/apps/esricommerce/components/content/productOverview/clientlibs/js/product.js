/*
 *  Copyright 2016 Adobe Systems Incorporated
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

var token = "";

function APICall2(json)
{
	var form = new FormData();
	form.append("oauth_user", "ZXNyaWRldjo3MTg3IXJta0FNVjFqaw==");
	form.append("oauth_consumer_key", "451b700786aa144c68a5a7fe7ca34f1e0568c0e82");
	form.append("oauth_token", "e075b601d12c2a69d2d593403a464250058594e2b");
	form.append("oauth_signature_method", "PLAINTEXT");
	form.append("oauth_timestamp", 1482247735);
	form.append("oauth_nonce", "yyng0I");
	form.append("oauth_version", "1.0");
	form.append("oauth_signature", "cbb5ac1de395baafd7457931a4088415&48ced7f594387c489c59b7a32b683643");

	/*var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://esridev.directtrack.com/admin/api/authorize",
	  "method": "POST",
	  "headers": {
	    "oauth_user": "esridev:7187!rmkAMV1jk",
	    "cache-control": "no-cache",
	    "postman-token": "41224b03-d785-0563-e8d0-849eb1b1e325"
	  },
	  "processData": false,
	  "contentType": false,
	  "mimeType": "multipart/form-data",
	  "data": form
	}

	$.ajax(settings).done(function (response) {
	  console.log(response);
	});*/
	
	var oauth = OAuth({
	    consumer: {
	        key: '451b700786aa144c68a5a7fe7ca34f1e0568c0e82',
	        secret: 'cbb5ac1de395baafd7457931a4088415'
	    }
	});
	
	var request_data = {
		    url: 'https://esridev.directtrack.com/admin/api/authorize',
		    method: 'POST',
		    data: form
		};
	var token = {
		    key: 'e075b601d12c2a69d2d593403a464250058594e2b',
		    secret: '48ced7f594387c489c59b7a32b683643'
		};
	
	$.ajax({
	    url: request_data.url,
	    type: request_data.method,
	    data: oauth.authorize(request_data, token)
	}).done(function(data) {
	    //process your data here
	});
}

var nonce = new (function() {

    this.generate = function() {

        var now = Date.now();

        this.counter = (now === this.last? this.counter + 1 : 0);
        this.last    = now;

        // add padding to nonce
        var padding = 
            this.counter < 10 ? '000' : 
                this.counter < 100 ? '00' :
                    this.counter < 1000 ?  '0' : '';

        return now+padding+this.counter;
    };
})();
(function () {
    'use strict';

    /*Vue.component('we-product-variant', {
        props: [
            'isBase',

            'path',
            'pagePath',
            'variants',
            'sku',
            'title',
            'description',
            'color',
            'colorClass',
            'size',
            'price',
            'summary',
            'features',
            'image'
        ],
        compiled: function () {
            var self = this, data = {};

            Object.getOwnPropertyNames(this._props).forEach(function (prop) {
                data[prop] = self[prop];
            });

            self.$parent.variants.push(data);

            if (typeof data.color !== 'undefined') {
                var colorVariants = self.$parent.colorVariants[data.color];

                self.$parent.colorVariants[data.color] = colorVariants ? colorVariants + 1 : 1;
            }

            if (!!parseInt(self.isBase, 10)) {
                self.$parent.product = data;
            }
        }
    });

    if (document.querySelector('.we-Product')) {
        new Vue({
            name: 'we-Product',
            el: '.we-Product',
            data: {
                variants: [],
                colorVariants: {},
                product: null,

                isChecked: function (productSku) {
                    return productSku === this.product.sku;
                }
            },
            props: [
                'sku',
                'title',
                'pagePath'
            ],
            ready: function() {
                this.trackView();
            },
            methods: {
                _setProduct: function(sku) {
                    var self = this;

                    self.variants.forEach(function (product) {
                        if (product.sku === sku) {
                            self.product = product;
                        }
                    });
                },
                setProduct: function (event) {
                    this._setProduct(event.currentTarget.attributes['data-sku'].value);
                },
                showSizes: function () {
                    return this.colorVariants[this.product.color] > 1 || Object.keys(this.colorVariants).length === 0;
                },
                trackView: function() {
                    if (this.product && window.ContextHub && ContextHub.getStore("recentlyviewed")) {
                        ContextHub.getStore("recentlyviewed").record(
                            this.pagePath,
                            this.product.title,
                            this.product.image,
                            this.product.price
                        );
                    }

                    if (this.product && window.CQ_Analytics && CQ_Analytics.ViewedProducts) {
                        CQ_Analytics.ViewedProducts.record(
                            this.pagePath,
                            this.product.title,
                            this.product.image,
                            this.product.price
                        );
                    }
                }
            }
        });
    }
    console.log("kyle")*/
    
    var oauth_consumer_key = '451b700786aa144c68a5a7fe7ca34f1e0568c0e82';
    var oauth_token = "";
    var oauth_signature_method = 'PLAINTEXT';
    var oauth_timestamp = Math.floor(new Date().getTime()/1000);
    var oauth_nonce = nonce.generate();
    var oauth_version = '1.0';
    var oauth_signature = 'cbb5ac1de395baafd7457931a4088415%26';
    
    var secret = "";
    
	$.ajax({
	    type: 'POST',
	    url: 'https://esridev.directtrack.com/admin/api/request_token',
	    data: {
	    	oauth_consumer_key : oauth_consumer_key,
	    	oauth_token : oauth_token,
	    	oauth_signature_method : oauth_signature_method,
	    	oauth_timestamp : oauth_timestamp,
	    	oauth_nonce : oauth_nonce,
	    	oauth_version : oauth_version,
	    	oauth_signature : oauth_signature
	    },
	    dataType: 'text',
	    success: function(json){
	        console.log(json)
	        APICall2(json);
	    }
	});
	
	console.log(token)

}).call(this);


