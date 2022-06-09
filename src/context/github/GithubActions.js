const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


    //Get search users
    export const searchUsers = async (text) => {


    const params = new URLSearchParams({
        q: text
    })

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`,
            }
        })

        const {items} = await response.json()
        
        return items
    }

        //Get single user
        export const getUser = async (login) => {

    
            const response = await fetch(`${GITHUB_URL}/users/${login}`, {
                headers: {
                    Authorization: `${GITHUB_TOKEN}`,
                }
            })
    
            if(response.status === 404) {
                window.location = '/nofound'
            } else {
                const data = await response.json()
            
                return data
            }
            
        }
    
        //Get user repos
        export const getUserRepos = async (login) => {
    
            const params = new URLSearchParams({
                sort: 'created',
                per_page: 5,
            })
            const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
                headers: {
                    Authorization: `${GITHUB_TOKEN}`,
                }
            })
    
            if(response.status === 404) {
                window.location = '/nofound'
            } else {
                const data = await response.json()
            
                return data
            }
            
        }