const accept = 'application/vnd.github.v3+json';

const gitUrl = 'https://api.github.com/users/';

function checkInput() {

    

    $('.userHandle_btn').on('click', function(e)
    {
        let userHandle = $(".userHandle_input").val();
        if( userHandle === "")
        {
            alert("Github user handle must not be empty")
        }
        else{
            e.preventDefault();
            getRepo(userHandle);
        }
        

    });
}

function getRepo(handle)
{

    const options = {
        headers: new Headers({
            "Accept": accept
        })
    }

    fetch(`${gitUrl}${handle}/repos`, options)
    .then(Response => {
        console.log(Response);
        if(Response.ok)
        {
            return Response.json();
        }
        throw new Error(Response.statusText);
    })
    .then(ResponseJson => displayRepo(ResponseJson))
    .catch(err => {
        displayError(err);
    });
}

function displayRepo(jsonObj)
{
    clearDisplay();
    console.log(jsonObj);
    jsonObj.forEach(elem =>
    {
        $('.repo_list').append(`<li>Repo: <a href="${elem.html_url}" target="_blank">${elem.name}</a></li>`);
    })
    $('.display').removeAttr('hidden');
}

function displayError(err)
{
    clearDisplay();
    $('.error_sect').append(`<h2 class="error_txt">Uh oh Something went wrong! ${err.message}</h2>`);
    $('.error_sect').removeAttr('hidden');
}

function clearDisplay()
{
    $('.repo_list').empty();
    $('.error_sect').empty();
}


$(checkInput());