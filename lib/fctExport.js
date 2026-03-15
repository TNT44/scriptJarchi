/*
 * fonction d'export
 *
 * (c) 2023 Duarte TERENCIO
 *
 * Version 0.9.6
 * Complete export junction
 * Correction sur export figure type
 * 
 * Version 0.9.7
 * Renommage de qquelque elt
 * 
 * Version 0.9.8
 * ajout de linestyle dans diagram-model-note
 *
 */

/*  Mes fonctions */

function exportByCtype(element) {
    var ctype = getType(element);

    var ctype2 = ctype;

    if (element.concept.type.includes("relationship")) {
        ctype2 = "relation";
    } else {
        ctype2 = "composant";
    }

    switch (ctype2) {
        case "view-object":
            return exportViewobject(element);

        case "view-connection":
            return exportViewConnection(element);

        case "relation":
            return exportRelation(element);

        case "composant":
            return exportElement(element);

        default:
            return exportdefault(element);
    }
}

function exportdefault(element) {
    var theConcept = element.concept;
    try {
        var theObject = new Object();
        theObject.ctype = "autre";
        theObject["name"] = theConcept.name;
        theObject["documentation"] = theConcept.documentation;
        theObject["id"] = theConcept.id;
        theObject["type"] = theConcept.type;
        theObject["specialization"] = theConcept.specialization;
        theObject["model"] = theConcept.model;
        // parcours les properties
        var theProperties = theConcept.prop();

        if (theProperties.length > 0) {
            var tab = lectureProperties(theConcept, theProperties);
            theObject["props"] = tab;
        }
    } catch (error) {
        console.log("> Ignoring default: " + element);
        console.log("id Element =" + element.id);
        return undefined;
    }

    return theObject;
}

function exportObject(element) {
    var theConcept = element.concept;
    try {
        var theObject = new Object();
        theObject.ctype = "objet";
        //theObject["name"] = theConcept.name;
        theObject["documentation"] = theConcept.documentation;
        theObject["id"] = theConcept.id;
        theObject["type"] = theConcept.type;
        theObject["specialization"] = theConcept.specialization;
        theObject["model"] = theConcept.model;
        // parcours les properties
        var theProperties = theConcept.prop();

        if (theProperties.length > 0) {
            var tab = lectureProperties(theConcept, theProperties);
            theObject["props"] = tab;
        }
    } catch (error) {
        console.log("> Ignoring Object: " + element);
   
        var str = JSON.stringify(element, null, 2); // spacing level = 2
        console.log(str);
        return undefined;
    }

    return theObject;
}

function exportFolder(element) {
    //var theConcept = element.concept;
    try {
        var theObject = new Object();
        theObject.ctype = "folder";
        theObject["name"] = element.name;
        theObject["documentation"] = element.documentation;
        theObject["id"] = element.id;
        theObject["type"] = element.type;

        // parcours les properties
        var theProperties = element.prop();
        if (theProperties.length > 0) {
            var tab = lectureProperties(element, theProperties);
            theObject["props"] = tab;
        }

    } catch (error) {
        console.log("> Ignoring folder: " + element);
        return undefined;
    }

    return theObject;
}

function exportElement(element) {
    var theConcept = element.concept;
    try {
        var theObject = new Object();
        theObject.ctype = getType(element);
        theObject["name"] = theConcept.name;
        theObject["documentation"] = theConcept.documentation;
        theObject["id"] = theConcept.id;
        theObject["type"] = theConcept.type;
        theObject["specialization"] = theConcept.specialization;
        theObject["model"] = theConcept.model;

        // parcours les properties
        var theProperties = theConcept.prop();

        if (theProperties.length > 0) {
            var tab = lectureProperties(theConcept, theProperties);
            theObject["props"] = tab;
        }

        if ("junction".localeCompare(theObject.type) == 0) {
            //console.log("je suis une Junction ");
            theObject["junctiontype"] = theConcept.getJunctionType();
        }

        //debug ? console.log("> theObject") : true;
        //debug ? console.log(theObject) : true;
    } catch (error) {
        console.log("> Ignoring Element: " + element);

        var str = JSON.stringify(element, null, 2); // spacing level = 2
        console.log(str);
        return undefined;
    }

    return theObject;
}

