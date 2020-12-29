<?
echo "<!DOCTYPE html>";
echo "<html>";
echo "<head>";
echo  "<meta charset=\"utf-8\">";
echo  "<script>";
$subject = "Formulario Feel Full 💗";
$to = "seacomoseo@gmail.com";
if (isset($_POST["enviar"])) {
	$name = $_POST["nombre"];
	$email = $_POST["email"];
	$message = $_POST["mensaje"];
	$checkbox = $_POST["consiento"];
	$headers =
		"From:".$name." <".$email.">\n".
		"MIME-Version: 1.0\n".
		"Content-type: text/html; charset=utf-8\n";
	$body =
		"<ul>".
			"<li><strong>Nombre:</strong> ".$name."</li>".
			"<li><strong>eMail:</strong> ".$email."</li>".
			"<li><strong>Mensaje:</strong><blockquote><pre>".$message."</pre></blockquote></li>".
		"</ul>";
	if (!$name) {
		$errName = true;
		echo "alert(\"Introduce tu nombre ✍️\");window.history.back();";
	}
	if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$errEmail = true;
		echo "alert(\"Introduce un email válido ✍️\");window.history.back();";
	}
	if (!$message) {
		$errMessage = true;
		echo "alert(\"Introduce un mensaje ✍️\");window.history.back();";
	}
	if (!$checkbox) {
		$errCheckbox = true;
		echo "alert(\"Marca la casilla de consentimiento ✔\");window.history.back();";
	}
	if (!$errName && !$errEmail && !$errMessage && !$errCheckbox) {
		if (mail($to, $subject, $body, $headers)) {
			$result = "alert(\"¡Mensaje recibido, gracias! Te responderemos lo antes posible 😁\");document.location.href=\"/\";";
		} else {
			$result = "alert(\"Hubo un error al enviar el mensaje 😅\nPor favor, inténtalo de nuevo más tarde 🙏\");window.history.back();";
		}
		echo $result;
	}
}
echo  "</script>";
echo "</head>";
echo "</html>";
?>