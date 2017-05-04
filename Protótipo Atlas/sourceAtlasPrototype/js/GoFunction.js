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

		    myDiagram.addDiagramListener("Modified", function(e) {
		        /*
			  var button = document.getElementById("SaveButton");
		      if (button) button.disabled = !myDiagram.isModified;
		      var idx = document.title.indexOf("*");
		      if (myDiagram.isModified) {
		        if (idx < 0) document.title += "*";
		      } else {
		        if (idx >= 0) document.title = document.title.substr(0, idx);
		      }
			  */
		        save();
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
		                    width: 50,
		                    height: 30,
		                    minSize: new go.Size(50, 30),
		                    portId: "",
		                    cursor: "pointer"
		                },
		                new go.Binding("fill", "color")),
		            $("TextBlock", {
		                    margin: 8
		                },
		                new go.Binding("text", "key"))
		        );

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
				size: new go.Size(1800,NaN)
		    });
			
			img = img.replace('data:image/png;base64,','');
			return img;
			
		}


		// Show the diagram's model in JSON format
		function save() {
		    document.getElementById("mySavedModel").value = myDiagram.model.toJson();
		    myDiagram.isModified = false;
		}

		function load() {

		    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);


		}