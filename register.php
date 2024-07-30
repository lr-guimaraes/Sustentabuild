<!-- <?php
 
$NameUser = $_POST["nome"];
// $BirthDate = $_POST["BirthDate"];
// $User = $_POST["User"];
$Email = $_POST["email"];
$PasswordUser = $_POST["senha"];


$con = mysqli_connect("localhost:3306", "root", "root", "bank_tde");

mysqli_query($con, "INSERT INTO registration (nome, email, senha) VALUES('$nome', '$email','$senha') ");    
// include 'config.php';

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $nome = $_POST['nome'];
//     $cpf = $_POST['cpf'];
//     $email = $_POST['email'];
//     $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

//     $sql = "INSERT INTO users (nome, cpf, email, senha) VALUES (?, ?, ?, ?)";
//     $stmt = $conn->prepare($sql);
//     $stmt->bind_param("ssss", $nome, $cpf, $email, $senha);

//     if ($stmt->execute()) {
//         echo "Registration successful!";
//     } else {
//         echo "Error: " . $stmt->error;
//     }

//     $stmt->close();
//     $conn->close();
// }
?> -->


$NameUser = $_POST["nome"];
// $BirthDate = $_POST["BirthDate"];
// $User = $_POST["User"];
$Email = $_POST["email"];
$PasswordUser = $_POST["senha"];


$con = mysqli_connect("localhost:3306", "root", "root", "bank_tde");

mysqli_query($con, "INSERT INTO registration (nome, email, senha) VALUES('$nome', '$email','$senha') ");    


<!-- <!DOCTYPE html>
<html>
<head>
    <title>Register</title>
</head>
<body>
    <form method="post" action="register.php">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <input type="submit" value="Register">
    </form>
</body>
</html> -->
