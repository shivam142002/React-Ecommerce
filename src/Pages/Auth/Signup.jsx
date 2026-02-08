
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../Features/Auth/AuthThunk';
import { selectAuthLoading } from '../../Features/Auth/AuthSlice';
//import Loader from '../../components/common/Loader';
import Loader from '../../Components/Common/Loader';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector(selectAuthLoading);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        const result = await dispatch(signupUser({ name, email, password }));

        if (signupUser.fulfilled.match(result)) {
            setName('');
            setEmail('');
            setPassword('');
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSignup();
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            {loading && <Loader />}
            <div className="bg-gray-800 px-10 py-10 rounded-xl">
                <div>
                    <h1 className="text-center text-white text-xl mb-4 font-bold">
                        Signup
                    </h1>
                </div>
                <div>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        name="name"
                        className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                        placeholder="Name"
                    />
                </div>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        name="email"
                        className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                        placeholder="Email"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                        placeholder="Password"
                    />
                </div>
                <div className="flex justify-center mb-3">
                    <button
                        onClick={handleSignup}
                        disabled={loading}
                        className="bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50"
                    >
                        {loading ? 'Creating account...' : 'Signup'}
                    </button>
                </div>
                <div>
                    <h2 className="text-white">
                        Have an account{' '}
                        <Link className="text-red-500 font-bold" to="/login">
                            Login
                        </Link>
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default Signup;
