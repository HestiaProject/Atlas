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

	// define a context menu for the diagram's background
	myDiagram.contextMenu =
		$(go.Adornment, "Vertical",
			$("ContextMenuButton",
				$(go.TextBlock, "Undo"), {
					click: function (e, obj) {
						e.diagram.commandHandler.undo();
					}
				},
				new go.Binding("visible", "", function (o) {
					return o.diagram.commandHandler.canUndo();
				}).ofObject()),
			$("ContextMenuButton",
				$(go.TextBlock, "Redo"), {
					click: function (e, obj) {
						e.diagram.commandHandler.redo();
					}
				},
				new go.Binding("visible", "", function (o) {
					return o.diagram.commandHandler.canRedo();
				}).ofObject()),

			$("ContextMenuButton",
				$(go.TextBlock, "New Feature"), {
					click: function () {
						createFeatureModalButtonClick()
					}
				}),

			$("ContextMenuButton",
				$(go.TextBlock, "New Association"), {
					click: function () {
						createAssociationModalButtonClick()
					}
				})
		);



	myDiagram.addDiagramListener("Modified", function (e) {

		var button = document.getElementById("SaveButton");
		if (button) button.disabled = !myDiagram.isModified;
		var idx = document.title.indexOf("*");
		if (myDiagram.isModified) {
			if (idx < 0) document.title += "*";
			save2();
		} else {
			if (idx >= 0) document.title = document.title.substr(0, idx);

		}



	});
	// the regular node template
	myDiagram.nodeTemplate =
		$("Node", "Auto", {
			fromSpot: go.Spot.Bottom, // coming out from right side
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
				name: "TEXTBLOCK",
				margin: 8,
				maxLines: 1
			},

				new go.Binding("text", "key")), {
				contextMenu: // define a context menu for each node
				$(go.Adornment, "Vertical",
					//	$("ContextMenuButton",
					//		$(go.TextBlock, "Collapse/Expand"), {
					//			click: function (e, button) {
					//				save2();
					//				var diagram = e.diagram;
					//				var selnode = diagram.selection.first();
					//				if (!(selnode instanceof go.Node)) return;
					//				if (selnode.isTreeExpanded == true) {
					//					selnode.isTreeExpanded = false;
					//					selnode.data.key = selnode.data.key + "*";
					//				}
					//				else {
					//					selnode.isTreeExpanded = true;
					//					selnode.data.key = selnode.data.key.substring(0, selnode.data.key.length - 1);
					//
					//				}
					//			}
					//		}),
					$("ContextMenuButton",
						$(go.TextBlock, "Rename"), {
							click: function (e, button) {
								save2();
								var diagram = e.diagram;
								var selnode = diagram.selection.first();
								if (!(selnode instanceof go.Node)) return;
								var size = true;
								while (size) {
									var fName = prompt("Please enter a new name:", selnode.data.key);
									if (m1.contain(fName.trim()) != -1 && fName.toUpperCase() != selnode.data.key.toUpperCase()) {
										alert("Name already taken!");
									} else {
										if (fName.length <= 30 && fName.trim() != "")
											size = false;
										else
											alert("You must enter a name with 30 characters or less!");
									}
								}
								if (fName == null) {

								} else {

									var f1 = m1.findFeature(selnode.data.key);
									f1.setName(fName);
									m1.updateFeature(f1);
									document.getElementById('myModel').value = JSON.stringify(m1);
									document.getElementById("mySavedModel").value = parseModelToString(m1);
									load();
								}
							}
						}),
					$("ContextMenuButton",
						$(go.TextBlock, "Create Child"), {
							click: function (e, obj) {
								save2();
								var diagram = e.diagram;
								var selnode = diagram.selection.first();
								if (!(selnode instanceof go.Node)) return;
								var size = true;
								while (size) {
									var fName = prompt("Please enter a new name:", "New Feature");
									if (m1.contain(fName.trim()) != -1) {
										alert("Name already taken!");
									} else {
										if (fName.length <= 30 && fName.trim() != "")
											size = false;
										else
											alert("You must enter a name with 30 characters or less!");
									}
								}
								if (fName == null) {

								} else {

									var f1 = new Feature(fName, "mandatory");
									m1.addFeature(f1);
									var parent = m1.findFeature(selnode.data.key);
									var a1 = new Association(parent, f1);
									m1.addAssociation(a1);

									document.getElementById('myModel').value = JSON.stringify(m1);
									document.getElementById("mySavedModel").value = parseModelToString(m1);
									load();
								}
							}
						}),
					$("ContextMenuButton",
						$(go.TextBlock, "Remove Feature"), {
							click: function (e, obj) {
								save2();
								var diagram = e.diagram;
								var selnode = diagram.selection.first();
								if (!(selnode instanceof go.Node)) return;
								var f1 = m1.findFeature(selnode.data.key);
								m1.removeFeature(f1);
								document.getElementById('myModel').value = JSON.stringify(m1);
								document.getElementById("mySavedModel").value = parseModelToString(m1);
								load();

							}
						}),
					$("ContextMenuButton",
						$(go.TextBlock, "Make Mandatory"), {
							click: function (e, obj) {
								save2();
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
							click: function (e, obj) {
								save2();
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
							click: function (e, obj) {
								save2();
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

				) // end Adornment
			},

		);


	//double click actions
	myDiagram.addDiagramListener("ObjectDoubleClicked", function (e) {
		save2();
		var diagram = e.diagram;
		var selnode = diagram.selection.first();
		if (!(selnode instanceof go.Node)) return;
		var size = true;
		while (size) {
			var fName = prompt("Please enter a new name:", selnode.data.key);
			if (m1.contain(fName.trim()) != -1 && fName.toUpperCase() != selnode.data.key.toUpperCase()) {
				alert("Name already taken!");
			} else {
				if (fName.length <= 30 && fName.trim() != "")
					size = false;
				else
					alert("You must enter a name with 30 characters or less!");
			}
		}
		if (fName == null) {

		} else {

			var f1 = m1.findFeature(selnode.data.key);
			f1.setName(fName);
			m1.updateFeature(f1);
			document.getElementById('myModel').value = JSON.stringify(m1);
			document.getElementById("mySavedModel").value = parseModelToString(m1);
			load();
		}


	});

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
				relinkableFrom: false,
				relinkableTo: false,
				toShortLength: 9,
				fromShortLength: 19,
				fromEndSegmentLength: 0,
				toEndSegmentLength: 0
			},
			$("Shape", {
				stroke: "#000",
				strokeWidth: 2
			}),
			{
				contextMenu: // define a context menu for each node
				$(go.Adornment, "Vertical",
					$("ContextMenuButton",
						$(go.TextBlock, "Remove Association"), {
							click: function (e, button) {
								save2();
								var diagram = e.diagram;
								var selnode = diagram.selection.first();
								if (!(selnode instanceof go.Link)) return;

								var f1 = selnode.fromNode.data.key;
								var f2 = selnode.toNode.data.key;
								var a1 = m1.findAssociation(f1, f2);
								m1.removeAssociation(a1);
								document.getElementById('myModel').value = JSON.stringify(m1);
								document.getElementById("mySavedModel").value = parseModelToString(m1);
								load();
							}
						})

				) // end Adornment
			}
		);

	// template to link links
	myDiagram.linkTemplateMap.add("linkToLink",
		$("Link", {
			selectable: false,
			curve: go.Link.Bezier,
			curviness: 3
		}, {
				relinkableFrom: false,
				relinkableTo: false
			},
			$("Shape", {
				stroke: "#000",
				strokeWidth: 2
			})
		));

	// template for optional features
	myDiagram.linkTemplateMap.add("optional",
		$("Link", {
			relinkableFrom: false,
			relinkableTo: false,

			fromShortLength: 19,
			fromEndSegmentLength: 1,
			toEndSegmentLength: 0
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
			,
			{
				contextMenu: // define a context menu for each node
				$(go.Adornment, "Vertical",
					$("ContextMenuButton",
						$(go.TextBlock, "Remove Association"), {
							click: function (e, button) {
								save2();
								var diagram = e.diagram;
								var selnode = diagram.selection.first();
								if (!(selnode instanceof go.Link)) return;

								var f1 = selnode.fromNode.data.key;
								var f2 = selnode.toNode.data.key;
								var a1 = m1.findAssociation(f1, f2);
								m1.removeAssociation(a1);
								document.getElementById('myModel').value = JSON.stringify(m1);
								document.getElementById("mySavedModel").value = parseModelToString(m1);
								load();
							}
						})

				) // end Adornment
			}));




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
	var d = myDiagram.documentBounds;

	var img = myDiagram.makeImageData({
		background: "white",
		returnType: "string",
		scale: 3,
		padding: 10,
		maxSize: new go.Size(Infinity, Infinity)
	});

	img = img.replace('data:image/png;base64,', '');
	return img;

}


// Show the diagram's model in JSON format
function save() {


	document.getElementById('myModel').value = JSON.stringify(m1);
	document.getElementById("mySavedModel").value = parseModelToString(m1);

}

function save2() {
	var json = myDiagram.model.toJson();
	myDiagram.isModified = false;
	m1 = parseToModel(json);
	document.getElementById('myModel').value = JSON.stringify(m1);
	document.getElementById("mySavedModel").value = parseModelToString(m1);

}

function load() {

	myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);


}