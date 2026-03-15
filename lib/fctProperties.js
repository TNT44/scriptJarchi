/*
 * fonction de base
 *
 * (c) 2023 Duarte TERENCIO
 *
 * Version 19.11.2024
 * Contient des fonctions autour de la gestion des propietes des objets.
 */

/*  Mes fonctions */

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
 * Ajoute une propriété dans un élément
 * Dans le cas d'un tableau, ajoute la propriété si elle existe pas
 * @param elt Un element
 * @param propertyKey Le nom de la propriété
 * @param pvalue La valeur de la propriété
 * @returns Un element
 */
function addPropertyIFNE(elt, propertyKey, pvalue) {
    //console.log("AjoutIFNE =" + pvalue);

    // le true .. ajoute une valeur dans le tableau existant
    if (propertyKey == null) return elt;

    if (pvalue == null) return elt;

    var tab = elt.prop(propertyKey, true);

    if (Array.isArray(tab)) {
        // elt.prop(propertyKey, pvalue, true);
        if (tab.includes(pvalue)) {
            // do nothing
        } else {
            elt.prop(propertyKey, pvalue, true);
        }
        //var tab = elt.prop(propertyKey, true);

        // console.log("Je suis un tableau");
        //console.log("tab " + propertyKey + " :", tab);
        return elt;

        //return tab.includes(pvalue);
    } else {
        //console.log("je suis null");
        elt.prop(propertyKey, pvalue);
        //var tab = elt.prop(propertyKey, true);
        //console.log("tab " + propertyKey + " :", tab);
        //return elt;
    }
    return elt;
}

/**
 * Ajoute la propriété externe sur un objet Archi, seulement si elle
 * n'existe pas encore ("If Not Exists").
 *
 * Remplace l'ancienne signature `addPropertyIFNE(archiObj, "samid", element.id)`
 * par une version qui reçoit l'élément complet et lit son id automatiquement,
 * en cohérence avec la nouvelle `rechercheBy(element, cleExterne)`.
 *
 * @param {Object} archiObj         - L'objet Archi cible (composant, relation…).
 * @param {Object} element          - L'élément JSON source.
 * @param {string} [cleExterne="samid"] - Nom de la propriété à créer.
 *
 * @example
 * // Comportement historique (inchangé)
 * addPropertyIFNE(composant, element);
 *
 * @example
 * // Pour LeanIX : stocke element.id dans prop("leanixId")
 * addPropertyIFNE(composant, element, "leanixId");
 */
function addPropertyIFNEN(archiObj, element, cleExterne) {
    cleExterne = cleExterne || "samid";

    if (!element || !element.id) return;

    var existing = archiObj.prop(cleExterne);
    if (!existing) {
        archiObj.prop(cleExterne, element.id, false);
        console.log("addPropertyIFNE : " + cleExterne + " = " + element.id);
    }
}

/**
 * Ajoute une propriété dans un élément
 * @param elt Un element
 * @param propertyKey Le nom de la propriété
 * @param pvalue La valeur de la propriété
 * @returns Un element
 */
function addProperty(elt, propertyKey, pvalue) {
    console.log("Ajout =" + pvalue);
    // equivalent du false;
    // le false .. remplace l'element existant
    if (propertyKey == null) return undefined;

    elt.prop(propertyKey, pvalue);

    var tab = elt.prop(propertyKey, true);

    //object.prop(propName, propValue) // => updated object with property added (if it did not exist) or updated (if it existed)
    //object.prop(propName, propValue, false) // => updated object with property added (if it not existed) or updated (if it existed)
    //object.prop(propName, propValue, true) // => updated object with property added (even if it existed)

    if (Array.isArray(tab)) {
        // elt.prop(propertyKey, pvalue, true);
        console.log("Je suis un tableau");
        console.log("tab " + propertyKey + " :", tab);
        return tab;

        //return tab.includes(pvalue);
    } else {
        console.log("je suis null");
        return tab;
    }
}

