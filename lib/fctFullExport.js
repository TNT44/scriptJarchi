/*
 * New Archi Script
 * 16/10/2023
 * Export d'une view vers JSON
 * 
 * Version 0.9.1 
 * 
 * Version 0.9.2
 * ajout exportModelNote
 * ajout exportModelGroupe
 *
 * Version 0.9.3
 * ajout exportModelconnection
 * ajout exportModelreference
 * 
 * Version 0.9.4    - 21/09/2023
 * ajout numero version dans json
 * ajout du parentElement
 * split des fct dans base et Export 
 * 
 * Version 0.9.6   - 28/09/2023
 * nouvelle version json - 0.9.6
 * 
 * Version 0.9.7   - 04/10/2023
 * export des répertoires
 * nouvelle version json - 0.9.7
 * 
 * Version 0.9.8   - 03/09/2025
 * export des parametres au niveau diagram-model-note (correction export)
 * export du repertoire. (correction export)
 * nouvelle version json - 0.9.8
 * 
 */

//var propertiesList = [];

var conceptHashMap = [];
var viewHashMap = [];

var listeCompo = [];

var listeRelation = [];

var listeModelObject = [];

var listeModelRelation = [];

var listeViewObject = [];

var listeconnexionvue = [];

var current_row = 1;

var theData = new Array();
var theRelationshipData = new Array();

function buildTabViewObject(element) {
    var theviewobj = element;
    try {
        if (element.name != "") {
            if (!viewHashMap[theviewobj.id]) {
                viewHashMap[theviewobj.id] = true;

                var theObject = exportViewobject(element);

                listeViewObject.push(theObject);

                current_row++;
            } else {
                console.log("Duplicate Concept: ", theviewobj.name);
            }
        }
    } catch (error) {
        console.log("> Ignoring: " + element);
    }
}

function buildTabConnexionView(r) {
    var theRelationshipRow = exportViewConnection(r);

    listeconnexionvue.push(theRelationshipRow);
}

function buildTabElement(element) {
    try {
        var theConcept = element.concept;
        //if (element.name != "") {
        if (!conceptHashMap[theConcept.id]) {
            conceptHashMap[theConcept.id] = true;

            var theObject = exportElement(element);

            theData.push(theObject);
            listeCompo.push(theObject);

            // Get Relationships
            // ratisse trop large
            // OLD $(theConcept).outRels().each(buildTabRelation);

            current_row++;
        } else {
            console.log("Duplicate Concept: ", theConcept.name);
        }
        //}
    } catch (error) {
        console.log("> Ignoring Element: " + element);
        var str = JSON.stringify(element, null, 2); // spacing level = 2
        console.log(str);
    }
}

function buildTabObject(element) {
    try {
        //var theConcept = element.concept
        var theObject = exportObject(element);

        listeModelObject.push(theObject);
    } catch (error) {
        console.log("> Build Ignoring Object: " + element);
        var str = JSON.stringify(element, null, 2); // spacing level = 2
        console.log(str);
    }
}

function buildTabRelation(r) {
    var theRelationshipRow = exportRelation(r);

    theRelationshipData.push(theRelationshipRow);

    listeRelation.push(theRelationshipRow);
}

