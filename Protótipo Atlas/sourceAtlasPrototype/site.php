<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>AtlasPrototype</title>
    <link rel="stylesheet" href="./fonts/css/font-awesome.min.css" />
    <link rel="stylesheet" href="./css/main.css" />
    <link rel="stylesheet" href="./css/modal.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    
    <?php
    session_start();
    if ((!isset ($_SESSION['login']) == true) and (!isset ($_SESSION['senha']) == true)) {
        unset($_SESSION['login']);
        unset($_SESSION['senha']);
        header('location:index.php');
    }

    $logado = $_SESSION['login'];
    ?>
</head>

<body onload="firstLoad()">
<!--Top Bar-->
    <div class="topBar">
        <input id="modelName" class="modelName" type="text" placeholder="Model name">
        <div class="topBarIconGroup" id="topBarIconGroup">
             <a onclick="newModel()" href="javascript:void(0);">
                <span class="tooltip">Create Model</span>
                <i class="fa fa-file-o"></i> </a>
            <a onclick="createLoadModalButtonClick()" href="javascript:void(0);">
                <span class="tooltip">Load Model</span>
                <i class="fa fa-upload"></i> </a>
            <a onclick="saveAsJson()" href="javascript:void(0);">
                <span class="tooltip">Save as .json</span>
                <i class="fa fa-save"></i> </a>
            <a onclick="exportPng()" href="javascript:void(0)">
                <span class="tooltip">Save as .png</span>
                <i class="fa fa-file-image-o"></i> </a>
        </div>
    </div>


<!--Top Bar Small Screen < 600 width-->
    <div class="topBarIconGroupSmall" id="topBarIconGroupSmall">
        <a onclick="newModel()" href="javascript:void(0);">
                <span class="tooltip">Create Model</span>
                <i class="fa fa-file-o"></i> </a>
        <a onclick="createLoadModalButtonClick()" href="javascript:void(0);">
            <span class="tooltip">Load Model</span>
            <i class="fa fa-upload"></i> </a>
        <a onclick="saveAsJson()" href="javascript:void(0);">
            <span class="tooltip">Save as .json</span>
            <i class="fa fa-save"></i> </a>
        <a onclick="exportPng()" href="javascript:void(0)">
            <span class="tooltip">Save as .png</span>
            <i class="fa fa-file-image-o"></i> </a>
    </div>

<!--Side Bar-->
    <div class="sideBar">
        <div class="sideBarIconGroup">
            <a onclick="createFeatureModalButtonClick();" href="javascript:void(0);">
                <span class="tooltip">Create Feature</span>
                <i class="fa fa-square-o"></i></a>
            <a onclick="createAssociationModalButtonClick();" href="javascript:void(0);">
                <span class="tooltip">Create Association</span>
                <i class="fa fa-arrows-h"></i></a>
            <a onclick="validate()" href="javascript:void(0);">
                <span class="tooltip">Check Model</span>
                <i class="fa fa-check"></i></a>
        </div>
    </div>

<!--Create Feature Modal-->
    <div class="modal" id="featureModal">
        <div id="featureModalContent" class="featureModalContent">
            <div class="closeButton">
                <a onclick="closeFeatureModalButtonClick();" href="javascript:void(0);"><i class="fa fa-times"></i></a>
            </div>
            <label><b>Feature Name</b></label>
            <input id="nameFeatureTextField" type="text">
            <label><b>Feature type</b></label>
            <select id="featureTypeComboBox"></select>
            <button id="createFeatureSubmitButton" type="submit">Create</button>
        </div>
    </div>

<!--Create Association Modal-->
    <div class="modal" id="associationModal">
        <div id="associationModalContent" class="associationModalContent">
            <div class="closeButton">
                <a onclick="closeAssociationModalButtonClick();" href="javascript:void(0);"><i class="fa fa-times"></i></a>
            </div>
            <label><b>Parent Feature</b></label>
            <select id="feature1ComboBox"></select>
            <label><b>Child Feature</b></label>
            <select id="feature2ComboBox"></select>
            <button id="createAssociationSubmitButton" type="submit">Create</button>
        </div>
    </div>

