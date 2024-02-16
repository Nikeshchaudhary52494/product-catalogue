import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import toast from 'react-hot-toast';
const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const { email, password } = user;

    const userDataChanged = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify({ email, password }));
        setUser({
            email: "",
            password: ""
        });
        navigate(location.state);
        toast.success("User loged-in");
    };
    return (
        <>
            <div className="bg-secondary flex flex-col items-center justify-center inset-0 z-10 fixed">
                <div class="bg-primary px-5 py-10 rounded-lg text-white">
                    <div class="px-4" >
                        <h3 class="text-xl mb-4 ">Login</h3>
                    </div>
                    <form class="flex text-black gap-4 flex-col" onSubmit={submitHandler} >
                        <input
                            class="w-[300px ] outline-none p-2 m-2 rounded-md"
                            type="Email"
                            required
                            name='email'
                            placeholder='Email'
                            onChange={userDataChanged}
                            value={email} />
                        <input
                            class="w-[300px ] outline-none p-2 m-2 rounded-md"
                            type="password"
                            required
                            name='password'
                            placeholder='Password'
                            onChange={userDataChanged}
                            value={password} />
                        <input
                            type="submit"
                            class="w-[300px] m-2 h-[40px] hover:bg-green-700 text-white bg-submit rounded-lg" />
                    </form>
                    <div className='flex justify-between'>
                        <Link
                            className="text-xs cursor-not-allowed"
                            state={location.state}>
                            New User? Create Account
                        </Link>
                        <Link
                            className='text-xs cursor-not-allowed text-red-400'>
                            Forget Password
                        </Link>
                    </div>
                </div>
                <div className='w-full max-w-sm px-4'>
                    <Link to="/" >
                        <button className="text-white  p-2 mt-5">Go to Home</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Login