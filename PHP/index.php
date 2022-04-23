<?php
    
    function fahrenheit_to_celsius($value)
{
	$celsius=5/9*($value-32);
	return $celsius ;
}
    function celsius_to_fahrenheit($value)
{
	$fahrenheit=(1.8*$value)+32;
	return $fahrenheit ;
}

    $temperatura=intval($_REQUEST['temperatura']);
    $medida=$_REQUEST['medida'];
    $medidaConvertida = 0;
    $temperaturaConvertida = 0;
    
    if ($medida=='fahrenheit') 
    {
        $temperaturaConvertida=fahrenheit_to_celsius($temperatura);
        $medidaConvertida = "Celsius";
    } else {
        $temperaturaConvertida=celsius_to_fahrenheit($temperatura);
        $medidaConvertida = "Fahrenheit";
    }

    $result = [
        'medida' => ($medidaConvertida),
        'temperatura' => ($temperaturaConvertida)
    ];
    
    echo json_encode($result);

?>