<!--Load File Modal-->
    <div class="modal" id="loadFileModal">
        <div id="loadFileModalContent" class="loadFileModalContent">
            <div class="closeButton">
                <a onclick="closeFileModalButtonClick();" href="javascript:void(0);"><i class="fa fa-times"></i></a><br/>
            </div>
            <label><b>Select File</b></label><br/>
            <input id="fileInput" type="file" accept=".json" value="select"><br/>
            <button id="loadFileSubmitButton" type="submit">Import</button>
        </div>
    </div>

<!--Canvas-->
    <div class="canvas" id="canvas">
        <div id="myDiagramDiv"></div>
        <button id="showJSON" onclick="toggle_visibility('JsonText');">Show/Hide JSON</button>
        <div style="display:none;" id="JsonText" class="jsonText">
            <div>
                <button id="SaveButton" onclick="save2()">Save</button>
                <button id="loadButton" onclick="load()">Load</button> Diagram.model saved in JSON format:<br />
            </div>
            <textarea id="mySavedModel"></textarea>
            <textarea id="myModel"></textarea>
        </div>
    </div>

<!--Initial load-->
    <script type="text/javascript">
        var m1;




        function firstLoad() {
            // DELETE IMAGE
            var hostimg = document.getElementsByTagName("img");
            if (hostimg[0] != undefined) {
                hostimg[0].remove();
            }

            // initial ajdust of positions;
            adjustSizes();
            adjustTooltips();
            m1 = new Model();
            init(m1);

            initGo();
            m1 = parseToModel(document.getElementById("mySavedModel").value);
            document.getElementById('myModel').value = JSON.stringify(m1);

        }

        function toggle_visibility(id) {
            var e = document.getElementById(id);
            if (e.style.display == 'block') {
                e.style.display = 'none';               
            } else {
                e.style.display = 'block';               
            }
        }

        function validate() {
            save2();
            var str = validateModel(m1);
            alert(str);
        }
    </script>

<!--Load Scripts-->
    <script type="text/javascript" src="./js/SaveScript.js"></script>
    <script type="text/javascript" src="./js/ModelScript.js"></script>
    <script type="text/javascript" src="./js/FeatureScript.js"></script>
    <script type="text/javascript" src="./js/AssociationScript.js"></script>
    <script type="text/javascript" src="./js/DownloadScript.js"></script>
    <script type="text/javascript" src="./js/ParserScript.js"></script>
    <script type="text/javascript" src="./js/BackwardParserScript.js"></script>
    <script type="text/javascript" src="./js/Go.js"></script>
    <script type="text/javascript" src="./js/GoFunction.js"></script>
    <script type="text/javascript" src="./jQuery/jquery-3.2.1.js"></script>
    <script type="text/javascript" src="./js/CreateModals.js"></script>
    <script type="text/javascript" src="./js/CreateFeatureScript.js"></script>
    <script type="text/javascript" src="./js/LoadFileScript.js"></script>
    <script type="text/javascript" src="./js/SaveFileScript.js"></script>
    <script type="text/javascript" src="./js/InitialScript.js"></script>
    <script type="text/javascript" src="./js/FileNameScript.js"></script>
    <script type="text/javascript" src="./js/CreateAssociationScript.js"></script>
    <script type="text/javascript" src="./js/CloseModalsScript.js"></script>
    <script type="text/javascript" src="./js/CreateAssociationSelectListener.js"></script>
    <script type="text/javascript" src="./js/ValidateScript.js"></script>
    <script type="text/javascript" src="./js/AdjustCanvas.js"></script>
    <script type="text/javascript" src="./js/NewModelScript.js"></script>



</body>

</html>

