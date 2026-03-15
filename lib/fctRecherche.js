/*
 * fonction de base
 *
 * (c) 2023 Duarte TERENCIO
 *
 * Version 24.11.19  
 * Contient toutes les fonctions de recherche sur les Elements, les relations, etc.
 */

/**
 * Recherche un objet par id ou samid.
 * @param {*} pvalue Id de la recherche. 
 * @returns un Aobjet.
 */
function rechercheBy(pvalue, propertyKey = "samid") {

    //console.log("pvalue = " + pvalue);
    //console.log("propertyKey = " + propertyKey);

    // recherche si le composant existe
    if (pvalue == null) return undefined;

    var theConcept = $("#" + pvalue).first();

    if (theConcept) {
        //console.log(">>Rechercheby  " + pvalue + " directe trouvé");
        return theConcept;
    } else {
        //console.log("Par samid");

        //console.log("Recherche sur la prop "+ propertyKey +" dans l'element");
        //regarde si c'est un Element
        var result = $("element").filter(function (el) {
            var tab = el.prop(propertyKey, true);
            
            if (Array.isArray(tab)) {
                //console.log("Je suis un tableau");
                // printObject(tab);
                return tab.includes(pvalue);
            } else {
                return (stringidentique(tab, pvalue));
                //return tab == pvalue;
            }
        });
        //console.log("Result")
        //printObject( result);

        if (result) {
            //console.log("dans reponse");
            //console.log(">>Rechercheby  " + pvalue + " Element Samid");
            rep = result[0];
            if (rep) return rep;
        }

        //console.log("Recherche sur le samid relation");
        // regarde si c'est une relation
        result = $("relationship").filter(function (el) {
            var tab = el.prop(propertyKey, true);

            if (Array.isArray(tab)) {
                return tab.includes(pvalue);
            } else {
                return (stringidentique(tab, pvalue));
            }
        });

        if (result) {
            //console.log("dans reponse");
            //console.log(">>Rechercheby  " + pvalue + " Relation Samid");
            rep = result[0];
            if (rep) return rep;
        }
    }

    //console.log("Pas trouvé");
    return undefined;
}

/**
 * Recherche un element par une propriete.
 * @param {*} propertyKey nom de la propiete recherche.
 * @param {*} pvalue valeur de la recherche. 
 * @returns un Aobjet.
 */
function rechercheEltByProps(nomprop, pvalue) {


    // recherche si le composant existe
    if (pvalue == null) return undefined;

    var propertyKey = nomprop || "samid";

    //console.log("Recherche sur la propriété " + propertyKey);

    //regarde si c'est un Element
    var result = $("element").filter(function (el) {
        var tab = el.prop(propertyKey, true);

        if (Array.isArray(tab)) {
            return tab.includes(pvalue);
        } else {
            return tab == pvalue;
        }
    });

    //console.log("Result", result);

    if (result) {
        //console.log("dans reponse");
        //console.log(">>Rechercheby  " + pvalue + " Element Samid");
        rep = result[0];
        if (rep) return rep;
    }

    return undefined;
}

/**
 * recherche un element par ID.
 * @param {*} pvalue id de l'element.
 * @returns un aelement.
 */
function getEltById(pvalue) {
    // recherche si le composant existe
    if (pvalue == null) return undefined;

    var theConcept = $("#" + pvalue).first();
    return theConcept;
}

/**
 * recherche une relation par ID.
 * @param {*} pvalue id de la relation.
 * @returns une arelation.
 */
function getRelationById(pvalue) {
    // recherche si le composant existe
    if (pvalue == null) return undefined;

    var theConcept = $("#" + pvalue).first();
    return theConcept;
}

/**
 * Recherche un element par samid.
 * @param {*} pvalue un samid.
 * @returns Retourne le premier element ayant un samid., sinon undefined.
 */
function getEltBySamid(pvalue) {
    console.log(">>Recherche by samid " + pvalue);
    var propertyKey = "samid";

    if (pvalue == null) return undefined;

    result = $("element").filter(function (el) {
        var tab = el.prop(propertyKey, true);

        if (Array.isArray(tab)) {
            return tab.includes(pvalue);
        } else {
            return tab == pvalue;
        }
        //return el.prop(propertyKey) == pvalue;
    }); // result is a collection

    if (result) {
        //console.log("ELT " + result[0]);
        rep = result[0];
        if (rep) return rep;
        return undefined;
    } else {
        return undefined;
    }
}

/**
 * Recherche une relation par samid.
 * @param {*} pvalue un samid..
 * @returns Retourne la premiere relation ayant un samid., sinon undefined.
 */
function getRelationBySamid(pvalue) {
    var propertyKey = "samid";

    if (pvalue == null) return undefined;

    result = $("relationship").filter(function (el) {
        var tab = el.prop(propertyKey, true);

        if (Array.isArray(tab)) {
            return tab.includes(pvalue);
        } else {
            return tab == pvalue;
        }
    }); // result is a collection

    if (result) {
        //console.log(result[0]);
        return result[0];
    } else {
        return undefined;
    }
}

