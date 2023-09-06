function sync(animationName) {

  function dashDur(elt) {
      /*  eSuiv.classList.add("run");*/
      const speed = 200;
      let pathLength =0;
      switch (elt.nodeName) {
        case "path":
          pathLength = elt.getTotalLength();
          break;
        case "use":
          if ($($(elt).attr("href")).get()[0].nodeName === "path") {
            pathLength =$($(elt).attr("href")).get()[0].getTotalLength();
          } else {
            // get retourne une tableau de valeur, reduce en fait la somme
            pathLength = $($(elt).attr("href") + " path").map(function () {
              return this.getTotalLength()
            }).get().reduce(function (memo, val){return memo+val});
          }
          break;
        default:
        //elt.setAttribute("stroke", "black");
      }
      // console.log(
      //   "dash élément :",
      //   elt.id,
      //   " pathLength:",
      //   pathLength,
      //   " className:",
      //   elt.className
      // );

      switch (elt.id) {
        case "path9791":
          elt.setAttribute("stroke", "blue");
          elt.setAttribute("stroke-width", "1.5");
          break;
        default:
        //elt.setAttribute("stroke", "black");
      }
  
      elt.setAttribute("stroke-dasharray", pathLength);
      elt.setAttribute("stroke-dashoffset", pathLength);
      // elt.setAttribute("stroke-width", 3);
      elt.setAttribute("stroke", "#000000");
      // elt.setAttribute("fill", "#888888");

      // Déclencher l'animation dash (keyframes) sur une durée relative à la longueur du path
      elt.setAttribute(
        "style",
        "animation: dash " + pathLength / speed + "s linear forwards;"
      );
    }
    function animationEnd(event) {
      // console.log("événement :", event.animationName, animationName);
      /* l'événement animationend est celui de l'appelant ? */
      if (event.animationName === animationName) {
        const el = event.target;
        // console.log("élément cible :", el.id);
        /* Lire l'élément voisin suivant */
        i++;
        // let eSuiv = lstElement.item(i);
        let eSuiv = $lstElement[i];
        //let eSuiv = $lstElement(el.id).next().first()[0];
        if (eSuiv) {
          /* le noeud voisin existe */
          //console.log("eSuiv.nodeName :", eSuiv.nodeName, " id:", eSuiv.id);  
          if ((eSuiv.nodeName === "path") || (eSuiv.nodeName === "use")) {
            // console.log("Next Sibling :", eSuiv.id);
            dashDur(eSuiv);
            // réduire l'opacité de l'image pour mettre en évidence le texte
            if (el.id === "path00") {
              $("#divImg01").stop(true, true).animate({opacity: 0.50}, 4000);
            }
          } else if (eSuiv.id === "gJoyeux") {
            /* Afficher "Joyeux anniversaire" */
            // setTimeout(() => {
            //   document
            //     .getElementById("gJeMeSouviens")
            //     .setAttribute("display", "none");
            //   eSuiv = eSuiv.querySelector("path");
            //   i++;
            //   dashDur(eSuiv);
            // }, 2000); // 👈️ delay in milliseconds
          } else {
            /* pas de noeud voisin : fin animation */
            console.log("Fin2 :", eSuiv);
          }
        } /* if (eSuiv)  */
      } /* if (event.animationName */
    } /* animationEnd */
  
    /* Ecouter l'événement animationend sur le DOM */
    div03.addEventListener("animationend", animationEnd, true);
    /* lire le premier élement du sélecteur */
    /*  const firstEl = div1.querySelector("#gJeMeSouviens path");*/
    // const lstElement = div1.querySelectorAll(
    //   "#div02, #gFrame1 path, #gJeMeSouviens path, #gJoyeux, #gJoyeux path"
    // );
//    let selDash = "#path00, #gJeMeSouviens path, "  + $($("#pathBG01").attr("href")).attr("id")//$("#pathBG01").attr("href")
    $selJeMeSouv = 
    $( "#gJeMeSouviens use")
    .map(function() {
      return $(this).attr("href");
    })
  //  .get()
  //  .join();

    let selDash = "#path00, #gJeMeSouviens use, #gJoyeux use";
    
    $lstElement = $(selDash) 
    // const firstEl = lstElement.item(0);
    
    // $("#pathBG01").each(function () {
    $lstElement.first().each(function () {
      // var $e = $($(this).attr("href")).first()[0];
      var $e = $(this).first()[0];
      console.log("#début ", $e);
      dashDur($e);

      // $($e.css('background-image')).each(function () {
      //   console.log("#BG Elt ", $(this).id);
      // });
    });

    // console.log("début ", lstElement.length);
    /*les éléments de la liste sont triés dans l'ordre des critères */
    var i = 0;
    // if (firstEl) {
    //   /* ajouter la classe qui dessine l'élément */
    //   dashDur(firstEl);
    // console.log("firstEl ", firstEl.id);
    // }
  } /* sync */
  
  /*
  lstElement.forEach((element, indice) => { 
    if (lstElement.item(2).id === lstElement.item(indice).id) {
      i = indice;
      return;
    }
  });
  */
  /* Point d'entrée */
  
  // const tbImages = [
  //   '<img src="https://db3pap003files.storage.live.com/y4mX6AGyhYojW4l-_WZCKd-CVsYXUW3RbR5QOcnKc0Ho-fWE29arUYNMflHWvqj5zD8boil_C6YUw8nDj4u_q5bNrbk7E4b9XaACSriAr9KQ523yPwqRiBkNt3fmY7hBFxF7TNX8Q6xHNIde0QDV4rcRbpBFTsjCx2SFawCaA4duP1cVcsS9JBKpXRjJtQuqnjQ?width=923&height=633&cropmode=none" width="923" height="633" />',
  //   '<video controls width="250"><source src="./img/Joyeux anniversaire Nanie.mp4""></video>',
  //   '<img src="https://db3pap003files.storage.live.com/y4mTQG2CS6pvhCB3QM_crFQvQnhzXssHA4tll82gNt-2-jQg_GreXRbYXZt-T2kNeO5IApFDUgSd_OU2_8w7g3r-eqp_bDlpvE09d_NENFwgYzQvgJdZH_u2JSgy6yejBI22qLH5AatekV8NLu_kCv1-xTpaLXzDraZMqM2AsIjIWHK3IBqvuesm7zECv-6G_0j?width=928&height=1342&cropmode=none" width="928" height="1342" />',
  //   '<img src="https://db3pap003files.storage.live.com/y4mY9358iiLhmpQHv8dVdyNngVXesNSt6rZeuyoSGEZFe5LEl_yn6ylHXOVKNDkoBtWDnIk7jyAWpNCvogII7qWKg3BxaZrOCxerNuHD-2UEfqxk14RtwqGYAfpITCvdNNUxIJEMFw30hojrKi29M5kckaVaXHhvquvJwc2rMYAUdbryWlmmU1NuLPNJk3WNO-g?width=917&height=1283&cropmode=none" width="917" height="1283" />',
  //   '<img src="https://db3pap003files.storage.live.com/y4m532dfVPoAh1ZFww0sDJkOhAFdIlpyWptaE0_EygXqS6haEIW4UnBqslC1q6cKcCihk1QznbBBKJ_ctTJrK3UMtTAbw1cmhjMqyMCSc5n--LjJYgjpdiUR6gZCvfidBZ_6o-YDvEgRThw3DxOpS_1Mt52-3AUA_1CCykqDKvNpX6qtvhInGhLZbpWnhOV_fhA?width=907&height=1281&cropmode=none" width="907" height="1281" />',
  //   '<img src="https://db3pap003files.storage.live.com/y4mBrdpZInnO6vYsssq3Qr36E-IaRwWBI_l7tGQcUgxrRnCAN59-DSWNG0ZOzDMVe-O2YmjdQT1rIyaaIFfOH9ERXF0Sotc1UzknBNG123ChDXUBs-OsBMBRaP_YXGucPttTq3M6zujcjr5ttHhgW5IvYgYAAPyHnQGYJjUvSCGguFanHC2N9uh_vpOgwc90Pwl?width=1356&height=877&cropmode=none" width="1356" height="877" />',
  //   '<img src="https://db3pap003files.storage.live.com/y4mIb2ZIfd41DsKQDw2NbnZ2Ky41nWaaxxaLbP011Qo08yV5NbH4T-ouO3MI86DQ9q_gWGJtwrhDlTWjSyOjaXH2pXyiUDkRPuyUlnG09kRUvFsKC6_mKdS_Hj6cMy3GUw9qWw6vIh4BDJ9C0SMpCttxlV9z4ukFy5sf1NcP8pHNJBKpKVINrCDQ44Bx9IiSZke?width=1637&height=1095&cropmode=none" width="1637" height="1095" />',
  //   '<img src="https://db3pap003files.storage.live.com/y4meHe15o9VN5lI9csBAct0QDi4Zjd8lEVsu-LajIPDgD6lYwNn15PFIKcK7aCi52r6GlfainT-s05LoeAxSOv60CHZfg_NRD6UpX6pnfI3ElatxT0Qk0OZYL8Dd-mVQuu96ZnO7v0YgJynCFpfvJRynToxB183zo5t6zCml1uMyKGq9iTqadnNBxI9e6HFhPw8?width=1569&height=1036&cropmode=none" width="1569" height="1036" />',
  //   '<img src="https://db3pap003files.storage.live.com/y4mgp4YH-_AriPmOyQUJTc7kW0e_ooWbFsQgkWHHsKtF1i40ak4B0zX5Qzzeuh4POcenGTK8twHVCvIKV4xjFgOv59e3iNNmpjgLxPKrOI9OAzVtCC8Cv2jviqRjzueypUulU69QaKzwXFAXLSE7uCXCAn6onFVuv5pnUo0d8U4fqAoGs9B78LZz-CReh_x_h-z?width=1596&height=1034&cropmode=none" width="1596" height="1034" />',
  //   '<img src="https://db3pap003files.storage.live.com/y4mWRD2bLlqRJmtbc-Y5YosoqfGVYtjYbEuqca7BEtf1wcYdnQ49EztKw3-KVf-LGuSJxOyCzRmoyS5EWiK-CXxF8vwgbIUY8ZB0JcT8J0wF-2WJtHwv03ox-WHkGwF6MMcidfIQj7S7ys4bnUhnur3pRDjL8bBPLnPH3uJy7Qdqkx7dXo2H8PKq2lVSydGF-9O?width=1546&height=1018&cropmode=none" width="1546" height="1018" />',
  //   '<img src="https://db3pap003files.storage.live.com/y4mVtePIVz2kiQEI0nAEzDDA2l5oMrDNcg9Ak0kEykttFuSWfG52CvSlwWCztEgDlVSiaHfVpOsN2pVeqUoEOdK-1JtV7wrp1OgxjawgTiHLsi0EYOKIT0tsJrTPbeSJuXtV2NdZ5_7oWub7jh92G0OaiwdfqBUL6q8nFE3fxF2MCboPemk_Sjh6A66Uyi41WNk?width=1546&height=1055&cropmode=none" width="1546" height="1055" />',
  //   '<img src="https://db3pap003files.storage.live.com/y4mSMeeDvBt_qjRyN-NewcFftpRSaj0kCyfFNCzZeoezcZCcqWCWjGGzJjYvfM-BpZMdgiHZklV6p8RXUIBWOO7jxHHO3jURBO8-ssk9A6imO5MuBQYESznd3uxiItOqTmkwtQ21VpG187XWKaKIGhVxukPwxC2ytFRN4aMwjVXQGpXFBB2I-Stp0tCSkGiCr0e?width=981&height=655&cropmode=none" width="981" height="655" />'
  // ];
$(document).ready(function () {

 
  // const interactionUtilisateur = document.querySelector("#au01");

  // interactionUtilisateur.addEventListener("play", (event) => {
    const animationController = sync("dash");

    // évenement play  

    $(function () {
      $(".slider").slider();
    }); 

  // });
});