function addPropertyT(elt, propertyKey, pvalue) {
    console.log("Ajout true =" + pvalue);

    // le true .. ajoute une valeur dans le tableau existant
    if (propertyKey == null) return undefined;

    elt.prop(propertyKey, pvalue, true);

    var tab = elt.prop(propertyKey, true);

    //object.prop(propName, propValue) // => updated object with property added (if it did not exist) or updated (if it existed)
    //object.prop(propName, propValue, false) // => updated object with property added (if it not existed) or updated (if it existed)
    //object.prop(propName, propValue, true) // => updated object with property added (even if it existed)

    if (Array.isArray(tab)) {
        // elt.prop(propertyKey, pvalue, true);
        console.log("Je suis un tableau");
        console.log("tab " + propertyKey + " :", tab);
        return tab;

        //return tab.includes(pvalue);
    } else {
        console.log("je suis null");
        return tab;
    }
}

function addPropertyf(elt, propertyKey, pvalue) {
    // le false .. remplace l'element existant
    console.log("Ajout false=" + pvalue);

    if (propertyKey == null) return undefined;

    if (pvalue == null) return undefined;

    elt.prop(propertyKey, pvalue, false);

    var tab = elt.prop(propertyKey, true);

    //object.prop(propName, propValue) // => updated object with property added (if it did not exist) or updated (if it existed)
    //object.prop(propName, propValue, false) // => updated object with property added (if it not existed) or updated (if it existed)
    //object.prop(propName, propValue, true) // => updated object with property added (even if it existed)

    if (Array.isArray(tab)) {
        // elt.prop(propertyKey, pvalue, true);
        console.log("Je suis un tableau");
        console.log("tab " + propertyKey + " :", tab);
        return tab;
        //return tab.includes(pvalue);
    } else {
        console.log("je suis null");
        return tab;
    }
}

/**
 * Supprime une propriéte d'un élément ayant une valeur.
 * @param elt Un element
 * @param propertyKey Le nom de la propriété
 * @param pvalue La valeue d'une propriété
 * @returns Un element clean.
 */
function removeProperty(elt, propertyKey, pvalue) {
    console.log("remove =" + pvalue);
    // equivalent du false;
    // le false .. remplace l'element existant
    if (propertyKey == null) return elt;

    if (pvalue == null) return elt;

    elt.removeProp(propertyKey, pvalue);

    var tab = elt.prop(propertyKey, true);

    if (Array.isArray(tab)) {
        // elt.prop(propertyKey, pvalue, true);
        console.log("Je suis un tableau");
        console.log("tab " + propertyKey + " :", tab);
        return elt;

        //return tab.includes(pvalue);
    } else {
        console.log("je suis null");
        return elt;
    }
}

/**
 * Efface toutes les propriétes d'un element ayant tel nom (propertyKey).
 * @param elt un element
 * @param propertyKey Le nom de la propriétes
 * @returns un element sans propriétes.
 */
function removeAllProperties(elt, propertyKey) {
    console.log("Supp toutes les properties =" + propertyKey);
    // equivalent du false;
    // le false .. remplace l'element existant
    if (propertyKey == null) return elt;

    elt.removeProp(propertyKey);
}

/**
 * Lit la valeur correspondante à une clé donnée dans un tableau d'objets.
 * @param {Object[]} tableau - Le tableau d'objets dans lequel chercher la valeur.
 * @param {string} cle - La clé dont on souhaite lire la valeur.
 * @returns {string|null} La valeur correspondant à la clé donnée, ou null si la clé n'est pas trouvée.
 */
function lireValeur(tableau, cle) {
    // Parcourir le tableau pour trouver l'objet contenant la clé spécifiée
    for (const objet of tableau) {
        // Vérifier si l'objet contient la clé spécifiée
        if (objet.hasOwnProperty(cle)) {
            // Retourner la valeur correspondant à la clé spécifiée
            return objet[cle];
        }
    }
    // Si la clé n'est pas trouvée, retourner null ou une valeur par défaut
    return null; // ou retourner une valeur par défaut comme "N/A" par exemple
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

function ecrireProperties(objectdst, element) {
    /*
 "props": [
    {
      "un": "un"
    },
    {
      "deux": "deux"
    }
  ],
    */
    console.log("Ecrire les properties");
    // parcours les properties
    if (element.hasOwnProperty("props")) {
        var theProperties = element.props;
        if (theProperties.length > 0) {
            //console.log("Lecture tab");

            for (var uneligne of theProperties) {
                //console.log("Lecture uneligne");
                //console.log(uneligne);

                for (const property in uneligne) {
                    console.log(`${property}: ${uneligne[property]}`);

                    var propValue = uneligne[property];

                    objectdst.prop(property, propValue, true)


                }
            }
        }
    }
}