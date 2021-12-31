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
		$("#loading").hide();
		if (statusText == 'success') {
			var msg = data.error.replace(/##/g, "<br />");
			if (data.img != '') {
				$("#uploadDiv").hide();
				$("#mlResult").show();
				$('#mlResult').html('<br /><img src="' + data.img + '" /><canvas id="overlay" width="'+Math.round(data.imgwidth)+'" height="'+Math.round(data.imgheight)+'" style="position:absolute; left:0;"></canvas>');
				$('#formcont').html('');
				
				mlData = JSON.parse(data.landmarks);
				
				landmarks = mlData.face_landmark;
				mouthOpen = mlData.mouth_open;
				
				//console.log(landmarks);
				//alert(data.landmarks)
			} else {
				$('#message').html(msg); 
			}
		} else {
			$('#message').html('Unknown error!'); 
		}
	} 
	
	
	
	
