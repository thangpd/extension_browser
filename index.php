<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="assets/css/extension.css">
    <script
            src="https://code.jquery.com/jquery-3.4.1.min.js"
            integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
            crossorigin="anonymous"></script>
</head>
<body>
<button class="btn btn-success">test</button>

<div class="login-box">
    <div class="lb-header">
        <a href="#" class="active" id="login-box-link">Login</a>
        <a href="#" id="signup-box-link">Sign Up</a>
    </div>
    <div class="social-login">
        <a href="#">
            <i class="fa fa-facebook fa-lg"></i>
            Login in with facebook
        </a>
        <a href="#">
            <i class="fa fa-google-plus fa-lg"></i>
            log in with Google
        </a>
    </div>
    <form class="email-login">
        <div class="u-form-group">
            <input type="email" placeholder="Email"/>
        </div>
        <div class="u-form-group">
            <input type="password" placeholder="Password"/>
        </div>
        <div class="u-form-group">
            <button>Log in</button>
        </div>
        <div class="u-form-group">
            <a href="#" class="forgot-password">Forgot password?</a>
        </div>
    </form>
    <form class="email-signup">
        <div class="u-form-group">
            <input type="email" placeholder="Email"/>
        </div>
        <div class="u-form-group">
            <input type="password" placeholder="Password"/>
        </div>
        <div class="u-form-group">
            <input type="password" placeholder="Confirm Password"/>
        </div>
        <div class="u-form-group">
            <button>Sign Up</button>
        </div>
    </form>
</div>

<script src="assets/js/content.js"></script>
</body>
</html>

<?php
/**
 * Created by PhpStorm.
 * User: abc
 * Date: 4/13/2020
 * Time: 1:14 AM
 */