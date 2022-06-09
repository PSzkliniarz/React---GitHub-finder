import { useParams } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import GithubContext from "../../context/github/GithubContext";
import {getUsersRepos} from '../../context/github/GithubActions'
import Spinner from '../layout/Spinner';
import RepoItem from './RepoItem'
import { useNavigate  } from 'react-router-dom';


function UserReposList() {

  const { loading,  repos, dispatch } = useContext(GithubContext);

  const login = useParams().login
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({type: 'SET_LOADING'})

    const getUserData = async() => {

      const userRepo = await getUsersRepos(login)
      dispatch({type: 'GET_USER_REPOS', payload: userRepo})
    }

    getUserData()
  }, [dispatch, login]);

  if (loading) {
    return <Spinner />;
  }


  return (
    <div className='rounded-lg shadow-lg card bg-base-100'>
      <div className='card-body'>

          <h1 className='text-4xl' style={{'cursor':'pointer'}} onClick={() => navigate(-1)}> &#60;- {login}</h1>


        <h2 className='text-3xl my-4 font-bold card-title'>
          Public Repositories - Latest {repos.length}
        </h2>
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo}/>
        ))}
      </div>
    </div>
  )
}


export default UserReposList