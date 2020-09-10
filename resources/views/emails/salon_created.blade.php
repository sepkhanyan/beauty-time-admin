<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        .open-url {
            display: inline-flex;
            justify-content: space-around;
            white-space: nowrap;
            vertical-align: middle;
            user-select: none;
            border: 1px solid transparent;
            padding: .375rem .75rem;
            line-height: 1.6;
            border-radius: .25rem;
            transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
            height: 40px;
            background: #099;
            text-decoration: none;
            color: white;
            font-weight: 500;
            font-size: 20px;
            cursor: pointer;
            width: 200px;
            margin: auto;

        }
        a, a:hover, a:active, a:link {
            text-decoration: none!important;
        }

    </style>
</head>
<body style="background-color: #fbfafb;">
<div class="content" style="background-color: white;
            width: 600px;
            margin: auto;
            border-radius: 12px;
            border: 1px solid whitesmoke;
            padding: 20px">
    <div style="margin-bottom: 30px;text-align: center;">
        <h1> BeautyTime</h1>
    </div>
    <div style="font-size: 30px;
            font-weight: bold;
            margin-bottom: 20px;
            font-family: 'Poppins', sans-serif;
            text-align: center;">
        {{ $greetingText }}
    </div>
    <div style="width: 300px; margin: auto">
        <p>
            your email: <b>{{ $managerEmail }}</b>
        </p>
        <p>
            your password: <b>{{ $managerPassword }}</b>
        </p>
    </div>
    <div style="text-align: center;">
        <a class="open-url"
           style="cursor: pointer;color: #ffffff; font-family: 'Poppins', sans-serif; font-size: 20px;"
           href="{{$openUrl}}">
                <span
                        style=" margin-top: 4px;">
                   {{ $clickText }}
                </span>
        </a>
    </div>
</div>
<div style="text-align: center; margin-bottom: 20px;">
    <span style="color: inherit; font-family: 'Poppins', sans-serif; font-size: 16px;">BeautyTime</span>
</div>
</body>
</html>

