eBay Shopping API jQuery Plugin
===============================

Written by Thomas Parslow (tom@almostobsolete.net)
http://www.almostobsolete.net/

Perform searches and get item details from eBay using their Shopping
API.

See http://developer.ebay.com/DevZone/shopping/docs/CallRef/index.html
for a list of supported method calls.

Usage
-----

You must set up your appid before use.

    $.ebay.appid = "<your appid here>"

If you don't have an appid then sign up at http://developer.ebay.com/join/

You can then make calls to any of the Shopping API methods using
$.ebay.call(method, arguments, callback):

    $.ebay.call("FindItems",
                {QueryKeywords: "ipod nano 4gb"}, 
                function (response) {
                  alert(response.Item.length + " items found");
                });
