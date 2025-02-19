const app = document.getElementById("app")

// array, vetor, lista
const users = [
{
    email: 'test@test.com',
    phone: '999999999',
    ref: 100,
    refBy: null
},
{
    email: 'tust@tust.com',
    phone: '999999999',
    ref: 200,
    refBy: 100
},
{
    email: 'tost@tost.com',
    phone: '999999999',
    ref: 300,
    refBy: 200
}
]

const getUser = (userData) => {
    return users.find((user) => {
        return user.email == userData.email
    })
}

const getTotalSubscribers = (userData) => {
    const subs = users.filter((user) => {
        return user.refBy == userData.ref
    })
    return subs.length 
}

const showInvite = (userData) => {
    app.innerHTML = `
    <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>

<div id="stats">
<h4>
    ${getTotalSubscribers(userData)}
</h4>

<p>
Inscrições feitas! 
</p>
</div>
    `
}

const saveUser = (userData) => {
    const newUser = {
        ...userData,
        ref: Math.round(Math.random() * 4000),
        refBy: 100
    }

    users.push(newUser)
    console.log(users)
    return newUser
}


const formAction = () => {
    const form = document.getElementById("form") // capturando objeto
    form.onsubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(form) // função pra ler os name dos formulario
        const userData = {
            email: formData.get('email'),
            phone: formData.get('phone'),
        } // criando objeto

        const user = getUser(userData)
        if(user) {
          showInvite(user)  // encontrei usuario
        } else {
         const newUser = saveUser(userData)   // nao encontrei
         showInvite(newUser)
        }
    }
}

const startApp = () => {
    const content = `
    <form id="form">
        <input type="email" name="email" placeholder="E-mail">
        <input type="text" name="phone" placeholder="Telefone">

        <button>
            Confirmar
        </button>
    </form>
    `
    app.innerHTML = content;

    formAction()
}
startApp()


document.getElementById("logo").onclick =  () => startApp()