function exportRelation(elementcomplexe) {
    try {
        var relation = elementcomplexe.concept;
        var theRelationshipRow = new Object();
        theRelationshipRow.ctype = getType(relation);
        theRelationshipRow["id"] = relation.id;
        theRelationshipRow["source"] = relation.source.id;
        theRelationshipRow["type"] = relation.type;
        theRelationshipRow["specialization"] = relation.specialization;
        theRelationshipRow["target"] = relation.target.id;
        theRelationshipRow["name"] = relation.name;
        theRelationshipRow["documentation"] = relation.documentation;
        theRelationshipRow["accessType"] = relation.accessType;
        theRelationshipRow["associationDirected"] = relation.associationDirected;
        theRelationshipRow["influenceStrength"] = relation.influenceStrength;

        // parcours les properties
        var theProperties = relation.prop();

        if (theProperties.length > 0) {
            var tab = lectureProperties(relation, theProperties);
            theRelationshipRow["props"] = tab;

        }
        //printObject(theRelationshipRow);
    } catch (error) {
        console.log("> Ignoring relation: " + relation);
        console.log("id Relation =" + relation.id);
        return undefined;
    }

    return theRelationshipRow;
}

function lectureProperties(objectsrc, theProperties) {
    var tab = [];

    for (var i = 0; i < theProperties.length; i++) {
        var prop = {};

        var result = objectsrc.prop(theProperties[i], true);

        if (result.length > 1) {
            prop[theProperties[i]] = result;
        } else {
            prop[theProperties[i]] = result[0];
        }

        tab.push(prop);
    }

    return tab;
}

function exportView(element) {
    //console.log("Export view");
    var theviewobj = element;
    try {
        var theObject = new Object();
        theObject["name"] = theviewobj.name;
        theObject["documentation"] = theviewobj.documentation;
        theObject["id"] = theviewobj.id;
        theObject["type"] = theviewobj.type;
        theObject["specialization"] = theviewobj.specialization;
        theObject["viewpoint"] = theviewobj.viewpoint;

        // parcours les properties
        var theProperties = theviewobj.prop();

        if (theProperties.length > 0) {
            var tab = lectureProperties(theviewobj, theProperties);
            theObject["props"] = tab;
        }

        return theObject;
        //}
    } catch (error) {
        console.log("> Ignoring View: " + element);
        console.log(error);
    }
}

function exportViewobject(element) {
    //console.log("exportViewObject");
    var theviewobj = element;
    var theObject = new Object();
    try {
        theObject.ctype = getType(element);
        theObject["name"] = theviewobj.name;
        theObject["documentation"] = theviewobj.documentation;
        theObject["id"] = theviewobj.id;
        theObject["type"] = theviewobj.type;
        theObject["specialization"] = theviewobj.specialization;

        var parent = $(element).parent();
        if (parent) {
            //console.log("* parent");
            //console.log(parent[0].name);
            //console.log(parent[0].id);
            theObject["parentElement"] = parent[0].id;
        }

        var bounds = theviewobj.bounds;
        

        //calculate the absolute xy coordinates of nested elements.
        var x = bounds.x;
        var y = bounds.y;
        $(element)
            .parents()
            .not("folder")
            .not("archimate-diagram-model")
            .each(function (mum) {
                x = x + mum.bounds.x;
                y = y + mum.bounds.y;
            });

        var bound = {
            x: x,
            y: y,
            width: bounds.width,
            height: bounds.height,
        };
        theObject["bounds"] = bound;

        theObject["borderType"] = theviewobj["borderType"];
        //theObject["concept"] = theviewobj["concept"];
        if (theviewobj["concept"]) {
            theObject["concept"] = theviewobj.concept.id;
        }
        theObject["figureType"] = theviewobj["figureType"];
        theObject["fillColor"] = theviewobj["fillColor"];
        theObject["fontColor"] = theviewobj["fontColor"];
        theObject["fontName"] = theviewobj["fontName"];
        theObject["fontSize "] = theviewobj["fontSize"];
        theObject["fontStyle"] = theviewobj["fontStyle"];
        theObject["image"] = theviewobj["image"];
        theObject["imageSource"] = theviewobj["imageSource"];
        theObject["imagePosition"] = theviewobj["imagePosition"];
        theObject["gradient"] = theviewobj["gradient"];
        theObject["labelExpression"] = theviewobj["labelExpression"];
        theObject["labelValue"] = theviewobj["labelValue"];
        theObject["lineColor"] = theviewobj["lineColor"];
        theObject["opacity"] = theviewobj["opacity"];
        theObject["outlineOpacity"] = theviewobj["outlineOpacity"];
        theObject["refView"] = theviewobj["refView"];
        theObject["showIcon"] = theviewobj["showIcon"];
        theObject["specialization"] = theviewobj["specialization"];
        theObject["text"] = theviewobj["text"];
        theObject["textAlignment"] = theviewobj["textAlignment"];
        theObject["textPosition"] = theviewobj["textPosition"];
        //theObject["view"] = theviewobj["view"];


    } catch (error) {
        console.log("> Ignoring view Object: " + element);
    }
    return theObject;
}