/**
 * Recherche un objet pas nom.
 * @param {*} pvalue un nom.
 * @returns Retourne le premier objet ayant ce nom.
 */
function getByName(pvalue) {
    var theConcept = $("." + pvalue).first();
    return theConcept;
}



/**
 * Recherche dans un objet json les propriétés de `props` qui contiennent le nom spécifié.
 *
 * @param {Object} elt - L'objet json dans lequel rechercher.
 * @param {string} nomprop - Le nom de la propriété à rechercher dans chaque objet de `props`.
 * @returns {Array<Object>} - Un tableau d'objets dans `props` qui contiennent la clé `nomprop`.
 */
function rechercheClefs(elt, nomprop) {
    const resultats = [];
    
    // Vérifier si l'objet a une propriété "props" qui est un tableau
    if (Array.isArray(elt.props)) {
      elt.props.forEach(prop => {
        // Vérifier si l'objet dans props contient la clé nomprop
        if (prop.hasOwnProperty(nomprop)) {
          resultats.push(prop[nomprop]);
        }
      });
    } //else {
    //    console.log("Pas de tableau");
    //}
    
    return resultats;
  }

/**
 * Recherche un element par id ou par propriété.
 * @param {*} elt une structure json element
 * @param {*} nomprop le nom d'une propriété
 * @returns l'element ou null.
 */
function rechercheElement(elt, nomprop = "samid") {
    //console.log("nouvelle fonction rechercheElement");
    // recherche par l'id
    //console.log("recherche par l'id " + elt.id) ;
    if (elt.id) {
        var composant = rechercheBy(elt.id, nomprop);
        if (composant) {
            return composant;
        }
    }
    // recherche par une ou des properties.
    // lecture du tableau properties nomprop
    //console.log("lecture du tableau properties nomprop");
    var tab = rechercheClefs(elt,nomprop);
    //printObject(tab);

    for (const cle of tab) {
        //console.log("recherche par la clé " + cle) ;
        var composant = rechercheBy(cle, nomprop);
        if (composant) {
            return composant;
        }
    }


    // j'ai rien trouvé
    //console.log("j'ai pas trouvé");
    return null;
}

/**
 * Recherche une relation par id ou par propriété.
 * @param {*} rel une structure json de la relation
 * @param {*} nomprop le nom d'une propriété
 * @returns l'element ou null.
 */
function rechercheRelation(rel, nomprop = "samid") {
    console.log("nouvelle fonction rechercheRelation");
    // recherche par l'id
    if (rel.id) {
        var composant = rechercheBy(rel.id, nomprop);
        if (composant) {
            return composant;
        }
    }
    // recherche par une ou des properties.
    // lecture du tableau properties nomprop
    var tab = rechercheClefs(rel,nomprop);
    //console.log(tab);

    for (const cle of tab) {
        var composant = rechercheBy(cle, nomprop);
        if (composant) {
            return composant;
        }
    }


    // j'ai rien trouvé
    console.log("j'ai pas trouvé");
    return null;
}




/**
 * Verifie que deux elements ont le meme type.
 * @param {*} objectsrc Le premier élement
 * @param {*} objectdst Le deuxieme élement
 * @returns true or  false;
 */

function avoirMemeType(objectsrc, objectdst) {
    var typesrc = objectsrc.type;
    var typedst = objectdst.type;

    return typesrc === typedst;
}


/**
 * Verifie que tous les composants d'un tableau sont identiques (de meme type)
 * @param {*} tab Un tableau d'élement
 * @returns true or  false;
 */
