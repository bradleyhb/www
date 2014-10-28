<?php
    $fileURL = $_GET['fileURL'];
    $fileKey = $_GET['fileKey'];

    echo $fileURL.' - '.$fileKey;

    print_r(exec('node app/awsUploader.js '.$fileKey.' '.$fileURL));
?>