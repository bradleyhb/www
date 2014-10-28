(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('WebScraperController', WebScraperController);

    /**
     * Angular Controller: WebScraperController
     */
    WebScraperController.$inject = ['$timeout', 'HelperFactory', 'FirebaseFactory'];

    function WebScraperController($timeout, HelperFactory, FirebaseFactory) {

        var isNotFinished = true; // Flag indicator to check if there are no more data to be retrieved.
        var targetUrl = 'http://www.unurth.com/designs/feed/index-pagination.php';
        var row = 0;
        var vm = this;

        /**
         * VARIABLES
         */
        vm.itemScrape = [];

        /**
         * FUNCTIONS
         */
        vm.getArtworkInfo = getArtworkInfo;
        vm.getArtistInfo = getArtistInfo;
        vm.getThumbnail = getThumbnail;
        vm.getEntries = getEntries;
        
        getEntries();

        ////////////////////////////////////////////////////////////////////////////////////

        /**
         * Function: getArtworkInfo
         *
         * Get Artist Artworkout Info
         * 
         * Parameters:
         * 
         *     (Object) data - The artist data.
         */
        function getArtworkInfo(data) {
            $('<img/>').attr('src', data.artwork.featuredImgUri).load(function() {

                var imgUri = '';
                var fileName = '';

                if (typeof data.artwork.featuredImgUri !== 'undefined') {
                    fileName = data.artwork.featuredImgUri.split('/');

                    imgUri = fileName[fileName.length - 1];

                    $.ajax({
                        url: 'uploader.php',
                        type: 'GET',
                        data: {
                            fileURL: data.artwork.featuredImgUri,
                            fileKey: imgUri
                        }
                    });
                } else {
                    fileName = data.thumbnail.split('/');
                    imgUri = fileName[fileName.length - 1];
                }

                var itemEntry = {
                    artistUri: data.artistUri,
                    artist: data.artist,
                    thumbnail: data.thumbnail,
                    artwork: {
                        imgUri: 'http://silkscreen.s3-us-west-2.amazonaws.com/' + imgUri,
                        imgWidth: this.width,
                        imgHeight: this.height,
                        isMany: data.artwork.isMany
                    },
                    location: data.location
                };

                vm.itemScrape.push(itemEntry);
                
                HelperFactory.rootScopeDigest();

                FirebaseFactory.pushData(itemEntry);
            });
        }

        /**
         * Function: getArtistInfo
         *
         * Get artist info
         * 
         * Parameters:
         * 
         *     (Object) data - The artist data.
         */
        function getArtistInfo(data) {
            $.ajax({
                url: data.artistUri,
                type: 'GET',
                dataType: '',
                success: function(response) {
                    var dataDOM = $(HelperFactory.htmlStringToDom(response)).children().find('.project_content');
                    var itemArtist = dataDOM.find('b:contains("artist")').next().html();
                    
                    var content = dataDOM.contents().filter(function() {
                            return this.nodeType !== 3 || (this.nodeType === 3 && this.data.trim() != '');
                        });
                    
                    var findLoc = dataDOM.find('b:contains("location")'),
                        r = 0;

                    // Traverse DOM Array and find <b> with 'location' value inside of it
                    for (var l = content.length; r < l; ++r) {
                        if (content[r] === findLoc[0]) {
                            break;
                        }
                    }

                    var loc = content[r + 1],
                        itemLocation;

                    if (typeof loc === 'undefined') {
                        itemLocation = 'No Location';
                    } else if (loc.nodeType === 3) {
                        itemLocation = loc.data;
                    } else {
                        itemLocation = loc.innerHTML;
                    }

                    var itemEntry = {
                        artistUri: data.artistUri,
                        artist: (typeof itemArtist !== 'undefined' ? itemArtist : 'No artist'),
                        thumbnail: data.image,
                        artwork: {
                            featuredImgUri: (typeof dataDOM.find('img')[0] !== 'undefined' ? dataDOM.find('img')[0].src : data.image.imageUri ),
                            isMany: (dataDOM.find('img').length > 1 ? true : false)
                        },
                        location: itemLocation
                    };

                    getArtworkInfo(itemEntry);
                }
            });
        }

        /**
         * Function: getThumbnail
         *
         * Get artist artwork thumbnail
         * 
         * Parameters:
         * 
         *     (Object) data - The artist data.
         */
        function getThumbnail(data) {
            $('<img/>').attr('src', data.imgUri).load(function() {

                var item = {
                    artistUri: data.artistUri,
                    image: {
                        imgUri: data.imgUri,
                        imgWidth: this.width,
                        imgHeight: this.height
                    }
                };

                getArtistInfo(item);
            });
        }

        /**
         * Function: getEntries
         *
         * Retrieve data from the url.
         */
        function getEntries() {

            if (isNotFinished) {
                /**
                 * NOTE: AJAX Request was identified by debugging the website with Firebug
                 */
                $.ajax({
                    url: targetUrl,
                    crossDomain: true,
                    type: 'POST',
                    dataType: '',
                    data: {
                        cat: '',
                        design: 'feed',
                        startRow: row,
                        url: 'unurth',
                        viewtype: 'admin'
                    },
                    // Return:
                    // data = HTML String
                    success: function(data) {
                        // console.log(data); 
                        
                        // This means it's the end of the page
                        // So let's stop requesting
                        if (data.length === 0) {
                            isNotFinished = false;
                        } else {
                            var dataDOM = $(HelperFactory.htmlStringToDom(data));

                            dataDOM.children().find('.module .cardimgcrop').each(function() {
                                var item = {
                                    artistUri: $(this).children('a').attr('href'),
                                    imgUri: $(this).children().find('img').attr('src')
                                };

                                getThumbnail(item);
                            });
                            
                            row += 100;
                        }

                        $timeout(getEntries, 10000);
                    },
                    error: function(data) {
                        console.log(data);
                    }
                });
            } else {
                console.log('finish');
            }
        }
    }
})();