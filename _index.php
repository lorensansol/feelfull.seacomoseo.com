<?
ob_start();
header("Content-Type: text/html; charset=UTF-8");
if ($_SERVER["REQUEST_URI"] == "/"){
	$html = file_get_contents('index.html');
	$css = file_get_contents('style.css');
	$js = file_get_contents('javascript.js');
	function minifyCSS($str) {
		$srch = array();
		$rplc = array();
		// Quitar espacios seguidos y saltos de línea
		$srch[0] = "#\s\s+|\n#";
		$rplc[0] = "";
		// Quitar comentarios multilínea
		$srch[1] = "#/\*.*?\*/#";
		$rplc[1] = "";
		// Quitar últimos espacios y puntoycomas previos a "{", "}" y ">"
		$srch[2] = "#( |;)({|}|>)#";
		$rplc[2] = "$2";
		// Quitar espacios posteriores a ">", "," y ":"
		$srch[3] = "#(>|,|:) #";
		$rplc[3] = "$1";
		$str = preg_replace($srch, $rplc, $str);
		return $str;
	}
	function minifyJS($str) {
		$srch = array();
		$rplc = array();
		// Quitar comentarios de línea
		$srch[0] = "#(^|\s+)\/\/.*#m";
		$rplc[0] = "";
		// Quitar espacios seguidos y saltos de línea
		$srch[1] = "#\s\s+|\n#";
		$rplc[1] = "";
		// Quitar comentarios multilínea
		$srch[2] = "#/\*.*?\*/#";
		$rplc[2] = "";
		// Quitar últimos espacios y puntoycomas previos a "{", "}" y ">"
		$srch[3] = "#( |;)+({|})#";
		$rplc[3] = "$2";
		$str = preg_replace($srch, $rplc, $str);
		return $str;
	}
	function minifyHTML($str) {
		GLOBAL $css, $js;
		$srch = array();
		$rplc = array();
		// Quitar espacios seguidos y saltos de línea
		$srch[0] = "#\s\s+|\n#";
		$rplc[0] = "";
		// Quitar comentarios html
		$srch[1] = "#<!--.*?-->#";
		$rplc[1] = "";
		$str = preg_replace($srch, $rplc, $str);
		return $str;
	}
	function html_css_js($str) {
		GLOBAL $css, $js;
		$srch = array();
		$rplc = array();
		// Poner estilos directamente en el html
		$srch[0] = "#<link rel=\"stylesheet\" href=\"style.css\">#";
		$rplc[0] = "<style>".$css."</style>";
		// Poner javascript directamente en el html
		$srch[1] = "#<script src=\"javascript.js\"></script>#";
		$rplc[1] = "<script>".$js."</script>";
		$str = preg_replace($srch, $rplc, $str);
		return $str;
	}
//	$css = minifyCSS($css);
//	$js = minifyJS($js);
	$html = minifyHTML($html);
	echo html_css_js($html);
} else {
	header("HTTP/1.0 404 Not Found");
	echo	"<!DOCTYPE HTML>";
	echo	"<html lang='es'>";
	echo	"<head>";
	echo		"<meta charset='utf-8'>";
	echo		"<meta name='viewport' content='width=device-width, initial-scale=1'>";
	echo		"<title>Error 404: Página no encontrada 😅</title>";
	echo		"<style>";
	echo			"*,";
	echo			":before,";
	echo			":after {";
	echo				"box-sizing: border-box;";
	echo				"transition: all .5s;";
	echo			"}";
	echo			"body {";
	echo				"font-family: sans-serif;";
	echo				"font-size: 16px;";
	echo				"line-height: 1.43;";
	echo				"text-align: center;";
	echo				"color: gray;";
	echo				"background: whitesmoke;";
	echo				"margin: 0;";
	echo				"padding: 1rem 2rem;";
	echo			"}";
	echo			"main {";
	echo				"background: white;";
	echo				"padding: 2rem;";
	echo				"max-width: 516px;";
	echo				"min-height: calc(100vh - 2rem);";
	echo				"border-radius: .5rem;";
	echo				"margin: 0 auto;";
	echo				"display: flex;";
	echo				"flex-direction: column;";
	echo				"justify-content: center;";
	echo			"}";
	echo			"main:before {";
	echo				"content: '404';";
	echo				"font-size: 7rem;";
	echo				"color: lightgray;";
	echo			"}";
	echo			"h2 {";
	echo				"color: darkgray;";
	echo			"}";
	echo			"a {";
	echo				"color: indianred;";
	echo				"text-decoration: none;";
	echo			"}";
	echo			"a:hover {";
	echo				"color: skyblue;";
	echo			"}";
	echo		"</style>";
	echo	"</head>";
	echo	"<body>";
	echo		"<main>";
	echo			"<h1>¡Página no encontrada! 😅</h1>";
	echo			"<h2>(Error 404)</h2>";
	echo			"<p>La página a la que intentas acceder no está disponible, ¡o almenos de momento!</p>";
	echo			"<p>Puede ser porque hayas escrito la URL incorrectamente o porque hayas accedido mediante un enlace antiguo que haya sido eliminado.</p>";
	echo			"<p>En cualquier caso, te sugerimos que vayas a la <a href='/'>página de inicio</a> 😄</p>";
	echo		"</main>";
	echo	"</body>";
	echo	"</html>";
}
ob_end_flush();
?>