function tousMemeType(tab) {
    var prem = null;
    for (const dst of tab) {
        if (prem == null) {
            prem = dst;
        } else {
            var rep = avoirMemeType(prem, dst);
            if (rep == false) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Lit le contenu de la propriété d'un élément.
 * @param elt Un élément
 * @param propertyKey Le nom de la propriété
 * @returns Un tableau contenant les valeurs de la propriété.
 */
function lectureProperty(elt, propertyKey) {
    if (propertyKey == null) return undefined;

    var tab = elt.prop(propertyKey, true);

    if (Array.isArray(tab)) {
        console.log("Je suis un tableau " + tab.length);
        console.log("tab " + propertyKey + " :", tab);
        return tab;
        //return tab.includes(pvalue);
    } else if (tab) {
        console.log("je suis un objet");
        console.log("tab " + propertyKey + " :", tab);
        return tab;
    } else {
        console.log("je suis null");
        console.log("tab " + propertyKey + " :", tab);
        return tab;
    }
}

/**
 * Liste les vues liées a un composant.
 * @param {*} e Un composant ( element ou componantview)
 * @returns Une liste de vue.
 */
function foundInViews(e) {
    var tabview = [];
    if (typeof e.concept !== "undefined") {
        if ($(e.concept).objectRefs().isEmpty()) {
            //console.setTextColor(255, 0, 0);
            //console.log(e.type + " [" + e.name + "] is not used in a view");
            //console.setDefaultTextColor();
            return tabview;
        }

        $(e.concept)
            .objectRefs()
            .each(function (or) {
                //      console.log(
                //          e.type +
                //              " [" +
                //              e.name +
                //              "] is used in view: " +
                //              ": " +
                //              or.view.name
                //      );
                tabview.push(or.view.name);
            });
        return tabview;
    } else {
        //console.setTextColor(128, 128, 128);
        //console.log(e.type + " [" + e.name + "] is not an Archimate concept");
        //console.setDefaultTextColor();
        return tabview;
    }
}

/**
 * Recherche une collection de Visual Connections à partir de l'id d'une relation.
 * @param idrelation Id de la relation.
 * @returns Une collection de connexion view.
 */
function getTabVisualConnectionsBy(idrelation) {
    //console.log(">>getTabVisualConnectionsBy  " + idrelation);

    var result = $("#" + idrelation).objectRefs();

    return result;

}


/** Comparer deux chaine de caractere.
 * 
 */
function stringidentique(str1, str2) {

    if (str1 == null) return false;
    if (str2 == null) return false;

    if (str1.localeCompare(str2) == 0) {
        return true;
    }
    else {
        return false
    }
}



/**
 * Recherche le type d'un objet
 * @param {*} object 
 * @returns 
 */
function getType(object) {
    // If the object has an ArchiMate concept and is in a View then it's a visual object/connection
    if (object.concept && object.view) {
        return object.concept.type.includes("relationship")
            ? "view-connection"
            : "view-object";
    }

    // Else return the concept type if it is has a concept, or the object type
    return object.concept ? object.concept.type : object.type;
}

/**
 * Imprime le ctype d'un objet.
 * @param {*} object un objet.
 */
function printCtype(object) {
    var ctype = getType(object);
    console.log("Ctype =" + ctype);
}

/**
 * compare le type d'un objet.
 * @param {*} element L'élement
 * @param {*} type Le type
 * @returns true or  false;
 */

function etredutype(element, type) {
    var typesrc = element.type;
    return typesrc === type;
}

/**
 * Recherche une collection de View à partir de l'id d'une relation.
 * @param idrelation Id de la relation.
 * @returns Une collection de View.
 */
function getTabViewBy(idrelation) {
    //console.log(">>getTabViewBy  " + idrelation);

    var result = $("#" + idrelation).viewRefs();

    return result;
}

/**
 * Recherche une liste d'objet par samid.
 * @param {*} pvalue le samId de la recherche. 
 * @returns un array.
 */
function rechercheTabRelationBySamid(pvalue) {

    // test les param en entree
    if (pvalue == null) return undefined;

    //console.log("Par samid");
    var propertyKey = "samid";

    //console.log("Recherche un tableau relation sur le samid");
    // regarde si c'est une relation
    result = $("relationship").filter(function (el) {
        var tab = el.prop(propertyKey, true);

        if (Array.isArray(tab)) {
            return tab.includes(pvalue);
        } else {
            return tab == pvalue;
        }
    });

    return result;

}

/** Je teste si une relation existe.
 * Le samid n'est plus un descriminant .. je peux avoir plusieurs objets pour un samid.
 * 
 * soit je prends tous les objets lié a un samid
 * Pour chaque objet je verifie la source, la dest et le type
 * si pas d'objet alors création
 * 
 * 
 * Soit je liste toutes les sorties d'un objet source
 * je regarde si j'ai un objet dest
 * Je regarde si c'est le meme type
 * Je regarde si c'est le meme samid
 * 
 * apres reflexion .. j'ai moins de relation avec le meme samid
 * Je verifie la source et la dest et le type.
 * 
*/
function testerExistenceRelation(model, element) {

    var existence = false;

    var tabrelationfound = rechercheTabRelationBySamid(element.id);

    if (tabrelationfound) {
        console.log("Taille de l'objet TabRelationBySamid =" + tabrelationfound.length);

        // recherche des informations sur 
        var source = rechercheBy(element.source);
        var target = rechercheBy(element.target);
        var type = element.type;
        var thename = element.name;

        console.log("Source :" + source.name + " -> Destination :" + target.name);
       

        for (const obj of tabrelationfound) {

            existence = false;

            var localsrcid = obj.source.id;
            if( !stringidentique(localsrcid, source.id))
            {
                break;
            }

            var localtarid = obj.target.id;
            if( !stringidentique(localtarid, target.id))
            {
                break;
            }
           
            console.log("OBJ Source :" + obj.source.name + " --> OBJ Destination :" + obj.target.name);
            
            if( !stringidentique(type, obj.type))
            {
                break;
            }
            

            if( stringidentique(thename, obj.name))
            {
                existence = true;
            }
            
        }

        return existence;
    } else {
        console.log("Pas de relation");
        return false;
    }

}

/*  Mes fonctions */
function findIdBySamid(tab, samid) {
    for (var i = 0; i < tab.length; i++) {
        if (tab[i].samid === samid) {
            return tab[i].id;
        }
    }
    return samid; // Retourne null si le samid n'est pas trouvé
}
