$(document).ready(function () {
    $.fn.slider = function (options) {
        var defaults = {
            duration: 1000,
            animationDelay: 15000
        }
        var settings = $.extend({}, defaults, options);

        return this.each(function () {
            var $slider = $(this);
            var $sliderList = $slider.children("ul");
            var $sliderItems = $sliderList.children("li");
            var $allButtons = $slider.parent().find(".button");
            var $audioMP3 = $slider.parent().find(".DivAudio").children("#au01");
            var $divBG = $slider.parent();
            var $videoJAnniv = $slider.parent().find("#divVid02").children("#vid02");
            // const tbChansons = [
            //     'audio/Charles Trenet - Douce France.mp3',
            //     'audio/Carte_de_S_jour_Douce_France.mp3',
            //     'audio/Rachid_Taha_Ya_Rayah.mp3'
            // ];
            const tbChansons = [
                'https://onedrive.live.com/download?cid=99EC93C64C4D3EA8&resid=99EC93C64C4D3EA8%211002&authkey=AEEnEX1SdREHw1I', //Charles Trenet - Douce France.mp3
                'https://onedrive.live.com/download?cid=99EC93C64C4D3EA8&resid=99EC93C64C4D3EA8%211003&authkey=ACTTh1tdgx_9Tr8', //Carte_de_S_jour_Douce_France.mp3
                'https://onedrive.live.com/download?cid=99EC93C64C4D3EA8&resid=99EC93C64C4D3EA8%211004&authkey=AH5Q7Wa62BmIyCQ' //Rachid_Taha_Ya_Rayah.mp3
            ];
            
            var $indexChanson = 0;
            //$audioMP3.attr("src", tbChansons[$indexChanson]);
            //$audioMP3[0].play();
            var $svgFrame = $("#svgFrame01");
            var $pathBGFrame = $svgFrame.first().children("#gBG01");
            var $buttons = {
                forward: $allButtons.filter(".forward"),
                back: $allButtons.filter(".back")
            };
            var $containerTexte = $slider.children("#divTexte01");

            var timer = setTimeout(automaticSlide, settings.animationDelay);

            var $sliderImg = $sliderItems.children(".divImg");

            var currentIndex = 1;
            // index de l'image pour le calcul de margin-left de la liste
            // si forward : décrémenter margin-left
            // si backward : incrémenter margin-left
            var indexImgSuivCalculMarginLeft = 0;
            //indexImgSuivCalculMarginLeft %= totalImages;
            var $index = $(".index");
            var $divImg = $sliderItems.first().children("div");
            // $slider.css("width", imageWidth +"px");
            var imageWidth = $divImg.width();
    
            var totalImages = $sliderItems.length;

            // $sliderImg.children("img").each(function(index) {
            // });

            // const initialValue = 0;
            var margeG = $sliderImg.map (function () {
                return {width: $(this).width(), height:$(this).height()};
            }).get();

            // Calcul de margin-left pour aller de la dernière image à la première
            endMargin = 0;
            
            $sliderItems.each(function(index) {
                if (index < totalImages-1) {
                    endMargin -= $(this).first().children("div").width();
                }
            });
            
            $sliderItems.attr({width: imageWidth});

            var triggerSlider = function (direction, callback) {

                // Faire disparaitre le texte sur le premier changement d'image
                if ($containerTexte.css("opacity") > 0) {
                    $containerTexte.stop(true, true).animate({opacity: 0}, settings.duration * 2);
                }

                // BackButton incrémente margin-left
                var isBackButton = (direction === "+");

                animateSlider(direction, callback);
            };

            $allButtons.on("click", function (event) {
                resetTimer();
                var isBackButton = $(this).hasClass("back");
                var isMultiCultButton = $(this).hasClass("culture");
                if (isMultiCultButton) {
                   $indexChanson = ($indexChanson + 1) % tbChansons.length;
                   $audioMP3.attr("src", tbChansons[$indexChanson]);
                }else {
                triggerSlider((isBackButton? "+" : "-"), AjusterDimSvgFrame);
                event.preventDefault();
                }
            });

            // var animateSliderToMargin = function (margin, duration, callback) {
            //     $sliderList.stop(true, true).animate({
            //         "margin-left": margin
            //     }, duration, callback);
            // };

            var animateSlider = function (direction, callback) {

                $pathBGFrame.hide();

                let increment = (direction === "+" ? -1 : 1);
                // backward : margin-left est calculée avec width de l'image cible
                // forward : margin-left est calculée avec width de l'image source
                indexImgSuivCalculMarginLeft += increment;
                //indexImgSuivCalculMarginLeft %= totalImages;

                // // backward 
                // if (direction === "+") {
                //     //$divImg = $($sliderItems.get(indexImgSuivCalculMarginLeft).firstElementChild);
                //     // $divImg = $sliderItems.eq(0)
                //     // imageWidth = $divImg.width();
                // }

                let margeGauche = 0;
                
                switch (indexImgSuivCalculMarginLeft) {
                    case -1:
                        // margin-left est calculée pour afficher la dernière image
                        margeGauche = endMargin;
                        indexImgSuivCalculMarginLeft = totalImages-1;
                        break;

                    case totalImages:
                        // margin-left est calculée pour afficher la première image
                        margeGauche = 0;
                        indexImgSuivCalculMarginLeft = 0;
                        break;

                    default:
                        margeGauche = getLeftMargin();    
                }

                $sliderList.stop(true, false).animate({
                    "margin-left": margeGauche
                    // "margin-left": direction + "=" + imageWidth
                }, settings.duration, function () {

                    let increment = (direction === "+" ? -1 : 1);

                    // Calcul du nouvel index
                    let nouvelIndex = (currentIndex + increment) % totalImages;
                    if (nouvelIndex === 0) nouvelIndex = totalImages

                    updateIndex(nouvelIndex);

                    if (callback && typeof callback == "function") {
                        callback();
                    } 
                    if (nouvelIndex === 2) $videoJAnniv[0].play();
                });

                // Rétablir l'opacité à 100% de la première image sur le premier changement d'image 
                $("#divImg01").css({opacity: 1});

            };

            var AjusterDimSvgFrame = function () {
            //    $divImg = $sliderImg.eq(indexImgSuivCalculMarginLeft).children().first();
            //     //$divImg = $($sliderItems.get(indexImgSuivCalculMarginLeft).firstElementChild);
            //     imageWidth = $divImg.width();
            //     let imageHeight = $divImg.height();
            imageWidth = margeG[indexImgSuivCalculMarginLeft].width;
            let imageHeight = margeG[indexImgSuivCalculMarginLeft].height;
            
            let paddinLeftdivImg = parseInt($(document).find(".index").css("width"), 10) - imageWidth;

                //$svgFrame.attr({width: imageWidth, height: imageHeight});
                $svgFrame.css({width: imageWidth, height: imageHeight});
                // Affecter l'attribut width pour rendre opérant overflow: hidden
                $slider.css("width", imageWidth +"px");
                $pathBGFrame.show();

                $divBG.css("width", imageWidth +"px");
                 // $(document).find("#divFrame01").css("padding-left", paddinLeftdivImg +"px");
                //$divImg.find("#divImg02_01").css("padding-left", paddinLeftdivImg +"px");

            };

            var getLeftMargin = function () {
                // Sommer la largeur des images jusqu'à l'image de départ
                let ml = margeG.reduce((valPrec, val, indice) => (indice < indexImgSuivCalculMarginLeft) ? {width: valPrec.width + val.width, height: valPrec.height + val.height} : valPrec, {width:0, height:0});
                // let ml = parseInt($sliderList.css("margin-left"), 10);
                return -ml.width;
            };

            // var isAtBeginning = function () {
            //     return getLeftMargin() === 0;
            // };

            // var isAtEnd = function () {
            //     //var endMargin = ($sliderItems.length - 1) * $sliderItems.first().children("img").width();
            //     //return getLeftMargin() === -endMargin;
            //     return getLeftMargin() === endMargin
            // };

            var updateIndex = function (newIndex) {
                currentIndex = newIndex;
                $index.text(currentIndex);
            };

            $(document.documentElement).on("keyup", function (event) {
                if (event.keyCode === 37) {
                    //left arrow
                    resetTimer();
                    triggerSlider("+", AjusterDimSvgFrame);
                } else if (event.keyCode === 39) {
                    //right arrow
                    resetTimer();
                    triggerSlider("-", AjusterDimSvgFrame);
                }
            });

            var automaticSlide = function () {
                timer = setTimeout(function () {
                    triggerSlider("-", function () {
                        AjusterDimSvgFrame();
                        automaticSlide();
                    });
                }, settings.animationDelay);
            };
            setTimeout(automaticSlide, settings.animationDelay);

            var resetTimer = function() {
                if(timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(automaticSlide, 30000);
               }
        });
    };
});