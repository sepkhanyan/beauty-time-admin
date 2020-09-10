<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="background-color: #fbfafb;">
<div class="content" style="background-color: white;
            width: 600px;
            margin: auto;
            border-radius: 12px;
            border: 1px solid whitesmoke;
            height: 556px;">
    <div style="font-size: 30px;
            font-weight: bold;
            margin-bottom: 20px;
            font-family: 'Poppins', sans-serif;
            text-align: center;">
        {{$data['title']}}
    </div>
    <div
        style="color: #7e7e7e; font-size: 20px; font-weight: 500; margin-bottom: 16px;  font-family: 'Poppins', sans-serif; line-height: 22px;padding: 20px 50px;">
        {!! $data['message'] !!}
    </div>
</div>
</body>
</html>
