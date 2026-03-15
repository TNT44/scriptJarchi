/*
 * fonction de base
 *
 * (c) 2023 Duarte TERENCIO
 *
 * Version 24.11.19
 */


/**
 * Retourne le concept d'un element visuel ou lui meme.
 * @param {*} o Un element visuel ou un element
 * @returns l'element.
 */
function concept(o) {
    if (o.concept)
        return o.concept;
    else
        return o;
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
 * Colorie un objet en rouge.
 * @param {*} aobj un objet
 */
function colorInRed(aobj) {
    aobj.fontColor = "#FF0000";
    aobj.lineColor = "#FF0000";
}

/**
 * Colorie un objet en vert.
 * @param {*} aobj un objet
 */
function colorInGreen(aobj) {
    aobj.fontColor = "#00FF00";
    aobj.lineColor = "#00FF00";
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