function exportViewConnection(relationcnx) {
    var theRelationshipRow = new Object();

    var id = relationcnx.id;
    var conceptid = concept(relationcnx).id;

    //console.log("id        =" + id);
    //console.log("conceptid =" + conceptid);
    if (id === conceptid) {
        console.log("Je ne suis pas une Visual Connexion, je suis probablement relation");
        theRelationshipRow.msg = "Je ne suis pas une Visual Connexion";
    } else {

        try {
            theRelationshipRow.ctype = getType(relationcnx);
            theRelationshipRow["id"] = relationcnx.id;
            //theRelationshipRow["From Name"] = relationcnx.source.name;
            //theRelationshipRow["From Type"] = relationcnx.source.type;
            theRelationshipRow["type"] = relationcnx.type;
            theRelationshipRow["specialization"] = relationcnx.specialization;
            //theRelationshipRow["To Name"] = relationcnx.target.name;
            //theRelationshipRow["To Type"] = relationcnx.target.type;
            theRelationshipRow["name"] = relationcnx.name;
            theRelationshipRow["documentation"] = relationcnx.documentation;

            // bending of relations.
            var tabb = [];
            var obj;

            var bendpoints = relationcnx.getRelativeBendpoints();
            //console.log("Taille = " + bendpoints.length);
            for (var k = 0; k < bendpoints.length; k++) {
                obj = bendpoints[k];

                var bp = {
                    startX: obj.startX,
                    startY: obj.startY,
                    endX: obj.endX,
                    endY: obj.endY,
                };
                //console.log(bp);
                tabb.push(bp);
            }
            theRelationshipRow["relativeBendpoints"] = tabb;

            theRelationshipRow["borderType"] = relationcnx["borderType"];
            //theRelationshipRow["concept"] = relationcnx["concept"];
            theRelationshipRow["concept"] = relationcnx.concept.id;
            //theRelationshipRow["figureType"] = relationcnx[""];
            theRelationshipRow["fillColor"] = relationcnx["fillColor"];
            theRelationshipRow["fontColor"] = relationcnx["fontColor"];
            theRelationshipRow["fontName"] = relationcnx["fontName"];
            theRelationshipRow["fontSize "] = relationcnx["fontSize"];
            theRelationshipRow["fontStyle"] = relationcnx["fontStyle"];
            theRelationshipRow["image"] = relationcnx["image"];
            theRelationshipRow["imageSource"] = relationcnx["imageSource"];
            theRelationshipRow["imagePosition"] = relationcnx["imagePosition"];
            theRelationshipRow["gradient"] = relationcnx["gradient"];
            theRelationshipRow["labelExpression"] = relationcnx["labelExpression"];
            theRelationshipRow["labelValue"] = relationcnx["labelValue"];
            theRelationshipRow["lineColor"] = relationcnx["lineColor"];
            theRelationshipRow["opacity"] = relationcnx["opacity"];
            theRelationshipRow["outlineOpacity"] = relationcnx["outlineOpacity"];
            theRelationshipRow["refView"] = relationcnx["refView"];
            theRelationshipRow["showIcon"] = relationcnx["showIcon"];
            theRelationshipRow["specialization"] = relationcnx["specialization"];
            theRelationshipRow["text"] = relationcnx["text"];
            //theRelationshipRow["textAlignment"] = relationcnx["textAlignment"];
            theRelationshipRow["textPosition"] = relationcnx["textPosition"];
            //theRelationshipRow["view"] = relationcnx["view"];

            theRelationshipRow["labelVisible"] = relationcnx["labelVisible"];
            theRelationshipRow["lineWidth"] = relationcnx["lineWidth"];
            //theRelationshipRow["relativeBendpoints"] = [];
            theRelationshipRow["source"] = relationcnx["source"].id;
            theRelationshipRow["specialization"] = relationcnx["specialization"];
            theRelationshipRow["style"] = relationcnx["style"];
            theRelationshipRow["target"] = relationcnx["target"].id;
            theRelationshipRow["textAlignment"] = relationcnx["textalignment"];
            theRelationshipRow["textPosition"] = relationcnx["textProsition"];

            //theRelationshipData.push(theRelationshipRow);
        } catch (error) {
            console.log("> Ignoring Connection view : " + relationcnx);
        }
    }
    return theRelationshipRow;
}

