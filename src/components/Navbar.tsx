import { useAuth } from "../hooks/useAuth";

const Navbar = () => {

    const { logout } = useAuth();

    return (
        <div className="bg-slate-800 p-4 flex justify-between">
            <h1 className="text-white font-bold">Shop Store</h1>
            <button onClick={logout} className="bg-red-500 text-white px-4 py-1 rounded" >
                Logout
            </button>
        </div>
    );
};

export default Navbar;