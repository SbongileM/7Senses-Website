<?php
// Set headers for JSON response and CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only process POST requests
if ($_SERVER['CONTACT'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

try {
    // Get and decode JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    if (empty($input['name']) || empty($input['company_name']) || empty($input['email'])) {
        throw new Exception('Name, company_name, and email are required fields');
    }
    
    // Sanitize and validate input data
    $name = trim($input['name']);
    $company_name = isset($input['company_name']) ? trim($input['company_name']) : null;
    $email = trim($input['email']);
    $phone_number = isset($input['phone_number']) ? trim($input['phone_number']) : null;
    $industry_type = isset($input['industry_type']) ? trim($input['industry_type']) : null;
    $message = isset($input['message']) ? trim($input['message']) : null;
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }
    
    // Database configuration - UPDATE THESE WITH YOUR ACTUAL CREDENTIALS
    $host = 'localhost';
    $dbname = 'sensesco_contact_form';
    $username = 'sensesco_contact_form';
    $password = '5FP2PkrZhUJC5kPLhvFB';
    
    // Create database connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Prepare and execute database insertion
    $stmt = $pdo->prepare("
        INSERT INTO contacts (name, company_name, email, phone_number, industry_type, message) 
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        $name,
        $company_name,
        $email,
        $phone_number,
        $industry_type,
        $message
    ]);
    
    // Prepare email content
    // Include PHPMailer
    require_once 'phpmailer/src/PHPMailer.php';
    require_once 'phpmailer/src/SMTP.php';
    require_once 'phpmailer/src/Exception.php';
    
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    // Create PHPMailer instance
    $mail = new PHPMailer(true);
    $email_sent = false;
    
    try {
        // Server settings for Microsoft 365
        $mail->isSMTP();
        $mail->Host       = 'smtp.office365.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@7senses.co.za';        
        $mail->Password   = '@RandomSense';               
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;
        
        // Recipients
        $mail->setFrom('smdaki@7senses.co.za', 'Seven Senses');
        $mail->addAddress('smdaki@7senses.co.za', 'Seven Senses');  // Where to send the form data
        $mail->addReplyTo($email, $name . ' ' . $company_name);
        
        // Content
        $mail->isHTML(false); 
        $mail->Subject = "New Contact Form Submission from $name $company_name";
        $mail->Body    = "
New contact form submission:

Name: $name
Company: " . ($company_name ?: 'Not provided') . "
Email: $email
Phone: " . ($phone_number ?: 'Not provided') . "
Industry: " . ($industry_type ?: 'Not specified') . "

Message:
" . ($message ?: 'No message provided') . "

Submitted at: " . date('Y-m-d H:i:s') . "
        ";
        
        $mail->send();
        $email_sent = true;
        
    } catch (Exception $e) {
        error_log("Email sending failed: {$mail->ErrorInfo}");
        $email_sent = false;
    }
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your submission! We will get back to you soon.',
        'email_sent' => $email_sent
    ]);
    
} catch (PDOException $e) {
    // Database error
    error_log("Database error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Database error occurred. Please try again later.'
    ]);
    
} catch (Exception $e) {
    // General error
    error_log("General error: " . $e->getMessage());
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
