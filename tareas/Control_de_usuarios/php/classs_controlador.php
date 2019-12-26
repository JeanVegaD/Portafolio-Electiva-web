<?php

//clase encargada de gestionar la comunicacion con los diferentes objetos de la aplicacion
class controlador{

    //variables para iniciarlizar la base de datos
    $servername = "localhost";
    $username = "root";
    $password = "Cal2016";
    $bd = "labWeb"


    //constructor encargado de gestionar e instanciar las demas clases
    function __construct($name) {
        $this->conectarBaseDatos();
        
    }


    //crea el objeto conexion de la base de datos
    function conectarBaseDatos(){
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$bd", $username, $password);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Connected successfully";
        }
        catch(PDOException $e){
            echo "Connection failed: " . $e->getMessage();
        }
    } 
}

$conector = new controlador();

?>