
function saveAsJson() {
			
			var modelName = document.getElementById('modelName').value;
		
			if (modelName.isEmpty()) {
				alert("Insert the model name!");
			} else {
				save2();
				var goJson = document.getElementById('mySavedModel').value;
				downloadContent(modelName, goJson);
			}
		}

/*		function loadJson() {

			var goJson = document.getElementById('jsonLoad').value;
			alert(jsonLoad);

			var model = parseToModel(goJson);

			var newJson = parseModelToString(model);

			document.getElementById('demo').innerHTML = newJson;
		}
*/
		function exportPng() {

			var modelName = document.getElementById('modelName').value;

			if (modelName.isEmpty()) {
				alert("Insert the model name!");
			} else {
				var img = makeBlob();
				downloadImg(modelName, img);
			}
		}
		
		String.prototype.isEmpty = function () {
			return (this.length === 0 || !this.trim());
		};