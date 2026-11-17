<?php
	$url = $_POST["url"];
	@$res = file_get_contents($url);
	echo $res;
?>