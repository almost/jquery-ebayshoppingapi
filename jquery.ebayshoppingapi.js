/* eBay Shopping API jQuery Plugin
 * Written by Thomas Parslow (tom@almostobsolete.net)
 * @requires jQuery v1.2
 *
 * Copyright 2009 Thomas Parslow
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

jQuery(function($) {
   var nextID = 0;
   var pendingcallbacks = {};
   function ebaycallback(root) {
     callback = pendingcallbacks[root.CorrelationID];
     if (callback) {
       pendingcallbacks[root.CorrelationID] = undefined;
       callback(root);
     }
   }

   $.ebay = $.extend({
     appid: "<appid required>",
     endpointURL: "http://open.api.ebay.com/shopping",
     siteid: 0, // The US
     call: function (callname, arguments, callback) {
       if ($.ebay.appid == "<appid required>") {
         console.error("eBay Shopping API jQuery plugin requires that $.ebay.appid be set before an calls are made");
       }
       var messageid = "jqueryebayshoppingapi" + (nextID++);
       // Set up the callback
       pendingcallbacks[messageid] = callback;
       window["_cb_" + callname] = ebaycallback;
       // Make the call
       arguments = $.extend({callname: callname,
                             appid: $.ebay.appid,
                             version: 517,
                             siteid: $.ebay.siteid,
                             MessageID: messageid,
                             responseencoding: "JSON",
                             callback: "true"}, arguments);
       $.ajax({url: $.ebay.endpointURL, dataType: "script", cache: true, data: arguments});

       // var encodedparams = [];
       // $.each(arguments, function (key,value) {
       //   encodedparams[encodedparams.length] =  (key + "=" + escape(value));
       // })
       // var url = $.ebay.endpointURL + "?" + encodedparams.join("&");
       // $.getScript(url);
     }}, $.ebay || {});
});