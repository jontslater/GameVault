import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <>
      <h1>{user.displayName}! </h1>
    </>
  );
}

export default Home;
