<!DOCTYPE html>
<html lang="en">
<head>
  <title>Boddess</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="layout/css/bootstrap.min.css">
  <link rel="stylesheet" href="layout/css/custom.css" media="all">
  <link rel="stylesheet" href="layout/css/responsive.css" media="all">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" media="all">
    
  <script src="layout/js/jquery.min.js"></script>
  <script src="layout/js/popper.min.js"></script>
  <script src="layout/js/bootstrap.min.js"></script>
</head>
<body>
    <div class="fullwraper">
	    <header class="header_wrp">
		    <!--<div class="header_top_wrp"> 
        		<div class="container">
    				<div class="header_top_rw">
    					<div class="header_t_le_txt">Pick 2 samples with any purchase</div>    
    					<div class="header_t_ri_txt"><a href="">Get App</a><a href="">Find a store</a><a href="">Track orders</a></div>    
    				</div>
                </div>
      		</div>
        	-->
            <div class="header_mid_wrp"> 
        		<div class="container">
    				<div class="header_top_rw">
    					<div class="header_m_le_srh">
    
							<form>
        						<div class="form-group has-search">
    								<span class="fa fa-search form-control-feedback"></span>
    								<input type="text" class="form-control" placeholder="Search">
  								</div>
                           </form>
				        </div>    
    					<div class="header_m_logo"><a href="index.html"><img src="layout/images/logo.svg" width="197"></a></div>    
    					<div class="header_m_ri_nav">
					        <ul class="h_ri_nav">
                                <!-- <li class="lan"><a href="">Language</a></li> -->
                                <li class="h_ri_nav_l"><a href="" class="account">Account</a></li>
                                <li class="h_ri_nav_l"><a href="" class="wishlist">Wishlist</a></li>
                                <li class="h_ri_nav_l"><a href="" class="basket">Basket</a></li>
					        </ul>
				        </div>    
    				</div>
               </div>
     		</div>
        
	        <div class="navigation_header">
		        <nav class="navbar navbar-expand-lg">
      				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
        			<span class="navbar-toggler-icon"></span>
      				</button>

      				<div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
                    	<ul class="navbar-nav">
                          <li class="nav-item"><a class="nav-link" href="index.html">Shop</a></li>
                          <li class="nav-item active">
                          		<a class="nav-link" href="#">Try on</a>
                          		<ul class="sub_nav_header">
                                    <li><a href="products.php?cat=lipstick">Lipstick</a></li>
                                    <li><a href="products.php?cat=liquidLips">Liquid Lipstick</a></li>
                                    <li><a href="products.php?cat=foundation">Foundation</a></li>
                                    <li><a href="products.php?cat=compact">Compact</a></li>
                                    <li><a href="products.php?cat=blush">Blush</a></li>
                                    <li><a href="products.php?cat=eyebrow">Eyebrow</a></li>
                                    <li><a href="products.php?cat=eyeshadow">Eyeshadow</a></li>
                                    <li><a href="products.php?cat=eyeliner">Eyeliner</a></li>
                                    <li><a href="products.php?cat=kajal">Kajal</a></li>
                                    <li><a href="products.php?cat=maskara">Maskara</a></li>
                            	</ul>
                          </li>
                          <li class="nav-item"><a class="nav-link" href="mylooks.php">My Looks</a></li>
                          <li class="nav-item"><a class="nav-link" href="skinanalysis.php">Skin Analysis</a></li>
        				</ul>
      				</div>
    			</nav>
	        </div>
	    </header>
		<div class="fullwraper banner">
      <div class="container">
        	<div class="body_try_on_wrp">
                <div class="body_try_on_left">
                	<?php if($_REQUEST['cat']=='lipstick'){?>
                    	<iframe style="border:0;" id="tryon" src="https://vpro.boddess.com/tryon.php?cat=<?php echo $_REQUEST['cat']?>" width="520" height="610"></iframe>
                    
                    <?php }else{?>
                    	<iframe style="border:0;" id="tryon" src="tryon.php?cat=<?php echo $_REQUEST['cat']?>" width="520" height="610"></iframe>
                    <?php }?>
                    
                </div>
                <div class="body_try_on_right">
                	<?php if($_REQUEST['cat']=='lipstick'){?>
                    <h3>Lip Color Variant</h3>
                    <ul class="color_shades_li_w">
                        <li class="color_shades_li" style="background-color:#bb1a4b;" onclick="event.preventDefault(); tryon('lips','#bb1a4b');"></li>
                        <li class="color_shades_li" style="background-color:#c5145d;" onclick="event.preventDefault(); tryon('lips','#c5145d');"></li>
                        <li class="color_shades_li" style="background-color:#db2586;" onclick="event.preventDefault(); tryon('lips','#db2586');"></li>
                        <li class="color_shades_li" style="background-color:#de346a;" onclick="event.preventDefault(); tryon('lips','#de346a');"></li>
                        <li class="color_shades_li" style="background-color:#d40305;" onclick="event.preventDefault(); tryon('lips','#d40305');"></li>
                        <li class="color_shades_li" style="background-color:#ff4759;" onclick="event.preventDefault(); tryon('lips','#ff4759');"></li>
                        <li class="color_shades_li" style="background-color:#ff5f9e;" onclick="event.preventDefault(); tryon('lips','#ff5f9e');"></li>
                        <li class="color_shades_li" style="background-color:#ea2017;" onclick="event.preventDefault(); tryon('lips','#ea2017');"></li>
                        <li class="color_shades_li" style="background-color:#c10128;" onclick="event.preventDefault(); tryon('lips','#c10128');"></li>
                    </ul>
                    <?php } ?>
                    <?php if($_REQUEST['cat']=='liquidLips'){?>
                    <h3>Liquid Color Variant</h3>
                    <ul class="color_shades_li_w">
                        <li class="color_shades_li" style="background-color:#bb1a4b;" onclick="event.preventDefault(); tryon('liquidLips','#bb1a4b');"></li>
                        <li class="color_shades_li" style="background-color:#c5145d;" onclick="event.preventDefault(); tryon('liquidLips','#c5145d');"></li>
                        <li class="color_shades_li" style="background-color:#db2586;" onclick="event.preventDefault(); tryon('liquidLips','#db2586');"></li>
                        <li class="color_shades_li" style="background-color:#de346a;" onclick="event.preventDefault(); tryon('liquidLips','#de346a');"></li>
                        <li class="color_shades_li" style="background-color:#d40305;" onclick="event.preventDefault(); tryon('liquidLips','#d40305');"></li>
                        <li class="color_shades_li" style="background-color:#ff4759;" onclick="event.preventDefault(); tryon('liquidLips','#ff4759');"></li>
                        <li class="color_shades_li" style="background-color:#ff5f9e;" onclick="event.preventDefault(); tryon('liquidLips','#ff5f9e');"></li>
                        <li class="color_shades_li" style="background-color:#ea2017;" onclick="event.preventDefault(); tryon('liquidLips','#ea2017');"></li>
                        <li class="color_shades_li" style="background-color:#c10128;" onclick="event.preventDefault(); tryon('liquidLips','#c10128');"></li>
                    </ul>
                    <?php } ?>
                    <?php if($_REQUEST['cat']=='lipliner'){?>
                    <h3>Lipliner Color Variant</h3>
                    <ul class="color_shades_li_w">
                        <li class="color_shades_li" style="background-color:#bb1a4b;" onclick="event.preventDefault(); tryon('lipliner','#bb1a4b');"></li>
                        <li class="color_shades_li" style="background-color:#c5145d;" onclick="event.preventDefault(); tryon('lipliner','#c5145d');"></li>
                        <li class="color_shades_li" style="background-color:#db2586;" onclick="event.preventDefault(); tryon('lipliner','#db2586');"></li>
                        <li class="color_shades_li" style="background-color:#de346a;" onclick="event.preventDefault(); tryon('lipliner','#de346a');"></li>
                        <li class="color_shades_li" style="background-color:#d40305;" onclick="event.preventDefault(); tryon('lipliner','#d40305');"></li>
                        <li class="color_shades_li" style="background-color:#ff4759;" onclick="event.preventDefault(); tryon('lipliner','#ff4759');"></li>
                        <li class="color_shades_li" style="background-color:#ff5f9e;" onclick="event.preventDefault(); tryon('lipliner','#ff5f9e');"></li>
                        <li class="color_shades_li" style="background-color:#ea2017;" onclick="event.preventDefault(); tryon('lipliner','#ea2017');"></li>
                        <li class="color_shades_li" style="background-color:#c10128;" onclick="event.preventDefault(); tryon('lipliner','#c10128');"></li>
                    </ul>
                    <?php } ?>
                    <?php if($_REQUEST['cat']=='eyebrow'){?>
                    <h3>Eyebrow Color Variant</h3>
                    <ul class="color_shades_li_w">
                        <li class="color_shades_li" style="background-color:#323232;" onclick="event.preventDefault(); tryon('eyebrow','#323232');"></li>
                        <li class="color_shades_li" style="background-color:#4f1e1e;" onclick="event.preventDefault(); tryon('eyebrow','#4f1e1e');"></li>
                        <li class="color_shades_li" style="background-color:#585454;" onclick="event.preventDefault(); tryon('eyebrow','#585454');"></li>
                    </ul>
                    <?php } ?>
                    <?php if($_REQUEST['cat']=='foundation'){?>
                    <h3>Foundation Color Variant</h3>
                    <ul class="color_shades_li_w">
                        <li class="color_shades_li" style="background-color:#fff3f6;" onclick="event.preventDefault(); tryon('foundation','#fff3f6');"></li>
                        <li class="color_shades_li" style="background-color:#fbcfcc;" onclick="event.preventDefault(); tryon('foundation','#fbcfcc');"></li>
                        <li class="color_shades_li" style="background-color:#ecc19e;" onclick="event.preventDefault(); tryon('foundation','#ecc19e');"></li>
                        <li class="color_shades_li" style="background-color:#965500;" onclick="event.preventDefault(); tryon('foundation','#965500');"></li>
                    </ul>
                    <?php } ?>
                    <?php if($_REQUEST['cat']=='compact'){?>
                    <h3>Comapct Color Variant</h3>
                    <ul class="color_shades_li_w">
                        <li class="color_shades_li" style="background-color:#fff3f6;" onclick="event.preventDefault(); tryon('compact','#fff3f6');"></li>
                        <li class="color_shades_li" style="background-color:#fbcfcc;" onclick="event.preventDefault(); tryon('compact','#fbcfcc');"></li>
                        <li class="color_shades_li" style="background-color:#ecc19e;" onclick="event.preventDefault(); tryon('compact','#ecc19e');"></li>
                        <li class="color_shades_li" style="background-color:#965500;" onclick="event.preventDefault(); tryon('compact','#965500');"></li>
                    </ul>
                    <?php } ?>
                    <?php if($_REQUEST['cat']=='blush'){?>
                    <h3>Blush Color Variant</h3>
                    <ul class="color_shades_li_w">
                        <li class="color_shades_li" style="background-color:#9c0004;" onclick="event.preventDefault(); tryon('blush','#9c0004');"></li>
                        <li class="color_shades_li" style="background-color:#ff0000;" onclick="event.preventDefault(); tryon('blush','#ff0000');"></li>
                        <li class="color_shades_li" style="background-color:#965500;" onclick="event.preventDefault(); tryon('blush','#965500');"></li>
                    </ul>
                    <?php } ?>
                    <?php if($_REQUEST['cat']=='eyeshadow'){?>
                    <h3>Eyeshadow Color Variant</h3>
                    <ul class="color_shades_li_w">
                        <li class="color_shades_li" style="background-color:#9c0004;" onclick="event.preventDefault(); tryon('eyeshadow','#9c0004');"></li>
                        <li class="color_shades_li" style="background-color:#ff0000;" onclick="event.preventDefault(); tryon('eyeshadow','#ff0000');"></li>
                        <li class="color_shades_li" style="background-color:#965500;" onclick="event.preventDefault(); tryon('eyeshadow','#965500');"></li>
                    </ul>
                    <?php }?>
                    <?php if($_REQUEST['cat']=='eyeliner'){?>
                    <h3>Eyeliner Color Variant</h3>
                    <ul class="color_shades_li_w">
                        <li class="color_shades_li" style="background-color:#323232;" onclick="event.preventDefault(); tryon('eyeliner','#323232');"></li>
                        <li class="color_shades_li" style="background-color:#4f1e1e;" onclick="event.preventDefault(); tryon('eyeliner','#4f1e1e');"></li>
                        <li class="color_shades_li" style="background-color:#585454;" onclick="event.preventDefault(); tryon('eyeliner','#585454');"></li>
                    </ul>
                    <?php }?>
                    <?php if($_REQUEST['cat']=='kajal'){?>
                    <h3>Kajal Color Variant</h3>
                    <ul class="color_shades_li_w">
                        <li class="color_shades_li" style="background-color:#000000;" onclick="event.preventDefault(); tryon('kajal','#000000');"></li>
                    </ul>
                    <?php }?>
                    <?php if($_REQUEST['cat']=='maskara'){?>
                    <h3>Maskara Variant</h3>
                    <ul class="color_shades_li_w">
                        <li class="color_shades_li" style="background-color:#000000;" onclick="event.preventDefault(); tryon('maskara','#000000');"></li>
                    </ul>
                    <?php }?>
                </div>
            </div>
            </div>
            <script>
                function tryon(faceArea, color){
                    document.getElementById('tryon').contentWindow.changeColor(faceArea, color);
                }
            </script>
        </div>
	</div>
</body>
</html>