function fullExportVue(unevue) {
    console.log("*** Export une vue ***");
    

    console.log("*** Export Element et Relation ***");
    $(unevue).find().not("relationship").each(buildTabElement); 

    // Get Relationships
    $(unevue).find("relationship").each(buildTabRelation);
    

    // Export le repertoire de la vue
    var listeRep = [];
    $(unevue)
        .parents()
        .each(function (dir) {
            listeRep.push(exportFolder(dir));
        });

  

    /** ajout des objets model */
    console.log("*** Export Objet model ***");
   
    $(unevue)
        .find("object")
        .each(function (vo) {
            buildTabObject(vo);
        });

    console.log("*** Export des diagram-model-* ***");

    $(unevue)
        .find("diagram-model-note")
        .each(function (element) {
            try {
                var theObject = exportModelNote(element);

                listeModelObject.push(theObject);
            } catch (error) {
                console.log("> Build Ignoring diagram-model-note: " + element);
                var str = JSON.stringify(element, null, 2); // spacing level = 2
                console.log(str);
            }
        });

    $(unevue)
        .find("diagram-model-group")
        .each(function (element) {
            try {
                var theObject = exportModelGroup(element);

                listeModelObject.push(theObject);
            } catch (error) {
                console.log("> Build Ignoring diagram-model-group: " + element);
                var str = JSON.stringify(element, null, 2); // spacing level = 2
                console.log(str);
            }
        });

    $(unevue)
        .find("diagram-model-connection")
        .each(function (element) {
            try {
                var theObject = exportModelConnection(element);

                listeModelRelation.push(theObject);
            } catch (error) {
                console.log(
                    "> Build Ignoring diagram-model-connection: " + element
                );
                var str = JSON.stringify(element, null, 2); // spacing level = 2
                console.log(str);
            }
        });

    $(unevue)
        .find("diagram-model-reference")
        .each(function (element) {
            try {
                var theObject = exportModelReference(element);

                listeModelObject.push(theObject);
            } catch (error) {
                console.log(
                    "> Build Ignoring diagram-model-reference: " + element
                );
                var str = JSON.stringify(element, null, 2); // spacing level = 2
                console.log(str);
            }
        });

    // add visual elements
    console.log("*** Export Visual objet ***");
    var obj_copy = {};
    $(unevue)
        .find("element")
        .each(function (ve) {
            buildTabViewObject(ve);
        });

    console.log("*** Export Visual relation ***");
    // add visual relationships
    $(unevue)
        .find("relationship")
        .each(function (vr) {
            buildTabConnexionView(vr);
        });


    var expview = exportView(unevue);
    expview.version = "0.9.8";    
    expview.tabComponent = listeCompo;    
    expview.tabRelation = listeRelation;
    expview.tabDirectories = listeRep;    
    expview.tabModelObject = listeModelObject;
    expview.tabModelRelation = listeModelRelation;
    expview.tabVisualObject = listeViewObject;
    expview.tabVisualConnection = listeconnexionvue;

    console.log("*** Statistiques ***");
    console.log("Taille tab element          =" + listeCompo.length);
    console.log("Taille tab relation         =" + listeRelation.length);
    console.log("Taille tab ModelObject      =" + listeModelObject.length);
    console.log("Taille tab ModelRelation    =" + listeModelRelation.length);
    console.log("Taille tab VisualObject     =" + listeViewObject.length);
    console.log("Taille tab VisualConnection =" + listeconnexionvue.length);

    return expview;
}

function fullExportDesModeles(unevue) {
    console.log("*** Export les objets Model d'une vue***");
    var expview = exportView(unevue);
    expview.version = "0.9.8";

    /** ajout des objets model */
    console.log("*** Export Objet ***");
   
    $(unevue)
        .find("object")
        .each(function (vo) {
            buildTabObject(vo);
        });

    console.log("*** Export des diagram-model-* ***");

    $(unevue)
        .find("diagram-model-note")
        .each(function (element) {
            try {
                //var theConcept = element.concept
                var theObject = exportModelNote(element);

                listeModelObject.push(theObject);
            } catch (error) {
                console.log("> Build Ignoring diagram-model-note: " + element);
                var str = JSON.stringify(element, null, 2); // spacing level = 2
                console.log(str);
            }
        });

    $(unevue)
        .find("diagram-model-group")
        .each(function (element) {
            try {
                //var theConcept = element.concept
                var theObject = exportModelGroup(element);

                listeModelObject.push(theObject);
            } catch (error) {
                console.log("> Build Ignoring diagram-model-group: " + element);
                var str = JSON.stringify(element, null, 2); // spacing level = 2
                console.log(str);
            }
        });

    $(unevue)
        .find("diagram-model-connection")
        .each(function (element) {
            try {
                //var theConcept = element.concept
                var theObject = exportModelConnection(element);

                listeModelRelation.push(theObject);
            } catch (error) {
                console.log(
                    "> Build Ignoring diagram-model-connection: " + element
                );
                var str = JSON.stringify(element, null, 2); // spacing level = 2
                console.log(str);
            }
        });

    $(unevue)
        .find("diagram-model-reference")
        .each(function (element) {
            try {
                //var theConcept = element.concept
                var theObject = exportModelReference(element);

                listeModelObject.push(theObject);
            } catch (error) {
                console.log(
                    "> Build Ignoring diagram-model-reference: " + element
                );
                var str = JSON.stringify(element, null, 2); // spacing level = 2
                console.log(str);
            }
        });

    

    expview.tabModelObject = listeModelObject;
    expview.tabModelRelation = listeModelRelation;

    console.log("*** Statistiques ***");
    console.log("Taille tabModelObject      =" + listeModelObject.length);
    console.log("Taille tabModelRelation    =" + listeModelRelation.length);

    return expview;
}

