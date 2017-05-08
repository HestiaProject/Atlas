		function initGo() {

		    var $ = go.GraphObject.make;
		    myDiagram =
		        $(go.Diagram, "myDiagramDiv", // create a Diagram for the DIV HTML element
		            {
		                initialContentAlignment: go.Spot.Center,
		                "LinkDrawn": maybeChangeLinkCategory, // these two DiagramEvents call a function that is defined below
		                "LinkRelinked": maybeChangeLinkCategory,
		                "undoManager.isEnabled": true,
		                "allowMove": false,
		                layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
		                    {
		                        angle: 90,
		                        layerSpacing: 80
		                    })

		            });

		    // also define a context menu for the diagram's background
		    myDiagram.contextMenu =
		        $(go.Adornment, "Vertical",
		            $("ContextMenuButton",
		                $(go.TextBlock, "Undo"), {
		                    click: function(e, obj) {
		                        e.diagram.commandHandler.undo();
		                    }
		                },
		                new go.Binding("visible", "", function(o) {
		                    return o.diagram.commandHandler.canUndo();
		                }).ofObject()),
		            $("ContextMenuButton",
		                $(go.TextBlock, "Redo"), {
		                    click: function(e, obj) {
		                        e.diagram.commandHandler.redo();
		                    }
		                },
		                new go.Binding("visible", "", function(o) {
		                    return o.diagram.commandHandler.canRedo();
		                }).ofObject()),
		            // no binding, always visible button:
		            $("ContextMenuButton",
		                $(go.TextBlock, "New Feature"), {
		                    click: function(e, obj) {
		                        var f1 = new Feature("new","mandatory");
								m1.addFeature(f1);
								document.getElementById('myModel').value = JSON.stringify(m1);
		                        document.getElementById("mySavedModel").value = parseModelToString(m1);
								load();
		                    }
		                })
		        );

		    // define a function named "addChild" that is invoked by a contextMenu click



		    myDiagram.addDiagramListener("Modified", function(e) {

		        var button = document.getElementById("SaveButton");
		        if (button) button.disabled = !myDiagram.isModified;
		        var idx = document.title.indexOf("*");
		        if (myDiagram.isModified) {
		            if (idx < 0) document.title += "*";
		            save();
		        } else {
		            if (idx >= 0) document.title = document.title.substr(0, idx);

		        }



		    });
		    // the regular node template
		    myDiagram.nodeTemplate =
		        $("Node", "Auto", {
		                locationSpot: go.Spot.Center,
		                layerName: "Background"
		            }, // always have regular nodes behind Links
		            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
		            $("Shape", "Rectangle", {
		                    fill: "white",
		                    stroke: "black",
		                   
		                    minSize: new go.Size(50, 30),
		                    portId: "",
		                    cursor: "pointer"
		                },
		                new go.Binding("fill", "color")),
		            $("TextBlock", {
		                    margin: 8
		                },
		                new go.Binding("text", "key")), {
		                contextMenu: // define a context menu for each node
		                    $(go.Adornment, "Vertical", // that has one button
		                        $("ContextMenuButton",
		                            $(go.TextBlock, "Create Child"), {
		                                click: function(e, obj) {
		                                    var diagram = e.diagram;
		                                    var selnode = diagram.selection.first();
		                                    if (!(selnode instanceof go.Node)) return;
		                                    var f1 = new Feature("N", "mandatory");
		                                    m1.addFeature(f1);
		                                    var parent = m1.findFeature(selnode.data.key);
		                                    var a1 = new Association(parent, f1);
		                                    m1.addAssociation(a1);
		                                    document.getElementById('myModel').value = JSON.stringify(m1);
		                                    document.getElementById("mySavedModel").value = parseModelToString(m1);
		                                    //load();

		                                }
		                            }),
		                        $("ContextMenuButton",
		                            $(go.TextBlock, "Make Mandatory"), {
		                                click: function(e, obj) {
		                                    var diagram = e.diagram;
		                                    var selnode = diagram.selection.first();
		                                    if (!(selnode instanceof go.Node)) return;
		                                    var f1 = m1.findFeature(selnode.data.key);
		                                    f1.setType("mandatory");
		                                    m1.updateFeature(f1);
		                                    document.getElementById('myModel').value = JSON.stringify(m1);
		                                    document.getElementById("mySavedModel").value = parseModelToString(m1);
		                                    load();
		                                }
		                            }),
		                        $("ContextMenuButton",
		                            $(go.TextBlock, "Make Optional"), {
		                                click: function(e, obj) {
		                                    var diagram = e.diagram;
		                                    var selnode = diagram.selection.first();
		                                    if (!(selnode instanceof go.Node)) return;
		                                    var f1 = m1.findFeature(selnode.data.key);
		                                    f1.setType("optional");
		                                    m1.updateFeature(f1);
		                                    document.getElementById('myModel').value = JSON.stringify(m1);
		                                    document.getElementById("mySavedModel").value = parseModelToString(m1);
		                                    load();
		                                }
		                            }),
		                        $("ContextMenuButton",
		                            $(go.TextBlock, "Make Alternative"), {
		                                click: function(e, obj) {
		                                    var diagram = e.diagram;
		                                    var selnode = diagram.selection.first();
		                                    if (!(selnode instanceof go.Node)) return;
		                                    var f1 = m1.findFeature(selnode.data.key);
		                                    f1.setType("alternative");
		                                    m1.updateFeature(f1);
		                                    document.getElementById('myModel').value = JSON.stringify(m1);
		                                    document.getElementById("mySavedModel").value = parseModelToString(m1);
		                                    load();
		                                }
		                            })
		                        // more ContextMenuButtons would go here
		                    ) // end Adornment
		            }
		        );

		    // this function changes the category of the node data to cause the Node to be replaced
		    function changeCategoryMandatory(e, obj) {
		        var node = obj.part;
		        if (node) {
		            var diagram = node.diagram;
		            diagram.startTransaction("changeCategory");
		            var cat = "mandatory";
		            diagram.model.setCategoryForNodeData(node.data, cat);
		            diagram.commitTransaction("changeCategory");
		        }
		    }

		    function changeCategoryOptional(e, obj) {
		        var node = obj.part;
		        if (node) {
		            var diagram = node.diagram;
		            diagram.startTransaction("changeCategory");
		            var cat = "optional";
		            diagram.model.setCategoryForNodeData(node.data, cat);
		            diagram.commitTransaction("changeCategory");
		        }
		    }

		    function changeCategoryAlternative(e, obj) {
		        var node = obj.part;
		        if (node) {
		            var diagram = node.diagram;
		            diagram.startTransaction("changeCategory");
		            var cat = "alternative";
		            diagram.model.setCategoryForNodeData(node.data, cat);
		            diagram.commitTransaction("changeCategory");
		        }
		    }


		    // This is the template for a label node on a link: just an Ellipse, but with 0 size what makes it invisible.
		    myDiagram.nodeTemplateMap.add("LinkLabel",
		        $("Node", {
		                selectable: false,
		                avoidable: false,
		                layerName: "Foreground"
		            }, // always have link label nodes in front of Links
		            $("Shape", "Ellipse", {
		                width: 0,
		                height: 0,
		                stroke: null,
		                portId: "",
		                fromLinkable: true,
		                toLinkable: true,
		                cursor: "pointer"
		            })
		        ));



		    // the regular link template, mandatory features
		    myDiagram.linkTemplate =
		        $("Link",

		            {
		                relinkableFrom: true,
		                relinkableTo: true,
		                toShortLength: 2
		            },
		            $("Shape", {
		                stroke: "#000",
		                strokeWidth: 2
		            })
		        );

		    // template to link links
		    myDiagram.linkTemplateMap.add("linkToLink",
		        $("Link", {
		                curve: go.Link.Bezier,
		                curviness: 3
		            }, {
		                relinkableFrom: true,
		                relinkableTo: true
		            },
		            $("Shape", {
		                stroke: "#000",
		                strokeWidth: 2
		            })
		        ));

		    // template for optional features
		    myDiagram.linkTemplateMap.add("optional",
		        $("Link", {
		                relinkableFrom: true,
		                relinkableTo: true
		            },
		            $("Shape", {
		                stroke: "#000",
		                strokeWidth: 2
		            }),
		            $("Shape", {
		                fill: "#fff",
		                stroke: "#000",
		                toArrow: "Circle"
		            })
		        ));




		    // GraphLinksModel support for link label nodes requires specifying two properties.
		    myDiagram.model =
		        $(go.GraphLinksModel, {
		            linkLabelKeysProperty: "labelKeys"
		        });
		    myDiagram.toolManager.linkingTool.archetypeLabelNodeData = {
		        category: "LinkLabel"
		    };

		    function maybeChangeLinkCategory(e) {
		        var link = e.subject;
		        var linktolink = (link.fromNode.isLinkLabel || link.toNode.isLinkLabel);
		        e.diagram.model.setCategoryForLinkData(link.data, (linktolink ? "linkToLink" : ""));
		    }




		    load();


		}



		function makeBlob() {
		    var img = myDiagram.makeImageData({
		        background: "white",
		        returnType: "string",
		        size: new go.Size(1800, NaN)
		    });

		    img = img.replace('data:image/png;base64,', '');
		    return img;

		}


		// Show the diagram's model in JSON format
		function save() {
		    var json = myDiagram.model.toJson();
		    myDiagram.isModified = false;
		    m1 = parseToModel(json);
		    document.getElementById('myModel').value = JSON.stringify(m1);
		    document.getElementById("mySavedModel").value = parseModelToString(m1);

		}

		function load() {

		    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);


		}