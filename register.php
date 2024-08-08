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
$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];

// Verifique se o email já está registrado
$sql = "SELECT * FROM usuarios WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "Email já cadastrado.";
} else {
    // Insira os dados no banco de dados
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT); // Criptografa a senha
    $sql = "INSERT INTO usuarios (nome, email, senha) VALUES ('$nome', '$email', '$senhaHash')";

    if ($conn->query($sql) === TRUE) {
        echo "Cadastro realizado com sucesso!";
    } else {
        echo "Erro ao cadastrar: " . $conn->error;
    }
}

$conn->close();
?>
