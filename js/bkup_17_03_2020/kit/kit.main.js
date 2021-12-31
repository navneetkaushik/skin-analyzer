

/*
 * Author 
 * S.K.Sharma
 * email:skss.vfxgmail.com
 * web:https://makeoverkit.appspot.com/
 * version 1.1.0
 */
/*
 * Description :
 * Makeover kit is a javascript tool for applying virutal makeover in images,
 * 
 * this script required:
 * jQuery,JQuery UI,Bootstrab,cropperjs,webcamjs
 * 
 * support.1 js js file perfomed trackface and landmark
 * 
 * support.2 js file included with
 * fabricjs ,chartjs,EaselJS,undomanagerjs,
 * 
 * model.js
 * model js is the trained model for perform landmark tracking
 * 
 * more informtion about face dection and landmark tracking
 * 
 * https://github.com/auduno/clmtrackr 
 * 
 * 
 * 
 * Change log :
 * 
 * v1.0.0
 * initial release
 * 
 * v1.1.0
 * 
 * include bootstrab
 * fix design issues
 * bug fixing and improve performance
 * 
 */
/*function getLipColors() {
    var lip_colors = [];
    if (localStorage.getItem('lip_colors')) {
        JSON.parse(localStorage.getItem('lip_colors')).forEach(e => {
            lip_colors.push(e.color_code);
        });
    }
    return lip_colors;
}
function getFaceColors() {
    var face_colors = [];
    if (localStorage.getItem('face_colors')) {
        JSON.parse(localStorage.getItem('face_colors')).forEach(e => {
            face_colors.push(e.color_code);
        });
    }
    return face_colors;
}
function getEyeColors() {
    var eye_colors = [];
    if (localStorage.getItem('eye_colors')) {
        JSON.parse(localStorage.getItem('eye_colors')).forEach(e => {
            eye_colors.push(e.color_code);
        });
    }
    return eye_colors;
}*/
window.makeoverKit = function (params) {
    var app = this;
    app.version = '1.1.0'
    app.config = {
        canvas: 'default', //id
        canvasW: 300,
        canvasH: 300,
        waterMark: true,
        waterMarkText1: '', //string
        waterMarkText2: '',
        openLipMessage: 'Is your Image lips are opened..?',
        //points    
        manualPoints: false,
        facePoint: [],
        nosePoint: [],
        lipPoint: [],
        lipOpenPoint: [],
        leftEyePoint: [],
        rightEyePoint: [],
        leftEyeBrowPoint: [],
        rightEyeBrowPoint: [],
        //selectors
        photoInput: 'files', //id
        webCam: 'web-cam-btn',
        faceBook: 'fb-btn',
        //buttons
        undoBtn: 'undo-btn',
        redoBtn: 'redo-btn',
        previewBtn: 'preview-btn',
        downloadBtn: 'down-btn',
        shareBtn: '',
        clearAll: 'clear-all-btn',
        new: 'new-btn',

        //slider Selectors //ids
        zoomSlider: 'zoom-slider',
        lipstickAmtSlider: 'lipstick-amt',
        lipsglossAmtSlider: 'lipgloss-amt',
        liplinerAmtSlider: 'lipliner-amt',
        eyeshadowAmtSlider: 'eyeshadow-amt',
        eyeshadowSizeSlider: 'eyeshadow-size',
        eyelinerAmtSlider: 'eyeliner-amt',
        eyelinerSizeSlider: 'eyeliner-size',
        eyebrowAmtSlider: 'eyebrow-amt',
        eyebrowSizeSlider: 'eyebrow-size',
        foundationAmtSlider: 'foundation-amt',
        concealerAmtSlider: 'concealer-amt',
        blushAmtSlider: 'blush-amt',
        //colorchart
        lipstickChart: 'lipstick-color-chart',
        lipglossChart: 'lipgloss-color-chart',
        liplinerChart: 'lipliner-color-chart',
        eyeshadowChart: 'eyeshadow-color-chart',
        eyelinerChart: 'eyeliner-color-chart',
        eyebrowChart: 'eyebrow-color-chart',
        foundationChart: 'foundation-color-chart',
        concealerChart: 'concealer-color-chart',
        blushChart: 'blush-color-chart',
        //colors
        //lip
        lipstickColors: ["#DB7781", "#807E88", "#B0ACA2", "#FEBBCC", "#E3919B", "#D1638C"],//getLipColors(),
        lipglowColors: ["#DB7781", "#807E88", "#B0ACA2", "#FEBBCC", "#E3919B", "#D1638C"],//getLipColors(),
        liplinerColors: ["#DB7781", "#807E88", "#B0ACA2", "#FEBBCC", "#E3919B", "#D1638C"],//getLipColors(),
        //eye
        eyeshadowColors: ["#DB7781", "#807E88", "#B0ACA2", "#FEBBCC", "#E3919B", "#D1638C"],
        eyelinerColors: ["#DB7781", "#807E88", "#B0ACA2", "#FEBBCC", "#E3919B", "#D1638C"],
        eyebrowColors: ["#DB7781", "#807E88", "#B0ACA2", "#FEBBCC", "#E3919B", "#D1638C"],
        //face
        foundationColors: ["#DB7781", "#807E88", "#B0ACA2", "#FEBBCC", "#E3919B", "#D1638C"],
        concealerColors: ["#DB7781", "#807E88", "#B0ACA2", "#FEBBCC", "#E3919B", "#D1638C"],
        blushColors: ["#DB7781", "#807E88", "#B0ACA2", "#FEBBCC", "#E3919B", "#D1638C"],
    }

    var faceTrack = new faceTracker.tracker({ stopOnConvergence: true });
    faceTrack.init(Model);
    //useful varibles
    var mainCanvas, pointCanvas, box, drawRequest, scale, offsetX, offsetY, sBox, change, zoomValue, orgCan, orgImg,
        lipstickChart,
        lipglossChart,
        liplinerChart,
        eyeshadowChart,
        eyelinerChart,
        eyebrowChart,
        foundationChart,
        concealerChart,
        blushChart,
        currentTab = 'lip',//localStorage.getItem('currentTab'),
        mouthOpen = false;
    resetValue();
    //store color,size,amount in globally
    function resetValue() {
        window.lipstickColor = 'rgba(0,0,0,0)', window.lipstickAmount = 1;
        window.lipglossColor = 'rgba(0,0,0,0)', window.lipglossAmount = 1;
        window.liplinerColor = 'rgba(0,0,0,0)', window.liplinerAmount = 1;

        window.eyeshadowColor = 'rgba(0,0,0,0)', window.eyeshadowAmount = 1, window.eyeshadowSize = 20;
        window.eyelinerColor = 'rgba(0,0,0,0)', window.eyelinerAmount = 1, window.eyelinerSize = 10;
        window.eyebrowColor = 'rgba(0,0,0,0)', window.eyebowAmount = 1, window.eyebrowSize = 2;

        window.facefoundationColor = 'rgba(0,0,0,0)', window.facefoundationAmount = 1;
        window.faceconcealerColor = 'rgba(0,0,0,0)', window.faceconcealerAmount = 1;
        window.faceblushColor = 'rgba(0,0,0,0)', window.faceblushAmount = 1;
    }
    // Extend defaults with parameters
    for (var param in params) {
        app.config[param] = params[param];
    }
    var config = app.config;



    var undoManager = new UndoManager();

    updateButtons();
    //Update the box position on undo and redo
    undoManager.onundo = function (e) {
        //console.log("Undid action: " + e.data.type);
    };

    undoManager.onredo = function (e) {
        //console.log("Redid action: " + e.data.type);
    }

    undoManager.onchange = function (e) {
        updateButtons();
    }
    function updateButtons() {
        if (!undoManager.canUndo()) {
            $('#' + config.undoBtn).addClass("disabled");
        } else {
            $('#' + config.undoBtn).removeClass("disabled");
        }

        if (!undoManager.canRedo()) {
            $('#' + config.redoBtn).addClass("disabled");
        } else {
            $('#' + config.redoBtn).removeClass("disabled");
        }
    }


    function startPan(event) {

        if (event.button != 2) {
            //return;
        }
        var x0 = event.screenX,
            y0 = event.screenY;
        function continuePan(event) {
            var x = event.screenX,
                y = event.screenY;
            if (mainCanvas.getZoom() > 1) {
                mainCanvas.relativePan({ x: x - x0, y: y - y0 });
            }



            x0 = x;
            y0 = y;
        }
        function stopPan(event) {
            $(window).off('mousemove', continuePan);
            $(window).off('mouseup', stopPan);
        }
        ;
        $(window).mousemove(continuePan);
        $(window).mouseup(stopPan);
        $(window).contextmenu(cancelMenu);
    }

    function cancelMenu() {
        $(window).off('contextmenu', cancelMenu);
        return false;
    }
    function realWidth(obj) {
        var clone = obj.clone();
        clone.css("visibility", "hidden");
        clone.css("display", "block");
        clone.addClass("for-size");
        $('body').append(clone);
        var width = $('.for-size').find(".source-for-size").width();//clone.outerWidth();
        clone.remove();
        return width;
    }

    app.init = function () {
        app.eventTrigger('onKitInit')
        $.get("view/model-box-contents.html", function (data) {
            $('body').append(data);
            config.canvasW = realWidth($('#makeoverkit-work-area')) - 15;
            config.canvasH = config.canvasW;

            var pcLay = document.createElement('canvas');
            pcLay.id = "pcLay";
            pcLay.className = "pcLay";
            pcLay.width = app.config.canvasW;
            pcLay.height = app.config.canvasH;
            pcLay.style.cssText = "display: none;";
            document.body.appendChild(pcLay);



            $('#Lay-ref').attr('height', app.config.canvasH);
            $('#Lay-ref').attr('width', app.config.canvasW);
            $('#Lay').attr('height', app.config.canvasH);
            $('#Lay').attr('width', app.config.canvasW);



            mainCanvas = new fabric.Canvas(app.config.canvas, {
                selection: false,
                containerClass: 'edit-canvas',
                backgroundColor: 'rgb(255,255,255)'
            });
            mainCanvas.setHeight(app.config.canvasH);
            mainCanvas.setWidth(app.config.canvasW);
            orgCan = new fabric.Canvas('for-orginal', {
                selection: false,
                containerClass: 'orgimg-canvas',
                backgroundColor: 'rgb(255,255,255)'
            });
            orgCan.setHeight(app.config.canvasH);
            orgCan.setWidth(app.config.canvasW);

            $('#for-orginal').attr('height', app.config.canvasH);
            $('#for-orginal').attr('width', app.config.canvasW);

            $('#' + app.config.canvas).attr('height', app.config.canvasH);
            $('#' + app.config.canvas).attr('width', app.config.canvasW);

            $('#web_camera').css('width', app.config.canvasW);
            $('#web_camera').css('height', app.config.canvasW - 150);
            $('#web_result').css('width', app.config.canvasW);
            $('#web_result').css('height', app.config.canvasW - 150);
        });


        app.upload(app.config.photoInput);
        $(function () {

            var eyes = false, face = false;
            $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                currentTab = $(e.target).attr('aria-controls'); // newly activated tab
                console.log(currentTab)
                if (currentTab == 'eyes' && !eyes) {
                    $('#point').trigger('click');
                    eyes = true;
                } else if (currentTab == 'face' && !face) {
                    $('#point').trigger('click');
                    face = true;
                }
            })
            $("#" + config.zoomSlider).slider({
                min: 10,
                max: 50,
                start: function (event, ui) {
                    change = ui.value;

                },
                change: function (event, ui) {
                    if (change <= ui.value) {
                        zoomValue = ui.value / 10;
                        mainCanvas.zoomToPoint(new fabric.Point(mainCanvas.width / 2, mainCanvas.height / 2), zoomValue)

                    } else {
                        zoomValue = ui.value / 10;
                        mainCanvas.zoomToPoint(new fabric.Point(mainCanvas.width / 2, mainCanvas.height / 2), zoomValue)
                        if (ui.value / 10 < 1.2) {
                            mainCanvas.absolutePan(new fabric.Point(0, 0));
                        }
                    }
                },
                slide: function (event, ui) {

                    if (change <= ui.value) {
                        zoomValue = ui.value / 10;
                        mainCanvas.zoomToPoint(new fabric.Point(mainCanvas.width / 2, mainCanvas.height / 2), zoomValue)
                    } else {
                        zoomValue = ui.value / 10;
                        mainCanvas.zoomToPoint(new fabric.Point(mainCanvas.width / 2, mainCanvas.height / 2), zoomValue)
                        if (ui.value / 10 < 1.2) {
                            mainCanvas.absolutePan(new fabric.Point(0, 0));
                        }
                    }
                }
            });

            $('#' + config.lipstickAmtSlider).slider({
                min: 0,
                max: 10,
                value: 10,
                stop: function (event, ui) {
                    window.lipstickAmount = ui.value / 10;
                    app.lipstick(window.lipstickColor, window.lipstickAmount);
                }
            });
            $('#' + config.lipsglossAmtSlider).slider({
                min: 0,
                max: 5,
                value: 2,
                stop: function (event, ui) {
                    window.lipglossAmount = ui.value / 10;
                    app.lipgloss(window.lipglossColor, window.lipglossAmount);
                }
            });
            $('#' + config.liplinerAmtSlider).slider({
                min: 0,
                max: 10,
                value: 3,
                stop: function (event, ui) {
                    window.liplinerAmount = ui.value / 10;
                    app.lipliner(window.liplinerColor, window.liplinerAmount);
                }
            });

            $('#' + config.eyeshadowAmtSlider).slider({
                min: 0,
                max: 10,
                value: 3,
                stop: function (event, ui) {
                    window.eyeshadowAmount = ui.value / 10;
                    app.eyeshadow(window.eyeshadowColor, window.eyeshadowAmount, window.eyeshadowSize);
                }
            });
            $('#' + config.eyeshadowSizeSlider).slider({
                min: 0,
                max: 50,
                value: 20,
                stop: function (event, ui) {
                    window.eyeshadowSize = ui.value;
                    app.eyeshadow(window.eyeshadowColor, window.eyeshadowAmount, window.eyeshadowSize);
                }
            });
            $('#' + config.eyelinerAmtSlider).slider({
                min: 0,
                max: 10,
                value: 5,
                stop: function (event, ui) {
                    window.eyelinerAmount = ui.value / 10;
                    app.eyeliner(window.eyelinerColor, window.eyelinerAmount, window.eyelinerSize);
                }
            });
            $('#' + config.eyelinerSizeSlider).slider({
                min: 0,
                max: 25,
                value: 10,
                stop: function (event, ui) {
                    window.eyelinerSize = ui.value;
                    app.eyeliner(window.eyelinerColor, window.eyelinerAmount, window.eyelinerSize);
                }
            });
            $('#' + config.eyebrowAmtSlider).slider({
                min: 0,
                max: 10,
                value: 5,
                stop: function (event, ui) {
                    window.eyebrowAmount = ui.value / 10;
                    app.eyebrow(window.eyebrowColor, window.eyebrowAmount, window.eyebrowSize);
                }
            });
            $('#' + config.eyebrowSizeSlider).slider({
                min: 0,
                max: 5,
                value: 3,
                stop: function (event, ui) {
                    window.eyebrowSize = ui.value;
                    app.eyebrow(window.eyebrowColor, window.eyebrowAmount, window.eyebrowSize);
                }
            });

            $('#' + config.foundationAmtSlider).slider({
                min: 0,
                max: 10,
                value: 5,
                stop: function (event, ui) {
                    window.facefoundationAmount = ui.value / 10;
                    app.foundation(window.facefoundationColor, window.facefoundationAmount);
                }
            });
            $('#' + config.concealerAmtSlider).slider({
                min: 0,
                max: 10,
                value: 5,
                stop: function (event, ui) {
                    window.faceconcealerAmount = ui.value / 10;
                    app.concealer(window.faceconcealerColor, window.faceconcealerAmount);
                }
            });

            $('#' + config.blushAmtSlider).slider({
                min: 0,
                max: 10,
                value: 5,
                stop: function (event, ui) {
                    window.faceblushAmount = ui.value / 10;
                    app.blush(window.faceblushColor, window.faceblushAmount);
                }
            });

            $('body').on('click', '.nxt-btn-1', function () {
                $('#face-correct').modal('hide');
                app.findLandmark(document.getElementById('pc'), box);
            })
            var nxtbtnClick = 0;
            var smile = true;
            $('body').on('click', '.nxt-btn-2', function () {
                function reInit() {
                    nxtbtnClick = 0;
                    $('#point-correct').modal('hide');
                    function chk(color) {
                        if (color === 'rgba(0,0,0,0)') {
                            return false;
                        } else {
                            return true;
                        }
                    }

                    (chk(window.lipstickColor) ? app.lipstick(window.lipstickColor, window.lipstickAmount) : null);
                    (chk(window.liplinerColor) ? app.lipliner(window.liplinerColor, window.liplinerAmount) : null);
                    (chk(window.lipglossColor) ? app.lipgloss(window.lipglossColor, window.lipglossAmount) : null);
                    (chk(window.eyeshadowColor) ? app.eyeshadow(window.eyeshadowColor, window.eyeshadowAmount, window.eyeshadowSize) : null);
                    (chk(window.eyelinerColor) ? app.eyeliner(window.eyelinerColor, window.eyelinerAmount, window.eyelinerSize) : null);
                    (chk(window.eyebrowColor) ? app.eyebrow(window.eyebrowColor, window.eyebrowAmount, window.eyebrowSize) : null);
                    (chk(window.facefoundationColor) ? app.foundation(window.facefoundationColor, window.facefoundationAmount) : null);
                    (chk(window.faceconcealerColor) ? app.concealer(window.faceconcealerColor, window.faceconcealerAmount) : null);
                    (chk(window.faceblushColor) ? app.blush(window.faceblushColor, window.faceblushAmount) : null);
                }
                console.log(currentTab)
                if (currentTab == 'lip' && nxtbtnClick == 0) {
                    $('#ref-img').attr('src', 'images/reference/lip.jpg')
                    app.drawPoints(app.config.lipPoint, true);
                    nxtbtnClick++;
                } else if (currentTab == 'lip' && nxtbtnClick == 1 && smile) {
                    if (!mouthOpen) {
                        $("#dialog-confirm").html(app.config.openLipMessage);
                        $("#dialog-confirm").dialog({
                            resizable: false,
                            dialogClass: "no-close",
                            modal: false,
                            height: 200,
                            width: 250,
                            buttons: {
                                "Yes": function () {
                                    mouthOpen = true;
                                    $(this).dialog('close');
                                    $('#ref-img').attr('src', 'images/reference/smile.jpg')
                                    app.drawPoints(app.config.lipOpenPoint, true);
                                },
                                "No": function () {
                                    smile = false;
                                    mouthOpen = false;
                                    $(this).dialog('close');
                                    reInit();
                                }
                            }
                        });
                    } else {
                        app.drawPoints(app.config.lipOpenPoint, true);
                    }
                    nxtbtnClick++;
                } else if (currentTab == 'eyes' && nxtbtnClick == 0) {
                    $('#ref-img').attr('src', 'images/reference/left-eye.jpg')
                    app.drawPoints(app.config.leftEyePoint, true);
                    nxtbtnClick++;
                } else if (currentTab == 'eyes' && nxtbtnClick == 1) {
                    $('#ref-img').attr('src', 'images/reference/right-eye.jpg')
                    app.drawPoints(app.config.rightEyePoint, true);
                    nxtbtnClick++;
                } else if (currentTab == 'eyes' && nxtbtnClick == 2) {
                    $('#ref-img').attr('src', 'images/reference/left-brow.jpg')
                    app.drawPoints(app.config.leftEyeBrowPoint, false);
                    nxtbtnClick++;
                } else if (currentTab == 'eyes' && nxtbtnClick == 3) {
                    $('#ref-img').attr('src', 'images/reference/right-brow.jpg')
                    app.drawPoints(app.config.rightEyeBrowPoint, false);
                    nxtbtnClick++;
                } else if (currentTab == 'face' && nxtbtnClick == 0) {
                    $('#ref-img').attr('src', 'images/reference/face.jpg')
                    app.drawPoints(app.config.facePoint, true);
                    nxtbtnClick++;
                } else {
                    reInit();
                }

            });

            $('#point').click(function () {
                $('.nxt-btn-2').trigger('click');
                $('#point-correct').modal('show');
            })


            //init color charts

            lipstickChart = $("#" + app.config.lipstickChart);
            lipglossChart = $("#" + app.config.lipglossChart);
            liplinerChart = $("#" + app.config.liplinerChart);

            eyeshadowChart = $("#" + app.config.eyeshadowChart);
            eyelinerChart = $("#" + app.config.eyelinerChart);
            eyebrowChart = $("#" + app.config.eyebrowChart);

            foundationChart = $("#" + app.config.foundationChart);
            concealerChart = $("#" + app.config.concealerChart);
            blushChart = $("#" + app.config.blushChart);

            app.colorChart('lipstick', app.config.lipstickColors);
            app.colorChart('lipliner', app.config.liplinerColors);
            app.colorChart('lipgloss', app.config.lipglowColors);

            app.colorChart('eyeshadow', app.config.eyeshadowColors);
            app.colorChart('eyeliner', app.config.eyelinerColors);
            app.colorChart('eyebrow', app.config.eyebrowColors);

            app.colorChart('foundation', app.config.foundationColors);
            app.colorChart('concealer', app.config.concealerColors);
            app.colorChart('blush', app.config.blushColors);




            $('#' + config.undoBtn).click(function () {
                undoManager.undo();
            });
            $('#' + config.redoBtn).click(function () {
                undoManager.redo();
            });

            $('#' + config.previewBtn).click(function () {
                app.showPreview();
            });

            $('#' + config.webCam).click(function () {
                $('#web-cam-modal').modal('show');
                $('#web-cam-modal').on('shown.bs.modal', function (e) {
                    app.webCam();
                })

            })

            $('.mod-img').click(function () {
                var url = $(this).attr('src');
                $('#loading-modal').modal('show');
                app.modelImg(url);
            });

            //clear all

            $('#' + config.clearAll).click(function () {
                var ok = confirm("Are you sure want to clear all!");
                if (ok == true) {
                    app.clearAll();
                }
            })
            //new
            $('#' + config.new).click(function () {
                var ok = confirm("Are you sure!");
                if (ok == true) {
                    app.new();
                }

            });

            //download
            $('#' + config.downloadBtn).click(function () {
                app.download(this, mainCanvas, 'makeoverKit');
            });

        });
    };
    app.download = function (link, canvasId, filename) {
        link.href = canvasId.toDataURL({
            format: 'png',
            //top:orgImgTop,
            multiplier: 2,
        });
        link.download = filename;
    }
    app.new = function () {
        window.location.reload();
    }
    app.clearAll = function () {
        mainCanvas.clear();
        app.drawMain(orgImg, true);
    }
    app.modelImg = function (url) {
        var img = new Image();
        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = this.width;
            canvas.height = this.height;

            var ctx = canvas.getContext("2d");
            ctx.drawImage(this, 0, 0);

            var dataURL = canvas.toDataURL("image/png");
            //app.drawMain(dataURL);
            app.cropImg(dataURL);
        };

        img.src = url;
    }
    app.webCam = function () {
        Webcam.set({
            flip_horiz: true
        });
        Webcam.attach('#web_camera');
        var data = '';
        function take_snapshot() {
            Webcam.snap(function (data_uri) {
                data = data_uri;
                document.getElementById('web_result').innerHTML = '<img src="' + data_uri + '"/>';
            });
            $('.web-nxt').click(function () {
                app.drawMain(data)
                $('#web-cam-modal').modal('hide');
                $('#loading-modal').modal('show');
            })
        }
        $('.web-take').click(function () {
            take_snapshot();
            $('.web-nxt').removeClass('disabled');
            $('#web_camera').hide();
            $('#web_result').show();
        })
        $('.web-re-tack').click(function () {
            $('.web-nxt').removeClass('disabled');
            $('#web_result').hide();
            $('#web_camera').show();
        });

    }


    /*
     * color chart by part
     * @param {string} which
     * @param {string} color
     */
    var chart1, chart2, chart3, chart4, chart5, chart6, chart7, chart8, chart9;
    app.colorChart = function (which, color) {
        function destory(chart) {
            if (chart) {
                chart.destroy();
            }
        }
        var data = [];
        for (var i = 0; i <= color.length - 1; i++) {
            data.push({ x: i, y: 0, r: 12 });
        }
        function chartClick(which, color) {
            app.eventTrigger('onChartClick', {
                detail: {
                    chart: which,
                    color: color
                }
            })
        }

        if (which == 'lipstick') {
            destory(chart1)
            chart1 = new Chart(lipstickChart, {
                type: 'bubble',
                data: {
                    datasets: [
                        {
                            data: data,
                            backgroundColor: color,
                            hoverBackgroundColor: color
                        }]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            display: false,
                            ticks: {
                                min: -0.5,
                                max: (color.length + 1)
                            }
                        }],
                        yAxes: [{
                            display: false
                        }],
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    },
                    onClick: function (evt) {

                        var activePoints = chart1.getElementsAtEvent(evt);
                        var lipc = JSON.parse(localStorage.getItem('lip_colors'));
                        if (activePoints[0]) {
                            //document.getElementById("shade_show").innerHTML = lipc[activePoints[0]['_index']]['name'];
                           // document.getElementById("show_shade_no").innerHTML = lipc[activePoints[0]['_index']]['shade_no'];
                            //document.getElementById("shade_color").style.background = lipc[activePoints[0]['_index']]['color_code'];

                            window.lipstickColor = activePoints[0]._model.backgroundColor;
                            app.lipstick(window.lipstickColor, window.lipstickAmount);
                            chartClick(which, activePoints[0]._model.backgroundColor)
                        }

                    }
                }

            });
        } else if (which == 'lipgloss') {
            destory(chart2)
            chart2 = new Chart(lipglossChart, {
                type: 'bubble',
                data: {
                    datasets: [
                        {
                            data: data,
                            backgroundColor: color,
                            hoverBackgroundColor: color
                        }]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            display: false,
                            ticks: {
                                min: -0.5,
                                max: (color.length + 1)
                            }
                        }],
                        yAxes: [{
                            display: false
                        }],
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    },
                    onClick: function (evt) {

                        var activePoints = chart2.getElementsAtEvent(evt);
                        if (activePoints[0]) {
                            var lipc = JSON.parse(localStorage.getItem('lip_colors'));
                            //document.getElementById("shade_show").innerHTML = lipc[activePoints[0]['_index']]['name'];
                            //document.getElementById("show_shade_no").innerHTML = lipc[activePoints[0]['_index']]['shade_no'];
                            //document.getElementById("shade_color").style.background = lipc[activePoints[0]['_index']]['color_code'];
                            window.lipglossColor  = activePoints[0]._model.backgroundColor;
                            app.lipgloss(window.lipglossColor, window.lipglossAmount);
                            chartClick(which, activePoints[0]._model.backgroundColor)
                        }
                    }
                }

            });
        } else if (which == 'lipliner') {
            destory(chart3)
            chart3 = new Chart(liplinerChart, {
                type: 'bubble',
                data: {
                    datasets: [
                        {
                            data: data,
                            backgroundColor: color,
                            hoverBackgroundColor: color
                        }]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            display: false,
                            ticks: {
                                min: -0.5,
                                max: (color.length + 1)
                            }
                        }],
                        yAxes: [{
                            display: false
                        }],
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    },
                    onClick: function (evt) {
                        var activePoints = chart3.getElementsAtEvent(evt);
                        if (activePoints[0]) {
                            var lipc = JSON.parse(localStorage.getItem('lip_colors'));
                            //document.getElementById("shade_show").innerHTML = lipc[activePoints[0]['_index']]['name'];
                            //document.getElementById("show_shade_no").innerHTML = lipc[activePoints[0]['_index']]['shade_no'];
                            //document.getElementById("shade_color").style.background = lipc[activePoints[0]['_index']]['color_code']; window.liplinerColor = activePoints[0]._model.backgroundColor;
							window.liplinerColor  = activePoints[0]._model.backgroundColor;
                            app.lipliner(window.liplinerColor, window.liplinerAmount);
                            chartClick(which, activePoints[0]._model.backgroundColor)
                        }
                    }
                }

            });
        } else if (which == 'eyeshadow') {
            destory(chart4)
            chart4 = new Chart(eyeshadowChart, {
                type: 'bubble',
                data: {
                    datasets: [
                        {
                            data: data,
                            backgroundColor: color,
                            hoverBackgroundColor: color
                        }]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            display: false,
                            ticks: {
                                min: -0.5,
                                max: (color.length + 1)
                            }
                        }],
                        yAxes: [{
                            display: false
                        }],
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    },
                    onClick: function (evt) {

                        var activePoints = chart4.getElementsAtEvent(evt);
                        if (activePoints[0]) {
                            var lipc = JSON.parse(localStorage.getItem('eye_colors'));
                            //document.getElementById("shade_show").innerHTML = lipc[activePoints[0]['_index']]['name'];
                            //document.getElementById("show_shade_no").innerHTML = lipc[activePoints[0]['_index']]['shade_no'];
                            //document.getElementById("shade_color").style.background = lipc[activePoints[0]['_index']]['color_code']; window.eyeshadowColor = activePoints[0]._model.backgroundColor
							window.eyeshadowColor  = activePoints[0]._model.backgroundColor;
                            app.eyeshadow(window.eyeshadowColor, window.eyeshadowAmount, window.eyeshadowSize);
                            chartClick(which, activePoints[0]._model.backgroundColor)
                        }
                    }
                }

            });
        } else if (which == 'eyeliner') {
            destory(chart5)
            chart5 = new Chart(eyelinerChart, {
                type: 'bubble',
                data: {
                    datasets: [
                        {
                            data: data,
                            backgroundColor: color,
                            hoverBackgroundColor: color
                        }]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            display: false,
                            ticks: {
                                min: -0.5,
                                max: (color.length + 1)
                            }
                        }],
                        yAxes: [{
                            display: false
                        }],
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    },
                    onClick: function (evt) {

                        var activePoints = chart5.getElementsAtEvent(evt);
                        if (activePoints[0]) {
                            var lipc = JSON.parse(localStorage.getItem('eye_colors'));
                            //document.getElementById("shade_show").innerHTML = lipc[activePoints[0]['_index']]['name'];
                            //document.getElementById("show_shade_no").innerHTML = lipc[activePoints[0]['_index']]['shade_no'];
                            //document.getElementById("shade_color").style.background = lipc[activePoints[0]['_index']]['color_code']; window.eyelinerColor = activePoints[0]._model.backgroundColor
							window.eyelinerColor  = activePoints[0]._model.backgroundColor;
                            app.eyeliner(window.eyelinerColor, window.eyelinerAmount, window.eyelinerSize);
                            chartClick(which, activePoints[0]._model.backgroundColor)
                        }
                    }
                }

            });
        } else if (which == 'eyebrow') {
            destory(chart6)
            chart6 = new Chart(eyebrowChart, {
                type: 'bubble',
                data: {
                    datasets: [
                        {
                            data: data,
                            backgroundColor: color,
                            hoverBackgroundColor: color
                        }]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            display: false,
                            ticks: {
                                min: -0.5,
                                max: (color.length + 1)
                            }
                        }],
                        yAxes: [{
                            display: false
                        }],
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    },
                    onClick: function (evt) {

                        var activePoints = chart6.getElementsAtEvent(evt);
                        if (activePoints[0]) {
                            var lipc = JSON.parse(localStorage.getItem('eye_colors'));
                            //document.getElementById("shade_show").innerHTML = lipc[activePoints[0]['_index']]['name'];
                            //document.getElementById("show_shade_no").innerHTML = lipc[activePoints[0]['_index']]['shade_no'];
                            //document.getElementById("shade_color").style.background = lipc[activePoints[0]['_index']]['color_code']; window.eyebrowColor = activePoints[0]._model.backgroundColor
							window.eyebrowColor  = activePoints[0]._model.backgroundColor;
                            app.eyebrow(window.eyebrowColor, window.eyebrowAmount, window.eyebrowSize);
                            chartClick(which, activePoints[0]._model.backgroundColor)
                        }
                    }
                }

            });
        } else if (which == 'foundation') {
            destory(chart7)
            chart7 = new Chart(foundationChart, {
                type: 'bubble',
                data: {
                    datasets: [
                        {
                            data: data,
                            backgroundColor: color,
                            hoverBackgroundColor: color
                        }]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            display: false,
                            ticks: {
                                min: -0.5,
                                max: (color.length + 1)
                            }
                        }],
                        yAxes: [{
                            display: false
                        }],
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    },
                    onClick: function (evt) {

                        var activePoints = chart7.getElementsAtEvent(evt);
                        if (activePoints[0]) {
                            var lipc = JSON.parse(localStorage.getItem('face_colors'));
                            //document.getElementById("shade_show").innerHTML = lipc[activePoints[0]['_index']]['name'];
                            //document.getElementById("show_shade_no").innerHTML = lipc[activePoints[0]['_index']]['shade_no'];
                            //document.getElementById("shade_color").style.background = lipc[activePoints[0]['_index']]['color_code']; window.facefoundationColor = activePoints[0]._model.backgroundColor;
							window.facefoundationColor  = activePoints[0]._model.backgroundColor;
                            app.foundation(window.facefoundationColor, window.facefoundationAmount);
                            chartClick(which, activePoints[0]._model.backgroundColor)
                        }
                    }
                }

            });
        } else if (which == 'concealer') {
            destory(chart8)
            chart8 = new Chart(concealerChart, {
                type: 'bubble',
                data: {
                    datasets: [
                        {
                            data: data,
                            backgroundColor: color,
                            hoverBackgroundColor: color
                        }]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            display: false,
                            ticks: {
                                min: -0.5,
                                max: (color.length + 1)
                            }
                        }],
                        yAxes: [{
                            display: false
                        }],
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    },
                    onClick: function (evt) {

                        var activePoints = chart8.getElementsAtEvent(evt);
                        if (activePoints[0]) {
                            var lipc = JSON.parse(localStorage.getItem('face_colors'));
                            //document.getElementById("shade_show").innerHTML = lipc[activePoints[0]['_index']]['name'];
                            //document.getElementById("show_shade_no").innerHTML = lipc[activePoints[0]['_index']]['shade_no'];
                            //document.getElementById("shade_color").style.background = lipc[activePoints[0]['_index']]['color_code']; window.faceconcealerColor = activePoints[0]._model.backgroundColor;
							window.faceconcealerColor  = activePoints[0]._model.backgroundColor;
                            app.concealer(window.faceconcealerColor, window.faceconcealerAmount);
                            chartClick(which, activePoints[0]._model.backgroundColor)
                        }
                    }
                }

            });
        } else if (which == 'blush') {
            destory(chart9)
            chart9 = new Chart(blushChart, {
                type: 'bubble',
                data: {
                    datasets: [
                        {
                            data: data,
                            backgroundColor: color,
                            hoverBackgroundColor: color
                        }]
                },
                options: {
                    responsive: true,
                    scales: {
                        xAxes: [{
                            display: false,
                            ticks: {
                                min: -0.5,
                                max: (color.length + 1)
                            }
                        }],
                        yAxes: [{
                            display: false
                        }],
                    },
                    legend: {
                        display: false
                    },
                    tooltips: {
                        enabled: false
                    },
                    onClick: function (evt) {

                        var activePoints = chart9.getElementsAtEvent(evt);
                        if (activePoints[0]) {
                            var lipc = JSON.parse(localStorage.getItem('face_colors'));
                            //document.getElementById("shade_show").innerHTML = lipc[activePoints[0]['_index']]['name'];
                            //document.getElementById("show_shade_no").innerHTML = lipc[activePoints[0]['_index']]['shade_no'];
                            //document.getElementById("shade_color").style.background = lipc[activePoints[0]['_index']]['color_code']; window.faceblushColor = activePoints[0]._model.backgroundColor;
							window.faceblushColor  = activePoints[0]._model.backgroundColor;
                            app.blush(window.faceblushColor, window.faceblushAmount);
                            chartClick(which, activePoints[0]._model.backgroundColor)
                        }
                    }
                }

            });
        }
        app.eventTrigger('onChartChange', {
            detail: {
                chart: which,
                color: color
            }
        })

    }

    app.clearCanvas = function (canvas) {
        mainCanvas.clear();
        function clr(canvasId) {
            var canvas = document.getElementById(canvasId);
            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        canvas.forEach(function (canvas) {
            clr(canvas);
        })
    }
    app.cropImg = function (img) {
        $('#loading-modal').modal('hide');
        $('#face-crop').modal('show');
        $('#crop-image').attr('src', img);
        var $cropp = $('#crop-image');
        var options = {
            aspectRatio: 1 / 1,
            rotatable: false,
            zoomable: false,
            autoCropArea: 0.95,
        }
        if (!$cropp.data('cropper')) {
            setTimeout(function () {
                $cropp.cropper(options).cropper('reset');
            }, 200)
        } else {
            setTimeout(function () {
                $cropp.cropper('destroy').attr('src', img).cropper(options).cropper('reset');
            }, 200)
        }




        $('body').on('click', '.nxt-btn-0', function () {
            var data = $cropp.cropper('getCroppedCanvas', {
                fillColor: '#fff',
                imageSmoothingEnabled: false,
                imageSmoothingQuality: 'high',
            }).toDataURL(function (data) {
                return data;
            })
            app.drawMain(data);
            $('#face-crop').modal('hide');
            $('#loading-modal').modal('show');
        });
        /*$('#face-crop').on('hidden.bs.modal', function (e) {
            $cropp.destroy();
        });*/

    }
    app.upload = function (selector) {
        var fileList, fileIndex;
        function handleFileSelect(evt) {
            $('#loading-modal').modal('show');
            app.clearCanvas(['pc', 'pcLay']);
            var files = evt.target.files;
            fileList = [];
            for (var i = 0; i < files.length; i++) {
                if (!files[i].type.match('image.*')) {
                    continue;
                }
                fileList.push(files[i]);
            }
            if (files.length > 0) {
                fileIndex = 0;
            }

            app.getImagedata(fileList[0], true)
            $('#' + selector).val('');
        }
        if (window.File && window.FileReader && window.FileList) {
            document.getElementById(selector).addEventListener('change', handleFileSelect, false);
        }
    }

    app.getImagedata = function (file, crop) {
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                var data = e.target.result;
                if (crop) {
                    app.cropImg(data);
                }

            };
        })(file);
        reader.readAsDataURL(file);
    }
    app.drawFace = function (canvas, sourceCanvas) {
        var c = document.getElementById(canvas);
        c.width = app.config.canvasW;
        c.height = app.config.canvasH;
        var cc = c.getContext('2d');
        cc.drawImage(document.getElementById(sourceCanvas), 0, 0);
        if (canvas == 'pc') {
            app.findFace(document.getElementById(canvas));
        }
    }

    app.findFace = function (el) {
        $('#pc').css('visibility', 'hidden');
        $('#face-correct').modal('show');
        sBox = $('#pc');
        var options = {
            aspectRatio: 1 / 1,
            crop: function (e) {
                box = [e.x, e.y, e.width, e.height];
            },
            autoCrop: true,
            autoCropArea: 0.4,
            rotatable: false,
            zoomable: false,
            scalable: false,
            toggleDragModeOnDblclick: false,
        }
        setTimeout(function () {
            sBox.cropper('destroy').cropper(options).cropper('reset');
            $('#loading-modal').modal('hide');
            $('#pc').css('visibility', '');
        }, 200);
    }

    app.drawMain = function (img, clearAll) {
        orgImg = img;
        fabric.Image.fromURL(img, function (img) {
            var scale = Math.min(mainCanvas.width / img.width, mainCanvas.height / img.height);
            offsetX = Math.max((mainCanvas.width - img.width * scale) / 2.0, 0);
            offsetY = Math.max((mainCanvas.height - img.height * scale) / 2.0, 0);
            img.scale(scale);

            img.left = offsetX;
            img.top = offsetY;
            img.evented = false;
            img.selectable = false;
            img.hasControls = false;
            img.hasBorders = false;
            img.name = "orginal-img";

            if (config.waterMark) {
                var waterMark1 = new fabric.Text(config.waterMarkText1, {
                    fill: '#50E6B6',
                    fontSize: 12,
                });
                mainCanvas.add(waterMark1);
                var waterMark2 = new fabric.Text(config.waterMarkText2, {
                    left: waterMark1.getBoundingRectWidth(),
                    fill: '#CACACA',
                    fontSize: 12,
                });
                var waterMarkgroup = new fabric.Group([waterMark1, waterMark2], {
                    left: offsetX + 5,
                    top: offsetY + 5,
                    selectable: false,
                    hasControls: false,
                    hasBorders: false
                });

            }

            mainCanvas.add(img);
            orgCan.add(img);
            mainCanvas.add(waterMarkgroup)
            img.sendToBack();
            mainCanvas.centerObject(img);
            mainCanvas.backgroundColor = 'rgb(255,255,255)';
            mainCanvas.renderAll();
            orgCan.centerObject(img);
            orgCan.backgroundColor = 'rgb(255,255,255)';
            orgCan.renderAll();
            if (!clearAll) {
                app.drawFace('pc', app.config.canvas);
            }

        });
    }
    app.fetchDataPoints = function (data) {
        return new Promise(function (resolve, reject) {
            if (data.length > 0) {
                //face cordex
                app.config.facePoint.push(
                    { x: data[0][0], y: data[0][1] },
                    // {x: data[2][0], y: data[2][1]},
                    { x: data[3][0], y: data[3][1] },
                    { x: data[7][0], y: data[7][1] },
                    { x: data[11][0], y: data[11][1] },
                    //  {x: data[12][0], y: data[12][1]},
                    { x: data[14][0], y: data[14][1] },
                    { x: data[14][0] - 20, y: data[14][1] - 40 },
                    { x: data[33][0], y: data[33][1] - 70 },
                    { x: data[0][0] + 20, y: data[0][1] - 40 }
                )
                //lip
                app.config.lipPoint.push(
                    { x: data[44][0], y: data[44][1] },
                    { x: data[46][0], y: data[46][1] },
                    { x: data[47][0], y: data[47][1] },
                    { x: data[48][0], y: data[48][1] },
                    { x: data[50][0], y: data[50][1] },
                    { x: data[52][0], y: data[52][1] },
                    //{x: data[53][0], y: data[53][1]},
                    { x: data[54][0], y: data[54][1] }
                )
                //lipOpen
                app.config.lipOpenPoint.push(
                    { x: data[44][0] + 5, y: data[44][1] },
                    //{x: data[61][0], y: data[61][1]},
                    { x: data[60][0], y: data[60][1] },
                    //{x: data[59][0], y: data[59][1]},
                    { x: data[50][0] - 5, y: data[50][1] },
                    //{x: data[58][0], y: data[58][1]},
                    { x: data[57][0], y: data[57][1] }
                    //{x: data[56][0], y: data[56][1]}
                )
                //leftEye
                app.config.leftEyePoint.push(
                    { x: data[23][0], y: data[23][1] },
                    //{x: data[63][0], y: data[63][1]},
                    { x: data[24][0], y: data[24][1] },
                    //{x: data[64][0], y: data[64][1]},
                    { x: data[25][0], y: data[25][1] },
                    //{x: data[65][0], y: data[65][1]},
                    { x: data[26][0], y: data[26][1] }
                    //{x: data[66][0], y: data[66][1]}
                )
                //rightEye
                app.config.rightEyePoint.push(
                    { x: data[30][0], y: data[30][1] },
                    //{x: data[68][0], y: data[68][1]},
                    { x: data[29][0], y: data[29][1] },
                    //{x: data[67][0], y: data[67][1]},
                    { x: data[28][0], y: data[28][1] },
                    // {x: data[70][0], y: data[70][1]},
                    { x: data[31][0], y: data[31][1] }
                    // {x: data[69][0], y: data[69][1]}
                )
                //leftEyebrow
                app.config.leftEyeBrowPoint.push(
                    { x: data[19][0], y: data[19][1] },
                    { x: data[20][0], y: data[20][1] },
                    { x: data[21][0], y: data[21][1] },
                    { x: data[22][0], y: data[22][1] }
                )
                //rightEyebrow
                app.config.rightEyeBrowPoint.push(
                    { x: data[18][0], y: data[18][1] },
                    { x: data[17][0], y: data[17][1] },
                    { x: data[16][0], y: data[16][1] },
                    { x: data[15][0], y: data[15][1] }
                )
                app.config.nosePoint.push(
                    { x: data[35][0], y: data[35][1] },
                    { x: data[39][0], y: data[39][1] }
                )
                resolve('success');
            } else {
                reject(Error('error'))
            }
        })


    }

    app.drawPoints = function (part, closePath) {
        var pts = [];

        for (var i = 0; i <= part.length - 1; i++) {
            pts.push(part[i].x, part[i].y);
        }

        var canvas = document.getElementById('Lay');
        var ref_canvas = document.getElementById('Lay-ref');
        var prv_canvas = document.getElementById('prv');
        var prv_2_canvas = document.getElementById('prv-2');

        var ref_ctx = ref_canvas.getContext("2d");
        var ctx = canvas.getContext("2d");
        var prv_ctx = prv_canvas.getContext("2d");
        var prv_ctx_2 = prv_2_canvas.getContext("2d");

        var canvas2 = document.createElement('canvas');
        canvas2.width = app.config.canvasW;
        canvas2.height = app.config.canvasH;

        var ref_canvas2 = document.createElement('canvas');
        ref_canvas2.width = app.config.canvasW;
        ref_canvas2.height = app.config.canvasH;

        var ref_ctx2 = ref_canvas2.getContext("2d");
        var ctx2 = canvas2.getContext("2d");

        drawRef(0)
        function drawRef(index) {
            ref_ctx2.setTransform(1, 0, 0, 1, 0, 0);
            ref_ctx2.transform(1, 0, 0, 1, -part[index].x, -part[index].y);
            ref_ctx2.scale(2, 2);

            ctx2.setTransform(1, 0, 0, 1, 0, 0);
            ctx2.transform(1, 0, 0, 1, -part[index].x, -part[index].y);
            ctx2.scale(2, 2);

            ref_ctx.drawImage(document.getElementById('pc'), 0, 0);
            ref_ctx2.drawImage(document.getElementById('pc'), 0, 0);
        }



        var w = canvas.width, h = canvas.height, isDown = false, pIndex = -1;
        //pts = [];

        setCanvas();
        function setCanvas() {
            ctx.lineJoin = 'miter';
            ctx2.lineJoin = 'miter';
            renderCurve(ctx, 0)
            renderCurve(ctx2, 0)
        }

        canvas.onmousedown = function (e) {
            var pos = getPos(e),
                i = 0,
                m = 5;

            pIndex = -1;
            isDown = false;

            for (; i < pts.length; i += 2) {
                if (pos.x >= pts[i] - m && pos.x < pts[i] + m &&
                    pos.y >= pts[i + 1] - m && pos.y < pts[i + 1] + m) {
                    isDown = true;
                    pIndex = i;
                }
            }
            if (pIndex != -1) {
                drawRef(pIndex / 2);
            }
        };
        // Set up touch events for mobile, etc
        canvas.addEventListener("touchstart", function (e) {
            var pos = getTouchPos(canvas, e);
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        }, false);
        canvas.addEventListener("touchend", function (e) {
            var mouseEvent = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(mouseEvent);
        }, false);
        canvas.addEventListener("touchmove", function (e) {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
        }, false);

        // Get the position of a touch relative to the canvas
        function getTouchPos(canvasDom, touchEvent) {
            var rect = canvasDom.getBoundingClientRect();
            return {
                x: touchEvent.touches[0].clientX - rect.left,
                y: touchEvent.touches[0].clientY - rect.top
            };
        }

        canvas.onmousemove = function (e) {
            if (isDown) {
                var pos = getPos(e);
                $('#point-ref-prev').show();
                $('#point-ref-prev').attr('style', 'position:absolute;z-index:99999;bottom:0px;border: 2px solid #fff;border-radius: 4px;box-shadow: 1px -1px 4px;');
                pts[pIndex] = pos.x;
                pts[pIndex + 1] = pos.y;
                renderCurve(ctx, pIndex)
                renderCurve(ctx2, pIndex)
            }
        };

        canvas.onmouseup = function () {
            isDown = false;
            $('#point-ref-prev').hide();
        };

        function getPos(e) {
            var r = canvas.getBoundingClientRect();
            return { x: e.clientX - r.left, y: e.clientY - r.top }
        }

        /*
         *	Draw curve with current settings and points
         */
        function renderCurve(ctx, pIndex) {
            //prv_ctx.clearRect(0, 0, 300, 300);

            ctx.clearRect(0, 0, w, h);
            ctx.beginPath();
            ctx.moveTo(pts[0], pts[1]);
            ctx.curve(pts, 0.5, 10, closePath ? true : false);
            //ctx.closePath();
            ctx.strokeStyle = '#6677cc';
            ctx.lineWidth = 1;
            ctx.fillStyle = 'rgba(255,86,86,0.3)';
            if (closePath) {
                ctx.fill();
            }
            ctx.stroke();

            // show original points

            var l = pts.length - 2;
            ctx.lineWidth = 1;
            ctx.strokeStyle = 'rgba(0,0,0,1)';
            ctx.beginPath();
            var a = 0;
            for (var i = 0; i <= l; i += 2) {
                if (i == 0) {
                    ctx.rect(pts[i] - 2, pts[1] - 2, 4, 4)
                } else {
                    ctx.rect(pts[i] - 2, pts[i + 1] - 2, 4, 4);
                }
                part[a] = { 'x': pts[i], 'y': pts[i + 1] };
                a++;
            }
            ctx.stroke();
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.fill();
            prv_ctx.clearRect(0, 0, 250, 250);
            prv_ctx_2.clearRect(0, 0, 250, 250);
            prv_ctx.drawImage(ref_canvas2, part[pIndex / 2].x - 40, part[pIndex / 2].y - 40, 250, 250, 0, 0, 250, 250);
            prv_ctx_2.drawImage(canvas2, part[pIndex / 2].x - 40, part[pIndex / 2].y - 40, 250, 250, 0, 0, 250, 250);
        }


    }
    var p = 1;
    app.findLandmark = function (el, box) {
        // var progressEl = $('.landmark-progress');
        $('.loading-text').html("Please wait..! Landmark Analyze is processing..! Don't Change window..! ")
        $('#loading-modal').modal('show');
        $('.landmark-progress-cont').removeClass('hidden').show();
        var overlay = document.getElementById('pcLay');
        var overlayCC = overlay.getContext('2d');
        var count = 0;
        function drawLoop() {
            drawRequest = requestAnimFrame(drawLoop);
            overlayCC.clearRect(0, 0, 720, 576);
            count = count == 100 ? 99 : count;
            // progressEl.attr('aria-valuenow', count);
            // progressEl.css('width', count + '%');
            // progressEl.html(count + '%');
            count++;

            try {
                if (faceTrack.getCurrentPosition()) {
                    faceTrack.draw(overlay);
                }
            } catch (e) {
                //alert("Can't find face on your image..! Try selecting the face in the image manually.")
            }

        }
        function emptyPoints() {
            app.config.facePoint = [];
            app.config.lipPoint = [];
            app.config.lipOpenPoint = [];
            app.config.leftEyePoint = [];
            app.config.rightEyePoint = [];
            app.config.leftEyeBrowPoint = [];
            app.config.rightEyeBrowPoint = [];
        }
        if (!app.config.manualPoints) {
            faceTrack.reset();

            faceTrack.start(el, box);
            drawLoop();

            // detect if tracker fails to find a face
            var l = 0;
            function notFount() {
                if (l == 0) {
                    count = 0;
                    faceTrack.stop();
                    setTimeout(function () {
                        $('#loading-modal').modal('hide');
                        alert("Can't find face on your image..! Try to adjust rectangle in image..! Cover up with eyes and mouth, not entire face..!")
                        $('#face-correct').modal('show');
                    }, 500);


                    document.removeEventListener("facetrackrNotFound", function (event) {
                        notFount()
                    }, false);
                    document.removeEventListener("facetrackrLost", function (event) {
                        notFount()
                    }, false);
                }
                l++;
            }
            document.addEventListener("facetrackrNotFound", function (event) {
                notFount();
            }, false);

            // detect if tracker loses tracking of face
            document.addEventListener("facetrackrLost", function (event) {
                notFount();
            }, false);
            window.addEventListener('error', function (event) {
                var err = event.message.match("Cannot read property");
                if (err) {
                    notFount();
                }
            })


            document.addEventListener("facetrackrConverged", function (event) {
                console.log(p)

                if (p == 1) {
                    count = 100;
                    cancelRequestAnimFrame(drawRequest);
                    var data = faceTrack.getCurrentPosition();
                    emptyPoints();
                    app.fetchDataPoints(data)
                        .then
                        (function () {
                           $('.nxt-btn-2').trigger('click');
                           $('#point-correct').modal('show');
                            $('#loading-modal').modal('hide');
                            $('#makeoverkit-upload-area').hide();
                            $('#makeoverkit-work-area').show();
                            var canvasWrapper1 = document.getElementById('edit-Wrapper');
                            $(canvasWrapper1).mousedown(startPan);

                        });
                    p++;
                }
            }, false);
        }
    }



    app.drawLayer = function (ctx, partPoint, close) {
        var pts = [];

        for (var i = 0; i <= partPoint.length - 1; i++) {
            pts.push(partPoint[i].x, partPoint[i].y);
        }
        ctx.beginPath();
        ctx.moveTo(partPoint[0].x, partPoint[0].y);
        ctx.curve(pts, 0.5, 30, close ? true : false);
    }
    app.drawBlur = function (sourceCanvas, blurX, blurY, quty) {
        var stage = new createjs.Stage(sourceCanvas);
        var bitmap = new createjs.Bitmap(sourceCanvas);
        var blurFilter = new createjs.BlurFilter(blurX, blurY, quty);
        bitmap.filters = [blurFilter];
        bitmap.cache(0, 0, 450, 450);
        stage.addChild(bitmap);
        stage.update();
    }

    app.drawLayerToMain = function (sourceCanvas, renderCanvas, opacity, layerName, blendMode) {
        var layer = new fabric.Image(sourceCanvas);
        layer.opacity = opacity;
        layer.selectable = false;
        layer.globalCompositeOperation = blendMode;
        layer.name = layerName;
        renderCanvas.add(layer);
        renderCanvas.renderAll();
    }
    app.removeLayerFromMain = function (canvas, objectName) {
        if (canvas) {
            try {
                $.each(canvas.getObjects(), function (index, obj) {
                    if (obj === null)
                        return;
                    $.each(obj, function (attr, value) {
                        if (value === objectName) {
                            canvas.remove(canvas._objects[index]);
                            return false;
                        }
                    });
                });
            } catch (e) {

            }
            canvas.renderAll();
        }
    }
    //undo redo functions
    app.undoManager = function (target, func, value, calbke) {
        undoManager.beginGrouping(UndoManager.COALESCE_MODE.CONSECUTIVE_DUPLICATES);
        undoManager.registerUndoAction(target, func, value, { type: calbke });
        updateButtons();
        undoManager.endGrouping();
    }
    var undoVal = {
        lipstick: { color: 'rgba(0,0,0,0)', amount: 0 },
        lipliner: { color: 'rgba(0,0,0,0)', amount: 0 },
        lipgloss: { color: 'rgba(0,0,0,0)', amount: 0 },
        eyeshadow: { color: 'rgba(0,0,0,0)', amount: 0, size: 0 },
        eyeliner: { color: 'rgba(0,0,0,0)', amount: 0, size: 0 },
        eyebrow: { color: 'rgba(0,0,0,0)', amount: 0, size: 0 },
        foundation: { color: 'rgba(0,0,0,0)', amount: 0 },
        concealer: { color: 'rgba(0,0,0,0)', amount: 0 },
        blush: { color: 'rgba(0,0,0,0)', amount: 0 },
    }
    function setUndoVal(p, c, a, s) {
        s != null ? undoVal[p] = { color: c, amount: a, size: s } : undoVal[p] = { color: c, amount: a };
    }
    function getUndoVal(p) {
        var vals = [];
        if (undoVal[p].size != null) {
            vals.push(undoVal[p].color);
            vals.push(undoVal[p].amount);
            vals.push(undoVal[p].size)
            return vals;
        } else {
            vals.push(undoVal[p].color);
            vals.push(undoVal[p].amount);
            return vals;
        }

    }
    function onMakeup(which, color) {
        app.eventTrigger('onMakeupApply', {
            'detail': {
                which: which,
                color: color
            }
        })
    }
    /*
     * 
     *lipstick
     */
    app.lipstick = function (color, amount) {
        $('#' + config.lipstickAmtSlider).slider({ value: amount * 10 });
        app.undoManager(this, app.lipstick, getUndoVal('lipstick'), 'lipstick');
        setUndoVal('lipstick', color, amount);
        var lipstick_canvas = document.createElement('canvas');
        lipstick_canvas.width = app.config.canvasW;
        lipstick_canvas.height = app.config.canvasH;
        var ctx = lipstick_canvas.getContext("2d");
        ctx.clearRect(0, 0, app.config.canvasW, app.config.canvasH);
        app.drawLayer(ctx, app.config.lipPoint, true);
        if (color) {
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
        } else {
            ctx.fillStyle = "rgba(0,0,0,0)";
            ctx.strokeStyle = "rgba(0,0,0,0)";
        }
        ctx.fill();
        if (mouthOpen) {
            ctx.globalCompositeOperation = 'destination-out';
            app.drawLayer(ctx, app.config.lipOpenPoint, true);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        }
        app.drawBlur(lipstick_canvas, 2, 2, 2)
        app.removeLayerFromMain(mainCanvas, "libstick_layer");
        app.drawLayerToMain(lipstick_canvas, mainCanvas, amount, "libstick_layer", "soft-light");
        onMakeup('lipstick', color)
    }
    /*
     * lipgloss
     */
    app.lipgloss = function (color, amount) {
        $('#' + config.lipglossAmtSlider).slider({ value: amount * 10 });
        app.undoManager(this, app.lipgloss, getUndoVal('lipgloss'), 'lipgloss');
        setUndoVal('lipgloss', color, amount);
        app.removeLayerFromMain(mainCanvas, "libgloss_layer");
        var lipgloss_canvas = document.createElement('canvas');
        lipgloss_canvas.width = app.config.canvasW;
        lipgloss_canvas.height = app.config.canvasH;
        var ctx = lipgloss_canvas.getContext("2d");
        ctx.clearRect(0, 0, app.config.canvasW, app.config.canvasH);
        app.drawLayer(ctx, app.config.lipPoint, true);
        if (color) {
            ctx.fillStyle = color;
        } else {
            ctx.fillStyle = "rgba(0,0,0,0)";
            ctx.strokeStyle = "rgba(0,0,0,0)";
        }
        ctx.fill();
        if (mouthOpen) {
            ctx.globalCompositeOperation = 'destination-out';
            app.drawLayer(ctx, app.config.lipOpenPoint, true);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        }
        app.drawLayerToMain(lipgloss_canvas, mainCanvas, amount, "libgloss_layer", "overlay");
        onMakeup('lipgloss', color)
    }
    /*
     * lipliner
     */
    app.lipliner = function (color, amount) {
        $('#' + config.liplinerAmtSlider).slider({ value: amount * 10 });
        app.undoManager(this, app.lipliner, getUndoVal('lipliner'), 'lipliner');
        setUndoVal('lipliner', color, amount);
        app.removeLayerFromMain(mainCanvas, "lipliner_layer");
        var lipliner_canvas = document.createElement('canvas');
        lipliner_canvas.width = app.config.canvasW;
        lipliner_canvas.height = app.config.canvasH;
        var ctx = lipliner_canvas.getContext("2d");
        ctx.clearRect(0, 0, app.config.canvasW, app.config.canvasH);
        app.drawLayer(ctx, app.config.lipPoint, true);
        if (color) {
            ctx.strokeStyle = color;
        } else {
            ctx.strokeStyle = "rgba(0,0,0,0)";
        }
        ctx.lineWidth = 1;
        ctx.stroke();
        if (mouthOpen) {
            ctx.globalCompositeOperation = 'destination-out';
            app.drawLayer(ctx, app.config.lipOpenPoint, true);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over';
        }
        app.drawBlur(lipliner_canvas, 1, 1, 2)
        app.drawLayerToMain(lipliner_canvas, mainCanvas, amount, "lipliner_layer", "normal");
        onMakeup('lipliner', color)
    }

    /*
     * eyeshadow
     */
    app.eyeshadow = function (color, amount, size) {
        $('#' + config.eyeshadowAmtSlider).slider({ value: amount * 10 });
        $('#' + config.eyeshadowSizeSlider).slider({ value: size });
        app.undoManager(this, app.eyeshadow, getUndoVal('eyeshadow'), 'eyeshadow');
        setUndoVal('eyeshadow', color, amount, size);
        app.removeLayerFromMain(mainCanvas, "eyeshadow_layer");
        var eyeshadow_canvas = document.createElement('canvas');
        eyeshadow_canvas.width = app.config.canvasW;
        eyeshadow_canvas.height = app.config.canvasH;
        var ctx = eyeshadow_canvas.getContext("2d");

        ctx.clearRect(0, 0, app.config.canvasW, app.config.canvasH);

        var drawValue = size;
        function draw_leftEye() {
            ctx.beginPath();
            ctx.moveTo(app.config.leftEyePoint[0].x - size / 2, app.config.leftEyePoint[0].y - size / 2);
            var pts = [
                app.config.leftEyePoint[0].x - size / 2, app.config.leftEyePoint[0].y - size / 2,
                app.config.leftEyePoint[1].x, app.config.leftEyePoint[1].y - size / 2,
                app.config.leftEyePoint[2].x, app.config.leftEyePoint[2].y,
                app.config.leftEyePoint[3].x, app.config.leftEyePoint[3].y,
            ]
            ctx.curve(pts, 0.5, 30, true);
        }
        draw_leftEye();

        if (color) {
            ctx.fillStyle = color;
        } else {
            ctx.fillStyle = "rgba(0,0,0,0)";
            ctx.strokeStyle = "rgba(0,0,0,0)";
        }
        ctx.fill();
        ctx.globalCompositeOperation = 'destination-out';
        app.drawLayer(ctx, app.config.leftEyePoint, true);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        function draw_rightEye() {
            ctx.beginPath();
            ctx.moveTo(app.config.rightEyePoint[2].x + size / 2, app.config.rightEyePoint[2].y - size / 2);
            var pts = [
                app.config.rightEyePoint[2].x + size / 2, app.config.rightEyePoint[2].y - size / 2,
                app.config.rightEyePoint[1].x, app.config.rightEyePoint[1].y - size / 2,
                app.config.rightEyePoint[0].x, app.config.rightEyePoint[0].y,
                app.config.rightEyePoint[3].x, app.config.rightEyePoint[3].y,
            ]
            ctx.curve(pts, 0.5, 30, true);
        }
        draw_rightEye();
        ctx.fill();
        ctx.globalCompositeOperation = 'destination-out';
        app.drawLayer(ctx, app.config.rightEyePoint, true);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        app.drawBlur(eyeshadow_canvas, 10, 10, 4)
        app.drawLayerToMain(eyeshadow_canvas, mainCanvas, amount, "eyeshadow_layer", "multiply");
        onMakeup('eyeshadow', color)
    }
    /*
     * eyeliner
     */

    app.eyeliner = function (color, amount, size) {
        $('#' + config.eyelinerAmtSlider).slider({ value: amount * 10 });
        $('#' + config.eyelinerSizeSlider).slider({ value: size });
        app.undoManager(this, app.eyeliner, getUndoVal('eyeliner'), 'eyeliner');
        setUndoVal('eyeliner', color, amount, size);
        app.removeLayerFromMain(mainCanvas, "eyeliner_layer");
        var eyeliner_canvas = document.createElement('canvas');
        eyeliner_canvas.width = app.config.canvasW;
        eyeliner_canvas.height = app.config.canvasH;
        var ctx = eyeliner_canvas.getContext("2d");
        ctx.clearRect(0, 0, app.config.canvasW, app.config.canvasH);

        var drawValue = size;
        function draw_leftEye() {
            ctx.beginPath();
            ctx.moveTo(app.config.leftEyePoint[0].x - size / 2, app.config.leftEyePoint[0].y - size / 2);
            var pts = [
                app.config.leftEyePoint[0].x - size / 2, app.config.leftEyePoint[0].y - size / 2,
                app.config.leftEyePoint[1].x, app.config.leftEyePoint[1].y - size / 2,
                app.config.leftEyePoint[2].x, app.config.leftEyePoint[2].y,
                app.config.leftEyePoint[3].x, app.config.leftEyePoint[3].y,
            ]
            ctx.curve(pts, 0.5, 30, true);
        }
        draw_leftEye();

        if (color) {
            ctx.fillStyle = color;
        } else {
            ctx.fillStyle = "rgba(0,0,0,0)";
            ctx.strokeStyle = "rgba(0,0,0,0)";
        }
        ctx.fill();
        ctx.globalCompositeOperation = 'destination-out';
        app.drawLayer(ctx, app.config.leftEyePoint, true);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        function draw_rightEye() {
            ctx.beginPath();
            ctx.moveTo(app.config.rightEyePoint[2].x + size / 2, app.config.rightEyePoint[2].y - size / 2);
            var pts = [
                app.config.rightEyePoint[2].x + size / 2, app.config.rightEyePoint[2].y - size / 2,
                app.config.rightEyePoint[1].x, app.config.rightEyePoint[1].y - size / 2,
                app.config.rightEyePoint[0].x, app.config.rightEyePoint[0].y,
                app.config.rightEyePoint[3].x, app.config.rightEyePoint[3].y,
            ]
            ctx.curve(pts, 0.5, 30, true);
        }
        draw_rightEye();
        ctx.fill();
        ctx.globalCompositeOperation = 'destination-out';
        app.drawLayer(ctx, app.config.rightEyePoint, true);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';

        app.drawBlur(eyeliner_canvas, 1, 1, 2)
        app.drawLayerToMain(eyeliner_canvas, mainCanvas, amount, "eyeliner_layer", "multiply");
        onMakeup('eyeliner', color)
    }
    /*
     * eyebrow
     */
    app.eyebrow = function (color, amount, size) {
        //$('#' + config.eyebrowAmtSlider).slider({value: amount * 10});
        $('#' + config.eyebrowSizeSlider).slider({ value: size });
        app.undoManager(this, app.eyebrow, getUndoVal('eyebrow'), 'eyebrow');
        setUndoVal('eyebrow', color, amount, size);
        app.removeLayerFromMain(mainCanvas, "eyebrow_layer");
        var eyebrow_canvas = document.createElement('canvas');
        eyebrow_canvas.width = app.config.canvasW;
        eyebrow_canvas.height = app.config.canvasH;
        var ctx = eyebrow_canvas.getContext("2d");
        ctx.clearRect(0, 0, app.config.canvasW, app.config.canvasH);
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        app.drawLayer(ctx, app.config.leftEyeBrowPoint, false);
        ctx.stroke();
        app.drawLayer(ctx, app.config.rightEyeBrowPoint, false);
        ctx.stroke();
        app.drawBlur(eyebrow_canvas, 4, 4, 5)
        app.drawLayerToMain(eyebrow_canvas, mainCanvas, amount, "eyebrow_layer", "multiply");
        onMakeup('eyebrow', color)
    }
    /*
     * foundation
     */
    app.foundation = function (color, amount) {
        $('#' + config.foundationAmtSlider).slider({ value: amount * 10 });
        app.undoManager(this, app.foundation, getUndoVal('foundation'), 'foundation');
        setUndoVal('foundation', color, amount);
        app.removeLayerFromMain(mainCanvas, "foundation_layer");
        var foundation_canvas = document.createElement('canvas');
        foundation_canvas.width = app.config.canvasW;
        foundation_canvas.height = app.config.canvasH;
        var ctx = foundation_canvas.getContext("2d");
        ctx.clearRect(0, 0, app.config.canvasW, app.config.canvasH);
        app.drawLayer(ctx, app.config.facePoint, true);
        if (color) {
            ctx.fillStyle = color;
        } else {
            ctx.fillStyle = "rgba(0,0,0,0)";
            ctx.strokeStyle = "rgba(0,0,0,0)";
        }
        ctx.fill();

        ctx.globalCompositeOperation = 'destination-out';
        app.drawLayer(ctx, app.config.lipPoint, true);
        ctx.fill();
        var c = 10;
        var left = [
            { x: app.config.leftEyePoint[0].x, y: app.config.leftEyePoint[0].y + c },
            { x: app.config.leftEyePoint[3].x, y: app.config.leftEyePoint[3].y + c },
            { x: app.config.leftEyePoint[2].x, y: app.config.leftEyePoint[2].y + c },
            { x: app.config.leftEyeBrowPoint[3].x, y: app.config.leftEyeBrowPoint[3].y - c },
            { x: app.config.leftEyeBrowPoint[1].x, y: app.config.leftEyeBrowPoint[1].y - c },
            { x: app.config.leftEyeBrowPoint[0].x, y: app.config.leftEyeBrowPoint[0].y - c },
        ]
        app.drawLayer(ctx, left, true);
        ctx.fill();
        var right = [
            { x: app.config.rightEyePoint[0].x, y: app.config.rightEyePoint[0].y + c },
            { x: app.config.rightEyePoint[3].x, y: app.config.rightEyePoint[3].y + c },
            { x: app.config.rightEyePoint[2].x, y: app.config.rightEyePoint[2].y + c },
            { x: app.config.rightEyeBrowPoint[3].x, y: app.config.rightEyeBrowPoint[3].y - c },
            { x: app.config.rightEyeBrowPoint[1].x, y: app.config.rightEyeBrowPoint[1].y - c },
            { x: app.config.rightEyeBrowPoint[0].x, y: app.config.rightEyeBrowPoint[0].y - c },
        ]
        app.drawLayer(ctx, right, true);
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        app.drawBlur(foundation_canvas, 15, 15, 5)
        app.drawLayerToMain(foundation_canvas, mainCanvas, amount, "foundation_layer", "soft-light");
        onMakeup('foundation', color)
    }
    /*
     * concealer
     */
    app.concealer = function (color, amount) {
        $('#' + config.concealerAmtSlider).slider({ value: amount * 10 });
        app.undoManager(this, app.concealer, getUndoVal('concealer'), 'concealer');
        setUndoVal('concealer', color, amount);
        app.removeLayerFromMain(mainCanvas, "concealer_layer");
        var concealer_canvas = document.createElement('canvas');
        concealer_canvas.width = app.config.canvasW;
        concealer_canvas.height = app.config.canvasH;
        var ctx = concealer_canvas.getContext("2d");
        ctx.clearRect(0, 0, app.config.canvasW, app.config.canvasH);
        var con_left = [
            { x: app.config.leftEyePoint[0].x - 2, y: app.config.leftEyePoint[0].y + 2 },
            { x: app.config.leftEyePoint[3].x, y: app.config.leftEyePoint[3].y + 2 },
            { x: app.config.leftEyePoint[2].x + 2, y: app.config.leftEyePoint[2].y + 2 },
            { x: app.config.leftEyePoint[3].x, y: app.config.leftEyePoint[3].y + 25 },
        ]
        var con_right = [
            { x: app.config.rightEyePoint[0].x - 2, y: app.config.rightEyePoint[0].y + 2 },
            { x: app.config.rightEyePoint[3].x, y: app.config.rightEyePoint[3].y + 2 },
            { x: app.config.rightEyePoint[2].x + 2, y: app.config.rightEyePoint[2].y + 2 },
            { x: app.config.rightEyePoint[3].x, y: app.config.rightEyePoint[3].y + 25 },
        ]
        app.drawLayer(ctx, con_left, true);
        if (color) {
            ctx.fillStyle = color;
        } else {
            ctx.fillStyle = "rgba(0,0,0,0)";
            ctx.strokeStyle = "rgba(0,0,0,0)";
        }
        ctx.fill();
        app.drawLayer(ctx, con_right, true);
        ctx.fill();
        app.drawBlur(concealer_canvas, 8, 5, 3)
        app.drawLayerToMain(concealer_canvas, mainCanvas, amount, "concealer_layer", "soft-light");
        onMakeup('concealer', color)
    }
    /*
     * blush
     */
    app.blush = function (color, amount) {
        $('#' + config.blushAmtSlider).slider({ value: amount * 10 });
        app.undoManager(this, app.blush, getUndoVal('blush'), 'blush');
        setUndoVal('blush', color, amount);
        app.removeLayerFromMain(mainCanvas, "blush_layer");
        var blush_canvas = document.createElement('canvas');
        blush_canvas.width = app.config.canvasW;
        blush_canvas.height = app.config.canvasH;
        var ctx = blush_canvas.getContext("2d");
        ctx.clearRect(0, 0, app.config.canvasW, app.config.canvasH);
        function lineDistance(point1, point2) {
            var xs = 0;
            var ys = 0;

            xs = point2.x - point1.x;
            xs = xs * xs;

            ys = point2.y - point1.y;
            ys = ys * ys;

            return Math.sqrt(xs + ys);
        }
        function circle(ctx, r, cx, cy) {
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill()
            ctx.closePath();
        }
        function draw(p1x, p1y, p2x, p2y, p3x, p3y, i) {
            ctx.moveTo(p1x, p1y);
            ctx.curve([
                p1x, p1y,
                p2x, p2y,
                p3x, p3y
            ], 0, 25, true);
			
			
			ctx.bezierCurveTo(20, 100, 200, 100, 200, 20);
			

            var ox = (p1x + p2x + p3x) / 3;
            var oy = (p1y + p2y + p3y) / 3;

            var a = lineDistance({ x: p1x, y: p1y }, { x: p2x, y: p2y })
            var b = lineDistance({ x: p2x, y: p2y }, { x: p3x, y: p3y })
            var c = lineDistance({ x: p3x, y: p3y }, { x: p1x, y: p1y })

            var p = a + b + c
            var area = b / 2 * (p2y - p1y)
            var r = (2 * area) / p;
            circle(ctx, r - i, ox, oy)

        }
        draw(app.config.facePoint[0].x, app.config.facePoint[0].y, app.config.facePoint[1].x, app.config.facePoint[1].y, app.config.nosePoint[0].x, app.config.nosePoint[0].y, 0);
        draw(app.config.facePoint[4].x, app.config.facePoint[4].y, app.config.facePoint[3].x, app.config.facePoint[3].y, app.config.nosePoint[1].x, app.config.nosePoint[1].y, 3)
        app.drawBlur(blush_canvas, 15, 15, 5)
        app.drawLayerToMain(blush_canvas, mainCanvas, amount, "blush_layer", "soft-light");
        onMakeup('blush', color)
    }
    var initPrev = false;
    app.showPreview = function () {

        mainCanvas.deactivateAll().renderAll();
        $("#zoom-slider").slider({ value: 0 });

        $('#for-orginal').attr('height', app.config.canvasH);
        $('#for-orginal').attr('width', app.config.canvasW);

        $('#' + app.config.canvas).attr('height', app.config.canvasH);
        $('#' + app.config.canvas).attr('width', app.config.canvasW);

        var prvImg1 = mainCanvas.toDataURL({
            format: 'png',
            multiplier: 1.0
        });

        var prvImg2 = orgCan.toDataURL({
            format: 'png',
            multiplier: 1.0
        });
        $('#prvImg1').attr('src', prvImg1)
        $('#prvImg').attr('src', prvImg2)
        var i = new Image();
        var h, w;
        i.onload = function () {
            $('.prv').css('width', i.width);
            h = i.height;
            w = i.width;
        };
        i.src = prvImg1;

        setTimeout(function () {
            if (!initPrev) {
                $(".twentytwenty-container").twentytwenty();
                initPrev = true;
            }
            $('#previewModal').modal('show');
        }, 500)
        $('#previewModal').on('shown.bs.modal', function (e) {
            $(".twentytwenty-container").css('height', h);
            $(".twentytwenty-container").css('width', w);
        })
    }
    /** trigger events **/
    app.eventTrigger = function (eventName, data) {
        var event = new CustomEvent(eventName, data);
        document.dispatchEvent(event);
    }
    /**resizing */
    var waitForFinalResize = (function () {
        var timers = {};
        return function (callback, ms) {
            var uniqueId = function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0,
                        v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
            if (timers[uniqueId]) {
                clearTimeout(timers[uniqueId]);
            }
            timers[uniqueId] = setTimeout(callback, ms);
        };
    })();

    $(window).resize(function () {
        waitForFinalResize(function () {
            var oldWidth = config.canvasW;
            var newWidth = realWidth($('#makeoverkit-work-area')) - 15;
            if (oldWidth != newWidth && orgImg) {
                var c = confirm('Window Resize Detected..! If you resized screen you have to re-upload Image and start again..!Are you sure..?');
                if (c) {
                    window.location.reload();
                }
            }


        }, 500);
    });
}


