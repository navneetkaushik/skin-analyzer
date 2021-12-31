///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
///////////////////////Call AJAX////////////////////////////////
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

$(document).ready(function() {
		$("#loading").hide();
		var options = {
			beforeSubmit:  showRequest,
			success:       showResponse,
			url:       ajaxUrl,  // your upload script
			dataType:  'json'
		};
		$('#Form1').submit(function() {
			$('#message').html('');
			$(this).ajaxSubmit(options);
			return false;
		});
	}); 
	function showRequest(formData, jqForm, options) {
		var fileToUploadValue = $('#file-upload').fieldValue();
		if (!fileToUploadValue[0]) { 
			$('#message').html('You need to select a file!'); 
			return false; 
		}
		$("#buttonForm").hide();
		$("#loading").show();
		return true; 
	} 
	function showResponse(data, statusText, xhr, $form)  {
		//$("#loading").hide();
		if (statusText == 'success') {
			var msg = data.error.replace(/##/g, "<br />");
			if (data.img != '') {
				//$("#uploadDiv").hide();
				//$("#mlResult").show();
				//$("#mlResult1").show();
				//$("#mlResult2").show();//console.log(data.imgwidth+" x "+data.imgheight);
				
				data.imgwidth=372;
				data.imgheight=465;//console.log(data.imgwidth+" x "+data.imgheight);
				
				$('#mlResult').html('<br /><img id="tensorImg" src="' + data.img + '" style="display:none;" /><canvas id="default" width="'+Math.round(data.imgwidth)+'" height="'+Math.round(data.imgheight)+'" style="position:absolute;"></canvas>');
				$('#formcont').html('');
				
				
				
				mlData = JSON.parse(data.landmarks);
				
				landmarks = mlData.face_landmark;
				
				
				mouthOpen = mlData.mouth_open;
				uploadedImg = data.img;
				canvasWidth = Math.round(data.imgwidth);
				canvasHeight = Math.round(data.imgheight);
				
				/*const canvas = $('#default').get(0);
				ctx = canvas.getContext("2d");
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.beginPath();
				const uploadImg = new Image();
				uploadImg.src = uploadedImg;
				uploadImg.onload = () => {
					ctx.drawImage(uploadImg, 0, 0);
				}*/
				
				
				//var canvas = new fabric.StaticCanvas('c');
				//var image;
				
	
	
	
				
				mainCanvas = new fabric.Canvas('default', {
					selection: false,
					containerClass: 'edit-canvas',
					backgroundColor: 'rgb(255,255,255)'
				});
				mainCanvas.setHeight(canvasHeight);
				mainCanvas.setWidth(canvasWidth);
				
				var imgEl = document.createElement('img');
				imgEl.crossOrigin = 'anonymous';
				imgEl.onload = function() {
					image = new fabric.Image(imgEl);
  					image.set({ hasControls: false, hasBorders: false, selectable: false });
					mainCanvas.add(image);
				}
				imgEl.src = data.img;
				
				////call tensorflow function to get landmarks
				$("#tensorImg").load(function() {
					M(divHideShow);
				});
				
				
				function divHideShow(){
					$("#loading").hide();
						
					$("#uploadDiv").hide();
					$("#mlResult").show();
					$("#mlResult1").show();
					$("#mlResult2").show();
				}
				
				////call tensorflow function
				
			} else {
				$('#message').html(msg); 
			}
		} else {
			$('#message').html('Unknown error!'); 
		}
	} 	
	
	
	
