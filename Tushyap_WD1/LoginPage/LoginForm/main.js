function validate()
{
    const username = document.getElementById("username").Value;
    const password = document.getElementById("password").Value;
    if(username=="tushyap" && password=="tushyap1234")
    {
        alert("Login Successfull");
        return false;
    }
    else{
        alert("Login Failed");
    }
}