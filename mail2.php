<meta http-equiv="refresh" content="1;URL=http://atc.net.kg/context" />
<?php
 
$sendto   = ""; // почта, на которую будет приходить письмо
$username = $_POST['client_name'];   // сохраняем в переменную данные полученные из поля c именем
$usermail = $_POST['client_mail']; // сохраняем в переменную данные полученные из поля c адресом электронной почты
 
// Формирование заголовка письма
$subject  = "Заявка с лендинга на Консультацию";
// $headers  = "From: " . strip_tags('busup.ru') . "\r\n";
$headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
 
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Заявка на Консультацию</h2>\r\n";
$msg .= "<p><strong>От кого:</strong> ".$username."</p>\r\n";
$msg .= "<p><strong>Почта:</strong> ".$usermail."</p>\r\n";
$msg .= "</body></html>";
 
// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
    echo "Cообщение успешно отправленно. Пожалуйста, оставайтесь на связи";
}
 
?>