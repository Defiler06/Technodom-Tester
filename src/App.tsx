import Register from "./containers/Auth/Register/Register.tsx";
import Login from "./containers/Auth/Login/Login.tsx";
import {useAppSelector} from "./store/hooks.ts";
import RecoverPassword from "./containers/RecoverPassword/RecoverPassword.tsx";

function App() {
    const showRegisterForm = useAppSelector((state) => state.loginFields.showRegisterForm);


    return (
        <>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-evenly", height: "100vh"}}>
                <Login/>
                {showRegisterForm && <Register/>}
                <RecoverPassword/>
            </div>
        </>
    )
}

export default App