function exportModelNote(element) {
    var theConcept = element.concept;
    try {
        if (theConcept) {
            console.log("Trouve un concept");
            console.log(theConcept.id);
        }

        var theObject = new Object();
        theObject.ctype = "diagram-model-note";
        theObject["name"] = element.name;
        //theObject["content"] = element.content;
        theObject["text"] = element.text;
        //theObject["content"] = element.getContent();
        theObject["documentation"] = element.documentation;
        theObject["id"] = element.id;
        theObject["type"] = element.type;
        //theObject["specialization"] = theConcept.specialization;
        theObject["model"] = element.model;
        // parcours les properties
        var theProperties = element.prop();

        if (theProperties.length > 0) {
            var tab = lectureProperties(element, theProperties);
            theObject["props"] = tab;
        }

        var bounds = element.bounds;

        //calculate the absolute xy coordinates of nested elements.
        var x = bounds.x;
        var y = bounds.y;
        $(element)
            .parents()
            .not("folder")
            .not("archimate-diagram-model")
            .each(function (mum) {
                x = x + mum.bounds.x;
                y = y + mum.bounds.y;
            });

        var bound = {
            x: x,
            y: y,
            width: bounds.width,
            height: bounds.height,
        };
        theObject["bounds"] = bound;

        theObject["fillColor"] = element["fillColor"];
        theObject["font"] = element["font"];
        theObject["fontColor"] = element["fontColor"];
        theObject["Alpha"] = element["Alpha"];
        theObject["lineAlpha"] = element["lineAlpha"];
        theObject["gradient"] = element["gradient"];

        theObject["iconVisible"] = element["iconVisible"];
        theObject["iconColor"] = element["iconColor"];
        theObject["textAlignment"] = element["textAlignment"];
        theObject["lineWidth"] = element["lineWidth"];
        theObject["textPosition"] = element["textPosition"];
        theObject["lineStyle"] = element["lineStyle"];
        //theObject["lineColor"] = element["lineColor"];

        theObject["fontSize"] = element["fontSize"];
        theObject["fontStyle"] = element["fontStyle"];
       

        return theObject;
    } catch (error) {
        console.log("> Ignoring exportModelNote: " + element);
        console.log("id Element =" + element.id);
        console.log("Ctype =" + getType(element));
        console.log("type =" + element.type);
        var str = JSON.stringify(element, null, 2); // spacing level = 2
        console.log(str);

        var str2 = JSON.stringify(theObject, null, 2); // spacing level = 2
        console.log(str2);

        return undefined;
    }
}

function exportModelGroup(element) {
    var theConcept = element.concept;
    try {
        if (theConcept) {
            console.log("Trouve un concept");
            console.log(theConcept.id);
        }

        var theObject = new Object();
        theObject.ctype = "diagram-model-group";
        theObject["name"] = element.name;
        //theObject["content"] = element.content;
        //theObject["text"] = element.text;
        //theObject["content"] = element.getContent();
        theObject["documentation"] = element.documentation;
        theObject["id"] = element.id;
        theObject["type"] = element.type;
        //theObject["specialization"] = theConcept.specialization;
        theObject["model"] = element.model;
        // parcours les properties
        var theProperties = element.prop();

        if (theProperties.length > 0) {
            var tab = lectureProperties(element, theProperties);
            theObject["props"] = tab;
        }

        var bounds = element.bounds;

        //calculate the absolute xy coordinates of nested elements.
        var x = bounds.x;
        var y = bounds.y;
        $(element)
            .parents()
            .not("folder")
            .not("archimate-diagram-model")
            .each(function (mum) {
                x = x + mum.bounds.x;
                y = y + mum.bounds.y;
            });

        var bound = {
            x: x,
            y: y,
            width: bounds.width,
            height: bounds.height,
        };
        theObject["bounds"] = bound;

        theObject["fillColor"] = element["fillColor"];
        theObject["font"] = element["font"];
        theObject["fontColor"] = element["fontColor"];
        theObject["Alpha"] = element["Alpha"];
        theObject["lineAlpha"] = element["lineAlpha"];
        theObject["gradient"] = element["gradient"];

        theObject["iconVisible"] = element["iconVisible"];
        theObject["iconColor"] = element["iconColor"];
        theObject["textAlignment"] = element["textAlignment"];
        theObject["lineWidth"] = element["lineWidth"];
        //theObject["lineColor"] = element["lineColor"];
    } catch (error) {
        console.log("> Ignoring exportModelGroup: " + element);
        console.log("id Element =" + element.id);
        console.log("Ctype =" + getType(element));
        console.log("type =" + element.type);
        var str = JSON.stringify(element, null, 2); // spacing level = 2
        console.log(str);

        var str2 = JSON.stringify(theObject, null, 2); // spacing level = 2
        console.log(str2);

        return undefined;
    }

    return theObject;
}

