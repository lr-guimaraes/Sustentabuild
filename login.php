<?php
// Conecte-se ao banco de dados
$servername = "192.168.1.100"; // IP do servidor de banco de dados
$username = "meuusuario";
$password = "minhasenha";
$dbname = "meubanco";


$conn = new mysqli($servername, $username, $password, $dbname);

// Verifique a conexão
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Receba os dados do formulário
$email = $_POST['email'];
$senha = $_POST['senha'];

// Verifique as credenciais
$sql = "SELECT * FROM usuarios WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($senha, $user['senha'])) {
        session_start();
        $_SESSION['user_id'] = $user['id'];
        echo "Login realizado com sucesso!";
    } else {
        echo "Senha incorreta.";
    }
} else {
    echo "Email não registrado.";
}

$conn->close();
?>
