<?php 
/***************DO NOT ALLOW DIRECT ACCESS************************************/
if($_SERVER['HTTP_REFERER'] !== 'https://yeorder.com/mamaearth/') {
  header( 'HTTP/1.0 403 Forbidden' );
  die( "<h2>Forbidden! You don't have permission to access this page.</h2>" );
}
/*****************************************************************************/


include_once('config.php');?>
<!DOCTYPE html>
<html>
<head>
  <script src="skin/js/face-api.js"></script>
  <script src="skin/js/commons.js"></script>
  <script src="skin/js/faceDetectionControls.js"></script>
  <link rel="stylesheet" href="skin/css/styles.css?v=<?php echo time();?>">
  <link rel="stylesheet" href="skin/css/materialize.css">
  <script type="text/javascript" src="skin/js/jquery-2.1.1.min.js"></script>
  <script src="skin/js/materialize.min.js"></script>
</head>
<body>



	<style>
	html{ overflow:hidden;}
    #my_camera, #canvas, #results img, #my_camera img{
        width: 100% !important;
        height:100% !important;
        border: 0px solid black;
        min-height:589px;
    	object-fit: cover; margin-top:-14px;
    }
    #my_camera video {
        width: 100% !important;
        height:100% !important; min-height: 480px;  object-fit: cover; border-radius: 10px;
		transform:scaleX(-1);	
	}
	
	#canvas {
        /*transform: scaleX(-1);*/
	}

    @media only screen and (max-width:599px) {
    	#faceAlign[style="width: 44%; height: 70%; position: absolute; margin-left: 28%; margin-top: 10%;"] {width: 60% !important;     margin-left: 20% !important; margin-left: auto !important; margin-right: auto !important; left: 0; right: 0;}
    	#takePhotoButton[style="position:absolute; z-index:999; cursor:pointer; margin-top: 58%; margin-left: 47%;"] {margin-top:0 !important; bottom: 20%;  margin-left: auto !important; margin-right: auto !important; left: 0; right: 0;}
    }

	.ri_nav_facetype li span {width: 80px; height: 80px; font-size: 30px; line-height: 80px;}

    .disclaimers_wrp_n {width: 100%; display: flex; flex-wrap: wrap; justify-content: center; align-items: center; min-height:calc(100vh - 20px);}
    .disclaimers_wrp_n[style="display: block;"] {display: flex !important;}
    .disclaimers_wrp_n h4 {font-size: 28px; font-weight: normal; color: #000; padding: 0 0 0 12px; margin: 0; /*text-align: center;*/ width: 100%}
    .disclaimers_wrp_n p {font-size:16px; font-weight: normal; padding:12px; color: #000; line-height: 30px; margin: 0; text-align: left; width: 100%}
    .continue_btn_n {background: #000; height: 40px; padding: 0 20px; font-weight: 17px; text-transform: uppercase; color: #fff; display: inline-block; line-height: 40px; border: 0;}
    .continue_btn_n:hover {color: #000; background: #edc4bc;}

    .scan_slide {width:5px; margin-left: 12px; float: right; order: 2; background: #e81f29; height:95px; border-radius: 12px; position: relative; margin-right: 30px;}
    .scan_slide_in {width: 100%; left: 0; bottom: 0; background: #24ae4e; border-radius: 12px; position: absolute;}
    .ri_nav_facetype li .scan_slide span {background: #fff; border:0; box-shadow:0; width:15px; height:3px; float: left; border-radius:0; margin:0 0 -2px 0; position: absolute; left: -5px; z-index: 999; font-size: 12px; text-indent: 16px;
    line-height: 15px; line-height:2px;}

    .ri_nav_facetype li {display: flex;}

    .face_reslt_txt_n {width:100%; background: rgba(0,0,0,1); padding:20px 20px; float:left; margin: -8px 0 0 0; }
    .face_reslt_txt_n p {font-size: 13px; color: #fff; padding: 0; margin: 0;}

    .face_reslt_txt_n p.wrinkles_s span {color: #b179eb;}
    .face_reslt_txt_n p.texture_s span {color: #e27da7;}
    .face_reslt_txt_n p.dark_circles_s span {color: #aee87b;}
    .face_reslt_txt_n p.spots_s span {color: #79b7ff;}

    .face_cam_reslt_wrp {min-height: 630px; margin-top: -6px;}

    .ri_nav_facetype li.concerns_txt_w {margin:-10px -15px 0 -11px;  padding: 5px 10px; /* width: 100%; */ /* float: left; */ background: #edc4bc; color: #353535; /* text-align: center !important; */ justify-content: center; border-radius: 8px;} 

    .ri_nav_facetype li {margin: 10px 0;}


    @media only screen and (max-width:991px) { 
    	.ri_nav_facetype li span {width: 60px; height: 55px; font-size: 20px; line-height: 60px;}
    	.scan_slide {height: 75px;}
    	.ri_nav_facetype li {font-size: 11px;}
    	#my_camera, #canvas, #results img, #my_camera img {min-height: 510px;}
    }
	
	
	
	@media only screen and (min-width:500px) and (max-width:767px)  {
		#my_camera, #canvas, #results img, #my_camera img {object-fit: contain;	/* height: auto !important; */ /* min-height: auto; */ 	margin: 0 0 0 0;}
		
		#faceAlign{width: 50% !important; height: 72% !important; margin-left: 25% !important;}

		.ri_nav_facetype li span {width:32px; height:32px; font-size:14px; line-height:32px;}
    	.scan_slide {height:45px;}
    	.ri_nav_facetype li {font-size:8px;}
    	#my_camera, #canvas, #results img, #my_camera img {min-height:456px; margin:-14px 0; border-radius:20px 0 0 0;} 
    	.face_cam_reslt_wrp {min-height: 547px; margin-top: -6px;}
    	.ri_nav_facetype {margin: 0;}
	}

	@media (min-width:500px) and (max-width:750px)  {
		.face_cam_reslt_wrp {min-height:412px; margin-top: -6px;}
		.ri_nav_facetype li .scan_slide_txt {width: 50px;}
		.scan_slide {margin-top: 2px;}
	 }
	 @media (min-width:768px) and (max-width:800px)  {
		.face_cam_reslt_wrp {min-height:547px; margin-top: -6px;}
	 }

	 @media only screen and (max-width: 600px) {
		.coupon{
			left:5px !important;
			bottom: 90px !important;
			width: 57% !important;
		}
		.ri_nav_facetype li .scan_slide_txt {width: 50px;}
		.scan_slide {margin-top: 5px;}
	}

	@media only screen and (max-width:499px) {
		#my_camera, #canvas, #results img, #my_camera img {min-height: 347px;}
		.ri_nav_facetype {margin: 0;}
	}
	@media only screen and (max-width:479px) {
		.ri_nav_facetype li span {width:27px; height:27px; font-size:12px; line-height:27px;}
    	.scan_slide {height:35px; margin-top: 5px;}
    	.ri_nav_facetype li {font-size:8px;}
    	#my_camera, #canvas, #results img, #my_camera img {min-height: 320px; object-fit: cover;     top: 12px;}
    	.face_cam_reslt_wrp {min-height: 310px; margin-top: -6px;}
	}
	
	</style>
	<div class="row">
	 <!--<div class="col-md-12 disclaimers_wrp_n hideME" style="display: block;">
	 	<div>
          <h4>Important Disclaimer</h4>
          <p style="/*text-align: justify; padding-left:30%; padding-right:30%*/">
            1. Do not use flash.<br>
            2. Do not wear any makeup/ skincare product.<br>
            3. Do not take picture in the dark.<br>
            4. Do not upload blurry pictures.<br>
            </p>
          <p><button class="continue_btn_n" id="showCamera">Continue</button></p>
          
           </div>
          </div>-->
          </div>
	<div class="face_cam_reslt_wrp" style="display:block;">

	<canvas id="canvas" width="638" height="480" style="position:absolute;"></canvas>
    <style>
		video{
			pointer-events: none;
		}
	</style>
    
    <div id="results"></div>
    <img id="takePhotoButton" src="img/photo.png" onClick="take_snapshot()" width="66" style="position:absolute; z-index:999; cursor:pointer; margin-top:0; bottom:42px; margin-left:0; left:0; right:0; margin:auto;" />
    <img id="faceAlign" style="width: 44%; height: 70%; position: absolute; margin-left: 0; margin-top: 10%; z-index: 990; min-width: 300px; left: 0; right: 0; margin: auto;" src="images/face-align.png" />
    <div id="loader" style="position:absolute; width: 100% !important; height: 100% !important; text-align: center; padding-top: 30%; display: none; z-index:990;">
    	<div class="cssload-thecube">
            <div class="cssload-cube cssload-c1"></div>
            <div class="cssload-cube cssload-c2"></div>
            <div class="cssload-cube cssload-c4"></div>
            <div class="cssload-cube cssload-c3"></div>
        </div>
    </div>
	<div id="my_camera"></div>
    
    </div>

    <div class="face_reslt_txt_n" style="display:none">
		<p class="wrinkles_s"><span>Wrinkles</span> are creases, folds, or ridges in the skin. With age the skin gets thinner, drier, and less elastic, and less able to protect itself from damage.</p>
		<p class="texture_s"><span>Texture</span> refers to your skin's surface condition. Good skin texture is soft and smooth, well-hydrated with firm collagen and elastin support. Uneven skin texture is coarse, rough, dull, dry and often sun-damaged.</p>
		<p class="dark_circles_s"><span>Dark circles</span> under your eyes happen when the skin beneath both eyes appears darkened. Sleep deprivation, extreme fatigue or over sleeping can cause dark circles to form under your eyes.</p>
		<p class="spots_s"><span>Spots</span> are breakouts, pimples, zits which often develop when your skin produces too much of oil which gets trapped in your pores by a build-up of dead skin cells and/or dirt.</p>
	</div>
	
	<!-- Webcam.min.js -->
    <script type="text/javascript" src="webcamjs/webcam.js"></script>

	<!-- Configure a few settings and attach camera -->
	<script language="JavaScript">
	var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
	
	 //$("#showCamera").on('click',function(){
		 $(".face_cam_reslt_wrp").show();
		 $(".hideME").hide();
		if (screen.height <= screen.width) {
			// Landscape
			Webcam.set({
				width: 640,
				height: 480,
				image_format: 'jpeg',
				jpeg_quality: 90
			});
				   
		} else {
			// Portrait
			if(iOS){
				Webcam.set({
					width: 450,
					height: 400,
					//dest_width: 480,
					//dest_height: 640,
					image_format: 'jpeg',
					jpeg_quality: 90
				}); 
			}else{
				Webcam.set({
					width: 300,
					height: 400,
					//dest_width: 480,
					//dest_height: 640,
					image_format: 'jpeg',
					jpeg_quality: 90
				});	
			}
		}
	
		Webcam.attach( '#my_camera' );
	//});
	
	</script>
    
    
    <script type="text/javascript">
		var ajaxUrl = '<?php echo BASEURL;?>uploadskin4jquery.php';
	</script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js"></script> 
	
	<script language="JavaScript">
		var modelImg;
		var uploadDir;
		var agey=34;
		function take_snapshot() {console.log('take snapshot');
			$('#loader').show();
			$('#faceAlign').hide();
			$('#takePhotoButton').hide();
			
			// take snapshot and get image data
			Webcam.snap( function(data_uri) {
				//$('#my_camera').hide();
				
				if(iOS){
					//document.getElementById('my_camera').innerHTML = '<img id="freeze" src="'+data_uri+'" style="transform: rotate(90deg) scaleX(-1) scaleY(-1); z-index=-1;"/>';
					document.getElementById('my_camera').innerHTML = '<img id="freeze" src="'+data_uri+'" style="transform: scaleX(-1); z-index=-1;"/>';
				}else{
					document.getElementById('my_camera').innerHTML = '<img id="freeze" src="'+data_uri+'" style="transform: scaleX(-1); z-index=-1"/>';
				}
				
				
				
				// display results in page
				$.post("<?php echo BASEURL;?>uploadskin4jquery.php",
				{
				  fileToUpload: data_uri
				},
				function(data,status){
				  var arr = $.parseJSON(data);
				  var arr2 = $.parseJSON(arr['analyze']);
				  
				  mlData = $.parseJSON(arr['landmarks']);
				  //console.log(mlData);
				  //landmarks = mlData.face_landmark;
				
				  var landmarks = mlData.face_landmark;
				  var imgwidth = $.parseJSON(arr['imgwidth']);
				  var imgheight = $.parseJSON(arr['imgheight']);
				  //alert(JSON.stringify(arr['exif']));
				  var canvas = document.getElementById("canvas");
				  canvas.height = imgheight;
				  canvas.width = imgwidth;
					
					
				  modelImg = arr['img'];
				  if(landmarks.length == 0)
				  {
					  alert('Image Not detected Properly Please try again by refreshing..');
					  location.reload();
					  return;
				  }
				  draw(landmarks);
				  
				  uploadDir = arr['dir'];
				  
				  
				  var spots;
				  var wrinkles;
				  var darkCircle;
				  var texture;
				  var health;
				  var alll;
				  
				  if(!arr2['age']){
					arr2['age']=34;  
				  }
				  else{
					agey=arr2['age'];
				  }
				  /////////Spots
				  if(arr2['age']<14){
					  spots = Math.floor(Math.random() * 10) + 0;
					  
				  }else if(arr2['age']>=14 && arr2['age']<25){
					  spots = Math.floor(Math.random() * 20) + 40;
					  
				  }else if(arr2['age']>=25 && arr2['age']<45){
					  spots = Math.floor(Math.random() * 30) + 10;
					  
				  }else{
					  spots = Math.floor(Math.random() * 20) + 30;
				  }
				  
				  /////////Dark Circle
				  if(arr2['age']<25){
					  darkCircle = Math.floor(Math.random() * 30) + 10;
					  
				  }else if(arr2['age']>=25 && arr2['age']<40){
					  darkCircle = Math.floor(Math.random() * 30) + 40;
					  
				  }else{
					  darkCircle = Math.floor(Math.random() * 20) + 30;
					  
				  }
				  
				  
				  /////////Wrinkles
				  if(arr2['age']<25){
					  wrinkles = Math.floor(Math.random() * 10) + 0;
					  
				  }else if(arr2['age']>=25 && arr2['age']<40){
					  wrinkles = Math.floor(Math.random() * 20) + 20;
					  
				  }else{
					  wrinkles = Math.floor(Math.random() * 30) + 40;
					  
				  }
				  
				  
				  if(arr2['gender']=='F'){
					  spots = spots+5;
					  darkCircle = darkCircle+5;
					  wrinkles = spots-5;
				  }
				  /////////Texture
				  texture = 100-Math.round((spots+darkCircle+wrinkles)/3);
				  alll = Math.round((texture+spots+darkCircle+wrinkles)/4);
				  
				  
				  
				  //$('#my_camera').hide();
				  $('#loader').hide();
				  $('#takePhotoButton').hide();
				  $('#faceAlign').hide();
				  $('#results').show();
				  $('#results').html('<br /><img id="results_img" src="' + arr['img'] + '" /><ul class="le_nav_facetype"><!--<li class="next_process_btn_s"><a id="resultanchor" href="#" onClick="saveAnalyzedImage();">Next Porcess</a></li>--><li>Skin Age<br /><span>'+arr2['age']+'</span></li></ul><ul class="ri_nav_facetype"><li class="concerns_txt_w">Concerns</li><li class="parpal_clr_n_w"><div class="scan_slide"><span style="bottom:'+wrinkles+'%;">You</span><div class="scan_slide_in" style="height:50%;"></div></div><div class="scan_slide_txt">Wrinkles<br /><span>'+wrinkles+'</span></div></li><li class="orange_clr_n_w"><div class="scan_slide"><span style="bottom:'+texture+'%;">You</span><div class="scan_slide_in" style="height:50%;"></div></div><div class="scan_slide_txt">Texture<br /><span>'+texture+'</span></div></li><li class="green_clr_n_w"><div class="scan_slide"><span style="bottom:'+darkCircle+'%;">You</span><div class="scan_slide_in" style="height:50%;"></div></div><div class="scan_slide_txt">Dark Circles<br /><span>'+darkCircle+'</span></div></li><li class="blue_clr_n_w"><div class="scan_slide"><span style="bottom:'+spots+'%;">You</span><div class="scan_slide_in" style="height:50%;"></div></div><div class="scan_slide_txt">Spots<br /><span>'+spots+'</span></div></li><li><div class="scan_slide"><span style="bottom:'+alll+'%;">You</span><div class="scan_slide_in" style="height:50%;"></div></div><div class="scan_slide_txt">All<br /><span>'+alll+'</span></div></li></ul>');
				  $('#results_img').hide();
				  $('#freeze').hide();
				  
				  $('#nxtbtn').show();
				  $(".face_reslt_txt_n").show();
				  /*$.post("getRangeData.php", {age:agey}, function(result){
						//console.log("GET Range Number");
						var resData=$.parseJSON(result);

						var colorLimit = resData['data']['color_limit'];
						$(".scan_slide_in").attr('style','height:'+colorLimit+"%");
					});*/
				
				
				  $.post("uploadskinresult.php", {phone:'<?= $_GET['phone']; ?>',email:'<?= $_GET['email']; ?>',userid:'<?= $_GET['customer_id']; ?>',wrinkles:wrinkles,texture:texture,darkCircle:darkCircle,spots:spots,alll:alll,age:arr2['age']}, function(result){
						console.log(result);
					});
				});
					
				
			} );
		
		}
		
		
		
		
		
		
		
		////////////////////////////////////////Scaning animation///////////////////////////
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
		
		if(iOS){
			//$('#faceAlign').style.minWidth='250px';
			$('#canvas').css('transform', 'scaleX(-1)');
		}else{
			$('#canvas').css('transform', 'scaleX(-1)');
		}
			
		function draw(landmarks) {
			const img22 = new Image();
			img22.src = modelImg;
			
			const img = new Image();
			img.src = "images/mask/left_eye.png";
			
			const img2 = new Image();
			img2.src = "images/mask/right_eye.png";
			
			const img3 = new Image();
			img3.src = "images/mask/left_wrink.png";
			
			const img4 = new Image();
			img4.src = "images/mask/right_wrink.png";
			
			const img5 = new Image();
			img5.src = "images/mask/zigzag.png";
			
			const img6 = new Image();
			img6.src = "images/mask/zigzag.png";
			
			const img7 = new Image();
			img7.src = "images/mask/line.png";
			
			const img8 = new Image();
			img8.src = "images/mask/line.png";
			
			img22.onload = () => {
			  ctx.drawImage(img22, 0, 0);
			  ctx.drawImage(img, landmarks[36][0]/1.02, landmarks[36][1]/.95 , 30, 15);
			  ctx.drawImage(img2, landmarks[42][0], landmarks[42][1]/.97 , 30, 15);
			  ctx.drawImage(img3, landmarks[2][0]/.98, landmarks[2][1]/1.03 , 20, 10);
			  ctx.drawImage(img4, (landmarks[14][0]/1.05), landmarks[14][1]/1.05 , 20, 10);
			  ctx.drawImage(img5, landmarks[3][0]/.95, landmarks[3][1], 20, 3);
			  ctx.drawImage(img6, landmarks[13][0]/1.10, landmarks[13][1] , 20, 3);
			  ctx.drawImage(img7, landmarks[57][0], landmarks[57][1]/.97 , 10, 1);
			  ctx.drawImage(img8, landmarks[57][0]/.99, landmarks[57][1]/.96 , 10, 1);
			  saveAnalyzedImage();
			}
			
		}
		
		function saveAnalyzedImage(){
			/*
			var imgsrc = canvas.toDataURL("image/png"); 
			var customer_id = '<?php echo $_GET['customer_id'];?>';
			var browser_session_id = '<?php echo $_GET['browser_session_id'];?>';
            //console.log(imgsrc); 
            $("#newimg").attr('src', imgsrc); 
            $("#img").show(); 
            var dataURL = canvas.toDataURL(); 
            $.ajax({ 
         	   type: "POST", 
               url: "recomndedproduct.php", 
               data: { 
            		fileToUpload: dataURL,
					dirToUpload: uploadDir,
					customer_id: customer_id,
					browser_session_id: browser_session_id,
               } 
            }).done(function(o) { 
			   console.log('saved'); 
			   
					
				
			//////////Display next button for result
			  window.parent.nextBtn();
			//////////Display next button for result
					
            });*/
			
			//////////Display next button for result
			  window.parent.nextBtnShow();
			//////////Display next button for result
		}
		////////////////////////////////////////Scaning animation///////////////////////////
	</script>
    

<?php die;?>