function exportModelConnection(modelcnx) {
    var modelconnection = new Object();
    try {
        modelconnection.ctype = getType(modelcnx);
        modelconnection["id"] = modelcnx.id;
        //modelconnection["From Name"] = modelcnx.source.name;
        //modelconnection["From Type"] = modelcnx.source.type;
        modelconnection["type"] = modelcnx.type;
        //modelconnection["specialization"] = modelcnx.specialization;
        //modelconnection["To Name"] = modelcnx.target.name;
        //modelconnection["To Type"] = modelcnx.target.type;
        //modelconnection["name"] = modelcnx.name;
        modelconnection["documentation"] = modelcnx.documentation;

        // bending of relations.
        var tabb = [];
        var obj;

        var bendpoints = modelcnx.getRelativeBendpoints();
        //console.log("Taille = " + bendpoints.length);
        for (var k = 0; k < bendpoints.length; k++) {
            obj = bendpoints[k];

            var bp = {
                startX: obj.startX,
                startY: obj.startY,
                endX: obj.endX,
                endY: obj.endY,
            };
            //console.log(bp);
            tabb.push(bp);
        }
        modelconnection["relativeBendpoints"] = tabb;

  
        //modelconnection["borderType"] = modelcnx["borderType"];
        //modelconnection["concept"] = modelcnx["concept"];
        //modelconnection["concept"] = modelcnx.concept.id;
        //modelconnection["figureType"] = modelcnx[""];
        //modelconnection["fillColor"] = modelcnx["fillColor"];
        modelconnection["font"] = modelcnx["font"];
        modelconnection["fontColor"] = modelcnx["fontColor"];
        //modelconnection["fontName"] = modelcnx["fontName"];
        //modelconnection["fontSize "] = modelcnx["fontSize"];
        //modelconnection["fontStyle"] = modelcnx["fontStyle"];
        //modelconnection["image"] = modelcnx["image"];
        //modelconnection["imageSource"] = modelcnx["imageSource"];
        //modelconnection["imagePosition"] = modelcnx["imagePosition"];
        //modelconnection["gradient"] = modelcnx["gradient"];
        //modelconnection["labelExpression"] = modelcnx["labelExpression"];
        //modelconnection["labelValue"] = modelcnx["labelValue"];
        modelconnection["lineColor"] = modelcnx["lineColor"];
        //modelconnection["opacity"] = modelcnx["opacity"];
        //modelconnection["outlineOpacity"] = modelcnx["outlineOpacity"];
        //modelconnection["refView"] = modelcnx["refView"];
        //modelconnection["showIcon"] = modelcnx["showIcon"];
        //modelconnection["specialization"] = modelcnx["specialization"];
        modelconnection["text"] = modelcnx["text"];
        //modelconnection["textAlignment"] = modelcnx["textAlignment"];
        modelconnection["textPosition"] = modelcnx["textPosition"];
        //modelconnection["view"] = modelcnx["view"];

        //modelconnection["labelVisible"] = modelcnx["labelVisible"];
        modelconnection["lineWidth"] = modelcnx["lineWidth"];
        //modelconnection["relativeBendpoints"] = [];
        //modelconnection["source"] = modelcnx["source"].id;
        modelconnection["source"] = modelcnx.getSource().id;
        //modelconnection["specialization"] = modelcnx["specialization"];
        //modelconnection["style"] = modelcnx["style"];
        //modelconnection["target"] = modelcnx["target"].id;
        modelconnection["target"] = modelcnx.getTarget().id;
        modelconnection["textAlignment"] = modelcnx["textalignment"];
        modelconnection["textPosition"] = modelcnx["textProsition"];

        // parcours les properties
        var theProperties = modelcnx.prop();

        if (theProperties.length > 0) {
            var tab = lectureProperties(modelcnx, theProperties);
            modelconnection["props"] = tab;
        }

        //theRelationshipData.push(modelconnection);
    } catch (error) {
        console.log("> Ignoring exportModelConnection : ");
        console.log(error);
        printObject(modelconnection);
    }
    return modelconnection;
}

