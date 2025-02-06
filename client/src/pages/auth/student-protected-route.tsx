import { Navigate } from "react-router";
import useAuthContext from "../../hooks/useAuthContext"
import Loader from "../../components/reusables/loader";


export default function StudentProtectedRoute({children}: {children: React.ReactNode}) {
    const {isAuthenticated,isLoading,user} = useAuthContext();
    if (isLoading) return (<Loader />);
    return (isAuthenticated && user.user_type === 'student') ? children : <Navigate to="/login" />
}
