
<?php
 
$sendto   = ""; // почта, на которую будет приходить письмо
$username = $_POST['client_name'];   // сохраняем в переменную данные полученные из поля c именем
$usertel = $_POST['client_phone']; // сохраняем в переменную данные полученные из поля c телефонным номером

 
// Формирование заголовка письма
$subject  = "Заявка на Консультацию с сайта";
// $headers  = "From: " . strip_tags('busup.ru') . "\r\n";
$headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
 
// Формирование тела письма
$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Заявка на Консультацию с сайта</h2>\r\n";
$msg .= "<p><strong>От кого:</strong> ".$username."</p>\r\n";
$msg .= "<p><strong>Телефон:</strong> ".$usertel."</p>\r\n";
$msg .= "</body></html>";
 
// отправка сообщения
if(@mail($sendto, $subject, $msg, $headers)) {
    echo "Cообщение успешно отправленно. Пожалуйста, оставайтесь на связи";
}
 
?>