function exportModelReference(element) {
    var modelreference = new Object();
    try {
        modelreference.ctype = getType(r);
        //modelreference["id"] = element.id;
        //modelreference["From Name"] = element.source.name;
        //modelreference["From Type"] = element.source.type;
        //modelreference["type"] = element.type;
        //modelreference["specialization"] = element.specialization;
        //modelreference["To Name"] = element.target.name;
        //modelreference["To Type"] = element.target.type;
        //modelreference["name"] = element.name;
        //modelreference["documentation"] = element.documentation;

        // bending of relations.
        /*
        var tabb = [];
        var obj;

        var bendpoints = element.getRelativeBendpoints();
        console.log("Taille = " + bendpoints.length);
        for (var k = 0; k < bendpoints.length; k++) {
            obj = bendpoints[k];

            var bp = {
                startX: obj.startX,
                startY: obj.startY,
                endX: obj.endX,
                endY: obj.endY,
            };
            console.log(bp);
            tabb.push(bp);
        }
        modelreference["relativeBendpoints"] = tabb;
*/

        var bounds = element.bounds;
        var bound = {
            x: bounds.x,
            y: bounds.y,
            width: bounds.width,
            height: bounds.height,
        };
        modelreference["bounds"] = bound;

        //modelreference["borderType"] = element["borderType"];
        //modelreference["concept"] = element["concept"];
        //modelreference["concept"] = element.concept.id;
        //modelreference["figureType"] = element[""];
        modelreference["fillColor"] = element["fillColor"];
        modelreference["font"] = element["font"];
        modelreference["fontColor"] = element["fontColor"];
        //modelreference["fontName"] = element["fontName"];
        //modelreference["fontSize "] = element["fontSize"];
        //modelreference["fontStyle"] = element["fontStyle"];
        //modelreference["image"] = element["image"];
        //modelreference["imageSource"] = element["imageSource"];
        modelreference["imagePosition"] = element["imagePosition"];
        modelreference["imagePath"] = element["imagePath"];
        //modelreference["gradient"] = element["gradient"];
        //modelreference["labelExpression"] = element["labelExpression"];
        //modelreference["labelValue"] = element["labelValue"];
        modelreference["lineColor"] = element["lineColor"];
        //modelreference["opacity"] = element["opacity"];
        //modelreference["outlineOpacity"] = element["outlineOpacity"];
        //modelreference["refView"] = element["refView"];
        //modelreference["showIcon"] = element["showIcon"];
        //modelreference["specialization"] = element["specialization"];
        //modelreference["text"] = element["text"];
        modelreference["textAlignment"] = element["textAlignment"];
        modelreference["textPosition"] = element["textPosition"];
        //modelreference["view"] = element["view"];

        //modelreference["labelVisible"] = element["labelVisible"];
        modelreference["lineWidth"] = element["lineWidth"];
        modelreference["referenceModel"] = element["referenceModel"];
        modelreference["Alpha"] = element["Alpha"];
        //modelreference["relativeBendpoints"] = [];
        //modelreference["source"] = element["source"].id;
        //modelreference["specialization"] = element["specialization"];
        //modelreference["style"] = element["style"];
        //modelreference["target"] = element["target"].id;
        //modelreference["textAlignment"] = element["textalignment"];
        //modelreference["textPosition"] = element["textProsition"];
        /*
        // parcours les properties
        var theProperties = element.prop();

        if (theProperties.length > 0) {
            var tab = lectureProperties(r, theProperties);
            modelreference["props"] = tab;
        }
        */

        //theRelationshipData.push(modelreference);
    } catch (error) {
        console.log("> Ignoring exportModelReference : " + element);
    }
    return modelreference;
}
